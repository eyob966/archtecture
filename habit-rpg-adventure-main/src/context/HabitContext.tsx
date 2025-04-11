import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  Habit, 
  HabitLog, 
  Quest, 
  Stats, 
  Notification,
  Achievement,
  HabitCategory,
  UserProfile,
  RewardItem,
  Title,
  DungeonMission,
  MonsterRank
} from '@/types';
import { toast } from 'sonner';
import { initialRewardItems, getRandomReward, getRewardById } from '@/data/rewardItems';
import { monsters, getMonsterById } from '@/data/monsters';

interface HabitContextType {
  habits: Habit[];
  activeHabits: Habit[]; // Filtered habits based on current day
  logs: HabitLog[];
  quests: Quest[];
  stats: Stats;
  notifications: Notification[];
  achievements: Achievement[];
  userProfile: UserProfile;
  completeHabit: (habitId: string, value?: number) => void;
  completeQuest: (questId: string) => void;
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'streak' | 'completedDates'>) => void;
  deleteHabit: (habitId: string) => void;
  updateHabit: (habit: Habit) => void;
  dismissNotification: (notificationId: string) => void;
  resetAllData: () => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  equipItem: (itemId: string) => void;
  unequipItem: (itemId: string) => void;
  isNewUser: boolean;
  setIsNewUser: (value: boolean) => void;
  startDungeonMission: (mission: DungeonMission) => void;
  completeMissionStep: (missionId: string, stepId: string) => void;
  completeDungeonMission: (missionId: string) => void;
  failDungeonMission: (missionId: string) => void;
  addQuest: (quest: Quest) => void;
  initializeUserProfile: (username: string) => void;
  getCurrentDayOfWeek: () => number; // Returns current day of week (0-6, Sunday-Saturday)
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

// Empty initial data for clean start
const emptyHabits: Habit[] = [];
const emptyQuests: Quest[] = [];
const emptyNotifications: Notification[] = [];
const emptyAchievements: Achievement[] = [];

// Initial stats with level 1
const initialEmptyStats: Stats = {
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  streakRecord: 0,
  totalCompletions: 0,
  completionRate: 0,
  categoriesProgress: {
    sleep: 0,
    workout: 0,
    hygiene: 0,
    skincare: 0,
    custom: 0
  },
  dayStreak: 0
};

// Calculate rank from level
const calculateRank = (level: number): MonsterRank => {
  if (level >= 40) return 'S';
  if (level >= 30) return 'A';
  if (level >= 20) return 'B';
  if (level >= 10) return 'C';
  if (level >= 5) return 'D';
  return 'E';
};

// Default user profile - Updated to include missing properties
const initialEmptyUserProfile: UserProfile = {
  username: 'New Hunter',
  stats: initialEmptyStats,
  achievements: [],
  inventory: [],
  equippedItems: {},
  joinedAt: new Date().toISOString(),
  rank: 'E',
  titles: [],
  completedMissions: []
};

// Sample data for demo purposes
const initialHabits: Habit[] = [
  {
    id: '1',
    name: 'Get 8 hours of sleep',
    category: 'sleep',
    description: 'Sleep at least 8 hours every night for better health',
    frequency: { type: 'daily', value: 1 },
    isActive: true,
    createdAt: new Date().toISOString(),
    streak: 3,
    completedDates: [],
    xpReward: 50,
    completionGoal: 8
  },
  {
    id: '2',
    name: 'Morning workout',
    category: 'workout',
    description: 'Do a 30-minute workout in the morning',
    frequency: { type: 'daily', value: 1 },
    isActive: true,
    createdAt: new Date().toISOString(),
    streak: 5,
    completedDates: [],
    xpReward: 100
  },
  {
    id: '3',
    name: 'Skincare routine',
    category: 'skincare',
    description: 'Complete evening skincare routine',
    frequency: { type: 'daily', value: 1 },
    isActive: true,
    createdAt: new Date().toISOString(),
    streak: 7,
    completedDates: [],
    xpReward: 30
  },
  {
    id: '4',
    name: 'Brush teeth twice',
    category: 'hygiene',
    description: 'Brush teeth in the morning and evening',
    frequency: { type: 'daily', value: 1 },
    isActive: true,
    createdAt: new Date().toISOString(),
    streak: 10,
    completedDates: [],
    xpReward: 20,
    completionGoal: 2
  }
];

