'use client';

import { type FC, useState } from 'react';
import { X } from 'lucide-react';

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

  const { data, isLoading, isError } = useQuery<{ items: Batch[] }>({
    queryKey: ['batches'],
    queryFn: async () => {
      const res = await api.get('/batches');
      return res.data.data;
    },
  });

  const tabs: string[] = ['All', 'Secondary', 'Higher Secondary'];

  const filteredCourses = activeTab === 'All' 
    ? data?.items 
    : data?.items.filter((c: Batch) => c.name.includes(activeTab));

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
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl sm:text-5xl font-baloo font-black text-slate-900 mb-4 tracking-tight">Academic Vault</h2>
          <p className="text-slate-500 font-medium text-lg">Explore the best coaching & tuition classes in Upleta for commerce and science.</p>
        </div>

        {/* Tab Filters */}
        <div className="flex gap-3 overflow-x-auto pb-8 no-scrollbar">
          {tabs.map((tab: string) => (
            <button 
              key={tab}
              className={cn(
                "px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap",
                activeTab === tab 
                  ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20" 
                  : "bg-white text-slate-400 border border-slate-100 hover:border-slate-300"
              )}
              onClick={() => setActiveTab(tab)}
              aria-label={`Filter by ${tab}`}
            >
              {tab === 'Secondary' ? 'Secondary (8-10)' : tab === 'Higher Secondary' ? 'Higher Secondary (11-12)' : tab}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredCourses?.map((course: Batch) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onPlayDemo={openVideo} 
            />
          ))}

          {(!data?.items || data.items.length === 0) && (
            <div className="col-span-full py-20 text-center">
              <div className="inline-block p-10 bg-amber-50 rounded-[48px] border border-amber-100/50">
                <p className="text-amber-800 font-black uppercase tracking-[0.2em] text-xs">No active batches detected in vault.</p>
                <p className="text-amber-600/60 text-[10px] font-bold mt-2 italic text-center mx-auto max-w-xs">Our academy is preparing new academic content. Check back soon for synchronized batches.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-xl animate-in fade-in duration-300" 
          onClick={closeVideo}
        >
          <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black" onClick={e => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all" 
              onClick={closeVideo}
              aria-label="Close video player"
            >
              <X size={24} />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="YouTube video player"
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};
