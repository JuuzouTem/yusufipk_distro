import EndOfDeck from '../EndOfDeck';
import { distroCards } from '@/data/distros';

export default function EndOfDeckExample() {
  const likedCards = distroCards.slice(0, 3);
  const superLikedCards = distroCards.slice(0, 1);
  
  return (
    <div className="flex min-h-[500px] items-center justify-center bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-8">
      <EndOfDeck 
        likedCards={likedCards} 
        superLikedCards={superLikedCards}
        onReset={() => console.log('Reset!')}
      />
    </div>
  );
}
