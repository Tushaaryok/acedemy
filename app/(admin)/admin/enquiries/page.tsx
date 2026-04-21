'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  Inbox, 
  Search, 
  Filter, 
  Phone, 
  User, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  XCircle,
  MoreHorizontal,
  Mail,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Eye,
  X,
  Loader2
} from 'lucide-react';

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [note, setNote] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);
  
  const supabase = createClient();

  useEffect(() => {
    async function fetchEnquiries() {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setEnquiries(data);
      setLoading(false);
    }
    fetchEnquiries();
  }, [supabase]);

  const saveNote = async () => {
    if (!selectedEnquiry) return;
    setIsSavingNote(true);
    const { error } = await supabase
      .from('enquiries')
      .update({ notes: note })
      .eq('id', selectedEnquiry.id);
    
    if (!error) {
       setSelectedEnquiry({...selectedEnquiry, notes: note});
       setEnquiries(enquiries.map(e => e.id === selectedEnquiry.id ? { ...e, notes: note } : e));
    }
    setIsSavingNote(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('enquiries')
      .update({ status: newStatus })
      .eq('id', id);
    
    if (!error) {
      setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e));
    }
  };

  const filteredEnquiries = enquiries.filter(e => {
    const matchesFilter = filter === 'all' || e.status === filter;
    const matchesSearch = e.student_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.phone.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 gap-4">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-500 font-bold animate-pulse tracking-widest uppercase text-xs">Syncing Admission Leads...</p>
    </div>
  );

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10 min-h-screen bg-gray-50/20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Admission Desk</h1>
          <p className="text-slate-500 font-medium text-lg mt-2">Track potential students and manage outreach status.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative flex-1 sm:min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              placeholder="Search by name or mobile..." 
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
             {['all', 'new', 'contacted', 'enrolled'].map(st => (
               <button 
                 key={st}
                 onClick={() => setFilter(st)}
                 className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                   filter === st ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-400 hover:text-slate-600'
                 }`}
               >
                 {st}
               </button>
             ))}
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Enquiries', value: enquiries.length, color: 'bg-indigo-50 text-indigo-600', icon: <Inbox size={20} /> },
          { label: 'New Today', value: enquiries.filter(e => new Date(e.created_at).toDateString() === new Date().toDateString()).length, color: 'bg-rose-50 text-rose-600', icon: <Sparkles size={20} /> },
          { label: 'Contacted', value: enquiries.filter(e => e.status === 'contacted').length, color: 'bg-amber-50 text-amber-600', icon: <Phone size={20} /> },
          { label: 'Conversion Rate', value: enquiries.length > 0 ? Math.round((enquiries.filter(e => e.status === 'enrolled').length / enquiries.length) * 100) + '%' : '0%', color: 'bg-emerald-50 text-emerald-600', icon: <TrendingUp size={20} /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
             <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center mb-4`}>{stat.icon}</div>
             <p className="text-3xl font-black text-slate-900 leading-none">{stat.value}</p>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-2xl shadow-slate-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-100">
              <tr>
                <th className="px-10 py-6">Applicant Info</th>
                <th className="px-10 py-6">Academic Interest</th>
                <th className="px-10 py-6 text-center">Desk Status</th>
                <th className="px-10 py-6 text-right">Administrative</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEnquiries.length === 0 ? (
                <tr>
                   <td colSpan={4} className="py-24 text-center">
                      <div className="opacity-20 space-y-4">
                         <Inbox size={48} className="mx-auto" />
                         <p className="font-black italic uppercase tracking-widest text-xs">No active leads match that criteria</p>
                      </div>
                   </td>
                </tr>
              ) : (
                filteredEnquiries.map((e) => (
                  <tr key={e.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                    <td className="px-10 py-7">
                       <div className="flex items-center gap-5">
                          <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black shadow-sm group-hover:scale-110 transition-transform">
                             {e.student_name.charAt(0)}
                          </div>
                          <div>
                             <span className="block font-black text-slate-800 text-base leading-none mb-1">{e.student_name}</span>
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Parent: {e.parent_name}</span>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-7">
                       <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-slate-600">
                             <GraduationCap size={14} className="text-slate-300" />
                             <span className="text-xs font-bold text-slate-700">{e.class} • {e.board}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                             <Phone size={14} className="text-slate-300" />
                             <span className="text-xs font-bold">{e.phone}</span>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-7 text-center">
                       <div className="flex flex-col items-center gap-1.5">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                            e.status === 'new' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                            e.status === 'contacted' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                            'bg-emerald-50 text-emerald-600 border-emerald-100'
                          }`}>
                             {e.status}
                          </span>
                          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                             {new Date(e.created_at).toLocaleDateString()}
                          </span>
                       </div>
                    </td>
                    <td className="px-10 py-7 text-right">
                       <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => updateStatus(e.id, 'contacted')}
                            className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all"
                            title="Mark as Contacted"
                          >
                             <Phone size={18} />
                          </button>
                          <button 
                            onClick={() => updateStatus(e.id, 'enrolled')}
                            className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"
                            title="Mark as Enrolled"
                          >
                             <CheckCircle2 size={18} />
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedEnquiry(e);
                              setNote(e.notes || '');
                            }}
                            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
                            title="View Full Intel"
                          >
                             <Eye size={18} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Enquiry Modal */}
      {selectedEnquiry && (
         <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-6 z-[100] animate-in fade-in duration-300">
            <div className="bg-white rounded-[56px] p-12 max-w-2xl w-full space-y-10 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-500">
               <button 
                 onClick={() => setSelectedEnquiry(null)}
                 className="absolute top-10 right-10 p-2 text-slate-300 hover:text-slate-900 transition-colors"
               >
                 <X size={24} />
               </button>

               <header className="space-y-4">
                  <div className="flex items-center gap-3">
                     <div className="h-14 w-14 rounded-3xl bg-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-indigo-600/20">
                        {selectedEnquiry.student_name.charAt(0)}
                     </div>
                     <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">{selectedEnquiry.student_name}</h2>
                        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2 italic">Applied for {selectedEnquiry.class}</p>
                     </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                     <span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
                        <CheckCircle2 size={12} /> {selectedEnquiry.status}
                     </span>
                     <span className="bg-slate-50 text-slate-400 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100 flex items-center gap-2">
                        <Calendar size={12} /> {new Date(selectedEnquiry.created_at).toLocaleString()}
                     </span>
                  </div>
               </header>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-slate-50">
                  <div className="space-y-4">
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Communication Access</p>
                     <div className="space-y-3">
                        <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                           <Phone size={14} className="text-indigo-400" /> {selectedEnquiry.phone}
                        </div>
                        <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                           <User size={14} className="text-indigo-400" /> Guardian: {selectedEnquiry.parent_name}
                        </div>
                        <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                           <Inbox size={14} className="text-indigo-400" /> Source: {selectedEnquiry.source || 'Website'}
                        </div>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Personal Message</p>
                     <div className="bg-indigo-50/50 p-6 rounded-3xl text-sm font-medium text-slate-600 italic leading-relaxed border border-indigo-50">
                        "{selectedEnquiry.message || 'No additional message provided from applicant party.'}"
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Internal Administrative Notes</label>
                     <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest italic">Confidential</span>
                  </div>
                  <textarea 
                    rows={4}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Document conversation history, callbacks, or special requirements..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-[32px] p-8 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all resize-none"
                  />
               </div>

               <div className="flex gap-4">
                  <button 
                    onClick={saveNote}
                    disabled={isSavingNote}
                    className="flex-1 bg-slate-900 text-white py-5 rounded-[24px] font-black text-xs uppercase tracking-[3px] shadow-2xl shadow-slate-900/30 hover:bg-indigo-600 transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50"
                  >
                     {isSavingNote ? <Loader2 size={20} className="animate-spin" /> : 'SYNCHRONIZE NOTES'}
                  </button>
                  <a 
                    href={`tel:${selectedEnquiry.phone}`}
                    className="p-5 bg-emerald-50 text-emerald-600 rounded-[24px] border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all shadow-lg shadow-emerald-500/10"
                  >
                     <Phone size={24} />
                  </a>
               </div>
            </div>
         </div>
       )}
    </div>
  );
}
