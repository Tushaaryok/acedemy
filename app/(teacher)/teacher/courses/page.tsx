'use client';
import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Video, 
  FileText, 
  Users, 
  Settings, 
  MoreVertical, 
  BarChart3,
  Calendar,
  Layers,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function TeacherCourses() {
  const [activeView, setActiveView] = useState<'active' | 'draft' | 'archived'>('active');

  const COURSES = [
    { id: '1', title: 'Standard 10 Mathematics: Full Year Masterclass', std: '10', students: 1200, status: 'published', progress: 75 },
    { id: '2', title: 'Standard 12 Commerce: Accounts & Stat Pro', std: '12', students: 850, status: 'published', progress: 40 },
    { id: '3', title: 'English Grammar Alpha: Std 9 to 12', std: '9-12', students: 600, status: 'published', progress: 95 },
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Course Builder</h1>
          <p className="text-slate-500 font-medium">Create and manage your educational content & chapters.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-900 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 group">
          <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
          Launch New Course
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Stats Side */}
        <div className="space-y-6">
           <div className="bg-blue-900 rounded-[32px] p-8 text-white relative overflow-hidden">
              <Sparkles size={48} className="absolute -top-4 -right-4 text-blue-500/20" />
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-6">Teaching Impact</p>
              <div className="space-y-4">
                 <div className="flex items-end gap-2">
                    <span className="text-4xl font-black">2.6k</span>
                    <span className="text-xs font-bold text-blue-300 mb-1">Total Students</span>
                 </div>
                 <div className="flex items-end gap-2">
                    <span className="text-4xl font-black">1.4k</span>
                    <span className="text-xs font-bold text-blue-300 mb-1">Watch Hours</span>
                 </div>
              </div>
              <button className="w-full mt-8 bg-white/10 hover:bg-white/20 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                 View Educator Stats
              </button>
           </div>

           <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Quick Actions</h3>
              <div className="space-y-2">
                 <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all group">
                    <div className="flex items-center gap-3 text-slate-700 group-hover:text-blue-900">
                       <Video size={18} /> <span className="text-sm font-bold">New Live Class</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-300" />
                 </button>
                 <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all group">
                    <div className="flex items-center gap-3 text-slate-700 group-hover:text-blue-900">
                       <FileText size={18} /> <span className="text-sm font-bold">Upload Notes</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-300" />
                 </button>
                 <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all group">
                    <div className="flex items-center gap-3 text-slate-700 group-hover:text-blue-900">
                       <Calendar size={18} /> <span className="text-sm font-bold">Set Schedule</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-300" />
                 </button>
              </div>
           </div>
        </div>

        {/* Right Content Side */}
        <div className="lg:col-span-3 space-y-8">
           {/* Section Tabs */}
           <div className="flex gap-4">
              {['active', 'draft', 'archived'].map(tab => (
                 <button 
                  key={tab}
                  onClick={() => setActiveView(tab as any)}
                  className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeView === tab ? 'bg-blue-900 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-50 hover:border-slate-200'
                  }`}
                 >
                   {tab}
                 </button>
              ))}
           </div>

           {/* Course Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {COURSES.map(course => (
                 <div key={course.id} className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm group hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-6">
                       <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-blue-50 transition-all">
                          {course.std === '10' ? '📐' : course.std === '12' ? '📊' : '✍️'}
                       </div>
                       <button className="p-2 text-slate-300 hover:text-blue-900">
                          <MoreVertical size={20} />
                       </button>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-900">{course.title}</h3>
                    <div className="flex items-center gap-6 mb-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
                       <span className="flex items-center gap-1"><Users size={14} /> {course.students} Students</span>
                       <span className="flex items-center gap-1"><Layers size={14} /> Std {course.std}</span>
                    </div>

                    {/* Completion Bar */}
                    <div className="space-y-3">
                       <div className="flex justify-between items-end">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Syllabus Complete</span>
                          <span className="text-sm font-black text-blue-900">{course.progress}%</span>
                       </div>
                       <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-900 transition-all duration-1000" style={{ width: `${course.progress}%` }}></div>
                       </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                       <Link href={`/dashboard/teacher/courses/${course.id}`} className="flex-1 bg-blue-900 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-center hover:bg-blue-800 transition-all">
                          Edit Chapters
                       </Link>
                       <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:bg-slate-100 transition-all">
                          <BarChart3 size={20} />
                       </button>
                    </div>

                    {/* Subtle status indicator */}
                    <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500/20"></div>
                 </div>
              ))}
              
              {/* Empty placeholder */}
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center p-12 text-center group cursor-pointer hover:border-blue-300 transition-all">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform mb-4">
                    <Plus className="text-slate-300 group-hover:text-blue-500" />
                 </div>
                 <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Create New Batch</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
