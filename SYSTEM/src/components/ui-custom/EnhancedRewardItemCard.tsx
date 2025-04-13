
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RewardItem } from '@/types';
import { Sword, Shield, Wand2, ArrowUpRight, ShieldAlert, Gem, Crown, Sparkles, Flame, X, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { playSound, SOUNDS } from '@/utils/sound';

interface EnhancedRewardItemCardProps {
  item: RewardItem;
  isEquipped?: boolean;
  onEquip?: (itemId: string) => void;
  onUnequip?: (itemId: string) => void;
  className?: string;
}

const EnhancedRewardItemCard: React.FC<EnhancedRewardItemCardProps> = ({ 
  item, 
  isEquipped = false,
  onEquip,
  onUnequip,
  className 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const rarityColors = {
    common: 'border-gray-400 bg-gray-900/60',
    uncommon: 'border-green-500 bg-green-900/60',
    rare: 'border-blue-500 bg-blue-900/60',
    epic: 'border-purple-500 bg-purple-900/60',
    legendary: 'border-amber-500 bg-amber-900/60',
    mythic: 'border-rose-500 bg-rose-900/60'
  };
  
  const rarityGlows = {
    common: 'shadow-sm shadow-gray-500/30',
    uncommon: 'shadow-md shadow-green-500/40',
    rare: 'shadow-md shadow-blue-500/50',
    epic: 'shadow-lg shadow-purple-500/60',
    legendary: 'shadow-xl shadow-amber-500/70',
    mythic: 'shadow-2xl shadow-rose-500/80'
  };
  
  const rarityTextColors = {
    common: 'text-gray-300',
    uncommon: 'text-green-400',
    rare: 'text-blue-400',
    epic: 'text-purple-400',
    legendary: 'text-amber-400',
    mythic: 'text-rose-400'
  };
  
  const getItemIcon = () => {
    switch (item.type) {
      case 'sword':
        return <Sword className="w-5 h-5 text-red-400" />;
      case 'dagger':
        return <Sword className="w-5 h-5 text-red-400" />;
      case 'staff':
        return <Wand2 className="w-5 h-5 text-purple-400" />;
      case 'bow':
        return <Flame className="w-5 h-5 text-amber-400" />;
      case 'shield':
        return <Shield className="w-5 h-5 text-blue-400" />;
      case 'armor':
        return <ShieldAlert className="w-5 h-5 text-blue-400" />;
      case 'accessory':
        return <Crown className="w-5 h-5 text-amber-400" />;
      case 'potion':
        return <Sparkles className="w-5 h-5 text-green-400" />;
      default:
        return <Gem className="w-5 h-5 text-purple-400" />;
    }
  };
  
  const handleToggleEquip = () => {
    if (isEquipped) {
      playSound(SOUNDS.BUTTON, 0.2);
      onUnequip && onUnequip(item.id);
    } else {
      playSound(SOUNDS.EQUIP, 0.4);
      onEquip && onEquip(item.id);
    }
  };
  
  return (
    <motion.div 
      className={cn(
        "glass-panel p-4 border-2 overflow-hidden",
        rarityColors[item.rarity],
        rarityGlows[item.rarity],
        isEquipped && "ring-2 ring-solo-blue",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center mr-3 border-2",
            `bg-${item.rarity === 'common' ? 'gray' : item.rarity}-500/20`,
            `border-${item.rarity === 'common' ? 'gray' : item.rarity}-500/40`
          )}>
            {getItemIcon()}
          </div>
          <div>
            <h3 className={cn("font-bold text-white text-lg flex items-center")}>
              {item.name}
              {isEquipped && (
                <span className="ml-2 px-1.5 py-0.5 bg-solo-blue/20 border border-solo-blue/40 text-solo-blue text-xs rounded">
                  Equipped
                </span>
              )}
            </h3>
            <div className="flex items-center mt-0.5">
              <span className={cn(
                "text-xs px-2 py-0.5 rounded capitalize border",
                `bg-${item.rarity === 'common' ? 'gray' : item.rarity}-500/30`,
                `border-${item.rarity === 'common' ? 'gray' : item.rarity}-500/40`,
                rarityTextColors[item.rarity]
              )}>
                {item.rarity}
              </span>
              <span className="text-xs text-muted-foreground ml-2 capitalize">{item.type}</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>
      
      {/* Item image preview */}
      {item.image && (
        <div className="relative h-40 mb-4 flex items-center justify-center overflow-hidden border border-white/10 rounded-md bg-black/20">
          <motion.img 
            src={item.image} 
            alt={item.name}
            className="h-full object-contain"
            animate={{
              scale: isHovered ? 1.05 : 1,
              y: isHovered ? -5 : 0
            }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Rarity glow effect */}
          <div className={cn(
            "absolute inset-0 opacity-30 pointer-events-none",
            item.rarity === 'legendary' && "bg-gradient-to-t from-amber-500/40 to-transparent",
            item.rarity === 'mythic' && "bg-gradient-to-t from-rose-500/40 to-transparent"
          )} />
          
          {/* Particle effects for legendary and mythic items */}
          {(item.rarity === 'legendary' || item.rarity === 'mythic') && isHovered && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    "absolute w-1 h-1 rounded-full",
                    item.rarity === 'legendary' ? "bg-amber-400" : "bg-rose-400"
                  )}
                  initial={{ 
                    x: Math.random() * 100 - 50 + 50,
                    y: Math.random() * 100 - 50 + 80,
                    opacity: 1
                  }}
                  animate={{ 
                    y: [null, -20 - Math.random() * 30],
                    opacity: [null, 0]
                  }}
                  transition={{
                    duration: 1 + Math.random(),
                    repeat: Infinity,
                    repeatDelay: Math.random() * 0.5
                  }}
                />
              ))}
            </>
          )}
        </div>
      )}
      
      <p className="text-sm text-muted-foreground mb-3">
        {item.description}
      </p>
      
      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 mb-3 p-3 border border-white/10 bg-black/20 rounded-md">
        {item.stats.power !== undefined && (
          <div className="text-sm flex items-center">
            <Sword className="w-3.5 h-3.5 mr-1.5 text-red-400" />
            <span className="text-gray-300">Power:</span>
            <span className="ml-1.5 text-red-400 font-medium">+{item.stats.power}</span>
          </div>
        )}
        {item.stats.defense !== undefined && (
          <div className="text-sm flex items-center">
            <Shield className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
            <span className="text-gray-300">Defense:</span>
            <span className="ml-1.5 text-blue-400 font-medium">+{item.stats.defense}</span>
          </div>
        )}
        {item.stats.agility !== undefined && (
          <div className="text-sm flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-1.5 text-green-400" />
            <span className="text-gray-300">Agility:</span>
            <span className="ml-1.5 text-green-400 font-medium">+{item.stats.agility}</span>
          </div>
        )}
        {item.stats.intelligence !== undefined && (
          <div className="text-sm flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
            <span className="text-gray-300">Int:</span>
            <span className="ml-1.5 text-purple-400 font-medium">+{item.stats.intelligence}</span>
          </div>
        )}
      </div>
      
      {/* Expanded content */}
      {isExpanded && item.ability && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-3 p-3 border-2 rounded-md bg-solo-dark/90"
          style={{ borderColor: `var(--${item.rarity === 'common' ? 'gray' : item.rarity}-500)` }}
        >
          <span className={cn("text-sm font-medium", rarityTextColors[item.rarity])}>
            Special Ability:
          </span>
          <p className="text-sm mt-1">{item.ability}</p>
        </motion.div>
      )}
      
      {/* Toggle equip button */}
      {(onEquip || onUnequip) && (
        <button
          onClick={handleToggleEquip}
          className={cn(
            "w-full py-1.5 px-3 text-sm font-medium rounded-md transition-all flex items-center justify-center",
            isEquipped 
              ? "bg-solo-gray border border-gray-500/30 text-white hover:bg-solo-gray/70" 
              : cn(
                  "text-white border",
                  item.rarity === 'common' ? "bg-gray-700 border-gray-500/30 hover:bg-gray-600" : 
                  item.rarity === 'uncommon' ? "bg-green-700 border-green-500/30 hover:bg-green-600" :
                  item.rarity === 'rare' ? "bg-blue-700 border-blue-500/30 hover:bg-blue-600" :
                  item.rarity === 'epic' ? "bg-purple-700 border-purple-500/30 hover:bg-purple-600" :
                  item.rarity === 'legendary' ? "bg-amber-700 border-amber-500/30 hover:bg-amber-600" :
                  "bg-rose-700 border-rose-500/30 hover:bg-rose-600"
                )
          )}
        >
          {isEquipped ? (
            <>
              <X className="w-4 h-4 mr-1.5" />
              Unequip
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-1.5" />
              Equip
            </>
          )}
        </button>
      )}
    </motion.div>
  );
};

export default EnhancedRewardItemCard;
