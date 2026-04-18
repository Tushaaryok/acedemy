'use client';

import { useState, useEffect, useCallback } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import './Testimonials.css';

const testimonialsData = [
  { id: 1, name: 'Rahul Sharma', role: 'Student, Std 10 Board', text: 'Krishna Academy completely transformed my learning approach. The faculty is extremely supportive and the study materials are top-notch.', rating: 5 },
  { id: 2, name: 'Meera Patel', role: 'Parent of Std 8 Student', text: 'I have seen a remarkable improvement in my daughter\'s grades. The regular parent-teacher interactive sessions keep us well-informed.', rating: 5 },
  { id: 3, name: 'Aarav Desai', role: 'Student, Std 12 Science', text: 'The best coaching institute for board preparation. Their test series exactly mirrors the final exams and eliminates any exam fear.', rating: 5 },
  { id: 4, name: 'Sneha Joshi', role: 'Student, Std 10', text: 'Teachers here don\'t just teach to finish the syllabus, they ensure every concept is crystal clear before moving forward.', rating: 5 },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section id="results" className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
           <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-100">
              <Sparkles size={12} fill="currentColor" /> SOCIAL PROOF
           </div>
           <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">
              Shared by Our <br />
              <span className="text-indigo-600">Learning Community.</span>
           </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
           <div className="overflow-hidden rounded-[64px] bg-white border border-white shadow-2xl shadow-slate-200/50">
              <div 
                className="flex transition-transform duration-700 ease-in-out" 
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                 {testimonialsData.map((t) => (
                   <div key={t.id} className="min-w-full p-12 md:p-24 flex flex-col items-center text-center space-y-10">
                      <div className="w-20 h-20 bg-indigo-50 rounded-[32px] flex items-center justify-center text-indigo-600 shadow-sm">
                         <Quote size={40} fill="currentColor" opacity={0.15} />
                      </div>
                      <p className="text-xl md:text-3xl font-bold text-slate-800 tracking-tight leading-relaxed italic">
                         "{t.text}"
                      </p>
                      <div className="space-y-4">
                         <div className="flex justify-center gap-1 text-amber-500">
                            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                         </div>
                         <div>
                            <h4 className="text-xl font-black text-slate-900 leading-none">{t.name}</h4>
                            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mt-2">{t.role}</p>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Controls */}
           <div className="absolute top-1/2 -translate-y-1/2 -left-10 md:-left-20 hidden lg:block">
              <button 
                onClick={prevSlide}
                className="p-6 bg-white rounded-full shadow-xl hover:bg-slate-900 hover:text-white transition-all transform hover:scale-110 active:scale-95 border border-slate-50"
              >
                 <ChevronLeft size={32} />
              </button>
           </div>
           <div className="absolute top-1/2 -translate-y-1/2 -right-10 md:-right-20 hidden lg:block">
              <button 
                onClick={nextSlide}
                className="p-6 bg-white rounded-full shadow-xl hover:bg-slate-900 hover:text-white transition-all transform hover:scale-110 active:scale-95 border border-slate-50"
              >
                 <ChevronRight size={32} />
              </button>
           </div>
        </div>

        <div className="flex justify-center gap-3 mt-12">
           {testimonialsData.map((_, i) => (
             <button 
               key={i}
               onClick={() => setCurrentIndex(i)}
               className={`h-2 rounded-full transition-all duration-500 ${
                 i === currentIndex ? 'w-12 bg-indigo-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
               }`}
             />
           ))}
        </div>
      </div>

      {/* Abstract Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-[120px] -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-100/20 rounded-full blur-[100px] translate-x-1/2" />
    </section>
  );
}
