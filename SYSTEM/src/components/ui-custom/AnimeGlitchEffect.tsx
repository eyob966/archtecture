// src/components/ui-custom/AnimeGlitchEffect.tsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimeGlitchEffectProps {
  isActive: boolean;
  onComplete?: () => void;
  duration?: number;
  className?: string;
  type?: 'success' | 'defeat' | 'level-up';
}

const AnimeGlitchEffect: React.FC<AnimeGlitchEffectProps> = ({
  isActive,
  onComplete,
  duration = 2000,
  className,
  type = 'success'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isActive, duration, onComplete]);
  
  const getColors = () => {
    switch (type) {
      case 'success':
        return { primary: '#39ff14', secondary: '#0051ff' };
      case 'defeat':
        return { primary: '#ff3939', secondary: '#7d00ff' };
      case 'level-up':
        return { primary: '#ffbb00', secondary: '#00fff2' };
      default:
        return { primary: '#39ff14', secondary: '#0051ff' };
    }
  };
  
  const { primary, secondary } = getColors();
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "fixed inset-0 z-50 pointer-events-none",
            className
          )}
        >
          {/* Main glitch overlay */}
          <div className="absolute inset-0 overflow-hidden">
            {/* RGB split layers */}
            <motion.div
              className="absolute inset-0 bg-black opacity-20"
              animate={{
                clipPath: [
                  'inset(0% 0% 0% 0%)',
                  'inset(10% 0% 15% 0%)',
                  'inset(20% 0% 10% 0%)',
                  'inset(5% 0% 25% 0%)',
                  'inset(0% 0% 0% 0%)'
                ]
              }}
              transition={{
                duration: 0.5,
                times: [0, 0.2, 0.4, 0.7, 1],
                repeat: 2
              }}
            />
            
            {/* Red channel */}
            <motion.div
              className="absolute inset-0 mix-blend-screen"
              style={{ backgroundColor: primary, filter: 'hue-rotate(45deg)' }}
              animate={{
                x: [0, -10, 5, -2, 0],
                opacity: [0.5, 0.7, 0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 0.4,
                repeat: 3,
                repeatType: 'mirror'
              }}
            />
            
            {/* Blue channel */}
            <motion.div
              className="absolute inset-0 mix-blend-screen"
              style={{ backgroundColor: secondary, filter: 'hue-rotate(-45deg)' }}
              animate={{
                x: [0, 10, -5, 2, 0],
                opacity: [0.5, 0.7, 0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 0.4,
                repeat: 3,
                repeatType: 'mirror',
                delay: 0.05
              }}
            />
            
            {/* Horizontal scan lines */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.2) 1px, rgba(0,0,0,0.2) 2px)',
              backgroundSize: '100% 2px'
            }} />
            
            {/* Noise texture */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{ 
                backgroundImage: 'url(data:image/png;base64,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)',
                backgroundRepeat: 'repeat'
              }}
              animate={{
                opacity: [0.1, 0.2, 0.1, 0.2, 0.1],
                backgroundPosition: ['0% 0%', '100% 100%', '50% 50%', '0% 100%', '0% 0%']
              }}
              transition={{
                duration: 0.5,
                repeat: 4,
                repeatType: 'mirror'
              }}
            />
          </div>
          
          {/* Glitch text effect (optional) */}
          {type === 'level-up' && (
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5, times: [0, 0.8, 1] }}
            >
              <div className="relative text-5xl font-bold text-white text-center">
                <motion.div 
                  className="absolute inset-0 text-red-500"
                  animate={{ x: [0, -4, 2, -1, 0] }}
                  transition={{ duration: 0.3, repeat: 5, repeatType: 'mirror' }}
                >
                  LEVEL UP!
                </motion.div>
                <motion.div 
                  className="absolute inset-0 text-blue-500"
                  animate={{ x: [0, 4, -2, 1, 0] }}
                  transition={{ duration: 0.3, repeat: 5, repeatType: 'mirror', delay: 0.05 }}
                >
                  LEVEL UP!
                </motion.div>
                <div>LEVEL UP!</div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimeGlitchEffect;