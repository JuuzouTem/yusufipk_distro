import { motion } from 'framer-motion';
import { PartyPopper, RotateCcw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { DistroCard } from '@/data/distros';

interface EndOfDeckProps {
  likedCards: DistroCard[];
  onReset: () => void;
}

export default function EndOfDeck({ likedCards, onReset }: EndOfDeckProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-8 text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <motion.div
        animate={{
          rotate: [0, -10, 10, -10, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <PartyPopper className="h-24 w-24 text-yellow-400" />
      </motion.div>

      <div>
        <h2 className="font-mono text-3xl font-bold text-white" data-testid="text-end-title">
          Öneriler Hazır!
        </h2>
        <p className="mt-2 text-lg text-white/70">
          {likedCards.length > 0
            ? `${likedCards.length} dağıtım beğendin`
            : 'Hiçbir dağıtım beğenmedin'}
        </p>
      </div>

      {likedCards.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4">
          {likedCards.map((card) => (
            <motion.div
              key={card.id}
              className="overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              data-testid={`result-card-${card.id}`}
            >
              <img
                src={card.screenshot}
                alt={card.distroName}
                className="h-24 w-40 object-cover"
              />
              <div className="p-3">
                <p className="font-semibold text-white">{card.distroName}</p>
                <p className="text-xs text-white/60">{card.desktopEnvironment}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="flex gap-4">
        <Button
          variant="outline"
          className="gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20"
          onClick={onReset}
          data-testid="button-restart"
        >
          <RotateCcw className="h-4 w-4" />
          Tekrar Başla
        </Button>
        {likedCards.length > 0 && (
          <Button
            className="gap-2 bg-primary text-primary-foreground"
            data-testid="button-download"
          >
            <Download className="h-4 w-4" />
            İndir
          </Button>
        )}
      </div>
    </motion.div>
  );
}
