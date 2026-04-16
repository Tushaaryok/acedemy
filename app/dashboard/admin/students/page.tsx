'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function AdminStudents() {
  const [students, setStudents] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', email: '', phone: '', batch_id: '' });
  
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { data: stds } = await supabase.from('users').select('*').eq('role', 'student');
      const { data: bths } = await supabase.from('batches').select('*');
      if (stds) setStudents(stds);
      if (bths) setBatches(bths);
      setLoading(false);
    }
    fetchData();
  }, [supabase]);

  const handleAddStudent = async () => {
    if (!newStudent.name || !newStudent.email) {
      alert('Name and Email are required.');
      return;
    }

    const { error } = await supabase.from('users').insert([{ 
      ...newStudent, 
      role: 'student' 
    }]);

    if (!error) {
      alert('Student registered successfully!');
      setShowModal(false);
      window.location.reload();
    } else {
      alert('Error: ' + error.message);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500 font-medium tracking-tight">Accessing student directory...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10 min-h-screen bg-gray-50/30">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 font-jakarta tracking-tight">Academy Roster</h1>
          <p className="text-slate-500 font-medium">Manage student registrations and batch allocations across the academy.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="w-full md:w-auto bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 hover:scale-[1.02] active:scale-95 transition-all"
        >
          Add New Student
        </button>
      </div>

      {/* Grid Layout for Stats & Table */}
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
          <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center">
            <h2 className="text-lg font-black text-slate-800">Total Enrollment ({students.length})</h2>
            <div className="relative">
               <input placeholder="Search students..." className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-medium w-64 outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/30 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-50">
                <tr>
                  <th className="px-10 py-6">Personal Info</th>
                  <th className="px-10 py-6">Login Details</th>
                  <th className="px-10 py-6">Batch Allocation</th>
                  <th className="px-10 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {students.map((student) => (
                  <tr key={student.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center font-bold text-amber-700 text-sm">{student.name.charAt(0)}</div>
                        <span className="font-bold text-slate-800 text-sm">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-10 py-7">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-600">{student.email}</span>
                        <span className="text-[10px] font-medium text-slate-400 mt-0.5">{student.phone}</span>
                      </div>
                    </td>
                    <td className="px-10 py-7">
                      <span className="px-3 py-1.5 bg-slate-100 text-slate-500 text-[10px] font-black rounded-lg uppercase tracking-wider">
                        {student.batch_id ? 'Standard ' + student.batch_id.slice(-2) : 'Unassigned'}
                      </span>
                    </td>
                    <td className="px-10 py-7 text-right">
                      <button className="text-slate-400 hover:text-amber-600 font-bold text-xs transition-colors">Manage Profile</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modern Dialog Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6 z-[100]">
          <div className="bg-white rounded-[40px] p-10 max-w-md w-full space-y-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Register Student</h2>
              <p className="text-slate-500 text-sm mt-1">Provide contact details for OTP-based portal access.</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Full Name</label>
                <input 
                  className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-amber-500 transition-all outline-none text-sm font-medium"
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Email Address</label>
                <input 
                  type="email"
                  className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-amber-500 transition-all outline-none text-sm font-medium"
                  onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Batch Assignment</label>
                <select 
                  className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-amber-500 transition-all outline-none text-sm font-medium bg-white"
                  onChange={(e) => setNewStudent({...newStudent, batch_id: e.target.value})}
                >
                  <option value="">Choose a Batch</option>
                  {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 pt-4">
              <button 
                onClick={handleAddStudent} 
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all"
              >
                Onboard Student
              </button>
              <button 
                onClick={() => setShowModal(false)} 
                className="w-full text-slate-400 text-sm font-bold py-2 hover:text-slate-600 transition-all"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
