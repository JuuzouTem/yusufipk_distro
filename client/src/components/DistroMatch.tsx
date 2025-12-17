import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DECard from './DECard';
import QuestionCard from './QuestionCard';
import ActionButtons from './ActionButtons';
import ResultsScreen from './ResultsScreen';
import DynamicBackground from './DynamicBackground';
import distrosData from '@/data/distros.json';
import { calculateDistroScores, type UserPreferences, type ScoredDistro } from '@/lib/scoring';
import type { RoastContext } from '@/data/roasts';

type Stage = 'de' | 'questions' | 'results';

export default function DistroMatch() {
  const [stage, setStage] = useState<Stage>('de');
  const [deIndex, setDeIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  
  const [likedDEs, setLikedDEs] = useState<string[]>([]);
  const [dislikedDEs, setDislikedDEs] = useState<string[]>([]);
  const [superLikedDEs, setSuperLikedDEs] = useState<string[]>([]);
  
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  
  const [topDistros, setTopDistros] = useState<ScoredDistro[]>([]);
  const [bgColors, setBgColors] = useState<string[]>(distrosData.desktopEnvironments[0]?.colorPalette || ['#1a1a2e', '#16213e', '#0f3460']);

  const des = distrosData.desktopEnvironments;
  const questions = distrosData.criticalQuestions;

  const visibleDEs = des.slice(deIndex, deIndex + 3);
  const visibleQuestions = questions.slice(questionIndex, questionIndex + 3);

  const handleDESwipe = useCallback((direction: 'left' | 'right' | 'super') => {
    const currentDE = des[deIndex];
    if (!currentDE) return;

    if (direction === 'right') {
      setLikedDEs(prev => [...prev, currentDE.name]);
    } else if (direction === 'super') {
      setSuperLikedDEs(prev => [...prev, currentDE.name]);
    } else {
      setDislikedDEs(prev => [...prev, currentDE.name]);
    }

    const nextIndex = deIndex + 1;
    setDeIndex(nextIndex);

    if (nextIndex >= des.length) {
      setStage('questions');
      if (questions[0]) {
        setBgColors(questions[0].colorPalette);
      }
    } else if (des[nextIndex]) {
      setBgColors(des[nextIndex].colorPalette);
    }
  }, [deIndex, des, questions]);

  const handleQuestionSwipe = useCallback((direction: 'left' | 'right') => {
    const currentQuestion = questions[questionIndex];
    if (!currentQuestion) return;

    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: direction === 'right'
    };
    setAnswers(updatedAnswers);

    const nextIndex = questionIndex + 1;
    setQuestionIndex(nextIndex);

    if (nextIndex >= questions.length) {
      const preferences: UserPreferences = {
        likedDEs,
        dislikedDEs,
        superLikedDEs,
        nvidia: updatedAnswers.nvidia || false,
        lowRam: updatedAnswers.ram_low || false,
        gaming: updatedAnswers.gaming || false,
        privacy: updatedAnswers.privacy || false,
        systemdHate: updatedAnswers.systemd_hate || false,
        beginner: updatedAnswers.beginner || false,
        rolling: updatedAnswers.rolling || false,
        oldHardware: updatedAnswers.old_hardware || false,
      };

      const results = calculateDistroScores(preferences);
      setTopDistros(results);
      setStage('results');
      
      if (results[0]) {
        setBgColors(results[0].colorPalette);
      }
    } else if (questions[nextIndex]) {
      setBgColors(questions[nextIndex].colorPalette);
    }
  }, [questionIndex, questions, likedDEs, dislikedDEs, superLikedDEs, answers]);

  const handleReset = useCallback(() => {
    setStage('de');
    setDeIndex(0);
    setQuestionIndex(0);
    setLikedDEs([]);
    setDislikedDEs([]);
    setSuperLikedDEs([]);
    setAnswers({});
    setTopDistros([]);
    if (des[0]) {
      setBgColors(des[0].colorPalette);
    }
  }, [des]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (stage === 'de' && deIndex < des.length) {
        if (e.key === 'ArrowLeft') handleDESwipe('left');
        else if (e.key === 'ArrowRight') handleDESwipe('right');
        else if (e.key === 'ArrowUp') handleDESwipe('super');
      } else if (stage === 'questions' && questionIndex < questions.length) {
        if (e.key === 'ArrowLeft') handleQuestionSwipe('left');
        else if (e.key === 'ArrowRight') handleQuestionSwipe('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage, deIndex, questionIndex, des.length, questions.length, handleDESwipe, handleQuestionSwipe]);

  const getRoastContext = (): RoastContext => ({
    topDistro: topDistros[0]?.id || '',
    nvidia: answers.nvidia || false,
    lowRam: answers.ram_low || false,
    gaming: answers.gaming || false,
    privacy: answers.privacy || false,
    systemdHate: answers.systemd_hate || false,
    beginner: answers.beginner || false,
    rolling: answers.rolling || false,
    oldHardware: answers.old_hardware || false,
    likedDEs,
  });

  return (
    <div className="relative min-h-screen">
      <DynamicBackground colors={bgColors} />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-24 pb-8">
        {stage === 'de' && (
          <>
            <motion.div
              className="mb-6 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-white mb-2">
                Masaüstü Ortamı Tercihlerin
              </h2>
              <p className="text-gray-400">
                Beğendiğin DE'leri sağa, beğenmediklerini sola kaydır
              </p>
              <div className="mt-2 text-sm text-gray-500">
                {deIndex + 1} / {des.length}
              </div>
            </motion.div>

            <div className="relative flex h-[420px] w-[750px] max-w-[90vw] items-center justify-center">
              <AnimatePresence>
                {visibleDEs.map((de, idx) => {
                  const isTop = idx === 0;
                  return (
                    <motion.div
                      key={de.id}
                      className="absolute"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{
                        scale: 1 - idx * 0.05,
                        y: idx * 15,
                        opacity: 1 - idx * 0.2,
                        zIndex: visibleDEs.length - idx,
                      }}
                      exit={{ 
                        x: 300, 
                        opacity: 0,
                        transition: { duration: 0.3 }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <DECard
                        de={de}
                        onSwipe={handleDESwipe}
                        isTop={isTop}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ActionButtons
                onLike={() => handleDESwipe('right')}
                onDislike={() => handleDESwipe('left')}
                onSuperLike={() => handleDESwipe('super')}
                onReset={handleReset}
                showReset={deIndex > 0}
                disabled={deIndex >= des.length}
              />
            </motion.div>
          </>
        )}

        {stage === 'questions' && (
          <>
            <motion.div
              className="mb-6 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-white mb-2">
                Kritik Sorular
              </h2>
              <p className="text-gray-400">
                Evet için sağa, Hayır için sola kaydır
              </p>
            </motion.div>

            <div className="relative flex h-[420px] w-[750px] max-w-[90vw] items-center justify-center">
              <AnimatePresence>
                {visibleQuestions.map((question, idx) => {
                  const isTop = idx === 0;
                  return (
                    <motion.div
                      key={question.id}
                      className="absolute"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{
                        scale: 1 - idx * 0.05,
                        y: idx * 15,
                        opacity: 1 - idx * 0.2,
                        zIndex: visibleQuestions.length - idx,
                      }}
                      exit={{ 
                        x: 300, 
                        opacity: 0,
                        transition: { duration: 0.3 }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <QuestionCard
                        question={question}
                        onSwipe={handleQuestionSwipe}
                        isTop={isTop}
                        questionNumber={questionIndex + idx + 1}
                        totalQuestions={questions.length}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ActionButtons
                onLike={() => handleQuestionSwipe('right')}
                onDislike={() => handleQuestionSwipe('left')}
                onReset={handleReset}
                showReset={true}
                disabled={questionIndex >= questions.length}
              />
            </motion.div>
          </>
        )}

        {stage === 'results' && (
          <ResultsScreen
            topDistros={topDistros}
            roastContext={getRoastContext()}
            onReset={handleReset}
          />
        )}

        <div className="mt-6 flex items-center gap-3 text-center">
          <div className="flex gap-1.5">
            <kbd className="rounded bg-white/10 px-2 py-1 text-xs text-gray-400">←</kbd>
            <span className="text-xs text-gray-500">Geç</span>
          </div>
          <div className="flex gap-1.5">
            <kbd className="rounded bg-white/10 px-2 py-1 text-xs text-gray-400">→</kbd>
            <span className="text-xs text-gray-500">Beğen</span>
          </div>
          {stage === 'de' && (
            <div className="flex gap-1.5">
              <kbd className="rounded bg-white/10 px-2 py-1 text-xs text-gray-400">↑</kbd>
              <span className="text-xs text-gray-500">Süper</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
