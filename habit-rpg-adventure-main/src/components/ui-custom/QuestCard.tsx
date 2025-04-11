
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Quest } from '@/types';
import { Target, Clock, Award, Sword, Shield, Skull } from 'lucide-react';

interface QuestCardProps {
  quest: Quest;
  onComplete: (questId: string) => void;
  className?: string;
}

const QuestCard: React.FC<QuestCardProps> = ({ quest, onComplete, className }) => {
  const isExpiringSoon = () => {
    if (!quest.expiresAt) return false;
    
    const expiryDate = new Date(quest.expiresAt);
    const now = new Date();
    const hoursRemaining = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    return hoursRemaining <= 4;
  };
  
  const formatTimeRemaining = () => {
    if (!quest.expiresAt) return null;
    
    const expiryDate = new Date(quest.expiresAt);
    const now = new Date();
    const diffMs = expiryDate.getTime() - now.getTime();
    
    if (diffMs <= 0) return "Expired";
    
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHrs > 0) {
      return `${diffHrs}h ${diffMins}m`;
    } else {
      return `${diffMins}m`;
    }
  };
  
  const getQuestTypeIcon = () => {
    switch (quest.type) {
      case 'daily':
        return <Clock className="w-4 h-4" />;
      case 'weekly':
        return <Target className="w-4 h-4" />;
      case 'achievement':
        return <Award className="w-4 h-4" />;
      default:
        return <Sword className="w-4 h-4" />;
    }
  };

  return (
    <motion.div 
      className={cn(
        "glass-panel hover-card border p-4",
        quest.completed ? "border-green-600/30 shadow-[0_0_10px_rgba(22,163,74,0.2)]" : 
        "border-solo-blue/30 shadow-[0_0_10px_rgba(46,107,255,0.2)]",
        isExpiringSoon() && !quest.completed && "border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.3)]",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(46,107,255,0.3)" }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center mr-2",
            quest.completed 
              ? "bg-green-600/20 text-green-500 shadow-[0_0_8px_rgba(22,163,74,0.4)]" 
              : "bg-solo-blue/20 text-solo-blue shadow-[0_0_8px_rgba(46,107,255,0.4)]"
          )}>
            {getQuestTypeIcon()}
          </div>
          <h3 className="font-medium text-white">{quest.title}</h3>
        </div>
        
        {quest.expiresAt && (
          <div className={cn(
            "text-xs font-medium px-2 py-1 rounded flex items-center",
            isExpiringSoon() && !quest.completed 
              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" 
              : "bg-solo-gray/30 text-muted-foreground border border-solo-gray/20"
          )}>
            <Clock className="w-3 h-3 mr-1" />
            {formatTimeRemaining()}
          </div>
        )}
      </div>
      
      <p className="text-sm text-muted-foreground mb-3">
        {quest.description}
      </p>
      
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span>Progress</span>
          <span>{quest.progress}/{quest.requiredProgress}</span>
        </div>
        <div className="progress-bar">
          <div 
            className={cn(
              "h-full rounded-full animate-progress-fill",
              quest.completed ? "bg-green-600" : "bg-blue-gradient"
            )}
            style={{ 
              width: `${(quest.progress / quest.requiredProgress) * 100}%`,
              '--progress-width': `${(quest.progress / quest.requiredProgress) * 100}%`
            } as any}
          />
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center text-solo-blue-light">
          <Award className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">{quest.xpReward} XP</span>
        </div>
        
        {!quest.completed ? (
          <button 
            className="solo-button py-1 px-4 text-sm border border-solo-blue/50"
            onClick={() => onComplete(quest.id)}
            disabled={quest.progress < quest.requiredProgress}
          >
            {quest.progress >= quest.requiredProgress ? "Complete" : "In Progress"}
          </button>
        ) : (
          <div className="text-green-500 text-sm font-medium flex items-center">
            <span className="mr-1">Completed</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default QuestCard;
