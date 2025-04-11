import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useHabitContext } from '@/context/HabitContext';
import { ArrowLeft, Plus, Save, Clock } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Quest } from '@/types';
import { playSound, SOUNDS } from '@/utils/sound';

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Quest title must be at least 2 characters.",
  }),
  description: z.string().min(5, {
    message: "Please provide a brief description of at least 5 characters.",
  }),
  hasDueDate: z.boolean().default(false),
  hours: z.coerce.number().min(0).default(0),
  minutes: z.coerce.number().min(0).default(0),
  seconds: z.coerce.number().min(0).default(0),
  penalty: z.string().optional(),
});

const NewQuest = () => {
  const { quests, habits, addQuest } = useHabitContext();
  const navigate = useNavigate();
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      hasDueDate: false,
      hours: 0,
      minutes: 0,
      seconds: 0,
      penalty: "",
    },
  });
  
  const hasDueDate = form.watch("hasDueDate");

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Create expiration date if specified - using hours, minutes, seconds
    const expiresAt = values.hasDueDate 
      ? new Date(Date.now() + 
          (values.hours * 60 * 60 * 1000) + 
          (values.minutes * 60 * 1000) + 
          (values.seconds * 1000)).toISOString()
      : undefined;
    
    // Create new quest with fixed 3XP reward
    const newQuest: Quest = {
      id: uuidv4(),
      title: values.title,
      description: values.description,
      habitIds: selectedHabits,
      xpReward: 3, // Fixed 3XP reward
      completed: false,
      type: "daily", // Default type
      progress: 0,
      requiredProgress: 1, // Default progress
      createdAt: new Date().toISOString(),
      expiresAt,
      penalty: values.penalty
    };
    
    // Add quest to context
    if (addQuest) {
      addQuest(newQuest);
      playSound(SOUNDS.MISSION_START, 0.4);
      
      toast.success('New quest created!', {
        description: 'Your quest has been added to your journey.',
      });
      
      navigate('/');
    } else {
      console.error('addQuest function is not available in context');
      toast.error('Failed to create quest', {
        description: 'Something went wrong. Please try again.',
      });
    }
  }
  
  const toggleHabitSelection = (habitId: string) => {
    setSelectedHabits(prev => 
      prev.includes(habitId)
        ? prev.filter(id => id !== habitId)
        : [...prev, habitId]
    );
  };

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
          <div className="flex items-center gap-4">
            <Link to="/" className="text-solo-blue hover:opacity-80">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-bold text-solo-blue-light">
              <Plus className="inline-block mr-2" size={20} />
              Create New Quest
            </h1>
          </div>
        </div>

        {/* Form */}
        <div className="border border-solo-blue/30 bg-solo-dark p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-solo-blue-light">Quest Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter quest title" {...field} className="bg-solo-darker border-solo-gray" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-solo-blue-light">Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter quest description" 
                        {...field} 
                        className="bg-solo-darker border-solo-gray resize-none min-h-[100px]" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="hasDueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-solo-gray p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-solo-blue-light flex items-center">
                        <Clock size={16} className="mr-2" />
                        Time-Limited Quest
                      </FormLabel>
                      <p className="text-sm text-gray-400">
                        Set a deadline for completing this quest
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              
              {hasDueDate && (
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="hours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-solo-blue-light">Hours</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            min={0}
                            placeholder="Hours" 
                            {...field} 
                            className="bg-solo-darker border-solo-gray" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="minutes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-solo-blue-light">Minutes</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            min={0}
                            placeholder="Minutes" 
                            {...field} 
                            className="bg-solo-darker border-solo-gray" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="seconds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-solo-blue-light">Seconds</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            min={0}
                            placeholder="Seconds" 
                            {...field} 
                            className="bg-solo-darker border-solo-gray" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              <FormField
                control={form.control}
                name="penalty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-red-500 font-bold flex items-center">
                      <span className="mr-2">❗</span>
                      Penalty
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="What happens if you fail this quest?" 
                        {...field} 
                        className="bg-solo-darker border-red-500 focus:border-red-400" 
                      />
                    </FormControl>
                    <p className="text-sm text-red-400 mt-1">
                      Add a consequence for not completing this quest on time
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {habits.length > 0 && (
                <div>
                  <h3 className="text-solo-blue-light mb-2">Related Habits (Optional)</h3>
                  <div className="space-y-2 border border-solo-gray p-3 bg-solo-darker rounded">
                    {habits.map(habit => (
                      <div key={habit.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={habit.id}
                          checked={selectedHabits.includes(habit.id)}
                          onCheckedChange={() => toggleHabitSelection(habit.id)}
                        />
                        <label htmlFor={habit.id} className="text-sm cursor-pointer">
                          {habit.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <Button type="submit" className="solo-button w-full">
                <Save className="mr-2" size={18} />
                Create Quest
              </Button>
            </form>
          </Form>
        </div>
      </motion.div>
    </div>
  );
};

export default NewQuest;
