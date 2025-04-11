import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { playSound, SOUNDS } from '@/utils/sound';
import { useHabitContext } from '@/context/HabitContext';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Sword } from 'lucide-react';

const SignUp = () => {
  const navigate = useNavigate();
  const { initializeUserProfile } = useHabitContext();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Form validation
    if (!email || !username || !password) {
      toast.error('Please fill in all fields');
      setIsLoading(false);
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    // Animation effect before proceeding
    setIsAnimating(true);
    playSound(SOUNDS.LEVEL_UP, 0.5);
    
    // Create user profile
    setTimeout(() => {
      // Save user data (in real app, this would go to a backend)
      localStorage.setItem('user_email', email);
      localStorage.setItem('user_name', username);
      localStorage.setItem('authenticated', 'true');
      
      // Initialize user profile
      initializeUserProfile(username);
      
      toast.success('Welcome, Hunter!', {
        description: 'Your journey has begun. Conquer your habits and level up!'
      });
      
      // Redirect to home page
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-solo-darker text-white relative overflow-hidden" 
         style={{backgroundImage: "radial-gradient(circle at 50% 0%, rgba(46, 107, 255, 0.15) 0%, rgba(15, 20, 33, 0) 50%)", backgroundAttachment: "fixed"}}>
      {/* Anime-style background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://i.postimg.cc/3J9L7sPt/shadow-particles.png')] bg-repeat opacity-10"></div>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-20 bg-blue-500/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(3px)'
            }}
            animate={{
              height: [20, 100, 20],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel border-2 border-solo-blue/40 p-8 shadow-[0_0_30px_rgba(46,107,255,0.4)] w-full max-w-md relative z-10"
      >
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-32 h-32">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-32 h-32 rounded-full bg-solo-blue/20 border-2 border-solo-blue/50 flex items-center justify-center shadow-[0_0_20px_rgba(46,107,255,0.5)]"
          >
            <Sword className="w-16 h-16 text-solo-blue" />
          </motion.div>
        </div>
        
        <h1 className="text-3xl font-bold mb-1 text-center text-solo-blue-light mt-8">BECOME A HUNTER</h1>
        <p className="text-center text-gray-400 mb-8">Enter the Shadow World and rise to power</p>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-300">Hunter Name</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-solo-dark border-solo-blue/30 text-white"
                placeholder="Enter your hunter name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-solo-dark border-solo-blue/30 text-white"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-solo-dark border-solo-blue/30 text-white"
                placeholder="Create a password"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-solo-dark border-solo-blue/30 text-white"
                placeholder="Confirm your password"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-solo-blue hover:bg-blue-700 mt-6 relative overflow-hidden group"
              disabled={isLoading || isAnimating}
            >
              {isAnimating ? (
                <motion.span
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div 
                    className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-600"
                    animate={{ 
                      x: ['-100%', '100%'],
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <span className="relative z-10">Becoming a Hunter...</span>
                </motion.span>
              ) : 'Create Account'}
            </Button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already a Hunter?{" "}
            <a href="/sign-in" className="text-solo-blue-light hover:text-blue-400">
              Sign In
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
