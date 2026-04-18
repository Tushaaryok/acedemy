'use client';
import { useState } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  Lock, 
  SearchIcon,
  Filter,
  Eye,
  Bookmark,
  ChevronRight,
  BookOpen
} from 'lucide-react';

export default function StudentNotes() {
  const [activeTab, setActiveTab] = useState<'all' | 'saved' | 'recent'>('all');

  const NOTES = [
    { id: '1', title: 'Calculus: Derivatives Master Summary', subject: 'Mathematics', teacher: 'Ram Sir', type: 'PDF', isPremium: false },
    { id: '2', title: 'Accounts: Balance Sheet Adjustments', subject: 'Commerce', teacher: 'Ram Sir', type: 'Handwritten Scan', isPremium: true },
    { id: '3', title: 'English Grammar Alpha: All Tenses', subject: 'English', teacher: 'Yashvant Sir', type: 'EPUB', isPremium: false },
    { id: '4', title: 'Physics: Ray Optics Formulas', subject: 'Science', teacher: 'Ram Sir', type: 'PDF', isPremium: true },
    { id: '5', title: 'Social Science: WW1 Complete Notes', subject: 'Board Special', teacher: 'Jayesh Sir', type: 'PDF', isPremium: false },
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Digital Library</h1>
          <p className="text-slate-500 font-medium">Access curated study material and teacher-approved notes.</p>
        </div>
        <div className="relative w-full md:w-80 group">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-900 transition-colors" size={20} />
           <input className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-medium focus:ring-4 focus:ring-blue-900/5 transition-all outline-none" placeholder="Search by topic or subject..." />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar: Categories */}
        <aside className="w-full lg:w-64 space-y-8">
           <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">View Mode</h3>
              <div className="flex flex-col gap-2">
                 {[
                   { id: 'all', name: 'All Resources', count: 42, icon: <BookOpen size={16} /> },
                   { id: 'saved', name: 'Bookmarks', count: 12, icon: <Bookmark size={16} /> },
                   { id: 'recent', name: 'Recently Opened', count: 5, icon: <Eye size={16} /> },
                 ].map(tab => (
                    <button 
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition-all ${
                        activeTab === tab.id ? 'bg-blue-900 text-white shadow-xl shadow-blue-900/10' : 'bg-white text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                       <div className="flex items-center gap-3">
                          {tab.icon} {tab.name}
                       </div>
                       <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-slate-100'}`}>{tab.count}</span>
                    </button>
                 ))}
              </div>
           </div>

           <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-[32px] p-6 text-white shadow-xl shadow-amber-500/20 relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-200 mb-2">Pro Perk</p>
                <h4 className="font-bold mb-4">Unlock Offline Downloads</h4>
                <p className="text-xs text-amber-100 leading-relaxed mb-6">Upgrade to Academy Master Pro to download all notes in premium PDF format.</p>
                <button className="w-full bg-white text-amber-600 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-50 transition-all">Go Premium</button>
              </div>
              <Download size={80} className="absolute -bottom-6 -right-6 text-white/10 group-hover:scale-110 transition-transform" />
           </div>
        </aside>

        {/* Notes Grid */}
        <div className="flex-1 space-y-6">
           <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900">Recommended for You</h2>
              <button className="text-blue-900 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:underline">
                 Filter by Subject <Filter size={14} />
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {NOTES.map(note => (
                 <div key={note.id} className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all group relative overflow-hidden cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                       <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-all shadow-inner">
                          <FileText size={24} />
                       </div>
                       {note.isPremium && (
                         <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                            <Lock size={12} /> Pro
                         </span>
                       )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-900 transition-colors">{note.title}</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">By {note.teacher} • <span className="text-blue-600 underline underline-offset-4">{note.subject}</span></p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                          {note.type} • 2.4 MB
                       </span>
                       <div className="flex gap-2">
                          <button className="p-2 text-slate-300 hover:text-blue-900 transition-all"><Bookmark size={18} /></button>
                          <button className={`p-2 rounded-xl transition-all ${note.isPremium ? 'text-amber-500 bg-amber-50 hover:bg-amber-500 hover:text-white' : 'text-blue-900 bg-blue-50 hover:bg-blue-900 hover:text-white'}`}>
                             {note.isPremium ? <Lock size={18} /> : <Download size={18} />}
                          </button>
                       </div>
                    </div>

                    {/* Interactive hover progress bar */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 </div>
              ))}
           </div>

           {/* More Resources Pagination Mock */}
           <div className="py-10 text-center">
              <button className="bg-white border border-slate-200 px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-900 hover:border-blue-900 transition-all shadow-sm">
                 Load 24 More Documents
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
