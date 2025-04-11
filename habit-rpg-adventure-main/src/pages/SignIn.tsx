import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { playSound, SOUNDS } from '@/utils/sound';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { applyGlitchEffect, GlitchType } from '@/utils/glitchEffect';

const SignIn = () => {
  const [secretWord, setSecretWord] = useState('');
  const [savedSecretWord, setSavedSecretWord] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Play welcome sound when sign-in page loads
    playSound(SOUNDS.WELCOME, 0.4);
    
    // Check if there's already a saved secret word
    const savedWord = localStorage.getItem('app_secret_word');
    if (savedWord) {
      setSavedSecretWord(savedWord);
    }
  }, []);

  const handleSecretWordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!secretWord.trim()) {
      setErrorMessage('Please enter a secret word');
      setIsLoading(false);
      return;
    }
    
    // Apply glitch effect to the form
    const formElement = document.getElementById('signin-form');
    if (formElement) {
      applyGlitchEffect(formElement, GlitchType.MILD, 800);
    }
    
    // First time setting the secret word
    if (!savedSecretWord) {
      setTimeout(() => {
        localStorage.setItem('app_secret_word', secretWord);
        playSound(SOUNDS.LEVEL_UP, 0.4);
        navigate('/');
      }, 1000);
    } 
    // Validating against existing secret word
    else if (secretWord === savedSecretWord) {
      setTimeout(() => {
        playSound(SOUNDS.COMPLETE, 0.4);
        navigate('/');
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setErrorMessage('Incorrect secret word. Please try again.');
        playSound(SOUNDS.ERROR, 0.3);
      }, 800);
    }
  };

  const handleSignup = () => {
    playSound(SOUNDS.BUTTON, 0.3);
    navigate('/signup');
  };

  const handleContinueWithoutAccount = () => {
    // Generate a temporary secret word
    const tempSecretWord = `guest-${Date.now()}`;
    localStorage.setItem('app_secret_word', tempSecretWord);
    
    // Apply glitch effect to the form
    const formElement = document.getElementById('signin-form');
    if (formElement) {
      applyGlitchEffect(formElement, GlitchType.MEDIUM, 1000);
    }
    
    playSound(SOUNDS.GLITCH, 0.3);
    
    toast({
      title: "Guest Mode Activated",
      description: "Your progress won't be saved permanently",
      variant: "default"
    });
    
    setTimeout(() => {
      navigate('/');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-solo-darker text-white" 
         style={{backgroundImage: "radial-gradient(circle at 50% 0%, rgba(46, 107, 255, 0.15) 0%, rgba(15, 20, 33, 0) 50%)", backgroundAttachment: "fixed"}}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel border-2 border-solo-blue/40 p-8 shadow-[0_0_20px_rgba(46,107,255,0.3)] w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-solo-blue-light">HUNTER SIGN IN</h1>
        
        {savedSecretWord ? (
          <div className="mb-8">
            <form id="signin-form" onSubmit={handleSecretWordSubmit}>
              <h2 className="text-lg font-medium mb-3 text-solo-blue-light">Enter your secret word to continue</h2>
              <Input 
                type="password"
                value={secretWord}
                onChange={(e) => setSecretWord(e.target.value)}
                placeholder="Your secret word"
                className="bg-solo-dark border-solo-blue/30 text-white rounded p-2 mb-4 w-full"
              />
              {errorMessage && <p className="text-red-500 mb-3">{errorMessage}</p>}
              <Button 
                type="submit" 
                className="bg-solo-blue hover:bg-blue-700 text-white py-2 px-4 rounded shadow-[0_0_10px_rgba(46,107,255,0.3)] w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground"></div>
                    Entering...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2" size={18} />
                    Enter Adventure
                  </>
                )}
              </Button>
              <div className="flex justify-between mt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 mr-2"
                  onClick={handleSignup}
                >
                  Sign Up
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="flex-1 ml-2"
                  onClick={handleContinueWithoutAccount}
                >
                  Continue Without Account
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <form id="signin-form" onSubmit={handleSecretWordSubmit}>
                <h2 className="text-lg font-medium mb-3 text-solo-blue-light">Create a secret word</h2>
                <p className="text-gray-400 mb-3 text-sm">This will be used to protect your data. Remember it carefully!</p>
                <Input 
                  type="password"
                  value={secretWord}
                  onChange={(e) => setSecretWord(e.target.value)}
                  placeholder="Create a secret word"
                  className="bg-solo-dark border-solo-blue/30 text-white rounded p-2 mb-4 w-full"
                />
                {errorMessage && <p className="text-red-500 mb-3">{errorMessage}</p>}
                <Button 
                  type="submit" 
                  className="bg-solo-blue hover:bg-blue-700 text-white py-2 px-4 rounded shadow-[0_0_10px_rgba(46,107,255,0.3)] w-full"
                >
                  <LogIn className="mr-2" size={18} />
                  Set Secret Word & Continue
                </Button>
              </form>
            </div>
            
            {/* Signup and continue without account buttons removed */}
            
            {/* SignIn with section removed */}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default SignIn;
