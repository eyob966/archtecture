import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useHabitContext } from '@/context/HabitContext';
import { ArrowLeft, Plus, Save } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from 'sonner';

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
import { HabitCategory, FrequencyType } from '@/types';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Habit name must be at least 2 characters.",
  }),
  category: z.enum(["sleep", "workout", "hygiene", "skincare", "custom"] as const),
  description: z.string().optional(),
  frequencyType: z.enum(["daily", "weekly", "monthly", "specific-days"] as const),
  frequencyValue: z.coerce.number().min(1).optional(),
});

const NewHabit = () => {
  const { addHabit, getCurrentDayOfWeek } = useHabitContext();
  const navigate = useNavigate();
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const currentDay = getCurrentDayOfWeek();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "custom",
      description: "",
      frequencyType: "daily",
    },
  });
  
  const frequencyType = form.watch('frequencyType');

  function onSubmit(values: z.infer<typeof formSchema>) {
    addHabit({
      name: values.name,
      category: values.category as HabitCategory,
      description: values.description || "",
      frequency: {
        type: values.frequencyType as FrequencyType,
        value: values.frequencyValue || 1,
        daysOfWeek: values.frequencyType === 'specific-days' ? selectedDays : undefined,
      },
      isActive: true,
      xpReward: 2
    });
    
    toast.success('New habit created!', {
      description: 'Your habit has been added to your daily tasks.',
    });
    
    navigate('/');
  }

  const toggleDay = (day: number) => {
    setSelectedDays(prev => 
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const dayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="min-h-screen bg-solo-dark text-white p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-2xl"
      >
        {/* Header */}
        <div className="glass-panel p-6 mb-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-solo-blue hover:text-solo-blue-light transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-glow">
              <Plus className="inline-block mr-2" size={24} />
              Create New Habit
            </h1>
          </div>
        </div>

        {/* Form */}
        <div className="glass-panel p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Habit Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter habit name" {...field} className="bg-solo-darker border-solo-gray" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-solo-darker border-solo-gray">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-solo-darker border-solo-gray">
                        <SelectItem value="sleep">Sleep</SelectItem>
                        <SelectItem value="workout">Workout</SelectItem>
                        <SelectItem value="hygiene">Hygiene</SelectItem>
                        <SelectItem value="skincare">Skincare</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter habit description" 
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
                name="frequencyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-solo-darker border-solo-gray">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-solo-darker border-solo-gray">
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="specific-days">Specific Days</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {form.watch('frequencyType') === 'specific-days' && (
                <>
                  <div className="space-y-3">
                    <FormLabel>Select days of the week</FormLabel>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {dayLabels.map((day, index) => (
                        <div 
                          key={day} 
                          onClick={() => toggleDay(index)}
                          className={`
                            cursor-pointer px-3 py-2 rounded-md text-center transition-all
                            ${selectedDays.includes(index) 
                              ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(46,107,255,0.6)]' 
                              : 'bg-solo-darker text-gray-300 hover:bg-solo-gray/50'}
                            ${index === currentDay ? 'border-2 border-green-400' : ''}
                          `}
                        >
                          <div className="text-xs">{day.substring(0, 3)}</div>
                          {index === currentDay && (
                            <div className="text-[10px] text-green-400 mt-1">Today</div>
                          )}
                        </div>
                      ))}
                    </div>
                    {selectedDays.length === 0 && (
                      <p className="text-amber-400 text-sm">Please select at least one day</p>
                    )}
                  </div>
                </>
              )}
              
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-4 rounded-md border border-blue-400/20">
                <h3 className="text-blue-300 font-semibold mb-2">Reward & Penalty</h3>
                <p className="text-sm text-blue-200">
                  <span className="bg-green-800/40 px-2 py-1 rounded text-green-300">+2 XP</span> for completing this habit
                </p>
                <p className="text-sm text-blue-200 mt-1">
                  <span className="bg-red-800/40 px-2 py-1 rounded text-red-300">-1 XP</span> for missing this habit
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="solo-button w-full"
                disabled={form.watch('frequencyType') === 'specific-days' && selectedDays.length === 0}
              >
                <Save className="mr-2" size={18} />
                Save Habit
              </Button>
            </form>
          </Form>
        </div>
      </motion.div>
    </div>
  );
};

export default NewHabit;
