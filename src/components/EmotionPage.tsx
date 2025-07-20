import React, { useState, useEffect } from 'react';
import { RefreshCw, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Emotion {
  emoji: string;
  name: string;
  color: string;
  description: string;
}

const emotions: Emotion[] = [
  { emoji: '😊', name: 'Happy', color: 'bg-yellow-200 dark:bg-yellow-700', description: 'Feeling good and cheerful' },
  { emoji: '😢', name: 'Sad', color: 'bg-blue-200 dark:bg-blue-700', description: 'Feeling unhappy or tearful' },
  { emoji: '😡', name: 'Angry', color: 'bg-red-200 dark:bg-red-700', description: 'Feeling mad or frustrated' },
  { emoji: '😰', name: 'Scared', color: 'bg-purple-200 dark:bg-purple-700', description: 'Feeling nervous or afraid' },
  { emoji: '😴', name: 'Tired', color: 'bg-gray-200 dark:bg-gray-700', description: 'Needing rest or sleep' },
  { emoji: '🤔', name: 'Confused', color: 'bg-orange-200 dark:bg-orange-700', description: 'Not understanding something' },
];

const EmotionPage: React.FC = () => {
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>(emotions[0]);
  const [options, setOptions] = useState<Emotion[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showEmotionInfo, setShowEmotionInfo] = useState(false);

  // Load/save state from localStorage
  useEffect(() => {
    const savedScore = localStorage.getItem('autiplay-emotion-score');
    const savedAttempts = localStorage.getItem('autiplay-emotion-attempts');
    if (savedScore) setScore(parseInt(savedScore));
    if (savedAttempts) setAttempts(parseInt(savedAttempts));
    generateNewQuestion();
  }, []);

  useEffect(() => {
    localStorage.setItem('autiplay-emotion-score', score.toString());
    localStorage.setItem('autiplay-emotion-attempts', attempts.toString());
  }, [score, attempts]);

  const generateNewQuestion = () => {
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    setCurrentEmotion(randomEmotion);
    setShowEmotionInfo(false);
    
    const wrongOptions = emotions.filter(e => e.name !== randomEmotion.name);
    const shuffledWrong = wrongOptions.sort(() => Math.random() - 0.5).slice(0, 3);
    const allOptions = [randomEmotion, ...shuffledWrong].sort(() => Math.random() - 0.5);
    
    setOptions(allOptions);
    setFeedback(null);
  };

  const handleAnswer = (selectedEmotion: Emotion) => {
    setAttempts(prev => prev + 1);
    
    if (selectedEmotion.name === currentEmotion.name) {
      setFeedback('correct');
      setScore(prev => prev + 1);
      setShowCelebration(true);
      setShowEmotionInfo(true);
      setTimeout(() => setShowCelebration(false), 2000);
      setTimeout(() => generateNewQuestion(), 3000); // Longer delay for processing
    } else {
      setFeedback('incorrect');
      setTimeout(() => setFeedback(null), 1500); // Longer feedback duration
    }
  };

  const resetStats = () => {
    setScore(0);
    setAttempts(0);
    generateNewQuestion();
  };

  const Celebration = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
    >
      <motion.div
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.2, 1] 
        }}
        transition={{ duration: 0.6, repeat: 2 }}
        className="text-8xl"
      >
        🎉
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-1/4 text-2xl font-bold text-center text-white bg-green-500 px-6 py-3 rounded-full"
      >
        Great job! 🌟
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 dark:from-gray-900 dark:to-gray-800 pt-20 pb-8 mt-10">
      <AnimatePresence>
        {showCelebration && <Celebration />}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center items-center mb-4">
            <Heart size={48} className="text-pink-500 dark:text-pink-400 mr-4" />
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              Emotion Recognition
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Match the face to the correct emotion
          </p>

          {/* Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{score}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{attempts}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Attempts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {attempts > 0 ? Math.round((score / attempts) * 100) : 0}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Success</div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetStats}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Reset statistics"
              >
                <RefreshCw size={16} />
                <span className="text-sm font-medium">Reset</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Current Emotion Display */}
        <motion.div
          key={currentEmotion.name}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg inline-block">
            <motion.div
              animate={feedback === 'correct' ? { 
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0] 
              } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-8xl mb-4"
            >
              {currentEmotion.emoji}
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Find the {currentEmotion.name} face!
            </h2>
            
            {showEmotionInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-gray-600 dark:text-gray-300 mt-2"
              >
                {currentEmotion.description}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-6"
            >
              {feedback === 'correct' ? (
                <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-2xl p-4 inline-block">
                  <span className="text-2xl">🎉</span>
                  <span className="text-lg font-bold text-green-700 dark:text-green-300 ml-2">
                    Great job! That's correct!
                  </span>
                </div>
              ) : (
                <motion.div
                  animate={{ x: [-5, 5, -5, 5, 0] }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-2xl p-4 inline-block"
                >
                  <span className="text-2xl">💭</span>
                  <span className="text-lg font-bold text-red-700 dark:text-red-300 ml-2">
                    Try again! You can do it!
                  </span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Answer Options */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {options.map((emotion, index) => (
            <motion.button
              key={`${emotion.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswer(emotion)}
              disabled={feedback === 'correct'}
              className={`
                ${emotion.color} rounded-2xl p-6 shadow-lg hover:shadow-xl
                transition-all duration-300 border-2 border-transparent
                hover:border-white disabled:cursor-default
                min-h-[120px] flex flex-col items-center justify-center
                ${feedback === 'incorrect' && emotion.name === currentEmotion.name ? 'ring-4 ring-green-500' : ''}
              `}
              aria-label={`Select ${emotion.name} emotion`}
              role="button"
            >
              <motion.div
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-5xl mb-2"
              >
                {emotion.emoji}
              </motion.div>
              <span className="text-lg font-bold text-gray-700 dark:text-gray-200">
                {emotion.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Encouragement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Remember 🌟
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              All emotions are okay! Recognizing them helps us understand ourselves and others better.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmotionPage;