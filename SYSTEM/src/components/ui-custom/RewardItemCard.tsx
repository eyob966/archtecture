
import React from 'react';
import { motion } from 'framer-motion';
import { RewardItem } from '@/types';
import { Sword, Shield, Wand2, ArrowUpRight, ShieldAlert, Gem, Crown, Sparkles, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { playSound, SOUNDS } from '@/utils/sound';

interface RewardItemCardProps {
  item: RewardItem;
  isEquipped?: boolean;
  onEquip?: (itemId: string) => void;
  onUnequip?: (itemId: string) => void;
  className?: string;
}

const RewardItemCard: React.FC<RewardItemCardProps> = ({ 
  item, 
  isEquipped = false,
  onEquip,
  onUnequip,
  className 
}) => {
  const rarityColors = {
    common: 'border-gray-400 bg-gray-900/40',
    uncommon: 'border-green-500 bg-green-900/40',
    rare: 'border-blue-500 bg-blue-900/40',
    epic: 'border-purple-500 bg-purple-900/40',
    legendary: 'border-amber-500 bg-amber-900/40',
    mythic: 'border-rose-500 bg-rose-900/40'
  };
  
  const rarityGlows = {
    common: '',
    uncommon: 'shadow-sm shadow-green-500/30',
    rare: 'shadow-md shadow-blue-500/30',
    epic: 'shadow-md shadow-purple-500/40',
    legendary: 'shadow-lg shadow-amber-500/50',
    mythic: 'shadow-xl shadow-rose-500/60'
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
        "glass-panel p-4 border-2",
        rarityColors[item.rarity],
        rarityGlows[item.rarity],
        isEquipped && "ring-2 ring-solo-blue",
        className
      )}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center mr-3",
            `bg-${item.rarity === 'common' ? 'gray' : item.rarity}-500/20`
          )}>
            {getItemIcon()}
          </div>
          <div>
            <h3 className="font-medium text-white">{item.name}</h3>
            <div className="flex items-center">
              <span className={cn(
                "text-xs px-2 py-0.5 rounded capitalize",
                `bg-${item.rarity === 'common' ? 'gray' : item.rarity}-500/30`,
                `text-${item.rarity === 'common' ? 'gray' : item.rarity}-300`
              )}>
                {item.rarity}
              </span>
              <span className="text-xs text-muted-foreground ml-2 capitalize">{item.type}</span>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3">
        {item.description}
      </p>
      
      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {item.stats.power !== undefined && (
          <div className="text-sm flex items-center">
            <Sword className="w-3 h-3 mr-1 text-red-400" />
            <span className="text-muted-foreground">Power:</span>
            <span className="ml-1 text-red-400">+{item.stats.power}</span>
          </div>
        )}
        {item.stats.defense !== undefined && (
          <div className="text-sm flex items-center">
            <Shield className="w-3 h-3 mr-1 text-blue-400" />
            <span className="text-muted-foreground">Defense:</span>
            <span className="ml-1 text-blue-400">+{item.stats.defense}</span>
          </div>
        )}
        {item.stats.agility !== undefined && (
          <div className="text-sm flex items-center">
            <ArrowUpRight className="w-3 h-3 mr-1 text-green-400" />
            <span className="text-muted-foreground">Agility:</span>
            <span className="ml-1 text-green-400">+{item.stats.agility}</span>
          </div>
        )}
        {item.stats.intelligence !== undefined && (
          <div className="text-sm flex items-center">
            <Sparkles className="w-3 h-3 mr-1 text-purple-400" />
            <span className="text-muted-foreground">Int:</span>
            <span className="ml-1 text-purple-400">+{item.stats.intelligence}</span>
          </div>
        )}
      </div>
      
      {/* Ability */}
      {item.ability && (
        <div className="mb-3 p-2 border border-solo-blue/30 rounded bg-solo-blue/10">
          <span className="text-xs font-medium text-solo-blue-light">Special Ability:</span>
          <p className="text-sm">{item.ability}</p>
        </div>
      )}
      
      {/* Toggle equip button */}
      {(onEquip || onUnequip) && (
        <button
          onClick={handleToggleEquip}
          className={cn(
            "w-full py-1.5 px-3 text-sm font-medium rounded transition-colors",
            isEquipped 
              ? "bg-solo-gray text-white hover:bg-solo-gray/70" 
              : "bg-solo-blue text-white hover:bg-solo-blue/80"
          )}
        >
          {isEquipped ? "Unequip" : "Equip"}
        </button>
      )}
    </motion.div>
  );
};

export default RewardItemCard;
