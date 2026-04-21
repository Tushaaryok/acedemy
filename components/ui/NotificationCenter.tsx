'use client';

import { Bell, X, Check, ArrowRight, BookOpen, CreditCard, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'course' | 'payment' | 'live' | 'system';
  unread: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { 
    id: '1', 
    title: 'New Class Added', 
    message: 'Physics: Thermodynamics Part 3 is now available in your vault.', 
    time: '2h ago', 
    type: 'course', 
    unread: true 
  },
  { 
    id: '2', 
    title: 'Payment Successful', 
    message: 'Installment #2 of ₹2,500 has been processed successfully.', 
    time: '5h ago', 
    type: 'payment', 
    unread: false 
  },
  { 
    id: '3', 
    title: 'Live in 15 Minutes!', 
    message: 'Maths Masterclass with Prof. S.Ram is starting soon. Join now!', 
    time: '15m ago', 
    type: 'live', 
    unread: true 
  },
];

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex justify-end">
           {/* Backdrop */}
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={onClose}
             className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm"
           />

           {/* Drawer */}
           <motion.div
             initial={{ x: '100%' }}
             animate={{ x: 0 }}
             exit={{ x: '100%' }}
             transition={{ type: 'spring', damping: 25, stiffness: 200 }}
             className="relative w-full max-w-md bg-white h-screen shadow-2xl flex flex-col border-l border-slate-100"
           >
              {/* Header */}
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                       <Bell size={20} />
                    </div>
                    <div>
                       <h3 className="text-lg font-baloo font-bold text-slate-900 leading-none">Notifications</h3>
                       <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">2 New Updates</p>
                    </div>
                 </div>
                 <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400">
                    <X size={20} />
                 </button>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                 {MOCK_NOTIFICATIONS.map((note) => (
                    <div 
                      key={note.id}
                      className={`p-6 rounded-[32px] transition-all cursor-pointer group ${
                        note.unread ? 'bg-indigo-50/50 hover:bg-indigo-50' : 'hover:bg-slate-50'
                      }`}
                    >
                       <div className="flex gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm ${
                            note.type === 'course' ? 'bg-blue-50 border-blue-100 text-blue-600' :
                            note.type === 'payment' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                            'bg-amber-50 border-amber-100 text-amber-600'
                          }`}>
                             {note.type === 'course' && <BookOpen size={20} />}
                             {note.type === 'payment' && <CreditCard size={20} />}
                             {note.type === 'live' && <Play size={20} />}
                          </div>
                          <div className="space-y-1">
                             <div className="flex items-center justify-between">
                                <h4 className="text-sm font-bold text-slate-900">{note.title}</h4>
                                <span className="text-[10px] font-medium text-slate-400">{note.time}</span>
                             </div>
                             <p className="text-xs text-slate-500 leading-relaxed">{note.message}</p>
                             {note.unread && (
                                <div className="pt-3 flex gap-4">
                                   <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 flex items-center gap-1.5 hover:gap-3 transition-all">
                                      VIEW NOW <ArrowRight size={12} />
                                   </button>
                                   <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                                      <Check size={12} /> DISMISS
                                   </button>
                                </div>
                             )}
                          </div>
                       </div>
                    </div>
                 ))}
              </div>

              {/* Footer */}
              <div className="p-8 border-t border-slate-100 bg-slate-50">
                 <button className="w-full py-4 bg-slate-900 text-white rounded-[20px] font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10">
                    MARK ALL AS READ
                 </button>
              </div>
           </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
