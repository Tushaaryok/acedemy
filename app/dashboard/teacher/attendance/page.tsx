'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function MarkAttendance() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const supabase = createClient();

  useEffect(() => {
    async function fetchStudents() {
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'student');
      
      if (data) {
        setStudents(data);
        const initial = data.reduce((acc, s) => ({ ...acc, [s.id]: 'present' }), {});
        setAttendance(initial);
      }
      setLoading(false);
    }
    fetchStudents();
  }, [supabase]);

  const handleSubmit = async () => {
    setSubmitting(true);
    const records = Object.entries(attendance).map(([id, status]) => ({
      student_id: id,
      status,
      date: new Date().toISOString().split('T')[0],
    }));

    const { error } = await supabase.from('attendance').insert(records);
    
    if (!error) {
      alert('Attendance marked successfully!');
    } else {
      alert('Error: ' + error.message);
    }
    setSubmitting(false);
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Retrieving class roll...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Mark Attendance</h1>
          <p className="text-sm font-medium text-slate-500">Daily roll call for {new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full md:w-auto bg-amber-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-amber-200 hover:bg-amber-700 disabled:opacity-50 transition-all"
        >
          {submitting ? 'Processing...' : 'Save Attendance'}
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 text-[11px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-8 py-5">Student Identity</th>
                <th className="px-8 py-5">Attendance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((student) => (
                <tr key={student.id} className="group hover:bg-slate-50/30 transition-colors">
                  <td className="px-8 py-5 font-bold text-slate-800 text-sm group-hover:text-amber-700 transition-colors">{student.name}</td>
                  <td className="px-8 py-5 flex flex-wrap gap-2">
                    {['present', 'absent', 'late'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setAttendance({ ...attendance, [student.id]: status })}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all transform active:scale-95 ${
                          attendance[student.id] === status 
                            ? (status === 'present' ? 'bg-green-600 text-white shadow-md shadow-green-100' : status === 'absent' ? 'bg-red-600 text-white shadow-md shadow-red-100' : 'bg-amber-600 text-white shadow-md shadow-amber-100')
                            : 'bg-slate-100/80 text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
