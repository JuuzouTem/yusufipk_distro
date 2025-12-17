import { motion } from 'framer-motion';
import { Terminal, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-8 py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-center gap-4">
        <motion.div 
          className="relative rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 p-3"
          whileHover={{ scale: 1.05, rotate: 5 }}
          style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)' }}
        >
          <Terminal className="h-7 w-7 text-white" />
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="h-4 w-4 text-yellow-300" />
          </motion.div>
        </motion.div>
        <div>
          <h1 className="font-mono text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200" data-testid="text-logo">
            DistroMatch
          </h1>
          <p className="text-xs text-white/50">Sana uygun Linux'u bul</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2">
        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-sm text-white/70">6 Dağıtım</span>
      </div>
    </motion.header>
  );
}
