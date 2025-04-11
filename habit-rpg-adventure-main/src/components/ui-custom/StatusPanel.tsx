
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Stats } from '@/types';
import { Progress } from '@/components/ui/progress';
import { useHabitContext } from '@/context/HabitContext';
import { Sparkles, Zap, Trophy, ArrowRight } from 'lucide-react';
import { playSound, SOUNDS } from '@/utils/sound';
import RankBadge from './RankBadge';

interface StatusPanelProps {
  stats: Stats;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ stats }) => {
  const navigate = useNavigate();
  const { userProfile } = useHabitContext();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center w-full md:w-auto">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <div className="relative">
            <div className="w-12 h-12 bg-solo-blue/20 rounded-full flex items-center justify-center border-2 border-solo-blue-light">
              <span className="text-xl font-bold">{stats.level}</span>
            </div>
            
            <RankBadge 
              rank={userProfile.rank} 
              size="sm" 
              className="absolute -top-1 -right-1"
            />
          </div>
          
          <div className="ml-3">
            <p className="text-sm text-muted-foreground">Hunter</p>
            <p className="font-semibold">{userProfile.username}</p>
          </div>
        </motion.div>
        
        <div 
          className="flex-1 ml-4 mr-2"
          onClick={() => {
            navigate('/stats');
            playSound(SOUNDS.BUTTON, 0.2);
          }}
        >
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Level {stats.level}</span>
            <span className="text-solo-blue">
              {stats.xp} / {stats.xpToNextLevel} XP
            </span>
          </div>
          <Progress 
            value={(stats.xp / stats.xpToNextLevel) * 100} 
            className="h-2 cursor-pointer" 
          />
        </div>
      </div>
      
      <div className="flex gap-4 w-full md:w-auto justify-between md:justify-end text-sm">
        <div className="flex flex-col items-center">
          <div className="flex items-center text-amber-400">
            <Trophy size={14} className="mr-1" />
            <span>{userProfile.completedMissions?.length || 0}</span>
          </div>
          <span className="text-xs text-muted-foreground">Missions</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex items-center text-solo-blue">
            <Zap size={14} className="mr-1" />
            <span>{stats.dayStreak}</span>
          </div>
          <span className="text-xs text-muted-foreground">Streak</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex items-center text-purple-400">
            <Sparkles size={14} className="mr-1" />
            <span>{userProfile.inventory.length}</span>
          </div>
          <span className="text-xs text-muted-foreground">Items</span>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            navigate('/profile');
            playSound(SOUNDS.BUTTON, 0.2);
          }}
          className="bg-solo-dark hover:bg-solo-gray px-3 py-1.5 rounded-md text-sm hidden md:flex items-center"
        >
          Profile
          <ArrowRight className="ml-1 w-3 h-3" />
        </motion.button>
      </div>
    </div>
  );
};

export default StatusPanel;
