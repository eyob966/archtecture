
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Award, X, Crown, Sparkles, Trophy, ArrowUp, Beaker } from 'lucide-react';
import { playSound, SOUNDS } from '@/utils/sound';
import RankBadge from './RankBadge';

interface EnhancedRewardNotificationProps {
  title: string;
  message: string;
  xp?: number;
  isLevelUp?: boolean;
  level?: number;
  newRank?: string;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

const EnhancedRewardNotification: React.FC<EnhancedRewardNotificationProps> = ({ 
  title, 
  message, 
  xp, 
  isLevelUp = false, 
  level,
  newRank,
  onClose,
  autoClose = true,
  autoCloseTime = 5000
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [intensiveGlitch, setIntensiveGlitch] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Always play a glitch effect when completing tasks - making this more pronounced
    playSound(SOUNDS.GLITCH, 0.5);
    setGlitchEffect(true);
    
    if (isLevelUp) {
      setTimeout(() => playSound(SOUNDS.LEVEL_UP, 0.5), 500);
      
      setTimeout(() => {
        setIntensiveGlitch(true);
      }, 300);
      
      const flashElement = document.createElement('div');
      flashElement.className = 'fixed inset-0 bg-blue-500/20 z-50 pointer-events-none';
      flashElement.style.animation = 'flash-screen 1s ease-out forwards';
      document.body.appendChild(flashElement);
      
      if (!document.getElementById('flash-keyframes')) {
        const style = document.createElement('style');
        style.id = 'flash-keyframes';
        style.innerHTML = `
          @keyframes flash-screen {
            0% { opacity: 0; }
            10% { opacity: 1; }
            100% { opacity: 0; }
          }
          
          @keyframes text-glitch {
            0% {
              text-shadow: 1px 0 #2e6bff, -1px 0 #f43f5e;
              transform: translate(0);
            }
            25% {
              text-shadow: -1px 0 #2e6bff, 1px 0 #f43f5e;
              transform: translate(-1px, 1px);
            }
            50% {
              text-shadow: 2px 0 #2e6bff, -2px 0 #f43f5e;
              transform: translate(1px, -1px);
            }
            75% {
              text-shadow: -2px 0 #2e6bff, 2px 0 #f43f5e;
              transform: translate(-1px, 1px);
            }
            100% {
              text-shadow: 1px 0 #2e6bff, -1px 0 #f43f5e;
              transform: translate(0);
            }
          }
          
          @keyframes intensive-glitch {
            0% {
              opacity: 1;
              transform: translate(0) skew(0deg);
              clip-path: none;
            }
            10% {
              opacity: 0.9;
              transform: translate(-10px, 2px) skew(5deg);
              clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
            }
            15% {
              transform: translate(5px, -2px) skew(-5deg);
              clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 100%);
            }
            20% {
              opacity: 1;
              transform: translate(0) skew(0deg);
              clip-path: none;
            }
            30% {
              opacity: 0.85;
              transform: translate(15px, 5px) skew(-10deg);
              clip-path: polygon(0 0, 100% 0, 90% 100%, 0 95%);
            }
            35% {
              transform: translate(-5px) skew(3deg);
            }
            40% {
              opacity: 1;
              transform: translate(0) skew(0deg);
              clip-path: none;
            }
            55% {
              opacity: 0.8;
              transform: translate(-8px, -5px) skew(8deg);
            }
            60% {
              opacity: 1;
              transform: translate(0) skew(0deg);
              clip-path: none;
            }
            80% {
              opacity: 0.9;
              transform: translate(6px, 2px) skew(-2deg);
              clip-path: polygon(0 0, 100% 10%, 100% 100%, 10% 100%);
            }
            85% {
              transform: translate(-2px, -3px) skew(1deg);
            }
            100% {
              opacity: 1;
              transform: translate(0) skew(0deg);
              clip-path: none;
            }
          }
          
          .glitch-text {
            animation: text-glitch 0.3s infinite;
            position: relative;
          }
          
          .intensive-glitch {
            animation: intensive-glitch 0.5s forwards;
          }
          
          .glitch-text::before,
          .glitch-text::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.8;
          }
          
          .glitch-text::before {
            color: #2e6bff;
            z-index: -1;
            animation: glitch-before 0.3s infinite;
          }
          
          .glitch-text::after {
            color: #f43f5e;
            z-index: -2;
            animation: glitch-after 0.3s infinite;
          }
          
          @keyframes glitch-before {
            0% { transform: translate(-2px, 0); }
            25% { transform: translate(2px, 0); }
            50% { transform: translate(-1px, 1px); }
            75% { transform: translate(1px, -1px); }
            100% { transform: translate(-2px, 0); }
          }
          
          @keyframes glitch-after {
            0% { transform: translate(2px, 0); }
            25% { transform: translate(-2px, 0); }
            50% { transform: translate(1px, -1px); }
            75% { transform: translate(-1px, 1px); }
            100% { transform: translate(2px, 0); }
          }
        `;
        document.head.appendChild(style);
      }
      
      setTimeout(() => {
        document.body.removeChild(flashElement);
        setIntensiveGlitch(false);
        
        setTimeout(() => {
          setGlitchEffect(false);
        }, 1000);
      }, 1000);
    } else {
      // Even for non-level-up completions, add a milder glitch effect
      setTimeout(() => {
        setGlitchEffect(false);
      }, 800);
    }
    
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 500);
      }, autoCloseTime);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseTime, isLevelUp, onClose]);
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={containerRef}
            className={cn(
              "relative glass-panel border-2 p-6 max-w-md text-center",
              isLevelUp 
                ? "border-blue-500/50 shadow-[0_0_30px_rgba(46,107,255,0.5)]" 
                : "border-solo-blue/30 shadow-[0_0_15px_rgba(46,107,255,0.3)]",
              intensiveGlitch && "intensive-glitch"
            )}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              x: glitchEffect ? [0, -5, 5, -3, 3, 0] : 0,
              y: glitchEffect ? [0, 3, -3, 5, -5, 0] : 0
            }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              x: { duration: 0.1, repeat: glitchEffect ? 5 : 0 },
              y: { duration: 0.1, repeat: glitchEffect ? 5 : 0 }
            }}
          >
            <button 
              className="absolute top-2 right-2 text-muted-foreground hover:text-white transition-colors" 
              onClick={handleClose}
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-4">
              {isLevelUp ? (
                <div className="flex flex-col items-center">
                  <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(46,107,255,0.7)] mb-3 border-2 border-blue-400/50">
                    <span className={cn(
                      "text-3xl font-bold text-white",
                      glitchEffect && "glitch-text"
                    )} data-text={level}>
                      {level}
                    </span>
                  </div>
                  
                  {newRank && (
                    <div className="my-2">
                      <RankBadge rank={newRank as any} size="lg" pulse={true} />
                    </div>
                  )}
                  
                  <motion.h3 
                    className={cn(
                      "text-2xl font-bold text-glow mt-2",
                      glitchEffect && "glitch-text"
                    )}
                    data-text={title}
                    animate={{ 
                      textShadow: glitchEffect ? [
                        "0 0 5px rgba(46,107,255,0.8), 0 0 10px rgba(46,107,255,0.5)",
                        "0 0 5px rgba(244,63,94,0.8), 0 0 10px rgba(244,63,94,0.5)",
                        "0 0 5px rgba(46,107,255,0.8), 0 0 10px rgba(46,107,255,0.5)"
                      ] : "0 0 10px rgba(46,107,255,0.7)"
                    }}
                    transition={{ duration: 0.3, repeat: glitchEffect ? 3 : 0 }}
                  >
                    {title}
                  </motion.h3>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-solo-blue/20 flex items-center justify-center mb-2 border border-solo-blue/40 shadow-[0_0_15px_rgba(46,107,255,0.4)]">
                    <Beaker className={cn(
                      "w-8 h-8 text-solo-blue",
                      glitchEffect && "glitch-text"
                    )} data-text="icon" />
                  </div>
                  
                  <h3 className={cn(
                    "text-xl font-semibold text-white",
                    glitchEffect && "glitch-text"
                  )} data-text={title}>
                    {title}
                  </h3>
                </div>
              )}
            </div>
            
            <p className={cn(
              "text-muted-foreground mb-4",
              glitchEffect && "glitch-text"
            )} data-text={message}>
              {message}
            </p>
            
            {xp && (
              <motion.div 
                className="mb-6 text-solo-blue-light font-medium flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className={cn(
                  "w-5 h-5 mr-2 text-blue-400",
                  glitchEffect && "animate-pulse"
                )} />
                <span className={cn(
                  "text-xl",
                  glitchEffect && "glitch-text"
                )} data-text={`+${xp} XP`}>+{xp} XP</span>
              </motion.div>
            )}
            
            <button 
              className="solo-button w-full py-2 shadow-[0_0_15px_rgba(46,107,255,0.5)]"
              onClick={handleClose}
            >
              Continue
            </button>
            
            {isLevelUp && (
              <>
                {[...Array(40)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={cn(
                      "absolute w-2 h-2 rounded-full",
                      i % 3 === 0 ? "bg-blue-500" : 
                      i % 3 === 1 ? "bg-purple-500" : "bg-solo-blue-light"
                    )}
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      opacity: 1, 
                      scale: 0 
                    }}
                    animate={{ 
                      x: Math.random() * 600 - 300, 
                      y: Math.random() * 600 - 300,
                      opacity: 0,
                      scale: Math.random() * 4
                    }}
                    transition={{ 
                      duration: 2, 
                      delay: Math.random() * 0.5,
                      ease: [0.23, 1, 0.32, 1]
                    }}
                  />
                ))}
                
                <motion.div 
                  className="absolute -right-8 -top-8 text-yellow-500"
                  animate={{ 
                    y: [0, -20], 
                    opacity: [1, 0],
                    scale: [1, 1.5]
                  }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <ArrowUp className="w-8 h-8" />
                </motion.div>
                
                <motion.div 
                  className="absolute -left-8 -top-8 text-yellow-500"
                  animate={{ 
                    y: [0, -20], 
                    opacity: [1, 0],
                    scale: [1, 1.5]
                  }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <ArrowUp className="w-8 h-8" />
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnhancedRewardNotification;
