'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function FeeManagement() {
  const [fees, setFees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchFees() {
      const { data, error } = await supabase
        .from('fees')
        .select('*, users(name)');
      
      if (data) setFees(data);
      setLoading(false);
    }
    fetchFees();
  }, [supabase]);

  const totalOutstanding = fees
    .filter(f => f.status === 'pending')
    .reduce((acc, f) => acc + f.amount, 0);

  if (loading) return <div className="p-8 text-center text-slate-500 font-medium">Crunching financial data...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 min-h-screen bg-gray-50/50">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 font-jakarta">Fee Control Center</h1>
          <p className="text-slate-500 text-sm font-medium">Monitor payments, track dues, and manage academy revenue.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-all text-sm shadow-sm">Export Report</button>
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all text-sm shadow-sm">Set Fee Structure</button>
        </div>
      </header>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Outstanding</p>
          <p className="text-3xl font-black text-red-500">₹{totalOutstanding.toLocaleString('en-IN')}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">ACTION REQUIRED</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Collected This Month</p>
          <p className="text-3xl font-black text-green-600">₹2.45L</p>
          <p className="text-[10px] font-bold text-slate-400 mt-2">Target: ₹3.00L</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Collection Rate</p>
          <p className="text-3xl font-black text-indigo-600">82%</p>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-indigo-600 h-full w-[82%]"></div>
          </div>
        </div>
      </div>

      {/* Fees Table */}
      <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-xl shadow-slate-200/30 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">Payment Records</h2>
          <div className="flex gap-4">
            <select className="bg-slate-50 border-none text-xs font-bold text-slate-600 rounded-lg px-3 py-2 outline-none">
              <option>All Status</option>
              <option>Paid</option>
              <option>Pending</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400 tracking-widest">
              <tr>
                <th className="px-8 py-4">Student Name</th>
                <th className="px-8 py-4">Amount</th>
                <th className="px-8 py-4">Fee Type</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Transaction Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {fees.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-slate-400 text-sm italic">No fee records found in current batch.</td>
                </tr>
              ) : (
                fees.map((fee) => (
                  <tr key={fee.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="px-8 py-5 font-bold text-slate-800">{fee.users?.name || 'Unknown Student'}</td>
                    <td className="px-8 py-5 font-mono text-slate-600">₹{fee.amount.toLocaleString('en-IN')}</td>
                    <td className="px-8 py-5 text-xs text-slate-500 capitalize">{fee.fee_type}</td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 text-[10px] font-black rounded-full uppercase ${
                        fee.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {fee.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-[10px] text-slate-400 font-mono">
                      {fee.razorpay_payment_id || '---'}
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
