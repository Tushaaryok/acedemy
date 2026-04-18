'use client';

import { useState } from 'react';
import { 
  FileText, 
  Download, 
  Search, 
  Star, 
  Clock, 
  BookOpen, 
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function StudentMaterial() {
  const [searchQuery, setSearchQuery] = useState('');

  const RESOURCES = [
    { id: '1', title: 'Calculus: Ultimate Formula Sheet', type: 'PDF', date: 'Yesterday', subject: 'Maths', teacher: 'RS', size: '1.2 MB' },
    { id: '2', title: 'Periodic Table Mastery Chart', type: 'IMAGE', date: '3 Days ago', subject: 'Chemistry', teacher: 'JB', size: '4.8 MB' },
    { id: '3', title: 'English Grammar Workbook - Units 1-5', type: 'DOC', date: '12 Apr', subject: 'English', teacher: 'YS', size: '840 KB' },
    { id: '4', title: 'Physics Numerical Bank (Board 2024)', type: 'PDF', date: '10 Apr', subject: 'Physics', teacher: 'RS', size: '2.5 MB' },
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-12 min-h-screen bg-white/50">
      
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
           <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-indigo-50 w-fit px-3 py-1 rounded-full border border-indigo-100 mb-2">
              <BookOpen size={12} /> Resource Repository
           </div>
           <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Study Material</h1>
           <p className="text-slate-500 font-medium text-lg">Curated academic assets for your personalized learning path.</p>
        </div>
        
        <div className="relative w-full lg:w-[400px]">
           <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
           <input 
             placeholder="Search within your library..." 
             className="w-full bg-white border border-slate-100 rounded-[28px] pl-16 pr-6 py-5 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all shadow-xl shadow-slate-200/20"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main List */}
        <div className="lg:col-span-2 space-y-8">
           <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Clock size={14} /> Recently Released
           </div>

           <div className="space-y-4">
              {RESOURCES.map(res => (
                <div key={res.id} className="bg-white rounded-[40px] p-6 border border-slate-100 shadow-sm hover:shadow-2xl hover:scale-[1.01] transition-all group flex flex-col sm:flex-row items-center justify-between gap-6">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                         <FileText size={24} />
                      </div>
                      <div>
                         <h3 className="text-lg font-black text-slate-900 leading-tight mb-1 group-hover:text-indigo-600 transition-colors">{res.title}</h3>
                         <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <span className="text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded italic">{res.subject}</span>
                            <span>{res.size}</span>
                            <span>Uploaded by {res.teacher} Sir</span>
                         </div>
                      </div>
                   </div>
                   <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2">
                      <Download size={14} /> DOWNLOAD
                   </button>
                </div>
              ))}
           </div>
        </div>

        {/* Categories & Stats */}
        <div className="space-y-10">
           <div className="bg-slate-900 rounded-[48px] p-10 text-white shadow-2xl shadow-indigo-900/40 relative overflow-hidden group">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Discovery Categories</h4>
              <div className="space-y-3">
                 {[
                   { label: 'Revision Notes', count: 12, icon: <BookOpen size={14} /> },
                   { label: 'Question Banks', count: 8, icon: <Sparkles size={14} /> },
                   { label: 'Practical Manuals', count: 3, icon: <ShieldCheck size={14} /> },
                   { label: 'Board Backlogs', count: 24, icon: <ChevronRight size={14} /> }
                 ].map(cat => (
                   <div key={cat.label} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group/item">
                      <div className="flex items-center gap-3">
                         <span className="text-indigo-400">{cat.icon}</span>
                         <span className="text-xs font-bold text-slate-300 group-hover/item:text-white">{cat.label}</span>
                      </div>
                      <span className="text-[10px] font-black text-slate-600 group-hover/item:text-indigo-400">{cat.count} Files</span>
                   </div>
                 ))}
              </div>
              
              <div className="absolute -right-16 -top-16 opacity-5 transform rotate-12 group-hover:scale-110 transition-transform">
                 <BookOpen size={240} />
              </div>
           </div>

           <div className="bg-amber-100/50 p-10 rounded-[48px] border border-amber-200">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-6 flex items-center gap-2">
                  <Star size={14} fill="currentColor" /> Premium Advantage
               </h4>
               <p className="text-sm font-bold text-amber-900 leading-relaxed italic">
                  "Only students with a Scholar Premium membership have access to our High-Value Board Numerical bank. Keep your subscription active to stay ahead."
               </p>
           </div>
        </div>
      </div>
    </div>
  );
}
