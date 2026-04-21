import { type FC } from 'react';
import { Play, Calendar, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Batch } from '@prisma/client';

interface CourseCardProps {
  course?: any;
  onPlayDemo?: (videoId: string) => void;
  className?: string;
  // Support spread props from older catalogs
  title?: string;
  teacher?: string;
  thumbnail?: string;
  rating?: number;
  price?: number;
  tags?: string[];
  year?: string;
}

/**
 * Premium Course Card for the Academic Vault.
 * Follows the mandatory React Component Pattern.
 */
export const CourseCard: FC<CourseCardProps> = ({ 
  course: courseProp, 
  onPlayDemo = (id: string) => console.log('Playing', id), 
  className,
  title,
  teacher,
  thumbnail,
  rating,
  price,
  tags: tagsProp,
  year: yearProp
}) => {
  const course = courseProp || {
    name: title,
    demo_video_id: null,
    tags: tagsProp,
    year: yearProp
  };
  return (
    <div className={cn(
      "bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col",
      className
    )}>
      {/* Thumbnail Area */}
      <div 
        className="h-48 bg-slate-50 relative flex items-center justify-center cursor-pointer group-hover:bg-amber-50 transition-colors"
        onClick={() => onPlayDemo(course.demo_video_id || 'bfSoopCm0i8')}
      >
        <img 
          src={`https://img.youtube.com/vi/${course.demo_video_id || 'bfSoopCm0i8'}/hqdefault.jpg`} 
          alt={course.name} 
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white transform scale-90 group-hover:scale-100 transition-transform shadow-xl">
            <Play size={24} fill="currentColor" />
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-4 py-1.5 bg-amber-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-500/20">
            DEMO AVAILABLE
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 flex-1 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">GSEB / CBSE</span>
          <div className="flex gap-2">
            {(course.tags || ['General']).slice(0, 2).map((tag: string) => (
              <span key={tag} className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded-md text-[9px] font-bold uppercase">{tag}</span>
            ))}
          </div>
        </div>

        <h3 className="text-xl font-baloo font-bold text-slate-900 leading-tight group-hover:text-amber-600 transition-colors">
          {course.name}
        </h3>
        
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 text-slate-500">
            <Calendar size={14} className="text-amber-500" />
            <span className="text-xs font-bold leading-none">Session {course.year}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Clock size={14} className="text-amber-500" />
            <span className="text-xs font-bold leading-none">Flexible Batches</span>
          </div>
        </div>

        <div className="pt-6 mt-auto border-t border-slate-50 flex gap-3">
          <button 
            className="flex-1 bg-slate-900 text-white py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95"
            onClick={() => document.getElementById('admissions')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Enroll Now
          </button>
          <button 
            className="p-3.5 bg-white border border-slate-200 text-slate-900 rounded-2xl hover:border-amber-500 hover:text-amber-500 transition-all active:scale-95"
            onClick={() => onPlayDemo(course.demo_video_id || 'bfSoopCm0i8')}
            aria-label={`Watch demo for ${course.name}`}
          >
            <Play size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
