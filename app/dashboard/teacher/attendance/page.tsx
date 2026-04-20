'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  BookOpen, 
  TrendingUp,
  Save,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function MarkAttendance() {
  const [students, setStudents] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const [teacherId, setTeacherId] = useState<string | null>(null);
  
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { data: { session } } = await supabase.auth.getSession();
      setTeacherId(session?.user.id || null);

      const { data: subData } = await supabase
        .from('subjects')
        .select('*')
        .eq('teacher_id', session?.user.id);
      
      if (subData) {
        setSubjects(subData);
        if (subData.length > 0) setSelectedSubject(subData[0].id);
      }

      const { data: stdData } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'student');
      
      if (stdData) {
        setStudents(stdData);
        const initial = stdData.reduce((acc: Record<string, string>, s: any) => ({ ...acc, [s.id]: 'present' }), {});
        setAttendance(initial);
      }
      setLoading(false);
    }
    fetchData();
  }, [supabase]);

  const handleSubmit = async () => {
    if (!selectedSubject || !teacherId) {
      alert('Please select a subject first.');
      return;
    }

    setSubmitting(true);
    const records = Object.entries(attendance).map(([id, status]) => ({
      student_id: id,
      subject_id: selectedSubject,
      marked_by: teacherId,
      status,
      date: new Date().toISOString().split('T')[0],
      lecture_no: 1,
    }));

    const { error } = await supabase.from('attendance').insert(records);
    
    if (!error) {
      alert('Success! Attendance records have been securely synced.');
    } else {
      alert('Sync Error: ' + error.message);
    }
    setSubmitting(false);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 gap-4">
      <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-500 font-bold animate-pulse tracking-widest uppercase text-xs">Accessing Academy Records...</p>
    </div>
  );

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-10 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-2">
          <Link href="/dashboard/teacher" className="flex items-center gap-2 text-slate-400 hover:text-amber-600 font-bold text-xs uppercase tracking-widest transition-all group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Portal
          </Link>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Roll Call</h1>
          <p className="text-slate-500 font-medium">Capture presence and analyze student engagement levels.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative group">
            <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors" size={18} />
            <select 
              className="bg-white border border-slate-200 rounded-2xl pl-12 pr-6 py-4 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 shadow-sm transition-all appearance-none cursor-pointer min-w-[240px]"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {subjects.length > 0 ? (
                subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)
              ) : (
                <option disabled>No subjects assigned</option>
              )}
            </select>
          </div>
          
          <button 
            onClick={handleSubmit}
            disabled={submitting || subjects.length === 0}
            className="flex items-center justify-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-2xl font-black shadow-2xl shadow-slate-900/20 hover:bg-amber-600 hover:scale-[1.02] active:scale-95 transition-all transform disabled:opacity-50 disabled:hover:bg-slate-900 disabled:hover:scale-100"
          >
            {submitting ? 'SYNCING...' : <><Save size={18} /> FINALIZE RECORDS</>}
          </button>
        </div>
      </div>

      {/* Stats QuickView */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
            <CheckCircle size={22} />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{Object.values(attendance).filter(v => v === 'present').length}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Marked Present</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shadow-inner">
            <XCircle size={22} />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{Object.values(attendance).filter(v => v === 'absent').length}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Marked Absent</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shadow-inner">
            <TrendingUp size={22} />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{students.length > 0 ? Math.round((Object.values(attendance).filter(v => v === 'present').length / students.length) * 100) : 0}%</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Batch Attendance</p>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-2xl shadow-slate-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-100">
              <tr>
                <th className="px-10 py-6">Student Identity</th>
                <th className="px-10 py-6 text-center">Status Configuration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student) => (
                <tr key={student.id} className="group hover:bg-slate-50/40 transition-all duration-300">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 flex items-center justify-center font-black text-slate-700 text-xl shadow-sm group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-400 transition-all">
                        {student.full_name.charAt(0)}
                      </div>
                      <div>
                        <span className="block font-bold text-slate-800 text-lg">{student.full_name}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Batch Allocated</span>
                          <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                          <span className="text-[10px] font-bold text-amber-600">Active</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex justify-center gap-4">
                      {[
                        { id: 'present', label: 'Present', icon: CheckCircle, activeClass: 'bg-emerald-600 text-white ring-8 ring-emerald-500/10 shadow-lg shadow-emerald-600/20' },
                        { id: 'absent', label: 'Absent', icon: XCircle, activeClass: 'bg-rose-600 text-white ring-8 ring-rose-500/10 shadow-lg shadow-rose-600/20' },
                        { id: 'late', label: 'Late', icon: Clock, activeClass: 'bg-amber-600 text-white ring-8 ring-amber-500/10 shadow-lg shadow-amber-600/20' }
                      ].map((status) => (
                        <button
                          key={status.id}
                          onClick={() => setAttendance({ ...attendance, [student.id]: status.id })}
                          className={`flex flex-col items-center gap-2 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            attendance[student.id] === status.id 
                              ? status.activeClass
                              : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100'
                          }`}
                        >
                          <status.icon size={18} />
                          {status.label}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {students.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center gap-4 opacity-40">
              <User size={48} className="text-slate-300" />
              <p className="font-bold text-slate-500 italic">No registered students found in this batch.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
