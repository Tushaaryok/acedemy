'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

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
      // 1. Get current teacher session
      const { data: { session } } = await supabase.auth.getSession();
      setTeacherId(session?.user.id || null);

      // 2. Fetch subjects assigned to this teacher
      const { data: subData } = await supabase
        .from('subjects')
        .select('*')
        .eq('teacher_id', session?.user.id);
      
      if (subData) {
        setSubjects(subData);
        if (subData.length > 0) setSelectedSubject(subData[0].id);
      }

      // 3. Fetch students
      const { data: stdData } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'student');
      
      if (stdData) {
        setStudents(stdData);
        const initial = stdData.reduce((acc, s) => ({ ...acc, [s.id]: 'present' }), {});
        setAttendance(initial);
      }
      setLoading(false);
    }
    fetchData();
  }, [supabase]);

  const handleSubmit = async () => {
    if (!selectedSubject || !teacherId) {
      alert('Missing subject or teacher info.');
      return;
    }

    setSubmitting(true);
    const records = Object.entries(attendance).map(([id, status]) => ({
      student_id: id,
      subject_id: selectedSubject,
      marked_by: teacherId,
      status,
      date: new Date().toISOString().split('T')[0],
      lecture_no: 1, // Defaulting to 1 for this simple view
    }));

    const { error } = await supabase.from('attendance').insert(records);
    
    if (!error) {
      alert('Attendance synced with Supabase. XP points awarded!');
    } else {
      alert('Error: ' + error.message);
    }
    setSubmitting(false);
  };

  if (loading) return <div className="p-12 text-center text-slate-400 font-bold animate-pulse">Syncing with academy records...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Daily Attendance</h1>
          <p className="text-slate-500 font-medium">Capture student presence and drive academic engagement.</p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          <select 
            className="bg-white border border-slate-200 rounded-2xl px-6 py-3 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            {subjects.map(s => <option key={s.id} value={s.id}>{s.name} (Batch {s.batch_id?.slice(-4) || '??'})</option>)}
          </select>
          
          <button 
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-slate-900 text-white px-10 py-3 rounded-2xl font-black shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all transform active:scale-95 disabled:opacity-50"
          >
            {submitting ? 'RECORDING...' : 'FINALIZE ROLL CALL'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-50">
            <tr>
              <th className="px-10 py-6">Student Information</th>
              <th className="px-10 py-6">Mark Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {students.map((student) => (
              <tr key={student.id} className="group hover:bg-slate-50/30 transition-all duration-300">
                <td className="px-10 py-8">
                  <div className="flex items-center gap-5">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-50 to-white border border-amber-100 flex items-center justify-center font-black text-amber-700 text-lg shadow-sm">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <span className="block font-bold text-slate-800 text-base">{student.name}</span>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">Registered Student</span>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <div className="flex gap-3">
                    {['present', 'absent', 'late'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setAttendance({ ...attendance, [student.id]: status })}
                        className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          attendance[student.id] === status 
                            ? (status === 'present' ? 'bg-green-600 text-white ring-4 ring-green-50 shadow-lg' : status === 'absent' ? 'bg-red-600 text-white ring-4 ring-red-50 shadow-lg' : 'bg-amber-600 text-white ring-4 ring-amber-50 shadow-lg')
                            : 'bg-slate-50 text-slate-400 hover:bg-slate-100 border border-transparent'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
