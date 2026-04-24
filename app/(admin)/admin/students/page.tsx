'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  GraduationCap,
  X
} from 'lucide-react';

export default function AdminStudents() {
  const [students, setStudents] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newStudent, setNewStudent] = useState({ full_name: '', email: '', phone: '', batch_id: '' });
  
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
    if (!newStudent.full_name || !newStudent.email) {
      alert('Name and Email are required for registration.');
      return;
    }

    // 1. Create the public_users record
    const { data: public_users, error: userError } = await supabase.from('users').insert([{ 
      full_name: newStudent.full_name,
      email: newStudent.email,
      phone: newStudent.phone,
      role: 'student',
      onboarding_completed: true 
    }]).select().single();

    if (userError) {
      alert('Registration Error: ' + userError.message);
      return;
    }

    // 2. If a batch is selected, create the enrollment record
    if (newStudent.batch_id && public_users) {
      const { error: enrollError } = await supabase.from('enrollments').insert([{
        student_id: public_users.id,
        batch_id: newStudent.batch_id,
        status: 'active'
      }]);

      if (enrollError) {
        alert('public_users created but Batch Enrollment failed: ' + enrollError.message);
      }
    }

    alert('Scholar successfully integrated into the academy roster!');
    setShowModal(false);
    window.location.reload();
  };

  const filteredStudents = students.filter(s => 
    s.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 gap-4">
      <div className="w-12 h-12 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-500 font-bold animate-pulse tracking-widest uppercase text-xs">Loading Academy Roster...</p>
    </div>
  );

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10 min-h-screen bg-gray-50/20">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Academy Roster</h1>
          <p className="text-slate-500 font-medium text-lg mt-2">Oversee student life-cycles and academic allocations.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative flex-1 sm:min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              placeholder="Search by name or email..." 
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-sm font-medium outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <UserPlus size={20} /> ONBOARD STUDENT
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
           <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                 <Users size={24} />
              </div>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+4 This Week</span>
           </div>
           <p className="text-4xl font-black text-slate-900">{students.length}</p>
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Total Enrollments</p>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
           <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                 <GraduationCap size={24} />
              </div>
           </div>
           <p className="text-4xl font-black text-slate-900">{batches.length}</p>
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Active Batches</p>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
           <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center">
                 <Filter size={24} />
              </div>
           </div>
           <p className="text-4xl font-black text-slate-900">{students.filter(s => !s.batch_id).length}</p>
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Unassigned Students</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-2xl shadow-slate-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-100">
              <tr>
                <th className="px-10 py-6">Student Profile</th>
                <th className="px-10 py-6">Contact Channels</th>
                <th className="px-10 py-6 text-center">Batch Status</th>
                <th className="px-10 py-6 text-right">Administrative</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                  <td className="px-10 py-7">
                    <div className="flex items-center gap-5">
                      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-slate-100 to-white border border-slate-200 flex items-center justify-center font-black text-slate-700 text-xl shadow-sm group-hover:scale-110 transition-transform">
                        {student.full_name.charAt(0)}
                      </div>
                      <div>
                        <span className="block font-black text-slate-800 text-lg leading-tight">{student.full_name}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {student.id.slice(0, 8)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-7">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail size={14} className="text-slate-300" />
                        <span className="text-xs font-bold">{student.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone size={14} className="text-slate-300" />
                        <span className="text-xs font-bold">{student.phone || 'No Phone'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-7 text-center">
                    <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                      student.batch_id 
                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' 
                        : 'bg-rose-50 text-rose-600 border border-rose-100'
                    }`}>
                      {student.batch_id ? 'STD ' + student.batch_id.slice(-2) : 'PENDING ALLOC'}
                    </span>
                  </td>
                  <td className="px-10 py-7 text-right">
                    <button className="p-3 text-slate-300 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredStudents.length === 0 && (
            <div className="py-24 text-center space-y-4">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                  <Search size={40} />
               </div>
               <p className="text-slate-400 font-bold italic">No students match your current filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modern Dialog Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl flex items-center justify-center p-6 z-[100] animate-in fade-in duration-300">
          <div className="bg-white rounded-[48px] p-12 max-w-xl w-full space-y-10 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">New Admission</h2>
              <p className="text-slate-500 font-medium">Create a digital profile for the new student.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Full Name</label>
                <input 
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none text-sm font-bold bg-slate-50/50"
                  placeholder="e.g. Tushar Kothariya"
                  onChange={(e) => setNewStudent({...newStudent, full_name: e.target.value})}
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Email Address</label>
                <input 
                  type="email"
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none text-sm font-bold bg-slate-50/50"
                  placeholder="name@example.com"
                  onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Contact Phone</label>
                <input 
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none text-sm font-bold bg-slate-50/50"
                  placeholder="+91 ..."
                  onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Batch Flow</label>
                <select 
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none text-sm font-bold bg-slate-50/50 appearance-none"
                  onChange={(e) => setNewStudent({...newStudent, batch_id: e.target.value})}
                >
                  <option value="">Select Batch</option>
                  {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={handleAddStudent} 
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black shadow-2xl shadow-slate-900/30 hover:bg-slate-800 hover:scale-[1.01] active:scale-95 transition-all"
              >
                FINALIZE REGISTRATION
              </button>
              <button 
                onClick={() => setShowModal(false)} 
                className="w-full text-slate-400 text-xs font-black uppercase tracking-widest py-2 hover:text-slate-600 transition-all"
              >
                Back to Roster
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
