'use client';

export function CourseGridSkeleton() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-12 animate-pulse">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="space-y-4">
          <div className="h-12 w-64 bg-slate-200 rounded-2xl" />
          <div className="h-6 w-96 bg-slate-100 rounded-xl" />
        </div>
        <div className="h-14 w-full lg:w-80 bg-slate-200 rounded-[20px]" />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 w-24 bg-slate-200 rounded-full shrink-0" />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="h-80 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="h-48 bg-slate-100" />
            <div className="p-8 space-y-4">
              <div className="h-4 w-1/3 bg-slate-200 rounded" />
              <div className="h-6 w-full bg-slate-200 rounded" />
              <div className="h-4 w-1/2 bg-slate-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { CourseGridSkeleton as DashboardSkeleton };
