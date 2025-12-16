import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { 
  LogOut, 
  BookOpen, 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings,
  GraduationCap,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { getDailyVerse } from '../services/geminiService';

interface LayoutProps {
  user: User;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dailyVerse, setDailyVerse] = useState<{arabic: string, translation: string, reference: string} | null>(null);

  useEffect(() => {
    getDailyVerse().then(setDailyVerse);
  }, []);

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, roles: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT] },
    { label: 'Courses', icon: BookOpen, roles: [UserRole.TEACHER, UserRole.STUDENT] },
    { label: 'Students', icon: Users, roles: [UserRole.ADMIN, UserRole.TEACHER] },
    { label: 'Faculty', icon: GraduationCap, roles: [UserRole.ADMIN] },
    { label: 'Schedule', icon: Calendar, roles: [UserRole.TEACHER, UserRole.STUDENT] },
    { label: 'Settings', icon: Settings, roles: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT] },
  ];

  const filteredNav = navItems.filter(item => item.roles.includes(user.role));

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-emerald-900 text-white transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-serif tracking-wide">AYAAT</h1>
                <p className="text-xs text-emerald-300">Madrasah LMS</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-emerald-300 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-2 py-4">
            {filteredNav.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-emerald-100 hover:bg-emerald-800 hover:text-white transition-colors text-left"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 bg-emerald-950/30">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-10 h-10 rounded-full border-2 border-amber-500"
              />
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate">{user.name}</p>
                <p className="text-xs text-emerald-400 capitalize">{user.role.toLowerCase()}</p>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="w-full flex items-center justify-center space-x-2 bg-emerald-800 hover:bg-emerald-700 py-2 rounded-md text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600">
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex-1 px-4 lg:px-0 flex justify-center lg:justify-start">
             {dailyVerse && (
                 <div className="hidden md:flex flex-col items-center lg:items-start animate-fade-in">
                     <p className="text-xs text-emerald-600 font-bold">{dailyVerse.reference}</p>
                     <p className="text-sm text-slate-600 italic truncate max-w-md">"{dailyVerse.translation}"</p>
                 </div>
             )}
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors relative">
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
               <div className="sr-only">Notifications</div>
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
             {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
