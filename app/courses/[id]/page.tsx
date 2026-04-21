'use client';
import { useParams } from 'next/navigation';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { 
  Star, 
  Users, 
  Info, 
  Play, 
  CheckCircle2, 
  ChevronDown, 
  Lock, 
  Clock, 
  Calendar,
  ShieldCheck,
  Video
} from 'lucide-react';
import Image from 'next/image';

// Mock detailed data
const COURSE_DETAIL = {
  id: '1',
  title: 'Standard 10 Mathematics: Full Year Masterclass',
  description: 'Master Class 10 Board Mathematics with Ram Sir. Complete syllabus coverage, regular assignments, and dedicated doubt-clearing sessions in Hinglish.',
  teacher: 'Ram Sir',
  teacherBio: 'B.Sc, B.Ed with over 14 years of experience teaching mathematics to board students. Known for simplifying complex calculus and algebra.',
  teacherImage: '/imgs/ram_new.jpeg',
  rating: 4.8,
  reviews: 245,
  students: 1200,
  price: 999,
  duration: '12 Months',
  lectures: 140,
  isLive: true,
  learningOutcomes: [
    'Complete mastery of Algebraic Expressions & Polynomials',
    'Understand Trigonometry from basics to advanced levels',
    'Shortcut methods for Geometry proofs and theorems',
    'Personalized strategy for scoring 95+ in Board Exams',
    'Daily practice questions and weekly mock tests'
  ],
  curriculum: [
    {
      chapter: 'Chapter 1: Real Numbers',
      lessons: [
        { title: 'Introduction to Euclid\'s Division Lemma', duration: '45 min', isFree: true },
        { title: 'Fundamental Theorem of Arithmetic', duration: '60 min', isFree: false },
        { title: 'Irrational Numbers Proofs', duration: '50 min', isFree: false },
      ]
    },
    {
      chapter: 'Chapter 2: Polynomials',
      lessons: [
        { title: 'Geometrical Meaning of Zeroes', duration: '40 min', isFree: false },
        { title: 'Relationship between Zeroes and Coefficients', duration: '55 min', isFree: false },
      ]
    }
  ]
};

export default function CourseDetail() {
  const { id } = useParams();
  const course = COURSE_DETAIL; // In reality, fetch by id

  return (
    <div className="bg-white min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="container relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-500/30">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
              Top Seller: Std 10 Board
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
              {course.title}
            </h1>
            <p className="text-slate-400 text-lg font-medium mb-8 max-w-2xl leading-relaxed">
              {course.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500 focus:outline-none">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < 4 ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-300">{course.rating} ({course.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Users size={18} />
                <span className="text-sm font-bold">{course.students} students enrolled</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Image src={course.teacherImage} alt={course.teacher} width={48} height={48} className="rounded-full border-2 border-slate-700" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Mentored by</p>
                <p className="text-base font-bold text-white">{course.teacher}</p>
              </div>
            </div>
          </div>

          {/* Sticky Billing Card (Mobile) / Side Card (Desktop) */}
          <div className="w-full md:w-[400px] shrink-0">
             <div className="bg-white rounded-[40px] p-8 text-slate-900 shadow-2xl shadow-black/20 border border-slate-100 flex flex-col gap-6">
                <div className="relative aspect-video rounded-3xl overflow-hidden group cursor-pointer">
                  <Image src="/imgs/logo.jpeg" alt="Thumbnail" fill className="object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-900 shadow-xl group-hover:scale-110 transition-transform">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-black text-xs uppercase tracking-widest whitespace-nowrap">
                    Preview Sample Lesson
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-black">₹{course.price}</span>
                    <span className="text-slate-400 text-lg line-through font-bold">₹2,499</span>
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-xl text-xs font-black uppercase">60% OFF</span>
                  </div>
                  <p className="text-xs text-rose-500 font-bold flex items-center gap-1">
                     <Clock size={12} /> Offer ends in 14 hours!
                  </p>
                </div>

                <button className="w-full bg-blue-900 text-white p-5 rounded-2xl font-black text-lg hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/10 transform active:scale-95">
                  Enroll in Batch Now
                </button>

                <div className="space-y-4">
                  <p className="text-xs font-black uppercase text-slate-400">This course includes:</p>
                  <ul className="space-y-3">
                    {[
                      { icon: <Video />, text: `${course.lectures} Interactive lectures` },
                      { icon: <ShieldCheck />, text: 'Full Year Access' },
                      { icon: <Clock />, text: 'Doubt clearing sessions' },
                      { icon: <Calendar />, text: 'Weekly Mock Tests' },
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                        <span className="text-blue-600">{item.icon}</span>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-50 flex justify-center gap-6">
                   <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-900">Share Course</button>
                   <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-900">Apply Coupon</button>
                </div>
             </div>
          </div>
        </div>
        
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] -mr-96 -mt-96 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -ml-64 -mb-64 pointer-events-none"></div>
      </div>

      <main className="container py-20 flex flex-col md:flex-row gap-16">
        <div className="flex-1 space-y-20">
          
          {/* What You'll Learn */}
          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
               <CheckCircle2 className="text-blue-900" size={32} /> What You'll Learn
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {course.learningOutcomes.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                   <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={18} />
                   <p className="text-slate-600 font-medium leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Curriculum */}
          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
               <Video className="text-blue-900" size={32} /> Course Curriculum
            </h2>
            <div className="space-y-4">
              {course.curriculum.map((item, i) => (
                <div key={i} className="border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                  <div className="bg-slate-50 p-6 flex justify-between items-center cursor-pointer group">
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-900 transition-colors">{item.chapter}</h4>
                    <ChevronDown size={20} className="text-slate-400" />
                  </div>
                  <div className="p-2 space-y-1">
                    {item.lessons.map((lesson, j) => (
                      <div key={j} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${lesson.isFree ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                             {lesson.isFree ? <Play size={12} fill="currentColor" /> : <Lock size={12} />}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">{lesson.title}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lesson.duration}</p>
                          </div>
                        </div>
                        {lesson.isFree && <button className="text-blue-900 font-black text-[10px] uppercase tracking-widest hover:underline">Preview</button>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* About Teacher */}
          <section className="bg-slate-50 rounded-[40px] p-10 flex flex-col md:flex-row gap-10 items-start">
             <div className="w-40 h-48 shrink-0 relative rounded-3xl overflow-hidden shadow-xl border-4 border-white rotate-2">
                <Image src={course.teacherImage} alt={course.teacher} fill className="object-cover" />
             </div>
             <div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Meet Your Mentor: {course.teacher}</h3>
                <p className="text-blue-900 font-bold mb-4 uppercase text-xs tracking-[2px]">Director @ Krishna Academy</p>
                <p className="text-slate-600 font-medium leading-relaxed mb-6">
                  {course.teacherBio}
                </p>
                <div className="flex gap-6">
                   <div>
                      <p className="text-2xl font-black text-slate-900">14+</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Yrs Experience</p>
                   </div>
                   <div className="w-[1px] h-10 bg-slate-200"></div>
                   <div>
                      <p className="text-2xl font-black text-slate-900">5k+</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Happy Students</p>
                   </div>
                </div>
             </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
