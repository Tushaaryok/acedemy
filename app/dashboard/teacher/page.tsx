import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { 
  Calendar, 
  Users, 
  GraduationCap, 
  Clock, 
  LayoutDashboard,
  Bell,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Radio
} from 'lucide-react';
import Link from 'next/link';

export default async function TeacherDashboard() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single();

  const stats = [
    { label: 'Total Students', value: '284', icon: <Users size={20} />, color: 'bg-indigo-600', trend: '+12 this week' },
    { label: 'Avg Attendance', value: '78%', icon: <CheckCircle2 size={20} />, color: 'bg-emerald-600', trend: '↑ +3%' },
    { label: 'Pending Reviews', value: '42', icon: <Clock size={20} />, color: 'bg-amber-600', trend: '8 overdue' },
    { label: 'Avg Rating', value: '4.8★', icon: <GraduationCap size={20} />, color: 'bg-rose-600', trend: '186 reviews' },
  ];

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-10 min-h-screen bg-slate-50/10">
      {/* Premium Header */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] bg-indigo-50 w-fit px-4 py-1.5 rounded-full border border-indigo-100 shadow-sm mb-4">
             <LayoutDashboard size={12} /> Faculty Command Center
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none font-baloo">Academic Hub</h1>
          <p className="text-slate-500 font-medium text-lg">Namaste, <span className="text-slate-900 font-bold">{profile?.full_name || 'Ramesh Sir'}</span>! You have <span className="text-indigo-600 font-bold underline decoration-indigo-200 underline-offset-4">1 live class</span> scheduled for today.</p>
        </div>
        <div className="flex items-center gap-4 w-full xl:w-auto">
           <Link 
             href="/dashboard/teacher/live"
             className="flex-1 xl:flex-none bg-slate-900 text-white px-8 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-slate-900/40 hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 active:scale-95 group"
           >
              <Radio size={20} className="group-hover:animate-pulse" /> Initialize Studio
           </Link>
           <button className="flex-1 xl:flex-none border-2 border-slate-200 text-slate-900 px-8 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest hover:border-slate-900 transition-all flex items-center justify-center gap-3 active:scale-95">
              <Calendar size={20} /> Schedule Class
           </button>
        </div>
      </header>

      {/* Modern Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group cursor-default">
            <div className="flex justify-between items-start mb-6">
              <div className={`${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                {stat.icon}
              </div>
              <div className="bg-slate-50 px-3 py-1 rounded-full text-[8px] font-black text-slate-400 uppercase tracking-widest">
                {stat.trend}
              </div>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
            <p className="text-4xl font-black text-slate-900 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Section: Timetable & Analytics */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
            <div className="flex justify-between items-end">
               <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                     <Calendar className="text-indigo-600" size={28} /> Current Timetable
                  </h2>
                  <p className="text-slate-400 text-sm font-medium mt-1">Your pedagogical roadmap for today.</p>
               </div>
               <span className="text-xs font-black text-slate-900 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 uppercase tracking-widest">SATURDAY, 18 APR</span>
            </div>
            
            <div className="space-y-4">
              {[
                { time: '08:00 AM', title: 'Std 10 - Mathematics', loc: 'Room 101', count: 42, color: 'border-amber-400', bg: 'bg-amber-50/30' },
                { time: '10:30 AM', title: 'Std 12 - Physics Lab', loc: 'Lab A', count: 28, color: 'border-indigo-400', bg: 'bg-indigo-50/30' },
                { time: '02:00 PM', title: 'Std 9 - Foundation Math', loc: 'Room 204', count: 35, color: 'border-emerald-400', bg: 'bg-emerald-50/30' },
              ].map((cls, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center gap-6 p-8 rounded-[32px] border-2 border-transparent hover:border-slate-100 transition-all group ${cls.bg}`}>
                  <div className="text-center md:min-w-[100px]">
                    <p className="text-2xl font-black text-slate-900 leading-none tracking-tighter">{cls.time}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase mt-2 tracking-widest">Confirmed</p>
                  </div>
                  <div className="flex-1 w-full text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${cls.color.replace('border', 'bg')}`}></div>
                      <h4 className="font-black text-slate-900 text-xl tracking-tight leading-tight">{cls.title}</h4>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white/50 px-3 py-1 rounded-lg">{cls.loc}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white/50 px-3 py-1 rounded-lg">{cls.count} Learners</span>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                    <Link 
                      href="/dashboard/teacher/attendance" 
                      className="flex-1 md:flex-none px-6 py-4 bg-white border border-slate-200 text-slate-900 text-[9px] font-black uppercase tracking-widest rounded-2xl hover:border-slate-900 transition-all shadow-sm"
                    >
                      Roll Call
                    </Link>
                    <Link 
                      href="/dashboard/teacher/live" 
                      className="flex-1 md:flex-none px-6 py-4 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10"
                    >
                      Enter Studio
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Weekly Attendance</h3>
                <div className="flex gap-2">
                   <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase"><div className="w-2 h-2 bg-indigo-600 rounded-full"></div> Target</div>
                   <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase"><div className="w-2 h-2 bg-indigo-200 rounded-full"></div> Actual</div>
                </div>
             </div>
             <div className="flex items-baseline justify-between h-48 gap-4 px-4">
                {[
                  { day: 'Mon', val: '65%' },
                  { day: 'Tue', val: '82%' },
                  { day: 'Wed', val: '95%' },
                  { day: 'Thu', val: '78%' },
                  { day: 'Fri', val: '88%' },
                  { day: 'Sat', val: '40%' },
                  { day: 'Sun', val: '00%' },
                ].map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-4 h-full group">
                    <div className="flex-1 w-full bg-slate-50 rounded-2xl relative overflow-hidden flex items-end">
                       <div 
                         className={`w-full ${d.val === '95%' ? 'bg-indigo-600' : 'bg-indigo-100 group-hover:bg-indigo-200'} transition-all rounded-t-xl`} 
                         style={{ height: d.val }}
                       ></div>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{d.day}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Section: Tools & Activity */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-slate-900 p-10 rounded-[48px] text-white shadow-2xl shadow-indigo-900/40 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                   <LayoutDashboard size={24} />
                </div>
                <h3 className="text-2xl font-black mb-2 tracking-tight">Faculty Toolbox</h3>
                <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">System-wide academic utilities and administrative control.</p>
                
                <div className="space-y-3">
                   {[
                     { name: 'Post Homework', icon: <BookOpen size={18} />, color: 'text-indigo-400', href: '/dashboard/teacher/homework' },
                     { name: 'Grade Submissions', icon: <GraduationCap size={18} />, color: 'text-emerald-400', href: '/dashboard/teacher/material' },
                     { name: 'Update Material', icon: <BookOpen size={18} />, color: 'text-amber-400', href: '/dashboard/teacher/courses' },
                   ].map((tool, i) => (
                     <Link 
                       key={i} 
                       href={tool.href}
                       className="flex items-center justify-between p-5 bg-white/5 rounded-[24px] hover:bg-white/10 transition-all border border-white/5 group/tool"
                     >
                        <div className="flex items-center gap-4">
                           <div className={`${tool.color}`}>
                             {tool.icon}
                           </div>
                           <span className="text-[10px] font-black uppercase tracking-widest">{tool.name}</span>
                        </div>
                        <ArrowUpRight size={18} className="text-slate-600 group-hover/tool:text-white group-hover/tool:translate-x-1 group-hover/tool:-translate-y-1 transition-all" />
                     </Link>
                   ))}
                </div>
              </div>
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl"></div>
           </div>

           <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-xl font-black text-slate-900 tracking-tight">Recent Activity</h4>
                <Link href="#" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View All</Link>
              </div>
              <div className="space-y-6">
                 {[
                   { name: 'Riya Patel', action: 'Submitted homework', time: '2hr ago', color: 'bg-indigo-50 text-indigo-600' },
                   { name: 'Arjun Shah', action: 'Completed Ch.3 quiz', time: '5hr ago', color: 'bg-emerald-50 text-emerald-600' },
                   { name: 'Priya Mehta', action: 'Left a doubt in Physics', time: 'Yesterday', color: 'bg-amber-50 text-amber-600' },
                 ].map((act, i) => (
                   <div key={i} className="flex items-center gap-4 group cursor-pointer">
                      <div className={`w-12 h-12 rounded-2xl ${act.color} flex items-center justify-center font-black text-base shadow-sm group-hover:scale-110 transition-transform`}>
                         {act.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-black text-slate-900">{act.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{act.action}</p>
                      </div>
                      <span className="text-[8px] font-black text-slate-300 uppercase">{act.time}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
