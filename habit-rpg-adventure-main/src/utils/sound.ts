
// Sound effect utility for app-wide sound management
const soundEnabled = () => {
  const setting = localStorage.getItem('soundEnabled');
  return setting === null ? true : setting === 'true';
};

export const toggleSound = () => {
  const current = soundEnabled();
  localStorage.setItem('soundEnabled', (!current).toString());
  return !current;
};

export const playSound = (soundName: string, volume = 0.5) => {
  if (!soundEnabled()) return;
  
  try {
    const audio = new Audio(`/sounds/${soundName}.mp3`);
    audio.volume = volume;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
  } catch (error) {
    console.log('Sound playback error:', error);
  }
};

// Sound effect names
export const SOUNDS = {
  WELCOME: 'welcome',
  LEVEL_UP: 'level-up',
  COMPLETE: 'complete',
  REWARD: 'reward',
  EQUIP: 'equip',
  BUTTON: 'button-click',
  ERROR: 'error',
  TAB_SWITCH: 'tab-switch',
  MISSION_START: 'mission-start',
  GLITCH: 'glitch',
  MONSTER_DEFEATED: 'monster-defeated'
};
