import CardStack from '../CardStack';
import { distroCards } from '@/data/distros';

export default function CardStackExample() {
  return (
    <div className="flex min-h-[750px] items-center justify-center bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-8">
      <CardStack 
        cards={distroCards} 
        onBackgroundChange={(colors) => console.log('Colors:', colors)}
      />
    </div>
  );
}
