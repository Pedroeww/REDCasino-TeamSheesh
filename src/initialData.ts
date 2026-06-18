import { BioConfig, BioTheme, AnalyticsSummary } from './types';

export const THEMES: BioTheme[] = [
  {
    id: 'sleek-interface',
    name: 'TeamSheesh Prestige (Red & Gold)',
    className: 'bg-[#060608] bg-[radial-gradient(circle_at_50%_0%,#200808_0%,#060608_75%)] text-white',
    cardStyle: 'bg-white/5 hover:bg-white/10 border border-white/5 hover:border-red-500/20 backdrop-blur-md rounded-2xl text-white shadow-md shadow-black/40 transition-all duration-300',
    buttonColor: 'bg-gradient-to-r from-[#ef4444] to-[#b91c1c] text-white hover:opacity-95 font-bold shadow-lg shadow-red-950/40 active:scale-[0.98]',
    textMuted: 'text-neutral-400',
    accentText: 'text-[#ef4444]',
    pulseColor: 'rgba(239, 68, 68, 0.45)', // Sleek Red glow
  },
  {
    id: 'amber-whiskey',
    name: 'Classic TeamSheesh Gold',
    className: 'bg-radial from-neutral-900 to-black text-neutral-100',
    cardStyle: 'bg-neutral-900/85 hover:bg-neutral-800/90 border border-amber-500/20 hover:border-amber-500/50 shadow-md shadow-amber-500/5',
    buttonColor: 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:opacity-90 font-semibold shadow-md shadow-amber-500/20',
    textMuted: 'text-neutral-400',
    accentText: 'text-amber-400',
    pulseColor: 'rgba(245, 158, 11, 0.4)', // Amber glow
  },
  {
    id: 'midnight-gold',
    name: 'Midnight Onyx & Gold',
    className: 'bg-gradient-to-b from-slate-950 via-neutral-950 to-slate-950 text-white',
    cardStyle: 'bg-neutral-900/60 hover:bg-neutral-900/95 border border-yellow-500/30 hover:border-yellow-500 shadow-md shadow-yellow-500/10 backdrop-blur-md',
    buttonColor: 'bg-yellow-500 text-black hover:bg-yellow-400 font-bold shadow-lg shadow-yellow-500/35',
    textMuted: 'text-slate-400',
    accentText: 'text-yellow-400',
    pulseColor: 'rgba(234, 179, 8, 0.45)', // Yellow gold glow
  },
  {
    id: 'vegas-purple',
    name: 'Royal Purple Casino',
    className: 'bg-gradient-to-tr from-[#13021f] via-[#24003d] to-[#090011] text-white',
    cardStyle: 'bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/40 hover:border-rose-400 shadow-lg shadow-fuchsia-500/5 backdrop-blur-md',
    buttonColor: 'bg-gradient-to-r from-fuchsia-600 to-pink-500 text-white hover:opacity-90 font-semibold shadow-md shadow-fuchsia-500/30',
    textMuted: 'text-purple-300/70',
    accentText: 'text-rose-400',
    pulseColor: 'rgba(217, 70, 239, 0.5)', // Neon fuchsia
  },
  {
    id: 'brand-blue',
    name: '747 Signature Blue',
    className: 'bg-gradient-to-b from-blue-950 via-slate-900 to-neutral-950 text-slate-100',
    cardStyle: 'bg-blue-900/20 hover:bg-blue-900/30 border border-blue-400/30 hover:border-blue-400/70 shadow-sm shadow-blue-500/5',
    buttonColor: 'bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600 font-medium shadow-md shadow-blue-500/20',
    textMuted: 'text-blue-200/60',
    accentText: 'text-blue-400',
    pulseColor: 'rgba(59, 130, 246, 0.4)', // Cyan-Blue glow
  },
];

