
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Shield, Sword } from 'lucide-react';
import { toast } from 'sonner';
import { useHabitContext } from '@/context/HabitContext';
import { playSound, SOUNDS } from '@/utils/sound';

interface SignUpFormProps {
  onComplete: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onComplete }) => {
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateUserProfile } = useHabitContext();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      toast.error('Please enter a username');
      playSound(SOUNDS.ERROR, 0.3);
      return;
    }
    
    setIsSubmitting(true);
    
    // Update user profile with the new username
    updateUserProfile({ username });
    
    // Simulate saving to database
    setTimeout(() => {
      setIsSubmitting(false);
      playSound(SOUNDS.REWARD, 0.4);
      toast.success('Account created successfully!');
      onComplete();
    }, 800);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">
          <span className="text-green-400">Create Your Account</span>
        </h2>
        <p className="text-gray-300">Enter your hunter name to begin your journey</p>
      </div>
      
      <div className="flex justify-center space-x-4 mb-4">
        <div className="flex flex-col items-center text-gray-400">
          <Shield className="text-solo-blue-light mb-1" size={20} />
          <span className="text-xs">Protection</span>
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <Sword className="text-solo-blue-light mb-1" size={20} />
          <span className="text-xs">Power</span>
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <Sparkles className="text-green-400 mb-1" size={20} />
          <span className="text-xs">Magic</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-white">Hunter Name</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your hunter name"
            className="bg-solo-dark border-solo-blue/30 text-white placeholder:text-gray-500"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="solo-button w-full flex items-center justify-center"
          onClick={() => playSound(SOUNDS.BUTTON, 0.2)}
        >
          {isSubmitting ? (
            <span>Creating...</span>
          ) : (
            <>
              <Sparkles className="mr-2" size={18} />
              Begin Journey
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default SignUpForm;
