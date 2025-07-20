import React from 'react';
import { Home, Calendar, Heart, CloudMoon, Sun, Moon, Dices } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', color: 'bg-blue-400', darkColor: 'bg-blue-600' },
    { id: 'routine', icon: Calendar, label: 'Routine', color: 'bg-green-400', darkColor: 'bg-green-600' },
    { id: 'emotions', icon: Heart, label: 'Emotions', color: 'bg-yellow-400', darkColor: 'bg-yellow-600' },
    { id: 'calm', icon: CloudMoon, label: 'Calm', color: 'bg-purple-400', darkColor: 'bg-purple-600' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md border-b-2 border-blue-300 dark:border-blue-500">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mb-2">
        <div className="flex items-center justify-between h-20">
          {/* Improved Autism-Friendly Logo */}
          <div className="flex items-center pr-6">
            <div className="flex items-center space-x-3">
              <div className={`
                flex items-center justify-center
                w-12 h-12 rounded-lg
                bg-gradient-to-br from-blue-500 to-purple-500
                dark:from-blue-600 dark:to-purple-600
                shadow-md
              `}>
                <Dices size={32} className="text-white" />
              </div>
              <span className={`
                text-2xl font-bold
                text-blue-600 dark:text-blue-400
                tracking-wide
              `}>
                AutiPlay
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate(item.id)}
                  className={`
                    flex flex-col items-center p-3 rounded-xl min-w-[70px] min-h-[70px] 
                    ${isActive 
                      ? `${item.color} dark:${item.darkColor} text-white` 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                    }
                    transition-all duration-300
                    border-2 ${isActive ? 'border-white dark:border-gray-800' : 'border-transparent'}
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    mx-1
                  `}
                  aria-label={`Go to ${item.label}`}
                >
                  <Icon size={28} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-sm font-semibold mt-1">{item.label}</span>
                </motion.button>
              );
            })}

            {/* Separator */}
            <div className="h-12 w-0.5 bg-gray-300 dark:bg-gray-600 mx-2"></div>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`
                flex items-center justify-center p-3 rounded-full
                bg-gray-200 dark:bg-gray-600
                text-gray-700 dark:text-gray-200
                border-2 border-gray-300 dark:border-gray-500
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                transition-all duration-200
                ml-2
              `}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? (
                <Moon size={26} className="text-yellow-400" />
              ) : (
                <Sun size={26} className="text-indigo-600" />
              )}
            </motion.button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;