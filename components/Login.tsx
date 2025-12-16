import React from 'react';
import { UserRole } from '../types';
import { Sparkles, Shield, GraduationCap, BookOpen } from 'lucide-react';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
        </svg>
      </div>

      <div className="max-w-4xl w-full z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-600 rounded-2xl mb-6 shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-10 h-10 text-amber-300" />
          </div>
          <h1 className="text-5xl font-bold text-white font-serif mb-2">AYAAT</h1>
          <p className="text-emerald-200 text-lg">Online Madrasah Learning Management System</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={() => onLogin(UserRole.STUDENT)}
            className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-8 transition-all hover:-translate-y-1 hover:border-emerald-500/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
            <div className="relative flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Student</h3>
              <p className="text-slate-400 text-sm">Access your courses, assignments, and AI tutor.</p>
            </div>
          </button>

          <button 
            onClick={() => onLogin(UserRole.TEACHER)}
            className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-8 transition-all hover:-translate-y-1 hover:border-amber-500/50"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
            <div className="relative flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Teacher</h3>
              <p className="text-slate-400 text-sm">Manage classes, grade work, and plan lessons.</p>
            </div>
          </button>

          <button 
            onClick={() => onLogin(UserRole.ADMIN)}
            className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-8 transition-all hover:-translate-y-1 hover:border-blue-500/50"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
            <div className="relative flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Admin</h3>
              <p className="text-slate-400 text-sm">System configuration and user management.</p>
            </div>
          </button>
        </div>
        
        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>© 2024 Ayaat Madrasah. Powered by Gemini AI.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
