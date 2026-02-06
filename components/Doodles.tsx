
import React from 'react';

export const StarDoodle: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`fill-current ${className} animate-float`}
    style={{ animationDelay: `${Math.random() * 2}s` }}
  >
    <path d="M50 0L60 35H100L70 55L80 95L50 70L20 95L30 55L0 35H40L50 0Z" />
  </svg>
);

export const SparkleDoodle: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`fill-current ${className} animate-pulse`}
    style={{ animationDelay: `${Math.random() * 2}s` }}
  >
    <circle cx="50" cy="50" r="10" />
    <path d="M50 0L50 100M0 50L100 50M15 15L85 85M85 15L15 85" stroke="currentColor" strokeWidth="4" />
  </svg>
);

export const LineDoodle: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 200 40" 
    className={`stroke-current fill-none ${className}`}
  >
    <path d="M0 20 Q 25 10, 50 20 T 100 20 T 150 20 T 200 20" strokeWidth="3" />
  </svg>
);
