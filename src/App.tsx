import React, { useState, useEffect } from 'react';
import { BioConfig } from './types';
import { INITIAL_BIO_CONFIG, THEMES } from './initialData';
import MobilePreview from './components/MobilePreview';

export default function App() {
  const [config, setConfig] = useState<BioConfig>(INITIAL_BIO_CONFIG);
  const [activeTheme, setActiveTheme] = useState(THEMES[0]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refParam = params.get('ref');
    const themeParam = params.get('theme');

    const liveConfig = { ...INITIAL_BIO_CONFIG };

    if (refParam) liveConfig.referralId = refParam;

    if (themeParam && THEMES.some(t => t.id === themeParam)) {
      liveConfig.themeId = themeParam;
    }

    setConfig(liveConfig);
    setActiveTheme(THEMES.find(t => t.id === liveConfig.themeId) || THEMES[0]);
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 font-sans antialiased overflow-x-hidden flex flex-col justify-center items-center">
      <div className="w-full min-h-screen">
        <MobilePreview config={config} theme={activeTheme} previewOnly={false} />
      </div>
    </main>
  );
}