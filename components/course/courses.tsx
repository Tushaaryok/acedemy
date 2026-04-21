// components/course/courses.tsx
'use client';

import { type FC, useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { cn } from '@/lib/utils';
import { CourseCard } from './course-card';
import { CourseGridSkeleton } from '@/components/ui/skeleton';
import type { Batch } from '@prisma/client';

/**
 * Academic Vault / Courses section.
 * Fetches batches using TanStack Query and enforces the React Component Pattern.
 */
export const Courses: FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const { data: batches, isLoading, isError } = useQuery<Batch[]>({
    queryKey: ['batches'],
    queryFn: async () => {
      const res = await api.get('/batches');
      return res.data.data;
    },
  });

  const tabs: string[] = ['All', 'Secondary', 'Higher Secondary'];

  const filteredCourses = activeTab === 'All' 
    ? batches 
    : batches?.filter((c: Batch) => c.name.toLowerCase().includes(activeTab.toLowerCase().split(' ')[0]));

  const openVideo = (videoId: string): void => {
    setSelectedVideo(videoId);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = (): void => {
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };

  if (isLoading) return <CourseGridSkeleton />;
  if (isError) return <div className="py-20 text-center font-black text-rose-500">FAILED TO CONNECT TO ACADEMIC VAULT.</div>;

  return (
    <section id="courses" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16 px-4">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-amber-100 mb-6">
             PREMIUM BATCHES
          </div>
          <h2 className="text-4xl sm:text-6xl font-baloo font-black text-slate-900 mb-6 tracking-tighter">Academic Vault</h2>
          <p className="text-slate-500 font-medium text-xl leading-relaxed">
            Explore the best coaching & tuition classes in Upleta for commerce and science.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex gap-3 overflow-x-auto pb-8 no-scrollbar px-4">
          {tabs.map((tab: string) => (
            <button 
              key={tab}
              className={cn(
                "px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap",
                activeTab === tab 
                  ? "bg-slate-900 text-white shadow-2xl shadow-slate-900/20" 
                  : "bg-slate-50 text-slate-400 border border-slate-100 hover:border-slate-300"
              )}
              onClick={() => setActiveTab(tab)}
              aria-label={`Filter by ${tab}`}
            >
              {tab === 'Secondary' ? 'Secondary (8-10)' : tab === 'Higher Secondary' ? 'Higher Secondary (11-12)' : tab}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
          {filteredCourses?.map((course: Batch) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onPlayDemo={openVideo} 
            />
          ))}

          {(!batches || batches.length === 0) && (
            <div className="col-span-full py-32 text-center">
              <div className="inline-block p-16 bg-slate-50 rounded-[64px] border-2 border-dashed border-slate-200">
                <p className="text-slate-900 font-black uppercase tracking-[0.2em] text-sm">No active batches discovered in vault.</p>
                <p className="text-slate-400 text-xs font-bold mt-4 italic max-w-xs mx-auto">Our academy is preparing new academic content. Join our community for synchronized updates.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-slate-950/95 backdrop-blur-2xl"
            onClick={closeVideo}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl aspect-video rounded-[40px] overflow-hidden shadow-2xl bg-black border border-white/10" 
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="absolute top-6 right-6 z-10 p-4 bg-white/10 hover:bg-white/20 text-white rounded-3xl backdrop-blur-xl transition-all" 
                onClick={closeVideo}
                aria-label="Close video player"
              >
                <X size={24} />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
                title="YouTube video player"
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
