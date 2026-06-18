import React, { useState, useEffect } from 'react';
import { BioConfig } from './types';
import { INITIAL_BIO_CONFIG, THEMES } from './initialData';
import MobilePreview from './components/MobilePreview';

export default function App() {
  const [config, setConfig] = useState<BioConfig>(INITIAL_BIO_CONFIG);
  const [activeTheme, setActiveTheme] = useState(THEMES[0]);

  // Load configuration and handle parameters
  useEffect(() => {
    const storedConfig = localStorage.getItem('team_whiskey_bio_config');
    let parsedConfig = storedConfig ? JSON.parse(storedConfig) : { ...INITIAL_BIO_CONFIG };
    
    // Always sync critical defaults like the official brand name and logo URLs
    parsedConfig.profileName = INITIAL_BIO_CONFIG.profileName;
    parsedConfig.customAvatarUrl = INITIAL_BIO_CONFIG.customAvatarUrl;

    // Ensure the new Telegram group link is present in the links list to sync existing sessions
    if (parsedConfig.links && Array.isArray(parsedConfig.links)) {
      const hasTelegramLink = parsedConfig.links.some((l: any) => l.url === 'https://t.me/teamsheesh' || l.id === 'link-telegram-group');
      if (!hasTelegramLink) {
        const telegramLink = INITIAL_BIO_CONFIG.links.find(l => l.id === 'link-telegram-group');
        if (telegramLink) {
          const officialPageIndex = parsedConfig.links.findIndex((l: any) => l.id === 'link-official-page');
          const updatedLinks = [...parsedConfig.links];
          if (officialPageIndex !== -1) {
            updatedLinks.splice(officialPageIndex + 1, 0, telegramLink);
          } else {
            updatedLinks.push(telegramLink);
          }
          parsedConfig.links = updatedLinks;
          // Persist the synced links list
          localStorage.setItem('team_whiskey_bio_config', JSON.stringify(parsedConfig));
        }
      }
    }
    
    const params = new URLSearchParams(window.location.search);
    const refParam = params.get('ref');
    const themeParam = params.get('theme');

    if (refParam) {
      parsedConfig.referralId = refParam;
    }
    if (themeParam) {
      const match = THEMES.find(t => t.id === themeParam);
      if (match) {
        parsedConfig.themeId = themeParam;
      }
    }

    setConfig(parsedConfig);

    const activeT = THEMES.find(t => t.id === parsedConfig.themeId) || THEMES[0];
    setActiveTheme(activeT);

    const storedAnalytics = localStorage.getItem('team_whiskey_analytics_views');
    const viewsCount = storedAnalytics ? parseInt(storedAnalytics, 10) + 1 : 45781;
    localStorage.setItem('team_whiskey_analytics_views', viewsCount.toString());
  }, []);

  // Sync active theme with loaded config
  useEffect(() => {
    const selected = THEMES.find(t => t.id === config.themeId) || THEMES[0];
    setActiveTheme(selected);
  }, [config.themeId]);

  return (
    <main className="min-h-screen bg-neutral-950 font-sans antialiased overflow-x-hidden flex flex-col justify-center items-center">
      <div className="w-full min-h-screen">
        <MobilePreview 
          config={config} 
          theme={activeTheme} 
          previewOnly={false} 
        />
      </div>
    </main>
  );
}
