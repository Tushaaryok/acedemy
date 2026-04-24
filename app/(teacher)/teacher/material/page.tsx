'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  FilePlus, 
  Search, 
  Folder, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  MoreVertical, 
  Eye, 
  Download,
  Trash2,
  Lock,
  BookOpen,
  X,
  Loader2,
  Plus
} from 'lucide-react';

export default function FacultyMaterial() {
  const [batches, setBatches] = useState<any[]>([]);
  const [activeBatch, setActiveBatch] = useState<string | null>(null);
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({ title: '', material_type: 'pdf', batch_id: '', url: '' });
  const [isUploading, setIsUploading] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const [batchesRes, materialsRes] = await Promise.all([
        supabase.from('batches').select('*').order('name'),
        supabase.from('materials').select('*').eq('teacher_id', session.public_users.id).order('created_at', { ascending: false })
      ]);

      if (batchesRes.data) {
        setBatches(batchesRes.data);
        if (batchesRes.data.length > 0) setActiveBatch(batchesRes.data[0].id);
      }
      if (materialsRes.data) setMaterials(materialsRes.data);
      setLoading(false);
    }
    fetchData();
  }, [supabase]);

  const handleUpload = async () => {
    if (!uploadData.title || !uploadData.batch_id || !uploadData.url) {
      alert('Missing essential resource metadata.');
      return;
    }

    setIsUploading(true);
    const { data: { session } } = await supabase.auth.getSession();

    const { error } = await supabase.from('materials').insert([{
      ...uploadData,
      teacher_id: session?.public_users?.id,
      file_size: Math.floor(Math.random() * 5000) + ' KB' // Simulating size calculation
    }]);

    if (!error) {
       alert('Institutional Resource Successfully Registered.');
       setShowUploadModal(false);
       window.location.reload();
    } else {
       alert('Registration Failure: ' + error.message);
    }
    setIsUploading(false);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-12 min-h-screen bg-slate-50/20">
      
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
           <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-indigo-50 w-fit px-3 py-1 rounded-full border border-indigo-100 mb-2">
              <Folder size={12} /> Asset Repository
           </div>
           <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Resource Vault</h1>
           <p className="text-slate-500 font-medium text-lg mt-2">Upload and manage academic materials for your batches.</p>
        </div>
        
        <button 
          onClick={() => setShowUploadModal(true)}
          className="bg-slate-900 text-white px-8 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-slate-900/40 hover:bg-indigo-600 transition-all flex items-center gap-3 active:scale-95 group"
        >
          <FilePlus size={20} className="group-hover:translate-x-1" /> UPLOAD NEW RESOURCE
        </button>
      </header>

      {/* Resource Controls */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
         <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              placeholder="Search resource files..." 
              className="w-full bg-white border border-slate-100 rounded-[28px] pl-16 pr-6 py-5 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all shadow-sm"
            />
         </div>
         <div className="flex bg-white p-2 rounded-[32px] border border-slate-100 shadow-sm overflow-x-auto no-scrollbar max-w-full">
            {batches.map(b => (
              <button 
                key={b.id}
                onClick={() => setActiveBatch(b.id)}
                className={`px-8 py-3 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeBatch === b.id ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {b.name}
              </button>
            ))}
         </div>
      </div>

      {/* Grid of Materials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {materials.filter(m => m.batch_id === activeBatch).map(doc => (
          <div key={doc.id} className="bg-white rounded-[48px] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all group relative overflow-hidden">
             <div className="relative z-10 flex flex-col h-full space-y-8">
                <div className="flex justify-between items-start">
                   <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                      {doc.material_type === 'pdf' ? <FileText size={24} /> : doc.material_type === 'image' ? <ImageIcon size={24} /> : <BookOpen size={24} />}
                   </div>
                   <button className="p-2 text-slate-300 hover:text-slate-900 transition-all"><MoreVertical size={20} /></button>
                </div>

                <div className="space-y-2">
                   <h4 className="text-xl font-black text-slate-900 leading-tight tracking-tight group-hover:text-amber-600 transition-colors uppercase italic">{doc.title}</h4>
                   <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>{doc.material_type}</span>
                      <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                      <span>{doc.file_size}</span>
                   </div>
                </div>

                <div className="pt-6 mt-auto border-t border-slate-50 flex items-center justify-between">
                   <p className="text-[10px] font-bold text-slate-400">{new Date(doc.created_at).toLocaleDateString()}</p>
                   <div className="flex gap-2">
                      <a href={doc.url} target="_blank" title="Preview" className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-2xl transition-all">
                         <Eye size={18} />
                      </a>
                      <button title="Permissions" className="p-3 text-slate-400 hover:text-emerald-600 hover:bg-slate-50 rounded-2xl transition-all">
                         <Lock size={18} />
                      </button>
                   </div>
                </div>
             </div>
             <div className="absolute right-0 top-0 h-full w-2 bg-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
        {materials.filter(m => m.batch_id === activeBatch).length === 0 && !loading && (
          <div className="col-span-full py-32 text-center opacity-20">
             <div className="space-y-6">
                <Folder size={64} className="mx-auto" />
                <p className="font-black italic uppercase tracking-widest text-sm">No registered resources for this batch</p>
             </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-6 z-[100] animate-in fade-in duration-300">
           <div className="bg-white rounded-[56px] p-12 max-w-xl w-full space-y-10 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-500">
              <button onClick={() => setShowUploadModal(false)} className="absolute top-10 right-10 p-2 text-slate-300 hover:text-slate-900 transition-colors">
                 <X size={24} />
              </button>

              <header>
                 <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">Register Resource</h2>
                 <p className="text-slate-500 font-medium mt-2">Deploy new academic assets to the batch vault.</p>
              </header>

              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Resource Title</label>
                    <input 
                      placeholder="e.g. Organic Chemistry Mastery Notes"
                      className="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-5 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all"
                      onChange={(e) => setUploadData({...uploadData, title: e.target.value})}
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Asset Category</label>
                       <select 
                         className="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-6 py-5 text-sm font-bold outline-none"
                         onChange={(e) => setUploadData({...uploadData, material_type: e.target.value})}
                       >
                          <option value="pdf">PDF Document</option>
                          <option value="image">Scientific Image</option>
                          <option value="video">Lecture Video</option>
                          <option value="doc">Study Sheet</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Target Batch</label>
                       <select 
                         className="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-6 py-5 text-sm font-bold outline-none"
                         onChange={(e) => setUploadData({...uploadData, batch_id: e.target.value})}
                       >
                          <option value="">Select Batch</option>
                          {batches.map(b => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                          ))}
                       </select>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Direct Resource URL</label>
                    <input 
                      placeholder="https://drive.google.com/..."
                      className="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-5 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all"
                      onChange={(e) => setUploadData({...uploadData, url: e.target.value})}
                    />
                 </div>
              </div>

              <button 
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full bg-slate-900 text-white py-6 rounded-[24px] font-black text-xs uppercase tracking-[3px] shadow-2xl shadow-slate-900/40 hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                 {isUploading ? <Loader2 size={18} className="animate-spin" /> : 'DEPLOY ASSET'} <Plus size={18} />
              </button>
           </div>
        </div>
      )}

      {/* Storage Insights */}
      <div className="bg-indigo-600 rounded-[56px] p-10 text-white shadow-2xl shadow-indigo-600/30 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative group">
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-24 h-24 bg-white/10 rounded-[32px] flex items-center justify-center backdrop-blur-md border border-white/10">
               <Download size={40} className="text-white" />
            </div>
            <div className="text-center md:text-left space-y-2">
               <h3 className="text-2xl font-black tracking-tight leading-none">Premium Storage Active</h3>
               <p className="text-indigo-200 text-sm font-medium opacity-80 uppercase tracking-widest">You have used 4.2 GB of 25 GB Academic Space</p>
            </div>
         </div>
         <button className="relative z-10 bg-white text-indigo-900 px-10 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
            Upgrade Capacity
         </button>
         
         <div className="absolute -left-20 -bottom-20 opacity-10 group-hover:scale-110 transition-transform">
            <Folder size={300} />
         </div>
      </div>
    </div>
  );
}
