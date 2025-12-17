import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Heart, X } from 'lucide-react';
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
        className="relative w-[900px] max-w-[90vw] overflow-hidden rounded-2xl bg-black/90 shadow-2xl"
        data-testid={`card-distro-${card.id}`}
      >
        <div className="relative aspect-video">
          <img
            src={card.screenshot}
            alt={`${card.distroName} desktop`}
            className="h-full w-full object-cover"
            draggable={false}
          />
          
          {isTop && (
            <>
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-green-500/30"
                style={{ opacity: likeOpacity }}
              >
                <div className="rounded-full border-4 border-white bg-green-500 p-6">
                  <Heart className="h-16 w-16 text-white" fill="white" />
                </div>
              </motion.div>
              
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-red-500/30"
                style={{ opacity: nopeOpacity }}
              >
                <div className="rounded-full border-4 border-white bg-red-500 p-6">
                  <X className="h-16 w-16 text-white" />
                </div>
              </motion.div>
            </>
          )}
        </div>
        
        <div className="bg-black/80 px-8 py-6 backdrop-blur-md">
          <h2
            className="font-mono text-2xl font-bold text-white"
            data-testid={`text-title-${card.id}`}
          >
            {card.wittyTitle}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="text-lg font-semibold text-white/90">
              {card.distroName}
            </span>
            <span className="text-sm text-white/60">
              {card.desktopEnvironment}
            </span>
            <div className="flex gap-2">
              {card.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
