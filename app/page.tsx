
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  BookOpen, 
  Users, 
  TrendingUp, 
  ShieldCheck,
  CheckCircle2,
  Clock,
  Video,
  FileText,
  Play
} from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto space-y-10">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-indigo-100 shadow-sm animate-fade-in-up">
              <Sparkles size={14} className="fill-indigo-600/20" /> Welcome to Excellence
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[1.1] font-baloo">
              Shape Your Future With <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-500">Educational Mastery.</span>
            </h1>
            
            <p className="text-slate-500 font-medium text-lg md:text-2xl leading-relaxed max-w-3xl">
              Upleta's #1 coaching institute for Science & Commerce. Expert faculty, high-fidelity results, and a premium digital environment.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
              <Link 
                href="/login"
                className="w-full sm:w-64 bg-slate-900 text-white px-10 py-6 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/40 hover:bg-indigo-600 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
              >
                Enter Student Portal <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/courses"
                className="w-full sm:w-64 bg-white border-2 border-slate-100 text-slate-900 px-10 py-6 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] hover:border-slate-900 transition-all flex items-center justify-center gap-3"
              >
                Browse Batches
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[140px] -mr-96 -mt-96 -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] -ml-72 -mb-72 -z-10"></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-slate-50 bg-slate-50/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Proven Results', value: '100%', icon: <CheckCircle2 className="text-emerald-500" /> },
              { label: 'Active Students', value: '500+', icon: <Users className="text-blue-500" /> },
              { label: 'Expert Mentors', value: '12+', icon: <GraduationCap className="text-indigo-500" /> },
              { label: 'Years of Wisdom', value: '15+', icon: <Clock className="text-amber-500" /> },
            ].map((stat, i) => (
              <div key={i} className="space-y-3 group">
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <p className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Faculties */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-amber-100 mb-6">
                OUR FACULTIES
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none font-baloo">Professional streams <br /> for brilliant minds.</h2>
            </div>
            <p className="text-slate-400 font-medium text-lg max-w-sm">From secondary school foundations to higher secondary board specialties.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             {[
               { 
                 name: 'Higher Secondary Science', 
                 desc: 'Targeting top board scores and competitive entrance exams like NEET and JEE.', 
                 color: 'bg-blue-600', 
                 icon: <Sparkles size={32} /> 
               },
               { 
                 name: 'Higher Secondary Commerce', 
                 desc: 'Specialized accounting, economics, and business studies for future entrepreneurs.', 
                 color: 'bg-indigo-600', 
                 icon: <TrendingUp size={32} /> 
               },
               { 
                 name: 'Secondary Foundation', 
                 desc: 'Comprehensive Std 8-10 coaching building strong basics for future academic success.', 
                 color: 'bg-emerald-600', 
                 icon: <BookOpen size={32} /> 
               },
             ].map((fac, i) => (
               <div key={i} className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-sm group hover:border-slate-900 transition-all duration-500">
                  <div className={`${fac.color} w-16 h-16 rounded-3xl flex items-center justify-center text-white mb-8 shadow-2xl shadow-slate-200 group-hover:scale-110 transition-transform`}>
                     {fac.icon}
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mb-4">{fac.name}</h4>
                  <p className="text-slate-500 font-medium leading-relaxed mb-8">{fac.desc}</p>
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Explore Stream <ArrowRight size={14} />
                  </button>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Modern Learning Ecosystem */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12 relative z-10">
               <div>
                  <div className="inline-flex items-center gap-2 bg-white/5 text-indigo-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/5 mb-8">
                    DIGITAL ECOSYSTEM
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] font-baloo">
                    A classroom without <br /> any boundaries.
                  </h2>
               </div>
               
               <div className="space-y-8">
                  {[
                    { title: 'Live Streaming', desc: 'Interact with faculty in real-time from our professional studio.', icon: <Video className="text-indigo-400" /> },
                    { title: 'Academic Vault', desc: 'Access recorded lectures, notes, and material 24/7.', icon: <Play className="text-amber-400" /> },
                    { title: 'Smart Tests', desc: 'Regular personalized mock exams and performance analytics.', icon: <FileText className="text-emerald-400" /> },
                  ].map((feat, i) => (
                    <div key={i} className="flex gap-6 group">
                       <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
                          {feat.icon}
                       </div>
                       <div>
                          <h4 className="text-xl font-bold mb-1">{feat.title}</h4>
                          <p className="text-slate-400 text-sm font-medium">{feat.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            
            <div className="relative">
               <div className="absolute -inset-10 bg-indigo-500/20 rounded-full blur-[80px]"></div>
               <div className="relative aspect-square md:aspect-video rounded-[64px] overflow-hidden border border-white/10 shadow-2xl">
                  {/* Mock browser UI or dynamic image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900 flex items-center justify-center p-12">
                     <div className="w-full h-full bg-white/5 rounded-3xl border border-white/5 p-8 flex flex-col gap-6">
                        <div className="h-4 w-32 bg-white/10 rounded-full"></div>
                        <div className="grid grid-cols-2 gap-6">
                           <div className="h-32 bg-white/5 rounded-2xl"></div>
                           <div className="h-32 bg-white/5 rounded-2xl"></div>
                        </div>
                        <div className="flex-1 bg-white/5 rounded-2xl"></div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
        
        {/* Background Decorative */}
        <div className="absolute -right-20 top-20 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl"></div>
      </section>

      <Footer />
    </div>
  );
}
