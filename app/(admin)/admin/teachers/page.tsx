'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  UserPlus, 
  Search, 
  Mail, 
  Phone, 
  Book, 
  Shield, 
  Trash2, 
  ExternalLink,
  Award,
  MoreVertical,
  Briefcase
} from 'lucide-react';

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', phone: '', subject: '' });
  
  const supabase = createClient();

  useEffect(() => {
    async function fetchTeachers() {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'teacher')
        .order('name');
      
      if (data) setTeachers(data);
      setLoading(false);
    }
    fetchTeachers();
  }, [supabase]);

  const handleAddTeacher = async () => {
    // In a real app, this would trigger an invite or creation flow
    alert('Invitation feature coming soon. Use Supabase Auth to manually add the public_users with role: teacher.');
    setShowModal(false);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10 min-h-screen bg-gray-50/20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
           <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-indigo-50 w-fit px-3 py-1 rounded-full border border-indigo-100 mb-2">
              <Shield size={12} /> Faculty Governance
           </div>
           <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Academic Faculty</h1>
           <p className="text-slate-500 font-medium text-lg mt-2">Manage institutional experts and department heads.</p>
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="bg-slate-900 text-white px-8 py-4 rounded-[20px] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all flex items-center gap-3 active:scale-95"
        >
          <UserPlus size={18} /> ONBOARD FACULTY
        </button>
      </div>

      {/* Roster Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
         <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              placeholder="Filter by name, ID or subject..." 
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all shadow-sm"
            />
         </div>
         <div className="flex gap-3">
            <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-all">Export Payroll Data</button>
            <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-all">Department Structure</button>
         </div>
      </div>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teachers.length > 0 ? teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:scale-[1.01] transition-all group overflow-hidden relative">
            <div className="relative z-10 flex flex-col h-full space-y-8">
               <div className="flex justify-between items-start">
                  <div className="h-20 w-20 rounded-[28px] bg-slate-100 flex items-center justify-center text-3xl font-black text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                     {teacher.name.charAt(0)}
                  </div>
                  <button className="p-2 text-slate-300 hover:text-slate-900 transition-all"><MoreVertical size={20} /></button>
               </div>

               <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{teacher.name}</h3>
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest">Physics HOD</span>
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {teacher.id.slice(0, 8)}</span>
                  </div>
               </div>

               <div className="space-y-4 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-3 text-slate-600">
                     <Mail size={16} className="text-slate-300" />
                     <span className="text-xs font-medium">{teacher.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                     <Phone size={16} className="text-slate-300" />
                     <span className="text-xs font-medium">{teacher.phone || 'No Mobile Linked'}</span>
                  </div>
               </div>

               <div className="pt-2 flex gap-3">
                  <button className="flex-1 bg-slate-50 hover:bg-slate-100 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all flex items-center justify-center gap-2">
                     <Book size={14} /> Schedule
                  </button>
                  <button className="flex-1 bg-slate-50 hover:bg-slate-100 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all flex items-center justify-center gap-2">
                     <ExternalLink size={14} /> Profile
                  </button>
               </div>
            </div>

            {/* Abstract Visual */}
            <div className="absolute -right-10 -bottom-10 opacity-5 transform -rotate-12 group-hover:scale-110 transition-transform">
               <Briefcase size={200} />
            </div>
          </div>
        )) : (
          <div className="col-span-full py-32 text-center">
             <div className="opacity-10 space-y-6">
                <Briefcase size={64} className="mx-auto" />
                <p className="font-black italic uppercase tracking-widest text-sm">No faculty records found in system</p>
             </div>
          </div>
        )}
      </div>

      {/* Onboard Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl flex items-center justify-center p-6 z-[100] animate-in fade-in duration-300">
          <div className="bg-white rounded-[56px] p-12 max-w-lg w-full space-y-10 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
            <header>
               <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Invite Faculty</h2>
               <p className="text-slate-500 font-medium mt-2">Add a new expert to the Krishna Academy team.</p>
            </header>
            
            <div className="space-y-6">
               {[
                 { label: 'Full Legal Name', field: 'name' },
                 { label: 'Institutional Email', field: 'email' },
                 { label: 'Primary Subject', field: 'subject' },
               ].map(inp => (
                 <div key={inp.label} className="space-y-1">
                   <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">{inp.label}</label>
                   <input 
                     className="w-full px-8 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:ring-4 focus:ring-indigo-600/5 outline-none transition-all font-bold"
                     onChange={(e) => setNewTeacher({...newTeacher, [inp.field]: e.target.value})}
                   />
                 </div>
               ))}
            </div>

            <div className="flex flex-col gap-4">
               <button 
                 onClick={handleAddTeacher}
                 className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black text-[12px] uppercase tracking-[3px] shadow-2xl shadow-slate-900/30 hover:bg-slate-800 active:scale-95 transition-all"
               >
                 GENERATE CREDENTIALS
               </button>
               <button onClick={() => setShowModal(false)} className="text-slate-400 text-[10px] font-black uppercase tracking-widest py-2 hover:text-slate-600 transition-all underline underline-offset-8">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
