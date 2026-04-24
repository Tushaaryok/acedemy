'use client';
import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  ArrowRight,
  Play,
  Clock,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { CourseGridSkeleton } from '@/components/ui/skeleton';
import { batches } from '@prisma/client';

interface CourseUI {
  id: string;
  title: string;
  teacher: string;
  rating: number;
  students: number;
  price: 'FREE' | 'PAID';
  category: string;
  thumb: string;
}

export default function CourseCatalog() {
  const [filter, setFilter] = useState<string>('All');

  const { data, isLoading, isError } = useQuery<{ items: batches[] }>({
    queryKey: ['batches'],
    queryFn: async () => {
      const res = await api.get('/batches');
      return res.data.data;
    },
  });

  const courses: CourseUI[] = data?.items.map((batch: batches): CourseUI => ({
    id: batch.id,
    title: batch.name,
    teacher: 'Expert Faculty',
    rating: 4.8,
    students: 500,
    price: batch.name.toLowerCase().includes('secondary') ? 'FREE' : 'PAID',
    category: batch.stream || 'General',
    thumb: batch.name.toLowerCase().includes('science') ? '🧪' : 
           batch.name.toLowerCase().includes('commerce') ? '📈' : '📐'
  })) || [];

  const categories = ['All', 'Physics', 'Math', 'Chemistry', 'Biology', 'Commerce'];

  if (isLoading) return <CourseGridSkeleton />;
  if (isError) return <div className="p-20 text-center font-black text-rose-500">FAILED TO CONNECT TO ACADEMIC VAULT.</div>;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-12">
      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="space-y-1">
          <h1 className="text-5xl font-baloo font-bold text-slate-900 tracking-tight">Academic Vault</h1>
          <p className="text-slate-500 font-medium text-lg">Explore curated courses designed for Board Excellence.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search subjects, chapters..." 
              className="w-full bg-white border border-slate-200 rounded-[20px] pl-12 pr-6 py-4 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>
          <button className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              filter === cat 
                ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' 
                : 'bg-white text-slate-400 border border-slate-100 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col">
            {/* Thumbnail Area */}
            <div className="h-48 bg-slate-50 relative flex items-center justify-center text-6xl group-hover:bg-indigo-50 transition-colors">
               {course.thumb}
               <div className="absolute top-4 left-4">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    course.price === 'FREE' ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white'
                  }`}>
                    {course.price}
                  </span>
               </div>
               <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                  <Link href={`/dashboard/student/courses/${course.id}`} className="bg-indigo-600 text-white p-4 rounded-full shadow-lg shadow-indigo-600/30 transform translate-y-4 group-hover:translate-y-0 transition-all">
                     <Play size={20} fill="currentColor" />
                  </Link>
               </div>
            </div>

            {/* Content Area */}
            <div className="p-8 flex-1 flex flex-col space-y-4">
               <div className="flex items-center gap-2 text-amber-500 font-bold text-xs">
                  <Star size={14} fill="currentColor" /> {course.rating} <span className="text-slate-300 ml-1">({course.students} scholars)</span>
               </div>
               <h3 className="text-xl font-baloo font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                 {course.title}
               </h3>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">By {course.teacher}</p>
               
               <div className="pt-6 border-t border-slate-50 flex justify-between items-center mt-auto">
                  <div className="flex items-center gap-4 text-slate-400">
                     <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span className="text-[10px] font-black uppercase">24h</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                        <BookOpen size={14} />
                        <span className="text-[10px] font-black uppercase italic">12 Ch</span>
                     </div>
                  </div>
                  <Link href={`/dashboard/student/courses/${course.id}`} className="text-indigo-600 p-2 hover:bg-indigo-50 rounded-xl transition-all">
                     <ArrowRight size={20} />
                  </Link>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
