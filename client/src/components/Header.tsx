import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export default function Header() {
  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary p-2">
          <Terminal className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="font-mono text-2xl font-bold text-white" data-testid="text-logo">
          DistroMatch
        </h1>
      </div>
    </motion.header>
  );
}
