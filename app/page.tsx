import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import { Courses } from "@/components/course/courses";
import { 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  BookOpen, 
  Users, 
  TrendingUp, 
  CheckCircle2,
  Clock,
  Video,
  FileText,
  Play,
  Star,
  Image as ImageIcon,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
            {/* Left: Content */}
            <div className="flex flex-col items-start text-left lg:w-1/2 space-y-8">
              <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-indigo-100 shadow-sm">
                <Sparkles size={14} className="fill-indigo-600/20" /> Welcome to Excellence
              </div>
              
              <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[1.1] font-baloo">
                Shape Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-500">Educational Mastery.</span>
              </h1>
              
              <p className="text-slate-500 font-medium text-lg md:text-xl leading-relaxed max-w-xl">
                Upleta's #1 coaching institute for Science & Commerce. Expert faculty, high-fidelity results, and a premium digital environment.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
                <Link 
                  href="/login"
                  className="w-full sm:w-64 bg-slate-900 text-white px-10 py-6 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/40 hover:bg-indigo-600 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
                >
                  Student Portal <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/courses"
                  className="w-full sm:w-64 bg-white border-2 border-slate-100 text-slate-900 px-10 py-6 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] hover:border-slate-900 transition-all flex items-center justify-center gap-3"
                >
                  Browse Batches
                </Link>
              </div>
            </div>

            {/* Right: Faculty Visual Stack */}
            <div className="lg:w-1/2 relative h-[400px] md:h-[500px] w-full flex items-center justify-center lg:justify-end pr-10">
              <div className="relative w-full max-w-md h-full">
                 {/* Ram Sir */}
                 <div className="absolute top-0 right-0 w-[240px] h-[320px] bg-slate-100 rounded-[40px] overflow-hidden shadow-2xl border-4 border-white rotate-6 hover:rotate-0 transition-all duration-500 z-30 group">
                    <img src="/imgs/ram_new.jpeg" alt="Ram Sir" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    <div className="absolute bottom-6 left-6 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="font-black text-xl">Ram Sir</p>
                      <p className="text-[10px] uppercase tracking-widest font-bold">Mathematics</p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 </div>
                 
                 {/* Yashvant Sir */}
                 <div className="absolute top-10 right-20 w-[220px] h-[300px] bg-slate-100 rounded-[40px] overflow-hidden shadow-xl border-4 border-white -rotate-6 hover:rotate-0 transition-all duration-500 z-20 group">
                    <img src="/imgs/yashwant_new.jpeg" alt="Yashvant Sir" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    <div className="absolute bottom-6 left-6 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="font-black text-xl">Yashvant Sir</p>
                      <p className="text-[10px] uppercase tracking-widest font-bold">English</p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 </div>

                 {/* Jayesh Sir */}
                 <div className="absolute top-20 right-40 w-[200px] h-[280px] bg-slate-100 rounded-[40px] overflow-hidden shadow-lg border-4 border-white -rotate-12 hover:rotate-0 transition-all duration-500 z-10 group">
                    <img src="/imgs/jayesh_new.jpeg" alt="Jayesh Sir" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    <div className="absolute bottom-6 left-6 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="font-black text-xl">Jayesh Sir</p>
                      <p className="text-[10px] uppercase tracking-widest font-bold">Social Science</p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[140px] -mr-96 -mt-96 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] -ml-72 -mb-72 -z-10"></div>
      </section>

      {/* Courses Section */}
      <Courses />

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

      {/* Faculty Section */}
      <section id="faculty" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-20 px-4">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-100 mb-6">
              EXPERT MENTORS
            </div>
            <h2 className="text-4xl md:text-6xl font-baloo font-black text-slate-900 mb-6 tracking-tighter">Guiding Your Success</h2>
            <p className="text-slate-500 font-medium text-xl leading-relaxed">Meet the architects of your academic future. Our faculty brings decades of collective teaching wisdom.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: 'Ram Sir', role: 'Head of Science', subjects: 'Mathematics & Physics', desc: '12+ years of experience in board and competitive exam coaching.' },
              { name: 'Yashvant Sir', role: 'Head of Languages', subjects: 'English & Sanskrit', desc: 'Specialist in linguistic mastery and communication excellence.' },
              { name: 'Jayesh Sir', role: 'General Studies', subjects: 'Social Science', desc: 'Passionate educator with a proven track record of 95+ score toppers.' }
            ].map((member, i) => (
              <div key={i} className="group relative">
                <div className="aspect-[4/5] bg-slate-100 rounded-[40px] overflow-hidden mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-10">
                    <p className="text-white text-sm font-medium leading-relaxed">{member.desc}</p>
                  </div>
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-1">{member.name}</h4>
                <p className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-3">{member.role}</p>
                <p className="text-slate-400 text-sm font-bold">{member.subjects}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-32 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100 mb-6">
               TOP PERFORMERS
            </div>
            <h2 className="text-4xl md:text-6xl font-baloo font-black text-slate-900 mb-6 tracking-tighter">Wall of Fame</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((id) => (
              <div key={id} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl transition-all">
                <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                   <Star className="text-amber-400" fill="currentColor" />
                </div>
                <h5 className="font-bold text-lg text-slate-900">Student Name</h5>
                <p className="text-indigo-600 font-black text-2xl mt-2">98.4%</p>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Std 12 Commerce</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-100 mb-6">
               ACADEMY LIFE
            </div>
            <h2 className="text-4xl md:text-6xl font-baloo font-black text-slate-900 mb-6 tracking-tighter">Inside the Academy</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {[
              "col-span-1 row-span-2", "col-span-1 row-span-1", "col-span-1 row-span-1",
              "col-span-2 row-span-1", "col-span-1 row-span-1"
            ].map((span, i) => (
              <div key={i} className={`${span} bg-slate-100 rounded-[40px] flex items-center justify-center border border-slate-50 group overflow-hidden`}>
                 <ImageIcon size={48} className="text-slate-200 group-hover:scale-125 transition-transform" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-[64px] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
            <div className="lg:w-1/2 p-12 md:p-20 space-y-12 bg-indigo-600 text-white">
               <h2 className="text-5xl font-black font-baloo tracking-tighter">Ready to join <br /> the elite?</h2>
               <p className="text-indigo-100 font-medium text-lg leading-relaxed">Fill out the form and our admissions team will synchronize with you within 24 hours.</p>
               
               <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center"><Phone size={20} /></div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Call Us</p>
                      <p className="font-bold">+91 99999 00000</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center"><MapPin size={20} /></div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Visit Us</p>
                      <p className="font-bold">Upleta, Gujarat, India</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center"><Mail size={20} /></div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Email Us</p>
                      <p className="font-bold">info@krishnaacademyupleta.com</p>
                    </div>
                  </div>
               </div>
            </div>
            
            <div className="lg:w-1/2 p-12 md:p-20 bg-white">
               <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
                      <input className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm font-bold outline-none focus:border-indigo-600 transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Phone Number</label>
                      <input className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm font-bold outline-none focus:border-indigo-600 transition-all" placeholder="+91" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Inquiry Subject</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm font-bold outline-none focus:border-indigo-600 transition-all appearance-none">
                      <option>Admission Inquiry</option>
                      <option>General Support</option>
                      <option>Career Guidance</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Message</label>
                    <textarea className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm font-bold outline-none focus:border-indigo-600 transition-all min-h-[150px]" placeholder="How can we help you?"></textarea>
                  </div>
                  <button className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10">SEND MESSAGE</button>
               </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
