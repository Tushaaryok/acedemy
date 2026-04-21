'use client';

import { type FC } from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';
import { PlayCircle, ArrowRight, CheckCircle2, Trophy, Star } from 'lucide-react';

import { cn } from '@/lib/utils';

interface HeroProps {
  className?: string;
}

/**
 * Premium Hero section for Krishna Academy Upleta.
 * Follows the mandatory React Component Pattern.
 */
export const Hero: FC<HeroProps> = ({ className }) => {
  return (
    <section id="home" className={cn("relative min-h-screen bg-white flex items-center justify-center overflow-hidden pt-20 pb-16 px-4 md:px-0", className)}>
      {/* Light blue/amber gradient accents */}
      <div className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] bg-radial-gradient from-[rgba(208,171,89,0.08)] to-transparent z-1 pointer-events-none rounded-full blur-[80px]" />
      <div className="absolute bottom-0 -left-[5%] w-[400px] h-[400px] bg-radial-gradient from-[rgba(208,171,89,0.05)] to-transparent z-1 pointer-events-none rounded-full blur-[60px]" />

      <div className="container relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-10 w-full mx-auto">
        
        {/* Left: Content Side */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1.2 flex flex-col items-start max-w-[650px] text-center lg:text-left items-center lg:items-start"
        >
          <div className="text-amber-600 flex items-center gap-2 font-black uppercase text-[10px] tracking-widest mb-3">
            <Trophy size={14} fill="currentColor" />
            Upleta ka #1 Digital Classroom
          </div>
          
          <h1 className="font-baloo text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-4">
            Upleta's <span className="text-amber-500 font-bold">Best Coaching</span> <br/> 
            Ab Apni Bhasha Mein.
          </h1>
          
          <p className="text-lg sm:text-xl font-medium text-slate-600 mb-8 max-w-[550px] leading-relaxed">
            Krishna Academy provides premium board-focused learning. Join 1000+ students from Upleta & surrounding villages in their journey to board excellence.
          </p>

          {/* Social Proof / Stats */}
          <div className="flex items-center gap-6 mb-10">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-100">
                  <Image src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="Student avatar" width={40} height={40} />
                </div>
              ))}
            </div>
            <div className="text-sm font-medium text-left">
              <p className="text-slate-900 font-bold">500+ Students</p>
              <p className="text-slate-500">Achieving top results since 2014</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 w-full justify-center lg:justify-start">
            <button 
              className="bg-amber-500 text-white px-8 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 hover:bg-amber-600 hover:-translate-y-1 transition-all flex-1 sm:flex-none min-w-[140px]" 
              onClick={() => document.getElementById('admissions')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Start Learning Now"
            >
              Start Learning Now <ArrowRight size={20} />
            </button>
            <button 
              className="bg-transparent text-amber-600 px-8 py-4 rounded-2xl font-bold text-base border-2 border-amber-500 flex items-center justify-center gap-2 hover:bg-amber-50 hover:-translate-y-1 transition-all flex-1 sm:flex-none min-w-[140px]" 
              onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Watch Demo Video"
            >
              <PlayCircle size={20} /> Watch Demo
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start">
            {['Expert Faculty', 'Regular Tests', 'Best Infrastructure'].map(feat => (
              <div key={feat} className="flex items-center gap-1 text-xs font-bold text-slate-500">
                <CheckCircle2 size={14} className="text-green-500" aria-hidden="true" /> {feat}
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Right: Faculty Stack Visual */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="flex-1 relative hidden lg:flex justify-center items-center h-[500px]"
        >
          <div className="relative w-full max-w-[450px] h-full">
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute w-[280px] h-[350px] z-30 top-[10%] left-[10%] bg-white rounded-[24px] overflow-hidden shadow-2xl border-4 border-white hover:z-50 hover:scale-105 hover:rotate-2 transition-all cursor-pointer"
            >
              <Image src="/imgs/ram_new.jpeg" alt="Ram Sir - Faculty" width={280} height={350} priority className="object-cover w-full h-full" />
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
              className="absolute w-[240px] h-[300px] z-20 top-[30%] right-[5%] bg-white rounded-[24px] overflow-hidden shadow-2xl border-4 border-white hover:z-50 hover:scale-105 hover:rotate-2 transition-all cursor-pointer"
            >
              <Image src="/imgs/yashwant_new.jpeg" alt="Yashwant Sir - Faculty" width={240} height={300} className="object-cover w-full h-full" />
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
              className="absolute w-[200px] h-[250px] z-10 top-[5%] right-[15%] opacity-80 bg-white rounded-[24px] overflow-hidden shadow-2xl border-4 border-white hover:z-50 hover:scale-105 hover:rotate-2 transition-all cursor-pointer"
            >
              <Image src="/imgs/jayesh_new.jpeg" alt="Jayesh Sir - Faculty" width={200} height={250} className="object-cover w-full h-full" />
            </motion.div>
          </div>

          {/* Floating Achievement Badges */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 bg-white p-4 rounded-3xl shadow-xl z-40 border border-slate-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-2xl flex items-center justify-center text-white">
                <Star size={20} fill="currentColor" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400">Success Rate</p>
                <p className="text-lg font-black text-slate-900 leading-tight">95%+</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="absolute bottom-10 -left-10 bg-white p-4 rounded-3xl shadow-2xl z-40 border border-slate-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center text-white">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400">Board Exams</p>
                <p className="text-sm font-bold text-slate-900 leading-tight">Batch Toppers</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-60">
        <div className="w-6 h-10 border-2 border-amber-500 rounded-full relative">
          <motion.div 
            animate={{ y: [0, 15, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 bg-amber-500 rounded-full absolute top-2 left-1/2 -translate-x-1/2"
          />
        </div>
      </div>
    </section>
  );
};
