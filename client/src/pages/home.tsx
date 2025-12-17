import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import CardStack from '@/components/CardStack';
import DynamicBackground from '@/components/DynamicBackground';
import { distroCards } from '@/data/distros';

export default function Home() {
  const [backgroundColors, setBackgroundColors] = useState<string[]>(
    distroCards[0]?.colorPalette || ['#6B46C1', '#4F46E5', '#2563EB']
  );

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <DynamicBackground colors={backgroundColors} />
      <Header />
      
      <main className="flex min-h-screen items-center justify-center pt-20">
        <CardStack 
          cards={distroCards} 
          onBackgroundChange={setBackgroundColors}
        />
      </main>
    </div>
  );
}
