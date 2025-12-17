export interface RoastTemplate {
  id: string;
  condition: (context: RoastContext) => boolean;
  messages: string[];
}

export interface RoastContext {
  topDistro: string;
  nvidia: boolean;
  lowRam: boolean;
  gaming: boolean;
  privacy: boolean;
  systemdHate: boolean;
  beginner: boolean;
  rolling: boolean;
  oldHardware: boolean;
  likedDEs: string[];
}

const generalRoasts: RoastTemplate[] = [
  {
    id: "arch_nvidia",
    condition: (ctx) => ctx.topDistro === "arch" && ctx.nvidia,
    messages: [
      "NVIDIA kartınla Arch seçerek hayatınla kumar oynadın, tebrikler. Her kernel güncellemesinde dua etmeyi unutma.",
      "Arch + NVIDIA combo'su seçtin. Ya çok cesursun ya da masokistsin. Her iki durumda da saygı duyuyorum.",
      "NVIDIA ile Arch? Sana 'nvidia-dkms kurulumu başarısız' mesajını ezberlemeyi tavsiye ederim."
    ]
  },
  {
    id: "arch_beginner",
    condition: (ctx) => ctx.topDistro === "arch" && ctx.beginner,
    messages: [
      "Yeni başlayan biri olarak Arch seçtin. Wiki'yi yastık altında tutmayı unutma.",
      "Linux'a yeni başlıyorsun ve Arch istiyorsun. Cesaretine hayranım, ama Ubuntu öneririm desem kızar mısın?",
      "Arch seçen bir newbie... Ya süper hızlı öğreneceksin ya da Windows'a geri döneceksin. Ortası yok."
    ]
  },
  {
    id: "gentoo_anything",
    condition: (ctx) => ctx.topDistro === "gentoo",
    messages: [
      "Gentoo seçtin. Umarım derleyici optimizasyonları kadar boş zamanın da vardır.",
      "Her şeyi derlemek istiyorsun. Elektrik faturasına hazır ol.",
      "Gentoo kullanıcısı olacaksın. Artık her sohbette 'ben derledim' diye başlayacaksın.",
      "emerge --sync yazdığında akşam yemeğini ısıtmayı unutma, çünkü bu biraz sürecek."
    ]
  },
  {
    id: "nixos_any",
    condition: (ctx) => ctx.topDistro === "nixos",
    messages: [
      "NixOS seçtin. Artık her şeyi configuration.nix'te tanımlayacaksın. Her. Şeyi.",
      "Nix öğrenme eğrisi dik, ama en azından sistemin her zaman reproducible olacak. Değer mi? Göreceğiz.",
      "Declarative configuration istiyorsun. Kodla sistem yönetmeye hoş geldin.",
      "NixOS: 'Ama benim makinemde çalışıyordu' cümlesini tarih kitaplarına göndermek için var."
    ]
  },
  {
    id: "qubes_privacy",
    condition: (ctx) => ctx.topDistro === "qubes" && ctx.privacy,
    messages: [
      "Qubes OS seçtin. Ya bir gazeteci, ya bir aktivist, ya da çok paranoyaksın. Her durumda 32GB RAM al.",
      "Her uygulama ayrı VM'de çalışacak. NSA'den bile gizlenebilirsin ama Chrome'u açamayabilirsin.",
      "Qubes kullanıcısı olacaksın. Artık arkadaşlarına 'compartmentalization' kelimesini açıklamak zorundasın."
    ]
  },
  {
    id: "tails_privacy",
    condition: (ctx) => ctx.topDistro === "tails",
    messages: [
      "Tails seçtin. Tor üzerinden her şey. Yavaş ama güvenli. Sabır bir erdem.",
      "Hiç iz bırakmamak istiyorsun. Tails bunu sağlar ama Netflix izlemek istersen başka plan yap.",
      "Tails kullanıcısı: USB'den boot, Tor ile gez, bilgisayarı kapat, iz yok. Ajan gibisin."
    ]
  },
  {
    id: "mint_windows",
    condition: (ctx) => ctx.topDistro === "mint" && ctx.beginner,
    messages: [
      "Mint seçtin. Windows'tan kaçıp evini özleyenler için mükemmel tercih.",
      "Linux Mint: 'Windows'tan geçiş yapmak istiyorum ama çok da değişmesin' diyen herkesin tercihi.",
      "Akıllı seçim! Mint seni hayal kırıklığına uğratmaz. Sıkıcı ama güvenilir, tıpkı bir Volvo gibi."
    ]
  },
  {
    id: "popos_nvidia_gaming",
    condition: (ctx) => ctx.topDistro === "popos" && ctx.nvidia && ctx.gaming,
    messages: [
      "Pop!_OS + NVIDIA + Gaming. Mükemmel üçlü. System76 seni düşünmüş.",
      "NVIDIA kartınla oyun oynayacaksın ve Pop!_OS seçtin. Zeki çocuksun.",
      "Pop!_OS seni NVIDIA sorunlarından kurtaracak. Artık 'sürücü sorunu' yerine sadece oyna."
    ]
  },
  {
    id: "nobara_gaming",
    condition: (ctx) => ctx.topDistro === "nobara" && ctx.gaming,
    messages: [
      "Nobara seçtin. GloriousEggroll'un eseri. Proton-GE ile birlikte gelir, oyun optimizasyonları hazır.",
      "Linux gaming denince Nobara akla gelmeli. İyi seçim, artık git biraz oyun oyna.",
      "Nobara: 'Fedora güzel ama gaming için optimize değil' diyenler için yapıldı."
    ]
  },
  {
      id: "bazzite_gaming",
    condition: (ctx) => ctx.topDistro === "bazzite" && ctx.gaming,
    messages: [
      "Bazzite seçtin. Steam Deck vibes ama masaüstünde. Immutable OS korkutmasın, rollback senin dostun.",
      "SteamOS ama PC için. Bazzite ile konsol deneyimi masaüstüne geldi.",
      "Gaming Mode, immutable sistem, otomatik güncellemeler. Bazzite ile oyun makinesi kur ve unut."
    ]
  },
  {
    id: "garuda_eyecandy",
    condition: (ctx) => ctx.topDistro === "garuda",
    messages: [
      "Garuda seçtin. Göz zevkin yerinde, Dr460nized tema ile havali görüneceksin.",
      "Arch tabanlı, oyuna hazır, gösterişli. Garuda ile masaüstün Instagram'a atılabilir.",
      "Garuda'nın teması o kadar güzel ki bazen sadece masaüstüne bakarsın."
    ]
  },
  {
    id: "elementary_mac",
    condition: (ctx) => ctx.topDistro === "elementary",
    messages: [
      "elementary OS seçtin. Mac alacak paran yoktu galiba. Şaka şaka, Pantheon gerçekten güzel.",
      "macOS esintisi istiyorsun ama Apple'a para vermek istemiyorsun. Anladım seni.",
      "elementary: 'Apple estetiği istiyorum ama özgürlük de istiyorum' diyenler için."
    ]
  },
  {
    id: "zorin_windows",
    condition: (ctx) => ctx.topDistro === "zorin",
    messages: [
      "Zorin seçtin. Windows'tan geçiş yapacaklar için biçilmiş kaftan.",
      "Windows 11 gibi görünsün ama Linux olsun. Zorin tam bunu yapıyor.",
      "Zorin ile ailenin bile fark etmeyebilir Linux'a geçtiğini."
    ]
  },
  {
    id: "deepin_beauty",
    condition: (ctx) => ctx.topDistro === "deepin",
    messages: [
      "deepin seçtin. En güzel masaüstü ortamı ama Çin yapımı. Paranoya seviyen düşük demek.",
      "DDE gerçekten güzel. Mahremiyet endişen yoksa keyfini çıkar.",
      "deepin: Görsel şölen isteyenler için. Sadece... telemetri ayarlarını kontrol et."
    ]
  },
  {
    id: "manjaro_beginner_arch",
    condition: (ctx) => ctx.topDistro === "manjaro" && ctx.beginner,
    messages: [
      "Manjaro seçtin. Arch'ın tadını almak istiyorsun ama kurulumla uğraşmak istemiyorsun. Akıllıca.",
      "'I use Arch btw' demek istiyorsun ama gerçek Arch kurmak istemiyorsun. Manjaro işte bu yüzden var.",
      "Manjaro: Arch deneyimi, Ubuntu kolaylığı. Win-win."
    ]
  },
  {
    id: "ubuntu_mainstream",
    condition: (ctx) => ctx.topDistro === "ubuntu",
    messages: [
      "Ubuntu seçtin. Klasik, güvenilir, sıkıcı. Tıpkı Toyota Corolla gibi.",
      "Herkesin ilk Linux'u genelde Ubuntu olur. Nostaljik.",
      "Ubuntu: 'Just works' felsefesi. Snap konusunda fikrin neyse artık..."
    ]
  },
  {
    id: "fedora_dev",
    condition: (ctx) => ctx.topDistro === "fedora",
    messages: [
      "Fedora seçtin. Red Hat'in test alanına hoş geldin. En azından GNOME'un son hali senin.",
      "Developer'lar Fedora sever. SELinux seni korur, DNF seni yavaşlatır.",
      "Fedora: Bleeding edge ama stabil. Paradoks gibi ama çalışıyor."
    ]
  },
  {
    id: "debian_server",
    condition: (ctx) => ctx.topDistro === "debian",
    messages: [
      "Debian seçtin. Paketler 2 yıl eski ama 'rock solid'. Sunucu gibi düşün, masaüstü gibi kullan.",
      "Stable branch seçersen yazılımlar vintage olur. Testing seçersen... adı üstünde.",
      "Debian: Her şeyin başladığı yer. Saygıyla."
    ]
  },
  {
    id: "cachyos_performance",
    condition: (ctx) => ctx.topDistro === "cachyos",
    messages: [
      "CachyOS seçtin. Performans takıntılı Arch kullanıcısı için birebir.",
      "Optimize edilmiş kernel, scheduler tweaks... CachyOS ile her milisaniye önemli.",
      "CachyOS: 'Arch iyi ama daha hızlı olabilir' diyenler için."
    ]
  },
  {
    id: "void_independent",
    condition: (ctx) => ctx.topDistro === "void",
    messages: [
      "Void Linux seçtin. runit, xbps, bağımsızlık. Kendi yolunu çizen biriymiş gibi duruyorsun.",
      "Ne Arch, ne Debian. Void tamamen bağımsız. Hipster Linux kullanıcısı vibes.",
      "Void: Minimalizm ve bağımsızlık isteyenler için. xbps-install hızlı ve temiz."
    ]
  },
  {
    id: "artix_systemd_hate",
    condition: (ctx) => ctx.topDistro === "artix" && ctx.systemdHate,
    messages: [
      "Artix seçtin. 'Systemd'den nefret ediyorum ama Arch istiyorum' diyenlerin mabedi.",
      "OpenRC, runit, s6... Init sistemi seçimi senin. Özgürlük bu işte.",
      "Systemd olmadan Arch. Lennart Poettering bu mesajı beğenmedi."
    ]
  },
  {
    id: "devuan_systemd_hate",
    condition: (ctx) => ctx.topDistro === "devuan" && ctx.systemdHate,
    messages: [
      "Devuan seçtin. Debian sevsem ama systemd istemesem... İşte Devuan.",
      "Debian ama systemd olmadan. Init freedom forever!",
      "Devuan: 'Veteran Init Wars' gazileri için."
    ]
  },
  {
    id: "kali_hacker",
    condition: (ctx) => ctx.topDistro === "kali",
    messages: [
      "Kali seçtin. 600+ hacking tool'u ile artık hackersin. Ya da öyle olduğunu sanıyorsun.",
      "Kali günlük kullanım için değil ama sen bilirsin. Root olarak takılmayı seviyorsan...",
      "Kali: 'Mr. Robot izledim, hacker olacam' starter pack."
    ]
  },
  {
    id: "parrot_security",
    condition: (ctx) => ctx.topDistro === "parrot",
    messages: [
      "Parrot seçtin. Kali'nin günlük kullanılabilir versiyonu. Akıllı tercih.",
      "Güvenlik araçları + günlük kullanım. Parrot ikisini birleştiriyor.",
      "Parrot: 'Kali istiyorum ama normal de kullanayım' diyenler için."
    ]
  },
  {
    id: "antix_old_hw",
    condition: (ctx) => ctx.topDistro === "antix" && ctx.oldHardware,
    messages: [
      "antiX seçtin. 256MB RAM ile çalışır. Eski laptopu kurtardın.",
      "Dede bilgisayar mı kurtarılacak? antiX işte tam bu iş için var.",
      "antiX: 'Bu bilgisayar çöp' demeden önce bir şans ver."
    ]
  },
  {
    id: "puppy_portable",
    condition: (ctx) => ctx.topDistro === "puppy",
    messages: [
      "Puppy Linux seçtin. USB'den boot, RAM'de çalış, iz bırakma. Minimalizmin zirvesi.",
      "300MB RAM yeterli. Puppy ile antika bilgisayarlar bile uçar.",
      "Puppy: Taşınabilir Linux isteyenler için cep dostu."
    ]
  },
  {
    id: "alpine_minimal",
    condition: (ctx) => ctx.topDistro === "alpine",
    messages: [
      "Alpine seçtin. Docker image'ların bunun üstüne kurulu zaten. Masaüstü de olurmuş.",
      "musl libc, minimal, güvenli. Container'ların kralı masaüstüne geldi.",
      "Alpine: 'Her şey çok şişkin' diyenler için diyet Linux."
    ]
  },
  {
    id: "opensuse_enterprise",
    condition: (ctx) => ctx.topDistro === "opensuse",
    messages: [
      "openSUSE seçtin. YaST ile her şeyi GUI'den yönet. Enterprise kalitesi, bedava.",
      "Tumbleweed rolling ama stabil. Btrfs snapshot'ları hayat kurtarır.",
      "openSUSE: Almanya mühendisliği, Linux tarzı."
    ]
  },
  {
    id: "endeavouros_arch_light",
    condition: (ctx) => ctx.topDistro === "endeavouros",
    messages: [
      "EndeavourOS seçtin. Terminal-centric Arch experience. GUI installer var ama ruh hala minimal.",
      "Arch'ın ruhu, kolay kurulum. EndeavourOS ile 'I use Arch btw' hakkını kazandın.",
      "EndeavourOS: Arch puristlerin 'bu da Arch sayılır' dediği dağıtım."
    ]
  },
  {
    id: "kdeneon_kde",
    condition: (ctx) => ctx.topDistro === "kdeneon" && ctx.likedDEs.includes("kde"),
    messages: [
      "KDE neon seçtin. En taze Plasma her zaman seninle. KDE fanboy detected.",
      "KDE'nin kendi dağıtımı. Her yeni Plasma özelliği ilk sana gelir.",
      "KDE neon: 'Plasma'nın son versiyonunu HEMEN istiyorum' diyenler için."
    ]
  },
  {
    id: "lubuntu_light",
    condition: (ctx) => ctx.topDistro === "lubuntu" && ctx.lowRam,
    messages: [
      "Lubuntu seçtin. LXQt ile hafiflik, Ubuntu ile güvenlik. İyi denge.",
      "1GB RAM yeterli. Lubuntu eski makineleri kurtarır.",
      "Lubuntu: Ubuntu'nun en hafif lezzeti."
    ]
  },
  {
    id: "xubuntu_balanced",
    condition: (ctx) => ctx.topDistro === "xubuntu",
    messages: [
      "Xubuntu seçtin. Xfce + Ubuntu = Dengeli, güvenilir, biraz nostaljik.",
      "Ne çok hafif ne çok ağır. Xubuntu tam ortada, goldilocks zone.",
      "Xubuntu: 'Xfce seviyorum ama Arch kurmak istemiyorum' diyenler için."
    ]
  },
  {
    id: "kubuntu_kde_ubuntu",
    condition: (ctx) => ctx.topDistro === "kubuntu",
    messages: [
      "Kubuntu seçtin. Ubuntu + KDE. İkisinin de fanı mısın yoksa?",
      "KDE istiyorsun ama Arch korkutuyor. Kubuntu mantıklı tercih.",
      "Kubuntu: Ubuntu'nun en şık giysili versiyonu."
    ]
  },
  {
    id: "mxlinux_stable",
    condition: (ctx) => ctx.topDistro === "mxlinux",
    messages: [
      "MX Linux seçtin. DistroWatch'ın gözdesi. Stabilite, hafiflik, kullanışlılık.",
      "Xfce tabanlı, Debian güvenilirliği, harika araçlar. MX seni mutlu eder.",
      "MX Linux: 'Neden bu kadar popüler?' diye sorarsan, kullandığında anlarsın."
    ]
  }
];

