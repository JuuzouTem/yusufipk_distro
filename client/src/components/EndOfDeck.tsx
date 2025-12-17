import { motion } from 'framer-motion';
import { RotateCcw, Download, Trophy, Star, ExternalLink, Zap } from 'lucide-react';
import type { DistroCard } from '@/data/distros';

interface EndOfDeckProps {
  likedCards: DistroCard[];
  superLikedCards: DistroCard[];
  onReset: () => void;
}

export default function EndOfDeck({ likedCards, superLikedCards, onReset }: EndOfDeckProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-10 text-center px-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(234, 179, 8, 0.3) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          animate={{
            rotate: [0, -10, 10, -10, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 p-6">
            <Trophy className="h-16 w-16 text-white" />
          </div>
        </motion.div>
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          <Star className="h-8 w-8 text-yellow-300" fill="currentColor" />
        </motion.div>
      </div>

      <div>
        <motion.h2 
          className="font-mono text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-yellow-200" 
          data-testid="text-end-title"
          animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ backgroundSize: '200%' }}
        >
          Eşleşme Tamamlandı!
        </motion.h2>
        <p className="mt-3 text-xl text-white/70">
          {likedCards.length > 0
            ? `${likedCards.length} dağıtım ile eşleştin`
            : 'Henüz bir eşleşme yok'}
        </p>
      </div>

      {likedCards.length > 0 && (
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl">
          {likedCards.map((card, idx) => (
            <motion.div
              key={card.id}
              className="group relative overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              data-testid={`result-card-${card.id}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl" />
              <div className={`absolute inset-0 rounded-2xl border ${superLikedCards.some(s => s.id === card.id) ? 'border-cyan-400/50' : 'border-white/10'}`} />
              
              {superLikedCards.some(s => s.id === card.id) && (
                <div className="absolute top-2 left-2 z-20 flex items-center gap-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-2 py-1">
                  <Zap className="h-3 w-3 text-white" fill="currentColor" />
                  <span className="text-xs font-bold text-white">SUPER</span>
                </div>
              )}
              
              <div className="relative">
                <img
                  src={card.screenshot}
                  alt={card.distroName}
                  className="h-32 w-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <a 
                  href={card.downloadUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                  data-testid={`link-download-${card.id}`}
                >
                  <div className="rounded-full bg-white/20 backdrop-blur-md p-2 hover:bg-white/30 transition-colors">
                    <ExternalLink className="h-4 w-4 text-white" />
                  </div>
                </a>
              </div>
              
              <div className="relative p-4 bg-gradient-to-r from-gray-900/90 to-gray-800/90">
                <p className="font-bold text-lg text-white">{card.distroName}</p>
                <p className="text-sm text-white/60">{card.desktopEnvironment}</p>
                <div className="mt-2 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-yellow-400" fill={i < 4 ? 'currentColor' : 'none'} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="flex gap-6">
        <motion.button
          className="group relative flex items-center gap-3 rounded-full px-8 py-4 overflow-hidden"
          onClick={onReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-testid="button-restart"
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full" />
          <RotateCcw className="relative h-5 w-5 text-white group-hover:rotate-180 transition-transform duration-500" />
          <span className="relative font-medium text-white">Tekrar Başla</span>
        </motion.button>
        
        {likedCards.length > 0 && (
          <motion.button
            className="group relative flex items-center gap-3 rounded-full px-8 py-4 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-testid="button-download"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <Download className="relative h-5 w-5 text-white" />
            <span className="relative font-medium text-white">Karşılaştır</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
