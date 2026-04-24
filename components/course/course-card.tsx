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
      {/* Only Image with Hover Overlay */}
      <div 
        className="relative aspect-video bg-slate-50 overflow-hidden cursor-pointer group-hover:scale-105 transition-all duration-700"
        onClick={() => onPlayDemo(course.demo_video_id || 'bfSoopCm0i8')}
      >
        <img 
          src={`https://img.youtube.com/vi/${course.demo_video_id || 'bfSoopCm0i8'}/hqdefault.jpg`} 
          alt={course.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/60 transition-all duration-500 flex flex-col items-center justify-center p-6">
          <div className="bg-white p-5 rounded-full text-slate-900 transform scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl mb-4">
            <Play size={24} fill="currentColor" />
          </div>
          <h3 className="text-white font-baloo font-bold text-xl text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {course.name}
          </h3>
          <p className="text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em] mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            Watch Demo
          </p>
        </div>

        {/* Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full text-[9px] font-black uppercase tracking-widest">
            {course.year}
          </span>
        </div>
      </div>
    </div>
  );
};
