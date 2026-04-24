// components/homework/homework-card.tsx
import { type FC } from 'react';
import { formatDistanceToNow, isAfter } from 'date-fns';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { HomeworkWithMeta } from '@/types/homework';

interface HomeworkCardProps {
  homework: HomeworkWithMeta;
  onClick: (id: string) => void;
  className?: string;
}

/**
 * Premium Homework card for scholar dashboard.
 * Highlights deadlines and submission status with Hinglish contextual cues.
 */
export const HomeworkCard: FC<HomeworkCardProps> = ({ 
  homework, 
  onClick, 
  className 
}) => {
  const isPending = homework.submissions.length === 0;
  const isLate = homework.due_date ? isAfter(new Date(), new Date(homework.due_date)) : false;
  const isSubmitted = !isPending;
  const submission = homework.submissions[0];

  return (
    <div 
      onClick={() => onClick(homework.id)}
      className={cn(
        "group relative bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all cursor-pointer overflow-hidden",
        className
      )}
    >
      {/* Background Accent */}
      <div className={cn(
        "absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full blur-3xl opacity-10 transition-colors",
        isSubmitted ? "bg-emerald-500" : isLate ? "bg-rose-500" : "bg-amber-500"
      )} />

      <div className="flex flex-col h-full space-y-6">
        <div className="flex items-start justify-between">
          <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
            <BookOpen size={24} />
          </div>
          
          {/* Status Badge */}
          {isSubmitted ? (
            <span className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">
              <CheckCircle2 size={12} /> Submitted
            </span>
          ) : isLate ? (
            <span className="flex items-center gap-1.5 px-4 py-1.5 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black uppercase tracking-widest">
              <AlertCircle size={12} /> Pending (Late)
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-4 py-1.5 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest">
              <Clock size={12} /> In Progress
            </span>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {homework.subject.name}
          </p>
          <h3 className="text-xl font-baloo font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
            {homework.title}
          </h3>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400">
            <Clock size={14} />
            <span className="text-[10px] font-bold">
              {isSubmitted 
                ? `Submitted ${formatDistanceToNow(new Date(submission.submitted_at))} ago`
                : homework.due_date 
                  ? `Due in ${formatDistanceToNow(new Date(homework.due_date))}`
                  : 'No deadline'
              }
            </span>
          </div>
          <ChevronRight size={20} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
