'use client';

import { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Video, 
  FileText, 
  Save, 
  ChevronLeft,
  ArrowRight,
  Sparkles,
  CloudUpload,
  Globe
} from 'lucide-react';
import Link from 'next/link';

export default function CourseEditor() {
  const [sections, setSections] = useState([
    {
      id: '1',
      title: 'Intro & Syllabus Overview',
      lessons: [
        { id: 'l1', title: 'Welcome to Std 12 Mathematics', type: 'video', duration: '12:00' },
        { id: 'l2', title: 'Textbook & Material PDF', type: 'resource', size: '2.4MB' }
      ]
    },
    {
      id: '2',
      title: 'Chapter 01: Advanced Derivatives',
      lessons: [
        { id: 'l3', title: 'Limits Refresher', type: 'video', duration: '45:20' },
        { id: 'l4', title: 'Product & Quotient Rule', type: 'video', duration: '22:15' }
      ]
    }
  ]);

  const [isSaving, setIsSaving] = useState(false);

  const addSection = () => {
    setSections([...sections, { id: Date.now().toString(), title: 'New Multi-Lesson Section', lessons: [] }]);
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-40">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-4">
           <Link href="/dashboard/teacher/courses" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-900 transition-colors">
              <ChevronLeft size={14} /> Back to Master Catalog
           </Link>
           <h1 className="text-5xl font-baloo font-bold text-slate-900 tracking-tight">Curriculum Studio</h1>
           <p className="text-slate-500 font-medium">Standard 10 Mathematics: Full Year Masterclass</p>
        </div>
        
        <div className="flex items-center gap-4">
           <button className="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
             Preview as Student
           </button>
           <button 
             onClick={() => { setIsSaving(true); setTimeout(() => setIsSaving(false), 2000); }}
             className="flex items-center gap-3 bg-blue-900 text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 active:scale-95"
           >
             {isSaving ? <Sparkles size={16} className="animate-spin" /> : <Save size={16} />} 
             {isSaving ? 'Syncing to Cloud...' : 'Commit Changes'}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-8">
           {sections.map((section, idx) => (
             <div key={section.id} className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
                <div className="bg-slate-50/50 p-8 flex items-center justify-between border-b border-slate-100">
                   <div className="flex items-center gap-4 w-full">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 cursor-grab active:cursor-grabbing">
                         <GripVertical size={18} />
                      </div>
                      <input 
                        className="bg-transparent text-xl font-baloo font-bold text-slate-900 outline-none w-full placeholder:text-slate-300"
                        defaultValue={section.title}
                      />
                   </div>
                   <button className="p-2 text-slate-300 hover:text-rose-500 transition-all"><Trash2 size={18} /></button>
                </div>

                <div className="p-8 space-y-4">
                   {section.lessons.map(lesson => (
                     <div key={lesson.id} className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl hover:border-blue-900/30 hover:shadow-lg transition-all group">
                        <div className="flex items-center gap-6">
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${
                             lesson.type === 'video' ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-amber-50 border-amber-100 text-amber-600'
                           }`}>
                              {lesson.type === 'video' ? <Video size={20} /> : <FileText size={20} />}
                           </div>
                           <div>
                              <p className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors uppercase tracking-tight">{lesson.title}</p>
                              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">
                                {lesson.duration || lesson.size} • Vidyakul CDN Verified
                              </p>
                           </div>
                        </div>
                        <button className="p-2 text-slate-200 group-hover:text-slate-400 transition-colors"><Trash2 size={16} /></button>
                     </div>
                   ))}
                   
                   <div className="flex gap-4 pt-4">
                      <button className="flex-1 flex items-center justify-center gap-3 py-5 bg-blue-50 text-blue-900 rounded-[24px] text-[10px] font-black uppercase tracking-widest border border-blue-100 hover:bg-blue-100 transition-all">
                        <Plus size={16} /> Add Lesson (Video)
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-3 py-5 bg-slate-50 text-slate-600 rounded-[24px] text-[10px] font-black uppercase tracking-widest border border-slate-100 hover:bg-slate-100 transition-all">
                        <Plus size={16} /> Add Resource (PDF)
                      </button>
                   </div>
                </div>
             </div>
           ))}

           <button 
            onClick={addSection}
            className="w-full py-10 rounded-[48px] border-4 border-dashed border-slate-100 text-slate-300 hover:border-blue-200 hover:text-blue-400 transition-all flex flex-col items-center justify-center gap-4 bg-slate-50/20"
           >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                 <Plus size={24} />
              </div>
              <span className="text-xs font-black uppercase tracking-widest">Construct New Educational Block</span>
           </button>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-10">
           <div className="bg-slate-900 p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 space-y-10">
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-2">Platform Visibility</p>
                    <h3 className="text-3xl font-baloo font-bold">Course Settings</h3>
                 </div>

                 <div className="space-y-8">
                    <div className="flex items-center justify-between group/toggle cursor-pointer">
                       <span className="text-xs font-bold tracking-wide">Multi-Language (Hinglish)</span>
                       <div className="w-12 h-6 bg-blue-600 rounded-full p-1 flex justify-end">
                          <div className="w-4 h-4 bg-white rounded-full shadow-lg" />
                       </div>
                    </div>
                    <div className="flex items-center justify-between group/toggle cursor-pointer">
                       <span className="text-xs font-bold tracking-wide">Publicly Searchable</span>
                       <div className="w-12 h-6 bg-slate-800 rounded-full p-1 flex justify-start">
                          <div className="w-4 h-4 bg-white/20 rounded-full shadow-lg" />
                       </div>
                    </div>
                 </div>

                 <div className="pt-10 border-t border-white/5 space-y-6">
                    <div>
                       <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest block mb-4">Assigned Standards</label>
                       <div className="flex flex-wrap gap-2">
                          {['Std 10', 'Std 11', 'Board Exam Prep'].map(tag => (
                            <span key={tag} className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest">
                               {tag}
                            </span>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
              <div className="absolute -right-20 -bottom-20 opacity-5 transform rotate-12">
                 <Globe size={300} />
              </div>
           </div>

           <div className="bg-emerald-600 p-10 rounded-[48px] text-white shadow-2xl shadow-emerald-500/20 relative overflow-hidden">
              <CloudUpload className="absolute -top-10 -right-10 text-emerald-500 opacity-20" size={200} />
              <div className="relative z-10 space-y-6">
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100 mb-2">Cloud Storage</p>
                    <h4 className="text-2xl font-baloo font-bold leading-tight">Fast R2 Sync Active</h4>
                 </div>
                 <p className="text-xs font-medium text-emerald-50 opacity-80 leading-relaxed">
                    All videos and material are currently being synced to our regional Indian servers for 0-latency playback.
                 </p>
                 <ArrowRight className="text-emerald-300" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
