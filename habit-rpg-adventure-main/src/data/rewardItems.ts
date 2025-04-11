import { RewardItem } from '@/types';

export const initialRewardItems: RewardItem[] = [
  {
    id: 'weapon-1',
    name: 'Kamish\'s Wrath',
    description: 'A dagger crafted from the fang of Kamish, the Demon of Disaster. It deals extra damage to sleeping enemies.',
    rarity: 'uncommon',
    type: 'dagger',
    stats: {
      power: 25,
      agility: 15
    },
    ability: 'Shadow Strike: 30% chance to deal double damage on first strike',
    requiredLevel: 2,
    image: 'https://i.postimg.cc/7YvtC8Q2/kamish-dagger.png',
    animatedImage: 'https://i.postimg.cc/pVSp3vyn/kamish-dagger-anim.gif',
    modelUrl: 'https://models-cdn.shadow-system.org/kamish-wrath.glb',
    animationEffects: {
      obtainAnimation: 'sparkle-rise',
      equippedAnimation: 'purple-glow',
      useAnimation: 'shadow-slash',
      rarityAura: 'uncommon-aura',
      particleEffects: ['shadow-wisp', 'purple-spark'],
      glowColor: '#8a2be2'
    },
    animeShaderEffects: true,
    realisticRenderingStyle: 'anime'
  },
  {
    id: 'weapon-2',
    name: 'Frost Monarch\'s Staff',
    description: 'A staff containing the essence of the Frost Monarch, one of the rulers of the ice domain.',
    rarity: 'rare',
    type: 'staff',
    stats: {
      power: 35,
      intelligence: 40
    },
    ability: 'Winter\'s Embrace: 15% chance to freeze targets for 2 seconds',
    requiredLevel: 5
  },
  {
    id: 'weapon-3',
    name: 'Knight Commander\'s Shield',
    description: 'Shield once wielded by Knight Commander Gre. Provides divine protection against all forms of attack.',
    rarity: 'epic',
    type: 'shield',
    stats: {
      defense: 75,
      intelligence: 20
    },
    ability: 'Divine Protection: Reduces damage taken by 20% when below 30% health',
    requiredLevel: 8
  },
  {
    id: 'weapon-4',
    name: 'Baruka\'s Longbow',
    description: 'A legendary bow used by the High Orc Chieftain Baruka. Its arrows pierce through the toughest defenses.',
    rarity: 'legendary',
    type: 'bow',
    stats: {
      power: 85,
      agility: 55
    },
    ability: 'Piercing Shot: Deals 50% more damage to elite monsters',
    requiredLevel: 12
  },
  {
    id: 'weapon-5',
    name: 'Shadow Monarch\'s Sword',
    description: 'The signature blade of the Shadow Monarch himself. Contains unimaginable power.',
    rarity: 'mythic',
    type: 'sword',
    stats: {
      power: 120,
      defense: 40,
      intelligence: 30
    },
    ability: 'Army of Shadows: Summons shadow soldiers to fight alongside you when completing difficult tasks',
    requiredLevel: 20,
    image: 'https://i.imgur.com/Pw3YsLG.png',
    animatedImage: 'https://i.imgur.com/rNfB6aV.gif',
    modelUrl: 'https://models-cdn.shadow-system.org/monarch-sword.glb',
    animationEffects: {
      obtainAnimation: 'dark-explosion',
      equippedAnimation: 'shadow-wisps',
      useAnimation: 'shadow-army',
      rarityAura: 'mythic-aura',
      particleEffects: ['black-flame', 'purple-lightning', 'shadow-soldier'],
      glowColor: '#5c0099'
    },
    animeShaderEffects: true,
    realisticRenderingStyle: 'hybrid'
  },
  {
    id: 'armor-1',
    name: 'Hunter Association Outfit',
    description: 'Basic armor issued to E-Rank Hunters. Provides minimal protection but great mobility.',
    rarity: 'common',
    type: 'armor',
    stats: {
      defense: 15,
      agility: 10
    },
    requiredLevel: 1
  },
  {
    id: 'armor-2',
    name: 'Beru\'s Carapace',
    description: 'Armor forged from the carapace of Beru, the Ant King. Preferred by those who favor stealth.',
    rarity: 'rare',
    type: 'armor',
    stats: {
      defense: 35,
      agility: 45
    },
    ability: 'Shadow Step: 10% chance to avoid attacks entirely',
    requiredLevel: 7
  },
  {
    id: 'accessory-1',
    name: 'Igris\' Red Orb',
    description: 'A mysterious pendant that contains the essence of the Marshal, the Shadow Monarch\'s most loyal knight.',
    rarity: 'epic',
    type: 'accessory',
    stats: {
      power: 15,
      intelligence: 35
    },
    ability: 'Soul Drain: Gain 5% of task value as bonus XP',
    requiredLevel: 10
  },
  {
    id: 'potion-1',
    name: 'Giant\'s Elixir',
    description: 'A rare potion extracted from a Giant\'s dungeon. Permanently increases your attributes.',
    rarity: 'legendary',
    type: 'potion',
    stats: {
      power: 10,
      defense: 10,
      agility: 10,
      intelligence: 10
    },
    ability: 'Permanent stat increase when consumed',
    requiredLevel: 15
  },
  {
    id: 'weapon-6',
    name: 'Tusk of Cerberus',
    description: 'A weapon crafted from the fang of Cerberus, the guardian of the gates of hell.',
    rarity: 'epic',
    type: 'dagger',
    stats: {
      power: 65,
      agility: 40
    },
    ability: 'Triple Threat: 15% chance to strike three times in rapid succession',
    requiredLevel: 15
  },
  {
    id: 'accessory-2',
    name: 'Essence of Baran',
    description: 'A fragment containing the power of the Demon King Baran. Pulsates with destructive energy.',
    rarity: 'mythic',
    type: 'accessory',
    stats: {
      power: 40,
      intelligence: 25
    },
    ability: 'Ruler\'s Authority: Increases all rewards by 10%',
    requiredLevel: 18
  },
  // New items below
  {
    id: 'weapon-7',
    name: 'Iron Heart\'s Warhammer',
    description: 'The massive hammer wielded by Iron Heart, one of the strongest hunters in the world. Few can lift it, even fewer can wield it effectively.',
    rarity: 'legendary',
    type: 'sword',
    stats: {
      power: 95,
      defense: 30
    },
    ability: 'Earth Shatter: 20% chance to stun enemies when completing consecutive tasks',
    requiredLevel: 14
  },
  {
    id: 'weapon-8',
    name: 'Charyeok Blade',
    description: 'A mystical blade that can channel the power of divine beings. Used by National Level Hunters to slay S-rank threats.',
    rarity: 'legendary',
    type: 'sword',
    stats: {
      power: 90,
      intelligence: 45
    },
    ability: 'Divine Channel: Bonus XP for completing tasks above your level',
    requiredLevel: 15
  },
  {
    id: 'weapon-9',
    name: 'Tusk\'s Dagger',
    description: 'A lightweight dagger used by the assassin-ranked hunter Tusk. Perfect for swift, precise strikes.',
    rarity: 'rare',
    type: 'dagger',
    stats: {
      power: 40,
      agility: 70
    },
    ability: 'Vital Strike: 25% chance to gain double XP on quick tasks',
    requiredLevel: 8
  },
  {
    id: 'armor-3',
    name: 'Go Gun-Hee\'s Battlesuit',
    description: 'Special armor worn by the Chairman of the Hunter Association. Offers exceptional protection without sacrificing mobility.',
    rarity: 'epic',
    type: 'armor',
    stats: {
      defense: 65,
      agility: 25,
      power: 15
    },
    ability: 'Authority: Boosts task completion efficiency by 15%',
    requiredLevel: 12
  },
  {
    id: 'armor-4',
    name: 'Thomas Andre\'s Plate',
    description: 'Heavy armor used by the National Level Hunter Thomas Andre. Nearly impenetrable to physical attacks.',
    rarity: 'legendary',
    type: 'armor',
    stats: {
      defense: 100,
      power: 30
    },
    ability: 'Unyielding: Prevents streak loss once per week',
    requiredLevel: 16
  },
  {
    id: 'armor-5',
    name: 'Shadow Monarch\'s Attire',
    description: 'The iconic black armor of the Shadow Monarch. Empowers the wearer with shadow manipulation abilities.',
    rarity: 'mythic',
    type: 'armor',
    stats: {
      defense: 85,
      power: 50,
      intelligence: 50
    },
    ability: 'Arise: Recover from failed tasks with reduced penalties',
    requiredLevel: 22
  },
  {
    id: 'accessory-3',
    name: 'Ashborn\'s Fragment',
    description: 'A fragment containing the power of the Shadow Monarch\'s original power. Pulses with dark energy.',
    rarity: 'mythic',
    type: 'accessory',
    stats: {
      power: 35,
      intelligence: 55
    },
    ability: 'Shadow Extraction: Convert streak days into bonus XP',
    requiredLevel: 20
  },
  {
    id: 'accessory-4',
    name: 'Jin-Woo\'s Watch',
    description: 'The watch worn by Sung Jin-Woo throughout his journey. Keeps perfect time and seems to grant awareness of danger.',
    rarity: 'rare',
    type: 'accessory',
    stats: {
      agility: 30,
      intelligence: 20
    },
    ability: 'Time Perception: 15% chance to extend quest deadlines',
    requiredLevel: 6
  },
  {
    id: 'accessory-5',
    name: 'Ruler\'s Bracelet',
    description: 'A bracelet worn by the Rulers, the mortal enemies of the Monarchs. Glows with holy light.',
    rarity: 'legendary',
    type: 'accessory',
    stats: {
      defense: 40,
      intelligence: 60
    },
    ability: 'Divine Protection: 20% chance to automatically complete a random daily habit',
    requiredLevel: 18
  },
  {
    id: 'accessory-6',
    name: 'Architect\'s Monocle',
    description: 'The eyepiece used by the Architect of the System. Allows the wearer to see hidden patterns.',
    rarity: 'epic',
    type: 'accessory',
    stats: {
      intelligence: 75
    },
    ability: 'Pattern Recognition: Shows optimal task completion order for maximum XP',
    requiredLevel: 12
  },
  {
    id: 'potion-2',
    name: 'Demon King\'s Blood',
    description: 'A vial containing the blood of a Demon King. Drinking it permanently enhances combat abilities.',
    rarity: 'legendary',
    type: 'potion',
    stats: {
      power: 25,
      agility: 15
    },
    ability: 'Demonic Power: Permanently increases XP gain from combat-related tasks',
    requiredLevel: 16
  },
  {
    id: 'potion-3',
    name: 'Divine Water of Life',
    description: 'Blessed water from the Rulers\' domain. Restores vitality and enhances natural abilities.',
    rarity: 'epic',
    type: 'potion',
    stats: {
      defense: 20,
      intelligence: 20
    },
    ability: 'Rejuvenation: Reset all failed streaks once',
    requiredLevel: 10
  },
  {
    id: 'weapon-10',
    name: 'Esil Radiru\'s Spear',
    description: 'The spear wielded by Esil, the demon princess. Can pierce even the toughest defenses.',
    rarity: 'epic',
    type: 'bow',  // Using bow type as spear isn't available
    stats: {
      power: 60,
      agility: 45
    },
    ability: 'Demon Pierce: 30% extra XP from difficult tasks',
    requiredLevel: 12
  },
  {
    id: 'weapon-11',
    name: 'Kahng Taeshik\'s Greatsword',
    description: 'The massive sword used by S-rank hunter Kahng Taeshik. Requires tremendous strength to wield.',
    rarity: 'epic',
    type: 'sword',
    stats: {
      power: 80,
      defense: 20
    },
    ability: 'Overwhelming Force: Complete streak-based tasks more efficiently',
    requiredLevel: 14
  },
  {
    id: 'accessory-7',
    name: 'Black Heart',
    description: 'A mysterious artifact that beats like a heart. Contains the essence of a powerful shadow.',
    rarity: 'legendary',
    type: 'accessory',
    stats: {
      power: 45,
      intelligence: 40
    },
    ability: 'Shadow Pulse: Tasks completed at night give 25% more XP',
    requiredLevel: 15
  }
];

// Function to get rewards based on level
export const getRewardsByLevel = (level: number): RewardItem[] => {
  return initialRewardItems.filter(item => (item.requiredLevel || 1) <= level);
};

// Function to get a random reward from available rewards
export const getRandomReward = (level: number): RewardItem | null => {
  const availableRewards = getRewardsByLevel(level);
  if (availableRewards.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableRewards.length);
  return availableRewards[randomIndex];
};

// Function to get rewards by rarity
export const getRewardsByRarity = (rarity: string): RewardItem[] => {
  return initialRewardItems.filter(item => item.rarity === rarity);
};

// Function to get reward by ID
export const getRewardById = (id: string): RewardItem | undefined => {
  return initialRewardItems.find(item => item.id === id);
};
