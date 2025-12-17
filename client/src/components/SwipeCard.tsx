import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Heart, X, Sparkles } from 'lucide-react';
import type { DistroCard } from '@/data/distros';

interface SwipeCardProps {
  card: DistroCard;
  isTop: boolean;
  onSwipe: (direction: 'left' | 'right') => void;
  scale?: number;
  zIndex: number;
  offsetY?: number;
}

export default function SwipeCard({
  card,
  isTop,
  onSwipe,
  scale = 1,
  zIndex,
  offsetY = 0,
}: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const likeOpacity = useTransform(x, [0, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-150, 0], [1, 0]);
  const glowIntensity = useTransform(x, [-200, 0, 200], [1, 0, 1]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 150;
    if (info.offset.x > threshold) {
      onSwipe('right');
    } else if (info.offset.x < -threshold) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      className="absolute cursor-grab active:cursor-grabbing"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        scale,
        zIndex,
        y: offsetY,
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={isTop ? handleDragEnd : undefined}
      animate={{
        scale,
        y: offsetY,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      exit={{
        x: x.get() > 0 ? 500 : -500,
        opacity: 0,
        rotate: x.get() > 0 ? 20 : -20,
        transition: { duration: 0.3 },
      }}
    >
      <div
        className="group relative w-[900px] max-w-[90vw] overflow-hidden rounded-3xl shadow-2xl"
        data-testid={`card-distro-${card.id}`}
        style={{
          boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
        }}
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none z-10" />
        
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
        
        <div className="relative bg-gradient-to-b from-gray-900 to-black rounded-3xl overflow-hidden">
          <div className="relative aspect-video overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10 pointer-events-none" />
            
            <img
              src={card.screenshot}
              alt={`${card.distroName} desktop`}
              className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              draggable={false}
            />
            
            <div className="absolute top-4 right-4 z-20">
              <div className="flex items-center gap-2 rounded-full bg-black/50 backdrop-blur-md px-4 py-2 border border-white/10">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-white">{card.desktopEnvironment}</span>
              </div>
            </div>
            
            {isTop && (
              <>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-30"
                  style={{ opacity: likeOpacity }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/40 to-emerald-500/40" />
                  <motion.div 
                    className="relative rounded-full border-4 border-white bg-gradient-to-br from-green-400 to-emerald-600 p-8 shadow-2xl"
                    style={{ 
                      boxShadow: '0 0 60px rgba(34, 197, 94, 0.6), 0 0 120px rgba(34, 197, 94, 0.3)',
                    }}
                  >
                    <Heart className="h-20 w-20 text-white drop-shadow-lg" fill="white" />
                  </motion.div>
                </motion.div>
                
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-30"
                  style={{ opacity: nopeOpacity }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/40 to-rose-500/40" />
                  <motion.div 
                    className="relative rounded-full border-4 border-white bg-gradient-to-br from-red-400 to-rose-600 p-8 shadow-2xl"
                    style={{ 
                      boxShadow: '0 0 60px rgba(239, 68, 68, 0.6), 0 0 120px rgba(239, 68, 68, 0.3)',
                    }}
                  >
                    <X className="h-20 w-20 text-white drop-shadow-lg" />
                  </motion.div>
                </motion.div>

                <motion.div
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{ 
                    opacity: glowIntensity,
                    background: x.get() > 0 
                      ? 'radial-gradient(circle at center, rgba(34, 197, 94, 0.2) 0%, transparent 70%)'
                      : 'radial-gradient(circle at center, rgba(239, 68, 68, 0.2) 0%, transparent 70%)'
                  }}
                />
              </>
            )}
          </div>
          
          <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-8 py-6 border-t border-white/5">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5" />
            
            <div className="relative flex items-center justify-between">
              <div>
                <h2
                  className="font-mono text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white"
                  data-testid={`text-title-${card.id}`}
                >
                  "{card.wittyTitle}"
                </h2>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-xl font-bold text-white">
                    {card.distroName}
                  </span>
                  <div className="h-1 w-1 rounded-full bg-white/40" />
                  <span className="text-sm text-white/50">
                    Linux Distribution
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                {card.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/10 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
