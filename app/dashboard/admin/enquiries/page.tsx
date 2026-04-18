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
  GraduationCap
} from 'lucide-react';

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
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
                          <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg transition-all">
                             <MoreHorizontal size={18} />
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
    </div>
  );
}

function TrendingUp({ size, className }: { size?: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
       <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
       <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
