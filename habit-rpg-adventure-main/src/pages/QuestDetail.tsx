
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useHabitContext } from '@/context/HabitContext';
import { ArrowLeft, Clock, X, Trophy, Check } from 'lucide-react';
import { toast } from 'sonner';

const QuestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { quests, completeQuest } = useHabitContext();
  const navigate = useNavigate();
  const [quest, setQuest] = useState<any>(null);
  
  useEffect(() => {
    if (id) {
      const foundQuest = quests.find(q => q.id === id);
      if (foundQuest) {
        setQuest(foundQuest);
      } else {
        navigate('/');
        toast.error('Quest not found');
      }
    }
  }, [id, quests, navigate]);
  
  if (!quest) {
    return (
      <div className="min-h-screen bg-solo-darker text-white flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">Loading...</div>
          <Link to="/" className="text-solo-blue hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
  
  // Calculate time remaining if this is a timed quest
  const getTimeRemaining = () => {
    if (!quest.expiresAt) return null;
    
    const expireDate = new Date(quest.expiresAt);
    const now = new Date();
    const diffMs = expireDate.getTime() - now.getTime();
    
    if (diffMs <= 0) return 'Expired';
    
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHrs}h ${diffMins}m`;
  };
  
  return (
    <div className="min-h-screen bg-solo-darker text-white p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-md"
      >
        {/* Header */}
        <div className="border border-solo-blue/30 bg-solo-dark p-4 mb-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-solo-blue hover:opacity-80">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-lg font-bold text-center text-solo-blue-light">
              QUEST INFO
            </h1>
            <X size={24} className="text-solo-blue hover:opacity-80 cursor-pointer" onClick={() => navigate('/')} />
          </div>
        </div>
        
        {/* Quest title and description */}
        <div className="border border-solo-blue/30 bg-solo-dark p-4 mb-4">
          <h2 className="text-xl font-bold text-solo-blue-light mb-2">{quest.title}</h2>
          <p className="text-gray-300 mb-4">{quest.description}</p>
          
          {quest.expiresAt && (
            <div className="flex items-center text-amber-400 mb-4">
              <Clock size={16} className="mr-2" />
              <span className="text-sm">{getTimeRemaining()} remaining</span>
            </div>
          )}
          
          <div className="flex items-center text-gray-300 mb-2">
            <Trophy size={16} className="mr-2 text-yellow-400" />
            <span className="text-sm">Reward: {quest.xpReward} XP</span>
          </div>
        </div>
        
        {/* Quest goals */}
        <div className="border border-solo-blue/30 bg-solo-dark p-4 mb-4">
          <h3 className="text-lg font-bold mb-4">GOALS</h3>
          
          <div className="space-y-4">
            {quest.habitIds.map((habitId: string, index: number) => {
              const habit = quests.find(q => q.id === habitId) || { title: `Task ${index + 1}`, progress: 0, requiredProgress: 10 };
              
              return (
                <div key={habitId} className="flex justify-between items-center">
                  <div>
                    <p className="text-white">{habit.title || `Task ${index + 1}`}</p>
                    <div className="flex items-center mt-1">
                      <div className="h-1 w-20 bg-solo-gray/50 rounded-full overflow-hidden mr-2">
                        <div 
                          className="h-full bg-solo-blue"
                          style={{ width: `${(quest.progress / quest.requiredProgress) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">
                        {quest.progress}/{quest.requiredProgress}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {!quest.habitIds.length && (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white">Complete quest</p>
                  <div className="flex items-center mt-1">
                    <div className="h-1 w-20 bg-solo-gray/50 rounded-full overflow-hidden mr-2">
                      <div 
                        className="h-full bg-solo-blue"
                        style={{ width: `${(quest.progress / quest.requiredProgress) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">
                      {quest.progress}/{quest.requiredProgress}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6 text-sm text-red-400">
            Failing to complete this quest before the time limit is up could reduce
            rewards.
          </div>
        </div>
        
        {/* Complete button */}
        <button 
          onClick={() => {
            if (quest.progress >= quest.requiredProgress && !quest.completed) {
              completeQuest(quest.id);
              navigate('/');
              toast.success('Quest completed!', {
                description: `You've earned ${quest.xpReward} XP!`
              });
            } else if (quest.completed) {
              toast.error('Quest already completed');
            } else {
              toast.error('Progress not sufficient to complete quest');
            }
          }}
          className={`solo-button w-full flex items-center justify-center ${
            quest.progress < quest.requiredProgress || quest.completed ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={quest.progress < quest.requiredProgress || quest.completed}
        >
          <Check className="mr-2" size={18} />
          {quest.completed ? 'Already Completed' : 'Complete Quest'}
        </button>
      </motion.div>
    </div>
  );
};

export default QuestDetail;
