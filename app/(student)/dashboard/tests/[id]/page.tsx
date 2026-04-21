'use client';

import { useState, useEffect } from 'react';
import { 
  Timer, 
  ChevronRight, 
  ChevronLeft, 
  Flag, 
  AlertCircle,
  CheckCircle2,
  Lock,
  Loader2,
  X,
  Bookmark
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const MOCK_QUESTIONS = [
  {
    id: 1,
    question: "Which of the following describes the First Law of Thermodynamics?",
    options: [
      "Energy cannot be created or destroyed, only transformed.",
      "The entropy of an isolated system always increases.",
      "Absolute zero cannot be reached in a finite number of steps.",
      "Energy is always conserved in chemical reactions only."
    ],
    correct: 0
  },
  {
    id: 2,
    question: "A heat engine works between a hot reservoir at 500K and a cold reservoir at 300K. What is its maximum efficiency?",
    options: [
      "20%",
      "40%",
      "60%",
      "80%"
    ],
    correct: 1
  },
  {
    id: 3,
    question: "In an isothermal process, which of the following remains constant?",
    options: [
      "Pressure",
      "Volume",
      "Temperature",
      "Entropy"
    ],
    correct: 2
  }
];

export default function ExamInterface() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [bookmarks, setBookmarks] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes
  const [isFinished, setIsFinished] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (timeLeft <= 0) handleFinish();
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleBookmark = (id: number) => {
    setBookmarks(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white text-center">
        <div className="max-w-md w-full space-y-8 animate-in zoom-in-95 duration-500">
           <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20 mb-10">
              <CheckCircle2 size={48} />
           </div>
           <div className="space-y-4">
              <h1 className="text-4xl font-baloo font-bold tracking-tight">Assessment Complete</h1>
              <p className="text-slate-400 font-medium">Bohot badhiya! Your responses have been securely uploaded. Results will be declared soon after faculty review.</p>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                 <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest leading-loose">Questions</p>
                 <p className="text-2xl font-black">{MOCK_QUESTIONS.length}</p>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                 <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest leading-loose">Attempted</p>
                 <p className="text-2xl font-black">{Object.keys(answers).length}</p>
              </div>
           </div>
           <button 
             onClick={() => router.push('/dashboard/student/tests')}
             className="w-full bg-white text-slate-900 py-6 rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all transform active:scale-95 shadow-2xl shadow-white/5 mt-8"
           >
              Return to Hall
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Exam Header */}
      <nav className="bg-white border-b border-slate-100 px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black">
              K
           </div>
           <div>
              <h2 className="font-baloo font-bold text-slate-900 tracking-tight">Unit Test: Thermodynamics</h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-loose">Sawal-Jawab Portal • Locked Environment</p>
           </div>
        </div>

        <div className="flex items-center gap-8">
           <div className="flex items-center gap-3 bg-rose-50 text-rose-600 px-6 py-2.5 rounded-2xl border border-rose-100 font-black">
              <Timer size={18} className="animate-pulse" />
              <span className="text-sm tabular-nums">{formatTime(timeLeft)}</span>
           </div>
           <button 
             onClick={handleFinish}
             className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl shadow-slate-900/10"
           >
              Final Submission
           </button>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-12 grid grid-cols-1 lg:grid-cols-4 gap-12">
         {/* Question Area */}
         <div className="lg:col-span-3 space-y-10">
            <div className="bg-white rounded-[48px] p-10 md:p-16 border border-slate-100 shadow-sm relative overflow-hidden group min-h-[500px] flex flex-col">
               <div className="space-y-10 flex-1">
                  <div className="flex justify-between items-center text-slate-400">
                     <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full uppercase tracking-widest">Sawal (Question) {currentQ + 1} of {MOCK_QUESTIONS.length}</span>
                     <div className="flex items-center gap-6">
                        <button 
                          onClick={() => toggleBookmark(currentQ)}
                          className={`flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest transition-colors ${bookmarks[currentQ] ? 'text-amber-500' : 'hover:text-amber-500'}`}
                        >
                           <Bookmark size={14} fill={bookmarks[currentQ] ? 'currentColor' : 'none'} /> 
                           {bookmarks[currentQ] ? 'Bookmarked' : 'Bookmark'}
                        </button>
                        <button className="flex items-center gap-2 hover:text-rose-500 font-bold text-[10px] uppercase tracking-widest transition-colors">
                           <Flag size={14} /> Report
                        </button>
                     </div>
                  </div>

                  <div className="space-y-10">
                     <h3 className="text-3xl font-baloo font-bold text-slate-900 leading-tight tracking-tight">
                        {MOCK_QUESTIONS[currentQ].question}
                     </h3>

                     <div className="grid grid-cols-1 gap-4">
                        {MOCK_QUESTIONS[currentQ].options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => setAnswers({...answers, [currentQ]: i})}
                            className={`flex items-center gap-5 p-8 rounded-[32px] text-left border-2 transition-all group ${
                              answers[currentQ] === i 
                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl shadow-indigo-600/20' 
                                : 'bg-slate-50 border-transparent text-slate-700 hover:bg-white hover:border-slate-200'
                            }`}
                          >
                             <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border-2 ${
                               answers[currentQ] === i ? 'bg-white/20 border-white/20' : 'bg-white border-slate-100 text-slate-400'
                             }`}>
                                {String.fromCharCode(65 + i)}
                             </div>
                             <span className="text-lg font-bold">{opt}</span>
                          </button>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="flex justify-between items-center pt-10 mt-10 border-t border-slate-100">
                  <button 
                    disabled={currentQ === 0}
                    onClick={() => setCurrentQ(prev => prev - 1)}
                    className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-900 disabled:opacity-30 transition-all"
                  >
                     <ChevronLeft size={16} /> Previous Node
                  </button>
                  {currentQ < MOCK_QUESTIONS.length - 1 ? (
                    <button 
                      onClick={() => setCurrentQ(prev => prev + 1)}
                      className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all"
                    >
                       Next Question <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button 
                      onClick={handleFinish}
                      className="bg-emerald-600 text-white px-10 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20"
                    >
                       Finishing Assessment
                    </button>
                  )}
               </div>
            </div>
         </div>

         {/* Navigation & Guard Panel */}
         <div className="space-y-10">
            <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm space-y-8">
               <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Grid Navigation</h4>
               <div className="grid grid-cols-4 gap-3">
                  {MOCK_QUESTIONS.map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setCurrentQ(i)}
                      className={`h-12 rounded-xl flex items-center justify-center font-black text-xs transition-all relative ${
                        currentQ === i 
                          ? 'ring-4 ring-indigo-600/10 bg-indigo-600 text-white' 
                          : answers[i] !== undefined 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                            : bookmarks[i]
                              ? 'bg-amber-50 text-amber-600 border border-amber-100'
                              : 'bg-slate-50 text-slate-400'
                      }`}
                    >
                       {i + 1}
                       {bookmarks[i] && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-white" />
                       )}
                    </button>
                  ))}
               </div>
               
               <div className="pt-6 border-t border-slate-50 space-y-4">
                  <div className="flex items-center gap-3 text-rose-600">
                     <AlertCircle size={16} />
                     <p className="text-[10px] font-black uppercase tracking-tight">Window Focus Guard Active</p>
                  </div>
                  <div className="flex items-center gap-3 text-indigo-600">
                     <Lock size={16} />
                     <p className="text-[10px] font-black uppercase tracking-tight">SSL Encrypted Session</p>
                  </div>
               </div>
            </div>

            <div className="bg-amber-500 rounded-[40px] p-8 text-white shadow-2xl shadow-amber-500/20 relative overflow-hidden group text-center">
               <div className="relative z-10 space-y-4">
                  <h5 className="text-lg font-black leading-tight italic">Do not refresh your browser.</h5>
                  <p className="text-amber-100 text-[10px] font-medium opacity-80 uppercase tracking-widest">Auto-save has been activated for this scholastic period.</p>
               </div>
            </div>
         </div>
      </main>
    </div>
  );
}
