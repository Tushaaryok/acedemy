'use client';

import { useState, useEffect } from 'react';
import { Search as SearchIcon, X, BookOpen, public_users, FileText, ArrowRight, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const suggestions = [
    { type: 'course', title: 'Advanced Calculus Std 12', icon: <BookOpen className="text-blue-500" /> },
    { type: 'teacher', title: 'Prof. Shreeram Singh (Physics)', icon: <public_users className="text-amber-500" /> },
    { type: 'note', title: 'Organic Chemistry Roadmap PDF', icon: <FileText className="text-rose-500" /> },
    { type: 'course', title: 'Business Economics Foundation', icon: <BookOpen className="text-emerald-500" /> },
  ];

  const filtered = query.length > 0 
    ? suggestions.filter(s => s.title.toLowerCase().includes(query.toLowerCase()))
    : suggestions.slice(0, 3);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-6 sm:pt-32">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-200"
          >
            <div className="p-8 space-y-8">
              <div className="flex items-center gap-6 relative">
                 <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                 <input 
                  autoFocus
                   placeholder="Search courses, teachers, or notes..."
                   className="w-full bg-slate-50 border-none rounded-3xl pl-16 pr-8 py-6 text-lg font-medium text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400"
                   value={query}
                   onChange={(e) => setQuery(e.target.value)}
                 />
                 <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-all">
                    <X size={24} />
                 </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                     {query.length > 0 ? 'Search Results' : 'Trending Searches'}
                   </h4>
                   <TrendingUp size={14} className="text-slate-300" />
                </div>

                <div className="space-y-3">
                  {filtered.map((item, i) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between p-5 hover:bg-slate-50 rounded-[24px] cursor-pointer group transition-all"
                    >
                      <div className="flex items-center gap-5">
                         <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                            {item.icon}
                         </div>
                         <div>
                            <p className="text-sm font-bold text-slate-900">{item.title}</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{item.type}</p>
                         </div>
                      </div>
                      <ArrowRight size={18} className="text-slate-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                  ))}
                  {filtered.length === 0 && (
                    <div className="py-10 text-center space-y-3">
                       <div className="text-4xl">🔎</div>
                       <p className="text-sm font-medium text-slate-400 italic">No matches found for "{query}". Try searching "Physics" or "Notes".</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Suggestions Footer */}
              <div className="pt-8 border-t border-slate-100 flex gap-4 overflow-x-auto no-scrollbar">
                {['Std 10 Board', 'JEE Physics', 'Organic Roadmap', 'Vidyakul Verified'].map(tag => (
                   <span key={tag} className="px-5 py-2.5 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-500 rounded-full whitespace-nowrap border border-slate-100 cursor-pointer hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all">
                      {tag}
                   </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
