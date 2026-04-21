'use client';
import { useState, useEffect } from 'react';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  AlertCircle, 
  Flag, 
  CheckCircle2,
  XCircle,
  Menu,
  MoreVertical,
  ShieldAlert
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export default function TestEngine() {
  const { id } = useParams();
  const router = useRouter();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // Mock Questions
  const QUESTIONS = [
    {
      id: 1,
      text: "In a right-angled triangle ABC, with angle C = 90°, if tan A = 1/√3, find the value of sin A cos B + cos A sin B.",
      options: ["1", "√3/2", "1/2", "0"],
      subject: "Mathematics - Trigonometry"
    },
    {
      id: 2,
      text: "The fundamental theorem of arithmetic states that every composite number can be expressed as a product of ____.",
      options: ["Even numbers", "Odd numbers", "Prime numbers", "Natural numbers"],
      subject: "Mathematics - Real Numbers"
    },
    {
      id: 3,
      text: "If α and β are the zeros of the quadratic polynomial f(x) = x² - 5x + 4, find the value of 1/α + 1/β - 2αβ.",
      options: ["-27/4", "-32/5", "-7", "5/4"],
      subject: "Mathematics - Polynomials"
    }
  ];

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleOptionSelect = (optionIdx: number) => {
    setSelectedOption(optionIdx);
    setAnswers({ ...answers, [currentQuestion]: optionIdx });
  };

  const toggleFlag = () => {
    setFlagged({ ...flagged, [currentQuestion]: !flagged[currentQuestion] });
  };

  const handleSubmit = () => {
    router.push(`/dashboard/student/tests/${id}/results`);
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-jakarta">
      {/* Test Top Nav */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-[100] shadow-sm">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center text-white">
                 <ShieldAlert size={20} />
              </div>
              <div>
                 <h1 className="text-sm font-black uppercase tracking-tight text-slate-900">Standard 10 Mathematics Masterclass</h1>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ongoing: Chapter 2 Polynomials</p>
              </div>
           </div>
        </div>

        <div className="flex items-center gap-10">
           <div className={`flex items-center gap-3 px-6 py-2 rounded-2xl border-2 transition-all ${
             timeLeft < 300 ? 'border-rose-500 bg-rose-50 text-rose-600 animate-pulse' : 'border-slate-100 bg-slate-50 text-slate-900'
           }`}>
              <Clock size={20} className={timeLeft < 300 ? 'text-rose-500' : 'text-blue-900'} />
              <span className="text-lg font-black font-mono tracking-wider">{formatTime(timeLeft)}</span>
           </div>
           
           <button 
             onClick={handleSubmit}
             className="bg-rose-600 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-xl shadow-rose-900/10"
           >
             Finish Attempt
           </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Question Area */}
        <main className="flex-1 overflow-y-auto p-8 md:p-12 lg:p-20 flex flex-col items-center">
           <div className="w-full max-w-4xl space-y-12">
              
              <div className="flex justify-between items-center">
                 <div className="px-4 py-1.5 bg-blue-50 text-blue-900 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-100">
                    Question {currentQuestion + 1} of {QUESTIONS.length}
                 </div>
                 <button 
                   onClick={toggleFlag}
                   className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${
                     flagged[currentQuestion] ? 'text-amber-500' : 'text-slate-400 hover:text-slate-900'
                   }`}
                 >
                    <Flag size={14} fill={flagged[currentQuestion] ? "currentColor" : "none"} /> 
                    {flagged[currentQuestion] ? 'Flagged for Review' : 'Mark for Review'}
                 </button>
              </div>

              <div className="space-y-10">
                 <div className="bg-white rounded-[48px] p-12 border border-slate-100 shadow-2xl shadow-blue-900/[0.02] relative">
                    <p className="text-xl md:text-2xl font-bold text-slate-900 leading-relaxed mb-4">
                       {QUESTIONS[currentQuestion].text}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 tracking-[3px] uppercase mt-8 border-t pt-8">
                       Concept: {QUESTIONS[currentQuestion].subject}
                    </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {QUESTIONS[currentQuestion].options.map((option, idx) => (
                       <button
                         key={idx}
                         onClick={() => handleOptionSelect(idx)}
                         className={`p-6 rounded-[32px] border-2 text-left transition-all flex items-center gap-4 group ${
                           answers[currentQuestion] === idx 
                             ? 'border-blue-900 bg-blue-50 shadow-lg' 
                             : 'border-slate-100 bg-white hover:border-slate-300'
                         }`}
                       >
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black transition-all ${
                            answers[currentQuestion] === idx ? 'bg-blue-900 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'
                          }`}>
                             {String.fromCharCode(65 + idx)}
                          </div>
                          <span className={`font-bold text-sm ${answers[currentQuestion] === idx ? 'text-blue-900' : 'text-slate-700'}`}>
                             {option}
                          </span>
                       </button>
                    ))}
                 </div>
              </div>

              <div className="flex justify-between items-center pt-10 border-t border-slate-100">
                 <button 
                   onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                   disabled={currentQuestion === 0}
                   className="flex items-center gap-2 py-4 px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all disabled:opacity-0"
                 >
                    <ChevronLeft size={16} /> Previous Question
                 </button>
                 
                 {currentQuestion === QUESTIONS.length - 1 ? (
                   <button 
                     onClick={handleSubmit} 
                     className="bg-blue-900 text-white px-12 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:scale-105 transition-all"
                   >
                     Submit Test
                   </button>
                 ) : (
                   <button 
                     onClick={() => setCurrentQuestion(prev => Math.min(QUESTIONS.length - 1, prev + 1))}
                     className="bg-blue-900 text-white px-12 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:scale-105 transition-all flex items-center gap-2"
                   >
                     Next Question <ChevronRight size={16} />
                   </button>
                 )}
              </div>
           </div>
        </main>

        {/* Question Palette Sidebar */}
        <aside className={`bg-white border-l border-slate-200 transition-all duration-300 overflow-hidden flex flex-col ${
          isPaletteOpen ? 'w-80' : 'w-20'
        }`}>
           <div className="p-6 border-b border-slate-50 flex items-center justify-center">
              <button 
                onClick={() => setIsPaletteOpen(!isPaletteOpen)}
                className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-blue-900 hover:bg-white border border-transparent hover:border-slate-100 transition-all"
              >
                 <Menu size={24} />
              </button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-hide">
              <div className="space-y-4">
                 {isPaletteOpen && <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 text-center">Master Grid</h3>}
                 <div className={`grid gap-3 ${isPaletteOpen ? 'grid-cols-4' : 'grid-cols-1'}`}>
                    {QUESTIONS.map((_, idx) => (
                       <button
                         key={idx}
                         onClick={() => setCurrentQuestion(idx)}
                         className={`w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-black transition-all ${
                           currentQuestion === idx 
                             ? 'ring-4 ring-blue-900/10 border-2 border-blue-900 bg-white text-blue-900' 
                             : answers[idx] !== undefined 
                               ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                               : flagged[idx] 
                                 ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' 
                                 : 'bg-slate-50 text-slate-400 border border-slate-100 hover:border-slate-300'
                         }`}
                       >
                          {idx + 1}
                       </button>
                    ))}
                 </div>
              </div>

              {isPaletteOpen && (
                <div className="pt-8 border-t border-slate-50 space-y-4 px-2">
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Legend</h3>
                   <div className="space-y-3">
                      {[
                        { label: 'Answered', color: 'bg-emerald-500' },
                        { label: 'Flagged', color: 'bg-amber-500' },
                        { label: 'Unvisited', color: 'bg-slate-100' },
                        { label: 'Selected', color: 'ring-2 ring-blue-900' },
                      ].map(item => (
                         <div key={item.label} className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">{item.label}</span>
                         </div>
                      ))}
                   </div>
                </div>
              )}
           </div>
           
           {isPaletteOpen && (
             <div className="p-8 bg-slate-900 text-white">
                <p className="text-[10px] font-black text-slate-500 mb-2">SYSTEM STATUS</p>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                   <span className="text-xs font-bold font-mono">ENCRYPTED STREAM</span>
                </div>
             </div>
           )}
        </aside>
      </div>
    </div>
  );
}
