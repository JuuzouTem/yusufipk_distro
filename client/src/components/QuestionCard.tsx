import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface QuestionCardProps {
  question: {
    id: string;
    question: string;
    type: string;
    colorPalette: string[];
  };
  onSwipe: (direction: 'left' | 'right') => void;
  isTop: boolean;
  questionNumber: number;
  totalQuestions: number;
}

export default function QuestionCard({ question, onSwipe, isTop, questionNumber, totalQuestions }: QuestionCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0.5, 1, 1, 1, 0.5]);

  const yesOpacity = useTransform(x, [0, 100, 200], [0, 0.5, 1]);
  const noOpacity = useTransform(x, [-200, -100, 0], [1, 0.5, 0]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      onSwipe('right');
    } else if (info.offset.x < -threshold) {
      onSwipe('left');
    }
  };

  const primaryColor = question.colorPalette[0];
  const secondaryColor = question.colorPalette[1];

  return (
    <motion.div
      className="absolute cursor-grab active:cursor-grabbing"
      style={{ x, rotate, opacity }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      whileHover={isTop ? { scale: 1.02 } : {}}
      data-testid={`question-card-${question.id}`}
    >
      <div 
        className="relative w-[700px] max-w-[85vw] rounded-3xl overflow-hidden"
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
          className="absolute top-6 right-6 z-20 flex items-center gap-2 rounded-xl px-4 py-2 font-bold text-white"
          style={{ 
            opacity: yesOpacity,
            backgroundColor: '#22C55E',
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)',
          }}
        >
          <Check className="h-5 w-5" />
          EVET
        </motion.div>

        <motion.div
          className="absolute top-6 left-6 z-20 flex items-center gap-2 rounded-xl px-4 py-2 font-bold text-white"
          style={{ 
            opacity: noOpacity,
            backgroundColor: '#EF4444',
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)',
          }}
        >
          <X className="h-5 w-5" />
          HAYIR
        </motion.div>

        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center min-h-[350px]">
          <div className="mb-4 text-sm font-medium text-gray-400">
            Soru {questionNumber} / {totalQuestions}
          </div>
          
          <div 
            className="mb-8 flex h-20 w-20 items-center justify-center rounded-full"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              boxShadow: `0 10px 40px ${primaryColor}50`,
            }}
          >
            <span className="text-3xl font-bold text-white">?</span>
          </div>

          <h2 
            className="mb-6 font-['Space_Grotesk'] text-3xl font-bold max-w-lg"
            style={{ color: primaryColor }}
          >
            {question.question}
          </h2>

          <div className="flex items-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20">
                <X className="h-5 w-5 text-red-400" />
              </div>
              <span>Hayır</span>
            </div>
            <div className="h-8 w-px bg-gray-700" />
            <div className="flex items-center gap-2">
              <span>Evet</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
                <Check className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
