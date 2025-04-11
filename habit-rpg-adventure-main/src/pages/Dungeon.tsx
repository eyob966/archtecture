
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHabitContext } from '@/context/HabitContext';
import { Sword, Shield, Swords, Calendar, Clock, Award, Trophy, Flame, ArrowRight, Lock, Skull, Ghost } from 'lucide-react';
import { monsters } from '@/data/monsters';
import { Monster, DungeonMission } from '@/types';
import { Button } from '@/components/ui/button';
import { playSound, SOUNDS } from '@/utils/sound';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import RankBadge from '@/components/ui-custom/RankBadge';

const Dungeon = () => {
  const { userProfile, startDungeonMission } = useHabitContext();
  const navigate = useNavigate();
  const [selectedMonsterId, setSelectedMonsterId] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [missionSteps, setMissionSteps] = useState<string[]>([]);
  const [missionTitle, setMissionTitle] = useState('');
  const [missionDescription, setMissionDescription] = useState('');
  const [showMonsterSelection, setShowMonsterSelection] = useState(true);
  
  const availableMonsters = monsters;
  
  const selectedMonster = selectedMonsterId 
    ? monsters.find(m => m.id === selectedMonsterId) 
    : null;
  
  const handleMonsterSelect = (monster: Monster) => {
    setSelectedMonsterId(monster.id);
    setShowMonsterSelection(false);
    playSound(SOUNDS.BUTTON, 0.2);
  };
  
  const handleStartMissionClick = () => {
    if (!selectedMonster) return;
    
    setMissionTitle('');
    setMissionDescription('');
    setMissionSteps([]);
    setShowConfirmation(true);
    playSound(SOUNDS.BUTTON, 0.3);
  };
  
  const handleConfirmMission = () => {
    if (!selectedMonster || !missionTitle || !missionDescription || missionSteps.length === 0) {
      toast.error('Please fill out all mission details');
      return;
    }
    
    const dungeonSteps = missionSteps.map((step, index) => ({
      id: uuidv4(),
      description: step,
      habitIds: [],
      questIds: [],
      status: 'not_started' as const,
      requiredDays: Math.floor(Math.random() * 3) + 1,
      currentProgress: 0
    }));
    
    const newMission: DungeonMission = {
      id: uuidv4(),
      title: missionTitle,
      description: missionDescription,
      monsterId: selectedMonster.id,
      status: 'not_started',
      steps: dungeonSteps,
      startedAt: new Date().toISOString(),
      xpReward: selectedMonster.xpReward,
      requiredLevel: selectedMonster.requiredLevel,
      deadlineAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      customMonster: true,
      timeLimit: {
        hours: 168,
        minutes: 0,
        seconds: 0
      },
      penalty: 5
    };
    
    startDungeonMission(newMission);
    
    setShowConfirmation(false);
    setSelectedMonsterId(null);
    setShowMonsterSelection(true);
    
    playSound(SOUNDS.MISSION_START, 0.5);
    toast.success('Dungeon mission started!', {
      description: 'You can track your progress on the home screen.'
    });
    
    navigate('/');
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'extreme': return 'text-rose-500';
      case 'hard': return 'text-amber-500';
      case 'medium': return 'text-blue-500';
      default: return 'text-green-500';
    }
  };
  
  const addMissionStep = () => {
    setMissionSteps([...missionSteps, '']);
  };
  
  const updateMissionStep = (index: number, value: string) => {
    const updatedSteps = [...missionSteps];
    updatedSteps[index] = value;
    setMissionSteps(updatedSteps);
  };
  
  const removeMissionStep = (index: number) => {
    const updatedSteps = [...missionSteps];
    updatedSteps.splice(index, 1);
    setMissionSteps(updatedSteps);
  };
  
  const backToMonsterSelection = () => {
    setShowMonsterSelection(true);
    setSelectedMonsterId(null);
    setShowConfirmation(false);
  };
  
  if (userProfile.activeMission) {
    const activeMission = userProfile.activeMission;
    const monster = monsters.find(m => m.id === activeMission.monsterId);
    
    return (
      <div className="min-h-screen bg-solo-darker text-white p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto max-w-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-solo-blue-light">Active Dungeon Mission</h1>
            <Button variant="outline" onClick={() => navigate('/')} className="border-solo-blue">
              Back
            </Button>
          </div>
          
          <div className="glass-panel p-4 border-2 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)] mb-6">
            <div className="flex items-center mb-4">
              <Flame className="w-6 h-6 text-amber-500 mr-2" />
              <h2 className="text-xl font-bold">{activeMission.title}</h2>
            </div>
            
            <p className="text-gray-300 mb-4">{activeMission.description}</p>
            
            {monster && (
              <div className="flex items-center mb-4 p-3 bg-solo-dark rounded-md border border-solo-blue/20 shadow-[0_0_10px_rgba(46,107,255,0.2)]">
                <div className="w-16 h-16 bg-solo-dark border border-solo-blue/30 rounded-md flex items-center justify-center mr-3 shadow-[inset_0_0_10px_rgba(46,107,255,0.2)] overflow-hidden">
                  {monster.animatedImage ? (
                    <img src={monster.animatedImage} alt={monster.name} className="w-full h-full object-cover" />
                  ) : (
                    <Skull className="w-10 h-10 text-rose-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-amber-400">{monster.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <RankBadge rank={monster.rank} size="sm" />
                    <span className="text-xs text-muted-foreground">Level {monster.level}</span>
                    <span className={`text-xs ${getDifficultyColor(monster.difficulty)}`}>{monster.difficulty}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">XP Reward:</span>
                <span className="text-solo-blue-light">+{activeMission.xpReward} XP</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Deadline:</span>
                <span className="text-amber-400">
                  {new Date(activeMission.deadlineAt || '').toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress:</span>
                <span className="text-green-400">
                  {activeMission.steps.filter(s => s.status === 'completed').length} / {activeMission.steps.length} steps
                </span>
              </div>
            </div>
            
            <div className="space-y-3 mt-6">
              <h3 className="text-lg font-medium text-solo-blue-light flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Mission Steps
              </h3>
              
              {activeMission.steps.map((step, index) => (
                <div 
                  key={step.id} 
                  className={`p-3 border rounded-md ${
                    step.status === 'completed' 
                      ? 'border-green-500/30 bg-green-900/10 shadow-[0_0_10px_rgba(22,163,74,0.2)]' 
                      : step.status === 'in_progress'
                        ? 'border-amber-500/30 bg-amber-900/10 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                        : 'border-gray-500/30 bg-gray-900/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-gray-400 mr-2">Step {index + 1}:</span>
                      <span className={step.status === 'completed' ? 'text-green-400' : ''}>{step.description}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {step.currentProgress}/{step.requiredDays} days
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-400 mb-4">
              Your mission is in progress. Complete daily habits and quests to progress in your mission steps.
            </p>
            <Button 
              variant="default" 
              className="bg-solo-blue hover:bg-solo-blue/80 shadow-[0_0_10px_rgba(46,107,255,0.4)]"
              onClick={() => navigate('/')}
            >
              Return to Home
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-solo-darker text-white p-4" 
         style={{backgroundImage: "radial-gradient(circle at 50% 0%, rgba(46, 107, 255, 0.15) 0%, rgba(15, 20, 33, 0) 50%)", backgroundAttachment: "fixed"}}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-glow flex items-center">
            <Sword className="mr-2 text-solo-blue" />
            Dungeon
          </h1>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')} 
            className="border-solo-blue/50 hover:border-solo-blue text-solo-blue-light hover:bg-solo-blue/10"
          >
            Back
          </Button>
        </div>
        
        {showConfirmation ? (
          <div className="glass-panel p-6 border-2 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            <h2 className="text-xl font-bold mb-4 text-amber-400 flex items-center">
              <Ghost className="w-5 h-5 mr-2" />
              Mission Details
            </h2>
            <p className="text-gray-300 mb-6">
              Once you start this mission, you will be committed to it. You cannot delete or abandon it without penalties.
            </p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Mission Title</label>
                <input
                  type="text"
                  value={missionTitle}
                  onChange={(e) => setMissionTitle(e.target.value)}
                  className="w-full p-2 bg-solo-dark border border-solo-blue/30 rounded-md focus:outline-none focus:ring-1 focus:ring-solo-blue text-white"
                  placeholder="Enter a title for your mission"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Mission Description</label>
                <textarea
                  value={missionDescription}
                  onChange={(e) => setMissionDescription(e.target.value)}
                  className="w-full p-2 bg-solo-dark border border-solo-blue/30 rounded-md focus:outline-none focus:ring-1 focus:ring-solo-blue h-20 text-white"
                  placeholder="Describe your mission"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Mission Steps</label>
                <p className="text-xs text-gray-400 mb-2">
                  Break down your mission into specific steps. These will be tracked as you progress.
                </p>
                
                {missionSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={step}
                      onChange={(e) => updateMissionStep(index, e.target.value)}
                      className="flex-1 p-2 bg-solo-dark border border-solo-blue/30 rounded-md focus:outline-none focus:ring-1 focus:ring-solo-blue text-white"
                      placeholder={`Step ${index + 1}`}
                    />
                    <button
                      onClick={() => removeMissionStep(index)}
                      className="p-2 text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                
                <button
                  onClick={addMissionStep}
                  className="mt-2 px-3 py-1 text-sm bg-solo-dark hover:bg-solo-gray/80 border border-solo-blue/30 rounded-md text-white"
                >
                  + Add Step
                </button>
              </div>
            </div>
            
            {selectedMonster && (
              <div className="mb-6 p-3 bg-solo-dark rounded-md border border-solo-blue/30 shadow-[0_0_10px_rgba(46,107,255,0.2)]">
                <h3 className="font-medium text-amber-400 flex items-center">
                  <Skull className="w-5 h-5 mr-2 text-rose-500" />
                  Target: {selectedMonster.name}
                </h3>
                <p className="text-sm text-gray-300 mt-1">{selectedMonster.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <RankBadge rank={selectedMonster.rank} size="sm" />
                  <span className="text-xs text-muted-foreground">Level {selectedMonster.level}</span>
                  <span className={`text-xs ${getDifficultyColor(selectedMonster.difficulty)}`}>
                    {selectedMonster.difficulty}
                  </span>
                </div>
                <div className="text-sm mt-2">
                  <span className="text-muted-foreground">Reward: </span>
                  <span className="text-solo-blue-light">+{selectedMonster.xpReward} XP</span>
                </div>
              </div>
            )}
            
            <div className="flex gap-3">
              <Button
                variant="destructive"
                onClick={() => backToMonsterSelection()}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                variant="default"
                onClick={handleConfirmMission}
                className="flex-1 bg-solo-blue hover:bg-solo-blue/80 shadow-[0_0_10px_rgba(46,107,255,0.3)]"
                disabled={!missionTitle || !missionDescription || missionSteps.length === 0}
              >
                Start Mission
              </Button>
            </div>
          </div>
        ) : showMonsterSelection ? (
          <>
            <div className="glass-panel p-4 mb-6 border border-solo-blue/30 shadow-[0_0_15px_rgba(46,107,255,0.2)]">
              <h2 className="text-xl font-bold mb-3 flex items-center">
                <Swords className="text-amber-500 mr-2" />
                Select a Monster
              </h2>
              <p className="text-gray-300 mb-4">
                Choose a monster to battle. Each monster represents a mission you need to complete. The higher the rank, the more difficult the mission, but the greater the rewards.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {availableMonsters.map(monster => (
                  <motion.div
                    key={monster.id}
                    className="p-4 border rounded-md cursor-pointer transition-colors border-solo-blue/30 bg-solo-dark hover:border-solo-blue shadow-[0_0_10px_rgba(46,107,255,0.1)] hover:shadow-[0_0_15px_rgba(46,107,255,0.3)]"
                    onClick={() => handleMonsterSelect(monster)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-full h-32 bg-solo-darker border border-solo-blue/30 rounded-md flex items-center justify-center mb-3 overflow-hidden">
                        {monster.animatedImage ? (
                          <img 
                            src={monster.animatedImage} 
                            alt={monster.name} 
                            className="w-full h-full object-contain transform hover:scale-110 transition-transform duration-500" 
                          />
                        ) : (
                          <Skull className="w-10 h-10 text-rose-500" />
                        )}
                      </div>
                      <div className="text-center">
                        <h3 className="font-medium text-white">{monster.name}</h3>
                        <div className="flex items-center justify-center gap-3 mt-1">
                          <RankBadge rank={monster.rank} size="sm" />
                          <span className="text-xs text-muted-foreground">Level {monster.level}</span>
                          <span className={`text-xs ${getDifficultyColor(monster.difficulty)}`}>
                            {monster.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-400 mt-2 text-center">{monster.description}</p>
                    
                    <div className="flex justify-between mt-3">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Rewards: </span>
                        <span className="text-solo-blue-light">+{monster.xpReward} XP</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Title: </span>
                        <span className="text-amber-400">{monster.title}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="text-center py-4">
              <p className="text-white mb-2">Choose a monster to begin your mission planning.</p>
              <p className="text-gray-400 text-sm">Each monster has unique traits and rewards.</p>
            </div>
          </>
        ) : (
          <>
            <div className="glass-panel p-4 border-2 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)] mb-6">
              <h2 className="text-xl font-bold text-amber-400 mb-3">Mission Planning</h2>
              
              {selectedMonster && (
                <div className="flex items-center mb-4 p-3 bg-solo-dark rounded-md border border-solo-blue/30 shadow-[0_0_10px_rgba(46,107,255,0.2)]">
                  <div className="w-16 h-16 bg-solo-darker border border-solo-blue/30 rounded-md flex items-center justify-center mr-3 overflow-hidden">
                    {selectedMonster.animatedImage ? (
                      <img src={selectedMonster.animatedImage} alt={selectedMonster.name} className="w-full h-full object-cover" />
                    ) : (
                      <Skull className="w-10 h-10 text-rose-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-amber-400">{selectedMonster.name}</h3>
                    <p className="text-sm text-gray-300 mt-1">{selectedMonster.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <RankBadge rank={selectedMonster.rank} size="sm" />
                      <span className="text-xs text-muted-foreground">Level {selectedMonster.level}</span>
                      <span className={`text-xs ${getDifficultyColor(selectedMonster.difficulty)}`}>
                        {selectedMonster.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">XP Reward:</span>
                  <span className="text-solo-blue-light">+{selectedMonster?.xpReward || 0} XP</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Title Reward:</span>
                  <span className="text-amber-400">{selectedMonster?.title || ""}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Mission Type:</span>
                  <span className="text-green-400">7-day Challenge</span>
                </div>
              </div>
              
              <div className="p-3 border border-solo-blue/30 bg-solo-blue/10 rounded-md mb-4 shadow-[0_0_10px_rgba(46,107,255,0.1)]">
                <h4 className="font-medium mb-2 flex items-center">
                  <Award className="w-4 h-4 mr-2 text-amber-400" />
                  Mission Guidelines
                </h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="w-3 h-3 mt-1 mr-2 text-solo-blue-light" />
                    Break down your mission into actionable steps
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-3 h-3 mt-1 mr-2 text-solo-blue-light" />
                    Each step will be tracked as a separate task
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-3 h-3 mt-1 mr-2 text-solo-blue-light" />
                    Once started, you can't delete this mission
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-3 h-3 mt-1 mr-2 text-solo-blue-light" />
                    Complete all steps to defeat the monster
                  </li>
                </ul>
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline" 
                  className="flex-1 border-solo-blue/50 text-solo-blue-light"
                  onClick={() => backToMonsterSelection()}
                >
                  Change Monster
                </Button>
                <Button
                  variant="default"
                  className="flex-1 bg-solo-blue hover:bg-solo-blue/80 shadow-[0_0_10px_rgba(46,107,255,0.3)]"
                  onClick={handleStartMissionClick}
                >
                  Start Mission Planning
                </Button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Dungeon;
