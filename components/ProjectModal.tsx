import React, { useEffect, useState } from 'react';
import { X, ExternalLink, ZoomIn } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  const closeLightbox = () => setActiveLightboxImage(null);

  return (
    <>
      {/* LIGHTBOX OVERLAY */}
      {activeLightboxImage && (
        <div 
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-12 animate-in fade-in zoom-in duration-300 bg-black/95 backdrop-blur-md"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-8 right-8 p-3 bg-white text-black rounded-full hover:rotate-90 transition-transform duration-300 collage-shadow"
            onClick={closeLightbox}
          >
            <X size={24} />
          </button>
          <img 
            src={activeLightboxImage} 
            alt="Enlarged process detail" 
            className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 text-white font-mono text-xs uppercase tracking-widest">
            Click anywhere to exit
          </div>
        </div>
      )}

      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal Content */}
        <div className="relative w-full max-w-5xl bg-stone-50 dark:bg-zinc-900 rounded-[3rem] shadow-2xl overflow-hidden collage-shadow border-4 border-black dark:border-white animate-in zoom-in slide-in-from-bottom-8 duration-500 max-h-[90vh] flex flex-col">
          
          {/* Header */}
          <div className="p-6 md:p-8 border-b-4 border-black dark:border-white flex justify-between items-center bg-yellow-300 dark:bg-zinc-800">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-black/60 dark:text-white/60 mb-1 block">
                {project.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-black dark:text-white font-serif italic">
                {project.title}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-3 bg-black text-white dark:bg-white dark:text-black rounded-full hover:rotate-90 transition-transform duration-300 collage-shadow-sm"
            >
              <X size={24} />
            </button>
          </div>

          {/* Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-12">
            
            {/* Main Info Box */}
            <div className="w-full">
              <div className="bg-blue-200 dark:bg-zinc-800 p-6 md:p-8 rounded-[2rem] border-2 border-black dark:border-white collage-shadow-sm relative overflow-hidden group">
                 <div className="absolute top-2 right-4 opacity-10 group-hover:rotate-12 transition-transform">
                   <ExternalLink size={100} />
                 </div>
                 <p className="text-xl md:text-2xl leading-relaxed text-zinc-900 dark:text-zinc-100 relative z-10">
                   {project.longDescription}
                 </p>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <ZoomIn className="text-pink-500" size={18} />
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">Click any image to inspect details</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                {project.gallery.map((img, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setActiveLightboxImage(img)}
                    className={`group cursor-zoom-in rounded-[2rem] overflow-hidden border-2 border-black dark:border-white collage-shadow-sm aspect-video relative transition-transform hover:-translate-y-1 ${idx === 0 ? 'md:col-span-2' : ''}`}
                  >
                    <img 
                      src={img} 
                      alt={`${project.title} gallery ${idx}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <div className="bg-white/90 text-black px-4 py-2 rounded-full font-mono text-xs font-bold collage-shadow-sm">
                          ZOOM DETAIL
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};