import React, { useState } from 'react';
import { 
  Sparkles, 
  Briefcase, 
  MessageCircle, 
  Send, 
  Facebook, 
  PhoneCall, 
  ExternalLink, 
  Check, 
  Copy, 
  Share2, 
  Star, 
  Megaphone,
  UserCheck,
  QrCode
} from 'lucide-react';
import { BioConfig, BioTheme } from '../types';
import MobilePoppingImage from './MobilePoppingImage';

// Robust asset resolver helper to translate hardcoded source paths to their web-safe high-res CDNs
const resolveAssetPath = (pathString: string): string => {
  if (!pathString) return 'https://i.imgur.com/6FVAmTL.png';
  // Map any local token keys to the new official user-provided direct logo link
  if (
    pathString.includes('teamsheesh_logo') || 
    pathString.includes('whiskey_logo') || 
    pathString.includes('6FVAmTL.png')
  ) {
    return 'https://i.imgur.com/6FVAmTL.png';
  }
  return pathString;
};

interface MobilePreviewProps {
  config: BioConfig;
  theme: BioTheme;
  previewOnly?: boolean;
}

// Resilient Icon Resolver
const RenderLucideIcon = ({ name, className }: { name: string; className?: string }) => {
  const iconProps = { className: className || "w-5 h-5" };
  switch (name) {
    case 'Sparkles':
      return <Sparkles {...iconProps} />;
    case 'Briefcase':
      return <Briefcase {...iconProps} />;
    case 'MessageCircle':
      return <MessageCircle {...iconProps} />;
    case 'Send':
      return <Send {...iconProps} />;
    case 'Facebook':
      return <Facebook {...iconProps} />;
    case 'PhoneCall':
      return <PhoneCall {...iconProps} />;
    default:
      return <ExternalLink {...iconProps} />;
  }
};

