import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHabitContext } from '@/context/HabitContext';
import { Home, Award, Zap, Sword, Shield, Scroll, Plus, Sparkles, Gem, Trophy, Crown, Skull, Target, Compass, Swords } from 'lucide-react';
import { toast } from 'sonner';
import HabitCard from '@/components/ui-custom/HabitCard';
import EnhancedQuestCard from '@/components/ui-custom/EnhancedQuestCard';
import StatusPanel from '@/components/ui-custom/StatusPanel';
import EnhancedRewardNotification from '@/components/ui-custom/EnhancedRewardNotification';
import WelcomeScreen from '@/components/ui-custom/WelcomeScreen';
import EnhancedActiveMissionCard from '@/components/ui-custom/EnhancedActiveMissionCard';
import { playSound, SOUNDS } from '@/utils/sound';
import RankBadge from '@/components/ui-custom/RankBadge';
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";

const Index = () => {
  const { activeHabits, quests, stats, completeHabit, completeQuest, resetAllData, userProfile, getCurrentDayOfWeek } = useHabitContext();
  const currentDay = getCurrentDayOfWeek();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [showReward, setShowReward] = useState(false);
  const [rewardData, setRewardData] = useState({ title: '', xp: 0 });
  const [showWelcome, setShowWelcome] = useState(false);
  const [activeTab, setActiveTab] = useState('habits');
  
  useEffect(() => {
    // Check if this is the first visit
    const isFirstVisit = !localStorage.getItem('visited');
    if (isFirstVisit) {
      setShowWelcome(true);
      localStorage.setItem('visited', 'true');
    }
  }, []);

  const handleCompleteHabit = (habitId: string) => {
    completeHabit(habitId);
    playSound(SOUNDS.COMPLETE, 0.4);
    // Show reward notification
    setRewardData({
      title: 'Habit Completed!',
      xp: 20
    });
    setShowReward(true);
    
    // Hide after 3 seconds
    setTimeout(() => {
      setShowReward(false);
    }, 3000);
    
    toast.success('Habit completed! +20 XP', {
      description: 'Your streak has increased. Keep it up!',
      duration: 3000,
    });
  };

  const handleCompleteQuest = (questId: string) => {
    completeQuest(questId);
    playSound(SOUNDS.REWARD, 0.5);
    
    // Show reward notification
    setRewardData({
      title: 'Quest Completed!',
      xp: 50
    });
    setShowReward(true);
    
    // Hide after 3 seconds
    setTimeout(() => {
      setShowReward(false);
    }, 3000);
    
    toast.success('Quest completed! +50 XP', {
      description: 'You have earned rewards for your efforts!',
      duration: 3000,
    });
  };
  
  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    playSound(SOUNDS.LEVEL_UP, 0.4);
    toast.success('Welcome, Hunter!', {
      description: 'Start your journey by completing quests and battling monsters.',
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    playSound(SOUNDS.BUTTON, 0.2);
  };

  return (
    <div className="min-h-screen bg-solo-darker text-white" 
         style={{backgroundImage: "radial-gradient(circle at 50% 0%, rgba(46, 107, 255, 0.15) 0%, rgba(15, 20, 33, 0) 50%)", backgroundAttachment: "fixed"}}>
      {/* Top status panel with customize button */}
      <div className="border-b border-solo-blue/30 bg-solo-dark p-4 shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
        <div className="flex justify-between items-center">
          <StatusPanel stats={stats} />
          <Button
            onClick={() => {
              playSound(SOUNDS.BUTTON, 0.3);
              window.location.href = "/customize-images";
            }}
            variant="outline"
            className="bg-solo-blue/10 hover:bg-solo-blue/20 ml-4 shadow-blue-glow"
          >
            <Image className="w-4 h-4 mr-2" />
            Customize
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-4 pb-20"
      >
        {/* Active Mission (if any) */}
        {userProfile.activeMission && (
          <div className="mb-6">
            <EnhancedActiveMissionCard mission={userProfile.activeMission} />
          </div>
        )}
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="glass-panel p-4 border-2 border-solo-blue/40 shadow-[0_0_20px_rgba(46,107,255,0.3)]">
          <TabsList className="grid w-full grid-cols-3 mb-4 bg-solo-darker border-2 border-solo-blue/30 p-0.5">
            <TabsTrigger value="habits" className="text-lg data-[state=active]:bg-solo-blue/30 data-[state=active]:text-white text-gray-400 px-2 py-1.5">
              <Zap className="mr-2 inline-block" size={18} />
              Habits
            </TabsTrigger>
            <TabsTrigger value="quests" className="text-lg data-[state=active]:bg-solo-blue/30 data-[state=active]:text-white text-gray-400 px-2 py-1.5">
              <Scroll className="mr-2 inline-block" size={18} />
              Quests
            </TabsTrigger>
            <TabsTrigger value="rewards" className="text-lg data-[state=active]:bg-solo-blue/30 data-[state=active]:text-white text-gray-400 px-2 py-1.5">
              <Trophy className="mr-2 inline-block" size={18} />
              Rewards
            </TabsTrigger>
          </TabsList>
          
          {/* Habits Tab */}
          <TabsContent value="habits" className="space-y-4 min-h-[500px]">
            {/* Heading removed */}
            {activeHabits.length === 0 ? (
              <div className="text-center py-10">
                {activeHabits.length === 0 ? (
                  <>
                    <p className="text-gray-400 mb-4">No habits added yet</p>
                    <Link to="/habits/new" className="text-solo-blue hover:text-solo-blue-light transition-colors">
                      Add your first habit
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="text-gray-400 mb-4">No active habits</p>
                    <p className="text-sm text-gray-500">Your habits will appear here</p>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {activeHabits.map(habit => (
                  <HabitCard 
                    key={habit.id} 
                    habit={habit} 
                    onComplete={() => handleCompleteHabit(habit.id)} 
                  />
                ))}
              </div>
            )}
            
            {activeHabits.length > 0 && (
              <Link to="/habits/new" className="solo-button block w-full text-center shadow-[0_0_10px_rgba(46,107,255,0.3)] border border-solo-blue/50" onClick={() => playSound(SOUNDS.BUTTON, 0.2)}>
                <Plus className="mr-2 inline-block" size={18} />
                Add New Habit
              </Link>
            )}
          </TabsContent>
          
          {/* Quests Tab */}
          <TabsContent value="quests" className="space-y-4 min-h-[500px]">
            <div className="grid grid-cols-1 gap-4">
              {quests.length === 0 ? (
                <div className="text-center py-8 glass-panel border-2 border-solo-blue/30">
                  <Scroll className="w-16 h-16 mx-auto mb-3 text-solo-blue opacity-50" />
                  <p className="text-gray-400 mb-3">No quests available yet.</p>
                  <Link to="/quests/new" className="solo-button inline-flex items-center shadow-[0_0_15px_rgba(46,107,255,0.4)] border border-solo-blue/50" onClick={() => playSound(SOUNDS.BUTTON, 0.2)}>
                    <Plus className="mr-2" size={18} />
                    Create New Quest
                  </Link>
                </div>
              ) : (
                quests.map(quest => (
                  <EnhancedQuestCard 
                    key={quest.id} 
                    quest={quest} 
                    onComplete={() => handleCompleteQuest(quest.id)} 
                  />
                ))
              )}
              
              {quests.length > 0 && (
                <Link to="/quests/new" className="solo-button block w-full text-center shadow-[0_0_15px_rgba(46,107,255,0.4)] border border-solo-blue/50" onClick={() => playSound(SOUNDS.BUTTON, 0.2)}>
                  <Plus className="mr-2 inline-block" size={18} />
                  Add New Quest
                </Link>
              )}
            </div>
          </TabsContent>
          
          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-4 min-h-[500px]">
            <div className="border-2 border-amber-500/30 p-4 mb-4 shadow-[0_0_15px_rgba(245,158,11,0.3)] bg-gradient-to-b from-amber-950/30 to-solo-darker rounded-md">
              <h3 className="text-xl font-bold mb-3 flex items-center text-amber-400">
                <Crown className="mr-2 text-amber-400" />
                Hunter Stats
              </h3>
              
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="glass-panel p-3 border-2 border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                  <div className="flex items-center text-red-400">
                    <Sword className="mr-2" size={16} />
                    <span>STR</span>
                  </div>
                  <div className="text-xl font-semibold mt-1">
                    {stats.level * 2 + 9}
                  </div>
                </div>
                
                <div className="glass-panel p-3 border-2 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  <div className="flex items-center text-blue-400">
                    <Shield className="mr-2" size={16} />
                    <span>VIT</span>
                  </div>
                  <div className="text-xl font-semibold mt-1">
                    {stats.dayStreak + 5}
                  </div>
                </div>
                
                <div className="glass-panel p-3 border-2 border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                  <div className="flex items-center text-green-400">
                    <Zap className="mr-2" size={16} />
                    <span>AGI</span>
                  </div>
                  <div className="text-xl font-semibold mt-1">
                    {Math.floor(stats.completionRate / 10) + 5}
                  </div>
                </div>
                
                <div className="flex flex-col glass-panel p-3 border-2 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                  <div className="flex items-center text-amber-400">
                    <Trophy className="mr-2" size={16} />
                    <span>RANK</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <RankBadge 
                      rank={stats.level < 5 ? 'E' : stats.level < 10 ? 'D' : stats.level < 15 ? 'C' : stats.level < 20 ? 'B' : stats.level < 30 ? 'A' : 'S'} 
                      size="sm" 
                    />
                    <span className="ml-2">Hunter</span>
                  </div>
                </div>
              </div>
              
              {/* Combat tracking */}
              <div className="mt-4 p-3 border-2 border-purple-500/30 rounded-md bg-solo-darker/80">
                <h4 className="text-md font-semibold text-purple-400 mb-2">Combat Tracking</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monsters Defeated</span>
                    <span className="text-white">{Math.floor(stats.totalCompletions / 3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Missions Completed</span>
                    <span className="text-white">{userProfile.completedMissions?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Daily Streak</span>
                    <span className="text-white">{stats.dayStreak} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total XP</span>
                    <span className="text-white">{stats.level * stats.xpToNextLevel + stats.xp}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-panel p-4 border-2 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <h3 className="text-xl font-bold mb-3 flex items-center text-amber-400">
                <Gem className="mr-2 text-amber-400" />
                Collected Artifacts
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                {stats.level >= 1 && (
                  <motion.div 
                    className="glass-panel p-3 border-2 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-shadow"
                    whileHover={{ y: -5 }}
                  >
                    <img 
                      src="https://i.imgur.com/c3boGYO.png" 
                      alt="Sacred Sword"
                      className="w-full h-auto object-contain mb-2"
                      style={{ maxHeight: '100px' }}
                    />
                    <p className="text-sm text-blue-400 font-medium">Iron Dagger</p>
                    <p className="text-xs text-gray-400">Unlocked at Level 1</p>
                  </motion.div>
                )}
                
                {stats.level >= 3 && (
                  <motion.div 
                    className="glass-panel p-3 border-2 border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-shadow"
                    whileHover={{ y: -5 }}
                  >
                    <img 
                      src="https://i.imgur.com/Z9RCuhs.png" 
                      alt="Magic Staff"
                      className="w-full h-auto object-contain mb-2"
                      style={{ maxHeight: '100px' }}
                    />
                    <p className="text-sm text-purple-400 font-medium">Magic Staff</p>
                    <p className="text-xs text-gray-400">Unlocked at Level 3</p>
                  </motion.div>
                )}
                
                {stats.level >= 5 && (
                  <motion.div 
                    className="glass-panel p-3 border-2 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-shadow"
                    whileHover={{ y: -5 }}
                  >
                    <img 
                      src="https://i.imgur.com/OtylzYc.png" 
                      alt="Golden Shield"
                      className="w-full h-auto object-contain mb-2"
                      style={{ maxHeight: '100px' }}
                    />
                    <p className="text-sm text-amber-400 font-medium">Golden Shield</p>
                    <p className="text-xs text-gray-400">Unlocked at Level 5</p>
                  </motion.div>
                )}
                
                {/* Locked items */}
                <div className="glass-panel p-3 border-2 border-gray-500/40 opacity-60">
                  <div className="w-full h-[100px] flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-gray-500 opacity-50" />
                  </div>
                  <p className="text-sm text-gray-400 font-medium">Unknown Artifact</p>
                  <p className="text-xs text-gray-500">Unlock at Level 10</p>
                </div>
                
                <div className="glass-panel p-3 border-2 border-gray-500/40 opacity-60">
                  <div className="w-full h-[100px] flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-gray-500 opacity-50" />
                  </div>
                  <p className="text-sm text-gray-400 font-medium">Unknown Artifact</p>
                  <p className="text-xs text-gray-500">Unlock at Level 15</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
      
      {/* Solo Leveling style bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-solo-darker border-t-2 border-solo-blue/40 flex justify-around items-center p-3 z-10 shadow-[0_-5px_20px_rgba(0,0,0,0.4)]">
        <button 
          onClick={() => handleTabChange('habits')}
          className={`p-2 rounded-full ${activeTab === 'habits' ? 'text-solo-blue' : 'text-gray-400'} hover:bg-solo-dark/50 transition-colors`}
        >
          <Zap size={26} className={activeTab === 'habits' ? 'animate-pulse-glow' : ''} />
        </button>
        
        <button 
          onClick={() => handleTabChange('quests')}
          className={`p-2 rounded-full ${activeTab === 'quests' ? 'text-solo-blue' : 'text-gray-400'} hover:bg-solo-dark/50 transition-colors`}
        >
          <Scroll size={26} className={activeTab === 'quests' ? 'animate-pulse-glow' : ''} />
        </button>
        
        <Link 
          to="/dungeon" 
          className="p-3.5 bg-gradient-to-br from-rose-600 to-rose-900 rounded-full text-white shadow-[0_0_20px_rgba(244,63,94,0.5)] border-2 border-rose-500/50 hover:shadow-[0_0_25px_rgba(244,63,94,0.7)] transition-shadow"
          onClick={() => playSound(SOUNDS.BUTTON, 0.2)}
        >
          <Swords size={26} />
        </Link>
        
        <button 
          onClick={() => handleTabChange('rewards')}
          className={`p-2 rounded-full ${activeTab === 'rewards' ? 'text-solo-blue' : 'text-gray-400'} hover:bg-solo-dark/50 transition-colors`}
        >
          <Trophy size={26} className={activeTab === 'rewards' ? 'animate-pulse-glow' : ''} />
        </button>
        
        <Link 
          to="/profile" 
          className="p-2 rounded-full text-gray-400 hover:bg-solo-dark/50 transition-colors"
          onClick={() => playSound(SOUNDS.BUTTON, 0.2)}
        >
          <Crown size={26} />
        </Link>
      </div>
      
      {showReward && (
        <EnhancedRewardNotification 
          title={rewardData.title} 
          xp={rewardData.xp} 
          message="Keep up the good work, Hunter!" 
          onClose={() => setShowReward(false)} 
        />
      )}
      
      {showWelcome && (
        <WelcomeScreen 
          onComplete={handleWelcomeComplete}
          onReset={resetAllData}
        />
      )}
    </div>
  );
};

export default Index;
