import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function StudentDashboard() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single();

  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('*, batches(*)')
    .eq('student_id', session.user.id)
    .single();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-white min-h-screen">
      <header className="flex justify-between items-center bg-amber-50 p-6 rounded-2xl border border-amber-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {profile?.name || 'Student'}! 👋</h1>
          <p className="text-gray-600">Batch: {enrollment?.batches?.name || 'Assigning soon...'}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-amber-700">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          <p className="text-3xl font-bold text-amber-600">Lvl 1 Beginner</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Attendance Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Overall Attendance</h3>
          <div className="relative h-32 w-32 flex items-center justify-center">
            <svg className="h-full w-full transform -rotate-90">
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={364.4} strokeDashoffset={364.4 * 0.15} className="text-green-500" />
            </svg>
            <span className="absolute text-2xl font-bold text-gray-800">85%</span>
          </div>
          <p className="mt-4 text-xs text-gray-400">Target: 75% for exam eligibility</p>
        </div>

        {/* Fees Status */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Fees Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-gray-500">Total Due</p>
                <p className="text-2xl font-bold text-gray-900">₹4,500</p>
              </div>
              <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-700 transition-colors">
                Pay Now
              </button>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full w-2/3"></div>
            </div>
            <p className="text-xs text-center text-gray-400">Next installment due: 15th May</p>
          </div>
        </div>

        {/* XP & Rank */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Batch Rank</h3>
          <div className="flex flex-col items-center">
            <div className="text-5xl font-black text-amber-500 mb-2">#04</div>
            <div className="text-sm font-medium text-gray-600">Out of 42 Students</div>
            <div className="mt-4 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full uppercase">Topper List</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Timetable */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            📅 Today's Classes
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-50 bg-gray-50/50">
              <div className="text-center min-w-[80px]">
                <p className="text-xs font-bold text-amber-600">07:30 AM</p>
                <p className="text-[10px] text-gray-400 font-medium">1 Hour</p>
              </div>
              <div className="h-10 w-[2px] bg-amber-200"></div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Mathematics</h4>
                <p className="text-xs text-gray-500">Room 101 • Ram Sir</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-50 bg-white">
              <div className="text-center min-w-[80px]">
                <p className="text-xs font-bold text-gray-400">08:45 AM</p>
                <p className="text-[10px] text-gray-400 font-medium">1 Hour</p>
              </div>
              <div className="h-10 w-[2px] bg-gray-100"></div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">English</h4>
                <p className="text-xs text-gray-500">Room 102 • Yashwant Sir</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Notices */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            📢 Latest Circulars
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-50/30 border border-amber-100/50 group cursor-pointer hover:bg-amber-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-bold text-gray-900 group-hover:text-amber-700">Sunday Mock Test - Science</h4>
                <span className="text-[10px] font-bold text-gray-400 bg-white px-2 py-1 rounded-md">2h ago</span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-1">All science students are required to attend the mock test this Sunday at 8 AM.</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-gray-100 group cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-bold text-gray-900">Holiday Notice</h4>
                <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">1d ago</span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-1">Academy will remain closed on 25th April for Mahavir Jayanti.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