const genericRoasts = [
  "Linux dünyasına hoş geldin! Artık Windows güncellemelerinden kurtuldun... ama başka sorunlarla tanışacaksın.",
  "Seçimini yaptın. Şimdi git, forumlarda 'bunu nasıl yaparım' diye sor. Herkes yardım eder... genelde.",
  "Tebrikler! Artık 'bende çalışıyor' deme hakkını kazandın.",
  "İyi seçim! Ama unutma, Linux'ta her şey 'sadece küçük bir config değişikliği' ile çözülür. Bazen.",
  "Distro seçtin, güzel. Şimdi DE seçimi, WM tartışmaları, terminal vs GUI kavgaları... Maceraya hazır mısın?"
];

const deRoasts: Record<string, string[]> = {
  kde: [
    "KDE sevdin. Widget'lar, temalar, özelleştirme... Artık masaüstünü süslemekle geçecek saatler.",
    "KDE Plasma seçimi = Ayarlar menüsünde kaybolmaya hazırsın."
  ],
  gnome: [
    "GNOME beğendin. Minimal, temiz, extensions'sız yarım. Ama extension store'da saatler geçireceksin.",
    "GNOME seçtin. Ya workflow'u çok sevdin ya da sadece dock istiyordun."
  ],
  xfce: [
    "Xfce sevdin. Hafif, geleneksel, güvenilir. Tıpkı eski bir dost gibi.",
    "Xfce: 'Kaynak kullanımı 200MB geçmesin' diyenler için."
  ],
  cinnamon: [
    "Cinnamon beğendin. Windows 7 nostaljisi hissediliyor.",
    "Cinnamon: 'Değişim istemiyorum ama Linux istiyorum' diyenler için."
  ],
  i3: [
    "i3/Tiling WM sevdin. Artık fareyi kullanmak ayıp sayılır.",
    "Tiling WM seçtin. Konfigürasyon dosyaları yeni evin olacak."
  ],
  hyprland: [
    "Hyprland beğendin. Wayland + Tiling + Animasyonlar = Rice heaven.",
    "Hyprland: r/unixporn'da paylaşım yapmaya hazırsın."
  ],
  pantheon: [
    "Pantheon sevdin. macOS vibes ama özgür. elementary seni bekliyor.",
    "Pantheon: Apple esintisi, Linux özgürlüğü."
  ],
  dde: [
    "Deepin DE beğendin. En güzel masaüstü ortamı, tartışmasız.",
    "DDE sevdiysen görsellik önemli senin için. Anladım."
  ]
};

