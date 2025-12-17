import ubuntuScreenshot from '@assets/generated_images/ubuntu_gnome_desktop_screenshot.png';
import archScreenshot from '@assets/generated_images/arch_linux_i3_terminal_screenshot.png';
import elementaryScreenshot from '@assets/generated_images/elementary_os_mac-like_screenshot.png';
import fedoraScreenshot from '@assets/generated_images/fedora_kde_plasma_screenshot.png';
import mintScreenshot from '@assets/generated_images/linux_mint_cinnamon_screenshot.png';
import popScreenshot from '@assets/generated_images/pop_os_developer_screenshot.png';

export interface DistroCard {
  id: string;
  distroName: string;
  screenshot: string;
  wittyTitle: string;
  desktopEnvironment: string;
  tags: string[];
  colorPalette: string[];
}

export const distroCards: DistroCard[] = [
  {
    id: '1',
    distroName: 'Ubuntu',
    screenshot: ubuntuScreenshot,
    wittyTitle: 'Sadece çalışsın yeter',
    desktopEnvironment: 'GNOME',
    tags: ['beginner-friendly', 'stable', 'popular'],
    colorPalette: ['#E95420', '#77216F', '#5E2750'],
  },
  {
    id: '2',
    distroName: 'Arch Linux',
    screenshot: archScreenshot,
    wittyTitle: 'Terminalden çıkmam',
    desktopEnvironment: 'i3wm',
    tags: ['advanced', 'minimal', 'customizable'],
    colorPalette: ['#1793D1', '#333333', '#0D47A1'],
  },
  {
    id: '3',
    distroName: 'elementary OS',
    screenshot: elementaryScreenshot,
    wittyTitle: 'Mac gibi olsun',
    desktopEnvironment: 'Pantheon',
    tags: ['beautiful', 'simple', 'curated'],
    colorPalette: ['#64BAFF', '#3689E6', '#0D52BF'],
  },
  {
    id: '4',
    distroName: 'Fedora',
    screenshot: fedoraScreenshot,
    wittyTitle: 'Her zaman güncel',
    desktopEnvironment: 'KDE Plasma',
    tags: ['cutting-edge', 'developer', 'reliable'],
    colorPalette: ['#51A2DA', '#294172', '#3C6EB4'],
  },
  {
    id: '5',
    distroName: 'Linux Mint',
    screenshot: mintScreenshot,
    wittyTitle: 'Windows gibi ama özgür',
    desktopEnvironment: 'Cinnamon',
    tags: ['familiar', 'stable', 'beginner-friendly'],
    colorPalette: ['#87CF3E', '#5FAD56', '#3E8E41'],
  },
  {
    id: '6',
    distroName: 'Pop!_OS',
    screenshot: popScreenshot,
    wittyTitle: 'Özelleştirme canavarı',
    desktopEnvironment: 'COSMIC',
    tags: ['gaming', 'developer', 'modern'],
    colorPalette: ['#FAA41A', '#48B9C7', '#574F4A'],
  },
];
