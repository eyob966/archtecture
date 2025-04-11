import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { playSound, SOUNDS } from '@/utils/sound';
import { applyGlitchEffect, GlitchType } from '@/utils/glitchEffect';

export type ImageType = 'monster' | 'reward' | 'glitch';

interface ImageUploaderProps {
  type: ImageType;
  onImageUpload: (imageUrl: string, type: ImageType) => void;
  currentImage?: string;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  type,
  onImageUpload,
  currentImage,
  className
}) => {
  const [image, setImage] = useState<string | null>(currentImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setImage(imageUrl);
      onImageUpload(imageUrl, type);
      
      // Apply glitch effect to the container
      if (containerRef.current) {
        applyGlitchEffect(containerRef.current, GlitchType.MILD, 800);
      }
      
      playSound(SOUNDS.GLITCH, 0.3);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    playSound(SOUNDS.BUTTON, 0.3);
  };

  const getTypeName = () => {
    switch (type) {
      case 'monster':
        return 'Monster';
      case 'reward':
        return 'Reward';
      case 'glitch':
        return 'Glitch Effect';
      default:
        return 'Image';
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      data-text={`${getTypeName()} Image`}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
        id={`image-upload-${type}`}
      />
      
      {!image ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] transition-all cursor-pointer ${
            isDragging 
              ? 'border-solo-blue bg-solo-blue/10' 
              : 'border-gray-600 hover:border-solo-blue hover:bg-solo-blue/5'
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <ImageIcon className="w-12 h-12 text-gray-400 mb-3" />
          <p className="text-gray-400 mb-2">Drag & drop your {getTypeName().toLowerCase()} image here</p>
          <p className="text-gray-500 text-sm mb-4">or</p>
          <Button 
            variant="outline" 
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
              playSound(SOUNDS.BUTTON, 0.3);
            }}
            className="bg-solo-blue/10 hover:bg-solo-blue/20"
          >
            <Upload className="w-4 h-4 mr-2" />
            Browse Files
          </Button>
        </div>
      ) : (
        <div className="relative group">
          <img 
            src={image} 
            alt={`${getTypeName()} image`} 
            className="w-full h-auto rounded-lg object-cover max-h-[300px] border-2 border-solo-blue/40 shadow-[0_0_15px_rgba(46,107,255,0.3)]"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemoveImage}
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              className="bg-background/20 hover:bg-background/40 border-white/30"
            >
              <Upload className="w-4 h-4 mr-2" />
              Replace Image
            </Button>
          </div>
        </div>
      )}
      
      <p className="text-sm text-gray-400 mt-2 text-center">
        {getTypeName()} images will be used in the app to personalize your experience
      </p>
    </div>
  );
};

export default ImageUploader;
