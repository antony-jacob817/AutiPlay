import React from 'react';
import { Calendar, Heart, CloudMoon } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const sections = [
    {
      id: 'routine',
      title: 'Daily Routine',
      description: 'Visual schedule for daily tasks',
      icon: Calendar,
      color: 'from-green-400 to-green-600',
      emoji: '📅',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-700 dark:text-green-300'
    },
    {
      id: 'emotions',
      title: 'Emotion Game',
      description: 'Learn about feelings',
      icon: Heart,
      color: 'from-pink-400 to-pink-600',
      emoji: '🎭',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      textColor: 'text-pink-700 dark:text-pink-300'
    },
    {
      id: 'calm',
      title: 'Calm Room',
      description: 'Relax and breathe',
      icon: CloudMoon,
      color: 'from-purple-400 to-purple-600',
      emoji: '🌙',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-700 dark:text-purple-300'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pt-20 pb-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >          
          <motion.div
            animate={{ 
              rotate: [0, 3, -3, 0],
              scale: [1, 1.05, 1] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              repeatDelay: 2,
              ease: "easeInOut"
            }}
            className="text-8xl mb-4"
          >
            🌈
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Welcome to AutiPlay!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A safe space to learn routines, explore emotions, and find calm
          </p>
        </motion.div>

        {/* Main Sections */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {sections.map((section, index) => {
            const Icon = section.icon;
            
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate(section.id)}
                className={`
                  ${section.bgColor} rounded-2xl p-8 cursor-pointer
                  shadow-lg hover:shadow-xl transition-all duration-300
                  border-2 border-transparent hover:border-white
                  min-h-[240px] flex flex-col items-center justify-center
                `}
                role="button"
                aria-label={`Go to ${section.title}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onNavigate(section.id);
                  }
                }}
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-6xl mb-4"
                >
                  {section.emoji}
                </motion.div>
                
                <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-full flex items-center justify-center mb-4`}>
                  <Icon size={24} className="text-white" />
                </div>
                
                <h2 className={`text-2xl font-bold ${section.textColor} mb-2 text-center`}>
                  {section.title}
                </h2>
                
                <p className={`${section.textColor} text-center opacity-80`}>
                  {section.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Did you know? 🌟
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Using visual schedules can help make daily routines easier to follow!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;