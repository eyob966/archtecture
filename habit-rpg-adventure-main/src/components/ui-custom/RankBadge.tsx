
import React from 'react';
import { motion } from 'framer-motion';
import { MonsterRank } from '@/types';
import { cn } from '@/lib/utils';

interface RankBadgeProps {
  rank: MonsterRank;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  pulse?: boolean;
}

const RankBadge: React.FC<RankBadgeProps> = ({ 
  rank, 
  size = 'md',
  className,
  pulse = false
}) => {
  // Define size classes
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-10 h-10 text-base',
    lg: 'w-14 h-14 text-2xl',
    xl: 'w-20 h-20 text-3xl font-extrabold'
  };
  
  // Enhanced background colors by rank with more intense glowing effects for Solo Leveling style
  const rankColors = {
    S: 'bg-gradient-to-br from-rose-500 via-rose-600 to-rose-900 border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.8)]',
    A: 'bg-gradient-to-br from-amber-500 via-amber-600 to-amber-900 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.8)]',
    B: 'bg-gradient-to-br from-purple-500 via-purple-600 to-purple-900 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.8)]',
    C: 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-900 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.8)]',
    D: 'bg-gradient-to-br from-green-500 via-green-600 to-green-900 border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.8)]',
    E: 'bg-gradient-to-br from-gray-500 via-gray-600 to-gray-900 border-gray-400 shadow-[0_0_12px_rgba(156,163,175,0.8)]'
  };

  const pulseAnimations = {
    S: 'animate-[pulse_1.5s_ease-in-out_infinite] shadow-[0_0_20px_rgba(244,63,94,0.9)]',
    A: 'animate-[pulse_1.8s_ease-in-out_infinite] shadow-[0_0_18px_rgba(245,158,11,0.9)]',
    B: 'animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_16px_rgba(168,85,247,0.9)]',
    C: 'animate-[pulse_2.2s_ease-in-out_infinite] shadow-[0_0_14px_rgba(59,130,246,0.9)]',
    D: 'animate-[pulse_2.5s_ease-in-out_infinite] shadow-[0_0_12px_rgba(34,197,94,0.9)]',
    E: 'animate-[pulse_3s_ease-in-out_infinite] shadow-[0_0_10px_rgba(156,163,175,0.9)]'
  };
  
  return (
    <motion.div
      className={cn(
        "rounded-full flex items-center justify-center font-bold border-2",
        rankColors[rank],
        sizeClasses[size],
        pulse && pulseAnimations[rank],
        className
      )}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${rank === 'S' ? 'rgba(244,63,94,0.9)' : rank === 'A' ? 'rgba(245,158,11,0.9)' : 'rgba(59,130,246,0.9)'}` }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }}
    >
      {rank}
    </motion.div>
  );
};

export default RankBadge;
