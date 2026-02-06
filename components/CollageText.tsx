
import React, { useState, useEffect } from 'react';

const styles = [
  'font-serif italic',
  'font-mono font-bold uppercase',
  'font-sans tracking-widest',
  'font-serif font-black',
  'font-mono line-through underline',
];

const colors = [
  'bg-pink-300 text-black',
  'bg-blue-300 text-black',
  'bg-yellow-300 text-black',
  'bg-purple-300 text-black',
  'bg-green-300 text-black',
  'bg-white text-black',
  'bg-black text-white',
];

interface LetterProps {
  char: string;
}

const Letter: React.FC<LetterProps> = ({ char }) => {
  const [currentStyle, setCurrentStyle] = useState(0);
  const [currentColor, setCurrentColor] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [animationDelay] = useState(Math.random() * -5); // Start at random point in cycle

  useEffect(() => {
    setRotate(Math.random() * 10 - 5);
  }, []);

  const randomize = () => {
    setCurrentStyle(Math.floor(Math.random() * styles.length));
    setCurrentColor(Math.floor(Math.random() * colors.length));
    setRotate(Math.random() * 20 - 10);
  };

  if (char === ' ') return <span className="w-4 md:w-8"></span>;

  return (
    <span
      onMouseEnter={randomize}
      className={`
        inline-flex items-center justify-center
        w-12 h-12 md:w-20 md:h-20
        text-2xl md:text-5xl
        transition-all duration-300 cursor-pointer
        collage-shadow border-2 border-black dark:border-white/20
        animate-float-slow
        ${styles[currentStyle]}
        ${colors[currentColor]}
      `}
      style={{ 
        transform: `rotate(${rotate}deg)`,
        animationDelay: `${animationDelay}s`
      }}
    >
      {char}
    </span>
  );
};

export const CollageText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  return (
    <div className={`flex flex-wrap gap-2 md:gap-4 ${className}`}>
      {text.split('').map((char, idx) => (
        <Letter key={idx} char={char} />
      ))}
    </div>
  );
};

export const SectionHeading: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="mb-12">
      <CollageText text={text} className="justify-center md:justify-start" />
    </div>
  );
};
