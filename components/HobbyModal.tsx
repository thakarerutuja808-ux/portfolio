
import React, { useEffect, useState } from 'react';
import { X, Lightbulb, ZoomIn, Sparkles } from 'lucide-react';
import { Hobby } from '../types';

interface HobbyModalProps {
  hobby: Hobby | null;
  onClose: () => void;
}

export const HobbyModal: React.FC<HobbyModalProps> = ({ hobby, onClose }) => {
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    if (hobby) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [hobby]);

  if (!hobby) return null;

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
            alt="Enlarged hobby detail" 
            className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal Content */}
        <div className="relative w-full max-w-4xl bg-stone-50 dark:bg-zinc-900 rounded-[3rem] shadow-2xl overflow-hidden collage-shadow border-4 border-black dark:border-white animate-in zoom-in slide-in-from-bottom-8 duration-500 max-h-[85vh] flex flex-col">
          
          {/* Header */}
          <div className="p-6 md:p-8 border-b-4 border-black dark:border-white flex justify-between items-center bg-purple-300 dark:bg-purple-900">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-black text-white rounded-2xl rotate-3">
                <Lightbulb size={24} />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-black/60 dark:text-white/60 mb-1 block">
                  Creative Play
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-black dark:text-white font-serif italic">
                  {hobby.name}
                </h2>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-3 bg-black text-white dark:bg-white dark:text-black rounded-full hover:rotate-90 transition-transform duration-300 collage-shadow-sm"
            >
              <X size={24} />
            </button>
          </div>

          {/* Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10">
            
            {/* Description Bubble */}
            <div className="relative">
              <div className="bg-white dark:bg-zinc-800 p-8 rounded-[2.5rem] border-2 border-black dark:border-white collage-shadow-sm relative z-10">
                 <p className="text-lg md:text-xl leading-relaxed text-zinc-900 dark:text-zinc-100">
                   {hobby.longDescription}
                 </p>
              </div>
              <div className="absolute -top-4 -right-4 text-purple-500 animate-float opacity-50">
                <Sparkles size={48} />
              </div>
            </div>

            {/* Gallery Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ZoomIn className="text-purple-500" size={18} />
                  <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">Visual Snapshots</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hobby.gallery.map((img, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setActiveLightboxImage(img)}
                    className={`group cursor-zoom-in rounded-[2rem] overflow-hidden border-2 border-black dark:border-white collage-shadow-sm aspect-square relative transition-all hover:scale-[1.02] ${idx === 0 ? 'md:col-span-2 md:aspect-video' : ''}`}
                  >
                    <img 
                      src={img} 
                      alt={`${hobby.name} play detail ${idx}`} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center pb-8">
              <p className="font-mono text-sm text-zinc-400">Keep exploring, keep playing.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
