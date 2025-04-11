
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HabitProvider, useHabitContext } from "./context/HabitContext";
import Index from "./pages/Index";
import Stats from "./pages/Stats";
import NewHabit from "./pages/NewHabit";
import NewQuest from "./pages/NewQuest";
import QuestDetail from "./pages/QuestDetail";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Dungeon from "./pages/Dungeon";
import CustomizeImages from "./pages/CustomizeImages";
import WelcomeScreen from "./components/ui-custom/WelcomeScreen";
import { playSound, SOUNDS } from "./utils/sound";

const queryClient = new QueryClient();

// Wrap the app to check for first-time users
const AppWithWelcomeCheck = () => {
  const { isNewUser, setIsNewUser, resetAllData } = useHabitContext();
  const [showWelcome, setShowWelcome] = useState(false);
  
  useEffect(() => {
    if (isNewUser) {
      setShowWelcome(true);
    }
  }, [isNewUser]);

  useEffect(() => {
    // Preload audio files
    const audioFiles = [
      SOUNDS.WELCOME,
      SOUNDS.LEVEL_UP,
      SOUNDS.COMPLETE,
      SOUNDS.REWARD,
      SOUNDS.EQUIP,
      SOUNDS.BUTTON,
      SOUNDS.ERROR,
      SOUNDS.TAB_SWITCH,
      SOUNDS.MISSION_START,
      SOUNDS.GLITCH,
      SOUNDS.MONSTER_DEFEATED
    ];
    
    audioFiles.forEach(sound => {
      try {
        const audio = new Audio(`/sounds/${sound}.mp3`);
        audio.preload = 'auto';
      } catch (error) {
        console.log('Sound preloading error:', error);
      }
    });
  }, []);
  
  if (showWelcome) {
    return (
      <WelcomeScreen 
        onComplete={() => {
          setIsNewUser(false);
          setShowWelcome(false);
          playSound(SOUNDS.LEVEL_UP, 0.4);
        }}
        onReset={resetAllData}
      />
    );
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/habits/new" element={<NewHabit />} />
        <Route path="/quests/new" element={<NewQuest />} />
        <Route path="/quests/:id" element={<QuestDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dungeon" element={<Dungeon />} />
        <Route path="/customize-images" element={<CustomizeImages />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HabitProvider>
        <Toaster />
        <Sonner />
        <AppWithWelcomeCheck />
      </HabitProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
