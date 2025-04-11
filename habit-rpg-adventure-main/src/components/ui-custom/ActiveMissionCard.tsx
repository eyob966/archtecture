
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DungeonMission } from '@/types';
import { monsters } from '@/data/monsters';
import { Skull, Clock, ArrowRight, Trophy, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useHabitContext } from '@/context/HabitContext';
import { playSound, SOUNDS } from '@/utils/sound';
import RankBadge from './RankBadge';

interface ActiveMissionCardProps {
  mission: DungeonMission;
}

const ActiveMissionCard: React.FC<ActiveMissionCardProps> = ({ mission }) => {
  const { completeMissionStep } = useHabitContext();
  const monster = monsters.find(m => m.id === mission.monsterId);
  
  if (!monster) return null;
  
  const completedSteps = mission.steps.filter(step => step.status === 'completed').length;
  const totalSteps = mission.steps.length;
  const progress = Math.round((completedSteps / totalSteps) * 100);
  
  // Calculate days remaining
  const deadline = new Date(mission.deadlineAt || '');
  const today = new Date();
  const daysRemaining = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  const handleCompleteStep = (stepId: string) => {
    completeMissionStep(mission.id, stepId);
    playSound(SOUNDS.COMPLETE, 0.4);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-4 border-2 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-amber-400 flex items-center">
          <Trophy className="w-5 h-5 mr-2" />
          Active Mission
        </h3>
        <Link
          to="/dungeon"
          className="text-sm text-solo-blue-light hover:underline"
          onClick={() => playSound(SOUNDS.BUTTON, 0.2)}
        >
          View Details
        </Link>
      </div>
      
      <div className="flex items-center mb-3">
        <div className="w-14 h-14 bg-solo-dark border border-solo-blue/40 rounded-md overflow-hidden flex items-center justify-center mr-3 shadow-[0_0_10px_rgba(46,107,255,0.4)]">
          {monster.animatedImage ? (
            <img src={monster.animatedImage} alt={monster.name} className="w-full h-full object-cover" />
          ) : (
            <Skull className="w-10 h-10 text-rose-500" />
          )}
        </div>
        <div>
          <h4 className="font-medium text-white">{mission.title}</h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-gray-400">Target: {monster.name}</span>
            <RankBadge rank={monster.rank} size="sm" />
          </div>
        </div>
      </div>
      
      <div className="space-y-1 mb-3">
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Progress:</span>
          <span className="text-solo-blue-light">{completedSteps}/{totalSteps} steps</span>
        </div>
        <Progress value={progress} className="h-2 bg-solo-dark" />
        
        <div className="flex justify-between text-xs mt-1">
          <span className="text-gray-400">Time remaining:</span>
          <span className={cn(
            daysRemaining <= 1 ? 'text-red-400' : 
            daysRemaining <= 3 ? 'text-amber-400' : 'text-green-400'
          )}>
            {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'}
          </span>
        </div>
      </div>
      
      <div className="space-y-2 mb-3">
        <h5 className="text-sm font-medium flex items-center text-white">
          <Calendar className="w-4 h-4 mr-1 text-solo-blue-light" />
          Today's Tasks
        </h5>
        
        {mission.steps
          .filter(step => step.status === 'in_progress')
          .map(step => (
            <div key={step.id} className="flex items-center justify-between p-2 bg-solo-darker/80 backdrop-blur-sm rounded-md border border-solo-blue/20">
              <div className="flex items-start flex-1">
                <ArrowRight className="w-3 h-3 mt-1 mr-2 text-solo-blue-light flex-shrink-0" />
                <span className="text-sm text-gray-200">{step.description}</span>
              </div>
              <div className="text-xs text-gray-400 ml-2 flex items-center">
                <span className="mr-2">{step.currentProgress}/{step.requiredDays}d</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs bg-solo-blue/20 hover:bg-solo-blue/30 text-white border border-solo-blue/30"
                  onClick={() => handleCompleteStep(step.id)}
                >
                  Mark
                </Button>
              </div>
            </div>
          ))}
        
        {mission.steps.filter(step => step.status === 'in_progress').length === 0 && (
          <div className="text-xs text-gray-400 p-2 text-center backdrop-blur-sm bg-solo-darker/50 rounded-md border border-solo-gray/20">
            No active steps for today.
          </div>
        )}
      </div>
      
      <div className="text-xs flex items-center justify-between text-gray-400">
        <div className="flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          <span>Started: {new Date(mission.startedAt || '').toLocaleDateString()}</span>
        </div>
        <div>
          <span>Reward: </span>
          <span className="text-solo-blue-light">+{mission.xpReward} XP</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ActiveMissionCard;
