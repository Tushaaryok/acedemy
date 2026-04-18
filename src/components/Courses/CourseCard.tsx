import Image from 'next/image';
import Link from 'next/link';
import { Star, Users, PlayCircle, Clock } from 'lucide-react';

interface CourseCardProps {
  id: string;
  title: string;
  teacher: string;
  teacherImage?: string;
  thumbnail: string;
  rating: number;
  reviews: number;
  students: number;
  price: number;
  isFree?: boolean;
  isLive?: boolean;
  category: string;
}

export default function CourseCard({ 
  id, title, teacher, thumbnail, rating, reviews, students, price, isFree, isLive, category 
}: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`} className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 overflow-hidden flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden">
        <Image 
          src={thumbnail} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isLive && (
            <span className="bg-rose-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 animate-pulse">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div> Live Batch
            </span>
          )}
          <span className="bg-blue-900/80 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
            {category}
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < Math.floor(rating) ? "currentColor" : "none"} />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-400">({reviews})</span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-900 transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-slate-500 font-medium mb-6">By {teacher}</p>

        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-slate-400">
              <Users size={14} />
              <span className="text-[10px] font-bold uppercase">{students}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold uppercase">
              <HinglishBadge />
            </div>
          </div>
          
          <div className="text-right">
            {isFree ? (
              <span className="text-emerald-600 font-black text-lg">FREE</span>
            ) : (
              <span className="text-slate-900 font-black text-lg">₹{price}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function HinglishBadge() {
  return (
    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[9px] font-black">HINGLISH</span>
  );
}
