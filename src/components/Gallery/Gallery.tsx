'use client';

import { useState } from 'react';
import { Maximize2, X, Filter, Sparkles } from 'lucide-react';
import './Gallery.css';

const galleryData = [
  { id: 1, category: 'Academic', src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop', span: 'col-span-1 row-span-1' },
  { id: 2, category: 'Events', src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop', span: 'md:col-span-2 md:row-span-1' },
  { id: 3, category: 'Results Day', src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop', span: 'col-span-1 row-span-2' },
  { id: 4, category: 'Cultural', src: 'https://images.unsplash.com/photo-1517649763962-0c6234278a0b?q=80&w=800&auto=format&fit=crop', span: 'col-span-1 row-span-1' },
  { id: 5, category: 'Academic', src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop', span: 'md:col-span-2 md:row-span-1' },
  { id: 6, category: 'Events', src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop', span: 'col-span-1 row-span-1' },
];

const tabs = ['All', 'Academic', 'Events', 'Results Day', 'Cultural'];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const filteredData = activeTab === 'All' 
    ? galleryData 
    : galleryData.filter(item => item.category === activeTab);

  return (
    <section id="gallery" className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div className="max-w-2xl space-y-4">
             <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-100">
                <Sparkles size={12} fill="currentColor" /> ACADEMY CHRONICLES
             </div>
             <h2 className="text-5xl font-baloo font-bold text-slate-900 tracking-tight leading-tight">
                Life Within <span className="text-indigo-600">Our Walls.</span>
             </h2>
             <p className="text-slate-500 font-medium text-lg leading-relaxed">
                A glimpse into the daily excellence, cultural vibrant celebrations, and academic milestones at Krishna Academy.
             </p>
          </div>
          
          <div className="flex bg-slate-100 p-1.5 rounded-[24px] border border-slate-200 shadow-inner overflow-x-auto no-scrollbar max-w-full">
            {tabs.map(tab => (
              <button 
                key={tab}
                className={`whitespace-nowrap px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab ? 'bg-white text-indigo-600 shadow-xl' : 'text-slate-400 hover:text-slate-600'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {filteredData.map((item) => (
            <div 
              key={item.id} 
              className={`relative rounded-[40px] overflow-hidden group cursor-pointer border border-slate-100 shadow-sm ${item.span}`}
              onClick={() => setSelectedImg(item.src)}
            >
              <img 
                src={item.src} 
                alt={item.category} 
                loading="lazy" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
                 <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-xl border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <Maximize2 size={24} className="text-white" />
                 </div>
                 <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">{item.category}</p>
                    <p className="font-bold text-sm">Vista Exhibition 2024</p>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Lightbox */}
      {selectedImg && (
        <div className="fixed inset-0 bg-slate-950/95 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <button 
            className="absolute top-10 right-10 p-4 text-white/50 hover:text-white transition-colors"
            onClick={() => setSelectedImg(null)}
          >
            <X size={32} />
          </button>
          <img 
            src={selectedImg} 
            alt="Academy Vista" 
            className="max-h-full max-w-full rounded-[48px] shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300" 
          />
        </div>
      )}
    </section>
  );
}