const initialQuests: Quest[] = [
  {
    id: '1',
    title: 'Morning Routine Master',
    description: 'Complete all morning habits for 3 days in a row',
    habitIds: ['2', '4'],
    xpReward: 200,
    completed: false,
    type: 'daily',
    progress: 2,
    requiredProgress: 3,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    title: 'Sleep Champion',
    description: 'Get 8 hours of sleep for a week',
    habitIds: ['1'],
    xpReward: 300,
    completed: false,
    type: 'weekly',
    progress: 3,
    requiredProgress: 7,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Self-Care Expert',
    description: 'Complete your skincare routine for 5 days',
    habitIds: ['3'],
    xpReward: 150,
    completed: false,
    type: 'achievement',
    progress: 4,
    requiredProgress: 5,
    createdAt: new Date().toISOString()
  }
];

const initialStats: Stats = {
  level: 5,
  xp: 350,
  xpToNextLevel: 1000,
  streakRecord: 10,
  totalCompletions: 42,
  completionRate: 78,
  categoriesProgress: {
    sleep: 65,
    workout: 40,
    hygiene: 90,
    skincare: 75,
    custom: 30
  },
  dayStreak: 3
};

// Initial titles
const initialTitles: Title[] = [
  {
    id: 'title-1',
    name: 'Novice Hunter',
    description: 'A hunter who has just begun their journey.',
    rank: 'E',
    unlockedAt: new Date().toISOString()
  }
];

const initialAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Early Bird',
    description: 'Complete morning workout for 5 days in a row',
    icon: 'sunrise',
    tier: 'silver',
    progress: 5,
    requiredProgress: 5,
    xpReward: 200,
    unlockedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    title: 'Consistency King',
    description: 'Maintain a 7-day streak of any habit',
    icon: 'trending-up',
    tier: 'gold',
    progress: 7,
    requiredProgress: 7,
    xpReward: 300,
    unlockedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    title: 'Hygiene Hero',
    description: 'Complete all hygiene habits for 10 days',
    icon: 'droplet',
    tier: 'bronze',
    progress: 6,
    requiredProgress: 10,
    xpReward: 100
  }
];

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'Achievement Unlocked!',
    message: 'You\'ve earned the "Early Bird" achievement!',
    type: 'achievement',
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    title: 'Level Up!',
    message: 'Congratulations! You\'ve reached Level 5!',
    type: 'level-up',
    read: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  }
];

