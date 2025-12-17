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
      "Arch ve NVIDIA mı? Siyah ekrana bakarak felsefe yapmak için harika bir kombinasyon. Kernel güncellenirken dua etmeyi unutma.",
      "Wayland kullanmaya çalışma, sadece ağlarsın. NVIDIA ve Arch ikilisi senin için bir seçim değil, bir sabır testi.",
      "Tebrikler! 'nvidia-dkms kurulumu başarısız' hatasını ezberleyerek hayatının en verimsiz saatlerini geçirmeye hazır ol.",
    ],
  },
  {
    id: "arch_beginner",
    condition: (ctx) => ctx.topDistro === "arch" && ctx.beginner,
    messages: [
      "Wiki'yi okumadan kurmaya çalışıp forumlarda banlanınca 'Linux çok zormuş' diye ağlama. İzliyoruz...",
      "Daha 'ls' nedir bilmeden Arch seçmek... Cesaretle cehalet arasındaki o ince çizgide dans ediyorsun.",
      "Arch install script'i kullandın değil mi? Seni gidi sahte elitist. 'I use Arch btw' deme hakkını henüz kazanmadın.",
    ],
  },
  {
    id: "gentoo_anything",
    condition: (ctx) => ctx.topDistro === "gentoo",
    messages: [
      "Firefox derlenirken yeni bir programlama dili öğrenebilirsin. O compile bitince ne yapacaksın? Hiç, sadece boş boş ekrana bakacaksın.",
      "Dünyadaki karbon ayak izinin %10'u senin anlamsız 'LTO' ve 'Graphite' optimizasyon sevdan yüzünden. Elektrik faturası için kredi çek.",
      "Gentoo kullanıcısı: Bilgisayarı bir şeyler yapmak için değil, bir şeyler derlemek için kullanan kişi. İşlemcinin çığlıklarını duyabiliyorum.",
    ],
  },
  {
    id: "nixos_any",
    condition: (ctx) => ctx.topDistro === "nixos",
    messages: [
      "Bir paket kurmak için 300 satır konfigürasyon yazan o 'farklı' kişi sensin demek. Sosyal hayatın bitti, geçmiş olsun.",
      "NixOS tarikatına hoş geldin. 'Reproducible builds' diye sayıklarken arkadaş çevrenin yavaş yavaş uzaklaşmasını izle.",
      "Sistemin bozulmuyor olabilir ama senin beynin her `.nix` dosyasını düzenlediğinde biraz daha eriyor.",
    ],
  },
  {
    id: "qubes_privacy",
    condition: (ctx) => ctx.topDistro === "qubes" && ctx.privacy,
    messages: [
      "NSA bile senin peşinde değil ama sen 32GB RAM'i sanal makineler arasında paylaştırırken acı çekiyorsun. Kimsin sen, Edward Snowden mı?",
      "Her uygulamayı ayrı bir VM'de açmak... Bir PDF okumak için 5 dakika beklemek tam bir 'güvenlik' dehası işi.",
      "Paranoyan o kadar yüksek ki, muhtemelen bu mesajı okurken bile mikrofonunu fiziksel olarak sökmüşsündür.",
    ],
  },
  {
    id: "tails_privacy",
    condition: (ctx) => ctx.topDistro === "tails",
    messages: [
      "Tor üzerinden 144p video izlemeye çalışırken sabrının sınırlarını test edeceksin. USB'yi çekince sistem siliniyor ama utancın kalıyor.",
      "İz bırakmamak güzel de, her açılışta her şeyi baştan kurmak tam bir dijital mazoşizm örneği.",
      "Ajanlık oynamayı bırak da o USB'yi yavaşça yere bırak. Alt tarafı Reddit'te takılacaksın.",
    ],
  },
  {
    id: "mint_windows",
    condition: (ctx) => ctx.topDistro === "mint" && ctx.beginner,
    messages: [
      "Emekli memur distrosuna hoş geldin. Windows 7'yi özlediysen neden direkt onu kurmadın?",
      "Linux Mint: 'Değişimden korkuyorum ama kendimi hacker gibi hissetmek istiyorum' diyenlerin limanı.",
      "Sıkıcılık bir sanat olsaydı, Mint başyapıt olurdu. Ama en azından çalışıyor, değil mi?",
    ],
  },
  {
    id: "popos_nvidia_gaming",
    condition: (ctx) => ctx.topDistro === "popos" && ctx.nvidia && ctx.gaming,
    messages: [
      "System76'nın elinden tutmasına ihtiyaç duyan bir oyuncu daha. Kendi sürücünü kuramıyor musun?",
      "Pop!_OS ile 'Ben Linux kullanıyorum' diyorsun ama aslında 'Ben Ubuntu'nun daha iyi renkli halini kullanıyorum' demek istiyorsun.",
      "Auto-tiling özelliğini açıp 5 dakika sonra kapatacağını hepimiz biliyoruz.",
    ],
  },
  {
    id: "nobara_gaming",
    condition: (ctx) => ctx.topDistro === "nobara" && ctx.gaming,
    messages: [
      "GloriousEggroll'un tüm repolarını bilgisayarına indirmişsin. Fedora'yı bozmadan oyun oynamayı beceremeyenler kulübüne hoş geldin.",
      "Oyunlarda 3 FPS fazla alacaksın diye her şeyi yamalanmış bir sistem kullanmak... Büyük risk.",
      "Nobara: 'Fedora çok profesyonel geldi, biraz oyun hamuru ekleyelim' diyenlerin tercihi.",
    ],
  },
  {
    id: "bazzite_gaming",
    condition: (ctx) => ctx.topDistro === "bazzite" && ctx.gaming,
    messages: [
      "Bilgisayarını oyun konsoluna çevirdin, tebrikler. Artık tarayıcıyı açarken bile 'bu immutable sistemde nasıl çalışıyor' diye düşünebilirsin.",
      "SteamOS çakması... Şaka şaka, ama Steam Deck'in yoksa neden bu kadar kısıtlı bir hayat yaşıyorsun?",
      "Rollback özelliği en büyük dostun olacak, çünkü o güncellemeler elbet bir gün bir şeyi patlatacak.",
    ],
  },
  {
    id: "garuda_eyecandy",
    condition: (ctx) => ctx.topDistro === "garuda",
    messages: [
      "Gözlerin o neon renklerden kanamıyor mu? Bilgisayarın her an bir pavyona dönüşebilir gibi duruyor.",
      "O kadar çok görsel efekt var ki, işlemcin sadece masaüstünü çizmek için %20 yükte çalışıyor.",
      "r/unixporn'da 'Look at my rice' diye paylaşım yapıp kimseden upvote alamayan o çocuk sensin işte.",
    ],
  },
  {
    id: "elementary_mac",
    condition: (ctx) => ctx.topDistro === "elementary",
    messages: [
      "Mac almaya paran yetmedi mi? Pantheon masaüstüyle Apple fanboyluğunu gizleyemezsin.",
      "AppCenter'da uygulama kalmadığında Ubuntu repolarına muhtaç kalışın çok dokunaklı.",
      "Elementary: 'Özgürlük istiyorum ama sadece Apple'ın izin verdiği kadar' diyenler için.",
    ],
  },
  {
    id: "zorin_windows",
    condition: (ctx) => ctx.topDistro === "zorin",
    messages: [
      "Windows 11 teması kurunca Linux daha mı hızlı hissettiriyor? Kendini kandırma.",
      "Zorin OS: 'Babam Linux'a geçtiğimi anlamasın' distrosu.",
      "Pro versiyonuna para verdiysen söyle de hep beraber gülelim.",
    ],
  },
  {
    id: "deepin_beauty",
    condition: (ctx) => ctx.topDistro === "deepin",
    messages: [
      "Görsellik şahane ama verilerin Pekin üzerinden geçerken biraz yavaşlayabilir. Telemetri ayarlarına baktın mı?",
      "Dünyanın en güzel masaüstü ortamı... Ve muhtemelen dünyanın en çok 'bu ne ara yüklendi' dedirten sistemi.",
      "Privacy (Gizlilik) senin için sadece bir kelime sanırım.",
    ],
  },
  {
    id: "manjaro_beginner_arch",
    condition: (ctx) => ctx.topDistro === "manjaro" && ctx.beginner,
    messages: [
      "Arch'ın tüm zorluklarını alıp, üstüne bir de paketleri geç vererek sistemi bozma yeteneğine sahip tek distro. Başarılar.",
      "SSL sertifikasını yenilemeyi unutan bir distroyu sistemin temeli yapmak... Büyük vizyon.",
      "Manjaro: 'Arch kullanıyorum' demenin en sahte ve en sorunlu yolu.",
    ],
  },
  {
    id: "ubuntu_mainstream",
    condition: (ctx) => ctx.topDistro === "ubuntu",
    messages: [
      "Canonical'ın reklam panosu olmaya gönüllü olmuşsun. Snap paketlerinin açılmasını beklerken bir kahve iç, hatta bir yemek ye.",
      "Linux dünyasının Starbucks'ı. Güvenli, sıkıcı ve her yer Snap hatası dolu.",
      "Debian'ın makyajlanmış ve hantallaştırılmış hali. Neden kendine bunu yapıyorsun?",
    ],
  },
  {
    id: "fedora_dev",
    condition: (ctx) => ctx.topDistro === "fedora",
    messages: [
      "Red Hat'in ücretsiz beta testçisi olduğun için teşekkürler. IBM seninle gurur duyuyor (ama para vermeyecek).",
      "DNF paket yöneticisi o kadar yavaş ki, paket inerken yeni bir programlama dili öğrenebilirsin.",
      "Bleeding edge değil, 'her an bir şeyler kopabilir ama GNOME sürümüm güncel' distrosu.",
    ],
  },
  {
    id: "debian_server",
    condition: (ctx) => ctx.topDistro === "debian",
    messages: [
      "Paketler o kadar eski ki, kernel içinde dinozor fosili bulabilirsin. Ama stabil değil mi? Taş gibi (ve tarih öncesi gibi).",
      "Müzede mi yaşıyorsun yoksa sadece 2021 model yazılımları mı seviyorsun?",
      "Debian Stable: 'Çalışıyorsa dokunma' felsefesinin vücut bulmuş ve yaşlanmış hali. Sıkıcılığın zirvesi.",
    ],
  },
  {
    id: "cachyos_performance",
    condition: (ctx) => ctx.topDistro === "cachyos",
    messages: [
      "V3/V4 optimizasyonları sayesinde tarayıcın 0.0001 saniye daha hızlı açılacak. Tüm o kurulum eziyetine değdi mi?",
      "İşlemcinin her döngüsünü (cycle) hesaplıyorsun ama vaktini bu distroyu kurarak harcadın. Büyük çelişki.",
      "CachyOS: 'Arch yetmedi, ben daha çok kernel parametresi karıştırmak istiyorum' diyenlerin mekanı.",
    ],
  },
  {
    id: "void_independent",
    condition: (ctx) => ctx.topDistro === "void",
    messages: [
      "Runit o kadar hızlı ki ne olduğunu anlamadan masaüstündesin. Ama sonra 'ben neden bunu kullanıyorum' diye düşünmeye çok vaktin kalıyor.",
      "Glibc mi Musl mı? Bu soruyu sorarken bile ne kadar yalnız olduğunu fark ediyor musun?",
      "Ne Arch kadar popüler, ne Debian kadar stabil. Tam bir 'ben farklıyım' distrosu.",
    ],
  },
  {
    id: "artix_systemd_hate",
    condition: (ctx) => ctx.topDistro === "artix" && ctx.systemdHate,
    messages: [
      "Lennart Poettering rüyalarına giriyor değil mi? Systemd'den kaçarken hayattan da kaçmışsın.",
      "Init sistemin OpenRC olabilir ama hayatındaki 'init' hala çok yavaş çalışıyor.",
      "Sırf systemd yok diye Arch repolarının yarısını kullanamamak... Gerçek bir özgürlük savaşçısı!",
    ],
  },
  {
    id: "devuan_systemd_hate",
    condition: (ctx) => ctx.topDistro === "devuan" && ctx.systemdHate,
    messages: [
      "Debian'ı fork'layacak kadar ne yaşattı bu systemd sana? Init savaşları 2014'te bitti, sen hala siperdesin.",
      "Devuan: 'Eskiden her şey daha güzeldi' diyen Linux dedelerinin buluşma noktası.",
      "Sistemin systemd içermiyor olabilir ama muhtemelen güncel hiçbir şeyi de içermiyor.",
    ],
  },
  {
    id: "kali_hacker",
    condition: (ctx) => ctx.topDistro === "kali",
    messages: [
      "Instagram şifresi kırmayı öğrenince haber ver, o zamana kadar o 'hacker' logolu wallpaper'ını sessizce değiştir.",
      "Kali'yi ana işletim sistemi olarak mı kurdun? Diskine yazık, egona daha da yazık. Root olarak gezerken sistemi patlatma da...",
      "Terminali yeşil yapınca Mr. Robot olmuyorsun, sadece komik görünüyorsun.",
    ],
  },
  {
    id: "parrot_security",
    condition: (ctx) => ctx.topDistro === "parrot",
    messages: [
      "Kali'den daha 'akıllıyım' diyorsun ama hala pentest araçlarını sadece 'neofetch'te havalı dursun diye tutuyorsun.",
      "Sandbox özelliği güzel de, sen zaten tehlikeli bir şey yapmıyorsun ki?",
      "Parrot: 'Hacker olayım ama sistemim de güzel görünsün' diyenlerin orta yol sevdası.",
    ],
  },
  {
    id: "antix_old_hw",
    condition: (ctx) => ctx.topDistro === "antix" && ctx.oldHardware,
    messages: [
      "O bilgisayarı çöpe atmanın vakti gelmişti ama sen antiX ile ona işkence etmeye devam ediyorsun. Bırak huzur içinde uyusun.",
      "256MB RAM ile Firefox açmaya çalışmak... Senin sabrın peygamberlerde yok.",
      "Sistemin o kadar hafif ki, bir üflesek silinecek gibi duruyor.",
    ],
  },
  {
    id: "puppy_portable",
    condition: (ctx) => ctx.topDistro === "puppy",
    messages: [
      "RAM'de çalışan bir işletim sistemi... Bilgisayarı kapatınca her şeyin gitmesi tam bir 'disposable' hayat tarzı.",
      "Masaüstü ikonların 2003 yılından kalma gibi duruyor. Retro sevdanın da bir sınırı olmalı.",
      "Puppy Linux: 'Bilgisayarım o kadar kötü ki sadece bu çalışıyor' demenin kibarcası.",
    ],
  },
  {
    id: "alpine_minimal",
    condition: (ctx) => ctx.topDistro === "alpine",
    messages: [
      "Docker container'ından çıkıp masaüstüne gelmişsin. Musl libc yüzünden hiçbir şeyin çalışmadığında görüşürüz.",
      "Minimalizm değil bu, bu bildiğin çıplaklık. Paket yöneticisi (apk) bile sana gülüyor olabilir.",
      "Alpine: 'Ben o kadar hardcore kullanıcıyım ki man sayfalarını bile yüklemiyorum' havası.",
    ],
  },
  {
    id: "opensuse_enterprise",
    condition: (ctx) => ctx.topDistro === "opensuse",
    messages: [
      "YaST denilen o hantal kontrol paneline mahkum olmuşsun. Alman mühendisliği mi dedin? Bence sadece karmaşa.",
      "Tumbleweed kullanıp 'ben de rolling release kullanıyorum' diyorsun ama aslında bir bukalemun tarafından yönetiliyorsun.",
      "Btrfs snapshot'ları sayesinde sistemini kurtarabilirsin ama o yeşil renkli kabustan kaçamazsın.",
    ],
  },
  {
    id: "endeavouros_arch_light",
    condition: (ctx) => ctx.topDistro === "endeavouros",
    messages: [
      "Arch kurmaya üşendiğin için bu mor renkli Ubuntu çakmasına sığınmışsın. Terminal odaklıymış... Tabi yersen.",
      "EndeavourOS: 'Ben Arch kullanıyorum' yalanını söyleyebilmek için GUI installer kullananların sığınağı.",
      "Gerçek bir Arch kullanıcısı sana her zaman 'sahte' muamelesi yapacak, buna alışsan iyi olur.",
    ],
  },
  {
    id: "kdeneon_kde",
    condition: (ctx) =>
      ctx.topDistro === "kdeneon" && ctx.likedDEs.includes("kde"),
    messages: [
      "KDE Plasma'nın her gün çıkan yeni bug'larını ilk elden test etmek büyük bir fedakarlık. Teşekkürler beta tester.",
      "Sistem o kadar güncel ki, daha geliştiricilerin bile görmediği crash raporlarını sen görüyorsun.",
      "KDE neon: 'Stabilite umurumda değil, bana en yeni widget'ları verin' diyenlerin distrosu.",
    ],
  },
  {
    id: "lubuntu_light",
    condition: (ctx) => ctx.topDistro === "lubuntu" && ctx.lowRam,
    messages: [
      "LXQt kullanırken estetik algını nerede bıraktın? Sistem hafif ama ruhun ağırlaşmış.",
      "Ubuntu'nun fakir ama gururlu kardeşi. RAM kullanımı düşük, kullanıcı memnuniyeti daha da düşük.",
      "Lubuntu: 'Eski bilgisayarımı canlandıracağım' derken kendini 2010 yılında hapsedenlerin tercihi.",
    ],
  },
  {
    id: "xubuntu_balanced",
    condition: (ctx) => ctx.topDistro === "xubuntu",
    messages: [
      "Xfce ve Ubuntu... Sıkıcılığın ve statükonun kalesi. Ne bir eksik ne bir fazla, tam bir gri alan.",
      "20 yıldır değişmeyen arayüzle ne kadar mutlusun? 'Ben çalışmasına bakarım' diyorsan yalan söylüyorsun.",
      "Xubuntu: 'Benim sistemim asla patlamaz çünkü içinde yeni hiçbir şey yok' distrosu.",
    ],
  },
  {
    id: "kubuntu_kde_ubuntu",
    condition: (ctx) => ctx.topDistro === "kubuntu",
    messages: [
      "Ubuntu tabanında KDE kullanmak mı? Tam bir 'karar veremiyorum' insanı tercihi.",
      "Kubuntu: 'Neon çok riskli, Debian çok eski, bari ortada kalayım' korkaklığı.",
      "O kadar çok özelleştirme seçeneğin var ki, yine de gidip Windows 10 gibi yapacaksın sistemi.",
    ],
  },
  {
    id: "mxlinux_stable",
    condition: (ctx) => ctx.topDistro === "mxlinux",
    messages: [
      "DistroWatch'ta neden birinci olduğunu kimsenin anlamadığı o gizemli kullanıcı sensin.",
      "Xfce'yi modifiye edip 'bakın ne kadar güzel oldu' demek... Kendine dürüst ol Yusuf, olmadı.",
      "MX Linux: 'Ben Debian'ı seviyorum ama kurulumda acı çekmek istemiyorum' diyenlerin güvenli bölgesi.",
    ],
  },
];

