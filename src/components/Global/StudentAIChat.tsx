'use client';

import { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  ChevronRight,
  TrendingUp,
  Brain,
  MessageCircle,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StudentAIChat() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello Tushar! I see you have your Physics test tomorrow. Would you like me to quiz you on Quantum Theory?', type: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input, type: 'user' }]);
    setInput('');
    
    // Mock bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: 'Great idea! Formula derivation for Time Dilation is a common board question. Let’s break it down...', 
        type: 'bot' 
      }]);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-[48px] border border-slate-100 shadow-xl overflow-hidden flex flex-col h-[700px] relative group">
      {/* AI Header */}
      <div className="bg-indigo-600 p-8 text-white relative overflow-hidden">
         <div className="relative z-10 flex justify-between items-center">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                  <Bot size={24} className="text-white" />
               </div>
               <div>
                  <h3 className="text-xl font-baloo font-bold">Krishna AI Tutor</h3>
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                     <span className="text-[10px] font-black uppercase text-indigo-200">Personalized Mentor Active</span>
                  </div>
               </div>
            </div>
            <button className="p-3 hover:bg-white/10 rounded-xl transition-all">
               <Sparkles size={20} className="text-amber-400" />
            </button>
         </div>
         {/* Background Sparkles */}
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Chat Space */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar bg-slate-50/30">
         {messages.map((m, i) => (
           <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            key={i} 
            className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
           >
              <div className={`w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center text-sm font-bold shadow-sm ${
                m.role === 'bot' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-900 border border-slate-100'
              }`}>
                 {m.role === 'bot' ? <Brain size={18} /> : <User size={18} />}
              </div>
              <div className={`max-w-[80%] space-y-2`}>
                 <div className={`p-5 rounded-3xl text-sm leading-relaxed ${
                   m.role === 'bot' 
                    ? 'bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-sm' 
                    : 'bg-indigo-600 text-white rounded-tr-none shadow-lg'
                 }`}>
                    {m.text}
                 </div>
                 <p className={`text-[8px] font-black text-slate-400 uppercase tracking-widest ${m.role === 'user' ? 'text-right' : ''}`}>10:45 AM</p>
              </div>
           </motion.div>
         ))}
      </div>

      {/* AI Intelligence Suggestion Chips */}
      <div className="px-8 py-3 bg-white border-t border-slate-50 flex gap-3 overflow-x-auto no-scrollbar">
         {[
           'Explain Relativity',
           'Show my attendance',
           'Quiz me on Math',
           'Find next class'
         ].map(chip => (
           <button 
            key={chip} 
            onClick={() => setInput(chip)}
            className="whitespace-nowrap px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-black uppercase text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all"
           >
              {chip}
           </button>
         ))}
      </div>

      {/* Input Base */}
      <div className="p-8 bg-white border-t border-slate-50">
         <div className="relative">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything to your academic mentor..." 
              className="w-full bg-slate-50 border border-slate-100 rounded-[28px] px-8 py-5 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all pr-16"
            />
            <button 
              onClick={handleSend}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-indigo-600 text-white rounded-[20px] shadow-xl shadow-indigo-600/20 hover:scale-105 transition-all"
            >
               <Send size={18} />
            </button>
         </div>
      </div>
    </div>
  );
}