// Initial user profile with starter inventory items
const initialUserProfile: UserProfile = {
  username: 'Hunter',
  stats: initialStats,
  achievements: initialAchievements,
  inventory: initialRewardItems.slice(0, 3), // Give the first 3 reward items to start
  equippedItems: {
    'dagger': 'weapon-1' // Equip the starter dagger
  },
  joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  rank: calculateRank(5), // Calculate from level
  titles: initialTitles,
  completedMissions: []
};

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isNewUser, setIsNewUser] = useState<boolean>(true);
  const [habits, setHabits] = useState<Habit[]>(emptyHabits);
  const [logs, setLogs] = useState<HabitLog[]>([]);
  const [quests, setQuests] = useState<Quest[]>(emptyQuests);
  const [stats, setStats] = useState<Stats>(initialEmptyStats);
  const [notifications, setNotifications] = useState<Notification[]>(emptyNotifications);
  const [achievements, setAchievements] = useState<Achievement[]>(emptyAchievements);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialEmptyUserProfile);
  const [activeHabits, setActiveHabits] = useState<Habit[]>([]);

  const resetAllData = () => {
    setHabits(emptyHabits);
    setLogs([]);
    setQuests(emptyQuests);
    setStats(initialEmptyStats);
    setNotifications(emptyNotifications);
    setAchievements(emptyAchievements);
    setUserProfile(initialEmptyUserProfile);
    setIsNewUser(true);
    
    localStorage.removeItem('habits');
    localStorage.removeItem('logs');
    localStorage.removeItem('quests');
    localStorage.removeItem('stats');
    localStorage.removeItem('notifications');
    localStorage.removeItem('achievements');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('firstTimeUser');
    
    toast.success('All data has been reset', {
      description: 'You can now start fresh!'
    });
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    setUserProfile(prev => ({
      ...prev,
      ...data
    }));
  };

  const startDungeonMission = (mission: DungeonMission) => {
    if (userProfile.activeMission) {
      toast.error('You already have an active mission!');
      return;
    }
    
    if (userProfile.stats.level < mission.requiredLevel) {
      toast.error(`You need to be level ${mission.requiredLevel} to start this mission!`);
      return;
    }
    
    const updatedMission: DungeonMission = {
      ...mission,
      status: 'in_progress',
      steps: mission.steps.map((step, index) => {
        if (index === 0) {
          return {
            ...step,
            status: 'in_progress',
            startedAt: new Date().toISOString()
          };
        }
        return step;
      })
    };
    
    setUserProfile(prev => ({
      ...prev,
      activeMission: updatedMission
    }));
    
    toast.success('Mission started!', {
      description: 'Complete daily tasks to progress through the mission.'
    });
    
    addNotification({
      title: 'New Mission Started',
      message: `You've embarked on a new mission: "${mission.title}"`,
      type: 'achievement'
    });
  };
  
  const completeMissionStep = (missionId: string, stepId: string) => {
    if (!userProfile.activeMission || userProfile.activeMission.id !== missionId) {
      return;
    }
    
    const updatedMission = { ...userProfile.activeMission };
    const stepIndex = updatedMission.steps.findIndex(step => step.id === stepId);
    
    if (stepIndex === -1 || updatedMission.steps[stepIndex].status !== 'in_progress') {
      return;
    }
    
    const updatedSteps = [...updatedMission.steps];
    const step = { ...updatedSteps[stepIndex] };
    
    step.currentProgress += 1;
    
    if (step.currentProgress >= step.requiredDays) {
      step.status = 'completed';
      step.completedAt = new Date().toISOString();
      
      toast.success('Mission step completed!', {
        description: 'You\'re making progress toward defeating the monster.'
      });
      
      const nextStepIndex = updatedSteps.findIndex(s => s.status === 'not_started');
      if (nextStepIndex !== -1) {
        updatedSteps[nextStepIndex] = {
          ...updatedSteps[nextStepIndex],
          status: 'in_progress',
          startedAt: new Date().toISOString()
        };
      } else {
        updatedMission.status = 'completed';
        
        toast.success('Mission complete!', {
          description: 'You\'ve defeated the monster! Claim your rewards.'
        });
        
        completeDungeonMission(missionId);
        return;
      }
    } else {
      toast.success('Daily progress recorded!', {
        description: `${step.requiredDays - step.currentProgress} more days to complete this step.`
      });
    }
    
    updatedSteps[stepIndex] = step;
    updatedMission.steps = updatedSteps;
    
    setUserProfile(prev => ({
      ...prev,
      activeMission: updatedMission
    }));
  };
  
  const completeDungeonMission = (missionId: string) => {
    if (!userProfile.activeMission || userProfile.activeMission.id !== missionId) {
      return;
    }
    
    const mission = userProfile.activeMission;
    const monster = getMonsterById(mission.monsterId);
    
    if (!monster) {
      return;
    }
    
    const completedMission: DungeonMission = {
      ...mission,
      status: 'completed',
      completedAt: new Date().toISOString()
    };
    
    const rewardItems: RewardItem[] = [];
    monster.rewards.forEach(rewardId => {
      const reward = getRewardById(rewardId);
      if (reward && !userProfile.inventory.some(item => item.id === reward.id)) {
        rewardItems.push(reward);
      }
    });
    
    const newTitle: Title = {
      id: `title-${Date.now()}`,
      name: monster.title,
      description: `Earned by defeating ${monster.name}`,
      rank: monster.rank,
      unlockedAt: new Date().toISOString()
    };
    
    setUserProfile(prev => {
      const updatedInventory = [...prev.inventory];
      rewardItems.forEach(item => {
        if (!updatedInventory.some(i => i.id === item.id)) {
          updatedInventory.push(item);
        }
      });
      
      const updatedTitles = [...prev.titles];
      if (!updatedTitles.some(t => t.name === newTitle.name)) {
        updatedTitles.push(newTitle);
      }
      
      return {
        ...prev,
        activeMission: undefined,
        completedMissions: [...prev.completedMissions, completedMission],
        inventory: updatedInventory,
        titles: updatedTitles
      };
    });
    
    updateStats(mission.xpReward);
    
    addNotification({
      title: 'Mission Completed',
      message: `You've defeated ${monster.name} and completed the mission!`,
      type: 'achievement'
    });
    
    rewardItems.forEach(item => {
      addNotification({
        title: 'New Reward Unlocked!',
        message: `You've earned a ${item.rarity} ${item.type}: ${item.name}`,
        type: 'achievement'
      });
    });
    
    toast.success(`Mission "${mission.title}" completed!`, {
      description: `You've earned ${mission.xpReward} XP and ${rewardItems.length} new items!`
    });
  };
  
  const failDungeonMission = (missionId: string) => {
    if (!userProfile.activeMission || userProfile.activeMission.id !== missionId) {
      return;
    }
    
    const mission = userProfile.activeMission;
    
    const failedMission: DungeonMission = {
      ...mission,
      status: 'failed',
      failedAt: new Date().toISOString()
    };
    
    setUserProfile(prev => ({
      ...prev,
      activeMission: undefined,
      completedMissions: [...prev.completedMissions, failedMission]
    }));
    
    addNotification({
      title: 'Mission Failed',
      message: `You failed to complete the mission "${mission.title}" in time.`,
      type: 'achievement'
    });
    
    toast.error(`Mission "${mission.title}" failed!`, {
      description: 'The time limit has expired. Try again with a new mission.'
    });
  };

  const equipItem = (itemId: string) => {
    const item = userProfile.inventory.find(i => i.id === itemId);
    
    if (!item) {
      toast.error('Item not found in inventory');
      return;
    }
    
    if (item.requiredLevel && userProfile.stats.level < item.requiredLevel) {
      toast.error(`You need to be level ${item.requiredLevel} to equip this item`);
      return;
    }
    
    setUserProfile(prev => ({
      ...prev,
      equippedItems: {
        ...prev.equippedItems,
        [item.type]: itemId
      }
    }));
    
    toast.success(`${item.name} equipped!`);
  };
  
  const unequipItem = (itemId: string) => {
    const item = userProfile.inventory.find(i => i.id === itemId);
    
    if (!item || userProfile.equippedItems[item.type] !== itemId) {
      return;
    }
    
    setUserProfile(prev => {
      const newEquipped = { ...prev.equippedItems };
      delete newEquipped[item.type];
      
      return {
        ...prev,
        equippedItems: newEquipped
      };
    });
    
    toast.success(`${item.name} unequipped`);
  };

  const completeHabit = (habitId: string, value?: number) => {
    const today = new Date().toISOString().split('T')[0];
    
    setHabits(prevHabits => {
      return prevHabits.map(habit => {
        if (habit.id === habitId) {
          if (habit.completedDates.includes(today)) {
            return habit;
          }
          
          if (habit.completionGoal && value && value < habit.completionGoal) {
            toast(`Progress saved! ${value}/${habit.completionGoal}`, {
              description: `Keep going to complete ${habit.name}!`
            });
            return habit;
          }
          
          const newStreak = habit.streak + 1;
          const newCompletedDates = [...habit.completedDates, today];
          
          toast(`${habit.name} completed!`, {
            description: `+${habit.xpReward} XP | Streak: ${newStreak}`,
          });
          
          return {
            ...habit,
            streak: newStreak,
            completedDates: newCompletedDates
          };
        }
        return habit;
      });
    });
    
    const newLog: HabitLog = {
      id: uuidv4(),
      habitId,
      date: new Date().toISOString(),
      completed: true,
      value
    };
    setLogs(prevLogs => [...prevLogs, newLog]);
    
    const habit = habits.find(h => h.id === habitId);
    if (habit) {
      updateStats(habit.xpReward, habit.category);
    }
    
    updateQuestsProgress(habitId);
    
    updateMissionProgress(habitId);
    
    checkAchievements();
  };
  
  const completeQuest = (questId: string) => {
    const quest = quests.find(q => q.id === questId);
    if (!quest || quest.completed || quest.progress < quest.requiredProgress) return;
    
    setQuests(prevQuests => {
      return prevQuests.map(q => {
        if (q.id === questId) {
          return { ...q, completed: true };
        }
        return q;
      });
    });
    
    updateStats(quest.xpReward);
    
    const reward = getRandomReward(userProfile.stats.level);
    if (reward) {
      if (!userProfile.inventory.some(item => item.id === reward.id)) {
        setUserProfile(prev => ({
          ...prev,
          inventory: [...prev.inventory, reward]
        }));
        
        addNotification({
          title: 'New Reward Unlocked!',
          message: `You've earned a ${reward.rarity} ${reward.type}: ${reward.name}`,
          type: 'achievement'
        });
        
        toast.success(`New reward: ${reward.name}`, {
          description: `You've earned a ${reward.rarity} ${reward.type}!`,
        });
      }
    }
    
    toast(`Quest completed: ${quest.title}`, {
      description: `+${quest.xpReward} XP`,
    });
    
    addNotification({
      title: 'Quest Completed',
      message: `You've completed the "${quest.title}" quest!`,
      type: 'quest'
    });
  };
  
  const addHabit = (habit: Omit<Habit, 'id' | 'createdAt' | 'streak' | 'completedDates'>) => {
    const newHabit: Habit = {
      ...habit,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      streak: 0,
      completedDates: [],
      isActive: true,
      xpReward: habit.xpReward || 50
    };
    
    setHabits(prevHabits => [...prevHabits, newHabit]);
    
    toast(`New habit created: ${habit.name}`, {
      description: 'Start tracking your progress!',
    });
  };
  
  const deleteHabit = (habitId: string) => {
    setHabits(prevHabits => prevHabits.filter(h => h.id !== habitId));
    
    setLogs(prevLogs => prevLogs.filter(log => log.habitId !== habitId));
    
    setQuests(prevQuests => {
      return prevQuests.map(quest => {
        if (quest.habitIds.includes(habitId)) {
          return {
            ...quest,
            habitIds: quest.habitIds.filter(id => id !== habitId)
          };
        }
        return quest;
      });
    });
    
    toast('Habit deleted', {
      description: 'The habit has been removed from your list.'
    });
  };
  
  const updateHabit = (updatedHabit: Habit) => {
    setHabits(prevHabits => {
      return prevHabits.map(habit => {
        if (habit.id === updatedHabit.id) {
          return updatedHabit;
        }
        return habit;
      });
    });
    
    toast('Habit updated', {
      description: 'Your changes have been saved.'
    });
  };
  
  const dismissNotification = (notificationId: string) => {
    setNotifications(prevNotifications => {
      return prevNotifications.map(notification => {
        if (notification.id === notificationId) {
          return { ...notification, read: true };
        }
        return notification;
      });
    });
  };
  
  const updateStats = (xpGain: number, category?: HabitCategory) => {
    setStats(prevStats => {
      let newXp = prevStats.xp + xpGain;
      let newLevel = prevStats.level;
      let newXpToNextLevel = prevStats.xpToNextLevel;
      
      if (newXp >= prevStats.xpToNextLevel) {
        newXp = newXp - prevStats.xpToNextLevel;
        newLevel += 1;
        newXpToNextLevel = Math.round(prevStats.xpToNextLevel * 1.5);
        
        toast(`Level Up! You are now level ${newLevel}`, {
          description: 'Keep up the good work!',
        });
        
        addNotification({
          title: 'Level Up!',
          message: `Congratulations! You've reached Level ${newLevel}!`,
          type: 'level-up'
        });
        
        const newRank = calculateRank(newLevel);
        if (newRank !== userProfile.rank) {
          toast(`Rank Up! You are now rank ${newRank}`, {
            description: 'Your hunter rank has increased!',
          });
          
          setUserProfile(prev => ({
            ...prev,
            rank: newRank
          }));
          
          addNotification({
            title: 'Rank Up!',
            message: `You've been promoted to Rank ${newRank}!`,
            type: 'achievement'
          });
        }
        
        const levelReward = getRandomReward(newLevel);
        if (levelReward && !userProfile.inventory.some(item => item.id === levelReward.id)) {
          setUserProfile(prev => ({
            ...prev,
            inventory: [...prev.inventory, levelReward]
          }));
          
          addNotification({
            title: 'New Reward Unlocked!',
            message: `You've earned a ${levelReward.rarity} ${levelReward.type}: ${levelReward.name}`,
            type: 'achievement'
          });
          
          toast.success(`New reward: ${levelReward.name}`, {
            description: `You've earned a ${levelReward.rarity} ${levelReward.type}!`,
          });
        }
      }
      
      const newCategoriesProgress = { ...prevStats.categoriesProgress };
      if (category) {
        newCategoriesProgress[category] = Math.min(
          100, 
          newCategoriesProgress[category] + Math.ceil(xpGain / 10)
        );
      }
      
      const newStats = {
        ...prevStats,
        level: newLevel,
        xp: newXp,
        xpToNextLevel: newXpToNextLevel,
        totalCompletions: prevStats.totalCompletions + 1,
        categoriesProgress: newCategoriesProgress
      };
      
      setUserProfile(prevProfile => ({
        ...prevProfile,
        stats: newStats
      }));
      
      return newStats;
    });
  };
  
  const updateQuestsProgress = (habitId: string) => {
    setQuests(prevQuests => {
      return prevQuests.map(quest => {
        if (quest.habitIds.includes(habitId) && !quest.completed) {
          const newProgress = quest.progress + 1;
          
          if (newProgress >= quest.requiredProgress) {
            toast('Quest ready to complete!', {
              description: `"${quest.title}" can now be completed!`
            });
          }
          
          return {
            ...quest,
            progress: newProgress
          };
        }
        return quest;
      });
    });
  };
  
  const updateMissionProgress = (habitId: string) => {
    if (!userProfile.activeMission) return;
    
    const updatedSteps = userProfile.activeMission.steps.map(step => {
      if (step.status === 'in_progress' && step.habitIds.includes(habitId)) {
        return {
          ...step,
          currentProgress: Math.min(step.currentProgress + 1, step.requiredDays)
        };
      }
      return step;
    });
    
    setUserProfile(prev => ({
      ...prev,
      activeMission: {
        ...prev.activeMission!,
        steps: updatedSteps
      }
    }));
  };
  
  const checkAchievements = () => {
    setAchievements(prevAchievements => {
      const firstIncomplete = prevAchievements.find(a => !a.unlockedAt);
      if (firstIncomplete) {
        const newProgress = Math.min(firstIncomplete.progress + 1, firstIncomplete.requiredProgress);
        
        if (newProgress === firstIncomplete.requiredProgress) {
          toast(`Achievement unlocked: ${firstIncomplete.title}`, {
            description: `+${firstIncomplete.xpReward} XP`,
          });
          
          updateStats(firstIncomplete.xpReward);
          
          addNotification({
            title: 'Achievement Unlocked!',
            message: `You've earned the "${firstIncomplete.title}" achievement!`,
            type: 'achievement'
          });
          
          return prevAchievements.map(a => {
            if (a.id === firstIncomplete.id) {
              return {
                ...a,
                progress: newProgress,
                unlockedAt: new Date().toISOString()
              };
            }
            return a;
          });
        } else {
          return prevAchievements.map(a => {
            if (a.id === firstIncomplete.id) {
              return { ...a, progress: newProgress };
            }
            return a;
          });
        }
      }
      return prevAchievements;
    });
  };
  
  const addNotification = (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: uuidv4(),
      read: false,
      createdAt: new Date().toISOString()
    };
    
    setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
  };
  
  const addQuest = (quest: Quest) => {
    setQuests(prevQuests => [...prevQuests, quest]);
    
    addNotification({
      title: 'New Quest Added',
      message: `You've added the "${quest.title}" quest to your journey!`,
      type: 'quest'
    });
  };
  
  const initializeUserProfile = (username: string) => {
    setUserProfile(prev => ({
      ...prev,
      username,
      stats: initialEmptyStats,
      achievements: [],
      inventory: initialRewardItems.slice(0, 3), // Give the first 3 reward items to start
      equippedItems: {},
      joinedAt: new Date().toISOString(),
      rank: 'E',
      titles: []
    }));
    setIsNewUser(false);
    localStorage.setItem('firstTimeUser', 'false');
    
    toast.success(`Profile initialized for ${username}!`, {
      description: 'Your adventure begins now. Complete habits to level up!'
    });
  };
  
  const loadData = () => {
    const isFirstTime = localStorage.getItem('firstTimeUser');
    
    if (isFirstTime === null) {
      localStorage.setItem('firstTimeUser', 'false');
    } else {
      setIsNewUser(false);
    }
    
    const savedHabits = localStorage.getItem('habits');
    const savedLogs = localStorage.getItem('logs');
    const savedQuests = localStorage.getItem('quests');
    const savedStats = localStorage.getItem('stats');
    const savedNotifications = localStorage.getItem('notifications');
    const savedAchievements = localStorage.getItem('achievements');
    const savedUserProfile = localStorage.getItem('userProfile');
    
    if (savedHabits) setHabits(JSON.parse(savedHabits));
    if (savedLogs) setLogs(JSON.parse(savedLogs));
    if (savedQuests) setQuests(JSON.parse(savedQuests));
    if (savedStats) setStats(JSON.parse(savedStats));
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
    if (savedUserProfile) setUserProfile(JSON.parse(savedUserProfile));
  };
  
  const saveData = () => {
    localStorage.setItem('habits', JSON.stringify(habits));
    localStorage.setItem('logs', JSON.stringify(logs));
    localStorage.setItem('quests', JSON.stringify(quests));
    localStorage.setItem('stats', JSON.stringify(stats));
    localStorage.setItem('notifications', JSON.stringify(notifications));
    localStorage.setItem('achievements', JSON.stringify(achievements));
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  };
  
  // Get current day of week (0-6, Sunday-Saturday)
  const getCurrentDayOfWeek = () => {
    const today = new Date();
    return today.getDay();
  };

  // Get today's date in YYYY-MM-DD format
  const getTodayDateString = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Check for incomplete habits and quests at the end of the day
  const checkIncompleteItems = () => {
    const today = getTodayDateString();
    const lastCheckedDate = localStorage.getItem('lastPenaltyCheck');
    
    // If we already checked today, don't check again
    if (lastCheckedDate === today) {
      return;
    }
    
    // Update last checked date
    localStorage.setItem('lastPenaltyCheck', today);
    
    // Check for incomplete habits that should have been done today
    const incompleteHabits = activeHabits.filter(habit => {
      // Check if habit was completed today
      return !habit.completedDates.includes(today);
    });
    
    // Apply -1 XP penalty for each incomplete habit
    if (incompleteHabits.length > 0) {
      // Update stats
      const newXp = Math.max(0, stats.xp - incompleteHabits.length);
      setStats(prev => ({
        ...prev,
        xp: newXp
      }));
      
      // Show notification
      const notification: Notification = {
        id: uuidv4(),
        title: 'Daily Habits Missed',
        message: `You missed ${incompleteHabits.length} habits yesterday. -${incompleteHabits.length} XP`,
        type: 'penalty',
        read: false,
        createdAt: new Date().toISOString()
      };
      
      setNotifications(prev => [notification, ...prev]);
      
      // Reset streaks for incomplete habits
      const updatedHabits = habits.map(habit => {
        if (incompleteHabits.some(h => h.id === habit.id)) {
          return { ...habit, streak: 0 };
        }
        return habit;
      });
      
      setHabits(updatedHabits);
    }
    
    // Check for expired quests
    const expiredQuests = quests.filter(quest => {
      if (!quest.completed && quest.expiresAt) {
        const expiryDate = new Date(quest.expiresAt);
        const now = new Date();
        return expiryDate < now;
      }
      return false;
    });
    
    // Apply penalties for expired quests
    if (expiredQuests.length > 0) {
      // Show notification
      const notification: Notification = {
        id: uuidv4(),
        title: 'Quests Failed',
        message: `${expiredQuests.length} quests have expired without completion.`,
        type: 'penalty',
        read: false,
        createdAt: new Date().toISOString()
      };
      
      setNotifications(prev => [notification, ...prev]);
    }
  };

  // Filter habits based on day of week
  useEffect(() => {
    const currentDay = getCurrentDayOfWeek();
    
    const filtered = habits.filter(habit => {
      // For daily habits or habits without frequency settings, always show
      if (!habit.frequency || habit.frequency.type === 'daily') {
        return true;
      }
      
      // For weekly habits, always show (they're done X times per week, not on specific days)
      if (habit.frequency.type === 'weekly' || habit.frequency.type === 'monthly') {
        return true;
      }
      
      // For custom frequency with specific days of week
      if (habit.frequency.type === 'custom' && habit.activeDays && habit.activeDays.length > 0) {
        return habit.activeDays.includes(currentDay);
      }
      
      return true;
    });
    
    setActiveHabits(filtered);
  }, [habits]);
  
  // Check for incomplete habits and quests when the app loads
  useEffect(() => {
    // Check for incomplete items when the app loads
    checkIncompleteItems();
    
    // Also set up a daily check at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();
    
    const midnightCheck = setTimeout(() => {
      checkIncompleteItems();
    }, timeUntilMidnight);
    
    return () => clearTimeout(midnightCheck);
  }, []);

  useEffect(() => {
    loadData();
  }, []);
  
  useEffect(() => {
    saveData();
  }, [habits, logs, quests, stats, notifications, achievements, userProfile]);
  
  return (
    <HabitContext.Provider value={{
      habits,
      activeHabits,
      logs,
      quests,
      stats,
      notifications,
      achievements,
      userProfile,
      completeHabit,
      completeQuest,
      addHabit,
      deleteHabit,
      updateHabit,
      dismissNotification,
      resetAllData,
      updateUserProfile,
      equipItem,
      unequipItem,
      isNewUser,
      setIsNewUser,
      startDungeonMission,
      completeMissionStep,
      completeDungeonMission,
      failDungeonMission,
      addQuest,
      initializeUserProfile,
      getCurrentDayOfWeek
    }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabitContext = () => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabitContext must be used within a HabitProvider');
  }
  return context;
};

export const useHabit = useHabitContext;