const genericRoasts = [
  "Linux dünyasına hoş geldin! Artık Windows güncellemelerinden kurtuldun ama şimdi de 'acaba bu kütüphane neden eksik' diye sabahlayacaksın.",
  "Seçimini yaptın. Şimdi git, forumlarda 'RTFM' cevabını alıp gel. Linux topluluğu seni çok sıcak(!) karşılayacak.",
  "Tebrikler! Artık vaktinin %90'ını sistemini özelleştirmeye, kalan %10'unu ise aslında bilgisayarda ne yapman gerektiğini hatırlamaya harcayacaksın.",
  "Kurulum bittikten 1 saat sonra yeni bir distro arayışına gireceğini biliyoruz. Distro-hopping hastalığının tedavisi yok.",
  "İyi seçim! Ama unutma, Linux'ta her şey 'sadece küçük bir config değişikliği' ile çözülür... Tabii o değişikliğin ne olduğunu bulman 3 gün sürmezse.",
];

const deRoasts: Record<string, string[]> = {
  kde: [
    "Ayarlar menüsünde kaybolmaya hazır mısın? Widget'ların arasında debelenirken asıl işini yapmayı unutma.",
    "KDE Plasma: Her şeyin ayarı var ama hiçbir şey tam istediğin gibi değil.",
  ],
  gnome: [
    "Sistemi kullanabilmek için 20 tane extension kurman gerekecek. 'Minimalizm' adı altında özellikleri kırpılmış bir sistemdesin.",
    "GNOME workflow'u: 'Biz ne diyorsak onu kullanacaksın, özelleştirme senin neyine?' elitizmi.",
  ],
  xfce: [
    "Yıl olmuş 2025, hala 90'ların arayüzünü kullanıyorsun. 'Hafif' olması seni kurtarmayacak.",
    "Xfce: Bilgisayarın çok eski olduğundan değil, tamamen 'estetik sevmiyorum' dediğin için kullandığın o arayüz.",
  ],
  cinnamon: [
    "Windows'tan kaçıp Windows kopyasına sığınmak... Güzel ironi.",
    "Cinnamon: 'Ben değişim istemiyorum, bana başlat menümü verin yeter' diyenlerin kalesi.",
  ],
  i3: [
    "Fareyi çöpe at, artık sadece klavyeyle yaşıyorsun. Ama arkadaşların bilgisayarını açınca hiçbir şey yapamıyor, tek kazancın bu.",
    "Konfigürasyon dosyaları senin yeni evin oldu. Güle güle otur.",
  ],
  hyprland: [
    "Animasyonlar o kadar hızlı ki ne yaptığını sen de anlamıyorsun ama r/unixporn'da 200 upvote garanti.",
    "Wayland ve tiling... En küçük bir güncellemede ekranının neden gelmediğini sorgularken başarılar.",
  ],
  pantheon: [
    "Mac OS çakması bir arayüzle 'ben özgürüm' diye gezmek... Apple görse dava açardı.",
    "Estetik güzel ama o kısıtlamalar seni de bir yerden sonra darlamayacak mı?",
  ],
  dde: [
    "En güzel görünen masaüstü ama Çin'e giden veri trafiği de bir o kadar güzeldir muhtemelen.",
    "Deepin: Görsellik için gizliliğini satanların ortak noktası.",
  ],
};

