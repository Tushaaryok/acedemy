'use client';

import { useState } from 'react';
import { 
  HelpCircle, 
  MessageSquare, 
  Mic, 
  Image as ImageIcon, 
  X, 
  Send,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingDoubtButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'options' | 'type' | 'voice'>('options');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = () => {
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setIsOpen(false);
      setStep('options');
    }, 2500);
  };

  return (
    <>
      {/* Floating Toggle */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 right-10 z-[100] w-20 h-20 bg-indigo-600 text-white rounded-[32px] flex items-center justify-center shadow-2xl shadow-indigo-600/40 border-4 border-white/20 group"
      >
        <HelpCircle size={32} className="group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full border-4 border-white animate-bounce" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-end justify-end p-10 pointer-events-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm pointer-events-auto"
            />

            {/* Modal */}
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-md bg-white rounded-[48px] shadow-2xl pointer-events-auto overflow-hidden border border-slate-100"
            >
               {/* Header */}
               <div className="p-10 pb-6 border-b border-slate-50 flex justify-between items-center">
                  <div className="space-y-1">
                     <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-indigo-50 w-fit px-3 py-1 rounded-full border border-indigo-100">
                        <Sparkles size={12} fill="currentColor" /> Vidyakul Doubt Desk
                     </div>
                     <h3 className="text-3xl font-baloo font-bold text-slate-900 tracking-tight">Ask Anything</h3>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400">
                     <X size={20} />
                  </button>
               </div>

               {/* Content */}
               <div className="p-10 space-y-8">
                  {isSent ? (
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-12 text-center space-y-6">
                       <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-[32px] flex items-center justify-center mx-auto shadow-inner border border-emerald-100">
                          <CheckCircle2 size={48} />
                       </div>
                       <div className="space-y-2">
                          <h4 className="text-2xl font-baloo font-bold text-slate-900">Doubt Logged!</h4>
                          <p className="text-sm text-slate-500 font-medium px-8 leading-relaxed">Our subject mentors are reviewing your query. You'll get an alert in the Notification Center soon.</p>
                       </div>
                    </motion.div>
                  ) : step === 'options' ? (
                    <div className="grid grid-cols-2 gap-4">
                       <button onClick={() => setStep('type')} className="p-8 rounded-[40px] bg-indigo-50 border-2 border-indigo-100 flex flex-col items-center text-center gap-4 group hover:bg-indigo-600 transition-all duration-300">
                          <MessageSquare size={32} className="text-indigo-600 group-hover:text-white transition-colors" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-900 group-hover:text-white transition-colors">Type Doubt</span>
                       </button>
                       <button onClick={() => setStep('voice')} className="p-8 rounded-[40px] bg-slate-50 border-2 border-slate-100 flex flex-col items-center text-center gap-4 group hover:bg-rose-500 transition-all duration-300">
                          <Mic size={32} className="text-slate-400 group-hover:text-white transition-colors" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 group-hover:text-white transition-colors">Voice Note</span>
                       </button>
                       <button className="col-span-2 p-6 rounded-[32px] bg-slate-50 border border-slate-100 flex items-center justify-center gap-4 group hover:bg-slate-100 transition-all">
                          <ImageIcon size={20} className="text-slate-400" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Attach Screenshot / Photo</span>
                       </button>
                    </div>
                  ) : step === 'type' ? (
                    <div className="space-y-6 animate-in slide-in-from-right duration-300">
                       <textarea 
                         rows={5}
                         placeholder="Explain your doubt in detail..."
                         className="w-full bg-slate-50 rounded-[32px] p-8 text-sm font-medium outline-none border border-transparent focus:border-indigo-600 focus:bg-white transition-all shadow-inner"
                       />
                       <button 
                        onClick={handleSubmit}
                        className="w-full py-5 bg-indigo-600 text-white rounded-[24px] font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 active:scale-95 transition-all"
                       >
                          Submit Doubt <Send size={16} />
                       </button>
                    </div>
                  ) : (
                    <div className="space-y-8 text-center animate-in slide-in-from-right duration-300">
                       <div className="w-32 h-32 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto border-4 border-rose-100 shadow-xl relative overflow-hidden">
                          <Mic size={40} />
                          <div className="absolute inset-0 bg-rose-500/10 animate-ping rounded-full" />
                       </div>
                       <div className="space-y-2">
                          <h4 className="text-xl font-baloo font-bold">Recording Doubt...</h4>
                          <p className="text-xs text-slate-400 font-medium">Please speak clearly or attach a screenshot.</p>
                       </div>
                       <div className="flex gap-4">
                          <button onClick={() => setStep('options')} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest">Cancel</button>
                          <button onClick={handleSubmit} className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest">Done Recording</button>
                       </div>
                    </div>
                  )}
               </div>

               {/* Footer */}
               <div className="p-8 bg-slate-50 text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic leading-relaxed">
                    Average response time: <span className="text-emerald-600">8 Minutes</span>
                  </p>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
