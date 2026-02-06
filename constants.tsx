
import React from 'react';
import { 
  Type, 
  Layers, 
  Box, 
  Code, 
  Camera, 
  Rss, 
  Lightbulb, 
  Figma, 
  PenTool, 
  Monitor, 
  Smartphone, 
  Cpu 
} from 'lucide-react';
import { Project, Skill, Tool, Hobby } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Typography',
    category: 'Typography',
    image: 'https://i.ibb.co/359cMsX9/Screenshot-2026-02-06-222015.png',
    gallery: [
      'https://i.ibb.co/XZ1njN1w/Whats-App-Image-2026-02-06-at-10-33-15-PM.jpg',
      'https://i.ibb.co/359cMsX9/Screenshot-2026-02-06-222015.png',
      'https://i.ibb.co/nN1tmQGL/Screenshot-2026-02-06-221955.png'
    ],
    description: 'An experimental branding project focusing on brutalist typography.',
    longDescription: 'These assignments explore type as both form and function. The focus is on hierarchy, readability, and expression experimenting with layout, scale, and letterforms to communicate ideas clearly and visually.'
  },
  {
    id: '2',
    title: 'Branding',
    category: 'Branding',
    image: 'https://i.ibb.co/W4qg1k4y/primer.jpg',
    gallery: [
      'https://i.ibb.co/PZZzB0H3/INSTA.png',
      'https://i.ibb.co/W4qg1k4y/primer.jpg',
      'https://i.ibb.co/xtwHqYwS/Screenshot-2026-02-06-225330.png'
    ],
    description: 'Immersive experience design for historical art galleries.',
    longDescription: 'This section features branding assignments that explore identity systems and visual consistency. The work focuses on logo design, color, typography, and creating cohesive brand narratives across applications.'
  },
  {
    id: '3',
    title: 'Print Design',
    category: 'Booklet',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'A sustainable print publication exploring climate change data.',
    longDescription: 'This section includes print-based assignments such as posters, layouts, and editorial pieces. The work focuses on composition, grid systems, color, and translating concepts into tangible visual outcomes.'
  },
  {
    id: '4',
    title: 'Photography',
    category: 'Photography',
    image: 'https://i.ibb.co/wZZJj3RS/Whats-App-Image-2026-02-06-at-10-33-16-PM-1.jpg',
    gallery: [
      'https://i.ibb.co/wZZJj3RS/Whats-App-Image-2026-02-06-at-10-33-16-PM-1.jpg',
      'https://i.ibb.co/TM2cwLTT/Whats-App-Image-2026-02-06-at-10-33-17-PM.jpg',
      'https://i.ibb.co/spDfVNXk/Whats-App-Image-2026-02-06-at-10-33-16-PM.jpg'
    ],
    description: 'Study of fluid motion and abstract textures in 3D space.',
    longDescription: 'These assignments explore photography as a storytelling and observational tool. The focus is on composition, light, mood, and capturing details that communicate emotion and narrative'
  }
];

export const SKILLS: Skill[] = [
  { name: 'Typography', level: 'Expert', icon: 'Type' },
  { name: 'UX/UI Design', level: 'Advanced', icon: 'Layers' },
  { name: 'Branding', level: 'Advanced', icon: 'Box' },
  { name: 'Photography', level: 'Intermediate', icon: 'Code' }
];

export const TOOLS: Tool[] = [
  { name: 'Figma', icon: 'Figma' },
  { name: 'Adobe Suite', icon: 'PenTool' },
  { name: 'Web Design', icon: 'Monitor' },
  { name: 'Mobile Design', icon: 'Smartphone' },
  { name: 'Gen AI', icon: 'Cpu' }
];

export const HOBBIES: Hobby[] = [
  { 
    id: 'hobby-exploration',
    name: 'Exploration', 
    icon: 'Lightbulb', 
    desc: 'Experimenting with creative coding, generative systems, and the future of visual play.',
    longDescription: 'My "Play" time is dedicated to breaking rules. I explore creative coding using P5.js, experiment with Midjourney for conceptual brainstorming, and build tiny interactive digital toys that serve no purpose other than bringing a smile.',
    gallery: [
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800'
    ]
  }
];
