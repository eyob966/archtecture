
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DungeonMission } from '@/types';
import { soloLevelingMonsters } from '@/data/soloLevelingMonsters';
import { Clock, ArrowRight, Trophy, Calendar, Scroll, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useHabitContext } from '@/context/HabitContext';
import { playSound, SOUNDS } from '@/utils/sound';
import RankBadge from './RankBadge';

interface EnhancedActiveMissionCardProps {
  mission: DungeonMission;
}

const EnhancedActiveMissionCard: React.FC<EnhancedActiveMissionCardProps> = ({ mission }) => {
  const { completeMissionStep } = useHabitContext();
  const monster = soloLevelingMonsters.find(m => m.id === mission.monsterId) || 
                 soloLevelingMonsters[0]; // Fallback to first monster if not found
  
  const completedSteps = mission.steps.filter(step => step.status === 'completed').length;
  const totalSteps = mission.steps.length;
  const progress = Math.round((completedSteps / totalSteps) * 100);
  
  // Calculate time remaining
  const deadline = new Date(mission.deadlineAt || '');
  const today = new Date();
  const msRemaining = deadline.getTime() - today.getTime();
  const daysRemaining = Math.ceil(msRemaining / (1000 * 60 * 60 * 24));
  
  // Format time remaining
  const hoursRemaining = Math.floor((msRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((msRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const secondsRemaining = Math.floor((msRemaining % (1000 * 60)) / 1000);
  
  const timeString = `${daysRemaining}d ${hoursRemaining}h ${minutesRemaining}m ${secondsRemaining}s`;
  
  const handleCompleteStep = (stepId: string) => {
    completeMissionStep(mission.id, stepId);
    playSound(SOUNDS.COMPLETE, 0.4);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-4 border-2 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-amber-400 flex items-center">
          <Trophy className="w-5 h-5 mr-2" />
          Active Mission
        </h3>
        <Link
          to="/dungeon"
          className="text-sm text-solo-blue-light hover:underline flex items-center"
          onClick={() => playSound(SOUNDS.BUTTON, 0.2)}
        >
          <span>Details</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-solo-dark border-2 border-solo-blue/40 rounded-md overflow-hidden flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(46,107,255,0.5)]">
          {monster.animatedImage ? (
            <img src={monster.animatedImage} alt={monster.name} className="w-full h-full object-cover" />
          ) : (
            <Scroll className="w-12 h-12 text-amber-500" />
          )}
        </div>
        <div>
          <h4 className="font-medium text-white text-lg">{mission.title}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-400">Target: {monster.name}</span>
            <RankBadge rank={monster.rank} size="sm" />
          </div>
        </div>
      </div>
      
      <div className="space-y-1.5 mb-4">
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Progress:</span>
          <span className="text-solo-blue-light font-medium">{completedSteps}/{totalSteps} steps</span>
        </div>
        <div className="h-2.5 bg-solo-dark rounded-md overflow-hidden border border-solo-gray/40">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-900"
            style={{ width: `${progress}%` }}
          >
            <div className="w-full h-full opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InN0cmlwZS1wYXR0ZXJuIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSI0MCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjgiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjc3RyaXBlLXBhdHRlcm4pIiAvPjwvc3ZnPg==')]"></div>
          </div>
        </div>
        
        <div className="flex justify-between text-xs mt-1.5">
          <span className="text-gray-400">Time remaining:</span>
          <span className={cn(
            "font-medium",
            daysRemaining <= 1 ? 'text-red-400' : 
            daysRemaining <= 3 ? 'text-amber-400' : 'text-green-400'
          )}>
            {timeString}
          </span>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <h5 className="text-sm font-medium flex items-center text-white">
          <Calendar className="w-4 h-4 mr-1.5 text-solo-blue-light" />
          Today's Tasks
        </h5>
        
        {mission.steps
          .filter(step => step.status === 'in_progress')
          .map(step => (
            <motion.div 
              key={step.id} 
              className="flex items-center justify-between p-2.5 bg-solo-darker/90 backdrop-blur-sm rounded-md border border-solo-blue/30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ backgroundColor: 'rgba(15, 23, 42, 0.9)' }}
            >
              <div className="flex items-start flex-1">
                <Scroll className="w-4 h-4 mt-0.5 mr-2 text-amber-400 flex-shrink-0" />
                <span className="text-sm text-gray-200">{step.description}</span>
              </div>
              <div className="text-xs text-gray-400 ml-2 flex items-center">
                <span className="mr-2">{step.currentProgress}/{step.requiredDays}d</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2.5 text-xs bg-solo-blue/20 hover:bg-solo-blue/30 text-white border border-solo-blue/30"
                  onClick={() => handleCompleteStep(step.id)}
                >
                  Mark
                </Button>
              </div>
            </motion.div>
          ))}
        
        {mission.steps.filter(step => step.status === 'in_progress').length === 0 && (
          <div className="text-xs text-gray-400 p-3 text-center backdrop-blur-sm bg-solo-darker/70 rounded-md border border-solo-gray/30">
            <AlertTriangle className="w-4 h-4 mx-auto mb-1.5 text-amber-400" />
            No active steps for today.
          </div>
        )}
      </div>
      
      <div className="text-xs flex items-center justify-between text-gray-400 p-2 bg-solo-darker/70 rounded-md border border-solo-gray/30">
        <div className="flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          <span>Started: {new Date(mission.startedAt || '').toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <Trophy className="w-3 h-3 mr-1 text-amber-400" />
          <span className="text-solo-blue-light font-medium">+{mission.xpReward} XP</span>
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedActiveMissionCard;
