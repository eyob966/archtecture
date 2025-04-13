
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Award, X } from 'lucide-react';

interface RewardNotificationProps {
  title: string;
  message: string;
  xp?: number;
  isLevelUp?: boolean;
  level?: number;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

const RewardNotification: React.FC<RewardNotificationProps> = ({ 
  title, 
  message, 
  xp, 
  isLevelUp = false, 
  level,
  onClose,
  autoClose = true,
  autoCloseTime = 5000
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 500); // After animation completes
      }, autoCloseTime);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseTime, onClose]);
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // After animation completes
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative glass-panel border border-solo-blue/30 p-6 max-w-md text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25
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
                <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-solo-blue to-purple-600 flex items-center justify-center shadow-glow-lg mb-2">
                  <span className="text-2xl font-bold text-white">{level}</span>
                </div>
              ) : (
                <div className="mx-auto w-16 h-16 rounded-full bg-solo-blue/20 flex items-center justify-center mb-2">
                  <Award className="w-8 h-8 text-solo-blue" />
                </div>
              )}
              
              <h3 className={cn(
                "text-xl font-semibold",
                isLevelUp ? "text-glow" : ""
              )}>
                {title}
              </h3>
            </div>
            
            <p className="text-muted-foreground mb-4">
              {message}
            </p>
            
            {xp && (
              <motion.div 
                className="mb-6 text-solo-blue-light font-medium"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                +{xp} XP
              </motion.div>
            )}
            
            <button 
              className="solo-button w-full py-2"
              onClick={handleClose}
            >
              Continue
            </button>
            
            {/* Animated particles for level up */}
            {isLevelUp && (
              <>
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-solo-blue-light"
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      opacity: 1, 
                      scale: 0 
                    }}
                    animate={{ 
                      x: Math.random() * 400 - 200, 
                      y: Math.random() * 400 - 200,
                      opacity: 0,
                      scale: Math.random() * 3
                    }}
                    transition={{ 
                      duration: 2, 
                      delay: Math.random() * 0.5,
                      ease: [0.23, 1, 0.32, 1]
                    }}
                  />
                ))}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RewardNotification;
