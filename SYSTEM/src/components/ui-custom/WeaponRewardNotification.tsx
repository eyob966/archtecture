
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RewardItem } from '@/types';
import { cn } from '@/lib/utils';
import { X, Sword, Shield, Wand2, ArrowUpRight, ShieldAlert, Gem } from 'lucide-react';

interface WeaponRewardNotificationProps {
  item: RewardItem;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

const WeaponRewardNotification: React.FC<WeaponRewardNotificationProps> = ({ 
  item, 
  onClose,
  autoClose = true,
  autoCloseTime = 8000
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

  const getItemIcon = () => {
    switch (item.type) {
      case 'sword':
        return <Sword className="w-6 h-6" />;
      case 'dagger':
        return <Sword className="w-6 h-6" />;
      case 'staff':
        return <Wand2 className="w-6 h-6" />;
      case 'bow':
        return <ArrowUpRight className="w-6 h-6" />;
      case 'shield':
        return <Shield className="w-6 h-6" />;
      case 'armor':
        return <ShieldAlert className="w-6 h-6" />;
      case 'accessory':
        return <Gem className="w-6 h-6" />;
      default:
        return <Gem className="w-6 h-6" />;
    }
  };
  
  const rarityGlow = {
    common: '',
    uncommon: 'shadow-green-500/50',
    rare: 'shadow-blue-500/50',
    epic: 'shadow-purple-500/50',
    legendary: 'shadow-amber-500/50',
    mythic: 'shadow-rose-500/50'
  };
  
  const rarityColors = {
    common: 'bg-gray-900/80 border-gray-400',
    uncommon: 'bg-green-900/80 border-green-400',
    rare: 'bg-blue-900/80 border-blue-400',
    epic: 'bg-purple-900/80 border-purple-400',
    legendary: 'bg-amber-900/80 border-amber-400',
    mythic: 'bg-rose-900/80 border-rose-400'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={cn(
              "relative max-w-md w-full mx-4 border-2 shadow-glow shadow-xl p-6 text-center",
              rarityColors[item.rarity],
              rarityGlow[item.rarity]
            )}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
            <button 
              className="absolute top-2 right-2 text-muted-foreground hover:text-white transition-colors" 
              onClick={handleClose}
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Rarity Banner */}
            <div className={cn(
              "absolute top-0 left-0 right-0 py-1 text-center text-xs font-bold uppercase tracking-wider",
              `bg-${item.rarity === 'common' ? 'gray' : item.rarity}-500/80`
            )}>
              {item.rarity} {item.type}
            </div>
            
            <div className="mb-4 mt-6">
              <div className={cn(
                "w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-3",
                `bg-${item.rarity === 'common' ? 'gray' : item.rarity}-500/30`,
                `text-${item.rarity === 'common' ? 'gray' : item.rarity}-300`
              )}>
                {getItemIcon()}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-1">
                {item.name}
              </h3>
              
              <p className="text-lg text-glow">
                New Item Acquired!
              </p>
            </div>
            
            <p className="text-muted-foreground mb-4">
              {item.description}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4 max-w-xs mx-auto">
              {item.stats.power !== undefined && (
                <div className="text-sm flex items-center bg-red-900/20 p-2 rounded">
                  <Sword className="w-4 h-4 mr-2 text-red-400" />
                  <span className="text-white">Power:</span>
                  <span className="ml-1 text-red-400 font-medium">+{item.stats.power}</span>
                </div>
              )}
              {item.stats.defense !== undefined && (
                <div className="text-sm flex items-center bg-blue-900/20 p-2 rounded">
                  <Shield className="w-4 h-4 mr-2 text-blue-400" />
                  <span className="text-white">Defense:</span>
                  <span className="ml-1 text-blue-400 font-medium">+{item.stats.defense}</span>
                </div>
              )}
              {item.stats.agility !== undefined && (
                <div className="text-sm flex items-center bg-green-900/20 p-2 rounded">
                  <ArrowUpRight className="w-4 h-4 mr-2 text-green-400" />
                  <span className="text-white">Agility:</span>
                  <span className="ml-1 text-green-400 font-medium">+{item.stats.agility}</span>
                </div>
              )}
              {item.stats.intelligence !== undefined && (
                <div className="text-sm flex items-center bg-purple-900/20 p-2 rounded">
                  <Wand2 className="w-4 h-4 mr-2 text-purple-400" />
                  <span className="text-white">Intelligence:</span>
                  <span className="ml-1 text-purple-400 font-medium">+{item.stats.intelligence}</span>
                </div>
              )}
            </div>
            
            {/* Ability */}
            {item.ability && (
              <div className="mb-5 p-3 border border-solo-blue/30 rounded bg-solo-blue/10 max-w-xs mx-auto">
                <span className="text-sm font-medium text-solo-blue-light">Special Ability:</span>
                <p className="text-sm">{item.ability}</p>
              </div>
            )}
            
            {/* Particles */}
            {(item.rarity === 'epic' || item.rarity === 'legendary' || item.rarity === 'mythic') && (
              <>
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full bg-${item.rarity}-400`}
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
                      ease: [0.23, 1, 0.32, 1],
                      repeat: Infinity,
                      repeatDelay: Math.random() * 2
                    }}
                  />
                ))}
              </>
            )}
            
            <button 
              className="solo-button w-full py-2"
              onClick={handleClose}
            >
              Equip Now
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WeaponRewardNotification;
