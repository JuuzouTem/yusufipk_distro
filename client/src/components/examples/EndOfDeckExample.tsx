import EndOfDeck from '../EndOfDeck';
import { distroCards } from '@/data/distros';

export default function EndOfDeckExample() {
  const likedCards = distroCards.slice(0, 3);
  
  return (
    <div className="flex min-h-[500px] items-center justify-center bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-8">
      <EndOfDeck 
        likedCards={likedCards} 
        onReset={() => console.log('Reset!')}
      />
    </div>
  );
}
