'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Smartphone, 
  User, 
  Users, 
  GraduationCap,
  MapPin,
  Clock
} from 'lucide-react';
import './Admission.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export default function Admission() {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    classVal: '',
    board: '',
    message: ''
  });
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.parentName || !formData.phone || !formData.classVal || !formData.board) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      showToast('Please enter a valid 10-digit Indian phone number.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        showToast(data.message || 'Enquiry successfully registered at our admission desk.', 'success');
        setFormData({ studentName: '', parentName: '', phone: '', classVal: '', board: '', message: '' });
      } else {
        showToast(data.message || 'Transmission failed. Institutional protocol requires retry.', 'error');
      }
    } catch (error) {
      showToast('Connection disruption. Please dial Academy line directly.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showToast = (message: string, type: string) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 4000);
  };

  return (
    <section id="admissions" className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-stretch">
          
          {/* Brand & Benefits */}
          <div className="flex-1 space-y-12 py-10">
             <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-600/20">
                   <Sparkles size={12} fill="currentColor" /> ADMISSIONS 2024-25 OPEN
                </div>
                <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-tight">
                   Start Your Journey To <br />
                   <span className="text-indigo-600">The Top Rank.</span>
                </h2>
                <p className="text-slate-500 font-medium text-xl max-w-lg leading-relaxed">
                   Join Upleta's premier academic center. Our admission process is designed to find potential and nurture it into excellence.
                </p>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { icon: <GraduationCap size={24} />, title: "City Toppers", desc: "Recognized legacy of GSEB city toppers since 2014." },
                  { icon: <Users size={24} />, title: "Intimate Batches", desc: "We restrict intake to ensure focus on every student." },
                  { icon: <MapPin size={24} />, title: "Best Location", desc: "Secure, central Shaligram Complex infrastructure." },
                  { icon: <Clock size={24} />, title: "Exam-Ready", desc: "Weekly board pattern tests and revision papers." },
                ].map((benefit, i) => (
                  <div key={i} className="flex gap-4 group">
                     <div className="shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                        {benefit.icon}
                     </div>
                     <div>
                        <h4 className="text-slate-900 font-black tracking-tight">{benefit.title}</h4>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{benefit.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Institutional Form */}
          <div className="flex-1">
             <div className="bg-white rounded-[64px] p-10 md:p-14 shadow-2xl shadow-slate-200/50 border border-white relative overflow-hidden group">
                <form className="relative z-10 space-y-8" onSubmit={handleSubmit}>
                   <div className="space-y-2">
                      <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Student Registration</h3>
                      <p className="text-slate-500 text-sm font-medium">Please provide accurate contact details for verification.</p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5 md:col-span-2">
                         <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Student Full Name</label>
                         <div className="relative">
                            <input 
                               name="studentName" 
                               value={formData.studentName} 
                               onChange={handleInputChange}
                               placeholder="e.g. Tushar Kothariya"
                               className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-6 pr-4 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all"
                            />
                            <User size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300" />
                         </div>
                      </div>

                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Parent Name</label>
                         <input 
                            name="parentName" 
                            value={formData.parentName} 
                            onChange={handleInputChange}
                            placeholder="Full name"
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all"
                         />
                      </div>

                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">WhatsApp Number</label>
                         <div className="relative">
                            <input 
                               name="phone" 
                               value={formData.phone} 
                               onChange={handleInputChange}
                               placeholder="10 digit mobile"
                               className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all"
                            />
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xs font-black text-slate-300">+91</span>
                         </div>
                      </div>

                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Target Standard</label>
                         <select 
                            name="classVal" 
                            value={formData.classVal} 
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all appearance-none"
                         >
                            <option value="">Select Class</option>
                            <option value="Std 10">Std 10 Board</option>
                            <option value="Std 11 Science">Std 11 Science</option>
                            <option value="Std 12 Science">Std 12 Science</option>
                         </select>
                      </div>

                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Education Board</label>
                         <select 
                            name="board" 
                            value={formData.board} 
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all appearance-none"
                         >
                            <option value="">Select Board</option>
                            <option value="GSEB">GSEB (Gujarat)</option>
                            <option value="CBSE">CBSE (Central)</option>
                         </select>
                      </div>
                   </div>

                   <button 
                     type="submit" 
                     disabled={isSubmitting}
                     className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[3px] shadow-2xl shadow-slate-900/40 hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                   >
                     {isSubmitting ? 'TRANSMITTING...' : 'SEND ADMISSION ENQUIRY'}
                     {!isSubmitting && <Send size={18} />}
                   </button>
                </form>

                {/* Decorative */}
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-slate-50 rounded-full group-hover:scale-110 transition-transform"></div>
             </div>
          </div>
        </div>
      </div>

      {toast.show && (
        <div className={`fixed bottom-10 right-10 z-[100] px-8 py-5 rounded-3xl border shadow-2xl animate-in slide-in-from-bottom-10 duration-300 flex items-center gap-4 ${
          toast.type === 'error' ? 'bg-rose-600 text-white border-rose-500' : 'bg-emerald-600 text-white border-emerald-500'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={24} /> : <div className="text-xl">⚠️</div>}
          <div className="font-bold">{toast.message}</div>
        </div>
      )}

      {/* Background accents */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-[120px] -ml-64 -mt-64"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-200/20 rounded-full blur-[100px] -mr-40 -mb-40"></div>
    </section>
  );
}
