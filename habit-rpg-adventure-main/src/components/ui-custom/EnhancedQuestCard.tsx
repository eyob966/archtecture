import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Quest } from '@/types';
import { Scroll, Clock, Award, Sword, Shield, Sparkles, AlertTriangle, ImageIcon, Skull } from 'lucide-react';
import { playSound, SOUNDS } from '@/utils/sound';
import { applyGlitchEffect, applyPenaltyGlitch, GlitchType } from '@/utils/glitchEffect';

interface EnhancedQuestCardProps {
  quest: Quest;
  onComplete: (questId: string) => void;
  className?: string;
}

const EnhancedQuestCard: React.FC<EnhancedQuestCardProps> = ({ quest, onComplete, className }) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isExpiring, setIsExpiring] = useState(false);
  const [monsterImage, setMonsterImage] = useState<string | null>(null);
  const [hasPenalty, setHasPenalty] = useState<boolean>(!!quest.penalty);

  useEffect(() => {
    if (quest.expiresAt) {
      const updateTimer = () => {
        const expiryDate = new Date(quest.expiresAt as string);
        const now = new Date();
        const diffMs = expiryDate.getTime() - now.getTime();
        
        if (diffMs <= 0) {
          setTimeRemaining('Expired');
          setIsExpiring(false);
          return;
        }
        
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);
        
        setTimeRemaining(
          `${diffHrs.toString().padStart(2, '0')}:${diffMins.toString().padStart(2, '0')}:${diffSecs.toString().padStart(2, '0')}`
        );
        
        setIsExpiring(diffHrs < 1);
      };
      
      updateTimer();
      
      const interval = setInterval(updateTimer, 1000);
      
      return () => clearInterval(interval);
    }
  }, [quest.expiresAt]);

  useEffect(() => {
    // Check for custom monster image in localStorage
    const customImages = localStorage.getItem('customImages');
    if (customImages) {
      const parsedImages = JSON.parse(customImages);
      if (parsedImages.monster) {
        setMonsterImage(parsedImages.monster);
      }
    }
  }, []);

  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleClearPenalty = () => {
    

    // Remove penalty overlay if it exists
    if (penaltyOverlay && document.body.contains(penaltyOverlay)) {
      penaltyOverlay.classList.add('fade-out');
      setTimeout(() => {
        if (document.body.contains(penaltyOverlay)) {
          document.body.removeChild(penaltyOverlay);
        }
      }, 500);
      setPenaltyOverlay(null);
    
   
    };

    // Apply glitch effect when completing a quest
    if (cardRef.current) {
      applyGlitchEffect(cardRef.current, GlitchType.MEDIUM, 1000);
    }

    playSound(SOUNDS.COMPLETE, 0.4);
    onComplete(quest.id);

    // Ensure penalty is cleared
    setHasPenalty(false);
    setTimeRemaining(''); // Clear time remaining to avoid re-triggering penalty logic
  };
  
  // Apply penalty glitch effect when quest is expired and not completed
  // Store the overlay reference to remove it when quest is completed
  const [penaltyOverlay, setPenaltyOverlay] = useState<HTMLElement | null>(null);
  
  useEffect(() => {
    // Show persistent penalty when quest is expired and not completed
    if (quest.expiresAt && !quest.completed && timeRemaining === 'Expired' && quest.penalty && cardRef.current) {
      setTimeout(() => {
        const overlay = applyPenaltyGlitch(cardRef.current, quest.penalty || 'Quest Failed!', 0, true);
        setPenaltyOverlay(overlay as HTMLElement);
        playSound(SOUNDS.GLITCH, 0.6);

        // Add a complete button for the penalty in quests
        if (overlay && document.body.contains(overlay)) {
          const completeButton = document.createElement('button');
          completeButton.className = 'penalty-complete-button';
          completeButton.innerText = 'COMPLETE';
          completeButton.onclick = () => {
            playSound(SOUNDS.BUTTON, 0.4);
            if (penaltyOverlay && document.body.contains(penaltyOverlay)) {
              penaltyOverlay.classList.add('fade-out');
              setTimeout(() => {
                if (document.body.contains(penaltyOverlay)) {
                  document.body.removeChild(penaltyOverlay);
                }
              }, 500);
              setPenaltyOverlay(null);
            }
          };
          const penaltyContent = overlay.querySelector('.penalty-content');
          if (penaltyContent) {
            penaltyContent.appendChild(completeButton);
          }
        }
      }, 500);
    }
    
    // Clean up penalty overlay when component unmounts
    return () => {
      if (penaltyOverlay && document.body.contains(penaltyOverlay)) {
        document.body.removeChild(penaltyOverlay);
      }
    };
  }, [timeRemaining, quest.completed, quest.expiresAt, quest.penalty]);
  
  // Remove penalty overlay when quest is completed
  useEffect(() => {
    if (quest.completed && penaltyOverlay && document.body.contains(penaltyOverlay)) {
      penaltyOverlay.classList.add('fade-out');
      setTimeout(() => {
        if (document.body.contains(penaltyOverlay)) {
          document.body.removeChild(penaltyOverlay);
        }
      }, 500);
      setPenaltyOverlay(null);
    }
  }, [quest.completed, penaltyOverlay]);

  return (
    <motion.div 
      ref={cardRef}
      className={cn(
        "glass-panel hover-card border-2 p-4",
        quest.completed 
          ? "border-green-600/40 shadow-[0_0_15px_rgba(22,163,74,0.3)]" 
          : isExpiring 
            ? "border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.4)]" 
            : "border-solo-blue/40 shadow-[0_0_15px_rgba(46,107,255,0.3)]",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 0 20px rgba(46,107,255,0.4)",
        y: -5
      }}
      data-text={quest.title}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center mr-3 border",
            quest.completed 
              ? "bg-green-600/20 text-green-500 shadow-[0_0_10px_rgba(22,163,74,0.5)] border-green-500/40" 
              : isExpiring
                ? "bg-amber-500/20 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)] border-amber-400/40"
                : "bg-solo-blue/20 text-solo-blue shadow-[0_0_10px_rgba(46,107,255,0.5)] border-solo-blue/40"
          )}>
            <Scroll className="w-4 h-4" />
          </div>
          <h3 className="font-medium text-white text-lg">{quest.title}</h3>
        </div>
        
        {quest.expiresAt && (
          <div className={cn(
            "text-xs font-medium px-3 py-1.5 rounded-md flex items-center border",
            isExpiring && !quest.completed 
              ? "bg-amber-500/20 text-amber-400 border-amber-500/40 animate-pulse" 
              : "bg-solo-gray/30 text-muted-foreground border-solo-gray/20"
          )}>
            <Clock className="w-3 h-3 mr-1.5" />
            {timeRemaining}
          </div>
        )}
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        {quest.description}
      </p>
      
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="flex items-center">
            <Sword className="w-3 h-3 mr-1 text-solo-blue" />
            <span>Progress</span>
          </span>
          <span>{quest.progress}/{quest.requiredProgress}</span>
        </div>
        <div className="h-2 bg-solo-dark rounded-full overflow-hidden border border-solo-gray/20">
          <div 
            className={cn(
              "h-full rounded-full",
              quest.completed 
                ? "bg-gradient-to-r from-green-500 to-green-700" 
                : "bg-gradient-to-r from-solo-blue to-blue-700"
            )}
            style={{ 
              width: `${(quest.progress / quest.requiredProgress) * 100}%`,
            }}
          >
            <div className="w-full h-full opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InN0cmlwZS1wYXR0ZXJuIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSI0MCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjgiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjc3RyaXBlLXBhdHRlcm4pIiAvPjwvc3ZnPg==')]"></div>
          </div>
        </div>
      </div>
      
      {isExpiring && !quest.completed && (
        <div className="mb-3 p-2 bg-amber-900/20 border border-amber-500/30 rounded-md flex items-center text-amber-400 text-xs">
          <AlertTriangle className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
          <span>This quest is expiring soon! Complete it to earn rewards.</span>
        </div>
      )}
      
      {!quest.completed && hasPenalty && (
  <div className="mb-3 p-2 bg-red-900/20 border border-red-500/30 rounded-md flex items-center text-red-400 text-xs animate-pulse">
    <AlertTriangle className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
    <span>Penalty if not completed: {quest.penalty}</span>
    <button
      className="ml-auto text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      onClick={handleClearPenalty}
    >
      Clear Penalty
    </button>
  </div>
)}
      
      <div className="flex justify-between items-center">
        {/* XP badge removed */}
        
        {!quest.completed ? (
          <button 
            className="flex items-center py-1.5 px-4 text-sm border rounded-md transition-all bg-solo-blue text-white border-solo-blue/50 shadow-[0_0_10px_rgba(46,107,255,0.4)] hover:shadow-[0_0_15px_rgba(46,107,255,0.6)]"
            onClick={handleClearPenalty}
          >
            <Award className="w-4 h-4 mr-1.5" />
            Complete
          </button>
        ) : (
          <div className="text-green-500 text-sm font-medium flex items-center">
            <Award className="w-4 h-4 mr-1.5" />
            <span>Completed</span>
          </div>
        )}
        
        {/* Monster icon or custom image */}
        <div className="bg-solo-darker p-2 rounded-md border border-solo-blue/30 shadow-blue-glow">
          {monsterImage ? (
            <div className="w-10 h-10 relative overflow-hidden rounded">
              <img 
                src={monsterImage} 
                alt="Monster" 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <Skull className="w-8 h-8 text-red-500" />
          )}
        </div>
      </div>
    </motion.div>
  );
 setHasPenalty(false);
};

export default EnhancedQuestCard;


