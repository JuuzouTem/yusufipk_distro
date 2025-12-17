import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Monitor, Zap, Settings, Feather } from 'lucide-react';

interface DECardProps {
  de: {
    id: string;
    name: string;
    description: string;
    style: string;
    resourceUsage: string;
    customization: string;
    colorPalette: string[];
    screenshot?: string;
  };
  onSwipe: (direction: 'left' | 'right' | 'super') => void;
  isTop: boolean;
}

const styleIcons: Record<string, typeof Monitor> = {
  'modern': Settings,
  'minimalist': Feather,
  'traditional': Monitor,
  'minimal': Feather,
  'mac-like': Monitor,
  'beautiful': Zap,
  'minimal-tiling': Settings,
};

const styleLabels: Record<string, string> = {
  'modern': 'Modern',
  'minimalist': 'Minimalist',
  'traditional': 'Geleneksel',
  'minimal': 'Minimal',
  'mac-like': 'Mac Benzeri',
  'beautiful': 'Gösterişli',
  'minimal-tiling': 'Tiling WM',
};

const resourceLabels: Record<string, string> = {
  'very-low': 'Çok Hafif',
  'low': 'Hafif',
  'low-medium': 'Hafif-Orta',
  'medium': 'Orta',
  'medium-high': 'Orta-Ağır',
  'high': 'Ağır',
};

export default function DECard({ de, onSwipe, isTop }: DECardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0.5, 1, 1, 1, 0.5]);

  const likeOpacity = useTransform(x, [0, 100, 200], [0, 0.5, 1]);
  const dislikeOpacity = useTransform(x, [-200, -100, 0], [1, 0.5, 0]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      onSwipe('right');
    } else if (info.offset.x < -threshold) {
      onSwipe('left');
    }
  };

  const StyleIcon = styleIcons[de.style] || Monitor;
  const primaryColor = de.colorPalette[0];
  const secondaryColor = de.colorPalette[1];

  return (
    <motion.div
      className="cursor-grab active:cursor-grabbing"
      style={{ x, rotate, opacity }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      whileHover={isTop ? { scale: 1.02 } : {}}
      data-testid={`de-card-${de.id}`}
    >
      <div 
        className="relative w-[900px] max-w-[95vw] rounded-3xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}30)`,
        }}
      >
        <div className="absolute inset-0 backdrop-blur-xl" />
        <div 
          className="absolute inset-0 rounded-3xl"
          style={{
            border: `2px solid ${primaryColor}40`,
            boxShadow: `0 0 60px ${primaryColor}20, inset 0 0 60px ${primaryColor}10`,
          }}
        />

        <motion.div
          className="absolute top-6 right-6 z-20 rounded-xl px-4 py-2 font-bold text-white"
          style={{ 
            opacity: likeOpacity,
            backgroundColor: '#22C55E',
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)',
          }}
        >
          SEVDİM
        </motion.div>

        <motion.div
          className="absolute top-6 left-6 z-20 rounded-xl px-4 py-2 font-bold text-white"
          style={{ 
            opacity: dislikeOpacity,
            backgroundColor: '#EF4444',
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)',
          }}
        >
          GEÇ
        </motion.div>

        <div className="relative z-10 flex flex-row items-stretch min-h-[360px]">
          {de.screenshot && (
            <div className="w-[520px] flex-shrink-0 overflow-hidden rounded-l-3xl">
              <img
                src={`/de_screenshots/${de.screenshot}`}
                alt={`${de.name} screenshot`}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div 
                className="absolute inset-0 w-[520px]"
                style={{
                  background: `linear-gradient(90deg, transparent 60%, ${primaryColor}40 100%)`,
                }}
              />
            </div>
          )}
          
          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
            <div 
              className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                boxShadow: `0 6px 20px ${primaryColor}50`,
              }}
            >
              <StyleIcon className="h-6 w-6 text-white" />
            </div>

            <h2 
              className="mb-1 font-['Space_Grotesk'] text-2xl font-bold"
              style={{ color: primaryColor }}
            >
              {de.name}
            </h2>

            <p className="mb-4 max-w-xs text-sm text-gray-300">
              {de.description}
            </p>

            <div className="flex flex-wrap justify-center gap-1.5">
              <span 
                className="rounded-full px-2.5 py-1 text-[10px] font-medium"
                style={{ 
                  backgroundColor: `${primaryColor}30`,
                  color: primaryColor,
                }}
              >
                {styleLabels[de.style] || de.style}
              </span>
              <span 
                className="rounded-full px-2.5 py-1 text-[10px] font-medium"
                style={{ 
                  backgroundColor: `${secondaryColor}30`,
                  color: secondaryColor,
                }}
              >
                {resourceLabels[de.resourceUsage] || de.resourceUsage}
              </span>
              <span 
                className="rounded-full px-2.5 py-1 text-[10px] font-medium bg-white/10 text-gray-300"
              >
                Özelleştirme: {de.customization}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
