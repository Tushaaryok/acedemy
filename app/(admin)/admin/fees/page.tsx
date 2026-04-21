'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  CreditCard, 
  Search, 
  TrendingUp, 
  AlertCircle, 
  Download, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  ArrowUpRight
} from 'lucide-react';

export default function FeeManagement() {
  const [fees, setFees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const supabase = createClient();

  useEffect(() => {
    async function fetchFees() {
      const { data, error } = await supabase
        .from('fees')
        .select('*, users(full_name)');
      
      if (data) setFees(data);
      setLoading(false);
    }
    fetchFees();
  }, [supabase]);

  const totalOutstanding = fees
    .filter(f => f.status === 'pending')
    .reduce((acc: number, f: any) => acc + Number(f.amount), 0);

  const totalCollected = fees
    .filter(f => f.status === 'paid' || f.status === 'verified')
    .reduce((acc: number, f: any) => acc + Number(f.amount), 0);

  const filteredFees = fees.filter(f => filter === 'all' ? true : f.status === filter);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 gap-4">
      <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-500 font-bold animate-pulse tracking-widest uppercase text-xs">Syncing Financial Records...</p>
    </div>
  );

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10 min-h-screen bg-gray-50/20">
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Revenue Vault</h1>
          <p className="text-slate-500 font-medium text-lg mt-2">Monitor cash-flow and manage institutional dues.</p>
        </div>
        <div className="flex gap-4 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-4 rounded-2xl font-black hover:bg-slate-50 transition-all text-sm shadow-sm group">
            <Download size={18} className="group-hover:translate-y-0.5 transition-transform" /> EXPORT AUDIT
          </button>
          <button className="flex-1 lg:flex-none bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all text-sm shadow-xl shadow-slate-900/10">
            FEE STRUCTURE
          </button>
        </div>
      </header>

      {/* Financial Pulse Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Total Outstanding</p>
            <p className="text-5xl font-black text-slate-900 tracking-tighter">₹{totalOutstanding.toLocaleString('en-IN')}</p>
            <div className="mt-6 flex items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                <AlertCircle size={12} /> Priority Recovery
              </span>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 text-slate-50 transform rotate-12 group-hover:scale-110 transition-transform">
             <CreditCard size={140} />
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Collected Volume</p>
            <p className="text-5xl font-black text-white tracking-tighter">₹{totalCollected.toLocaleString('en-IN')}</p>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex-1 bg-white/10 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-emerald-400 h-full w-[82%] shadow-[0_0_15px_rgba(52,211,153,0.5)]"></div>
              </div>
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">82% of Goal</span>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 text-white/5 transform -rotate-12">
             <TrendingUp size={160} />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm sm:col-span-2 lg:col-span-1">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Quick Insights</p>
           <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                 <span className="font-bold text-slate-500">Partial Payments</span>
                 <span className="font-black text-slate-900">12%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                 <span className="font-bold text-slate-500">Digital Adoption</span>
                 <span className="font-black text-emerald-600">94%</span>
              </div>
              <button className="w-full mt-4 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all pt-4 border-t border-slate-50">
                 Detailed Analytics <ArrowUpRight size={14} />
              </button>
           </div>
        </div>
      </div>

      {/* Records Engine */}
      <div className="bg-white rounded-[48px] border border-slate-200/60 shadow-2xl shadow-slate-200/30 overflow-hidden">
        <div className="px-10 py-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Financial ledger</h2>
          <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:min-w-[240px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input placeholder="Search records..." className="w-full bg-slate-50/50 border border-slate-100 rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium outline-none focus:ring-4 focus:ring-slate-900/5 transition-all" />
             </div>
             <div className="flex bg-slate-100 p-1.5 rounded-xl">
                {['all', 'paid', 'pending'].map(st => (
                  <button 
                    key={st}
                    onClick={() => setFilter(st)}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                      filter === st ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {st}
                  </button>
                ))}
             </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/30 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-100">
              <tr>
                <th className="px-10 py-6">Student Information</th>
                <th className="px-10 py-6">Transaction Value</th>
                <th className="px-10 py-6">Fulfillment</th>
                <th className="px-10 py-6 text-right">Audit Trail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFees.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-10 py-20 text-center">
                     <div className="opacity-20 space-y-4">
                        <CreditCard size={48} className="mx-auto" />
                        <p className="font-black italic uppercase tracking-widest text-xs">No matching financial records found</p>
                     </div>
                  </td>
                </tr>
              ) : (
                filteredFees.map((fee) => (
                  <tr key={fee.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                    <td className="px-10 py-7">
                       <div className="flex items-center gap-4">
                          <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black text-sm ${
                            fee.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                          }`}>
                             {fee.users?.full_name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <span className="block font-black text-slate-800 text-sm leading-none mb-1">{fee.users?.full_name || 'Unknown User'}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{fee.fee_type.replace('_', ' ')}</span>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-7">
                       <div className="flex flex-col">
                          <span className="text-base font-black text-slate-900 leading-none mb-1">₹{Number(fee.amount).toLocaleString('en-IN')}</span>
                          <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase">Base Amount</span>
                       </div>
                    </td>
                    <td className="px-10 py-7">
                       <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                         fee.status === 'paid' || fee.status === 'verified'
                           ? 'bg-emerald-50 text-emerald-600 ring-4 ring-emerald-500/5' 
                           : 'bg-rose-50 text-rose-600 ring-4 ring-rose-500/5'
                       }`}>
                         {fee.status === 'paid' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                         {fee.status}
                       </div>
                    </td>
                    <td className="px-10 py-7 text-right">
                       <div className="flex flex-col items-end">
                          <span className="text-[10px] font-mono text-slate-400 select-all hover:text-slate-900 transition-colors">{fee.razorpay_payment_id || '---'}</span>
                          <button className="mt-2 p-1 text-slate-300 hover:text-slate-900 transition-all"><MoreVertical size={16} /></button>
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
