'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import './Hero.css';
import { PlayCircle, ArrowRight, CheckCircle2, Trophy } from 'lucide-react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className={`hero ${isLoaded ? 'animate-in' : ''}`}>
      <div className="container hero-wrapper">
        {/* Left: Content Side */}
        <div className="hero-content">
            <div className="hero-badge-pw flex items-center gap-2 font-black uppercase text-[10px] tracking-widest">
            <Trophy size={14} fill="currentColor" />
            Upleta ka #1 Digital Classroom
          </div>
          
           <h1 className="hero-heading font-baloo">
            Upleta's <span className="text-amber-500 font-bold">Best Coaching</span> <br/> 
            Ab Apni Bhasha Mein.
          </h1>
          
           <p className="hero-description text-xl font-medium">
            Krishna Academy provides premium board-focused learning. Join 1000+ students from Upleta & surrounding villages in their journey to board excellence.
          </p>

          {/* Social Proof / Stats */}
          <div className="flex items-center gap-6 mb-10">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-100">
                  <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="Student" width={40} height={40} />
                </div>
              ))}
            </div>
            <div className="text-sm font-medium">
              <p className="text-slate-900 font-bold">500+ Students</p>
              <p className="text-slate-500">Achieving top results since 2014</p>
            </div>
          </div>
          
          <div className="hero-btn-group">
            <button 
              className="btn-pw-primary flex items-center justify-center gap-2" 
              onClick={() => document.getElementById('admissions')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Learning Now <ArrowRight size={20} />
            </button>
            <button 
              className="btn-pw-secondary flex items-center justify-center gap-2" 
              onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <PlayCircle size={20} /> Watch Demo
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {['Expert Faculty', 'Regular Tests', 'Best Infrastructure'].map(feat => (
              <div key={feat} className="flex items-center gap-1 text-xs font-bold text-slate-500">
                <CheckCircle2 size={14} className="text-green-500" /> {feat}
              </div>
            ))}
          </div>
        </div>
        
        {/* Right: Faculty Stack Visual with Floating Elements */}
        <div className="hero-visual relative">
          <div className="faculty-card-stack relative z-10">
            <div className="fac-card fac-1">
              <Image src="/imgs/ram_new.jpeg" alt="Ram Sir" width={280} height={350} priority className="object-cover" />
            </div>
            <div className="fac-card fac-2">
              <Image src="/imgs/yashwant_new.jpeg" alt="Yashwant Sir" width={240} height={300} className="object-cover" />
            </div>
            <div className="fac-card fac-3">
              <Image src="/imgs/jayesh_new.jpeg" alt="Jayesh Sir" width={200} height={250} className="object-cover" />
            </div>
          </div>

          {/* Floating Achievement Badges */}
          <div className="absolute -top-6 -right-6 bg-white p-4 rounded-3xl shadow-xl z-20 animate-bounce duration-3000 border border-slate-50 hidden md:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-2xl flex items-center justify-center text-white">
                <Star size={20} fill="currentColor" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400">Success Rate</p>
                <p className="text-lg font-black text-slate-900 leading-tight">95%+</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 -left-10 bg-white p-4 rounded-3xl shadow-2xl z-20 border border-slate-50 hidden md:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center text-white">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400">Board Exams</p>
                <p className="text-sm font-bold text-slate-900 leading-tight">Batch Toppers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
    </section>
  );
}

function Star({ size, fill, className }: { size?: number, fill?: string, className?: string }) {
  return (
    <svg 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill={fill || "none"} 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
