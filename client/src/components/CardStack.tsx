import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SwipeCard from './SwipeCard';
import ActionButtons from './ActionButtons';
import EndOfDeck from './EndOfDeck';
import type { DistroCard } from '@/data/distros';

interface CardStackProps {
  cards: DistroCard[];
  onBackgroundChange?: (colors: string[]) => void;
}

export default function CardStack({ cards, onBackgroundChange }: CardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCards, setLikedCards] = useState<DistroCard[]>([]);
  const [dislikedCards, setDislikedCards] = useState<DistroCard[]>([]);

  const visibleCards = cards.slice(currentIndex, currentIndex + 3);
  const isFinished = currentIndex >= cards.length;

  const handleSwipe = useCallback(
    (direction: 'left' | 'right') => {
      const currentCard = cards[currentIndex];
      if (!currentCard) return;

      if (direction === 'right') {
        setLikedCards((prev) => [...prev, currentCard]);
        console.log('Liked:', currentCard.distroName);
      } else {
        setDislikedCards((prev) => [...prev, currentCard]);
        console.log('Disliked:', currentCard.distroName);
      }

      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      const nextCard = cards[nextIndex];
      if (nextCard && onBackgroundChange) {
        onBackgroundChange(nextCard.colorPalette);
      }
    },
    [currentIndex, cards, onBackgroundChange]
  );

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setLikedCards([]);
    setDislikedCards([]);
    if (cards[0] && onBackgroundChange) {
      onBackgroundChange(cards[0].colorPalette);
    }
  }, [cards, onBackgroundChange]);

  if (isFinished) {
    return <EndOfDeck likedCards={likedCards} onReset={handleReset} />;
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative flex h-[550px] w-[900px] max-w-[90vw] items-center justify-center">
        <AnimatePresence>
          {visibleCards.map((card, index) => {
            const isTop = index === 0;
            const scale = 1 - index * 0.05;
            const offsetY = index * 12;
            const zIndex = visibleCards.length - index;

            return (
              <SwipeCard
                key={card.id}
                card={card}
                isTop={isTop}
                onSwipe={handleSwipe}
                scale={scale}
                zIndex={zIndex}
                offsetY={offsetY}
              />
            );
          })}
        </AnimatePresence>
      </div>

      <motion.div
        className="mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ActionButtons
          onLike={() => handleSwipe('right')}
          onDislike={() => handleSwipe('left')}
          onReset={handleReset}
          showReset={currentIndex > 0}
          disabled={isFinished}
        />
      </motion.div>

      <div className="mt-6 flex items-center gap-3 text-center">
        <div className="flex gap-1.5">
          {cards.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 w-8 rounded-full transition-all duration-300 ${
                idx < currentIndex 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                  : idx === currentIndex 
                    ? 'bg-white' 
                    : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
