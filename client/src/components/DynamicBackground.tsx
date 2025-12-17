import { motion } from 'framer-motion';

interface DynamicBackgroundProps {
  colors: string[];
}

export default function DynamicBackground({ colors }: DynamicBackgroundProps) {
  const gradientColors = colors.length >= 2 
    ? colors 
    : ['#6B46C1', '#4F46E5', '#2563EB'];

  return (
    <motion.div
      className="fixed inset-0 -z-10"
      animate={{
        background: `radial-gradient(ellipse at center, ${gradientColors[0]}30 0%, ${gradientColors[1]}20 50%, ${gradientColors[2] || gradientColors[0]}10 100%)`,
      }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl" />
    </motion.div>
  );
}
