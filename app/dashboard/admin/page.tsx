import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const { data: stats } = await supabase.rpc('get_admin_stats'); // Assuming we create this RPC in Supabase

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-gray-50 min-h-screen">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Control Center</h1>
          <p className="text-gray-500">Manage students, teachers, and academy operations.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-700">Add Student</button>
          <button className="bg-white text-gray-700 border border-gray-200 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50">Post Circular</button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Students</p>
          <p className="text-3xl font-black text-gray-900">482</p>
          <p className="text-[10px] text-green-600 mt-2 font-bold">+12 this month</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Active Teachers</p>
          <p className="text-3xl font-black text-gray-900">12</p>
          <p className="text-[10px] text-amber-600 mt-2 font-bold">All present today</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Batches</p>
          <p className="text-3xl font-black text-gray-900">18</p>
          <p className="text-[10px] text-gray-400 mt-2 font-bold">Across Std 8-12</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Revenue (MoM)</p>
          <p className="text-3xl font-black text-gray-900">₹8.4L</p>
          <p className="text-[10px] text-green-600 mt-2 font-bold">92% collection rate</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Recent Enrollments</h2>
            <button className="text-amber-600 text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-bold">
                <tr>
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4">Batch</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Join Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">Aarav Patel</td>
                  <td className="px-6 py-4 text-gray-600">Std 10 Science A</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">ACTIVE</span></td>
                  <td className="px-6 py-4 text-gray-500">12 Apr 2024</td>
                </tr>
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">Ishani Desai</td>
                  <td className="px-6 py-4 text-gray-600">Std 12 Commerce B</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">ACTIVE</span></td>
                  <td className="px-6 py-4 text-gray-500">11 Apr 2024</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Staff Connectivity</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center font-bold text-amber-700">RS</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">Ram Sir</p>
                  <p className="text-[10px] text-gray-400">Class 10 Maths • Online</p>
                </div>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center font-bold text-amber-700">JS</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">Jayesh Sir</p>
                  <p className="text-[10px] text-gray-400">Class 12 SS • 5m ago</p>
                </div>
                <div className="h-2 w-2 rounded-full bg-gray-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
