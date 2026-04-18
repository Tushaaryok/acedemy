'use client';

import { useState } from 'react';
import { 
  FilePlus, 
  Search, 
  Folder, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  MoreVertical, 
  Eye, 
  Download,
  Trash2,
  Lock,
  BookOpen
} from 'lucide-react';

export default function FacultyMaterial() {
  const [activeBatch, setActiveBatch] = useState('Std 10 A');

  const MATERIALS = [
    { id: '1', title: 'Chapter 2 Notes — Acids & Bases', type: 'pdf', size: '2.4 MB', date: '14 Apr', batch: 'Std 10 A' },
    { id: '2', title: 'Periodic Table Chart', type: 'image', size: '1.1 MB', date: '12 Apr', batch: 'Std 10 A' },
    { id: '3', title: 'Week 3 Homework Assignment', type: 'doc', size: '450 KB', date: '10 Apr', batch: 'Std 12 B' },
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-12 min-h-screen bg-slate-50/20">
      
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
           <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-indigo-50 w-fit px-3 py-1 rounded-full border border-indigo-100 mb-2">
              <Folder size={12} /> Asset Repository
           </div>
           <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Resource Vault</h1>
           <p className="text-slate-500 font-medium text-lg mt-2">Upload and manage academic materials for your batches.</p>
        </div>
        
        <button className="bg-slate-900 text-white px-8 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-slate-900/40 hover:bg-indigo-600 transition-all flex items-center gap-3 active:scale-95 group">
          <FilePlus size={20} className="group-hover:translate-x-1" /> UPLOAD NEW RESOURCE
        </button>
      </header>

      {/* Resource Controls */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
         <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              placeholder="Search resource files..." 
              className="w-full bg-white border border-slate-100 rounded-[28px] pl-16 pr-6 py-5 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all shadow-sm"
            />
         </div>
         <div className="flex bg-white p-2 rounded-[32px] border border-slate-100 shadow-sm overflow-x-auto no-scrollbar max-w-full">
            {['Std 10 A', 'Std 12 B', 'Archived'].map(b => (
              <button 
                key={b}
                onClick={() => setActiveBatch(b)}
                className={`px-8 py-3 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeBatch === b ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {b}
              </button>
            ))}
         </div>
      </div>

      {/* Grid of Materials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {MATERIALS.filter(m => m.batch === activeBatch).map(doc => (
          <div key={doc.id} className="bg-white rounded-[48px] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all group relative overflow-hidden">
             <div className="relative z-10 flex flex-col h-full space-y-8">
                <div className="flex justify-between items-start">
                   <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                      {doc.type === 'pdf' ? <FileText size={24} /> : doc.type === 'image' ? <ImageIcon size={24} /> : <BookOpen size={24} />}
                   </div>
                   <button className="p-2 text-slate-300 hover:text-slate-900 transition-all"><MoreVertical size={20} /></button>
                </div>

                <div className="space-y-2">
                   <h4 className="text-xl font-black text-slate-900 leading-tight tracking-tight group-hover:text-amber-600 transition-colors">{doc.title}</h4>
                   <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>{doc.type}</span>
                      <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                      <span>{doc.size}</span>
                   </div>
                </div>

                <div className="pt-6 mt-auto border-t border-slate-50 flex items-center justify-between">
                   <p className="text-[10px] font-bold text-slate-400">{doc.date}</p>
                   <div className="flex gap-2">
                      <button title="Preview" className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-2xl transition-all">
                         <Eye size={18} />
                      </button>
                      <button title="Unlock Permissions" className="p-3 text-slate-400 hover:text-emerald-600 hover:bg-slate-50 rounded-2xl transition-all">
                         <Lock size={18} />
                      </button>
                   </div>
                </div>
             </div>
             
             <div className="absolute right-0 top-0 h-full w-2 bg-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
        {MATERIALS.filter(m => m.batch === activeBatch).length === 0 && (
          <div className="col-span-full py-32 text-center opacity-20">
             <div className="space-y-6">
                <Folder size={64} className="mx-auto" />
                <p className="font-black italic uppercase tracking-widest text-sm">No materials discovered in this repository</p>
             </div>
          </div>
        )}
      </div>

      {/* Storage Insights */}
      <div className="bg-indigo-600 rounded-[56px] p-10 text-white shadow-2xl shadow-indigo-600/30 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative group">
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-24 h-24 bg-white/10 rounded-[32px] flex items-center justify-center backdrop-blur-md border border-white/10">
               <Download size={40} className="text-white" />
            </div>
            <div className="text-center md:text-left space-y-2">
               <h3 className="text-2xl font-black tracking-tight leading-none">Premium Storage Active</h3>
               <p className="text-indigo-200 text-sm font-medium opacity-80 uppercase tracking-widest">You have used 4.2 GB of 25 GB Academic Space</p>
            </div>
         </div>
         <button className="relative z-10 bg-white text-indigo-900 px-10 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
            Upgrade Capacity
         </button>
         
         <div className="absolute -left-20 -bottom-20 opacity-10 group-hover:scale-110 transition-transform">
            <Folder size={300} />
         </div>
      </div>
    </div>
  );
}
