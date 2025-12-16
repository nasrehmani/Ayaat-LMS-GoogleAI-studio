import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, BookOpen, GraduationCap, TrendingUp } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const enrollmentData = [
    { name: 'Jan', students: 120 },
    { name: 'Feb', students: 132 },
    { name: 'Mar', students: 145 },
    { name: 'Apr', students: 155 },
    { name: 'May', students: 160 },
    { name: 'Jun', students: 175 },
  ];

  const coursePerformance = [
    { name: 'Fiqh', score: 85 },
    { name: 'Arabic', score: 72 },
    { name: 'History', score: 90 },
    { name: 'Tajweed', score: 88 },
    { name: 'Hadith', score: 78 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <StatCard icon={Users} label="Total Students" value="175" color="text-blue-600" bg="bg-blue-100" />
         <StatCard icon={GraduationCap} label="Total Teachers" value="14" color="text-amber-600" bg="bg-amber-100" />
         <StatCard icon={BookOpen} label="Active Courses" value="12" color="text-emerald-600" bg="bg-emerald-100" />
         <StatCard icon={TrendingUp} label="Avg Attendance" value="94%" color="text-purple-600" bg="bg-purple-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
           <h3 className="text-lg font-bold text-slate-800 mb-6">Student Enrollment Growth</h3>
           <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={enrollmentData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                 <Tooltip />
                 <Line type="monotone" dataKey="students" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#10b981'}} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
           <h3 className="text-lg font-bold text-slate-800 mb-6">Average Course Performance</h3>
           <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={coursePerformance} layout="vertical">
                 <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                 <XAxis type="number" hide />
                 <YAxis dataKey="name" type="category" width={80} tick={{fill: '#475569', fontSize: 12}} />
                 <Tooltip cursor={{fill: 'transparent'}} />
                 <Bar dataKey="score" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={20} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
         <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Recent System Activity</h3>
            <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">View All</button>
         </div>
         <div className="divide-y divide-slate-100">
            {[1, 2, 3].map((i) => (
               <div key={i} className="p-4 flex items-center space-x-4 hover:bg-slate-50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <p className="text-sm text-slate-600">
                     <span className="font-semibold text-slate-900">Sheikh Ahmed</span> posted a new assignment in <span className="font-semibold text-slate-900">Fiqh 101</span>.
                  </p>
                  <span className="ml-auto text-xs text-slate-400">2 hrs ago</span>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{icon: any, label: string, value: string, color: string, bg: string}> = ({icon: Icon, label, value, color, bg}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
     <div className={`p-3 rounded-lg ${bg}`}>
        <Icon className={`w-6 h-6 ${color}`} />
     </div>
     <div>
        <p className="text-sm text-slate-500 font-medium">{label}</p>
        <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
     </div>
  </div>
);

export default AdminDashboard;
