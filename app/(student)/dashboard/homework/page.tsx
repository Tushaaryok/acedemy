'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  FileText, 
  Clock, 
  ChevronRight, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  Camera,
  X,
  Plus,
  Loader2
} from 'lucide-react';
import Image from 'next/image';

export default function StudentHomework() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fileUrl, setFileUrl] = useState('');

  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const [hwRes, subRes] = await Promise.all([
        supabase.from('homework').select('*, users!teacher_id(full_name), subjects(name)').order('created_at', { ascending: false }),
        supabase.from('homework_submissions').select('*').eq('student_id', session.user.id)
      ]);

      if (hwRes.data) setTasks(hwRes.data);
      if (subRes.data) setSubmissions(subRes.data);
      setLoading(false);
    }
    fetchData();
  }, [supabase]);

  const handleSubmit = async () => {
    if (!fileUrl.trim() || !selectedTask) return;
    setIsSubmitting(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    const { error } = await supabase.from('homework_submissions').insert([{
      homework_id: selectedTask.id,
      student_id: session?.user?.id,
      file_url: fileUrl,
      status: 'submitted'
    }]);

    if (!error) {
       alert('Lab Work Successfully Synchronized.');
       window.location.reload();
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Academic Lab</h1>
          <p className="text-slate-500 font-medium">Submit your homework scans and track your grades.</p>
        </div>
        <div className="bg-emerald-50 px-6 py-4 rounded-3xl border border-emerald-100 flex items-center gap-4">
           <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
              <CheckCircle2 size={24} />
           </div>
           <div>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">Score Today</p>
              <p className="text-2xl font-black text-slate-900">82 XP Earned</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left: Task List */}
        <div className="lg:col-span-2 space-y-6">
           <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <AlertCircle className="text-amber-500" /> Active Assignments
           </h2>
            <div className="space-y-4">
               {tasks.map(task => {
                 const isSubmitted = submissions.some(s => s.homework_id === task.id);
                 return (
                   <div 
                     key={task.id} 
                     onClick={() => !isSubmitted && setSelectedTask(task)}
                     className={`bg-white rounded-[40px] p-8 border hover:shadow-xl hover:shadow-blue-900/5 transition-all cursor-pointer flex flex-col md:flex-row gap-6 items-start group ${
                       selectedTask?.id === task.id ? 'border-blue-900 shadow-xl' : 'border-slate-100'
                     } ${isSubmitted ? 'opacity-70 grayscale-[0.5]' : ''}`}
                   >
                     <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform ${
                        isSubmitted ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                     }`}>
                        {isSubmitted ? <CheckCircle2 size={24} /> : <FileText size={24} />}
                     </div>
                     
                     <div className="flex-1 space-y-2">
                        <h3 className="text-lg font-bold text-slate-900 uppercase italic">{task.title}</h3>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                           <span className="text-blue-600 underline underline-offset-4">{task.subjects?.name}</span>
                           <span>{task.users?.full_name}</span>
                           <span className={`flex items-center gap-1 ${task.urgency === 'high' ? 'text-rose-500' : ''}`}>
                              <Clock size={12} /> {new Date(task.deadline).toLocaleDateString()}
                           </span>
                        </div>
                     </div>
 
                     <div className="flex items-center gap-4">
                        {isSubmitted ? (
                          <span className="bg-emerald-600 text-white px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-600/20">Verified</span>
                        ) : (
                          <button className="bg-blue-900 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2">
                             SUBMIT <ChevronRight size={14} />
                          </button>
                        )}
                     </div>
                   </div>
                 );
               })}
               {tasks.length === 0 && !loading && (
                 <div className="py-20 text-center text-slate-300 italic text-sm">No assignments published for your batch yet.</div>
               )}
            </div>
         </div>
 
         {/* Right: Submission Panel (Dynamic) */}
         <aside className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-10 lg:sticky lg:top-8 overflow-hidden relative">
            {selectedTask ? (
              <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-300">
                 <div>
                    <h2 className="text-2xl font-black text-slate-900 leading-tight mb-2 uppercase">Sync Lab Work</h2>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest italic">{selectedTask.title}</p>
                 </div>
 
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Submission Link (PDF/Image)</label>
                       <input 
                         value={fileUrl}
                         onChange={(e) => setFileUrl(e.target.value)}
                         placeholder="Paste your link..."
                         className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-bold outline-none focus:ring-4 focus:ring-blue-900/5 transition-all"
                       />
                    </div>
 
                    <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100/50 space-y-2">
                       <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-1 leading-none">Submission Protocol</p>
                       <p className="text-[11px] text-slate-500 italic leading-relaxed">Ensure the document is public or accessible to faculty. Preferred formats: Google Drive, Cloudinary, or PDF links.</p>
                    </div>
                 </div>
 
                 <button 
                   disabled={!fileUrl.trim() || isSubmitting}
                   onClick={handleSubmit}
                   className="w-full bg-blue-900 text-white p-6 rounded-3xl font-black text-xs uppercase tracking-[3px] shadow-2xl shadow-blue-900/30 hover:bg-black transform active:scale-95 transition-all disabled:opacity-50"
                 >
                    {isSubmitting ? 'VERIFYING ASSET...' : 'LEGALIZE SUBMISSION'}
                 </button>
 
                 <button 
                   onClick={() => setSelectedTask(null)}
                   className="w-full text-slate-400 text-[10px] font-black uppercase tracking-widest py-2 hover:text-slate-900"
                 >
                   Back to registry
                 </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                 <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner animate-bounce">🎯</div>
                 <h3 className="text-lg font-bold text-slate-900 mb-2 uppercase italic">Digital Lab Ready.</h3>
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-widest opacity-60 leading-relaxed">Select an active assignment from the registry to initialize your uplink.</p>
              </div>
            )}

           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        </aside>
      </div>

      {/* Stats Table / History */}
      <section className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-sm">
         <h2 className="text-2xl font-black text-slate-900 mb-8">Homework Analytics</h2>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: 'Completed', value: '24', icon: <CheckCircle2 className="text-emerald-500" /> },
              { label: 'Pending', value: '2', icon: <AlertCircle className="text-amber-500" /> },
              { label: 'Avg Grade', value: 'A+', icon: <span className="text-blue-900 font-black">A+</span> },
              { label: 'Global Rank', value: '#14', icon: <span className="text-amber-600 font-black">#14</span> },
            ].map(stat => (
              <div key={stat.label} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-md transition-all">
                 <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</span>
                    {typeof stat.icon === 'string' ? stat.icon : stat.icon}
                 </div>
                 <p className="text-3xl font-black text-slate-900">{stat.value}</p>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}
