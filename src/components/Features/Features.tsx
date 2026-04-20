'use client';

import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  LineChart, 
  ShieldCheck, 
  Award,
  Sparkles
} from 'lucide-react';
import './Features.css';

const featuresData = [
  {
    id: 1,
    title: 'Expert Teachers',
    description: 'Learn from highly qualified educators with over 15+ years of success stories.',
    icon: <GraduationCap size={28} />,
    color: 'indigo'
  },
  {
    id: 2,
    title: 'Precision Batches',
    description: 'Limited seating ensures every student gets individual attention and mentorship.',
    icon: <Users size={28} />,
    color: 'amber'
  },
  {
    id: 3,
    title: 'Success Analytics',
    description: 'Weekly tests with AI-driven reports to identify and fix your learning gaps.',
    icon: <LineChart size={28} />,
    color: 'rose'
  },
  {
    id: 4,
    title: 'Elite Resources',
    description: 'Digital study material and question banks curated for board exam dominance.',
    icon: <BookOpen size={28} />,
    color: 'emerald'
  },
  {
    id: 5,
    title: 'Hinglish Digital Portal',
    description: '24/7 access to live classes, recorded lectures, and doubt solving in your own language.',
    icon: <ShieldCheck size={28} />,
    color: 'blue'
  },
  {
    id: 6,
    title: 'Proven Legacy',
    description: 'Upleta\'s highest success rate with city toppers consistently since 2014.',
    icon: <Award size={28} />,
    color: 'slate'
  }
];

export default function Features() {
  return (
    <section id="advantages" className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-amber-100">
             <Sparkles size={12} fill="currentColor" /> The Krishna Edge
          </div>
          <h2 className="text-5xl font-baloo font-bold text-slate-900 tracking-tight leading-tight">
            Why We Are Upleta's <span className="text-amber-500">Choice.</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg leading-relaxed">
            We don't just teach subjects; we build foundations that last a lifetime through our unique scientific pedagogy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map(feature => (
            <div key={feature.id} className="group p-10 rounded-[48px] bg-slate-50 border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
              <div className="w-16 h-16 rounded-3xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-baloo font-bold text-slate-900 mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="w-12 h-1 bg-amber-500 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-100/30 rounded-full blur-[120px] -mr-48"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-indigo-100/20 rounded-full blur-[100px] -ml-40"></div>
    </section>
  );
}
