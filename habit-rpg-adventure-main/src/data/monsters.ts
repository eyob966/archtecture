import { Monster, MonsterRank } from '@/types';

export const monsters: Monster[] = [
  {
    id: 'igris',
    name: 'Igris, Knight of Shadows',
    description: 'The loyal shadow knight who once served as a marshal of the demons. His unwavering loyalty makes him one of Sung Jin-Woo\'s most trusted shadows.',
    image: 'https://i.imgur.com/kPFVg8r.png',
    animatedImage: 'https://i.imgur.com/qRc8hZD.gif',
    modelUrl: 'https://models-cdn.shadow-system.org/igris-hd.glb',
    rank: 'A',
    level: 32,
    difficulty: 'hard',
    rewards: ['shadow-knight-blade', 'marshal-insignia'],
    xpReward: 1500,
    title: 'Knight Commander',
    requiredLevel: 15,
    origin: 'Demon Castle',
    abilities: ['Shadow Slash', 'Commander\'s Aura', 'Loyalty Bond'],
    animationEffects: {
      entryAnimation: 'shadow-emerge',
      idleAnimation: 'floating',
      attackAnimation: 'shadow-slash',
      defeatAnimation: 'shadow-dissolve',
      particleEffects: ['shadow', 'purple-glow'],
      glowColor: '#6a0dad',
      soundEffects: {
        entry: 'shadow-emergence.mp3',
        attack: 'blade-whoosh.mp3',
        defeat: 'shadow-dissipate.mp3'
      }
    },
    animeShaderEffects: true,
    realisticRenderingStyle: 'hybrid'
  },
  {
    id: 'tusk',
    name: 'Tusk, Demon of Blades',
    description: 'A fearsome demon with countless blades sprouting from its body. His strikes can penetrate even the strongest armors.',
    image: 'https://i.imgur.com/mzYVLF3.png',
    animatedImage: 'https://i.imgur.com/EXrP2Tf.gif',
    modelUrl: 'https://models-cdn.shadow-system.org/tusk-hd.glb',
    rank: 'B',
    level: 21,
    difficulty: 'medium',
    rewards: ['tusk-blade', 'demon-essence'],
    xpReward: 800,
    title: 'Blade Master',
    requiredLevel: 8,
    origin: 'Demon Tower',
    abilities: ['Blade Storm', 'Cutting Aura', 'Iron Body'],
    animationEffects: {
      entryAnimation: 'blade-emerge',
      idleAnimation: 'blade-rotation',
      attackAnimation: 'blade-storm',
      defeatAnimation: 'blade-shatter',
      particleEffects: ['metal-spark', 'blood-mist'],
      glowColor: '#ff4500',
      soundEffects: {
        entry: 'metal-clash.mp3',
        attack: 'blade-slice.mp3',
        defeat: 'metal-shatter.mp3'
      }
    },
    animeShaderEffects: true,
    realisticRenderingStyle: 'anime'
  },
  {
    id: 'beru',
    name: 'Beru, Ant King',
    description: 'The mighty ruler of the ant colony from Jeju Island. After becoming a shadow, his loyalty to the Shadow Monarch is absolute.',
    image: 'https://i.imgur.com/6BtN8Hy.png',
    animatedImage: 'https://i.imgur.com/wN3qDwS.gif',
    modelUrl: 'https://models-cdn.shadow-system.org/beru-hd.glb',
    rank: 'S',
    level: 45,
    difficulty: 'extreme',
    rewards: ['ant-king-carapace', 'royal-stinger'],
    xpReward: 2500,
    title: 'Sovereign of Plagues',
    requiredLevel: 25,
    origin: 'Jeju Island',
    abilities: ['Acid Spray', 'Colony Command', 'Chitin Armor', 'Telepathy'],
    animationEffects: {
      entryAnimation: 'ground-shatter',
      idleAnimation: 'breathing-heavy',
      attackAnimation: 'acid-spray',
      defeatAnimation: 'explode-chitin',
      particleEffects: ['acid-drops', 'shadow-aura'],
      glowColor: '#39ff14',
      soundEffects: {
        entry: 'ground-crack.mp3',
        attack: 'acid-hiss.mp3',
        defeat: 'explosion.mp3'
      }
    },
    animeShaderEffects: true,
    realisticRenderingStyle: 'anime'
  },
  {
    id: 'tank',
    name: 'Tank, Stone Golem',
    description: 'A massive stone golem with impenetrable defenses. His body is formed from ancient magical stone that absorbs damage.',
    image: 'https://i.imgur.com/6BtN8Hy.png',
    animatedImage: 'https://i.imgur.com/wN3qDwS.gif',
    modelUrl: 'https://models-cdn.shadow-system.org/tank-hd.glb',
    rank: 'C',
    level: 18,
    difficulty: 'easy',
    rewards: ['golem-core', 'stone-fragment'],
    xpReward: 500,
    title: 'Stone Defender',
    requiredLevel: 5,
    origin: 'Ancient Ruins',
    abilities: ['Rock Throw', 'Earthquake', 'Stone Skin'],
    animationEffects: {
      entryAnimation: 'stone-emerge',
      idleAnimation: 'stone-idle',
      attackAnimation: 'rock-throw',
      defeatAnimation: 'stone-shatter',
      particleEffects: ['stone-dust', 'rock-debris'],
      glowColor: '#964b00',
      soundEffects: {
        entry: 'stone-emergence.mp3',
        attack: 'rock-throw.mp3',
        defeat: 'stone-shatter.mp3'
      }
    },
    animeShaderEffects: true,
    realisticRenderingStyle: 'anime'
  },
  {
    id: 'kamish',
    name: 'Kamish, Dragon of Destruction',
    description: 'One of the most powerful dragons and a disaster-level threat. His destructive breath can melt entire cities.',
    image: 'https://i.imgur.com/6BtN8Hy.png',
    animatedImage: 'https://i.imgur.com/wN3qDwS.gif',
    modelUrl: 'https://models-cdn.shadow-system.org/kamish-hd.glb',
    rank: 'S',
    level: 50,
    difficulty: 'extreme',
    rewards: ['dragon-heart', 'destruction-scale'],
    xpReward: 3000,
    title: 'Dragon Slayer',
    requiredLevel: 30,
    origin: 'Dragon\'s Lair',
    abilities: ['Destruction Breath', 'Dragon\'s Roar', 'Scale Armor', 'Flight'],
    animationEffects: {
      entryAnimation: 'dragon-emerge',
      idleAnimation: 'dragon-idle',
      attackAnimation: 'destruction-breath',
      defeatAnimation: 'dragon-defeat',
      particleEffects: ['fire-spark', 'smoke'],
      glowColor: '#ff9900',
      soundEffects: {
        entry: 'dragon-roar.mp3',
        attack: 'destruction-breath.mp3',
        defeat: 'dragon-defeat.mp3'
      }
    },
    animeShaderEffects: true,
    realisticRenderingStyle: 'anime'
  },
  {
    id: 'iron-body',
    name: 'Iron Body, Knight of Demons',
    description: 'A knight with an iron body that can withstand tremendous damage. His armor is forged in hellfire.',
    image: 'https://i.imgur.com/6BtN8Hy.png',
    animatedImage: 'https://i.imgur.com/wN3qDwS.gif',
    modelUrl: 'https://models-cdn.shadow-system.org/iron-body-hd.glb',
    rank: 'A',
    level: 30,
    difficulty: 'hard',
    rewards: ['hellfire-plate', 'demon-iron'],
    xpReward: 1200,
    title: 'Iron-Willed',
    requiredLevel: 12,
    origin: 'Demon Castle',
    abilities: ['Iron Strike', 'Hellfire Shield', 'Unbreakable Will'],
    animationEffects: {
      entryAnimation: 'iron-emerge',
      idleAnimation: 'iron-idle',
      attackAnimation: 'iron-strike',
      defeatAnimation: 'iron-shatter',
      particleEffects: ['iron-spark', 'hellfire'],
      glowColor: '#ff3737',
      soundEffects: {
        entry: 'iron-emergence.mp3',
        attack: 'iron-strike.mp3',
        defeat: 'iron-shatter.mp3'
      }
    },
    animeShaderEffects: true,
    realisticRenderingStyle: 'anime'
  },
  {
    id: 'frost-monarch',
    name: 'Frost Monarch',
    description: 'One of the rulers of the demon world who controls ice and frost. His presence alone freezes the surroundings.',
    image: 'https://i.imgur.com/6BtN8Hy.png',
    animatedImage: 'https://i.imgur.com/wN3qDwS.gif',
    modelUrl: 'https://models-cdn.shadow-system.org/frost-monarch-hd.glb',
    rank: 'S',
    level: 48,
    difficulty: 'extreme',
    rewards: ['frost-crystal', 'monarch-crown'],
    xpReward: 2800,
    title: 'Winter\'s Herald',
    requiredLevel: 28,
    origin: 'Frozen Realm',
    abilities: ['Blizzard', 'Ice Spikes', 'Frost Armor', 'Winter\'s Grip'],
    animationEffects: {
      entryAnimation: 'frost-emerge',
      idleAnimation: 'frost-idle',
      attackAnimation: 'blizzard',
      defeatAnimation: 'frost-shatter',
      particleEffects: ['snowflake', 'ice-shard'],
      glowColor: '#66ccff',
      soundEffects: {
        entry: 'frost-emergence.mp3',
        attack: 'blizzard.mp3',
        defeat: 'frost-shatter.mp3'
      }
    },
    animeShaderEffects: true,
    realisticRenderingStyle: 'anime'
  },
  {
    id: 'cerberus',
    name: 'Cerberus, Hound of Hell',
    description: 'A three-headed beast that guards the gates of the demon realm. Each head possesses a different elemental power.',
    image: 'https://i.imgur.com/6BtN8Hy.png',
    animatedImage: 'https://i.imgur.com/wN3qDwS.gif',
    modelUrl: 'https://models-cdn.shadow-system.org/cerberus-hd.glb',
    rank: 'B',
    level: 25,
    difficulty: 'medium',
    rewards: ['hellhound-fang', 'guardian-collar'],
    xpReward: 1000,
    title: 'Gate Guardian',
    requiredLevel: 10,
    origin: 'Hell\'s Gate',
    abilities: ['Triple Howl', 'Fire Breath', 'Ice Breath', 'Lightning Breath'],
    animationEffects: {
      entryAnimation: 'cerberus-emerge',
      idleAnimation: 'cerberus-idle',
      attackAnimation: 'triple-howl',
      defeatAnimation: 'cerberus-defeat',
      particleEffects: ['fire-spark', 'ice-shard', 'lightning-bolt'],
      glowColor: '#ff9900',
      soundEffects: {
        entry: 'cerberus-roar.mp3',
        attack: 'triple-howl.mp3',
        defeat: 'cerberus-defeat.mp3'
      }
    },
    animeShaderEffects: true,
    realisticRenderingStyle: 'anime'
  },
  {
    id: 'architect',
    name: 'The Architect',
    description: 'The creator of the system who tests hunters with intricate dungeons. His knowledge of the system is unparalleled.',
    image: 'https://i.imgur.com/6BtN8Hy.png',
    animatedImage: 'https://i.imgur.com/wN3qDwS.gif',
    modelUrl: 'https://models-cdn.shadow-system.org/architect-hd.glb',
    rank: 'S',
    level: 55,
    difficulty: 'extreme',
    rewards: ['system-key', 'architect-staff'],
    xpReward: 3500,
    title: 'System Administrator',
    requiredLevel: 35,
    origin: 'The System',
    abilities: ['Reality Manipulation', 'Dungeon Creation', 'Gate Formation', 'Memory Access'],
    animationEffects: {
      entryAnimation: 'architect-emerge',
      idleAnimation: 'architect-idle',
      attackAnimation: 'reality-manipulation',
      defeatAnimation: 'architect-defeat',
      particleEffects: ['code-bit', 'system-glitch'],
      glowColor: '#33ccff',
      soundEffects: {
        entry: 'architect-emergence.mp3',
        attack: 'reality-manipulation.mp3',
        defeat: 'architect-defeat.mp3'
      }
    },
    animeShaderEffects: true,
    realisticRenderingStyle: 'anime'
  },
  {
    id: 'antares',
    name: 'Antares, King of Dragons',
    description: 'The absolute ruler of all dragons and the most powerful of the monarchs. His existence threatens the balance of the world.',
    image: 'https://i.imgur.com/6BtN8Hy.png',
    animatedImage: 'https://i.imgur.com/wN3qDwS.gif',
    modelUrl: 'https://models-cdn.shadow-system.org/antares-hd.glb',
    rank: 'S',
    level: 60,
    difficulty: 'extreme',
    rewards: ['monarch-heart', 'destruction-essence'],
    xpReward: 4000,
    title: 'Dragon Emperor',
    requiredLevel: 40,
    origin: 'Dragon Realm',
    abilities: ['Dragon\'s Breath', 'Monarch\'s Authority', 'Destruction Aura', 'World Ender'],
    animationEffects: {
      entryAnimation: 'antares-emerge',
      idleAnimation: 'antares-idle',
      attackAnimation: 'dragon-breath',
      defeatAnimation: 'antares-defeat',
      particleEffects: ['fire-spark', 'smoke'],
      glowColor: '#ff9900',
      soundEffects: {
        entry: 'antares-roar.mp3',
        attack: 'dragon-breath.mp3',
        defeat: 'antares-defeat.mp3'
      }
    },
    animeShaderEffects: true,
    realisticRenderingStyle: 'anime'
  },
  {
    id: 'shadow-sovereign',
    name: 'Ashborn, Shadow Sovereign',
    description: 'The original Shadow Monarch whose powers were passed to Sung Jin-Woo. His control over shadows is absolute.',
    image: 'https://i.imgur.com/6BtN8Hy.png',
    animatedImage: 'https://i.imgur.com/wN3qDwS.gif',
    modelUrl: 'https://models-cdn.shadow-system.org/shadow-sovereign-hd.glb',
    rank: 'S',
    level: 65,
    difficulty: 'extreme',
    rewards: ['shadow-heart', 'sovereign-dagger'],
    xpReward: 4500,
    title: 'Lord of Shadows',
    requiredLevel: 45,
    origin: 'Shadow Realm',
    abilities: ['Shadow Extraction', 'Army of Darkness', 'Domain Expansion', 'Eternal Slumber'],
    animationEffects: {
      entryAnimation: 'shadow-emerge',
      idleAnimation: 'shadow-idle',
      attackAnimation: 'shadow-extraction',
      defeatAnimation: 'shadow-defeat',
      particleEffects: ['shadow', 'darkness'],
      glowColor: '#6a0dad',
      soundEffects: {
        entry: 'shadow-emergence.mp3',
        attack: 'shadow-extraction.mp3',
        defeat: 'shadow-defeat.mp3'
      }
    },
    animeShaderEffects: true,
    realisticRenderingStyle: 'anime'
  }
];

