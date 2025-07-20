import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20'
  };

  const textSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex items-center space-x-2 ${className}`}
    >
      <motion.div
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className={`
          ${sizeClasses[size]} 
          bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 
          rounded-2xl flex items-center justify-center shadow-lg
          relative overflow-hidden border-4 border-white/50
        `}
      >
        {/* Subtle sparkle effect */}
        <motion.div
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"
        />
        
        {/* Main logo letter - large and clear */}
        <span className="text-white font-bold text-2xl relative z-10">A</span>
        
        {/* Small decorative elements - subtle movement */}
        <motion.div
          animate={{ 
            rotate: [0, 180],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-2 right-2 w-2 h-2 bg-yellow-300 rounded-full opacity-80"
        />
      </motion.div>
      
      {showText && (
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`${textSizeClasses[size]} font-bold text-gray-800 dark:text-white tracking-wide`}
        >
          AutiPlay
        </motion.span>
      )}
    </motion.div>
  );
};

export default Logo;