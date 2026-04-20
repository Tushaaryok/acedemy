'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'rounded';
}

export default function Skeleton({ className = '', variant = 'rounded' }: SkeletonProps) {
  const borderRadius = 
    variant === 'circular' ? 'rounded-full' : 
    variant === 'rounded' ? 'rounded-2xl' : 
    'rounded-none';

  return (
    <div 
      className={`relative overflow-hidden bg-slate-100 ${borderRadius} ${className}`}
    >
      <motion.div
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: 'linear',
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/2"
      />
    </div>
  );
}

// Pre-defined complex skeletons for specific dashboards
export function DashboardSkeleton() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-64 md:w-96" />
          <Skeleton className="h-6 w-48 opacity-50" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-14 w-14" variant="circular" />
          <Skeleton className="h-14 w-40" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 space-y-6 shadow-sm">
             <div className="flex justify-between">
                <Skeleton className="h-14 w-14" />
                <Skeleton className="h-6 w-12" />
             </div>
             <Skeleton className="h-4 w-24 opacity-50" />
             <Skeleton className="h-10 w-32" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-white rounded-[48px] p-10 border border-slate-100 h-[450px]">
            <Skeleton className="h-full w-full" />
         </div>
         <div className="space-y-8">
            <div className="bg-white rounded-[40px] p-8 border border-slate-100 h-[300px]">
               <Skeleton className="h-full w-full" />
            </div>
            <div className="bg-white rounded-[40px] p-8 border border-slate-100 h-[120px]">
               <Skeleton className="h-full w-full" />
            </div>
         </div>
      </div>
    </div>
  );
}

export function CourseGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-10 max-w-7xl mx-auto">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="bg-white rounded-[40px] border border-slate-100 overflow-hidden space-y-6 p-8">
           <Skeleton className="h-40 w-full" variant="rectangular" />
           <div className="space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2 opacity-50" />
              <div className="pt-6 border-t border-slate-50 flex justify-between">
                 <Skeleton className="h-4 w-20" />
                 <Skeleton className="h-10 w-10" variant="circular" />
              </div>
           </div>
        </div>
      ))}
    </div>
  );
}
