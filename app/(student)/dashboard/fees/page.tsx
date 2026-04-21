'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  CreditCard, 
  History, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight,
  ShieldCheck,
  Receipt,
  Download
} from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function StudentFees() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);
  const [totalDue, setTotalDue] = useState(15000); // Mock amount
  const [processing, setProcessing] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase.from('users').select('*').eq('id', session.user.id).single();
        setProfile(data);
      }
      setLoading(false);
    }
    fetchData();
  }, [supabase]);

  const handlePayment = async (amount: number = 5000, description: string = "Academic Installment June 2024") => {
    setProcessing(true);
    
    // In a real app, you would call your backend to create a Razorpay order
    // const res = await fetch('/api/payments/create-order', { method: 'POST', ... });
    // const order = await res.json();
    
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "Krishna Academy Upleta",
      description: description,
      image: "/logo.jpeg",
      handler: function (response: any) {
        alert("Payment Successful! ID: " + response.razorpay_payment_id);
        // Sync with Supabase here
      },
      prefill: {
        name: profile?.full_name,
        email: profile?.email,
        contact: profile?.phone
      },
      theme: {
        color: "#0f172a"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setProcessing(false);
  };

  if (loading) return <div className="p-20 text-center animate-pulse font-black uppercase tracking-widest text-slate-400">Financial Ledger Syncing...</div>;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-12 min-h-screen bg-slate-50/20">
      
      {/* Script for Razorpay */}

      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
           <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-100 mb-2">
              <ShieldCheck size={12} /> Secure Billing Portal
           </div>
           <h1 className="text-5xl font-baloo font-bold text-slate-900 tracking-tight">Finance Desk</h1>
           <p className="text-slate-500 font-medium text-lg">Manage your academic investments and fee installments.</p>
        </div>
        
        <div className="bg-white px-8 py-5 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6">
           <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
              <Receipt size={24} />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scholar Balance</p>
              <p className="text-2xl font-black text-slate-900 leading-none">₹{totalDue.toLocaleString()}</p>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         
         {/* Payment Card */}
         <div className="lg:col-span-2 space-y-10">
            {/* Subscription Plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {[
                 { name: 'Monthly Access', price: 149, features: ['Unlimited Live Classes', 'HW Submissions', 'Async Doubts'], accent: 'indigo' },
                 { name: 'Annual Excellence', price: 999, features: ['All Monthly Features', 'Material Downloads', 'Priority Support', 'Mock Tests'], accent: 'amber' },
               ].map(plan => (
                 <div key={plan.name} className={`bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm flex flex-col gap-6 hover:shadow-xl transition-all border-l-8 ${plan.accent === 'indigo' ? 'border-l-indigo-600' : 'border-l-amber-500'}`}>
                    <div>
                       <h3 className="text-xl font-baloo font-bold text-slate-900">{plan.name}</h3>
                       <p className="text-3xl font-black text-slate-900 mt-2">₹{plan.price}<span className="text-sm text-slate-400 font-medium">/{plan.name.includes('Monthly') ? 'mo' : 'yr'}</span></p>
                    </div>
                    <ul className="space-y-3 flex-1">
                       {plan.features.map(f => (
                         <li key={f} className="flex items-center gap-2 text-xs font-bold text-slate-500">
                            <CheckCircle2 size={14} className="text-emerald-500" /> {f}
                         </li>
                       ))}
                    </ul>
                    <button 
                      onClick={() => handlePayment(plan.price, plan.name)}
                      className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                         plan.accent === 'indigo' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                      }`}
                    >
                       Upgrade Now
                    </button>
                 </div>
               ))}
            </div>

            <div className="bg-slate-900 rounded-[56px] p-10 md:p-16 text-white relative overflow-hidden group shadow-2xl shadow-slate-900/30">
               <div className="relative z-10 space-y-12">
                  <div className="flex justify-between items-start">
                     <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Current Installment</span>
                        <h2 className="text-4xl font-baloo font-bold tracking-tight">Standard 12 - Term II</h2>
                     </div>
                     <CreditCard size={48} className="text-indigo-400 opacity-50" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 border-y border-white/5">
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-loose">Payable Amount</p>
                        <p className="text-5xl font-black">₹5,000</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-loose">Due By</p>
                        <p className="text-xl font-black text-rose-500">25 June, 2024</p>
                        <p className="text-xs font-medium text-slate-500 italic">5 days remaining for early-bird waiver</p>
                     </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6">
                     <button 
                       onClick={() => handlePayment()}
                       disabled={processing}
                       className="bg-indigo-600 text-white px-12 py-6 rounded-[28px] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-indigo-500 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50"
                     >
                        {processing ? 'Processing Secure Vault...' : <><ShieldCheck size={20} /> PAY INSTALLMENT NOW</>}
                     </button>
                     <div className="flex flex-col justify-center text-center sm:text-left">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Gateway Verified</p>
                        <div className="flex items-center gap-2 mt-1 grayscale opacity-50">
                           <span className="text-xs font-black">RAZORPAY</span>
                           <span className="w-1 h-1 bg-slate-700 rounded-full" />
                           <span className="text-xs font-black">VISA/UPI</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Design Accents */}
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -mr-64 -mt-64" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -ml-32 -mb-32" />
            </div>

            {/* History Table */}
            <div className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-sm overflow-hidden">
               <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                  Transaction Audit <History className="text-slate-300" size={24} />
               </h3>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100">
                        <tr>
                           <th className="px-6 py-5 underline underline-offset-8 decoration-slate-200">Date Log</th>
                           <th className="px-6 py-5">Reference ID</th>
                           <th className="px-6 py-5">Amount</th>
                           <th className="px-6 py-5 text-right">Receipt</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {[
                          { date: '15 Apr 2024', id: 'TXN_49204', amt: '₹5,000', status: 'Success' },
                          { date: '01 Mar 2024', id: 'TXN_28193', amt: '₹10,000', status: 'Success' },
                        ].map(txn => (
                          <tr key={txn.id} className="group hover:bg-slate-50/50 transition-colors">
                             <td className="px-6 py-6 text-sm font-bold text-slate-700">{txn.date}</td>
                             <td className="px-6 py-6 text-[10px] font-black uppercase text-slate-400 tracking-wider">#{txn.id}</td>
                             <td className="px-6 py-6 font-black text-slate-900">{txn.amt}</td>
                             <td className="px-6 py-6 text-right">
                                <button className="p-3 text-slate-300 hover:text-indigo-600 hover:bg-white rounded-2xl transition-all shadow-sm">
                                   <Download size={18} />
                                </button>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* Sidebar: Insights */}
         <div className="space-y-10">
            <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Fee Insights</h4>
               
               <div className="space-y-6">
                  <div className="flex items-center gap-6">
                     <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center font-black">
                        75%
                     </div>
                     <div className="flex-1 space-y-1">
                        <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Yearly Goal Paid</p>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                           <div className="h-full bg-amber-500 w-[75%] rounded-full shadow-[0_0_10px_rgba(245,158,11,0.3)]" />
                        </div>
                     </div>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-3">
                     <div className="flex items-center gap-2 text-indigo-600">
                        <AlertCircle size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Smart Suggestion</span>
                     </div>
                     <p className="text-xs font-medium text-slate-600 leading-relaxed italic">
                        Paying the remaining ₹15,000 at once will unlock a **₹1,200 "Lump Sum" discount** on your next session.
                     </p>
                  </div>
               </div>
            </div>

            <div className="bg-emerald-600 p-10 rounded-[48px] text-white shadow-2xl shadow-emerald-600/30 relative overflow-hidden group">
               <div className="relative z-10 space-y-4">
                  <h5 className="text-xl font-black">No Late Penalties.</h5>
                  <p className="text-emerald-100 text-[10px] font-medium opacity-80 uppercase tracking-widest">Your account is in perfect standing for the Academic Session 2024.</p>
                  <div className="pt-4 flex items-center gap-2">
                     <CheckCircle2 size={16} className="text-amber-400" />
                     <span className="text-[10px] font-black tracking-widest">VERIFIED SCHOLAR</span>
                  </div>
               </div>
               <div className="absolute -right-10 -bottom-10 opacity-10 transform scale-150 group-hover:scale-175 transition-transform">
                  <ShieldCheck size={180} />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
