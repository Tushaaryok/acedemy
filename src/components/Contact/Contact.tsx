'use client';

import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Share2, 
  Globe,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import './Contact.css';

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-100">
             <Globe size={12} fill="currentColor" /> CONNECT WITH US
          </div>
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">
             Find Us At The <span className="text-indigo-600">Heart Of Upleta.</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg">
             Visit our campus for a personalized counseling session and institutional tour.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-slate-50 p-6 md:p-12 rounded-[64px] border border-slate-100 shadow-sm relative group">
          
          <div className="space-y-10 py-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="p-8 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group/item">
                   <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all">
                      <MapPin size={24} />
                   </div>
                   <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Institution Address</h4>
                   <p className="text-sm font-bold text-slate-800 leading-relaxed">
                      Shaligram Complex, Adarsh Street,<br />Vadchok, Upleta, Gujarat 360490
                   </p>
                   <a href="https://share.google/UQtN9ZsU4HPDbJjRI" target="_blank" className="mt-6 inline-flex items-center gap-2 text-[10px] font-black uppercase text-indigo-600 tracking-widest hover:gap-4 transition-all">
                      Get Directions <ArrowUpRight size={14} />
                   </a>
                </div>

                <div className="p-8 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group/item">
                   <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all">
                      <Phone size={24} />
                   </div>
                   <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Admission Desk</h4>
                   <p className="text-sm font-bold text-slate-800">+91 81609 91166</p>
                   <p className="text-sm font-bold text-slate-800">+91 94096 68196</p>
                   <a href="tel:+918160991166" className="mt-6 inline-flex items-center gap-2 text-[10px] font-black uppercase text-emerald-600 tracking-widest hover:gap-4 transition-all">
                      Call Registry <ArrowUpRight size={14} />
                   </a>
                </div>

                <div className="p-8 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group/item">
                   <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover/item:bg-rose-600 group-hover/item:text-white transition-all">
                      <Mail size={24} />
                   </div>
                   <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Official Email</h4>
                   <p className="text-sm font-bold text-slate-800 truncate">upletakrishnaacademy@gmail.com</p>
                   <a href="mailto:upletakrishnaacademy@gmail.com" className="mt-6 inline-flex items-center gap-2 text-[10px] font-black uppercase text-rose-600 tracking-widest hover:gap-4 transition-all">
                      Write To Us <ArrowUpRight size={14} />
                   </a>
                </div>

                <div className="p-8 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group/item">
                   <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover/item:bg-amber-600 group-hover/item:text-white transition-all">
                      <Clock size={24} />
                   </div>
                   <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Working Hours</h4>
                   <p className="text-sm font-bold text-slate-800">Mon - Sat: 7AM - 8PM</p>
                   <p className="text-sm font-bold text-slate-800">Sunday: Study Break</p>
                </div>
             </div>

             <div className="flex items-center gap-6 pt-10 border-t border-slate-200">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Share2 size={16} /> Digital Handles:
                </p>
                <div className="flex gap-4">
                   {['Instagram', 'Facebook', 'WhatsApp'].map(plat => (
                     <button key={plat} className="text-[10px] font-black uppercase text-slate-900 hover:text-indigo-600 transition-colors tracking-widest">
                        {plat}
                     </button>
                   ))}
                </div>
             </div>
          </div>

          <div className="h-full min-h-[400px] rounded-[48px] overflow-hidden border-8 border-white shadow-2xl relative">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3706.005308410333!2d70.2792087!3d21.7413199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3957f3822b0d7fbd%3A0xbcc8e2cbeab797e6!2sKrishna%20academy%2C%20upleta!5e0!3m2!1sen!2sin!4v1776083155662!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Krishna Academy Upleta Map"
                className="grayscale hover:grayscale-0 transition-all duration-1000"
             ></iframe>
             <div className="absolute top-8 right-8 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
                <Sparkles size={12} className="text-indigo-600" /> Center of Excellence
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
