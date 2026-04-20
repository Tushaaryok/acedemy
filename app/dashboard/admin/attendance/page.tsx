'use client';

import { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Search, 
  MoreVertical, 
  Mail, 
  Phone, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Filter,
  Download
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminAttendance() {
  const [filter, setFilter] = useState('All');

  const ATTENDANCE_LOG = [
    { id: '1', name: 'Amit Vithani', batch: 'Std 12 Sci', status: 'Present', time: '08:05 AM', parentNotified: true },
    { id: '2', name: 'Riya Patel', batch: 'Std 12 Sci', status: 'Absent', time: '---', parentNotified: false },
    { id: '3', name: 'Sameer Sheikh', batch: 'Std 10 Board', status: 'Present', time: '08:12 AM', parentNotified: true },
    { id: '4', name: 'Yash Joshi', batch: 'Std 12 Sci', status: 'Absent', time: '---', parentNotified: true },
  ];

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="space-y-4">
           <h1 className="text-5xl font-baloo font-bold text-slate-900 tracking-tight">Attendance IQ</h1>
           <p className="text-slate-500 font-medium text-lg italic uppercase tracking-wider text-xs font-black">Daily Check-in & Security Terminal</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-slate-100 text-slate-600 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all border border-slate-200">
              <Download size={18} className="inline mr-2" /> Daily Report
           </button>
           <button className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-105 transition-all">
              MARK ATTENDANCE
           </button>
        </div>
      </div>

      {/* Quick Trends */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Scholars</p>
            <p className="text-4xl font-baloo font-bold text-slate-900">852</p>
         </div>
         <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden group">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Present Today</p>
            <p className="text-4xl font-baloo font-bold text-emerald-600">794</p>
            <div className="mt-4 flex items-center gap-2 text-emerald-600 font-black text-[8px] uppercase tracking-widest">
               <TrendingUp size={10} /> 94% Rate
            </div>
         </div>
         <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 text-rose-400">Absentees Today</p>
            <p className="text-4xl font-baloo font-bold text-white">58</p>
            <div className="mt-4 flex items-center gap-2 text-rose-400 font-black text-[8px] uppercase tracking-widest">
               <AlertCircle size={10} /> 12 Urgent Alerts Sent
            </div>
         </div>
         <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Manual Entries</p>
            <p className="text-4xl font-baloo font-bold text-slate-900">04</p>
         </div>
      </div>

      {/* Main Filter & Table */}
      <div className="bg-white rounded-[48px] border border-slate-100 shadow-xl overflow-hidden">
         <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-4">
               {['All', 'Std 10', 'Std 12 Sci', 'Std 12 Com'].map(b => (
                 <button 
                  key={b}
                  onClick={() => setFilter(b)}
                  className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    filter === b ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 bg-slate-50'
                  }`}
                 >
                   {b}
                 </button>
               ))}
            </div>
            <div className="relative group flex-1 md:max-w-xs">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
               <input placeholder="Search scholar name..." className="w-full bg-slate-50 rounded-xl pl-12 pr-4 py-3 text-xs font-medium outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all" />
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-100">
                  <tr>
                     <th className="px-10 py-6">Student Info</th>
                     <th className="px-10 py-6">Status Log</th>
                     <th className="px-10 py-6">Parent Alert</th>
                     <th className="px-10 py-6 text-right">Audit</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {ATTENDANCE_LOG.filter(log => filter === 'All' || log.batch === filter).map((log) => (
                    <tr key={log.id} className="group hover:bg-slate-50/30 transition-all">
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-baloo font-bold">
                                {log.name.charAt(0)}
                             </div>
                             <div>
                                <p className="font-bold text-slate-900 text-sm leading-none mb-1">{log.name}</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{log.batch}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            log.status === 'Present' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                          }`}>
                             {log.status === 'Present' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                             {log.status} {log.time !== '---' && `• ${log.time}`}
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          {log.parentNotified ? (
                            <div className="flex items-center gap-2 text-indigo-600 font-black text-[9px] uppercase tracking-widest">
                               <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" /> SMS Sent
                            </div>
                          ) : (
                            <button className="text-[9px] font-bold text-slate-400 border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-900 hover:text-white transition-all">
                               Notify Parent now
                            </button>
                          )}
                       </td>
                       <td className="px-10 py-8 text-right">
                          <button className="p-3 text-slate-300 hover:text-slate-900 transition-colors">
                             <MoreVertical size={18} />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Abstract Grid Note */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-indigo-600 rounded-[48px] p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-600/30">
            <h4 className="text-3xl font-baloo font-bold mb-4 relative z-10">Absentee Outreach</h4>
            <p className="text-indigo-100 font-medium leading-relaxed mb-8 relative z-10">Instantly notify all 58 parents of absent scholars with a personalized WhatsApp message.</p>
            <button className="relative z-10 bg-white text-indigo-600 px-10 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
               SEND BULK ABSENT ALERTS
            </button>
            <div className="absolute -right-20 -bottom-20 opacity-10 transform scale-150">
               <Calendar size={300} />
            </div>
         </div>
         <div className="bg-slate-50 rounded-[48px] p-12 border border-slate-200 flex flex-col justify-center">
             <h4 className="text-xl font-baloo font-bold text-slate-900 mb-6">Security Tip</h4>
             <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Daily attendance logs are strictly maintained for institutional compliance. Any manual override will be logged under the current Admin session ID.
             </p>
         </div>
      </div>
    </div>
  );
}
