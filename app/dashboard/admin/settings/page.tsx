'use client';

import { useState } from 'react';
import { 
  Settings, 
  Globe, 
  Mail, 
  Phone, 
  Clock, 
  ShieldCheck, 
  CreditCard,
  Sparkles,
  Save,
  RotateCcw,
  Zap
} from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('Global');
  
  const [config, setConfig] = useState({
    academyName: 'Krishna Academy Upleta',
    academicYear: '2024-25',
    admissionStatus: 'Open',
    whatsappPush: true,
    emailLog: true,
    examMode: 'Hybrid',
    maintenanceMode: false
  });

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-12 min-h-screen bg-slate-50/20">
      
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
           <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-indigo-50 w-fit px-3 py-1 rounded-full border border-indigo-100 mb-2">
              <Settings size={12} /> System Configuration
           </div>
           <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Global Settings</h1>
           <p className="text-slate-500 font-medium text-lg mt-2">Design the institutional operational parameters and security protocols.</p>
        </div>
        
        <div className="flex gap-4">
           <button className="px-8 py-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all flex items-center gap-2">
              <RotateCcw size={16} /> Rollback
           </button>
           <button className="px-10 py-4 bg-slate-900 text-white rounded-[20px] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/40 hover:bg-emerald-600 transition-all flex items-center gap-3">
              <Save size={18} /> SAVE PROTOCOL
           </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex bg-white p-2 rounded-[32px] border border-slate-100 shadow-sm overflow-x-auto no-scrollbar">
         {['Global', 'Admissions', 'Communication', 'Payments', 'Security'].map(tab => (
           <button 
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={`px-10 py-3 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all ${
               activeTab === tab ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'
             }`}
           >
             {tab}
           </button>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Settings Form */}
        <div className="lg:col-span-2 space-y-10 bg-white rounded-[56px] p-10 md:p-16 border border-slate-100 shadow-sm">
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Academy Profile Name</label>
                 <div className="relative">
                    <Globe className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      className="w-full bg-slate-50 border border-transparent rounded-[24px] pl-14 pr-6 py-5 text-sm font-bold focus:bg-white focus:border-indigo-600 transition-all outline-none"
                      defaultValue={config.academyName}
                    />
                 </div>
              </div>

              <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Active Academic Session</label>
                 <select className="w-full bg-slate-50 border border-transparent rounded-[24px] px-8 py-5 text-sm font-bold focus:bg-white focus:border-indigo-600 transition-all outline-none appearance-none">
                    <option>2024-25 (Current)</option>
                    <option>2025-26 (Upcoming)</option>
                    <option>2023-24 (Archive)</option>
                 </select>
              </div>

              <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Operational Mode</label>
                 <div className="flex bg-slate-50 p-2 rounded-[24px]">
                    <button className="flex-1 py-3 rounded-2xl bg-white text-emerald-600 text-[10px] font-black uppercase tracking-widest shadow-sm">Online</button>
                    <button className="flex-1 py-3 rounded-2xl text-slate-400 text-[10px] font-black uppercase tracking-widest">Maintenance</button>
                 </div>
              </div>

              <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Primary Contact Line</label>
                 <div className="relative">
                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      placeholder="+91 81609 91166"
                      className="w-full bg-slate-50 border border-transparent rounded-[24px] pl-14 pr-6 py-5 text-sm font-bold focus:bg-white focus:border-indigo-600 transition-all outline-none"
                    />
                 </div>
              </div>
           </div>

           <div className="pt-10 border-t border-slate-50 space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Intelligent Automation Switches</h4>
              <div className="space-y-4">
                 {[
                   { t: 'Digital Fee Receipts', d: 'Automatically generate and WhatsApp PDFs on successful payment.', val: true },
                   { t: 'Attendance Alerts', d: 'Send instant SMS logs to parents when student enters campus.', val: true },
                   { t: 'Doubt Auto-Reassignment', d: 'Forward unresolved doubts to department HOD after 24H.', val: false },
                 ].map(sw => (
                   <div key={sw.t} className="flex items-center justify-between p-6 bg-slate-50 rounded-[32px] group hover:bg-slate-100 transition-all">
                      <div className="max-w-[70%]">
                         <h5 className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight italic">{sw.t}</h5>
                         <p className="text-[10px] font-medium text-slate-500 leading-relaxed">{sw.d}</p>
                      </div>
                      <div className={`w-12 h-6 rounded-full relative transition-all cursor-pointer ${sw.val ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                         <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${sw.val ? 'right-1' : 'left-1'}`} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-10">
           <div className="bg-slate-900 rounded-[48px] p-10 text-white shadow-2xl shadow-indigo-900/40 relative overflow-hidden group">
              <Zap className="text-amber-500 mb-6" size={32} />
              <h3 className="text-xl font-black mb-1">System Health</h3>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">All Core Nodes Operational</p>
              
              <div className="mt-8 space-y-4">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <span>Performance index</span>
                    <span className="text-emerald-400">98%</span>
                 </div>
                 <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-[98%]" />
                 </div>
              </div>
              <div className="absolute -left-10 -bottom-10 opacity-5 group-hover:scale-110 transition-transform">
                 <Settings size={240} />
              </div>
           </div>

           <div className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-sm space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security Audit</h4>
              <div className="space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><ShieldCheck size={20} /></div>
                    <div>
                       <p className="text-xs font-bold text-slate-900 leading-none">SSL Protocol</p>
                       <p className="text-[9px] font-black text-slate-400 uppercase mt-1 tracking-widest">Active & Encrypted</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center"><CreditCard size={20} /></div>
                    <div>
                       <p className="text-xs font-bold text-slate-900 leading-none">Payment Gateway</p>
                       <p className="text-[9px] font-black text-slate-400 uppercase mt-1 tracking-widest">Live: Razorpay ID: 942-A</p>
                    </div>
                 </div>
              </div>
              <button className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:bg-slate-50 transition-all border border-indigo-100 rounded-2xl">Download Audit Log</button>
           </div>
           
           <div className="bg-indigo-50 p-8 rounded-[40px] border border-indigo-100">
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                 <Sparkles size={14} /> Intelligence Notice
              </p>
              <p className="text-xs font-bold text-indigo-900 leading-relaxed italic uppercase tracking-tight">
                 "Changing the Academic Session will archive all current rosters. Proceed with caution after final audits."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
