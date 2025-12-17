import { useEffect } from 'react';
import Header from '@/components/Header';
import DistroMatch from '@/components/DistroMatch';

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Header />
      <main>
        <DistroMatch />
      </main>
    </div>
  );
}
