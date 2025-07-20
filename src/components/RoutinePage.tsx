import React, { useState, useEffect } from 'react';
import { CheckCircle, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Task {
  id: string;
  emoji: string;
  title: string;
  description: string;
  completed: boolean;
}

const RoutinePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', emoji: '🪥', title: 'Brush Teeth', description: 'Clean your teeth for 2 minutes', completed: false },
    { id: '2', emoji: '🍳', title: 'Eat Breakfast', description: 'Start your day with a healthy meal', completed: false },
    { id: '3', emoji: '👕', title: 'Get Dressed', description: 'Put on your clothes for the day', completed: false },
    { id: '4', emoji: '🎒', title: 'Pack Bag', description: 'Get ready for school or activities', completed: false },
    { id: '5', emoji: '🧼', title: 'Wash Hands', description: 'Keep your hands clean and healthy', completed: false },
    { id: '6', emoji: '📚', title: 'Read a Book', description: 'Spend time reading something fun', completed: false },
    { id: '7', emoji: '🥛', title: 'Drink Water', description: 'Stay hydrated throughout the day', completed: false },
    { id: '8', emoji: '🛏️', title: 'Make Bed', description: 'Tidy up your sleeping space', completed: false },
  ]);

  const [showConfetti, setShowConfetti] = useState(false);
  const [completedTaskId, setCompletedTaskId] = useState<string>('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('autiplay-routine-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('autiplay-routine-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId && !task.completed) {
        setCompletedTaskId(taskId);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2500);
        return { ...task, completed: true };
      }
      return task;
    }));
  };

  const resetTasks = () => {
    setTasks(prev => prev.map(task => ({ ...task, completed: false })));
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  const Confetti = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 pointer-events-none z-50"
    >
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 1,
            y: -10,
            x: Math.random() * window.innerWidth,
            rotate: 0,
          }}
          animate={{
            opacity: 0,
            y: window.innerHeight + 100,
            rotate: 180,
          }}
          transition={{
            duration: 2.5,
            delay: Math.random() * 0.5,
            ease: "easeInOut",
          }}
          className={`absolute w-4 h-4 ${
            ['bg-yellow-400', 'bg-pink-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-400'][i % 5]
          } rounded-full`}
        />
      ))}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 pt-20 pb-8 mt-10">
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="text-8xl mb-4">📝</div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Daily Routine
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Complete your tasks and celebrate your progress!
          </p>

          {/* Progress Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-lg border-4 border-white/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                Progress: {completedCount}/{totalTasks}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetTasks}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Reset all tasks"
              >
                <RotateCcw size={16} />
                <span className="text-sm font-medium">Reset All</span>
              </motion.button>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(completedCount / totalTasks) * 100}%` }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-6 rounded-full"
              />
            </div>
            <div className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              {completedCount === totalTasks ? "🎉 All done! Amazing work!" : `${totalTasks - completedCount} tasks left`}
            </div>
          </div>
        </motion.div>

        {/* Task List */}
        <div className="grid gap-4 md:grid-cols-2">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`
                bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg
                transition-all duration-300 border-4
                ${task.completed 
                  ? 'border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900/20' 
                  : 'border-white/30 hover:border-green-200 dark:hover:border-green-700'
                }
              `}
            >
              <div className="flex items-center space-x-4">
                <motion.div
                  animate={completedTaskId === task.id ? { 
                    scale: [1, 1.3, 1],
                    rotate: [0, 15, -15, 0] 
                  } : {}}
                  transition={{ duration: 0.6 }}
                  className="text-5xl"
                >
                  {task.emoji}
                </motion.div>
                
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold mb-1 ${
                    task.completed 
                      ? 'text-green-700 dark:text-green-300' 
                      : 'text-gray-800 dark:text-white'
                  }`}>
                    {task.title}
                  </h3>
                  <p className={`text-lg ${
                    task.completed 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {task.description}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: task.completed ? 1 : 1.1 }}
                  whileTap={{ scale: task.completed ? 1 : 0.9 }}
                  onClick={() => !task.completed && toggleTask(task.id)}
                  disabled={task.completed}
                  className={`
                    w-16 h-16 rounded-full flex items-center justify-center
                    transition-all duration-300 min-w-[64px] min-h-[64px]
                    ${task.completed
                      ? 'bg-green-500 cursor-default'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-green-200 dark:hover:bg-green-800 cursor-pointer'
                    }
                    border-4 border-white/50
                  `}
                  aria-label={task.completed ? `${task.title} completed` : `Mark ${task.title} as done`}
                >
                  <CheckCircle 
                    size={32} 
                    className={task.completed ? 'text-white' : 'text-gray-500 dark:text-gray-400'} 
                  />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Encouragement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl mx-auto shadow-lg border-4 border-white/30">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              You're doing great! 🌟
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Every completed task is a step toward success!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RoutinePage;