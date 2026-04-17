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
  }, []);

  const handleSubmit = async () => {
    setSubmitting(true);
    const records = Object.entries(attendance).map(([id, status]) => ({
      student_id: id,
      status,
      date: new Date().toISOString().split('T')[0],
      // In a real app, you'd dynamicly get subject_id/batch_id here
    }));

    const { error } = await supabase.from('attendance').insert(records);

    if (!error) {
      alert('Attendance marked and XP points awarded!');
    }
    setSubmitting(false);
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading student list...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Mark Attendance</h1>
          <p className="text-sm text-slate-500">Date: {new Date().toLocaleDateString()}</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-amber-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-amber-700 disabled:opacity-50"
        >
          {submitting ? 'Saving...' : 'Submit Records'}
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400">
            <tr>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 font-bold text-slate-800">{student.name}</td>
                <td className="px-6 py-4 flex gap-2">
                  {['present', 'absent', 'late'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setAttendance({ ...attendance, [student.id]: status })}
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase transition-all ${attendance[student.id] === status
                          ? (status === 'present' ? 'bg-green-500 text-white' : status === 'absent' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white')
                          : 'bg-slate-100 text-slate-400'
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
  );
}
