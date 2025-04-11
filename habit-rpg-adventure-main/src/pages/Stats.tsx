
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useHabitContext } from '@/context/HabitContext';
import { ArrowLeft, Shield, Heart, Zap, Award, RefreshCw } from 'lucide-react';

const Stats = () => {
  const { stats, resetAllData } = useHabitContext();
  
  return (
    <div className="min-h-screen bg-solo-darker text-white p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-md"
      >
        {/* Header */}
        <div className="border border-solo-blue/30 bg-solo-dark p-4 mb-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-solo-blue hover:opacity-80">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-bold text-solo-blue-light">
              Character Stats
            </h1>
            <button 
              onClick={resetAllData}
              className="text-red-400 hover:text-red-300"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </div>
        
        {/* Stats Panels */}
        <div className="border border-solo-blue/30 bg-solo-dark p-4 mb-4">
          {/* Main attributes */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-solo-blue-light">
                <Shield size={20} />
              </div>
              <div>
                <div className="text-gray-400 text-xs">STR</div>
                <div className="text-2xl font-bold">{stats.level * 2 + 9}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-solo-blue-light">
                <Heart size={20} />
              </div>
              <div>
                <div className="text-gray-400 text-xs">VIT</div>
                <div className="text-2xl font-bold">{stats.dayStreak + 5}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-solo-blue-light">
                <Zap size={20} />
              </div>
              <div>
                <div className="text-gray-400 text-xs">AGI</div>
                <div className="text-2xl font-bold">{Math.floor(stats.completionRate / 10) + 5}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-solo-blue-light">
                <Award size={20} />
              </div>
              <div>
                <div className="text-gray-400 text-xs">INT</div>
                <div className="text-2xl font-bold">{Math.floor(stats.totalCompletions / 5) + 8}</div>
              </div>
            </div>
          </div>
          
          {/* Combat Power */}
          <div className="border border-solo-blue/30 p-3 mb-4">
            <div className="text-center">
              <div className="text-gray-400 text-sm">POTENTIAL</div>
              <div className="text-3xl font-bold text-solo-blue-light">
                {stats.level * 10 + stats.dayStreak * 5 + Math.floor(stats.completionRate / 10) * 8}
              </div>
            </div>
          </div>
          
          {/* Level info */}
          <div className="flex justify-between items-center p-3 border border-solo-blue/30">
            <div>
              <div className="text-gray-400 text-xs">HUNTER RANK</div>
              <div className="text-lg font-bold text-solo-blue-light">
                {stats.level < 5 ? 'E' : stats.level < 10 ? 'D' : stats.level < 15 ? 'C' : stats.level < 20 ? 'B' : 'A'}
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-gray-400 text-xs">LEVEL</div>
              <div className="text-lg font-bold text-solo-blue-light">{stats.level}</div>
            </div>
          </div>
        </div>
        
        {/* Progress & Achievements */}
        <div className="border border-solo-blue/30 bg-solo-dark p-4 mb-4">
          <h2 className="text-lg font-bold text-solo-blue-light mb-3">Progress</h2>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">XP Progress</span>
                <span className="text-solo-blue-light">
                  {stats.xp} / {stats.xpToNextLevel} XP
                </span>
              </div>
              <div className="h-1 bg-solo-gray/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-solo-blue"
                  style={{ width: `${(stats.xp / stats.xpToNextLevel) * 100}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Streak</span>
                <span className="text-solo-blue-light">
                  {stats.dayStreak} days
                </span>
              </div>
              <div className="h-1 bg-solo-gray/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500"
                  style={{ width: `${(stats.dayStreak / (stats.streakRecord || 1)) * 100}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Completion Rate</span>
                <span className="text-solo-blue-light">
                  {stats.completionRate}%
                </span>
              </div>
              <div className="h-1 bg-solo-gray/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500"
                  style={{ width: `${stats.completionRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Category Progress */}
        <div className="border border-solo-blue/30 bg-solo-dark p-4">
          <h2 className="text-lg font-bold text-solo-blue-light mb-3">Skill Progress</h2>
          
          <div className="space-y-3">
            {Object.entries(stats.categoriesProgress).map(([category, progress]) => (
              <div key={category}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400 capitalize">{category}</span>
                  <span className="text-solo-blue-light">{progress}%</span>
                </div>
                <div className="h-1 bg-solo-gray/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Stats;
