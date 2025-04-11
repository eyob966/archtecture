import { MonsterRank, DifficultyLevel } from './index';

export interface Monster {
  id: string;
  name: string;
  description: string;
  image: string;
  animatedImage: string; // For animations - no longer optional
  modelUrl: string; // For 3D model - no longer optional
  rank: MonsterRank;
  level: number;
  difficulty: DifficultyLevel;
  rewards: string[];
  xpReward: number;
  title: string;
  requiredLevel: number;
  origin: string; // Where the monster is from in Solo Leveling
  abilities: string[]; // Special abilities of the monster
  // New fields for enhanced animations
  animationEffects?: {
    entryAnimation: string;    // e.g., 'fade', 'bounce', 'slide', 'glitch', 'power-up'
    idleAnimation: string;     // e.g., 'breathing', 'floating', 'pulse', 'glow'
    attackAnimation: string;   // e.g., 'slash', 'fireball', 'charge', 'teleport'
    defeatAnimation: string;   // e.g., 'dissolve', 'explode', 'shadow-fade'
    particleEffects?: string[]; // e.g., ['flame', 'electricity', 'shadow', 'light']
    glowColor?: string;        // Color for glow effects
    soundEffects?: {           // Sound effects for different actions
      entry?: string;
      attack?: string;
      defeat?: string;
    }
  };
  animeShaderEffects?: boolean; // Enable cell-shading for anime look
  realisticRenderingStyle?: 'anime' | 'realistic' | 'hybrid'; // Style of rendering
}

export interface DungeonMission {
  id: string;
  title: string;
  description: string;
  monsterId: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'failed';
  steps: DungeonStep[];
  startedAt?: string;
  completedAt?: string;
  failedAt?: string;
  deadlineAt?: string;
  xpReward: number; // Fixed at 3 XP per completion
  requiredLevel: number;
  createdAt: string;
  customMonster?: boolean; // Flag to indicate if this is a custom monster assignment
  timeLimit: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  penalty?: number; // Penalty for failing to complete the mission
}

export interface DungeonStep {
  id: string;
  description: string;
  habitIds: string[];
  questIds: string[];
  status: 'not_started' | 'in_progress' | 'completed';
  startedAt?: string;
  completedAt?: string;
  requiredDays: number;
  currentProgress: number;
}

export interface Title {
  id: string;
  name: string;
  description: string;
  rank: MonsterRank;
  unlockedAt?: string;
  image?: string;
}