export function generateRoast(context: RoastContext): string {
  const matchingRoasts = generalRoasts.filter(r => r.condition(context));
  
  let roastParts: string[] = [];
  
  if (matchingRoasts.length > 0) {
    const primaryRoast = matchingRoasts[0];
    const randomMessage = primaryRoast.messages[Math.floor(Math.random() * primaryRoast.messages.length)];
    roastParts.push(randomMessage);
  }
  
  if (context.likedDEs.length > 0) {
    const topDE = context.likedDEs[0];
    const deKey = topDE.toLowerCase().replace(/\s+/g, '').replace('plasma', '').replace('sway', 'i3');
    if (deRoasts[deKey]) {
      const deRoast = deRoasts[deKey][Math.floor(Math.random() * deRoasts[deKey].length)];
      roastParts.push(deRoast);
    }
  }
  
  if (roastParts.length === 0) {
    roastParts.push(genericRoasts[Math.floor(Math.random() * genericRoasts.length)]);
  }
  
  if (context.nvidia && context.gaming && !roastParts.some(r => r.includes('NVIDIA'))) {
    roastParts.push("NVIDIA + Gaming combo'sun var. Linux'ta oyun artık gerçek, tadını çıkar!");
  }
  
  if (context.oldHardware && context.lowRam) {
    roastParts.push("Eski donanımla Linux kullanmak çevreci bir hareket. Dünyayı kurtarıyorsun!");
  }
  
  if (context.systemdHate) {
    roastParts.push("Systemd düşmanı bir seçim yaptın. Init savaşlarının gazisi olarak selamlıyorum.");
  }
  
  return roastParts.join(" ");
}

