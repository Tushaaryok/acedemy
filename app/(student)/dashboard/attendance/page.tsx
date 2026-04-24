'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  TrendingUp,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';

export default function StudentAttendance() {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ present: 0, absent: 0, late: 0, percentage: 0 });

  const supabase = createClient();

  useEffect(() => {
    async function fetchAttendance() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data } = await supabase
        .from('attendance')
        .select('*, subjects(name), marked_by_user:users!attendance_marked_by_fkey(full_name)')
        .eq('student_id', session.public_users.id)
        .order('date', { ascending: false });

      if (data) {
        setAttendance(data);
        
        const p = data.filter((a: any) => a.status === 'present').length;
        const ab = data.filter((a: any) => a.status === 'absent').length;
        const l = data.filter((a: any) => a.status === 'late').length;
        const total = data.length;
        
        setStats({
          present: p,
          absent: ab,
          late: l,
          percentage: total > 0 ? Math.round(((p + l * 0.5) / total) * 100) : 0
        });
      }
      setLoading(false);
    }
    fetchAttendance();
  }, [supabase]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 gap-4">
      <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-500 font-bold animate-pulse tracking-widest uppercase text-xs">Fetching Attendance Pulse...</p>
    </div>
  );

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-12 min-h-screen bg-white/50">
      
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
           <div className="flex items-center gap-2 text-amber-600 font-black text-[10px] uppercase tracking-widest bg-amber-50 w-fit px-3 py-1 rounded-full border border-amber-100 mb-2">
              <Calendar size={12} /> Compliance Node
           </div>
           <h1 className="text-5xl font-black text-slate-900 tracking-tighter">My Attendance</h1>
           <p className="text-slate-500 font-medium text-lg mt-2">Track your physical presence and academic consistency.</p>
        </div>
        
        <div className="flex bg-white px-8 py-5 rounded-[32px] border border-slate-100 shadow-sm items-center gap-6 group">
           <div className="text-center border-r border-slate-100 pr-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Consistency</p>
              <p className={`text-3xl font-black ${stats.percentage >= 75 ? 'text-emerald-600' : 'text-rose-600'}`}>{stats.percentage}%</p>
           </div>
           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${stats.percentage >= 75 ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-rose-500 shadow-rose-500/20'}`}>
              <TrendingUp size={24} />
           </div>
        </div>
      </header>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Classes Present', value: stats.present, icon: <CheckCircle2 size={24} />, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Absent Count', value: stats.absent, icon: <XCircle size={24} />, color: 'bg-rose-50 text-rose-600' },
          { label: 'Late Entries', value: stats.late, icon: <Clock size={24} />, color: 'bg-amber-50 text-amber-600' },
          { label: 'Total Sessions', value: attendance.length, icon: <Calendar size={24} />, color: 'bg-slate-50 text-slate-400' },
        ].map(stat => (
          <div key={stat.label} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm group hover:scale-[1.02] transition-all">
             <div className={`${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner`}>
                {stat.icon}
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
             <p className="text-4xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Log Feed */}
      <div className="bg-white rounded-[56px] border border-slate-200/60 shadow-2xl shadow-slate-200/40 overflow-hidden">
        <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between">
           <h2 className="text-xl font-black text-slate-900 tracking-tight">Chronological Log</h2>
           <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all">
              <Filter size={14} /> Refine View
           </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-100">
              <tr>
                <th className="px-10 py-6">Lecture Matrix</th>
                <th className="px-10 py-6">Timeline</th>
                <th className="px-10 py-6 text-center">Status</th>
                <th className="px-10 py-6 text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendance.map((log) => (
                <tr key={log.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                  <td className="px-10 py-8">
                     <div className="flex items-center gap-5">
                        <div className="h-12 w-12 rounded-xl bg-slate-900 text-amber-500 flex items-center justify-center font-black text-xs shadow-xl">
                          L{log.lecture_no}
                        </div>
                        <div>
                          <span className="block font-black text-slate-800 text-lg leading-none mb-1">{log.subjects?.name}</span>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic leading-none">Instructor: {log.marked_by_user?.full_name}</span>
                        </div>
                     </div>
                  </td>
                  <td className="px-10 py-8">
                     <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900">{new Date(log.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{new Date(log.date).toLocaleDateString('en-IN', { weekday: 'long' })}</span>
                     </div>
                  </td>
                  <td className="px-10 py-8">
                     <div className="flex justify-center">
                        <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          log.status === 'present' ? 'bg-emerald-50 text-emerald-600 ring-4 ring-emerald-500/5' :
                          log.status === 'absent' ? 'bg-rose-50 text-rose-600 ring-4 ring-rose-500/5' :
                          'bg-amber-50 text-amber-600 ring-4 ring-amber-500/5'
                        }`}>
                          {log.status === 'present' ? <CheckCircle2 size={12} /> : 
                           log.status === 'absent' ? <XCircle size={12} /> : <Clock size={12} />}
                          {log.status}
                        </div>
                     </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                     <div className="flex flex-col items-end opacity-20 group-hover:opacity-100 transition-opacity">
                        <span className="text-[8px] font-mono text-slate-400 select-all">{log.id.slice(0, 16).toUpperCase()}</span>
                        <span className="text-[8px] font-black uppercase text-slate-300 mt-1">Verified Audit</span>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {attendance.length === 0 && (
             <div className="py-24 text-center space-y-6">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200 shadow-inner">
                   <AlertCircle size={48} />
                </div>
                <div className="space-y-1">
                   <p className="font-black text-slate-800 uppercase tracking-widest text-sm">Clear Horizons</p>
                   <p className="text-slate-400 text-xs font-medium italic">No attendance markers detected for your profile yet.</p>
                </div>
             </div>
          )}
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="bg-amber-100/30 p-10 rounded-[56px] border border-amber-200/50 flex flex-col md:flex-row items-center gap-8">
         <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-amber-500/20">
            <AlertCircle size={32} />
         </div>
         <div className="flex-1 space-y-2 text-center md:text-left">
            <h4 className="text-xl font-black text-amber-900 tracking-tight">Institutional Compliance Notice</h4>
            <p className="text-amber-800 text-sm font-medium leading-relaxed max-w-2xl italic">
               Minimum 75% attendance is mandatory for academic promotion and board examination clearance. 
               Please contact the Administration if you notice any discrepancies in your pulse logs.
            </p>
         </div>
      </div>
    </div>
  );
}