export const getMonsterById = (id: string): Monster | undefined => {
  return monsters.find(monster => monster.id === id);
};

export const getMonstersByRank = (rank: MonsterRank): Monster[] => {
  return monsters.filter(monster => monster.rank === rank);
};

export const getMonstersByLevel = (level: number): Monster[] => {
  return monsters.filter(monster => monster.requiredLevel <= level);
};

export const getAllMonsters = (): Monster[] => {
  return [...monsters];
};

// Item definitions for rewards
export const monsterRewards = {
  'shadow-knight-blade': {
    id: 'shadow-knight-blade',
    name: 'Shadow Knight\'s Blade',
    description: 'A sword forged from the shadows of Igris. It can cut through spiritual entities.',
    rarity: 'epic',
    type: 'sword',
    image: 'https://i.imgur.com/D9fhW7p.png',
    animatedImage: 'https://i.imgur.com/z3Jxe2q.gif',
    modelUrl: 'https://models-cdn.shadow-system.org/shadow-knight-blade-hd.glb',
    stats: {
      power: 45,
      defense: 0
    },
    ability: 'Shadow Strike: 15% chance to deal double damage to spiritual entities',
    animationEffects: {
      equippedAnimation: 'shadow-wisps',
      useAnimation: 'shadow-slash',
      particleEffects: ['shadow', 'purple-spark'],
      glowColor: '#6a0dad'
    }
  },
  'marshal-insignia': {
    id: 'marshal-insignia',
    name: 'Marshal\'s Insignia',
    description: 'The badge of office worn by Igris when he served as Marshal of the demons.',
    rarity: 'rare',
    type: 'accessory',
    image: 'https://i.imgur.com/b8LZnVc.png',
    animatedImage: 'https://i.imgur.com/T4jVQEy.gif',
    modelUrl: 'https://models-cdn.shadow-system.org/marshal-insignia-hd.glb',
    stats: {
      power: 10,
      defense: 15
    },
    ability: 'Commander\'s Aura: Increases party defense by 10%',
    animationEffects: {
      equippedAnimation: 'aura-pulse',
      useAnimation: 'command-shout',
      particleEffects: ['royal-aura', 'leadership-spark'],
      glowColor: '#9370db'
    }
  },
  // ... many more reward definitions
};
