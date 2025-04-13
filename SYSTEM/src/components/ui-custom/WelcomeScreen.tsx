
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, AlertCircle, RefreshCcw } from 'lucide-react';
import SignUpForm from '../auth/SignUpForm';
import { playSound, SOUNDS, toggleSound } from '@/utils/sound';

interface WelcomeScreenProps {
  onComplete: () => void;
  onReset?: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete, onReset }) => {
  const [isTextRevealed, setIsTextRevealed] = useState(false);
  const [soundOn, setSoundOn] = useState(() => {
    const setting = localStorage.getItem('soundEnabled');
    return setting === null ? true : setting === 'true';
  });
  
  useEffect(() => {
    // Start the text reveal animation after a short delay
    const timer = setTimeout(() => {
      setIsTextRevealed(true);
      
      // Play a cinematic sound effect
      playSound(SOUNDS.WELCOME, 0.3);
      
      // After text is revealed, wait a bit and then transition with glitch effect
      setTimeout(() => {
        // Import the transition glitch effect
        import('@/utils/glitchEffect').then(({ applyTransitionGlitch }) => {
          applyTransitionGlitch(() => {
            onComplete();
          }, 1500);
        });
      }, 4000); // Wait 4 seconds after text reveal before transitioning
    }, 800);
    
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  // Animation variants definitions
  const welcomeTextVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };
  
  const characterVariants = {
    hidden: { 
      opacity: 0,
      x: -20,
      y: 0,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };
  
  // Updated welcome text, will style "player" in the JSX
  const welcomeText = "[ Welcome, player! ]";
  
  // No longer showing sign up form
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.1, type: 'spring' }}
        className="relative w-full max-w-md border border-solo-blue/30 bg-transparent p-6"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(14, 21, 45, 0.8) 0%, rgba(3, 8, 22, 0.8) 100%)',
          boxShadow: '0 0 20px rgba(46, 107, 255, 0.3)'
        }}
      >
        {/* Alert icon at top */}
        <div className="flex justify-center mb-2">
          <div className="flex items-center space-x-2 text-solo-blue-light">
            <AlertCircle size={18} />
            <span className="text-lg font-medium">Alert</span>
            <AlertCircle size={18} />
          </div>
        </div>
        
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-solo-blue-light" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-solo-blue-light" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-solo-blue-light" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-solo-blue-light" />
        
        {/* Animated Solo Leveling style welcome text */}
        <div className="mb-8 overflow-hidden">
          <motion.div
            variants={welcomeTextVariants}
            initial="hidden"
            animate={isTextRevealed ? "visible" : "hidden"}
            className="flex justify-center text-2xl font-mono tracking-wide"
          >
            {welcomeText.split('').map((char, index) => {
              // Check if the current character is part of the word "player"
              const isPlayerChar = welcomeText.indexOf("player") <= index && 
                                  index < welcomeText.indexOf("player") + "player".length;
              
              return (
                <motion.span
                  key={index}
                  variants={characterVariants}
                  className={`inline-block ${isPlayerChar ? 'text-green-400' : 'text-solo-blue-light'}`}
                  style={{ textShadow: '0 0 8px rgba(46, 107, 255, 0.8)' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              );
            })}
          </motion.div>
        </div>
        
        <div className="space-y-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="text-center text-gray-300"
          >
            In this world, you'll gain strength by completing quests 
            and leveling up with sacred weapons and artifacts.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.5 }}
            className="flex flex-col space-y-4"
          >
            <div className="text-center text-solo-blue-light text-lg animate-pulse">
              Initializing system...
            </div>
            
            {onReset && (
              <button
                onClick={() => {
                  onReset();
                  playSound(SOUNDS.ERROR, 0.3);
                }}
                className="mt-2 flex items-center justify-center text-sm text-gray-500 hover:text-red-400"
              >
                <RefreshCcw className="mr-1" size={14} />
                Reset All Data
              </button>
            )}
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.7, duration: 0.5 }}
            className="text-sm text-center text-gray-500"
          >
            Your progress will be saved locally on your device.
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;