export function generateQuickRoast(distroId: string, isNvidia: boolean, isGaming: boolean): string {
  const quickRoasts: Record<string, string> = {
    arch: isNvidia ? "NVIDIA ile Arch? Cesursun." : "Arch seçtin. Wiki'ye abone ol.",
    gentoo: "Her şeyi derleyeceksin. Bol sabır.",
    nixos: "Declarative dünya seni bekliyor.",
    qubes: "VM içinde VM. Paranoya seviyesi: Maximum.",
    tails: "İz bırakmadan gez. Ajan modunda.",
    mint: "Windows'tan kaçış güzel olacak.",
    ubuntu: "Klasik ama güzel.",
    fedora: "Bleeding edge, stabil ambalajda.",
    popos: isNvidia && isGaming ? "NVIDIA + Gaming = Pop!_OS. Perfect match." : "System76 seni seviyor.",
    manjaro: "Arch lite. Akıllı seçim.",
    garuda: "Göz zevkin yerinde.",
    elementary: "macOS vibes, Linux kalbi.",
    zorin: "Windows'tan geçiş modu: aktif.",
    deepin: "En güzel DE seninle.",
    nobara: isGaming ? "GloriousEggroll approved!" : "Fedora ama gaming-ready.",
    bazzite: isGaming ? "SteamOS, PC edition." : "Immutable gaming goodness.",
    cachyos: "Performans odaklı Arch.",
    void: "Bağımsız ruhlu.",
    artix: "Arch without the d-word.",
    devuan: "Debian, özgür init ile.",
    alpine: "Minimal perfection.",
    kali: "Hacker mode: engaged.",
    parrot: "Güvenlik + günlük kullanım.",
    antix: "Eski PC'lerin kurtarıcısı.",
    puppy: "USB'den uçar.",
    opensuse: "Enterprise quality, zero cost.",
    endeavouros: "Arch, easy mode.",
    kdeneon: "Fresh Plasma daily.",
    debian: "Rock. Solid.",
    mxlinux: "Dengeli ve güvenilir.",
    kubuntu: "KDE + Ubuntu love.",
    lubuntu: "Hafif ve hızlı.",
    xubuntu: "Dengeli Xfce."
  };
  
  return quickRoasts[distroId] || "İyi seçim!";
}
