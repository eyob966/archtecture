import React, { useState, useEffect } from 'react';
import { useHabitContext } from '@/context/HabitContext';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Habit } from '@/types';
import { applyGlitchEffect, GlitchType } from '@/utils/glitchEffect';
import { 
  CheckCircle2, 
  Circle, 
  Moon, 
  Dumbbell, 
  Droplet, 
  Sparkles,
  MessageSquare,
  Flame,
  Beaker,
  Calendar,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { playSound, SOUNDS } from '@/utils/sound';

interface HabitCardProps {
  habit: Habit;
  onComplete: (habitId: string, value?: number) => void;
  className?: string;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onComplete, className }) => {
  const { getCurrentDayOfWeek } = useHabitContext();
  const [isCompleting, setIsCompleting] = useState(false);
  const [value, setValue] = useState(habit.completionGoal || 1);
  const currentDay = getCurrentDayOfWeek();
  const [isVisible, setIsVisible] = useState(true);
  const [hasPenalty, setHasPenalty] = useState(false);
  const [penaltyOverlay, setPenaltyOverlay] = useState<HTMLElement | null>(null);
  
  const isCompletedToday = () => {
    const today = new Date().toISOString().split('T')[0];
    return habit.completedDates.includes(today);
  };
  
  const getHabitIcon = () => {
    switch (habit.category) {
      case 'sleep':
        return <Moon className="w-5 h-5" />;
      case 'workout':
        return <Dumbbell className="w-5 h-5" />;
      case 'hygiene':
        return <Droplet className="w-5 h-5" />;
      case 'skincare':
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Circle className="w-5 h-5" />;
    }
  };
  
  const handleCompleteClick = () => {
    if (habit.completionGoal) {
      setIsCompleting(true);
    } else {
      // Apply glitch effect when completing a habit
      const cardElement = document.getElementById(`habit-${habit.id}`);
      if (cardElement) {
        applyGlitchEffect(cardElement, GlitchType.MILD, 800);
      }
      
      // If this is completing a penalty, play a different sound
      if (hasPenalty) {
        playSound(SOUNDS.LEVEL_UP, 0.5);
        setHasPenalty(false);
        
        // Remove penalty logic and complete button for habits
        const cardElement = document.getElementById(`habit-${habit.id}`);
        if (cardElement) {
          setPenaltyOverlay(null);
        }
      } else {
        playSound(SOUNDS.COMPLETE, 0.4);
      }
      
      onComplete(habit.id);
    }
  };
  
  const handleSubmitValue = () => {
    // Apply glitch effect when submitting a value
    const cardElement = document.getElementById(`habit-${habit.id}`);
    if (cardElement) {
      applyGlitchEffect(cardElement, GlitchType.MILD, 800);
    }
    
    // If this is completing a penalty, play a different sound
    if (hasPenalty) {
      playSound(SOUNDS.LEVEL_UP, 0.5);
      setHasPenalty(false);
      
      // Remove penalty logic and complete button for habits
      const cardElement = document.getElementById(`habit-${habit.id}`);
      if (cardElement) {
        setPenaltyOverlay(null);
      }
    } else {
      playSound(SOUNDS.COMPLETE, 0.4);
    }
    
    onComplete(habit.id, value);
    setIsCompleting(false);
  };
  
  // Check if this habit should be shown today based on activeDays
  const shouldShowToday = () => {
    // If no activeDays specified, show every day
    if (!habit.activeDays || habit.activeDays.length === 0) {
      return true;
    }
    
    // Days are 0-indexed (0 = Sunday, 1 = Monday, etc.)
    const today = new Date().getDay();
    return habit.activeDays.includes(today);
  };

  // Check if habit should be visible today
  React.useEffect(() => {
    setIsVisible(shouldShowToday());
  }, [currentDay]);
  
  // Check if this habit has a penalty (missed completion)
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    // If the habit was active yesterday but not completed, and it's not completed today yet
    const shouldHavePenalty = () => {
      // If it's already completed today, no penalty
      if (habit.completedDates.includes(today)) {
        return false;
      }
      
      // Check if it was active yesterday
      if (!habit.activeDays || habit.activeDays.length === 0) {
        // Daily habit, should have been done yesterday
        return !habit.completedDates.includes(yesterdayStr);
      } else {
        // Check if it was scheduled for yesterday
        const yesterdayDay = yesterday.getDay();
        return habit.activeDays.includes(yesterdayDay) && !habit.completedDates.includes(yesterdayStr);
      }
    };
    
    // Apply penalty if needed
    if (shouldHavePenalty() && !hasPenalty) {
      setHasPenalty(true);
      
      // Apply the penalty glitch effect with a persistent overlay
      const cardElement = document.getElementById(`habit-${habit.id}`);
      if (cardElement) {
        const penaltyMessage = `You missed your "${habit.name}" habit yesterday. Complete it now to continue.`;
        const overlay = applyGlitchEffect(cardElement, GlitchType.SEVERE, 3000);
        if (overlay !== null && overlay !== undefined) {
          setPenaltyOverlay((overlay as unknown) as HTMLElement);
          
          // Play penalty sound
          playSound(SOUNDS.ERROR, 0.5);
        }
      }
    }
  }, [habit.id, habit.completedDates]);

  const completed = isCompletedToday();

  // Don't render if this habit is not scheduled for today
  if (!isVisible) {
    return null;
  }
  
  return (
    <motion.div 
      id={`habit-${habit.id}`}
      className={cn(
        "glass-panel hover-card p-4",
        completed ? "border-2 border-green-600/40 shadow-[0_0_10px_rgba(22,163,74,0.2)]" : "border-2 border-solo-blue/40 shadow-[0_0_10px_rgba(46,107,255,0.2)]",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -5 }}
      data-text={habit.name}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center mr-2 border",
            completed 
              ? "bg-green-600/20 text-green-500 border-green-500/40 shadow-[0_0_5px_rgba(22,163,74,0.3)]" 
              : `bg-solo-blue/20 text-solo-blue border-solo-blue/40 shadow-[0_0_5px_rgba(46,107,255,0.3)]`
          )}>
            {getHabitIcon()}
          </div>
          <h3 className="font-medium">{habit.name}</h3>
        </div>
        
        {habit.streak > 0 && (
          <div className="flex items-center text-amber-500 bg-amber-500/10 px-2 py-1 rounded text-xs border border-amber-500/20">
            <Flame className="w-3 h-3 mr-1" />
            <span>{habit.streak}</span>
          </div>
        )}
      </div>
      
      <p className="text-sm text-muted-foreground mb-2 ml-12">
        {habit.description}
      </p>
      
      {habit.activeDays && habit.activeDays.length > 0 && (
        <div className="flex items-center ml-12 mb-2 text-xs text-muted-foreground">
          <Calendar className="w-3.5 h-3.5 mr-1.5" />
          <span>
            Active on: {habit.activeDays.map(day => {
              const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
              return days[day];
            }).join(', ')}
          </span>
        </div>
      )}
      
      {!isCompleting ? (
        <div className="flex justify-between items-center">
          <div className="flex items-center text-solo-blue-light ml-12">
            <Beaker className="w-4 h-4 mr-1.5" />
            <span className="text-sm font-medium">+1 XP</span>
          </div>
          
          {!completed ? (
            <button 
              className="solo-button py-1 px-4 text-sm shadow-[0_0_5px_rgba(46,107,255,0.3)] hover:shadow-[0_0_10px_rgba(46,107,255,0.4)]"
              onClick={handleCompleteClick}
            >
              Complete
            </button>
          ) : (
            <div className="text-green-500 text-sm font-medium flex items-center">
              <span className="mr-1">Completed</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
          )}
        </div>
      ) : (
        <div className="ml-12 mt-3">
          <div className="text-sm mb-2">Enter value:</div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              max={habit.completionGoal || 100}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="bg-solo-dark border border-solo-blue/30 rounded px-3 py-1 w-20 text-center text-white"
            />
            {habit.completionGoal && (
              <span className="text-sm text-muted-foreground">/ {habit.completionGoal}</span>
            )}
            <button 
              className="solo-button py-1 px-3 text-sm shadow-[0_0_5px_rgba(46,107,255,0.3)] hover:shadow-[0_0_10px_rgba(46,107,255,0.4)]"
              onClick={handleSubmitValue}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default HabitCard;
function addXP(xpReward: number) {
  throw new Error('Function not implemented.');
}

