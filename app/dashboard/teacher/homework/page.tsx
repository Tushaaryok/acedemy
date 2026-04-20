'use client';
import { useState, useEffect } from 'react';
import { 
  Plus, 
  FileText, 
  Users as UsersIcon, 
  CheckCircle2, 
  Clock, 
  Search, 
  Calendar, 
  FileUp, 
  MoreVertical,
  ChevronRight,
  AlertCircle,
  Loader2,
  X
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function TeacherHomework() {
  const [homeworks, setHomeworks] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ title: '', batch_id: '', deadline: '', description: '' });

  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: hwData } = await supabase
        .from('homework')
        .select('*, batches(name)')
        .order('created_at', { ascending: false });

      const { data: batchData } = await supabase
        .from('batches')
        .select('*');

      if (hwData) setHomeworks(hwData);
      if (batchData) setBatches(batchData);
      setLoading(false);
    }
    fetchData();
  }, [supabase]);

  const handleCreate = async () => {
    if (!formData.title || !formData.batch_id) {
      alert('Title and Batch are required.');
      return;
    }

    setIsSubmitting(true);
    const { data: { session } } = await supabase.auth.getSession();

    const { error } = await supabase.from('homework').insert([{
      ...formData,
      teacher_id: session?.user?.id,
      urgency: 'medium'
    }]);

    if (!error) {
       alert('Assignment successfully broadcasted!');
       window.location.reload();
    } else {
       alert('Error: ' + error.message);
    }
    setIsSubmitting(false);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Loader2 className="animate-spin text-blue-900" size={40} />
      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Syncing Academic Data...</p>
    </div>
  );

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Homework Manager</h1>
          <p className="text-slate-500 font-medium">Assign tasks, track submissions, and provide academic feedback.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-blue-900 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
          Assign New Task
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Summary Stats */}
        <div className="space-y-6 lg:sticky lg:top-8">
           <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm space-y-8">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                    <CheckCircle2 size={24} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase text-slate-400">Submission Rate</p>
                    <p className="text-2xl font-black text-slate-900">84.5%</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                    <Clock size={24} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase text-slate-400">Avg. Grading Time</p>
                    <p className="text-2xl font-black text-slate-900">4.2 Hours</p>
                 </div>
              </div>
              <button className="w-full bg-slate-900 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
                 Generate Performance Report
              </button>
           </div>
        </div>

        {/* Middle/Right: Task List */}
        <div className="lg:col-span-2 space-y-6">
           {/* Search & Filter */}
           <div className="flex gap-4">
              <div className="relative flex-1">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                 <input className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900 transition-all shadow-sm" placeholder="Search tasks or batches..." />
              </div>
              <button className="bg-white border border-slate-200 px-6 rounded-2xl text-slate-400 hover:text-blue-900 transition-all shadow-sm">
                 <Calendar size={20} />
              </button>
           </div>

           <div className="space-y-4">
              {homeworks.map(hw => (
                 <div key={hw.id} className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-start hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
                    <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-900 flex items-center justify-center text-3xl shrink-0 transition-transform group-hover:scale-110">
                       <FileText size={32} />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                       <div className="flex justify-between items-start">
                          <div>
                             <h4 className="text-xl font-bold text-slate-900">{hw.title}</h4>
                             <p className="text-xs font-black text-blue-500 uppercase tracking-widest">{hw.batches?.name || 'Academic Batch'}</p>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-6 pt-4">
                          <div className="flex items-center gap-2 text-slate-400">
                             <Clock size={16} />
                             <span className="text-xs font-bold">{new Date(hw.deadline).toLocaleDateString()}</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex md:flex-col gap-3 shrink-0">
                       <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                          Grade
                       </button>
                       <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:bg-slate-100 transition-all flex items-center justify-center">
                          <MoreVertical size={20} />
                       </button>
                    </div>
                 </div>
              ))}
              {homeworks.length === 0 && (
                <div className="bg-white rounded-[40px] p-20 border border-dashed border-slate-200 text-center space-y-4">
                   <AlertCircle className="mx-auto text-slate-200" size={48} />
                   <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No assignments dispatched yet.</p>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* Task Creation Modal */}
      {showCreateModal && (
         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6">
            <div className="bg-white rounded-[40px] p-12 max-w-2xl w-full space-y-8 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto relative">
               <button onClick={() => setShowCreateModal(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors">
                 <X size={24} />
               </button>
               
               <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Assign New Task</h2>
                  <p className="text-slate-500 font-medium">Define homework parameters and notify your batch students.</p>
               </div>

               <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Homework Title</label>
                     <input 
                      className="w-full bg-slate-50 rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900 transition-all" 
                      placeholder="e.g. Chapter 4 - Geometry Exercise 1" 
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                     />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Select Batch</label>
                        <select 
                          className="w-full bg-slate-50 rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900 transition-all appearance-none cursor-pointer"
                          onChange={(e) => setFormData({...formData, batch_id: e.target.value})}
                        >
                           <option value="">Choose...</option>
                           {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Deadline</label>
                        <input 
                          type="datetime-local" 
                          className="w-full bg-slate-50 rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900 transition-all cursor-pointer" 
                          onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                        />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Rich Description</label>
                     <textarea 
                      className="w-full bg-slate-50 rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900 transition-all h-32 resize-none" 
                      placeholder="Provide instructions, page numbers, etc..."
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                     ></textarea>
                  </div>
               </div>

               <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button 
                    onClick={handleCreate}
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all transform active:scale-95 disabled:opacity-50"
                  >
                     {isSubmitting ? 'Dispatching Signal...' : 'Blast Assignment'}
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
