
import { useState } from 'react';

interface SolarCrowdinLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

const SolarCrowdinLogo = ({ size = 'md', animated = true, className = '' }: SolarCrowdinLogoProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl'
  };

  const starburstSize = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32'
  };

  return (
    <div 
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Starburst Nebula Background */}
      <div className={`
        relative ${starburstSize[size]} mr-4
        ${animated ? 'transition-all duration-500 ease-out' : ''}
        ${isHovered ? 'transform scale-110 rotate-12' : ''}
      `}>
        {/* Central Starburst */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full animate-pulse opacity-90"></div>
        
        {/* Radiating Rays */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-1 bg-gradient-to-r from-yellow-300 to-transparent
                ${animated ? 'animate-pulse' : ''}
                origin-center
              `}
              style={{
                height: size === 'sm' ? '20px' : size === 'md' ? '30px' : size === 'lg' ? '50px' : '80px',
                transform: `rotate(${i * 45}deg) translateY(-50%)`,
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>

        {/* Inner Glow */}
        <div className="absolute inset-2 bg-gradient-to-r from-white via-yellow-200 to-orange-300 rounded-full blur-sm opacity-70"></div>
      </div>

      {/* Solar Crowdin Text */}
      <div className={`
        ${sizeClasses[size]} font-orbitron font-black
        ${animated ? 'transition-all duration-500 ease-out' : ''}
        ${isHovered ? 'transform scale-105' : ''}
      `}>
        <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
          SOLAR
        </span>
        {' '}
        <span className="bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
          CROWDIN
        </span>
      </div>

      {/* Cosmic Glow Effect */}
      <div className={`
        absolute inset-0 -z-10 rounded-lg blur-xl opacity-30
        bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500
        ${isHovered ? 'opacity-50 scale-110' : ''}
        transition-all duration-500
      `}></div>

      {/* Floating Particles */}
      {animated && (
        <>
          <div className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-400 rounded-full animate-float opacity-80"></div>
          <div className="absolute -top-1 -right-1 w-1 h-1 bg-orange-500 rounded-full animate-float opacity-60" style={{ animationDelay: '0.3s' }}></div>
          <div className="absolute -bottom-1 left-1/4 w-1.5 h-1.5 bg-red-500 rounded-full animate-float opacity-70" style={{ animationDelay: '0.6s' }}></div>
        </>
      )}
    </div>
  );
};

export default SolarCrowdinLogo;
