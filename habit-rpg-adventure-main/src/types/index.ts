// Habit types
export type HabitCategory = 'sleep' | 'workout' | 'hygiene' | 'skincare' | 'custom';

export type FrequencyType = 'daily' | 'weekly' | 'monthly' | 'custom';

export interface Frequency {
  type: FrequencyType;
  value: number; // For custom frequency
  daysOfWeek?: number[]; // For weekly frequency (0-6, where 0 is Sunday)
}

export interface Habit {
  id: string;
  name: string;
  category: HabitCategory;
  description: string;
  frequency: Frequency;
  isActive: boolean;
  createdAt: string;
  icon?: string;
  color?: string;
  streak: number;
  completedDates: string[];
  xpReward: number;
  completionGoal?: number; // For measurable habits like "Drink 8 glasses of water"
  activeDays?: number[]; // Days of the week when this habit should be active (0-6, where 0 is Sunday)
}

// Log entry for a habit
export interface HabitLog {
  id: string;
  habitId: string;
  date: string;
  completed: boolean;
  value?: number; // For measurable habits
  notes?: string;
}

// Quest types
export interface Quest {
  id: string;
  title: string;
  description: string;
  habitIds: string[]; // Habits related to this quest
  xpReward: number;
  completed: boolean;
  expiresAt?: string; // For time-limited quests
  type: 'daily' | 'weekly' | 'achievement';
  progress: number; // 0-100
  requiredProgress: number;
  createdAt: string;
  penalty?: string; // New field for storing the penalty for failing the quest
}

// Stats types
export interface Stats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  streakRecord: number;
  totalCompletions: number;
  completionRate: number; // 0-100
  categoriesProgress: Record<HabitCategory, number>; // 0-100 for each category
  dayStreak: number;
}

// Weapon/Gift Rarity
export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';

// Weapon/Gift Type
export type ItemType = 'sword' | 'dagger' | 'staff' | 'bow' | 'shield' | 'armor' | 'accessory' | 'potion';

// Weapon/Gift Item
export interface RewardItem {
  id: string;
  name: string;
  description: string;
  rarity: ItemRarity;
  type: ItemType;
  image?: string;
  animatedImage?: string; // New field for animated reward image
  modelUrl?: string; // New field for 3D model
  stats: {
    power?: number;
    defense?: number;
    agility?: number;
    intelligence?: number;
  };
  ability?: string;
  unlockedAt?: string;
  requiredLevel?: number;
  requiredAchievements?: string[];
  // New fields for enhanced animations
  animationEffects?: {
    obtainAnimation: string;     // e.g., 'glow', 'sparkle', 'rise', 'pulse'
    equippedAnimation: string;   // e.g., 'shine', 'float', 'orbit'
    useAnimation: string;        // e.g., 'slash', 'cast', 'shoot'
    rarityAura?: string;         // Special aura based on rarity
    particleEffects?: string[];  // e.g., ['flame', 'electricity', 'shadow', 'light']
    glowColor?: string;          // Color for glow effects
  };
  animeShaderEffects?: boolean;  // Enable cell-shading for anime look
  realisticRenderingStyle?: 'anime' | 'realistic' | 'hybrid'; // Style of rendering
}

// Hunter Rank
export type MonsterRank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S';

// Difficulty Level
export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'extreme';

// User profile
export interface UserProfile {
  username: string;
  avatar?: string;
  stats: Stats;
  achievements: Achievement[];
  inventory: RewardItem[];
  equippedItems: {
    [key in ItemType]?: string; // item id
  };
  joinedAt: string;
  rank: MonsterRank;
  titles: Title[];
  activeMission?: DungeonMission;
  completedMissions: DungeonMission[];
}

// Title from completing dungeon missions
export interface Title {
  id: string;
  name: string;
  description: string;
  rank: MonsterRank;
  unlockedAt?: string;
  image?: string;
}

// Achievement
export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt?: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  progress: number; // 0-100
  requiredProgress: number;
  xpReward: number;
  isSecret?: boolean;
}

// Notification for rewards, level-ups, etc.
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'achievement' | 'level-up' | 'streak' | 'quest' | 'tip' | 'penalty';
  read: boolean;
  createdAt: string;
  action?: {
    label: string;
    url: string;
  };
}

// Import and re-export interfaces from dungeon.ts
import type { Monster, DungeonMission, DungeonStep, Title as DungeonTitle } from './dungeon';
export type { Monster, DungeonMission, DungeonStep };