export default function MobilePreview({ config, theme, previewOnly = false }: MobilePreviewProps) {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [scratchedBonus, setScratchedBonus] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 0, seconds: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activePointerIndex, setActivePointerIndex] = useState(0);
  const [hoveredLinkIndex, setHoveredLinkIndex] = useState<number | null>(null);

  const slideshowImages = [
    "https://i.imgur.com/GxDDVkK.png",
    "https://i.imgur.com/eYDuLFG.png",
    "https://i.imgur.com/dBKGcWC.png",
    "https://i.imgur.com/x4Mk5XV.png",
    "https://i.imgur.com/xNcFtle.png"
  ];

  // Auto-cycle slideshow images with elegant fade transitions every 10 seconds
  React.useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 10000);
    return () => clearInterval(slideInterval);
  }, [slideshowImages.length]);

  // Auto-shift the pointing arrow across the active links sequence every 3.5 seconds
  React.useEffect(() => {
    const enabledLinksCount = config.links.filter(l => l.enabled).length;
    if (enabledLinksCount === 0) return;
    
    const intervalId = setInterval(() => {
      setActivePointerIndex((prev) => (prev + 1) % enabledLinksCount);
    }, 3500);
    return () => clearInterval(intervalId);
  }, [config.links]);

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Target tonight 9:00 PM recurring resets
      const target = new Date();
      target.setHours(21, 0, 0, 0);
      if (now.getTime() > target.getTime()) {
        target.setDate(target.getDate() + 1);
      }
      const diff = target.getTime() - now.getTime();
      return {
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      };
    };

    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Dynamic link replacement mechanism based on custom referral ID
  const getProcessedUrl = (url: string) => {
    if (!url) return '#';
    // Replace placeholder with the actual config.referralId in the live editor!
    return url.replace(/TEAMWHISKEY_GOLD/g, config.referralId || 'TEAMWHISKEY_GOLD');
  };

  const handleLinkClick = (id: string, url: string) => {
    // Increment local clicks for the session
    const savedStats = localStorage.getItem('team_whiskey_analytics_clicks');
    const clicksObj = savedStats ? JSON.parse(savedStats) : {};
    clicksObj[id] = (clicksObj[id] || 0) + 1;
    localStorage.setItem('team_whiskey_analytics_clicks', JSON.stringify(clicksObj));

    // Also trigger window custom event to notify parent AdminPanel to update stats
    window.dispatchEvent(new CustomEvent('bio-link-clicked', { detail: { linkId: id } }));

    // Open link in new tab safely
    window.open(getProcessedUrl(url), '_blank', 'noopener,noreferrer');
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(config.referralId);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  // Safe fallback path for teamsheesh logo
  const fallbackAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%2308080c'/%3E%3Ccircle cx='50' cy='50' r='40' stroke='%23ef4444' stroke-width='2' fill='none'/%3E%3Cpath d='M50 25 L65 55 L35 55 Z' fill='%23fbbf24'/%3E%3Ctext x='50' y='75' font-family='sans-serif' font-size='8' fill='%23ef4444' text-anchor='middle' font-weight='bold'%3ETEAM SHEESH%3C/text%3E%3C/svg%3E";

  const getBadgeBg = (color?: string) => {
    switch (color) {
      case 'red': return 'bg-red-500 text-white';
      case 'gold': return 'bg-amber-400 text-black font-bold animate-pulse';
      case 'green': return 'bg-emerald-500 text-white';
      case 'blue': return 'bg-blue-500 text-white';
      case 'purple': return 'bg-purple-600 text-white';
      default: return 'bg-amber-500 text-black';
    }
  };

  const getPriorityShadow = (themeId: string) => {
    switch (themeId) {
      case 'brand-blue': return 'shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-pulse border-blue-400';
      case 'vegas-purple': return 'shadow-[0_0_15px_rgba(217,70,239,0.7)] animate-pulse border-pink-400';
      case 'midnight-gold': return 'shadow-[0_0_15px_rgba(234,179,8,0.7)] animate-pulse border-yellow-400';
      case 'sleek-interface': return 'shadow-[0_0_30px_rgba(239,68,68,0.6)] animate-pulse border-[#ef4444]/80';
      default: return 'shadow-[0_0_15px_rgba(245,158,11,0.6)] animate-pulse border-amber-400';
    }
  };

  return (
    <div 
      id="bio-phone-container"
      className={`relative w-full mx-auto select-none overflow-hidden transition-all duration-500 ${
        previewOnly 
          ? 'max-w-md rounded-[40px] border-[12px] border-neutral-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] aspect-[9/18.5] min-h-[780px]'
          : 'w-full min-h-screen rounded-none'
      } ${theme.className}`}
      style={{ contentVisibility: 'auto' }}
    >
      {/* Mobile Popping Image Character widget */}
      <MobilePoppingImage previewOnly={previewOnly} />

      {/* Phone Camera Notch Accessory */}
      {previewOnly && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-neutral-800 rounded-b-3xl z-40 flex items-center justify-center space-x-1.5">
          <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full border border-neutral-700"></div>
          <div className="w-12 h-1 bg-neutral-950 rounded-full"></div>
        </div>
      )}

      {/* Dynamic Fading Background Slideshow (every 10s) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {slideshowImages.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Background slide ${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out pointer-events-none filter brightness-[0.75] contrast-[1.1] ${
              index === currentSlide ? 'opacity-58' : 'opacity-0'
            }`}
            referrerPolicy="no-referrer"
          />
        ))}
        {/* Dark blur-mask backing gradient for reading accessibility */}
        <div className="absolute inset-0 bg-[#060608]/50 bg-radial from-[#060608]/15 via-[#060608]/50 to-[#060608]"></div>
        {/* Glow ambient effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[12000ms]"></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      {/* Main Container - Scrollable inside phone, or standard page */}
      <div 
        className={`relative z-10 flex flex-col h-full overflow-y-auto ${
          previewOnly ? 'max-h-[760px] px-5 pt-12 pb-8' : 'min-h-screen'
        }`}
        style={{
          background: 'transparent'
        }}
      >
        <div className={`w-full flex-grow flex flex-col justify-between ${previewOnly ? 'h-full' : 'max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-5 pt-12 pb-8'}`}>
        
        {/* HEADER SECTION */}
        <header className="flex flex-col items-center text-center mt-4">
          {/* Centered High-Value TeamSheesh Avatar */}
          <div className="relative group mb-5">
            <div className={`absolute -inset-1.5 rounded-full bg-gradient-to-tr ${
              theme.id === 'brand-blue' 
                ? 'from-blue-500 to-teal-400' 
                : theme.id === 'sleek-interface'
                ? 'from-[#ef4444] via-[#fbbf24] to-[#7f1d1d]'
                : 'from-amber-400 via-yellow-500 to-amber-600'
            } opacity-85 blur-md group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse`}></div>
            <div className={`relative rounded-full overflow-hidden flex items-center justify-center transition-all ${
              theme.id === 'sleek-interface'
                ? 'w-28 h-28 border-4 border-[#0c0c0e] bg-neutral-900 shadow-[0_0_40px_rgba(239,68,68,0.45)]'
                : 'w-24 h-24 border border-black bg-black'
            }`}>
              <img 
                src={resolveAssetPath(config.customAvatarUrl)}
                onError={(e) => {
                  e.currentTarget.src = fallbackAvatar;
                }}
                alt="TeamSheesh Logo" 
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* "CLAIM YOUR SPOT" Badge */}
            <span className={`absolute left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-[#0c0c0e] via-[#1c0d0d] to-[#0c0c0e] rounded-full border border-yellow-500/50 text-[10px] font-black tracking-widest text-[#fbbf24] whitespace-nowrap shadow-[0_0_15px_rgba(234,179,8,0.35)] animate-pulse ${
              theme.id === 'sleek-interface' ? '-bottom-5' : '-bottom-4.5'
            }`}>
              CLAIM YOUR SPOT <span className="text-xs font-black animate-bounce inline-block ml-1">👇</span>
            </span>
          </div>

          {/* Profile Name & Sub details */}
          <div className="flex items-center space-x-1 mt-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white drop-shadow-md">
              {config.profileName}
            </h1>
            {config.verified && (
              <span className="inline-flex items-center justify-center bg-blue-500 text-white rounded-full p-0.5 h-5 w-5 shadow-sm shadow-blue-500/20" title="Verified Affiliate">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            )}
          </div>
          
          <p className={`text-xs ${theme.id === 'sleek-interface' ? 'text-amber-400/95 font-bold' : theme.textMuted} mb-3 font-mono tracking-wider font-semibold uppercase`}>
            {config.profileSub}
          </p>

          {/* Bio copy */}
          <p className="text-xs text-neutral-300 leading-relaxed font-sans max-w-sm md:max-w-2xl px-4 mb-6 bg-neutral-950/65 py-2.5 rounded-xl border border-white/5 backdrop-blur-md">
            {config.bioText}
          </p>

          {/* Referral tracker snippet */}
          {config.showQrCode && (
            <div className="mb-6 flex flex-col items-center">
              <div className="flex items-center space-x-2 bg-neutral-950/80 px-3.5 py-1.5 rounded-full border border-amber-500/20 text-xs text-amber-400">
                <UserCheck className="w-4 h-4 animate-bounce" />
                <span>Referral: <strong className="text-yellow-400 font-mono">{config.referralId}</strong></span>
                <button 
                  onClick={copyReferralCode} 
                  className="hover:text-white transition p-0.5"
                  title="Copy Code"
                >
                  {copiedReferral ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          )}
        </header>

        {/* MAIN MULTIPLE BIO LINKS */}
        <main className="flex-grow space-y-3 md:space-y-6">
          {config.links
            .filter(link => link.enabled)
            .map((link, idx) => {
              const pUrl = getProcessedUrl(link.url);
              const isSleekPriority = theme.id === 'sleek-interface' && link.isPriority;
              const cardBgClass = isSleekPriority
                ? 'bg-gradient-to-r from-[#ef4444] to-[#991b1b] text-white border-none shadow-lg shadow-red-950/40 rounded-2xl'
                : theme.id === 'sleek-interface'
                  ? 'bg-neutral-950/78 hover:bg-neutral-900/85 border border-white/10 hover:border-red-500/30 backdrop-blur-md rounded-2xl text-white shadow-md shadow-black/50 transition-all duration-300'
                  : theme.cardStyle;
              
              const priorityShadowClass = link.isPriority ? getPriorityShadow(theme.id) : '';
              const isCurrentlyPointed = idx === activePointerIndex;
              const isHovered = hoveredLinkIndex === idx;

              return (
                <div 
                  key={link.id} 
                  className={`w-full group relative cursor-pointer transform hover:-translate-y-0.5 transition-all duration-300 ${cardBgClass} ${priorityShadowClass} ${
                    isCurrentlyPointed ? 'ring-2 ring-yellow-500/55 shadow-[0_0_20px_rgba(245,158,11,0.3)]' : ''
                  }`}
                  onClick={() => {
                    setActivePointerIndex(idx);
                    setHoveredLinkIndex(idx);
                    // Keep hover visual active on tap
                    setTimeout(() => {
                      setHoveredLinkIndex(prev => prev === idx ? null : prev);
                    }, 1500);
                    handleLinkClick(link.id, link.url);
                  }}
                  onMouseEnter={() => {
                    setActivePointerIndex(idx);
                    setHoveredLinkIndex(idx);
                  }}
                  onMouseLeave={() => {
                    setHoveredLinkIndex(null);
                  }}
                  onTouchStart={() => {
                    setActivePointerIndex(idx);
                    setHoveredLinkIndex(idx);
                  }}
                >
                  {/* Center-aligned Pointing Down Arrow badge pointing directly at this active link item */}
                  {isCurrentlyPointed && (
                    <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 z-20 flex items-center pointer-events-none transition-all duration-300">
                      <div className={`flex items-center space-x-1.5 px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-wider shadow-lg transition-transform duration-300 ${
                        isHovered 
                          ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white border-yellow-400 scale-110 -translate-y-1 animate-bounce shadow-[0_0_20px_rgba(239,68,68,0.85)]' 
                          : 'bg-gradient-to-r from-[#17171d] to-[#0c0c0e] text-yellow-400 border-yellow-500/40 animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                      }`}>
                        <span>👉 Claim your spot</span>
                        <span className="text-[11px] animate-bounce inline-block">👇</span>
                      </div>
                    </div>
                  )}

                  {!isSleekPriority && (
                    <div className="absolute inset-0 bg-white/2 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity"></div>
                  )}
                  
                  {/* Floating Action Cards */}
                  <div className="flex items-center justify-between p-2 md:p-4 relative z-10">
                    <div className="flex items-center space-x-3.5 min-w-0">
                      {/* Left icon box */}
                      <div className={`p-1.5 md:p-2.5 rounded-lg flex items-center justify-center ${
                        isSleekPriority
                          ? 'bg-white/15 text-white shadow-inner'
                          : link.isPriority 
                          ? 'bg-amber-400/20 text-amber-300' 
                          : 'bg-neutral-800/80 text-neutral-300'
                      }`}>
                        <RenderLucideIcon name={link.iconName} className="w-5 h-5 flex-shrink-0" />
                      </div>
                      
                      {/* Title & URL domain preview */}
                      <div className="text-left min-w-0 flex flex-row items-baseline gap-2 flex-wrap">
                        <div className={`text-sm font-bold tracking-wide break-words whitespace-normal pr-2 ${
                          isSleekPriority ? 'text-white' : 'text-white group-hover:text-yellow-300/90'
                        }`}>
                          {link.title}
                        </div>
                        <div className={`text-[10px] font-mono break-all whitespace-normal max-w-none transition-colors ${
                          isSleekPriority 
                            ? 'text-orange-100/85 group-hover:text-white' 
                            : 'text-neutral-400 group-hover:text-neutral-300'
                        }`}>
                          {pUrl.replace('https://', '')}
                        </div>
                      </div>
                    </div>

                    {/* Right features: badge or external button support */}
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {link.badgeText && (
                        <span className={`px-2 py-0.5 rounded text-[8px] tracking-wider uppercase font-extrabold ${
                          isSleekPriority ? 'bg-white text-[#ef4444] font-black shadow-xs' : getBadgeBg(link.badgeColor)
                        }`}>
                          {link.badgeText}
                        </span>
                      )}
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(pUrl, link.id);
                        }}
                        className={`p-1.5 rounded-lg transition duration-200 ${
                          isSleekPriority
                            ? 'bg-white/10 hover:bg-white/20 border border-white/10 text-white'
                            : 'p-1.5 rounded-lg bg-neutral-900/60 hover:bg-neutral-800 border border-white/5 text-neutral-400 hover:text-white'
                        }`}
                        title="Copy Link URL"
                      >
                        {copiedLink === link.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </main>

        {/* TEAM SHEESH GRAND PRESTIGE FOOTER */}
        <footer className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center space-y-4 text-center">
          
          {/* Dynamic Live Giveaway Ticker */}
          <div className="w-full bg-[#08080c]/80 bg-gradient-to-r from-red-600/10 via-yellow-500/5 to-red-600/10 border border-red-500/15 rounded-2xl p-3.5 backdrop-blur-xs max-w-sm md:max-w-2xl">
            <span className="text-[9px] text-yellow-400 uppercase tracking-[0.25em] font-black animate-pulse block">
              🎁 DAILY GIVEAWAY COUNTDOWN
            </span>
            <div className="flex justify-center items-center space-x-2 mt-2 font-mono text-white text-base font-extrabold">
              <span className="bg-black/45 px-2 py-0.5 rounded border border-red-500/10 shadow-inner">{String(timeLeft.hours).padStart(2, '0')}h</span>
              <span className="text-red-500 animate-pulse">:</span>
              <span className="bg-black/45 px-2 py-0.5 rounded border border-red-500/10 shadow-inner">{String(timeLeft.minutes).padStart(2, '0')}m</span>
              <span className="text-red-500 animate-pulse">:</span>
              <span className="bg-black/45 px-2 py-0.5 rounded border border-red-500/10 shadow-inner">{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
            <p className="text-[8px] text-zinc-400 mt-2 font-sans font-medium">
              Click any active Facebook admin link above to register & qualify!
            </p>
          </div>

          {/* Social Webpage Link */}
          <div className="flex flex-wrap justify-center gap-2">
            <a 
              href="https://www.facebook.com/lancezymata" 
              target="_blank" 
              className="inline-flex items-center space-x-1.5 text-[10px] text-zinc-300 hover:text-[#fbbf24] bg-white/5 border border-white/5 hover:border-red-500/30 px-3.5 py-1.5 rounded-full transition-all duration-300 font-bold tracking-wider"
              id="footer-fb-link"
              rel="noopener noreferrer"
            >
              <Facebook className="w-3.5 h-3.5 text-[#ef4444]" />
              <span>Official Facebook Site</span>
            </a>
          </div>

          <div className="text-[10px] text-zinc-400 tracking-[0.1em] font-black uppercase">
            Designed by Teamsheesh Financer Lance mata
          </div>
          <div className="text-[9px] text-zinc-400 font-mono">
            Partner Code: <span className="text-yellow-500 font-bold">{config.referralId}</span>
          </div>
        </footer>

        </div>
      </div>
    </div>
  );
}
