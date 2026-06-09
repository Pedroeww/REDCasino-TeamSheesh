export interface BioLink {
  id: string;
  title: string;
  url: string;
  iconName: string;
  badgeText?: string;
  badgeColor?: 'red' | 'gold' | 'green' | 'blue' | 'purple';
  clicks: number;
  enabled: boolean;
  isPriority?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: 'Player' | 'Agent' | 'Sub-Agent';
  rating: number;
  comment: string;
  avatarUrl?: string;
  date: string;
}

export interface BioConfig {
  profileName: string;
  profileSub: string;
  bioText: string;
  verified: boolean;
  customAvatarUrl?: string;
  referralId: string;
  announcementText: string;
  themeId: string;
  showTestimonials: boolean;
  showStats: boolean;
  showQrCode: boolean;
  links: BioLink[];
  testimonials: Testimonial[];
}

export interface ClickStat {
  linkId: string;
  title: string;
  clicks: number;
  timestamp: string;
}

export interface AnalyticsSummary {
  totalViews: number;
  totalClicks: number;
  clickThroughRate: number;
  viewsHistory: { date: string; views: number }[];
  deviceStats: { device: string; percentage: number }[];
  geoStats: { region: string; percentage: number }[];
}

export interface BioTheme {
  id: string;
  name: string;
  className: string; // Tailwind gradient/bg class
  cardStyle: string; // Extra styles for individual link card
  buttonColor: string; // Primary button background/text
  textMuted: string; // Muted text color class
  accentText: string; // Accent text color (e.g. golden, emerald)
  pulseColor: string; // Color for the priority glow
}
