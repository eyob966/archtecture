import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ImageUploader, { ImageType } from '@/components/ui-custom/ImageUploader';
import { playSound, SOUNDS } from '@/utils/sound';
import { applyGlitchEffect, GlitchType } from '@/utils/glitchEffect';

interface CustomImages {
  monster: string | null;
  reward: string | null;
  glitch: string | null;
}

const CustomizeImages: React.FC = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<CustomImages>({
    monster: null,
    reward: null,
    glitch: null
  });
  const [isSaving, setIsSaving] = useState(false);

  // Load saved images on component mount
  useEffect(() => {
    const savedImages = localStorage.getItem('customImages');
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    }
  }, []);

  const handleImageUpload = (imageUrl: string, type: ImageType) => {
    setImages(prev => ({
      ...prev,
      [type]: imageUrl
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    playSound(SOUNDS.COMPLETE, 0.4);
    
    // Save images to localStorage
    localStorage.setItem('customImages', JSON.stringify(images));
    
    // Apply glitch effect to the save button
    const saveButton = document.getElementById('save-button');
    if (saveButton) {
      applyGlitchEffect(saveButton, GlitchType.SEVERE, 800);
    }
    
    setTimeout(() => {
      setIsSaving(false);
      navigate('/');
    }, 1000);
  };

  const handleBack = () => {
    playSound(SOUNDS.BUTTON, 0.3);
    navigate('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-solo-dark p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="text-gray-300 hover:text-white hover:bg-solo-blue/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-2xl md:text-3xl font-bold text-center text-glow">
            Customize Your Adventure
          </h1>
          
          <Button 
            id="save-button"
            onClick={handleSave}
            disabled={isSaving}
            className="bg-solo-blue hover:bg-solo-blue-light shadow-blue-glow-intense"
          >
            {isSaving ? 'Saving...' : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save
              </>
            )}
          </Button>
        </div>
        
        <div className="glass-panel p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b border-solo-gray/30 pb-2">
            Personalize Your Experience
          </h2>
          <p className="text-gray-300 mb-6">
            Upload custom images to make your adventure unique. These images will be used throughout the app to enhance your experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ImageUploader 
              type="monster" 
              onImageUpload={handleImageUpload}
              currentImage={images.monster || undefined}
              className="col-span-1"
            />
            
            <ImageUploader 
              type="reward" 
              onImageUpload={handleImageUpload}
              currentImage={images.reward || undefined}
              className="col-span-1"
            />
            
            <ImageUploader 
              type="glitch" 
              onImageUpload={handleImageUpload}
              currentImage={images.glitch || undefined}
              className="col-span-1"
            />
          </div>
        </div>
        
        <div className="glass-panel p-6">
          <h2 className="text-xl font-semibold mb-4 border-b border-solo-gray/30 pb-2">
            How Custom Images Work
          </h2>
          
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="font-medium text-white mb-1">Monster Images</h3>
              <p>Custom monster images will appear as enemies you need to defeat by completing your habits and quests.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-1">Reward Images</h3>
              <p>Custom reward images will be displayed when you earn rewards or complete significant milestones.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-1">Glitch Effect Images</h3>
              <p>These images will be used as overlays for special glitch effects that occur during important game events.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomizeImages;
