import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { 
  Users, 
  TrendingUp, 
  BookOpen, 
  CreditCard, 
  MessageSquare, 
  Plus, 
  Download,
  ArrowUpRight,
  MoreVertical,
  Bell
} from 'lucide-react';
import Link from 'next/link';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const headerList = headers();
  const userId = headerList.get('x-user-id');
  const role = headerList.get('x-user-role');

  if (!userId || role !== 'admin') {
    redirect('/login');
  }

  // Fetch real count from DB if needed, but keeping the 'premium mocked' feel for now
  // unless requested otherwise.

  // Stats Data (Mocked for premium UI demo, to be connected via RPC)
  const stats = [
    { label: 'Total Students', value: '482', change: '+12%', icon: <Users />, color: 'bg-blue-600' },
    { label: 'Monthly Revenue', value: '₹8.45L', change: '+8.2%', icon: <TrendingUp />, color: 'bg-emerald-600' },
    { label: 'Active Batches', value: '18', change: '0%', icon: <BookOpen />, color: 'bg-amber-600' },
    { label: 'Pending Fees', value: '₹1.2L', change: '-4%', icon: <CreditCard />, color: 'bg-rose-600' },
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-baloo font-bold text-slate-900 tracking-tight">System Overview</h1>
          <p className="text-slate-500 font-medium">Academy Operations & Performance Console</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
             <Bell size={20} />
           </button>
           <button className="flex items-center gap-2 bg-blue-900 text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20">
             <Plus size={20} /> New Admission
           </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm group hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className={`${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                {stat.icon}
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Insight Chart (Simulated) */}
        <div className="lg:col-span-2 bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden h-[450px]">
           <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                 <div>
                    <h2 className="text-2xl font-baloo font-bold mb-1">Fee Collection Trend</h2>
                    <p className="text-slate-400 text-sm">Revenue growth over the last 6 months</p>
                 </div>
                 <div className="flex gap-2">
                    <button className="p-2 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all"><Download size={18} /></button>
                 </div>
              </div>

              {/* Mock Chart Visual */}
              <div className="flex-1 flex items-end justify-between gap-4 mt-12 mb-6 px-4">
                 {[40, 65, 55, 85, 75, 95].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-4 group/bar">
                       <div className="w-full bg-white/10 rounded-2xl relative overflow-hidden" style={{ height: `${h}%` }}>
                          <div 
                            className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-blue-500 to-blue-400 transition-all duration-1000 group-hover/bar:bg-amber-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                            style={{ height: '100%' }}
                          ></div>
                       </div>
                       <span className="text-[10px] font-black uppercase text-slate-500">Month {i+1}</span>
                    </div>
                 ))}
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-white/10">
                 <div className="flex gap-10">
                    <div>
                       <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Budget Goal</p>
                       <p className="text-xl font-black">₹10.50L</p>
                    </div>
                    <div>
                       <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Current</p>
                       <p className="text-xl font-black text-emerald-400">82.4% Achieved</p>
                    </div>
                 </div>
                 <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-400 hover:text-white transition-all">
                    Full Analytics <ArrowUpRight size={16} />
                 </button>
              </div>
           </div>
           
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        </div>

        {/* Recent Enquiries & Broadcast */}
        <div className="space-y-8">
           <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm flex-1">
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center justify-between">
                 Pending Enquiries <span className="p-1 px-3 bg-amber-100 text-amber-600 text-[10px] rounded-full">4 NEW</span>
              </h2>
              <div className="space-y-6">
                 {[
                   { name: 'Amit Vithani', class: 'Std 10 Sci', time: '2h ago' },
                   { name: 'Priya Rathod', class: 'Std 12 Comm', time: '5h ago' },
                   { name: 'Sameer Sheikh', class: 'Std 9', time: '1d ago' },
                 ].map(enq => (
                    <div key={enq.name} className="flex items-center gap-4 group cursor-pointer">
                       <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center font-bold group-hover:bg-blue-900 group-hover:text-white transition-all">
                          {enq.name.charAt(0)}
                       </div>
                       <div className="flex-1">
                          <p className="text-sm font-bold text-slate-900 truncate">{enq.name}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{enq.class} • {enq.time}</p>
                       </div>
                       <button className="p-2 text-slate-300 hover:text-blue-900 transition-all"><ArrowUpRight size={18} /></button>
                    </div>
                 ))}
                 <button className="w-full py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-900 transition-all border-t border-slate-50 pt-6">View All Leads</button>
              </div>
           </div>

           <div className="bg-blue-900 rounded-[40px] p-8 text-white">
              <h3 className="text-lg font-black mb-4">Quick Broadcast</h3>
              <p className="text-blue-200 text-xs font-medium mb-6 leading-relaxed">Send an instant WhatsApp & Push alert to all students across the academy.</p>
              <div className="bg-white/10 rounded-2xl p-4 flex items-center justify-between group cursor-pointer hover:bg-white/20 transition-all">
                 <div className="flex items-center gap-3">
                    <MessageSquare size={20} className="text-amber-500" />
                    <span className="text-xs font-bold uppercase tracking-widest">Post Announcement</span>
                 </div>
                 <ArrowUpRight size={18} className="text-blue-300" />
              </div>
           </div>
        </div>
      </div>

      {/* Action shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <Link href="/dashboard/admin/students" className="bg-white p-6 rounded-[32px] border border-slate-100 flex items-center gap-6 group hover:border-blue-900 transition-all">
            <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-all shadow-sm">
               <Users size={24} />
            </div>
            <div>
               <h4 className="font-bold text-slate-900">Manage Students</h4>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Add, Edit or Remove</p>
            </div>
         </Link>
         <Link href="/dashboard/admin/fees" className="bg-white p-6 rounded-[32px] border border-slate-100 flex items-center gap-6 group hover:border-blue-900 transition-all">
            <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-all shadow-sm">
               <CreditCard size={24} />
            </div>
            <div>
               <h4 className="font-bold text-slate-900">Fee Records</h4>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verify & Sync Payments</p>
            </div>
         </Link>
         <div className="bg-white p-6 rounded-[32px] border border-slate-100 flex items-center gap-6 group hover:border-blue-900 transition-all cursor-pointer">
            <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-all shadow-sm">
               <MessageSquare size={24} />
            </div>
            <div>
               <h4 className="font-bold text-slate-900">App Support</h4>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">View Tickets (3 New)</p>
            </div>
         </div>
      </div>
    </div>
  );
}
