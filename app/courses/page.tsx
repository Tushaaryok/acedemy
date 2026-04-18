'use client';

import { useState } from 'react';
import Header from "@/src/components/Header/Header";
import Footer from "@/src/components/Footer/Footer";
import CourseCard from "@/src/components/Courses/CourseCard";
import { 
  Search, 
  Filter, 
  BookOpen, 
  Sparkles, 
  GraduationCap, 
  Smartphone,
  ChevronRight
} from 'lucide-react';

const COURSES = [
  { id: '1', title: 'Std 10 Mathematics: Board Mastery Pro', teacher: 'Ram Sir', thumbnail: '/imgs/logo.jpeg', rating: 4.8, reviews: 245, students: 1200, price: 999, isLive: true, category: 'School' },
  { id: '2', title: 'Std 12 Chemistry: Organic Specialist', teacher: 'Ram Sir', thumbnail: '/imgs/logo.jpeg', rating: 4.9, reviews: 180, students: 850, price: 149, category: 'Science' },
  { id: '3', title: 'English Alpha: Std 9 to 12 Fluency', teacher: 'Yashvant Sir', thumbnail: '/imgs/logo.jpeg', rating: 4.7, reviews: 110, students: 600, price: 0, isFree: true, category: 'School' },
  { id: '4', title: 'Physics Foundation: NEET & JEE Focus', teacher: 'Ram Sir', thumbnail: '/imgs/logo.jpeg', rating: 4.6, reviews: 95, students: 430, price: 499, category: 'Science' },
  { id: '5', title: 'Social Science: Board Special Prep', teacher: 'Jayesh Sir', thumbnail: '/imgs/logo.jpeg', rating: 4.8, reviews: 320, students: 1500, price: 149, category: 'School' },
  { id: '6', title: 'Commerce: Advanced Accounts Hub', teacher: 'Ram Sir', thumbnail: '/imgs/logo.jpeg', rating: 4.5, reviews: 60, students: 210, price: 299, category: 'Commerce' },
];

const CATEGORIES = ['All', 'School', 'Science', 'Commerce'];

export default function CourseCatalog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = COURSES.filter(course => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen">
      <Header />
      
      <main className="pt-40 pb-24">
        <div className="container mx-auto px-6">
           
           {/* Dynamic Header */}
           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20">
              <div className="max-w-2xl space-y-6">
                 <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-100">
                    <Sparkles size={12} fill="currentColor" /> ACADEMIC DIRECTORY
                 </div>
                 <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-tight">
                    Find Your Path To <br />
                    <span className="text-indigo-600">Educational Mastery.</span>
                 </h1>
                 <p className="text-slate-500 font-medium text-xl leading-relaxed">
                    Explore our curated collection of high-performance batches designed for the modern board student.
                 </p>
              </div>
              
              <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
                 <div className="relative group flex-1 sm:w-96">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                    <input 
                       placeholder="Search academic subjects..." 
                       className="w-full bg-slate-50 border border-slate-100 rounded-[28px] pl-16 pr-6 py-5 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all shadow-sm"
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                    />
                 </div>
                 <div className="flex bg-slate-100 p-2 rounded-[28px] border border-slate-200 shadow-inner">
                    {CATEGORIES.map(cat => (
                       <button 
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`px-8 py-3 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all ${
                             activeCategory === cat ? 'bg-white text-indigo-600 shadow-xl' : 'text-slate-400 hover:text-slate-600'
                          }`}
                       >
                          {cat}
                       </button>
                    ))}
                 </div>
              </div>
           </div>

           {/* Results Deck */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredCourses.map(course => (
                 <CourseCard key={course.id} {...course} />
              ))}
              {filteredCourses.length === 0 && (
                 <div className="col-span-full py-32 text-center opacity-20">
                    <Search size={64} className="mx-auto mb-6" />
                    <p className="font-black uppercase tracking-[0.2em] text-sm">No Courses Discovered In This Faculty</p>
                 </div>
              )}
           </div>

           {/* Institutional Support Section */}
           <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-slate-900 rounded-[64px] p-12 md:p-20 text-white relative overflow-hidden group">
                 <div className="relative z-10 space-y-10">
                    <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-md">
                       <GraduationCap size={32} />
                    </div>
                    <div className="space-y-4">
                       <h2 className="text-4xl font-black tracking-tight leading-none">Need Academic Counseling?</h2>
                       <p className="text-slate-400 font-medium text-lg leading-relaxed">
                          Speak with our department heads to design a personalized learning roadmap for your board aspirations.
                       </p>
                    </div>
                    <button className="bg-white text-slate-900 px-10 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-amber-500 hover:text-white transition-all transform hover:scale-105 active:scale-95">
                       SCHEDULE CONSULTATION
                    </button>
                 </div>
                 <div className="absolute -right-20 -bottom-20 opacity-5 group-hover:scale-110 transition-transform">
                    <BookOpen size={400} />
                 </div>
              </div>

              <div className="bg-indigo-600 rounded-[64px] p-12 md:p-20 text-white relative overflow-hidden group">
                 <div className="relative z-10 space-y-10">
                    <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-md">
                       <Smartphone size={32} />
                    </div>
                    <div className="space-y-4">
                       <h2 className="text-4xl font-black tracking-tight leading-none">Learning On The Go.</h2>
                       <p className="text-indigo-200 font-medium text-lg leading-relaxed">
                          Download our premium mobile ecosystem to access recorded lectures and materials anywhere.
                       </p>
                    </div>
                    <div className="flex gap-4">
                       <button className="bg-slate-950 text-white px-8 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all border border-white/5">
                          APP STORE
                       </button>
                       <button className="bg-slate-950 text-white px-8 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all border border-white/5">
                          PLAY STORE
                       </button>
                    </div>
                 </div>
                 <div className="absolute -right-20 -bottom-20 opacity-10 group-hover:scale-110 transition-transform">
                    <Sparkles size={400} />
                 </div>
              </div>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
