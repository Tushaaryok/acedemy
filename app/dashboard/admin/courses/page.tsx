'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  BookOpen, 
  Layers, 
  ChevronRight,
  Sparkles,
  Award,
  Filter
} from 'lucide-react';

export default function AdminCourses() {
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newBatch, setNewBatch] = useState({ name: '', year: new Date().getFullYear().toString() + '-' + (new Date().getFullYear() + 1).toString().slice(-2) });
  
  const supabase = createClient();

  useEffect(() => {
    async function fetchBatches() {
      const { data, error } = await supabase.from('batches').select('*').order('created_at', { ascending: false });
      if (data) setBatches(data);
      setLoading(false);
    }
    fetchBatches();
  }, [supabase]);

  const handleAddBatch = async () => {
    if (!newBatch.name) return;
    const { error } = await supabase.from('batches').insert([newBatch]);
    if (!error) {
       setShowModal(false);
       window.location.reload();
    }
  };

  const deleteBatch = async (id: string) => {
    if (!confirm('Are you sure? This will affect all enrolled students and schedules.')) return;
    const { error } = await supabase.from('batches').delete().eq('id', id);
    if (!error) {
       setBatches(batches.filter(b => b.id !== id));
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 gap-4">
      <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-500 font-bold animate-pulse tracking-widest uppercase text-xs">Loading Course Catalogs...</p>
    </div>
  );

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-12 min-h-screen bg-gray-50/20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-600 font-black text-[10px] uppercase tracking-widest bg-amber-50 w-fit px-3 py-1 rounded-full border border-amber-100">
             <Layers size={12} /> Institutional Framework
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Curriculum Control</h1>
          <p className="text-slate-500 font-medium text-lg mt-2">Design academic batches and manage subject distributions.</p>
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="bg-slate-900 text-white px-10 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-slate-900/40 hover:bg-slate-800 transition-all flex items-center gap-3 active:scale-95"
        >
          <Plus size={18} /> INITIALIZE NEW BATCH
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* Course Sidebar Checklist */}
        <div className="space-y-8">
           <div className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm relative overflow-hidden group">
              <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-6">Course QuickView</h3>
              <div className="space-y-4">
                 {[
                   { label: 'Total Active Batches', val: batches.length },
                   { label: 'Faculty Assignments', val: '12' },
                   { label: 'Syllabus coverage', val: '86%' }
                 ].map(item => (
                   <div key={item.label} className="border-b border-slate-50 pb-4">
                      <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{item.label}</p>
                      <p className="text-2xl font-black text-slate-800">{item.val}</p>
                   </div>
                 ))}
                 <button className="w-full mt-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-900 transition-all pt-4 border-t border-slate-50">
                    Syllabus Reports <ChevronRight size={14} />
                 </button>
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-5 transform rotate-12">
                 <BookOpen size={160} />
              </div>
           </div>

           <div className="bg-amber-600 p-8 rounded-[48px] text-white shadow-2xl shadow-amber-600/20 relative overflow-hidden">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Notice</p>
              <h4 className="text-xl font-black mb-4 tracking-tight leading-tight">Batch migration for 2025 starts next month.</h4>
              <p className="text-amber-100 text-xs font-medium leading-relaxed opacity-80">Backup individual student records before initializing the new academic year cycle.</p>
              <div className="absolute -right-4 top-1/2 opacity-20">
                 <Sparkles size={100} />
              </div>
           </div>
        </div>

        {/* Batch Cards Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
           {batches.map(batch => (
             <div key={batch.id} className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all group relative overflow-hidden">
                <div className="relative z-10 flex flex-col h-full justify-between">
                   <div className="space-y-4">
                      <div className="flex justify-between items-start">
                         <div className="bg-slate-50 p-4 rounded-3xl group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                            <Layers size={24} />
                         </div>
                         <div className="flex gap-2">
                            <button className="p-3 text-slate-300 hover:text-indigo-600 hover:bg-slate-50 rounded-2xl transition-all">
                               <Edit3 size={18} />
                            </button>
                            <button 
                              onClick={() => deleteBatch(batch.id)}
                              className="p-3 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all"
                            >
                               <Trash2 size={18} />
                            </button>
                         </div>
                      </div>
                      <div>
                         <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none group-hover:text-indigo-600 transition-colors uppercase">{batch.name}</h3>
                         <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2 italic">Session: {batch.year}</p>
                      </div>
                   </div>

                   <div className="pt-8 mt-8 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <Award size={16} className="text-amber-500" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">GSEB Curriculum</span>
                      </div>
                      <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:gap-4 transition-all">
                         Subjects & Faculty <ChevronRight size={14} />
                      </button>
                   </div>
                </div>
                
                <div className="absolute right-0 top-0 h-full w-2 bg-slate-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             </div>
           ))}
           {batches.length === 0 && (
             <div className="col-span-full py-32 text-center opacity-20">
                <Layers size={64} className="mx-auto mb-6" />
                <p className="font-black uppercase tracking-[0.2em] text-sm">Initializing Institutional Framework Required</p>
             </div>
           )}
        </div>
      </div>

      {/* Initialize Batch Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl flex items-center justify-center p-6 z-[100] animate-in fade-in duration-300">
          <div className="bg-white rounded-[56px] p-12 max-w-lg w-full space-y-10 shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden">
            <header>
               <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">New Academic Batch</h2>
               <p className="text-slate-500 font-medium mt-2">Establish a new roster for the upcoming session.</p>
            </header>
            
            <div className="space-y-6">
               <div className="space-y-1">
                 <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Identification Name</label>
                 <input 
                   placeholder="e.g. Std 12 Science (A)"
                   className="w-full px-8 py-5 rounded-[24px] border border-slate-100 bg-slate-50/50 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-black text-slate-800"
                   onChange={(e) => setNewBatch({...newBatch, name: e.target.value})}
                 />
               </div>
               <div className="space-y-1">
                 <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Academic Year</label>
                 <input 
                   placeholder="2024-25"
                   value={newBatch.year}
                   className="w-full px-8 py-5 rounded-[24px] border border-slate-100 bg-slate-50/50 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-black text-slate-800"
                   onChange={(e) => setNewBatch({...newBatch, year: e.target.value})}
                 />
               </div>
            </div>

            <div className="flex flex-col gap-4">
               <button 
                 onClick={handleAddBatch}
                 className="w-full bg-slate-900 text-white py-6 rounded-[24px] font-black text-[12px] uppercase tracking-[3px] shadow-2xl shadow-slate-900/30 hover:bg-slate-800 active:scale-95 transition-all"
               >
                 DEDICATE BATCH
               </button>
               <button 
                 onClick={() => setShowModal(false)}
                 className="w-full text-slate-400 text-[10px] font-black uppercase tracking-widest py-2 hover:text-slate-600 transition-all underline underline-offset-8"
               >
                 Cancel Operation
               </button>
            </div>

            <div className="absolute -left-10 -bottom-10 opacity-5">
               <Layers size={200} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