export function generateRoast(context: RoastContext): string {
  const matchingRoasts = generalRoasts.filter((r) => r.condition(context));

  let roastParts: string[] = [];

  if (matchingRoasts.length > 0) {
    const primaryRoast = matchingRoasts[0];
    const randomMessage =
      primaryRoast.messages[
        Math.floor(Math.random() * primaryRoast.messages.length)
      ];
    roastParts.push(randomMessage);
  }

  if (context.likedDEs.length > 0) {
    const topDE = context.likedDEs[0];
    const deKey = topDE
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace("plasma", "")
      .replace("sway", "i3");
    if (deRoasts[deKey]) {
      const deRoast =
        deRoasts[deKey][Math.floor(Math.random() * deRoasts[deKey].length)];
      roastParts.push(deRoast);
    }
  }

  if (roastParts.length === 0) {
    roastParts.push(
      genericRoasts[Math.floor(Math.random() * genericRoasts.length)],
    );
  }

  if (
    context.nvidia &&
    context.gaming &&
    !roastParts.some((r) => r.includes("NVIDIA"))
  ) {
    roastParts.push(
      "NVIDIA + Gaming combo'sun var. Linux'ta oyun artık gerçek, tadını çıkar!",
    );
  }

  if (context.oldHardware && context.lowRam) {
    roastParts.push(
      "Eski donanımla Linux kullanmak çevreci bir hareket. Dünyayı kurtarıyorsun!",
    );
  }

  if (context.systemdHate) {
    roastParts.push(
      "Systemd düşmanı bir seçim yaptın. Init savaşlarının gazisi olarak selamlıyorum.",
    );
  }

  return roastParts.join(" ");
}

export function generateQuickRoast(
  distroId: string,
  isNvidia: boolean,
  isGaming: boolean,
): string {
  const quickRoasts: Record<string, string> = {
    arch: isNvidia
      ? "NVIDIA ile Arch? Cesursun."
      : "Arch seçtin. Wiki'ye abone ol.",
    gentoo: "Her şeyi derleyeceksin. Bol sabır.",
    nixos: "Declarative dünya seni bekliyor.",
    qubes: "VM içinde VM. Paranoya seviyesi: Maximum.",
    tails: "İz bırakmadan gez. Ajan modunda.",
    mint: "Windows'tan kaçış güzel olacak.",
    ubuntu: "Klasik ama güzel.",
    fedora: "Bleeding edge, stabil ambalajda.",
    popos:
      isNvidia && isGaming
        ? "NVIDIA + Gaming = Pop!_OS. Perfect match."
        : "System76 seni seviyor.",
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
    xubuntu: "Dengeli Xfce.",
  };

  return quickRoasts[distroId] || "İyi seçim!";
}
