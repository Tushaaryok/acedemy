'use client';
import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Settings, 
  Maximize, 
  Volume2, 
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  MessageSquare,
  Bookmark
} from 'lucide-react';
import Link from 'next/link';

export default function LessonPlayer() {
  const { courseId, lessonId } = useParams();
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(45); // mocked
  const [speed, setSpeed] = useState(1);
  const [activeTab, setActiveTab] = useState<'index' | 'notes' | 'qna'>('index');
  const [noteText, setNoteText] = useState('');

  const LESSON_INDEX = [
    { id: '1', title: '01. Why Real Numbers?', duration: '12:45', status: 'completed' },
    { id: '2', title: '02. Euclid\'s Division Lemma', duration: '45:20', status: 'watching' },
    { id: '3', title: '03. Fundamental Theorem', duration: '35:10', status: 'locked' },
    { id: '4', title: '04. Irrationality Proofs', duration: '28:15', status: 'locked' },
  ];

  return (
    <div className="bg-slate-900 min-h-screen text-white flex flex-col">
      {/* Top Header */}
      <div className="bg-slate-950/50 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-6">
          <Link href={`/dashboard/student`} className="p-2 hover:bg-white/10 rounded-full transition-all">
            <ChevronLeft size={24} />
          </Link>
          <div>
            <h1 className="text-lg font-bold truncate max-w-sm">02. Euclid's Division Lemma</h1>
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Std 10 Mathematics Masterclass</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex -space-x-1 items-center">
             {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 text-[8px] flex items-center justify-center">👤</div>)}
             <span className="ml-4 text-[10px] font-black text-emerald-400 uppercase tracking-widest animate-pulse">428 Live watching</span>
           </div>
           <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-xs font-bold transition-all">Report Issue</button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content Area: Player + Controls */}
        <div className="flex-1 flex flex-col overflow-y-auto p-6 space-y-8">
           {/* Custom Video Player Container */}
           <div className="relative aspect-video bg-black rounded-[32px] overflow-hidden shadow-2xl shadow-black/50 group border border-white/5">
              {/* Fake Video Canvas Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-black">
                 {!isPlaying && <Play size={80} className="text-white/20 animate-pulse" />}
              </div>

              {/* Player Controls Bar */}
              <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-transform duration-300 transform translate-y-4 group-hover:translate-y-0">
                 {/* Progress Bar */}
                 <div className="relative h-1.5 w-full bg-white/20 rounded-full mb-6 cursor-pointer overflow-hidden group/bar">
                    <div className="absolute inset-y-0 left-0 bg-blue-500 rounded-full" style={{ width: `${progress}%` }}></div>
                    <div className="absolute inset-y-0 left-0 bg-blue-300/50 blur-md" style={{ width: `${progress}%` }}></div>
                 </div>

                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                       <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 hover:bg-white/10 rounded-full transition-all">
                          {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
                       </button>
                       <div className="flex items-center gap-6 text-slate-400">
                          <RotateCcw size={20} className="hover:text-white cursor-pointer" />
                          <RotateCw size={20} className="hover:text-white cursor-pointer" />
                       </div>
                       <span className="text-sm font-bold font-mono">14:20 / 45:10</span>
                       <div className="flex items-center gap-2 group/vol">
                          <Volume2 size={24} className="text-slate-400 group-hover/vol:text-white" />
                          <div className="w-20 h-1 bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-white w-2/3"></div>
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center gap-6">
                       <div className="relative group/speed">
                          <button className="bg-white/10 px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest border border-white/5 hover:bg-white/20 transition-all">
                             {speed}x
                          </button>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-800 border border-white/10 rounded-xl p-2 hidden group-hover/speed:block transition-all shadow-2xl">
                             {[0.5, 1, 1.25, 1.5, 2].map(s => (
                               <button key={s} onClick={() => setSpeed(s)} className={`block w-full text-[10px] font-black px-4 py-2 rounded-lg hover:bg-blue-600 transition-all ${speed === s ? 'text-blue-400' : 'text-slate-400'}`}>
                                  {s}x
                               </button>
                             ))}
                          </div>
                       </div>
                       <Settings size={22} className="text-slate-400 hover:text-white cursor-pointer transition-all" />
                       <Maximize size={22} className="text-slate-400 hover:text-white cursor-pointer transition-all" />
                    </div>
                 </div>
              </div>
           </div>

           {/* Tabs and Info Area */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                 <div>
                    <h2 className="text-2xl font-black mb-2">Euclid's Division Lemma</h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                       In this lesson, we explore the foundational concepts of real numbers and master the division algorithm with practical examples. High weightage topic for boards.
                    </p>
                 </div>
                 <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                    <button className="flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300">
                       <Bookmark size={16} /> Bookmark Moment
                    </button>
                    <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white">
                       <MessageSquare size={16} /> Ask a Doubt
                    </button>
                 </div>
              </div>

              {/* Quick Notes Area */}
              <div className="bg-slate-800/50 border border-white/5 rounded-[32px] p-6 flex flex-col gap-4 shadow-xl">
                 <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Add Private Note</h3>
                 <textarea 
                    className="flex-1 bg-transparent border-none outline-none text-sm font-medium resize-none placeholder:text-slate-600"
                    placeholder="Type something important at 14:20..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                 ></textarea>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-blue-400 uppercase bg-blue-400/10 px-2 py-1 rounded">Timestamp 14:20</span>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-xl text-xs font-black shadow-lg shadow-blue-900/40 hover:bg-blue-500 active:scale-95 transition-all">
                       Save Note
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Sidebar: Course Content / Notes */}
        <div className="w-96 bg-slate-950 border-l border-white/5 flex flex-col">
           <div className="flex p-2">
              {[
                { id: 'index', name: 'Curriculum', icon: <ClipboardList size={18} /> },
                { id: 'notes', name: 'My Notes', icon: <Bookmark size={18} /> },
                { id: 'qna', name: 'Q&A', icon: <MessageSquare size={18} /> },
              ].map(tab => (
                 <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === tab.id ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
                 >
                   {tab.icon} {tab.name}
                 </button>
              ))}
           </div>

           <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeTab === 'index' && LESSON_INDEX.map((lesson) => (
                 <div 
                   key={lesson.id} 
                   className={`p-4 rounded-2xl flex items-center justify-between group transition-all cursor-pointer ${
                     lesson.status === 'watching' ? 'bg-blue-600/10 border border-blue-600/30' : 'hover:bg-white/5 border border-transparent'
                   }`}
                 >
                    <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                         lesson.status === 'completed' ? 'bg-emerald-500 text-white' : lesson.status === 'watching' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'
                       }`}>
                          {lesson.status === 'completed' ? '✓' : lesson.status === 'locked' ? <Lock size={14} /> : lesson.id}
                       </div>
                       <div>
                          <p className={`text-sm font-bold ${lesson.status === 'locked' ? 'text-slate-500' : 'text-white'}`}>{lesson.title}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lesson.duration}</p>
                       </div>
                    </div>
                    {lesson.status === 'watching' && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>}
                 </div>
              ))}
           </div>

           {/* Continue Actions */}
           <div className="p-6 border-t border-white/5 flex gap-4">
              <button className="flex-1 bg-white/5 hover:bg-white/10 p-4 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center transition-all">
                 <ChevronLeft size={16} /> Prev
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-500 p-4 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center transition-all shadow-lg shadow-blue-900/20">
                 Next <ChevronRight size={16} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function Lock({ size }: { size?: number }) {
  return (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
  );
}
