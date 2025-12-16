import React, { useState } from 'react';
import { Course } from '../types';
import { BookOpen, Users, Calendar, Plus, Wand2, Download } from 'lucide-react';
import { generateLessonPlan } from '../services/geminiService';

const TeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'classes' | 'planner'>('classes');

  // Mock Data
  const courses: Course[] = [
    { id: '1', title: 'Fiqh al-Ibadat', code: 'ISL-101', instructor: 'Me', schedule: 'Mon/Wed 10:00 AM', studentsCount: 24 },
    { id: '2', title: 'Advanced Tafseer', code: 'QUR-301', instructor: 'Me', schedule: 'Tue 2:00 PM', studentsCount: 15 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
           <button 
             onClick={() => setActiveTab('classes')}
             className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'classes' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
           >
             My Classes
           </button>
           <button 
             onClick={() => setActiveTab('planner')}
             className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${activeTab === 'planner' ? 'bg-amber-500 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
           >
             <Wand2 className="w-4 h-4" />
             <span>AI Lesson Planner</span>
           </button>
        </div>
      </div>

      {activeTab === 'classes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between h-48">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-slate-800">{course.title}</h3>
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded font-mono">{course.code}</span>
                </div>
                <div className="text-sm text-slate-500 flex items-center space-x-2 mb-1">
                   <Calendar className="w-4 h-4" />
                   <span>{course.schedule}</span>
                </div>
                <div className="text-sm text-slate-500 flex items-center space-x-2">
                   <Users className="w-4 h-4" />
                   <span>{course.studentsCount} Students</span>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-slate-100 text-slate-700 py-2 rounded text-sm font-medium hover:bg-slate-200 transition-colors">Grade</button>
                <button className="flex-1 bg-emerald-50 text-emerald-700 py-2 rounded text-sm font-medium hover:bg-emerald-100 transition-colors">Assignments</button>
              </div>
            </div>
          ))}
          <button className="border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-emerald-500 hover:text-emerald-500 transition-colors h-48">
             <Plus className="w-8 h-8 mb-2" />
             <span className="font-medium">Create New Course</span>
          </button>
        </div>
      )}

      {activeTab === 'planner' && <LessonPlanner />}
    </div>
  );
};

const LessonPlanner: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const result = await generateLessonPlan(topic, level);
      setPlan(result);
    } catch (e) {
      alert("Failed to generate plan. Please check API key.");
    }
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
       <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center space-x-2">
            <Wand2 className="w-5 h-5 text-amber-500" />
            <span>Plan Generator</span>
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Topic</label>
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Pillars of Salah" 
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Student Level</label>
              <select 
                value={level} 
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
              >
                <option>Beginner (Age 5-8)</option>
                <option>Intermediate (Age 9-13)</option>
                <option>Advanced (Age 14+)</option>
              </select>
            </div>
            
            <button 
              onClick={handleGenerate}
              disabled={loading || !topic}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Generating...
                </>
              ) : "Generate Plan"}
            </button>
          </div>
       </div>

       <div className="lg:col-span-2">
         {plan ? (
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in">
             <div className="bg-slate-50 border-b border-slate-200 p-6 flex justify-between items-center">
               <div>
                  <h2 className="text-xl font-bold text-slate-900">{plan.title}</h2>
                  <p className="text-sm text-slate-500">Duration: 45 mins • Level: {level}</p>
               </div>
               <button className="text-slate-500 hover:text-emerald-600">
                 <Download className="w-5 h-5" />
               </button>
             </div>
             
             <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2 border-b pb-1">Objectives</h4>
                    <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                      {plan.objectives?.map((obj: string, i: number) => <li key={i}>{obj}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2 border-b pb-1">Materials</h4>
                    <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                      {plan.materials?.map((mat: string, i: number) => <li key={i}>{mat}</li>)}
                    </ul>
                  </div>
                </div>

                <div>
                   <h4 className="font-bold text-slate-800 mb-2 border-b pb-1">Activity Schedule</h4>
                   <div className="space-y-3">
                     {plan.activities?.map((act: any, i: number) => (
                       <div key={i} className="flex items-start space-x-4 bg-slate-50 p-3 rounded-lg">
                         <div className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-2 py-1 rounded min-w-[60px] text-center">
                           {act.time}
                         </div>
                         <p className="text-sm text-slate-700">{act.description}</p>
                       </div>
                     ))}
                   </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                   <h4 className="font-bold text-amber-800 text-sm mb-1">Assessment</h4>
                   <p className="text-sm text-amber-700">{plan.assessment}</p>
                </div>
             </div>
           </div>
         ) : (
           <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl p-12">
             <BookOpen className="w-12 h-12 mb-4 opacity-50" />
             <p>Select a topic and generate a lesson plan to view it here.</p>
           </div>
         )}
       </div>
    </div>
  );
}

export default TeacherDashboard;
