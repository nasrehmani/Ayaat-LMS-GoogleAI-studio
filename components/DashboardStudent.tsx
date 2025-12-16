import React, { useState } from 'react';
import { Course, Assignment } from '../types';
import { Book, Clock, CheckCircle, Send, Sparkles, MessageCircle } from 'lucide-react';
import { getAiTutorResponse } from '../services/geminiService';

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tutor'>('overview');
  
  // Mock Data
  const courses: Course[] = [
    { id: '1', title: 'Fiqh al-Ibadat', code: 'ISL-101', instructor: 'Sheikh Ahmed', schedule: 'Mon/Wed 10:00 AM', progress: 75 },
    { id: '2', title: 'Quranic Arabic', code: 'ARB-202', instructor: 'Ustadha Fatima', schedule: 'Tue/Thu 11:30 AM', progress: 45 },
    { id: '3', title: 'Seerah of the Prophet', code: 'HIS-105', instructor: 'Dr. Bilal', schedule: 'Fri 9:00 AM', progress: 90 },
  ];

  const assignments: Assignment[] = [
    { id: '1', courseId: '1', title: 'Essay on Wudu', dueDate: '2023-11-15', status: 'Pending' },
    { id: '2', courseId: '2', title: 'Verb Conjugation Quiz', dueDate: '2023-11-10', status: 'Graded', grade: 'A' },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 pb-2">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`pb-2 px-1 ${activeTab === 'overview' ? 'border-b-2 border-emerald-600 text-emerald-800 font-semibold' : 'text-slate-500 hover:text-slate-700'}`}
        >
          My Learning
        </button>
        <button 
          onClick={() => setActiveTab('tutor')}
          className={`pb-2 px-1 flex items-center space-x-2 ${activeTab === 'tutor' ? 'border-b-2 border-emerald-600 text-emerald-800 font-semibold' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Tutor</span>
        </button>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 col-span-1 md:col-span-2">
              <h2 className="text-xl font-bold mb-4 font-serif text-slate-800">Welcome back, Omar!</h2>
              <p className="text-slate-600 mb-6">You have 2 assignments due this week. Keep up the great work in Seerah!</p>
              
              <div className="grid grid-cols-3 gap-4">
                 <div className="bg-emerald-50 p-4 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-emerald-700">92%</h3>
                    <p className="text-xs text-emerald-600 font-medium uppercase tracking-wide">Avg. Grade</p>
                 </div>
                 <div className="bg-amber-50 p-4 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-amber-700">3</h3>
                    <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Active Courses</p>
                 </div>
                 <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-blue-700">12</h3>
                    <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">Hrs Learned</p>
                 </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
               <h3 className="font-bold text-slate-800 mb-4">Upcoming Due Dates</h3>
               <div className="space-y-4">
                  {assignments.filter(a => a.status === 'Pending').map(a => (
                    <div key={a.id} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <Clock className="w-5 h-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm text-slate-800">{a.title}</p>
                        <p className="text-xs text-slate-500">Due: {a.dueDate}</p>
                      </div>
                    </div>
                  ))}
                  {assignments.filter(a => a.status === 'Pending').length === 0 && (
                    <p className="text-sm text-slate-500 italic">No pending assignments.</p>
                  )}
               </div>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4">My Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-24 bg-gradient-to-r from-emerald-600 to-teal-500 p-6 flex flex-col justify-end">
                   <h4 className="text-white font-bold text-lg">{course.title}</h4>
                   <p className="text-emerald-100 text-xs">{course.code}</p>
                </div>
                <div className="p-6">
                   <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-slate-500">{course.instructor}</span>
                      <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">{course.schedule}</span>
                   </div>
                   <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                     <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                   </div>
                   <div className="flex justify-between text-xs text-slate-500">
                     <span>Progress</span>
                     <span>{course.progress}%</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'tutor' && <AiTutorWidget />}
    </div>
  );
};

const AiTutorWidget: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    {role: 'ai', text: 'As-salamu alaykum! I am your AI Tutor at Ayaat. How can I help you with your studies today?'}
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, {role: 'user', text: userMsg}]);
    setInput('');
    setLoading(true);

    const response = await getAiTutorResponse(userMsg);
    
    setMessages(prev => [...prev, {role: 'ai', text: response}]);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[600px] flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
       <div className="bg-emerald-600 p-4 text-white flex items-center space-x-3">
         <div className="p-2 bg-white/20 rounded-lg">
           <Sparkles className="w-5 h-5 text-amber-300" />
         </div>
         <div>
           <h3 className="font-bold">Ayaat AI Tutor</h3>
           <p className="text-xs text-emerald-100">Ask about Fiqh, Arabic, or History</p>
         </div>
       </div>

       <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
         {messages.map((m, i) => (
           <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
             <div className={`max-w-[80%] p-4 rounded-xl ${
               m.role === 'user' 
               ? 'bg-emerald-600 text-white rounded-tr-none' 
               : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
             }`}>
               {m.role === 'ai' ? (
                 <div className="prose prose-sm max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />') }} />
               ) : (
                 <p className="text-sm">{m.text}</p>
               )}
             </div>
           </div>
         ))}
         {loading && (
           <div className="flex justify-start">
             <div className="bg-white p-4 rounded-xl rounded-tl-none border border-slate-200 shadow-sm flex items-center space-x-2">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-200"></div>
             </div>
           </div>
         )}
       </div>

       <div className="p-4 bg-white border-t border-slate-200">
         <div className="flex space-x-2">
           <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question here..."
            className="flex-1 p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
           />
           <button 
             onClick={handleSend}
             disabled={loading}
             className="bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
           >
             <Send className="w-5 h-5" />
           </button>
         </div>
       </div>
    </div>
  );
}

export default StudentDashboard;
