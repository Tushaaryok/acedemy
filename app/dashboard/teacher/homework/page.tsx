'use client';
import { useState } from 'react';
import { 
  Plus, 
  FileText, 
  Users, 
  CheckCircle2, 
  Clock, 
  Search, 
  Calendar, 
  FileUp, 
  MoreVertical,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export default function TeacherHomework() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const HOMEWORKS = [
    { id: '1', title: 'Calculus Exercise 3.2', batch: 'Std 12 Science A', deadline: 'Today, 11:59 PM', submissions: 32, total: 45, status: 'active' },
    { id: '2', title: 'English Grammar Quiz - Tenses', batch: 'Std 10 Commerce B', deadline: 'Tomorrow, 08:00 AM', submissions: 12, total: 40, status: 'draft' },
    { id: '3', title: 'Physics Numerical: Unit 4', batch: 'Std 11 Science', deadline: 'Exp. 2d ago', submissions: 38, total: 38, status: 'completed' },
  ];

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

           <div className="bg-rose-900 rounded-[32px] p-8 text-white">
              <h3 className="text-lg font-black mb-2 flex items-center gap-2">
                 <AlertCircle size={20} /> Urgent Review
              </h3>
              <p className="text-rose-100 text-xs font-medium mb-6">3 batches have reached their deadline. Start grading to maintain streak.</p>
              <div className="space-y-3">
                 {[1, 2].map(i => (
                    <div key={i} className="bg-white/10 p-4 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-white/20 transition-all">
                       <span className="text-xs font-bold uppercase tracking-widest">Std 12 Chemistry</span>
                       <ChevronRight size={16} className="text-rose-300" />
                    </div>
                 ))}
              </div>
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
              {HOMEWORKS.map(hw => (
                 <div key={hw.id} className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-start hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl shrink-0 transition-transform group-hover:scale-110 ${
                       hw.status === 'active' ? 'bg-blue-50 text-blue-900' : hw.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                    }`}>
                       <FileText size={32} />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                       <div className="flex justify-between items-start">
                          <div>
                             <h4 className="text-xl font-bold text-slate-900">{hw.title}</h4>
                             <p className="text-xs font-black text-blue-500 uppercase tracking-widest">{hw.batch}</p>
                          </div>
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                             hw.status === 'active' ? 'bg-blue-900 text-white' : hw.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                          }`}>
                             {hw.status}
                          </span>
                       </div>
                       
                       <div className="flex items-center gap-6 pt-4">
                          <div className="flex items-center gap-2 text-slate-400">
                             <Clock size={16} />
                             <span className="text-xs font-bold">{hw.deadline}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                             <Users size={16} />
                             <span className="text-xs font-bold">{hw.submissions}/{hw.total} Submissions</span>
                          </div>
                       </div>

                       {/* Submission Bar */}
                       <div className="pt-4 space-y-2">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                             <span>Progress</span>
                             <span>{Math.round((hw.submissions / hw.total) * 100)}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                             <div className={`h-full transition-all duration-1000 ${hw.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-900'}`} style={{ width: `${(hw.submissions / hw.total) * 100}%` }}></div>
                          </div>
                       </div>
                    </div>

                    <div className="flex md:flex-col gap-3 shrink-0">
                       <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                          {hw.status === 'completed' ? 'Recap' : 'Grade'}
                       </button>
                       <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:bg-slate-100 transition-all flex items-center justify-center">
                          <MoreVertical size={20} />
                       </button>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>

      {/* Task Creation Modal Placeholder */}
      {showCreateModal && (
         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6">
            <div className="bg-white rounded-[40px] p-12 max-w-2xl w-full space-y-8 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
               <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Assign New Task</h2>
                  <p className="text-slate-500 font-medium">Define homework parameters and notify your batch students.</p>
               </div>

               <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Homework Title</label>
                     <input className="w-full bg-slate-50 rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900 transition-all" placeholder="e.g. Chapter 4 - Geometry Exercise 1" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Select Batch</label>
                        <select className="w-full bg-slate-50 rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900 transition-all appearance-none cursor-pointer">
                           <option>Std 12 Science A</option>
                           <option>Std 10 Commerce B</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Deadline</label>
                        <input type="datetime-local" className="w-full bg-slate-50 rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900 transition-all cursor-pointer" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Rich Description</label>
                     <textarea className="w-full bg-slate-50 rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900 transition-all h-32 resize-none" placeholder="Provide instructions, page numbers, etc..."></textarea>
                  </div>
                  <div className="p-8 border-2 border-dashed border-slate-100 rounded-[32px] flex flex-col items-center justify-center text-center group cursor-pointer hover:border-blue-300 transition-all">
                      <FileUp className="text-slate-300 mb-4 group-hover:text-blue-500" size={32} />
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upload Reference PDF (Optional)</p>
                  </div>
               </div>

               <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button className="flex-1 bg-blue-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all transform active:scale-95">
                     Blast Assignment
                  </button>
                  <button 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 text-slate-400 font-bold py-5 hover:text-slate-600 transition-all">
                     Maybe Later
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
