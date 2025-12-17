import SwipeCard from '../SwipeCard';
import { distroCards } from '@/data/distros';

export default function SwipeCardExample() {
  const card = distroCards[0];
  
  return (
    <div className="flex min-h-[600px] items-center justify-center bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-8">
      <div className="relative">
        <SwipeCard
          card={card}
          isTop={true}
          onSwipe={(dir) => console.log('Swiped:', dir)}
          scale={1}
          zIndex={10}
          offsetY={0}
        />
      </div>
    </div>
  );
}
