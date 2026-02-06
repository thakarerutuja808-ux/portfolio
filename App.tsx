import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, 
  Moon, 
  ArrowRight, 
  Instagram, 
  Linkedin, 
  Mail, 
  ArrowUpRight,
  Type, 
  Layers, 
  Box, 
  Code, 
  Figma, 
  PenTool, 
  Monitor, 
  Smartphone, 
  Cpu,
  Menu,
  X,
  Send,
  CheckCircle,
  Lightbulb,
  Camera,
  Rss,
  Sparkles,
  Zap,
  Smile,
  Star,
  Wind,
  Heart,
  Ghost,
  Palette
} from 'lucide-react';
import { PROJECTS, SKILLS, TOOLS, HOBBIES } from './constants';
import { Project, Hobby } from './types';
import { CollageText, SectionHeading } from './components/CollageText';
import { StarDoodle, SparkleDoodle, LineDoodle } from './components/Doodles';
import { ProjectModal } from './components/ProjectModal';
import { HobbyModal } from './components/HobbyModal';

const IconMap: Record<string, React.FC<any>> = {
  Type, Layers, Box, Code, Figma, PenTool, Monitor, Smartphone, Cpu, Lightbulb, Camera, Rss
};

const AlphabetIcon: React.FC<{ char: string; color: string; className?: string }> = ({ char, color, className }) => (
  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center font-black text-2xl md:text-3xl collage-shadow border-2 border-black dark:border-white animate-float-slow ${color} ${className}`}>
    {char}
  </div>
);

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out"
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -12,
        top: -12
      }}
    >
      <div className="scale-100">
        <svg 
          viewBox="0 0 100 100" 
          className="w-6 h-6 fill-pink-500 stroke-white dark:stroke-black stroke-[4px] drop-shadow-[0_0_8px_rgba(236,72,153,0.5)] animate-spin-slow"
        >
          <path d="M50 0L60 35H100L70 55L80 95L50 70L20 95L30 55L0 35H40L50 0Z" />
        </svg>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedHobby, setSelectedHobby] = useState<Hobby | null>(null);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, { threshold: 0.1 });

    revealRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isLoading]);

  const addToReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'WORKS', href: '#projects' },
    { name: 'PLAY', href: '#hobbies' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-colors duration-500 overflow-hidden ${isDark ? 'bg-zinc-950' : 'bg-stone-50'}`}>
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
           {[...Array(25)].map((_, i) => (
             <div 
               key={i} 
               className="absolute animate-glitter" 
               style={{
                 left: `${Math.random() * 100}%`,
                 top: `${Math.random() * 100}%`,
                 animationDelay: `${Math.random() * 2}s`
               }}
             >
               <Sparkles className="text-pink-400/40" size={12 + Math.random() * 32} />
             </div>
           ))}
        </div>
        <div className="relative z-10 flex gap-4 mb-8">
          <AlphabetIcon char="R" color="bg-pink-300" className="animate-bounce" />
          <AlphabetIcon char="T" color="bg-blue-300" className="animate-bounce delay-100" />
        </div>
        <div className="relative z-10 font-mono text-xs uppercase tracking-[0.4em] animate-pulse text-zinc-500 font-bold">Initializing Magic Interface</div>
        <div className="relative z-10 mt-8 w-64 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden shadow-[0_0_20px_rgba(236,72,153,0.4)]">
          <div className="h-full bg-pink-500 animate-loading-bar"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-stone-50 text-zinc-900'}`}>
      
      <CustomCursor />

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      <HobbyModal 
        hobby={selectedHobby}
        onClose={() => setSelectedHobby(null)}
      />

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-20 dark:opacity-30">
        <StarDoodle className="absolute top-20 left-[10%] w-24 text-pink-400" />
        <SparkleDoodle className="absolute bottom-40 right-[15%] w-16 text-blue-400" />
        <LineDoodle className="absolute top-[40%] right-[-5%] w-64 text-yellow-400 rotate-12" />
        
        {/* Decorative Bits */}
        <AlphabetIcon char="A" color="bg-green-200" className="absolute top-[15%] right-[20%] scale-75 opacity-40 rotate-12" />
        <AlphabetIcon char="D" color="bg-purple-200" className="absolute bottom-[20%] left-[5%] scale-90 opacity-40 -rotate-12" />
        <Zap className="absolute top-[60%] left-[25%] text-yellow-500 w-12 h-12 animate-pulse opacity-40" />
        <Smile className="absolute top-[10%] left-[40%] text-pink-400 w-10 h-10 animate-float-slow opacity-40" />
        <Wind className="absolute top-[80%] right-[10%] text-blue-400 w-20 h-20 opacity-20 animate-float" />
        <Star className="absolute top-[35%] left-[60%] text-yellow-300 w-6 h-6 animate-spin-slow opacity-30" />
        
        <div className="absolute top-1/2 left-[-10%] text-[20rem] font-black opacity-5 -rotate-90 select-none">
          DESIGN
        </div>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center backdrop-blur-md border-b border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-all duration-300 animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="flex items-center gap-8 lg:gap-12">
          <a 
            href="#hero" 
            onClick={scrollToTop} 
            className="font-mono text-xl font-bold border-2 border-black dark:border-white px-2 py-1 rotate-[-2deg] collage-shadow bg-white text-black transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            RT.
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleScroll(e, link.href)}
                className="font-mono text-sm font-bold tracking-widest hover:text-pink-500 transition-colors relative group cursor-pointer"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all cursor-pointer hover:rotate-12"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <a 
            href="#contact" 
            onClick={(e) => handleScroll(e, '#contact')}
            className="hidden md:block font-mono font-bold text-sm bg-black dark:bg-white text-white dark:text-black px-4 py-2 collage-shadow-sm hover:-translate-y-1 transition-transform cursor-pointer"
          >
            LET'S TALK
          </a>

          <button 
            className="md:hidden p-2 relative z-50 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 bg-zinc-950/95 transition-transform duration-500 flex flex-col items-center justify-center gap-8 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            onClick={(e) => handleScroll(e, link.href)}
            className="text-4xl font-black text-white hover:text-pink-500 transition-colors cursor-pointer"
          >
            {link.name}
          </a>
        ))}
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 overflow-x-hidden">
        
        {/* HERO SECTION */}
        <section id="hero" className="min-h-[90vh] flex flex-col justify-center mb-32 scroll-mt-32">
          <div className="mb-6 flex items-center gap-3 animate-in slide-in-from-left duration-1000 delay-200">
            <span className="h-[2px] w-12 bg-pink-500 shadow-[0_0_12px_rgba(236,72,153,1)]"></span>
            <span className="font-mono text-sm tracking-tighter uppercase text-zinc-800 dark:text-zinc-400 font-black">Communication Design Alchemist</span>
          </div>
          
          <div className="relative mb-8">
            <CollageText text="RUTUJA" className="mb-4 animate-in fade-in slide-in-from-bottom-12 duration-1200 delay-300" />
            
            <div className="absolute -top-16 -right-16 md:right-[15%] animate-bounce delay-1000 hidden md:block">
              <div className="relative">
                <AlphabetIcon char="★" color="bg-yellow-300" className="rotate-12" />
                <Sparkles className="absolute -top-4 -right-4 text-pink-500 animate-pulse" size={24} />
              </div>
            </div>
            
            <div className="absolute -bottom-10 right-0 animate-float delay-700 hidden lg:block">
               <div className="flex gap-2">
                  <AlphabetIcon char="!" color="bg-blue-300" className="-rotate-12 scale-75" />
                  <AlphabetIcon char="?" color="bg-pink-300" className="rotate-12 scale-75" />
               </div>
            </div>

            <div className="absolute top-1/2 -left-24 animate-float delay-500 hidden xl:block opacity-60">
              <SparkleDoodle className="w-16 text-blue-400" />
            </div>
            
            <div className="absolute -top-10 left-1/4 animate-pulse opacity-40">
               <Ghost className="text-purple-400" size={40} />
            </div>
          </div>
          
          <CollageText text="THAKARE" className="mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1200 delay-500" />
          
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-12 duration-1200 delay-700 relative">
            <div className="absolute -left-16 top-0 text-blue-500 animate-sparkle-burst hidden lg:block">
              <Sparkles size={32} />
            </div>
            <p className="text-2xl md:text-3xl font-light leading-relaxed mb-8 relative z-10">
              Visualizing the <span className="font-serif italic text-pink-500 font-bold decoration-wavy underline underline-offset-4">unseen</span>. Crafting futuristic narratives through <span className="font-mono font-bold text-zinc-950 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded shadow-sm">Typography</span>, <span className="underline decoration-blue-500 underline-offset-8 decoration-4">UI/UX</span>, and playful motion.
            </p>
            <div className="flex flex-wrap gap-4">
              {['Branding', 'Motion', 'Interface', 'Strategy', 'Gen-AI'].map((s, i) => (
                <div key={s} className="relative group/tag">
                   <span className={`inline-block px-5 py-2 border-2 border-zinc-900 dark:border-zinc-100 rounded-full text-xs font-mono text-zinc-800 dark:text-zinc-400 animate-in fade-in zoom-in duration-1000 font-black uppercase tracking-widest collage-shadow-sm hover:bg-pink-100 dark:hover:bg-zinc-800 transition-colors`} style={{ transitionDelay: `${1200 + (i * 150)}ms` }}>
                    {s}
                  </span>
                  <Sparkles className="absolute -top-2 -right-2 text-yellow-400 opacity-0 group-hover/tag:opacity-100 transition-opacity scale-50 group-hover/tag:scale-100 duration-300" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-20 flex flex-col items-center gap-4 animate-in fade-in duration-1000 delay-[2000ms]">
            <div className="flex gap-1">
              <Sparkles className="text-pink-500 w-4 h-4 animate-pulse" />
              <div className="w-[1px] h-16 bg-gradient-to-b from-pink-500 to-transparent"></div>
              <Sparkles className="text-blue-500 w-4 h-4 animate-pulse delay-700" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-500 font-black">Scroll to Explore</span>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section ref={addToReveal} className="reveal mb-40 grid md:grid-cols-2 gap-16 items-center scroll-mt-32" id="about">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-pink-500 to-blue-500 opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"></div>
            <div className="relative">
              <img 
                src="https://i.ibb.co/67HvRmfq/Whats-App-Image-2026-02-06-at-1-32-02-PM.jpg" 
                alt="About Rutuja" 
                className="relative rounded-[2.5rem] w-full object-cover aspect-[4/5] grayscale hover:grayscale-0 transition-all duration-700 collage-shadow border-4 border-zinc-900 dark:border-zinc-100 hover:scale-[1.02]"
              />
              <Sparkles className="absolute top-4 right-4 text-white drop-shadow-lg animate-pulse" size={32} />
            </div>
            {/* Question mark changed to Star (★) */}
            <AlphabetIcon char="★" color="bg-pink-300" className="absolute -bottom-8 -left-8 rotate-[-15deg] hidden md:flex shadow-2xl" />
          </div>
          <div className="relative">
            <Sparkles className="absolute -top-10 -right-4 text-pink-400 opacity-40" />
            <SectionHeading text="ABOUT" />
            <p className="text-xl leading-relaxed text-zinc-800 dark:text-zinc-400 mb-6 font-medium">
              I’m a communication design student who enjoys turning ideas into clear, thoughtful visuals. 
            </p>
            <p className="text-xl leading-relaxed text-zinc-800 dark:text-zinc-400 mb-8 font-medium">
              I’m interested in UI/UX, <span className="font-serif italic text-blue-500 font-black border-b-2 border-blue-500/30">typography</span>, and <span className="text-zinc-950 dark:text-white font-black italic bg-pink-100 dark:bg-pink-900/40 px-2 py-0.5 rounded-md shadow-md border-2 border-pink-200 dark:border-pink-800 relative inline-block">
                digital storytelling
                <Sparkles className="absolute -top-3 -right-3 text-yellow-400 scale-75 animate-bounce" />
              </span>, and I enjoy photography and scrapbook journaling as ways to explore visual narratives beyond the screen.
            </p>
            <div className="flex gap-6">
              {[
                { icon: StarDoodle, color: 'bg-yellow-200', anim: 'animate-float-slow' },
                { icon: SparkleDoodle, color: 'bg-blue-200', anim: 'animate-float' },
                { icon: Smile, color: 'bg-green-200', anim: 'animate-spin-slow' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-center p-5 border-2 border-zinc-300 dark:border-zinc-800 rounded-3xl hover:border-pink-500 transition-colors w-fit bg-white dark:bg-zinc-900 shadow-xl collage-shadow-sm">
                  <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center text-black flex-shrink-0 ${item.anim}`}>
                    <item.icon className="w-8" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section ref={addToReveal} className="reveal mb-40 scroll-mt-32" id="skills">
          <SectionHeading text="SKILLS" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SKILLS.map((skill, idx) => {
              const Icon = IconMap[skill.icon];
              return (
                <div key={skill.name} className="group p-10 border-4 border-zinc-300 dark:border-zinc-800 rounded-[2.5rem] hover:border-pink-500 dark:hover:border-pink-500 transition-all duration-500 relative overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl hover:-translate-y-3 collage-shadow">
                  <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-10 transition-all rotate-12 group-hover:rotate-0">
                    {Icon && <Icon size={140} />}
                  </div>
                  <div className="mb-8 p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 inline-block group-hover:rotate-12 transition-transform shadow-inner">
                    {Icon && <Icon size={36} className="text-pink-600" />}
                  </div>
                  <h3 className="text-2xl font-black mb-2 text-zinc-950 dark:text-white uppercase tracking-tighter">{skill.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-zinc-600 dark:text-zinc-400 text-sm uppercase font-black">{skill.level}</p>
                    <Sparkles className="text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" size={14} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section ref={addToReveal} className="reveal mb-40 scroll-mt-32" id="projects">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <SectionHeading text="WORKS" />
            <div className="flex items-center gap-3 font-mono text-xs max-w-xs mb-12 md:mb-0 text-zinc-800 dark:text-zinc-400 font-black uppercase tracking-widest bg-zinc-100 dark:bg-zinc-900 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800">
              <Sparkles size={14} className="text-pink-500" />
              <span>Selected Digital Alchemy</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-16">
            {PROJECTS.map((project) => (
              <div 
                key={project.id} 
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="overflow-hidden rounded-[2.5rem] collage-shadow border-4 border-black dark:border-white mb-8 aspect-video relative shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-none">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-2 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-6 backdrop-blur-sm">
                    <div className="bg-white/20 backdrop-blur-xl px-8 py-4 rounded-full border border-white/40 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-2xl flex items-center gap-3">
                      <span className="font-mono text-white text-sm font-black tracking-widest">
                        PEEK INSIDE
                      </span>
                      <Sparkles className="text-yellow-400 animate-pulse" size={18} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-start px-4">
                  <div>
                    <p className="font-mono text-xs text-pink-600 mb-2 uppercase tracking-[0.3em] font-black">{project.category}</p>
                    <h3 className="text-4xl font-black group-hover:text-pink-600 transition-colors text-zinc-950 dark:text-white uppercase tracking-tighter">{project.title}</h3>
                  </div>
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl border-4 border-zinc-900 dark:border-white group-hover:bg-pink-500 group-hover:border-pink-500 group-hover:text-white transition-all duration-500 group-hover:rotate-[360deg] bg-white dark:bg-zinc-800 shadow-xl">
                    <ArrowRight className="-rotate-45" size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HOBBIES SECTION */}
        <section ref={addToReveal} className="reveal mb-40 scroll-mt-32" id="hobbies">
          <SectionHeading text="PLAY" />
          <div className="flex justify-center relative">
            <div className="absolute -top-10 -left-10 animate-spin-slow opacity-20">
               <Sparkles size={100} className="text-purple-400" />
            </div>
            {HOBBIES.map((hobby) => {
              const Icon = IconMap[hobby.icon];
              return (
                <div 
                  key={hobby.id} 
                  onClick={() => setSelectedHobby(hobby)}
                  className="max-w-xl w-full p-16 border-8 border-zinc-900 dark:border-zinc-100 rounded-[4rem] flex flex-col items-center text-center hover:bg-yellow-50 dark:hover:bg-zinc-800/50 transition-all duration-700 cursor-pointer group collage-shadow bg-white dark:bg-zinc-900 shadow-[0_50px_100px_rgba(0,0,0,0.1)]"
                >
                  <div className="mb-8 p-8 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-[2.5rem] group-hover:rotate-[25deg] transition-all duration-500 shadow-2xl relative">
                    {Icon && <Icon size={56} />}
                    <Sparkles className="absolute -top-4 -right-4 text-yellow-400 animate-sparkle-burst" />
                  </div>
                  <h4 className="text-4xl font-black mb-6 uppercase tracking-tighter text-zinc-950 dark:text-white">The Play Lab</h4>
                  <p className="text-xl text-zinc-800 dark:text-zinc-400 leading-relaxed font-bold mb-10">{hobby.desc}</p>
                  <div className="bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-900 px-10 py-4 rounded-full font-mono text-xs font-black tracking-[0.2em] collage-shadow-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-2xl flex items-center gap-2">
                    <Sparkles size={14} />
                    OPEN THE LAB
                  </div>
                  <div className="mt-12 flex gap-6">
                      <StarDoodle className="w-10 text-pink-500 animate-spin-slow" />
                      <SparkleDoodle className="w-10 text-blue-500" />
                      <StarDoodle className="w-10 text-yellow-500 animate-spin-slow" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section ref={addToReveal} className="reveal mb-20 py-24 bg-pink-500 text-white rounded-[5rem] text-center px-6 relative overflow-hidden scroll-mt-32 shadow-[0_30px_100px_rgba(236,72,153,0.4)]" id="contact">
          <div className="absolute top-[-10%] left-[-10%] opacity-[0.07] rotate-[-15deg] scale-150">
            <SectionHeading text="HELLO" />
          </div>
          <div className="absolute top-10 right-10 animate-glitter pointer-events-none">
            <Sparkles size={60} className="text-white opacity-20" />
          </div>
          <h2 className="text-6xl md:text-9xl font-black mb-10 relative z-10 leading-[0.9] uppercase tracking-tighter italic">LET'S <br/><span className="text-yellow-300">SPARK</span> SOMETHING</h2>
          <p className="text-xl md:text-2xl mb-16 max-w-2xl mx-auto opacity-95 font-black uppercase tracking-widest">
            Ready to mix some design potions? Drop a message in the cauldron below.
          </p>
          <div className="max-w-2xl mx-auto bg-white/20 backdrop-blur-2xl p-10 md:p-14 rounded-[3.5rem] border-2 border-white/40 relative z-10 overflow-hidden hover:scale-[1.01] transition-all duration-500 shadow-2xl">
            {formStatus === 'success' ? (
              <div className="py-20 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700">
                <div className="relative mb-10">
                   <CheckCircle size={100} className="text-white animate-bounce" />
                   <Sparkles className="absolute -top-4 -right-4 text-yellow-300 animate-sparkle-burst" />
                </div>
                <h3 className="text-4xl font-black mb-3 uppercase tracking-tighter">MAGIC SENT!</h3>
                <p className="text-xl font-bold opacity-80 uppercase tracking-widest">I'll catch your vibe and reply soon.</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-left">
                    <label htmlFor="name" className="block text-[10px] font-mono uppercase mb-3 font-black tracking-[0.4em] opacity-80 ml-2">Your Name</label>
                    <input 
                      id="name"
                      name="name"
                      type="text" 
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="THE ARCHITECT" 
                      className="w-full bg-white/10 border-4 border-white/20 rounded-2xl p-5 focus:border-yellow-300 focus:bg-white/30 outline-none transition-all placeholder:text-white/40 text-white font-black uppercase tracking-widest"
                    />
                  </div>
                  <div className="text-left">
                    <label htmlFor="email" className="block text-[10px] font-mono uppercase mb-3 font-black tracking-[0.4em] opacity-80 ml-2">Digital Address</label>
                    <input 
                      id="email"
                      name="email"
                      type="email" 
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="COSMOS@VOYAGE.NET" 
                      className="w-full bg-white/10 border-4 border-white/20 rounded-2xl p-5 focus:border-yellow-300 focus:bg-white/30 outline-none transition-all placeholder:text-white/40 text-white font-black uppercase tracking-widest"
                    />
                  </div>
                </div>
                <div className="text-left">
                  <label htmlFor="message" className="block text-[10px] font-mono uppercase mb-3 font-black tracking-[0.4em] opacity-80 ml-2">Your Transmission</label>
                  <textarea 
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="DESCRIBE THE VISION..." 
                    className="w-full bg-white/10 border-4 border-white/20 rounded-2xl p-5 focus:border-yellow-300 focus:bg-white/30 outline-none transition-all placeholder:text-white/40 text-white resize-none font-black uppercase tracking-widest"
                  ></textarea>
                </div>
                <button 
                  disabled={formStatus === 'sending'}
                  className="w-full py-6 mt-6 bg-yellow-300 text-pink-600 rounded-3xl font-black text-2xl hover:bg-white hover:scale-[1.02] transition-all collage-shadow flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer uppercase tracking-tighter shadow-2xl"
                >
                  {formStatus === 'sending' ? (
                    <span className="flex items-center gap-4">
                      <div className="w-8 h-8 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
                      CASTING SPELL...
                    </span>
                  ) : (
                    <>
                      TRANSMIT VISION
                      <Send size={24} className="group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-24 border-t-4 border-zinc-300 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-12 pb-10">
          <div 
            className="font-mono font-black text-5xl cursor-pointer hover:text-pink-600 transition-all hover:scale-125 hover:rotate-6 text-zinc-950 dark:text-white relative group" 
            onClick={scrollToTop}
          >
            RT.
            <Sparkles className="absolute -top-4 -right-4 text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex gap-12">
            {[
              { icon: Instagram, label: 'Instagram', color: 'hover:text-pink-600', href: 'https://www.instagram.com/' },
              { icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-600', href: 'https://www.linkedin.com/login' },
              { icon: Mail, label: 'Email', color: 'hover:text-yellow-600', href: 'mailto:rutujathakare.design@gmail.com' }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.href} 
                target={social.href.startsWith('mailto') ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={`text-zinc-900 dark:text-white ${social.color} transition-all hover:-translate-y-3 hover:scale-125 cursor-pointer`} 
                aria-label={social.label}
              >
                <social.icon size={32}/>
              </a>
            ))}
          </div>
          <div className="text-zinc-800 dark:text-zinc-400 text-xs font-mono font-black uppercase tracking-[0.5em] bg-zinc-100 dark:bg-zinc-900 px-6 py-2 rounded-full border border-zinc-200 dark:border-zinc-800">
            {} RUTUJA THAKARE
          </div>
        </footer>

      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-12 right-12 z-50">
        <a 
          href="#contact" 
          onClick={(e) => handleScroll(e, '#contact')}
          className="w-20 h-20 bg-zinc-950 dark:bg-white text-white dark:text-zinc-900 rounded-[2rem] flex items-center justify-center collage-shadow hover:scale-110 transition-all duration-500 shadow-2xl cursor-pointer group border-4 border-black dark:border-zinc-200 hover:rotate-12"
          aria-label="Scroll to contact"
        >
          <div className="relative">
            <ArrowRight className="-rotate-45 group-hover:rotate-0 transition-all duration-500" size={28} />
            <Sparkles className="absolute -top-6 -right-6 text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default App;