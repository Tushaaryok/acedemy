'use client';

import { 
  User,
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight, 
  GraduationCap,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/logo.jpeg';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
               <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-white/10 group">
                  <Image src={logo.src} alt="Krishna Academy" fill className="object-cover group-hover:scale-110 transition-transform" />
               </div>
               <div>
                  <h3 className="text-white font-black tracking-tighter text-xl">KRISHNA<br />ACADEMY.</h3>
               </div>
            </div>
            <p className="text-sm font-medium leading-relaxed max-w-xs">
              Upleta's premier academic hub dedicated to sculpting future leaders through board-focused precision coaching.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/1KqsMzi9CW/" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all transform hover:-translate-y-1" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.039C6.5 2.039 2 6.539 2 12.04c0 5.004 3.657 9.143 8.438 9.878v-6.987h-2.54V12.04h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.876h2.773l-.443 2.89h-2.33v6.988C18.343 21.182 22 17.044 22 12.04c0-5.5-4.5-10.001-10-10.001z"/></svg>
              </a>
              <a href="https://www.instagram.com/shreeram_singh901?igsh=MXBoMWR0bGd3cHhxNQ==" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all transform hover:-translate-y-1" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>

          {/* Institutional Links */}
          <div className="space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
               <Sparkles size={14} className="text-amber-500" /> INSTITUTION
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Academic Courses', href: '#courses' },
                { name: 'Admission Protocol', href: '#admissions' },
                { name: 'Faculty Registry', href: '#faculty' },
                { name: 'Success Gallery', href: '#gallery' },
              ].map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm font-bold hover:text-white hover:translate-x-2 transition-all flex items-center gap-2 group">
                    <ChevronRight size={14} className="text-slate-700 group-hover:text-indigo-500 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
               <GraduationCap size={14} className="text-indigo-500" /> CURRICULUM
            </h4>
            <ul className="space-y-4">
              {[
                'Standard 10 Board Prep',
                'Standard 11 Science',
                'Standard 12 Science',
                'Commerce Masterclass',
              ].map(prog => (
                <li key={prog} className="text-sm font-bold flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                   <div className="w-1 h-1 bg-slate-800 rounded-full group-hover:bg-amber-500 transition-colors" />
                   {prog}
                </li>
              ))}
            </ul>
          </div>

          {/* Global Desk */}
          <div className="space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em]">GLOBAL DESK</h4>
            <div className="space-y-6">
               <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                     <MapPin size={18} className="text-indigo-500" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Upleta Campus</p>
                     <p className="text-sm font-bold text-white">Shaligram Complex, Vadchok</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                     <Phone size={18} className="text-emerald-500" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Admission Line</p>
                     <p className="text-sm font-bold text-white">+91 81609 91166</p>
                  </div>
               </div>
            <div className="flex flex-col gap-4">
               <Link href="/login" className="flex items-center gap-3 bg-white/10 px-6 py-4 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all border border-white/5 font-bold text-white group">
                  <User size={18} className="text-indigo-400 group-hover:text-white" />
                  <span className="text-sm">STUDENT PORTAL LOGIN</span>
               </Link>
               <Link href="mailto:upletakrishnaacademy@gmail.com" className="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                  <Mail size={16} />
                  <span className="text-sm font-black uppercase tracking-widest text-white">Institutional Mail</span>
                  <ArrowUpRight size={14} />
               </Link>
            </div>
            </div>
          </div>

        </div>

        {/* Audit Line */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-widest">
           <div className="flex items-center gap-6">
              <span className="text-slate-600">&copy; {currentYear} KRISHNA ACADEMY UPLETA</span>
              <Link href="/privacy" className="hover:text-white transition-colors">Digital Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Operational Terms</Link>
           </div>
           <div className="flex items-center gap-2 text-slate-600">
              CRAFTED BY <span className="text-white">INTELLECT DESIGN LAB</span>
           </div>
        </div>
      </div>

      {/* Abstract Background Accents */}
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[160px] translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-900/5 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2" />
    </footer>
  );
}
