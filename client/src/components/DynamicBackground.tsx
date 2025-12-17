import { motion } from 'framer-motion';

interface DynamicBackgroundProps {
  colors: string[];
}

export default function DynamicBackground({ colors }: DynamicBackgroundProps) {
  const gradientColors = colors.length >= 2 
    ? colors 
    : ['#6B46C1', '#4F46E5', '#2563EB'];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(ellipse 80% 50% at 50% 50%, ${gradientColors[0]}25 0%, transparent 50%)`,
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      
      <motion.div
        className="absolute -top-1/2 -left-1/2 h-full w-full"
        animate={{
          background: `radial-gradient(circle at center, ${gradientColors[1]}15 0%, transparent 40%)`,
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      
      <motion.div
        className="absolute -bottom-1/2 -right-1/2 h-full w-full"
        animate={{
          background: `radial-gradient(circle at center, ${gradientColors[2] || gradientColors[0]}15 0%, transparent 40%)`,
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxMTEiPjwvcmVjdD4KPC9zdmc+')] opacity-30" />
      
      <div className="absolute top-20 left-20 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      
      <motion.div
        className="absolute top-1/4 right-1/4 h-2 w-2 rounded-full bg-white/30"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 h-1 w-1 rounded-full bg-purple-400/50"
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/3 h-1.5 w-1.5 rounded-full bg-cyan-400/40"
        animate={{ 
          y: [0, -25, 0],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
    </div>
  );
}
