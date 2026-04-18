'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  Calendar, 
  ShieldCheck, 
  BookOpen,
  Briefcase,
  Star,
  Settings
} from 'lucide-react';
import Image from 'next/image';

export default function TeacherProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();

  useEffect(() => {
    async function fetchProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase.from('users').select('*').eq('id', session.user.id).single();
        setProfile(data);
      }
      setLoading(false);
    }
    fetchProfile();
  }, [supabase]);

  if (loading) return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 gap-4">
       <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
       <p className="text-slate-500 font-bold animate-pulse tracking-widest uppercase text-xs">Syncing Faculty Vault...</p>
     </div>
  );

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-12 min-h-screen bg-white/50">
      
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
           <div className="flex items-center gap-2 text-amber-600 font-black text-[10px] uppercase tracking-widest bg-amber-50 w-fit px-3 py-1 rounded-full border border-amber-100 mb-2">
              <ShieldCheck size={12} /> Faculty Credentials
           </div>
           <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Pedagogy Profile</h1>
           <p className="text-slate-500 font-medium text-lg mt-2">Manage your academic record and institutional settings.</p>
        </div>
        
        <div className="flex gap-4">
           <button className="bg-white text-slate-900 px-8 py-5 rounded-[24px] border border-slate-100 font-black text-[10px] uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center gap-3 active:scale-95">
             <Settings size={18} /> EDIT PROFILE
           </button>
           <button className="bg-slate-900 text-white px-8 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-slate-900/40 hover:bg-amber-600 transition-all active:scale-95">
             FACULTY AUDIT
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Profile Card Column */}
        <div className="lg:col-span-1 space-y-10">
           <div className="bg-white rounded-[56px] p-10 border border-slate-100 shadow-sm relative overflow-hidden group flex flex-col items-center text-center">
              <div className="relative w-48 h-48 rounded-[48px] overflow-hidden border-8 border-slate-50 shadow-2xl mb-8">
                 <Image src={`https://i.pravatar.cc/300?u=${profile?.id}`} alt="Faculty Avatar" width={192} height={192} className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              
              <div className="space-y-4">
                 <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">{profile?.name}</h2>
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest leading-none italic">Department Chair: Science</p>
                 </div>
                 <div className="flex justify-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                 </div>
                 <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                    <CheckCircle2 size={12} /> Verified Faculty
                 </div>
              </div>

              <div className="mt-12 pt-12 border-t border-slate-50 w-full space-y-6">
                 {[
                   { icon: <Mail size={16} />, val: profile?.email },
                   { icon: <Phone size={16} />, val: '+91 81609 91166' },
                   { icon: <MapPin size={16} />, val: 'Faculty Wing A, Campus' },
                 ].map((it, i) => (
                   <div key={i} className="flex items-center gap-4 text-slate-500 hover:text-slate-900 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">{it.icon}</div>
                      <span className="text-xs font-bold truncate">{it.val}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Career & Experience Column */}
        <div className="lg:col-span-2 space-y-10">
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden group h-full">
                 <div className="relative z-10 flex flex-col justify-between h-full space-y-12">
                    <Briefcase className="text-amber-500" size={40} />
                    <div className="space-y-2">
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Years of Success</p>
                       <h3 className="text-5xl font-black tracking-tighter leading-none">14+ Years</h3>
                       <p className="text-xs font-medium text-slate-400 opacity-60">Legacy of Toppers Produced</p>
                    </div>
                 </div>
                 <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
              </div>

              <div className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-sm relative overflow-hidden group h-full">
                 <div className="relative z-10 flex flex-col justify-between h-full space-y-12">
                    <BookOpen className="text-indigo-600" size={40} />
                    <div className="space-y-2">
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Load</p>
                       <h3 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">4 Batches</h3>
                       <p className="text-xs font-medium text-slate-500 opacity-60 uppercase tracking-widest">182 Active Scholars</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Professional Accomplishments */}
           <div className="bg-white rounded-[56px] p-10 md:p-16 border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black uppercase text-slate-400 tracking-[0.2em] mb-10 flex items-center gap-3">
                 <Award size={18} className="text-amber-600" /> INSTITUTIONAL MILESTONES
              </h3>
              <div className="space-y-8">
                 {[
                   { title: 'Excellence in Pedagogy 2023', d: 'Awarded for unmatched 100% board result in Standard 10 Mathematics.' },
                   { title: 'Digital Teaching Certification', d: 'Certified in utilizing smart digital boards and AI resource management.' },
                   { title: 'Senior Faculty Appointment', d: 'Leading the Science department faculty development program since 2018.' },
                 ].map((mil, i) => (
                   <div key={i} className="flex gap-6 group/item">
                      <div className="shrink-0 w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-slate-400 group-hover/item:bg-amber-600 group-hover/item:text-white transition-all">
                        0{i+1}
                      </div>
                      <div className="space-y-1">
                         <h4 className="text-lg font-black text-slate-900 tracking-tight leading-none group-hover/item:text-indigo-600 transition-colors uppercase italic">{mil.title}</h4>
                         <p className="text-sm font-medium text-slate-500 leading-relaxed">{mil.d}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}

function CheckCircle2({ size, className }: { size?: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
