import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

// Import audio files
import rainSound from '/rain.mp3';
import oceanSound from '/ocean.mp3';
import forestSound from '/forest.mp3';

const CalmRoom: React.FC = () => {
  const { isDark } = useTheme();
  const [isBreathing, setIsBreathing] = useState(false);
  const [currentSound, setCurrentSound] = useState<'none' | 'rain' | 'ocean' | 'forest'>('none');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio files mapping
  const soundFiles = {
    rain: rainSound,
    ocean: oceanSound,
    forest: forestSound
  };

  const toggleBreathing = () => {
    setIsBreathing(!isBreathing);
  };

  const handleSoundChange = (soundType: 'none' | 'rain' | 'ocean' | 'forest') => {
    // Stop current sound if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }

    setCurrentSound(soundType);
    
    if (soundType !== 'none') {
      if (!audioRef.current) {
        audioRef.current = new Audio(soundFiles[soundType]);
      } else {
        audioRef.current.src = soundFiles[soundType];
      }
      audioRef.current.loop = true;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Audio play failed:", e));
    }
  };

  const toggleSound = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className={`
      min-h-screen pt-20 pb-8 transition-all duration-1000
      ${isDark 
        ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900' 
        : 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100'
      }
    `}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="text-8xl mb-4"
          >
            🌈
          </motion.div>
          <h1 className={`text-4xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            Calm Space
          </h1>
          <p className={`text-lg mb-8 ${
            isDark ? 'text-blue-200' : 'text-blue-700'
          }`}>
            Breathe and relax in this peaceful space
          </p>
        </motion.div>

        {/* Breathing Circle */}
        <div className="flex flex-col items-center mb-12">
          <motion.div
            animate={isBreathing ? {
              scale: [1, 1.3, 1],
              backgroundColor: isDark 
                ? ['rgba(96, 165, 250, 0.3)', 'rgba(139, 92, 246, 0.4)', 'rgba(96, 165, 250, 0.3)'] 
                : ['rgba(191, 219, 254, 0.7)', 'rgba(216, 180, 254, 0.8)', 'rgba(191, 219, 254, 0.7)']
            } : {}}
            transition={isBreathing ? {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            } : {}}
            className={`
              w-48 h-48 sm:w-64 sm:h-64 rounded-full
              ${isDark 
                ? 'bg-blue-400/30 border-4 border-blue-300/50' 
                : 'bg-blue-200/70 border-4 border-blue-400/50'
              }
              flex items-center justify-center shadow-2xl backdrop-blur-sm
            `}
          >
            <motion.div
              animate={isBreathing ? {
                scale: [0.9, 1.1, 0.9],
                opacity: [0.7, 1, 0.7],
              } : {}}
              transition={isBreathing ? {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              } : {}}
              className={`
                w-24 h-24 sm:w-32 sm:h-32 rounded-full
                ${isDark 
                  ? 'bg-white/20' 
                  : 'bg-white/60'
                }
                flex items-center justify-center
              `}
            >
              <motion.span 
                animate={isBreathing ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, 0]
                } : {}}
                transition={isBreathing ? {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                } : {}}
                className="text-4xl sm:text-5xl"
              >
                {isBreathing ? '🌬️' : '😌'}
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Breathing Instructions */}
          <AnimatePresence>
            {isBreathing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 text-center"
              >
                <motion.p
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`text-xl font-medium ${
                    isDark ? 'text-blue-200' : 'text-blue-700'
                  }`}
                >
                  Breathe in... and breathe out...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleBreathing}
            className={`
              flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold
              min-w-[160px] min-h-[60px] justify-center
              ${isBreathing
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
              }
              shadow-lg hover:shadow-xl transition-all duration-300
              border-4 border-white/50
            `}
            aria-label={isBreathing ? 'Stop breathing exercise' : 'Start breathing exercise'}
          >
            {isBreathing ? <Pause size={24} /> : <Play size={24} />}
            <span>{isBreathing ? 'Stop' : 'Start'} Breathing</span>
          </motion.button>

          {currentSound !== 'none' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleSound}
              className={`
                flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold
                min-w-[160px] min-h-[60px] justify-center
                bg-blue-500 hover:bg-blue-600 text-white
                shadow-lg hover:shadow-xl transition-all duration-300
                border-4 border-white/50
              `}
              aria-label={isPlaying ? 'Pause sound' : 'Play sound'}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              <span>{isPlaying ? 'Pause' : 'Play'} Sound</span>
            </motion.button>
          )}
        </div>

        {/* Sound Selection */}
        <div className="mb-12">
          <h3 className={`text-2xl font-bold text-center mb-6 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            Choose Calming Sounds 🎵
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { id: 'none', emoji: '🔇', label: 'Silence', color: 'bg-gray-500 hover:bg-gray-600' },
              { id: 'rain', emoji: '🌧️', label: 'Rain', color: 'bg-blue-500 hover:bg-blue-600' },
              { id: 'ocean', emoji: '🌊', label: 'Ocean', color: 'bg-cyan-500 hover:bg-cyan-600' },
              { id: 'forest', emoji: '🌲', label: 'Forest', color: 'bg-green-500 hover:bg-green-600' },
            ].map((sound) => (
              <motion.button
                key={sound.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSoundChange(sound.id as 'none' | 'rain' | 'ocean' | 'forest')}
                className={`
                  flex flex-col items-center p-4 rounded-2xl font-bold
                  min-h-[100px] justify-center text-white shadow-lg hover:shadow-xl
                  transition-all duration-300
                  ${currentSound === sound.id 
                    ? `${sound.color.replace('hover:', '')} ring-4 ring-white ring-opacity-50 scale-105` 
                    : sound.color
                  }
                  border-4 border-white/30
                `}
                aria-label={`Play ${sound.label} sounds`}
              >
                <motion.span 
                  animate={currentSound === sound.id ? { 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl mb-2"
                >
                  {sound.emoji}
                </motion.span>
                <span className="text-sm">{sound.label}</span>
                {currentSound === sound.id && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="mt-1"
                  >
                    {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Calming Messages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          {[
            { emoji: '🌸', title: 'You are safe', message: 'This is your peaceful space where you can relax and feel calm.' },
            { emoji: '⭐', title: 'You are doing great', message: 'Take your time and remember that every feeling is okay.' },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`
                ${isDark 
                  ? 'bg-white/10 backdrop-blur-sm border border-white/20' 
                  : 'bg-white/70 backdrop-blur-sm border border-white/40'
                }
                rounded-2xl p-6 text-center shadow-lg
                border-4 border-white/30
              `}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: index * 0.5
                }}
                className="text-4xl mb-3"
              >
                {item.emoji}
              </motion.div>
              <h3 className={`text-xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                {item.title}
              </h3>
              <p className={isDark ? 'text-blue-200' : 'text-blue-700'}>
                {item.message}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.sin(i) * 40, 0],
                rotate: [0, 20, 0],
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{
                duration: 10 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
              className={`
                absolute opacity-20
                ${['text-3xl', 'text-4xl', 'text-2xl'][i % 3]}
              `}
              style={{
                left: `${5 + (i * 8)}%`,
                top: `${10 + (i * 7)}%`,
              }}
            >
              {['✨', '🌟', '💫', '🌙', '☁️', '🦋', '🌸', '🌿', '🌼', '🌠', '🌈', '🕊️'][i]}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalmRoom;