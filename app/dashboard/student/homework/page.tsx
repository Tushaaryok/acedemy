'use client';
import { useState } from 'react';
import { 
  FileText, 
  Clock, 
  ChevronRight, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  Camera,
  X,
  Plus
} from 'lucide-react';
import Image from 'next/image';

export default function StudentHomework() {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const TASKS = [
    { id: '1', title: 'Calculus Exercise 3.2', subject: 'Mathematics', teacher: 'Ram Sir', deadline: 'Today, 11:59 PM', urgency: 'high', status: 'pending' },
    { id: '2', title: 'Tenses Practice Sheet', subject: 'English', teacher: 'Yashvant Sir', deadline: 'In 2 days', urgency: 'medium', status: 'pending' },
    { id: '3', title: 'Unit 4 Mock Test Prep', subject: 'Physics', teacher: 'Ram Sir', deadline: 'Completed', urgency: 'none', status: 'submitted' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
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
              {TASKS.map(task => (
                 <div 
                   key={task.id} 
                   onClick={() => setSelectedTask(task)}
                   className={`bg-white rounded-[40px] p-8 border hover:shadow-xl hover:shadow-blue-900/5 transition-all cursor-pointer flex flex-col md:flex-row gap-6 items-start group ${
                     selectedTask?.id === task.id ? 'border-blue-900 shadow-xl' : 'border-slate-100'
                   }`}
                 >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform ${
                       task.status === 'submitted' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                    }`}>
                       {task.status === 'submitted' ? <CheckCircle2 size={24} /> : <FileText size={24} />}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                       <h3 className="text-lg font-bold text-slate-900">{task.title}</h3>
                       <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                          <span className="text-blue-600 underline underline-offset-4">{task.subject}</span>
                          <span>{task.teacher}</span>
                          <span className={`flex items-center gap-1 ${task.urgency === 'high' ? 'text-rose-500' : ''}`}>
                             <Clock size={12} /> {task.deadline}
                          </span>
                       </div>
                    </div>

                    <div className="flex items-center gap-4">
                       {task.status === 'submitted' ? (
                         <span className="bg-emerald-100 text-emerald-600 px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest">Submitted</span>
                       ) : (
                         <button className="bg-blue-900 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition-all flex items-center gap-2">
                            Submit Now <ChevronRight size={14} />
                         </button>
                       )}
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Right: Submission Panel (Dynamic) */}
        <aside className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-10 lg:sticky lg:top-8 overflow-hidden relative">
           {selectedTask ? (
             <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-300">
                <div>
                   <h2 className="text-2xl font-black text-slate-900 leading-tight mb-2">Finalize Submission</h2>
                   <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{selectedTask.title}</p>
                </div>

                <div className="space-y-4">
                   {/* File Preview List */}
                   <div className="space-y-2">
                      {files.map((file, i) => (
                         <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group animate-in zoom-in-95">
                            <div className="flex items-center gap-3">
                               <div className="text-blue-900"><FileText size={18} /></div>
                               <span className="text-xs font-bold text-slate-700 truncate max-w-[120px]">{file.name}</span>
                            </div>
                            <button onClick={() => removeFile(i)} className="text-slate-300 hover:text-rose-500 hover:scale-110 transition-all"><X size={16} /></button>
                         </div>
                      ))}
                      {files.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-slate-100 rounded-[32px] opacity-40">
                           <Upload size={32} className="mb-2" />
                           <p className="text-[10px] font-black uppercase">No files selected</p>
                        </div>
                      )}
                   </div>

                   {/* Upload Buttons */}
                   <div className="grid grid-cols-2 gap-4">
                      <label className="flex-1 flex flex-col items-center justify-center p-4 rounded-3xl bg-slate-50 text-slate-600 hover:bg-blue-900 hover:text-white transition-all cursor-pointer group shadow-sm border border-slate-100 hover:border-blue-900">
                         <input type="file" multiple className="hidden" onChange={handleFileChange} />
                         <Upload size={20} className="mb-2 group-hover:-translate-y-1 transition-transform" />
                         <span className="text-[10px] font-black uppercase tracking-widest">Upload PDF</span>
                      </label>
                      <button className="flex-1 flex flex-col items-center justify-center p-4 rounded-3xl bg-slate-50 text-slate-600 hover:bg-amber-500 hover:text-white transition-all group shadow-sm border border-slate-100 hover:border-amber-500">
                         <Camera size={20} className="mb-2 group-hover:scale-110 transition-transform" />
                         <span className="text-[10px] font-black uppercase tracking-widest">Take Photo</span>
                      </button>
                   </div>
                </div>

                <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100/50 space-y-?">
                   <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-2">Important Instructions</p>
                   <p className="text-xs text-slate-500 italic leading-relaxed">Please ensure handwriting is legible and lighting in photos is bright. Merge multiple pages into one PDF if possible.</p>
                </div>

                <button 
                  disabled={files.length === 0 || isSubmitting}
                  onClick={() => {
                    setIsSubmitting(true);
                    setTimeout(() => { setIsSubmitting(false); setSelectedTask(null); setFiles([]); }, 2000);
                  }}
                  className="w-full bg-blue-900 text-white p-6 rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-blue-800 transform active:scale-95 transition-all disabled:opacity-50"
                >
                   {isSubmitting ? 'SYNCING LAB WORK...' : 'UPLOAD & EARN XP'}
                </button>
             </div>
           ) : (
             <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">🎯</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Ready to work?</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">Select an active assignment from the list to start your submission.</p>
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
