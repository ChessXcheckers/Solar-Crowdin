
import { useState } from 'react';

interface SolarAILogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

const SolarAILogo = ({ size = 'md', animated = true, className = '' }: SolarAILogoProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl'
  };

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Solar AI Text */}
      <div className={`
        ${sizeClasses[size]} font-orbitron font-black text-3d text-cosmic
        ${animated ? 'transition-all duration-500 ease-out' : ''}
        ${isHovered ? 'transform scale-110 rotate-x-12' : ''}
        transform-3d
      `}>
        <span className="relative">
          Solar
          {/* Glowing particles around "Solar" */}
          <div className="absolute -top-2 -left-2 w-2 h-2 bg-brand-gold-500 rounded-full animate-float opacity-80"></div>
          <div className="absolute -top-1 -right-1 w-1 h-1 bg-brand-blue-500 rounded-full animate-float animation-delay-300 opacity-60"></div>
          <div className="absolute -bottom-1 left-1/4 w-1.5 h-1.5 bg-brand-red-500 rounded-full animate-float animation-delay-600 opacity-70"></div>
        </span>
        {' '}
        <span className="relative text-brand-blue-400">
          AI
          {/* Circuit-like decoration for AI */}
          <div className="absolute top-0 right-0 w-8 h-8 opacity-30">
            <svg viewBox="0 0 32 32" className="w-full h-full text-brand-blue-400">
              <path 
                d="M8 8h16M8 24h16M8 8v16M24 8v16M12 12h8M12 20h8" 
                stroke="currentColor" 
                strokeWidth="1" 
                fill="none"
                className={animated ? 'animate-pulse' : ''}
              />
            </svg>
          </div>
        </span>
      </div>

      {/* Cosmic Glow Effect */}
      <div className={`
        absolute inset-0 -z-10 rounded-lg blur-xl opacity-50
        bg-gradient-cosmic animate-pulse-cosmic
        ${isHovered ? 'opacity-75 scale-150' : ''}
        transition-all duration-500
      `}></div>

      {/* Shimmer Effect Overlay */}
      {animated && (
        <div className="absolute inset-0 shimmer opacity-30 rounded-lg"></div>
      )}
    </div>
  );
};

export default SolarAILogo;
