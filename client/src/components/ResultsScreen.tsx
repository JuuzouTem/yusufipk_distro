import { motion } from 'framer-motion';
import { Trophy, Medal, Award, ExternalLink, RotateCcw, Sparkles, Download } from 'lucide-react';
import type { ScoredDistro } from '@/lib/scoring';
import type { RoastContext } from '@/data/roasts';
import { generateRoast } from '@/data/roasts';

interface ResultsScreenProps {
  topDistros: ScoredDistro[];
  roastContext: RoastContext;
  onReset: () => void;
}

const rankIcons = [Trophy, Medal, Award];
const rankColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
const rankLabels = ['Birinci', 'İkinci', 'Üçüncü'];

export default function ResultsScreen({ topDistros, roastContext, onReset }: ResultsScreenProps) {
  const roastMessage = generateRoast(roastContext);

  if (!topDistros || topDistros.length === 0) {
    return (
      <motion.div
        className="flex flex-col items-center gap-6 px-4 py-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-2xl font-bold text-white">Bir şeyler yanlış gitti</h2>
        <p className="text-gray-400">Lütfen tekrar deneyin.</p>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
          data-testid="button-retry"
        >
          <RotateCcw className="h-5 w-5" />
          Tekrar Dene
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-center gap-8 px-4 py-8 max-w-5xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="h-8 w-8 text-yellow-400" />
          <h1 className="font-['Space_Grotesk'] text-4xl font-bold text-white">
            Senin İçin En Uygun Dağıtımlar
          </h1>
          <Sparkles className="h-8 w-8 text-yellow-400" />
        </div>
        <p className="text-gray-400 text-lg">
          Tercihlerine göre en uyumlu Linux dağıtımları
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {topDistros.map((distro, idx) => {
          const RankIcon = rankIcons[idx];
          const isFirst = idx === 0;
          const primaryColor = distro.colorPalette[0];

          return (
            <motion.div
              key={distro.id}
              className={`relative rounded-2xl overflow-hidden ${isFirst ? 'md:scale-110 md:z-10' : ''}`}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: isFirst ? 1.05 : 1 }}
              transition={{ delay: idx * 0.15 + 0.3 }}
              data-testid={`result-distro-${distro.id}`}
            >
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, ${primaryColor}30, ${primaryColor}10)`,
                }}
              />
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  border: isFirst ? `3px solid ${rankColors[0]}` : `2px solid ${primaryColor}40`,
                  boxShadow: isFirst ? `0 0 40px ${rankColors[0]}40` : `0 0 20px ${primaryColor}20`,
                }}
              />

              <div className="relative z-10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="flex items-center gap-2 rounded-full px-3 py-1"
                    style={{ backgroundColor: `${rankColors[idx]}30` }}
                  >
                    <RankIcon className="h-5 w-5" style={{ color: rankColors[idx] }} />
                    <span className="text-sm font-bold" style={{ color: rankColors[idx] }}>
                      {rankLabels[idx]}
                    </span>
                  </div>
                  <div 
                    className="rounded-full px-3 py-1 text-sm font-bold"
                    style={{ 
                      backgroundColor: `${primaryColor}30`,
                      color: primaryColor,
                    }}
                  >
                    +{distro.score} puan
                  </div>
                </div>

                <h2 
                  className="font-['Space_Grotesk'] text-2xl font-bold mb-2"
                  style={{ color: primaryColor }}
                >
                  {distro.name}
                </h2>
                <p className="text-gray-400 text-sm mb-4">{distro.tagline}</p>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Varsayılan DE: {distro.defaultDE}</p>
                  <div className="flex flex-wrap gap-1">
                    {distro.matchReasons.map((reason, i) => (
                      <span 
                        key={i}
                        className="text-xs rounded-full px-2 py-1 bg-white/5 text-gray-300"
                      >
                        {reason}
                      </span>
                    ))}
                  </div>
                </div>

                {isFirst && (
                  <div className="mb-4 space-y-2">
                    <div>
                      <p className="text-xs text-green-400 mb-1">Artıları:</p>
                      <div className="flex flex-wrap gap-1">
                        {distro.pros.slice(0, 2).map((pro, i) => (
                          <span key={i} className="text-xs text-green-300/80">{pro}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <a
                  href={distro.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${distro.colorPalette[1]})`,
                    boxShadow: `0 4px 20px ${primaryColor}40`,
                  }}
                  data-testid={`button-download-${distro.id}`}
                >
                  <Download className="h-4 w-4 text-white" />
                  <span className="text-white">İndir</span>
                  <ExternalLink className="h-3 w-3 text-white/70" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="w-full max-w-3xl mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div 
          className="relative rounded-2xl overflow-hidden p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
            border: '1px solid rgba(139, 92, 246, 0.3)',
          }}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-purple-300 mb-2">
                DistroMatch AI Diyor ki...
              </h3>
              <p className="text-gray-300 leading-relaxed" data-testid="roast-message">
                {roastMessage}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.button
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
        onClick={onReset}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-testid="button-reset"
      >
        <RotateCcw className="h-5 w-5" />
        Tekrar Dene
      </motion.button>
    </motion.div>
  );
}