export const INITIAL_BIO_CONFIG: BioConfig = {
  profileName: 'REDCasino - TeamSheesh',
  profileSub: '@TeamSheesh',
  bioText: '🔥 Welcome to the official hub of TeamSheesh! Register, represent us as an agent, check active promotions, and connect directly with our trusted live admins.',
  verified: true,
  customAvatarUrl: 'https://i.imgur.com/6FVAmTL.png', // Main TeamSheesh logo link
  referralId: 'SHEESH_GOLD',
  announcementText: '📢 ALERT: TeamSheesh giveaway is live! Verify admin profiles below. Only transact through our verified links.',
  themeId: 'sleek-interface',
  showTestimonials: true,
  showStats: true,
  showQrCode: true,
  links: [
    {
      id: 'link-player-reg',
      title: 'Player Registration',
      url: 'https://www.facebook.com/zryll.esquivel',
      iconName: 'Sparkles',
      badgeText: '🔥 REGISTRATION LIVE',
      badgeColor: 'red',
      clicks: 8409,
      enabled: true,
      isPriority: true,
    },
    {
      id: 'link-agent-reg',
      title: 'Apply as Agent',
      url: 'https://www.facebook.com/zryll.esquivel',
      iconName: 'Briefcase',
      badgeText: '💼 EXPAND WITH US',
      badgeColor: 'gold',
      clicks: 4192,
      enabled: true,
      isPriority: true,
    },
    {
      id: 'link-official-page',
      title: 'Join the official webpage',
      url: 'https://www.facebook.com/lancezymata',
      iconName: 'Facebook',
      badgeText: '🌐 VISIT NOW',
      badgeColor: 'blue',
      clicks: 3912,
      enabled: true,
    },
    {
      id: 'link-telegram-group',
      title: 'Join our Official telegram group',
      url: 'https://t.me/teamsheesh',
      iconName: 'Send',
      badgeText: '✈️ OFFICIAL GROUP',
      badgeColor: 'blue',
      clicks: 3521,
      enabled: true,
    },
    {
      id: 'link-live-support',
      title: 'Chat with live admins',
      url: 'https://www.facebook.com/zryll.esquivel',
      iconName: 'MessageCircle',
      badgeText: '⚡ ALWAYS ACTIVE',
      badgeColor: 'green',
      clicks: 2984,
      enabled: true,
    }
  ],
  testimonials: [
    {
      id: 'test-1',
      name: 'Rico M.',
      role: 'Player',
      rating: 5,
      comment: 'Super legit! Subok ko na itong TeamSheesh. Ang bilis ng cash-in at withdraw, 5 mins lang pasok agad sa G-Cash ko.',
      date: 'June 4, 2026',
    },
    {
      id: 'test-2',
      name: 'Maria Elena G.',
      role: 'Agent',
      rating: 5,
      comment: 'Salamat sa hands-on training ng TeamSheesh. Ngayon dual-income na ako, passive commission direct to my dashboard weekly.',
      date: 'May 28, 2026',
    },
    {
      id: 'test-3',
      name: 'John Albert D.',
      role: 'Sub-Agent',
      rating: 5,
      comment: 'Very accommodating admins! Kahit madaling araw, may sumasagot sa Viber and Messenger para mag-assist sa support cases ng players ko.',
      date: 'May 15, 2026',
    }
  ]
};

export const INITIAL_ANALYTICS: AnalyticsSummary = {
  totalViews: 45781,
  totalClicks: 21459,
  clickThroughRate: 46.87,
  viewsHistory: [
    { date: 'June 01', views: 5120 },
    { date: 'June 02', views: 5240 },
    { date: 'June 03', views: 5590 },
    { date: 'June 04', views: 6112 },
    { date: 'June 05', views: 6810 },
    { date: 'June 06', views: 7922 },
    { date: 'June 07', views: 8987 },
  ],
  deviceStats: [
    { device: 'Mobile Touch (iOS/Android)', percentage: 89.2 },
    { device: 'Desktop Browser (Chrome/Safari)', percentage: 8.5 },
    { device: 'Tablet Screens', percentage: 2.3 },
  ],
  geoStats: [
    { region: 'Metro Manila, PH', percentage: 41.5 },
    { region: 'CALABARZON, PH', percentage: 18.2 },
    { region: 'Central Luzon, PH', percentage: 14.8 },
    { region: 'Western Visayas, PH', percentage: 10.3 },
    { region: 'Davao Region, PH', percentage: 9.1 },
    { region: 'International Partners', percentage: 6.1 },
  ],
};
