import distrosData from '@/data/distros.json';

export interface ScoredDistro {
  id: string;
  name: string;
  score: number;
  colorPalette: string[];
  tagline: string;
  downloadUrl: string;
  defaultDE: string;
  pros: string[];
  cons: string[];
  matchReasons: string[];
}

export interface UserPreferences {
  likedDEs: string[];
  dislikedDEs: string[];
  superLikedDEs: string[];
  nvidia: boolean;
  lowRam: boolean;
  gaming: boolean;
  privacy: boolean;
  systemdHate: boolean;
  beginner: boolean;
  rolling: boolean;
  oldHardware: boolean;
}

const DE_SCORES: Record<string, string[]> = {
  kde: ['cachyos', 'endeavouros', 'manjaro', 'kubuntu', 'kdeneon', 'opensuse', 'fedora', 'nobara', 'bazzite', 'garuda', 'artix', 'devuan'],
  plasma: ['cachyos', 'endeavouros', 'manjaro', 'kubuntu', 'kdeneon', 'opensuse', 'fedora', 'nobara', 'bazzite', 'garuda', 'artix', 'devuan'],
  gnome: ['ubuntu', 'fedora', 'popos', 'zorin', 'debian', 'tails', 'endeavouros', 'manjaro'],
  xfce: ['mxlinux', 'xubuntu', 'kali', 'qubes', 'endeavouros', 'manjaro', 'devuan'],
  cinnamon: ['mint', 'endeavouros', 'manjaro', 'devuan'],
  mate: ['mxlinux', 'mint', 'parrot', 'ubuntu', 'endeavouros'],
  lxqt: ['lubuntu', 'endeavouros', 'artix', 'devuan'],
  budgie: ['endeavouros', 'manjaro', 'cachyos'],
  pantheon: ['elementary'],
  cosmic: ['popos'],
  'cosmic/gnome': ['popos'],
  dde: ['deepin'],
  deepin: ['deepin'],
  i3: ['endeavouros', 'manjaro', 'garuda', 'arch', 'artix', 'void', 'cachyos', 'kali', 'qubes'],
  sway: ['endeavouros', 'manjaro', 'garuda', 'arch', 'artix', 'void', 'cachyos', 'nixos', 'alpine'],
  hyprland: ['cachyos', 'endeavouros', 'garuda', 'nixos', 'arch'],
  'i3/sway': ['endeavouros', 'manjaro', 'garuda', 'arch', 'artix', 'void', 'cachyos'],
};

export function calculateDistroScores(preferences: UserPreferences): ScoredDistro[] {
  const scores: Record<string, number> = {};
  const matchReasons: Record<string, string[]> = {};
  
  distrosData.distros.forEach(distro => {
    scores[distro.id] = 0;
    matchReasons[distro.id] = [];
  });

  preferences.superLikedDEs.forEach(de => {
    const deKey = de.toLowerCase().replace(/\s+/g, '').replace('plasma', '').replace('/', '');
    const matchingDistros = DE_SCORES[deKey] || DE_SCORES[de.toLowerCase()] || [];
    matchingDistros.forEach(distroId => {
      scores[distroId] = (scores[distroId] || 0) + 50;
      if (!matchReasons[distroId]) matchReasons[distroId] = [];
      matchReasons[distroId].push(`${de} masaüstü ortamını bayıldın!`);
    });
  });

  preferences.likedDEs.forEach(de => {
    if (preferences.superLikedDEs.includes(de)) return;
    const deKey = de.toLowerCase().replace(/\s+/g, '').replace('plasma', '').replace('/', '');
    const matchingDistros = DE_SCORES[deKey] || DE_SCORES[de.toLowerCase()] || [];
    matchingDistros.forEach(distroId => {
      scores[distroId] = (scores[distroId] || 0) + 10;
      if (!matchReasons[distroId]?.some(r => r.includes(de))) {
        matchReasons[distroId]?.push(`${de} desteği mevcut`);
      }
    });
  });

  preferences.dislikedDEs.forEach(de => {
    const deKey = de.toLowerCase().replace(/\s+/g, '').replace('plasma', '').replace('/', '');
    const matchingDistros = DE_SCORES[deKey] || DE_SCORES[de.toLowerCase()] || [];
    matchingDistros.forEach(distroId => {
      scores[distroId] = (scores[distroId] || 0) - 15;
    });
  });

  distrosData.criticalQuestions.forEach(question => {
    const prefKey = question.id as keyof UserPreferences;
    const userAnswer = preferences[prefKey];
    
    if (userAnswer === true && question.impact.yes) {
      question.impact.yes.boost?.forEach(distroId => {
        scores[distroId] = (scores[distroId] || 0) + 10;
        
        const reasonMap: Record<string, string> = {
          nvidia: 'NVIDIA desteği mükemmel',
          ram_low: 'Düşük RAM kullanımı',
          gaming: 'Oyun için optimize edilmiş',
          privacy: 'Gizlilik odaklı',
          systemd_hate: 'Systemd kullanmıyor',
          beginner: 'Yeni başlayanlar için uygun',
          rolling: 'Sürekli güncel kalır',
          old_hardware: 'Eski donanımda harika çalışır'
        };
        
        if (reasonMap[question.id] && !matchReasons[distroId]?.includes(reasonMap[question.id])) {
          matchReasons[distroId]?.push(reasonMap[question.id]);
        }
      });
      
      question.impact.yes.penalty?.forEach(distroId => {
        scores[distroId] = (scores[distroId] || 0) - 8;
      });
    }
  });

  distrosData.distros.forEach(distro => {
    if (preferences.lowRam && distro.minRAM > 2) {
      scores[distro.id] -= 10;
    }
    
    if (preferences.nvidia && distro.nvidiaSupport === 'excellent') {
      scores[distro.id] += 5;
    } else if (preferences.nvidia && distro.nvidiaSupport === 'poor') {
      scores[distro.id] -= 10;
    }
    
    if (preferences.beginner && distro.difficulty === 'beginner') {
      scores[distro.id] += 5;
      if (!matchReasons[distro.id]?.includes('Kolay kurulum ve kullanım')) {
        matchReasons[distro.id]?.push('Kolay kurulum ve kullanım');
      }
    } else if (preferences.beginner && (distro.difficulty === 'advanced' || distro.difficulty === 'expert')) {
      scores[distro.id] -= 15;
    }
    
    if (!preferences.beginner && (distro.difficulty === 'advanced' || distro.difficulty === 'expert')) {
      scores[distro.id] += 3;
      if (!matchReasons[distro.id]?.includes('İleri düzey kullanıcılar için')) {
        matchReasons[distro.id]?.push('İleri düzey kullanıcılar için');
      }
    }
  });

  const sortedDistros = distrosData.distros
    .map(distro => ({
      id: distro.id,
      name: distro.name,
      score: scores[distro.id] || 0,
      colorPalette: distro.colorPalette,
      tagline: distro.tagline,
      downloadUrl: distro.downloadUrl,
      defaultDE: distro.defaultDE,
      pros: distro.pros,
      cons: distro.cons,
      matchReasons: (matchReasons[distro.id] || []).slice(0, 3)
    }))
    .sort((a, b) => b.score - a.score);

  return sortedDistros.slice(0, 3);
}

export function getTopDistros(preferences: UserPreferences): ScoredDistro[] {
  return calculateDistroScores(preferences);
}
