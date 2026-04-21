'use client';

import { useState } from 'react';
import { 
  Play, 
  CheckCircle2, 
  Lock, 
  FileText, 
  MessageSquare, 
  Settings, 
  Maximize2,
  Volume2,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

import { VideoPlayer } from '@/components/video/video-player';

export default function VideoPlayerPage() {
  const [activeLesson, setActiveLesson] = useState('1');
  const [videoSrc, setVideoSrc] = useState('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'); // Sample HLS

  const curriculum = [
    {
      chapter: 'Chapter 01: Calculus Basics',
      lessons: [
        { id: '1', title: 'Introduction to Derivatives', duration: '12:45', completed: true, free: true },
        { id: '2', title: 'Product Rule & Quotient Rule', duration: '24:20', completed: true, free: true },
        { id: '3', title: 'Chain Rule Mastery', duration: '18:15', completed: false, free: false },
      ]
    },
    {
      chapter: 'Chapter 02: Applications',
      lessons: [
        { id: '4', title: 'Maxima and Minima', duration: '32:00', completed: false, free: false },
        { id: '5', title: 'Real-world Physics Problems', duration: '21:10', completed: false, free: false },
      ]
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-slate-950 text-white overflow-hidden">
      
      {/* Video Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        
        {/* Header Ribbon */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900/50 backdrop-blur-md border-b border-white/5">
           <div className="flex items-center gap-4">
              <Link href="/dashboard/student/courses" className="p-2 hover:bg-white/5 rounded-xl transition-all">
                 <ArrowLeft size={20} />
              </Link>
              <div>
                 <h1 className="text-sm font-baloo font-bold tracking-wide">Advance Mathematics: Standard 12</h1>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Lesson 02 • Product & Quotient Rule</p>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">Lesson Unlocked</span>
           </div>
        </div>        {/* Video Player Area */}
        <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
            <VideoPlayer src={videoSrc} lectureId={activeLesson} />
        </div>


        {/* Action Tabs Below Video */}
        <div className="bg-slate-900/80 border-t border-white/5 p-8 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl font-baloo font-bold">Concept of Limits & Differentiation</h2>
              <p className="text-slate-500 text-sm font-medium">Recorded Live Session • 14 June, 2024 • Physics-Math Combo Batch</p>
           </div>
           <div className="flex gap-4">
              <button className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5">
                 <FileText size={16} className="text-amber-500" /> RESOURCES (PDF)
              </button>
              <button className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20">
                 <MessageSquare size={16} /> ASYNC DOUBT HELP
              </button>
           </div>
        </div>
      </div>

      {/* Curriculum Sidebar */}
      <div className="w-full lg:w-[450px] bg-slate-900 border-l border-white/5 flex flex-col">
         <div className="p-8 border-b border-white/5">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Up Next</h3>
            <div className="flex items-center justify-between">
               <h4 className="text-lg font-baloo font-bold">Curriculum Roadmap</h4>
               <span className="text-[10px] font-black text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded cursor-default">32% Completed</span>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-4 space-y-8">
            {curriculum.map((chapter, idx) => (
              <div key={idx} className="space-y-4">
                 <div className="flex items-center gap-3 px-4 py-2 opacity-50">
                    <span className="text-[10px] font-black text-slate-500">{idx + 1}</span>
                    <h5 className="text-[10px] font-black uppercase tracking-widest">{chapter.chapter}</h5>
                 </div>
                 <div className="space-y-2">
                    {chapter.lessons.map(lesson => (
                      <div 
                        key={lesson.id} 
                        onClick={() => setActiveLesson(lesson.id)}
                        className={`p-5 rounded-3xl cursor-pointer flex items-center justify-between group transition-all ${
                          activeLesson === lesson.id 
                            ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/20 scale-[1.02]' 
                            : 'bg-white/5 hover:bg-white/10'
                        }`}
                      >
                         <div className="flex items-center gap-5">
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                              activeLesson === lesson.id ? 'bg-white/20' : 'bg-white/5'
                            }`}>
                               {lesson.completed ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Play size={16} />}
                            </div>
                            <div>
                               <p className="text-xs font-bold leading-none mb-1">{lesson.title}</p>
                               <span className={`text-[9px] font-medium opacity-60`}>{lesson.duration} • MP4 HD</span>
                            </div>
                         </div>
                         {!lesson.free && activeLesson !== lesson.id && <Lock size={14} className="text-slate-600" />}
                         {lesson.free && <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400 px-2 py-0.5 rounded border border-emerald-400/20">Free</span>}
                      </div>
                    ))}
                 </div>
              </div>
            ))}
         </div>

         <div className="p-8 border-t border-white/5 bg-slate-900">
            <button className="w-full py-5 bg-white text-slate-950 rounded-[20px] font-black text-[10px] uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all transform active:scale-95 shadow-xl shadow-white/5">
                CONTINUE TO NEXT BATCH <ChevronRight size={16} className="inline ml-2" />
            </button>
         </div>
      </div>
    </div>
  );
}
