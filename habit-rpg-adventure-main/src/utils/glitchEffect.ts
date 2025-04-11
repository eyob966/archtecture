// Realistic glitch effect utility for UI elements

// Glitch effect types
export enum GlitchType {
  MILD = 'mild',
  MEDIUM = 'medium',
  SEVERE = 'severe',
  CORRUPTION = 'corruption'
}

// Apply glitch effect to an element
export const applyGlitchEffect = (element: HTMLElement, type: GlitchType = GlitchType.MEDIUM, duration: number = 1000) => {
  if (!element) return;
  
  // Remove any existing glitch classes
  element.classList.remove('glitch-effect', 'glitch-mild', 'glitch-medium', 'glitch-severe', 'glitch-corruption');
  
  // Add the base glitch class and the specific type
  element.classList.add('glitch-effect', `glitch-${type}`);
  
  // Play glitch sound
  try {
    const audio = new Audio(`/sounds/glitch.mp3`);
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
  } catch (error) {
    console.log('Sound playback error:', error);
  }
  
  // Remove the effect after the duration
  setTimeout(() => {
    element.classList.remove('glitch-effect', `glitch-${type}`);
  }, duration);
};

// Apply glitch effect to text content
export const applyTextGlitch = (element: HTMLElement, duration: number = 1000) => {
  if (!element) return;
  
  const originalText = element.innerText;
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/\\`~';
  
  let interval: number | null = null;
  let counter = 0;
  const maxIterations = 10;
  
  interval = window.setInterval(() => {
    if (counter >= maxIterations) {
      if (interval) clearInterval(interval);
      element.innerText = originalText;
      return;
    }
    
    let glitchedText = '';
    for (let i = 0; i < originalText.length; i++) {
      // 30% chance to replace with a glitch character
      if (Math.random() < 0.3) {
        glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
      } else {
        glitchedText += originalText[i];
      }
    }
    
    element.innerText = glitchedText;
    counter++;
    
    // Last iteration, restore original text
    if (counter >= maxIterations) {
      setTimeout(() => {
        element.innerText = originalText;
      }, 50);
    }
  }, duration / maxIterations);
};

// Apply penalty glitch effect (more severe, with red color)
export const applyPenaltyGlitch = (element: HTMLElement, penalty: string, duration: number = 2000, persistent: boolean = false) => {
  if (!element) return;
  
  // Add the penalty glitch class
  element.classList.add('penalty-glitch-effect');
  
  // Remove any existing penalty overlay
  const existingOverlay = document.querySelector('.penalty-overlay');
  if (existingOverlay) {
    document.body.removeChild(existingOverlay);
  }
  
  // Create a penalty overlay
  const overlay = document.createElement('div');
  overlay.className = 'penalty-overlay';
  overlay.innerHTML = `
    <div class="penalty-content">
      <div class="penalty-title">PENALTY ACTIVATED</div>
      <div class="penalty-description">${penalty}</div>
      <!-- Button will be dynamically added here -->
    </div>
  `;
  
  // Add to body
  document.body.appendChild(overlay);
  
  // Play glitch sound
  try {
    const audio = new Audio(`/sounds/severe-glitch.mp3`);
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
  } catch (error) {
    console.log('Sound playback error:', error);
  }
  
  // If not persistent, remove after duration
  if (!persistent) {
    setTimeout(() => {
      element.classList.remove('penalty-glitch-effect');
      overlay.classList.add('fade-out');
      
      setTimeout(() => {
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
      }, 500);
    }, duration);
  }
  
  // Return the overlay element so it can be removed later
  return overlay;
};

// Apply anime-style glitch transition effect
export const applyTransitionGlitch = (callback: () => void, duration: number = 1500) => {
  // Create a full-screen overlay
  const overlay = document.createElement('div');
  overlay.className = 'transition-glitch-overlay';
  
  // Add to body
  document.body.appendChild(overlay);
  
  // Play glitch sound
  try {
    const audio = new Audio(`/sounds/severe-glitch.mp3`);
    audio.volume = 0.6;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
  } catch (error) {
    console.log('Sound playback error:', error);
  }
  
  // Execute callback after the glitch effect
  setTimeout(() => {
    callback();
    
    // Remove the overlay with fade out
    overlay.classList.add('fade-out');
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
    }, 500);
  }, duration);
};
