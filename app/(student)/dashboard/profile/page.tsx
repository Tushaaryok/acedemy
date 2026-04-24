'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  public_users, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  Calendar, 
  ShieldCheck, 
  QrCode,
  Download,
  Fingerprint
} from 'lucide-react';
import Image from 'next/image';

export default function StudentProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();

  useEffect(() => {
    async function fetchProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase.from('users').select('*').eq('id', session.public_users.id).single();
        setProfile(data);
      }
      setLoading(false);
    }
    fetchProfile();
  }, [supabase]);

  if (loading) return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 gap-4">
       <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
       <p className="text-slate-500 font-bold animate-pulse tracking-widest uppercase text-xs">Accessing Student Vault...</p>
     </div>
  );

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-12 min-h-screen bg-white/50">
      
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
           <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-indigo-50 w-fit px-3 py-1 rounded-full border border-indigo-100 mb-2">
              <ShieldCheck size={12} /> Digital Identity
           </div>
           <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Scholar Profile</h1>
           <p className="text-slate-500 font-medium text-lg mt-2">Manage your institutional credentials and academic ID.</p>
        </div>
        
        <button className="bg-slate-900 text-white px-8 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-slate-900/40 hover:bg-indigo-600 transition-all flex items-center gap-3 active:scale-95">
          <Download size={18} /> DOWNLOAD ID CARD
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Profile Details Column */}
        <div className="lg:col-span-2 space-y-10">
           <div className="bg-white rounded-[56px] p-10 md:p-16 border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-8">
                    <div className="relative w-32 h-32 rounded-[40px] overflow-hidden border-4 border-slate-50 shadow-xl group/avatar">
                       <Image src={`https://i.pravatar.cc/200?u=${profile?.id}`} alt="Avatar" width={128} height={128} className="group-hover:scale-110 transition-transform duration-700" />
                       <div className="absolute inset-0 bg-indigo-900/20 opacity-0 group-hover/avatar:opacity-100 transition-all duration-500" />
                    </div>
                    <div>
                       <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-1">{profile?.full_name}</h2>
                       <p className="text-sm font-black text-indigo-600 uppercase tracking-widest italic">Registered Scholar since 2024</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    {[
                      { icon: <Mail size={18} />, label: 'Email Node', value: profile?.email },
                      { icon: <Phone size={18} />, label: 'Verified Mobile', value: profile?.phone || '+91 81609 91166' },
                      { icon: <MapPin size={18} />, label: 'Residential Axis', value: 'Upleta, Gujarat, IN' },
                      { icon: <Calendar size={18} />, label: 'Birth Registry', value: '15 August, 2008' },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-5 group/item">
                         <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover/item:bg-slate-900 group-hover/item:text-white transition-all">
                            {item.icon}
                         </div>
                         <div>
                            <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{item.label}</p>
                            <p className="text-sm font-bold text-slate-800 leading-tight">{item.value}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              
              <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:scale-110 transition-transform">
                 <public_users size={300} />
              </div>
           </div>

           {/* Achievements Section */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden group">
                 <div className="relative z-10 flex flex-col justify-between h-full">
                    <Award className="text-amber-500 mb-6" size={40} />
                    <div className="space-y-2">
                       <h3 className="text-2xl font-black tracking-tight leading-tight">Elite Board<br />Prep Access</h3>
                       <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Activated Session: 2024-25</p>
                    </div>
                 </div>
                 <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-[60px] -mr-24 -mt-24"></div>
              </div>

              <div className="bg-indigo-600 rounded-[48px] p-10 text-white relative overflow-hidden group">
                 <div className="relative z-10 flex flex-col justify-between h-full">
                    <Fingerprint className="text-indigo-200 mb-6" size={40} />
                    <div className="space-y-2">
                       <h3 className="text-2xl font-black tracking-tight leading-tight">Institutional<br />Biometric Ready</h3>
                       <p className="text-indigo-200 text-xs font-medium uppercase tracking-widest">Last Auth: 2h ago</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* ID Card Column (The "Wow" factor) */}
        <div className="space-y-10">
           <div className="bg-white rounded-[56px] border border-slate-100 shadow-2xl relative overflow-hidden group">
              {/* ID Card Graphic */}
              <div className="p-10 text-center space-y-8 bg-slate-900 text-white relative h-[500px] flex flex-col items-center justify-center">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-amber-500 to-indigo-500" />
                 
                 <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Krishna Academy Upleta</p>
                    <h4 className="text-xl font-black tracking-widest uppercase">Student ID</h4>
                 </div>

                 <div className="relative w-32 h-32 rounded-3xl border-4 border-white/10 overflow-hidden shadow-2xl">
                    <Image src={`https://i.pravatar.cc/200?u=${profile?.id}`} alt="ID Avatar" width={128} height={128} className="object-cover" />
                 </div>

                 <div className="space-y-1">
                    <p className="text-2xl font-black tracking-tight uppercase leading-none">{profile?.full_name || 'Scholar Name'}</p>
                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] leading-none">Std 12 Science (Pro)</p>
                 </div>

                 <div className="bg-white p-3 rounded-2xl shadow-xl">
                    <QrCode size={40} className="text-slate-950" />
                 </div>
                 
                 <div className="absolute bottom-6 inset-x-0">
                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Institutional Audit Code: {profile?.id?.slice(0, 16).toUpperCase()}</p>
                 </div>
                 
                 {/* Decorative */}
                 <div className="absolute -left-10 -bottom-10 opacity-10 transform -rotate-12 group-hover:scale-110 transition-transform">
                    <Award size={200} />
                 </div>
              </div>
           </div>

           <div className="bg-amber-50 p-8 rounded-[40px] border border-amber-100">
              <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-4">Security Notice</p>
              <p className="text-xs font-bold text-amber-900 leading-relaxed italic">
                 "This Digital ID is a valid institutional credential for campus entry and exam hall access. Unauthorized reproduction is strictly prohibited."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
