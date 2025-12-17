import { motion } from 'framer-motion';
import { Heart, X, RotateCcw, Zap } from 'lucide-react';

interface ActionButtonsProps {
  onLike: () => void;
  onDislike: () => void;
  onReset?: () => void;
  showReset?: boolean;
  disabled?: boolean;
}

export default function ActionButtons({
  onLike,
  onDislike,
  onReset,
  showReset = false,
  disabled = false,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-8">
      <motion.button
        className="group relative flex h-20 w-20 items-center justify-center rounded-full"
        onClick={onDislike}
        disabled={disabled}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        data-testid="button-dislike"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/20 to-rose-600/20 backdrop-blur-xl border border-red-500/30" />
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: '0 0 40px rgba(239, 68, 68, 0.4), inset 0 0 20px rgba(239, 68, 68, 0.1)' }}
        />
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-red-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <X className="relative h-10 w-10 text-red-400 group-hover:text-white transition-colors duration-300" strokeWidth={3} />
      </motion.button>

      {showReset && onReset && (
        <motion.button
          className="group relative flex h-14 w-14 items-center justify-center rounded-full"
          onClick={onReset}
          whileHover={{ scale: 1.1, rotate: -180 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
          data-testid="button-reset"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-600/20 backdrop-blur-xl border border-amber-500/30" />
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)' }}
          />
          <RotateCcw className="relative h-6 w-6 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" strokeWidth={2.5} />
        </motion.button>
      )}

      <motion.button
        className="group relative flex h-20 w-20 items-center justify-center rounded-full"
        onClick={onLike}
        disabled={disabled}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        data-testid="button-like"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-600/20 backdrop-blur-xl border border-emerald-500/30" />
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.4), inset 0 0 20px rgba(34, 197, 94, 0.1)' }}
        />
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Heart className="relative h-10 w-10 text-emerald-400 group-hover:text-white transition-colors duration-300" fill="currentColor" strokeWidth={2} />
      </motion.button>

      <motion.button
        className="group relative flex h-14 w-14 items-center justify-center rounded-full"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        data-testid="button-superlike"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-xl border border-cyan-500/30" />
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)' }}
        />
        <Zap className="relative h-6 w-6 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" fill="currentColor" />
      </motion.button>
    </div>
  );
}
