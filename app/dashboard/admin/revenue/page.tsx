'use client';

import { 
  TrendingUp, 
  ArrowUpRight, 
  CreditCard, 
  Users, 
  Calendar,
  Filter,
  Download,
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function AdminRevenue() {
  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="space-y-4">
           <h1 className="text-5xl font-baloo font-bold text-slate-900 tracking-tight">Revenue IQ</h1>
           <p className="text-slate-500 font-medium text-lg">Financial health oversight and fee collection analytics.</p>
        </div>
        <div className="flex items-center gap-4 w-full lg:w-auto">
           <button className="flex-1 lg:flex-none flex items-center justify-center gap-3 bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
              <Download size={18} /> Financial Audit PDF
           </button>
           <button className="flex-1 lg:flex-none bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-900/40">
              CREATE INVOICE
           </button>
        </div>
      </div>

      {/* Hero Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-3 bg-white rounded-[48px] border border-slate-100 shadow-sm p-10 space-y-12">
            <div className="flex justify-between items-end">
               <div>
                  <h3 className="text-2xl font-baloo font-bold text-slate-900">Collection Velocity</h3>
                  <p className="text-xs font-medium text-slate-400">Comparing current term vs previous semester.</p>
               </div>
               <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase"><div className="w-2 h-2 bg-indigo-600 rounded-full"></div> Term II</div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase"><div className="w-2 h-2 bg-slate-200 rounded-full"></div> Term I</div>
               </div>
            </div>

            {/* Visual Bars (CSS/SVG) */}
            <div className="flex items-baseline justify-between h-64 gap-6 px-10">
               {[
                 { month: 'Jan', v1: '40%', v2: '60%' },
                 { month: 'Feb', v1: '55%', v2: '75%' },
                 { month: 'Mar', v1: '85%', v2: '95%' },
                 { month: 'Apr', v1: '70%', v2: '80%' },
                 { month: 'May', v1: '90%', v2: '100%' },
                 { month: 'Jun', v1: '30%', v2: '45%' },
               ].map((d, i) => (
                 <div key={i} className="flex-1 flex flex-col items-center gap-4 h-full group">
                    <div className="flex-1 w-full bg-slate-50 rounded-2xl relative flex items-end justify-center gap-1.5 p-1.5">
                       <div className="w-full bg-slate-200 rounded-t-lg transition-all" style={{ height: d.v1 }}></div>
                       <div className="w-full bg-indigo-600 rounded-t-lg transition-all shadow-lg shadow-indigo-600/20 group-hover:bg-indigo-500" style={{ height: d.v2 }}></div>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{d.month}</span>
                 </div>
               ))}
            </div>
         </div>

         <div className="space-y-8">
            <div className="bg-emerald-600 p-10 rounded-[40px] text-white shadow-2xl shadow-emerald-500/20 relative overflow-hidden group">
               <div className="relative z-10 space-y-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100">Total Collected</p>
                  <h4 className="text-4xl font-baloo font-bold">₹14.2 L</h4>
                  <div className="flex items-center gap-2 text-[10px] font-black bg-white/10 w-fit px-3 py-1 rounded-full border border-white/10">
                     <TrendingUp size={12} /> +12% vs LY
                  </div>
               </div>
               <div className="absolute -right-10 -bottom-10 opacity-10 transform -rotate-12 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={200} />
               </div>
            </div>

            <div className="bg-slate-900 p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
               <div className="relative z-10 space-y-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Outstanding</p>
                  <h4 className="text-4xl font-baloo font-bold text-rose-400">₹2.8 L</h4>
                  <button className="w-full flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors py-4 border-t border-white/5">
                     SEND REMINDERS <ChevronRight size={16} />
                  </button>
               </div>
            </div>
         </div>
      </div>

      {/* Detailed Ledger Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
            <div className="flex justify-between items-center">
               <h4 className="text-xl font-baloo font-bold text-slate-900">Upcoming Dues</h4>
               <span className="text-[10px] font-black text-rose-500 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-100">8 Critical</span>
            </div>
            <div className="space-y-4">
               {[
                 { name: 'Amit Vithani', amount: '₹5,000', date: '25 Jun', batch: 'Std 12 Science' },
                 { name: 'Priya Mehta', amount: '₹12,400', date: '28 Jun', batch: 'Std 10 Board' },
                 { name: 'Arjun Shah', amount: '₹5,000', date: '02 Jul', batch: 'Std 12 Commerce' },
               ].map((due, i) => (
                 <div key={i} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl group hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-bold text-slate-400 shadow-sm">
                          {due.name.charAt(0)}
                       </div>
                       <div>
                          <p className="font-bold text-slate-900 text-sm leading-none mb-1">{due.name}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{due.batch}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="font-black text-slate-900">{due.amount}</p>
                       <p className="text-[10px] font-bold text-rose-500 uppercase">Due {due.date}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
            <h4 className="text-xl font-baloo font-bold text-slate-900">Collection Channels</h4>
            <div className="space-y-8 py-4">
               {[
                 { label: 'Direct UPI Pay', value: 68, color: 'bg-indigo-600' },
                 { label: 'Bank Transfers', value: 22, color: 'bg-emerald-500' },
                 { label: 'Cash / Manual', value: 10, color: 'bg-amber-400' },
               ].map((chan) => (
                 <div key={chan.label} className="space-y-3">
                    <div className="flex justify-between items-end">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{chan.label}</p>
                       <p className="font-black text-slate-900">{chan.value}%</p>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className={`h-full ${chan.color} rounded-full`} style={{ width: `${chan.value}%` }}></div>
                    </div>
                 </div>
               ))}
            </div>
            <div className="pt-6 border-t border-slate-50">
               <div className="flex items-center gap-3 bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
                  <Sparkles size={20} className="text-indigo-600" />
                  <p className="text-xs font-medium text-slate-700 leading-relaxed">
                     Your digital collection adoption has increased by <span className="font-bold text-indigo-600">14%</span> this term. 
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
