import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function TeacherDashboard() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-slate-50 min-h-screen">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Teacher Portal</h1>
          <p className="text-slate-500">Welcome back, {profile?.name || 'Sir'}! Here is your schedule for today.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Classes Today', value: '4' },
          { label: 'Avg Attendance', value: '92%' },
          { label: 'Pending HW', value: '12' },
          { label: 'Total Students', value: '145' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-hover hover:border-amber-200">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <p className="text-2xl font-black text-slate-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">📅 Daily Schedule</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-50 border-l-4 border-amber-500 group hover:bg-amber-50 transition-colors">
              <div className="text-center min-w-[60px]">
                <p className="text-sm font-bold text-slate-800">08:00</p>
                <p className="text-[10px] text-slate-400 uppercase">AM</p>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900">Std 10 - Mathematics</h4>
                <p className="text-xs text-slate-500">Room 101 • 42 Students</p>
              </div>
              <a href="/dashboard/teacher/attendance" className="px-4 py-2 bg-amber-600 text-white text-xs font-bold rounded-xl hover:bg-amber-700 transition-all">
                Mark Attendance
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
          <h2 className="text-xl font-bold text-slate-900 mb-6 self-start">📝 Homework Review</h2>
          <div className="text-center space-y-2 opacity-60">
            <div className="text-4xl">📚</div>
            <p className="text-slate-500 text-sm font-medium">All caught up! No recent submissions to grade.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
