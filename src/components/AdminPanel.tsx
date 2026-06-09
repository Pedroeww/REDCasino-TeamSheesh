import React, { useState } from 'react';
import { 
  Plus, 
  Trash, 
  Check, 
  Copy, 
  Sparkles,
  Link2,
  Settings,
  Sliders,
  UserCheck
} from 'lucide-react';
import { BioConfig, BioLink, BioTheme } from '../types';
import { THEMES } from '../initialData';

interface AdminPanelProps {
  config: BioConfig;
  onChange: (newConfig: BioConfig) => void;
  onReset: () => void;
}

export default function AdminPanel({ config, onChange, onReset }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'links' | 'settings'>('links');
  const [copiedLink, setCopiedLink] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newIcon, setNewIcon] = useState('Sparkles');
  const [newBadge, setNewBadge] = useState('');
  const [newBadgeColor, setNewBadgeColor] = useState<'red' | 'gold' | 'green' | 'blue' | 'purple'>('gold');

  // Add custom link
  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;

    // Standardize URL protocol if missing
    let formattedUrl = newUrl.trim();
    if (!/^https?:\/\//i.test(formattedUrl) && !/^viber:\/\/|mailto:|tel:/i.test(formattedUrl)) {
      formattedUrl = 'https://' + formattedUrl;
    }

    const newLinkItem: BioLink = {
      id: `custom-link-${Date.now()}`,
      title: newTitle.trim(),
      url: formattedUrl,
      iconName: newIcon,
      badgeText: newBadge.trim() || undefined,
      badgeColor: newBadge.trim() ? newBadgeColor : undefined,
      clicks: 0,
      enabled: true,
    };

    onChange({
      ...config,
      links: [newLinkItem, ...config.links]
    });

    // Reset inputs
    setNewTitle('');
    setNewUrl('');
    setNewBadge('');
  };

  // Delete custom link
  const handleDeleteLink = (id: string) => {
    onChange({
      ...config,
      links: config.links.filter(link => link.id !== id)
    });
  };

  // Toggle link status
  const handleToggleLink = (id: string) => {
    onChange({
      ...config,
      links: config.links.map(link => 
        link.id === id ? { ...link, enabled: !link.enabled } : link
      )
    });
  };

  // Toggle priority status
  const handleTogglePriority = (id: string) => {
    onChange({
      ...config,
      links: config.links.map(link => 
        link.id === id ? { ...link, isPriority: !link.isPriority } : link
      )
    });
  };

  // Update specific fields
  const updateField = (key: keyof BioConfig, value: any) => {
    onChange({
      ...config,
      [key]: value
    });
  };

  // Copy live links
  const copyLandingLink = () => {
    const deploymentUrl = window.location.href.split('?')[0];
    const customizedLink = `${deploymentUrl}?ref=${config.referralId || 'SHEESH_GOLD'}`;
    navigator.clipboard.writeText(customizedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 text-neutral-100 flex flex-col h-full shadow-2xl transition-all duration-300">
      
      {/* Title Header */}
      <div className="flex items-center justify-between pb-5 border-b border-neutral-800">
        <div>
          <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            Agent Dashboard
          </span>
          <h2 className="text-xl font-black text-white tracking-wider uppercase mt-1.5">
            Partner Link Configurator
          </h2>
        </div>
        
        <button 
          onClick={onReset}
          className="text-xs text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 rounded-xl border border-neutral-700 transition"
        >
          Reset Defaults
        </button>
      </div>

      {/* Sharing link status banner */}
      <div className="mt-4 p-3 bg-neutral-950/80 rounded-2xl border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="min-w-0">
          <span className="text-neutral-400 block font-bold text-[10px] uppercase">Active Landing URL</span>
          <span className="font-mono text-amber-500 truncate block mt-0.5 max-w-sm">
            {window.location.href.split('?')[0]}?ref={config.referralId}
          </span>
        </div>
        <button 
          onClick={copyLandingLink}
          className="px-3 py-1.5 bg-amber-500 text-black hover:bg-amber-400 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap self-end sm:self-auto"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedLink ? 'Copied' : 'Copy URL'}</span>
        </button>
      </div>

      {/* Tabs navigation */}
      <div className="flex bg-neutral-950/80 p-1.5 rounded-2xl gap-1 border border-neutral-800/60 my-5">
        <button
          onClick={() => setActiveTab('links')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 text-xs font-bold rounded-xl transition duration-200 ${
            activeTab === 'links' 
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/10' 
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/85'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Manage Links ({config.links.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 text-xs font-bold rounded-xl transition duration-200 ${
            activeTab === 'settings' 
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/10' 
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/85'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Profile & Appearance</span>
        </button>
      </div>

      {/* TAB CONTENT */}
      <div className="flex-grow overflow-y-auto pr-1 space-y-6">
        
        {/* TAB 1: LINKS MANAGEMENT */}
        {activeTab === 'links' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Create Link Form */}
            <form onSubmit={handleAddLink} className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-4">
              <span className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Link2 className="w-4 h-4 text-amber-500" />
                <span>Add Customized Link</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase pl-0.5">Button Label</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Join VIP Viber Channel" 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/60"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase pl-0.5">Redirect URL</label>
                  <input 
                    type="text" 
                    placeholder="e.g. t.me/teamwhiskey" 
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase pl-0.5">Icon Style</label>
                  <select 
                    value={newIcon}
                    onChange={(e) => setNewIcon(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-neutral-200 focus:outline-none"
                  >
                    <option value="Sparkles">Sparkles (Promotion)</option>
                    <option value="Briefcase">Briefcase (Agent Partners)</option>
                    <option value="MessageCircle">Messenger Logo</option>
                    <option value="Send">Telegram Plane</option>
                    <option value="PhoneCall">Viber Hotline</option>
                    <option value="Facebook">Facebook page</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase pl-0.5">Callout Badge</label>
                  <input 
                    type="text" 
                    placeholder="e.g. NEW, VIP, ACTIVE" 
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/60"
                  />
                </div>

                <div className="space-y-1 flex flex-col justify-end">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase pl-0.5 mb-2">Badge Accent Color</label>
                  <div className="flex space-x-2 py-1 justify-between">
                    {(['red', 'gold', 'green', 'blue', 'purple'] as const).map((color) => {
                      const colorMap = {
                        red: 'bg-red-500',
                        gold: 'bg-amber-400',
                        green: 'bg-emerald-500',
                        blue: 'bg-blue-500',
                        purple: 'bg-purple-600'
                      };
                      return (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setNewBadgeColor(color)}
                          className={`w-5 h-5 rounded-full ${colorMap[color]} border-2 transition ${
                            newBadgeColor === color ? 'border-white scale-110 shadow-sm' : 'border-transparent opacity-60'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-amber-500 text-black rounded-xl text-xs font-bold hover:bg-amber-400 flex items-center justify-center space-x-1.5 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Append Action Button</span>
              </button>
            </form>

            {/* Links Library Pool List */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Configure Links Library</h3>
              <div className="space-y-2.5">
                {config.links.map((link) => (
                  <div 
                    key={link.id} 
                    className={`p-4 bg-neutral-950 rounded-2xl border border-neutral-800 flex flex-col space-y-3 transition ${
                      !link.enabled ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <span className="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-xs">{link.title}</span>
                        {link.badgeText && (
                          <span className="px-1.5 py-0.2 bg-amber-500 text-black rounded text-[8px] font-black uppercase">
                            {link.badgeText}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {/* Toggle enabled status */}
                        <button 
                          onClick={() => handleToggleLink(link.id)}
                          className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition ${
                            link.enabled 
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                              : 'bg-neutral-805 bg-neutral-800 text-neutral-400'
                          }`}
                        >
                          {link.enabled ? 'Active' : 'Hidden'}
                        </button>
                        
                        {/* Toggle premium highlight styling */}
                        <button 
                          onClick={() => handleTogglePriority(link.id)}
                          className={`p-1 rounded transition ${
                            link.isPriority 
                              ? 'bg-amber-500/25 text-amber-400 border border-amber-500/30' 
                              : 'text-neutral-500 hover:text-neutral-300'
                          }`}
                          title="Prioritize (Glow Gradient highlight)"
                        >
                          <Sparkles className="w-4 h-4" />
                        </button>
                        
                        {/* Delete customized links */}
                        <button 
                          onClick={() => handleDeleteLink(link.id)}
                          className="p-1 text-neutral-500 hover:text-red-400 transition"
                          title="Remove custom link"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-neutral-400 bg-neutral-900 py-1.5 px-2.5 rounded-lg border border-neutral-800/40 overflow-x-auto select-all">
                      {link.url.replace(/TEAMWHISKEY_GOLD/g, config.referralId || 'TEAMWHISKEY_GOLD')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PROFILE AND THEME OPTIONS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Profile Config Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Profile Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-neutral-400 font-bold uppercase pl-1">Display Profile Name</label>
                  <input 
                    type="text" 
                    value={config.profileName}
                    onChange={(e) => updateField('profileName', e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-neutral-400 font-bold uppercase pl-1">Handle Username / Subtitle</label>
                  <input 
                    type="text" 
                    value={config.profileSub}
                    onChange={(e) => updateField('profileSub', e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-neutral-400 font-bold uppercase pl-1">Bio Description Copy</label>
                <textarea 
                  value={config.bioText}
                  onChange={(e) => updateField('bioText', e.target.value)}
                  rows={3}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-with-padding text-white focus:outline-none focus:border-amber-500 leading-relaxed"
                ></textarea>
              </div>

              <div className="bg-neutral-950/60 p-4 rounded-xl border border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] text-neutral-300 font-bold uppercase flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-amber-500" />
                    <span>Affiliate Partner Code</span>
                  </label>
                  <input 
                    type="text" 
                    value={config.referralId}
                    onChange={(e) => updateField('referralId', e.target.value)}
                    className="w-full bg-neutral-950 border border-yellow-600/30 rounded-xl px-4 py-2.5 text-xs text-yellow-400 focus:outline-none focus:border-yellow-500 font-mono font-black tracking-wide"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-5">
                  <input 
                    id="checkbox-verified"
                    type="checkbox" 
                    checked={config.verified}
                    onChange={(e) => updateField('verified', e.target.checked)}
                    className="rounded bg-neutral-950 border-neutral-800 text-amber-500 focus:ring-0 w-4 h-4"
                  />
                  <label htmlFor="checkbox-verified" className="text-xs text-neutral-300 cursor-pointer">
                    Show Blue Verified Badge
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-neutral-400 font-bold uppercase pl-1">Custom Logo Image URL (Optional)</label>
                <input 
                  type="text" 
                  value={config.customAvatarUrl}
                  onChange={(e) => updateField('customAvatarUrl', e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  placeholder="https://example.com/logo.png"
                />
              </div>
            </div>

            {/* Prestige Themes */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Prestige Background Themes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {THEMES.map((theme) => {
                  const isSelected = config.themeId === theme.id;
                  return (
                    <div 
                      key={theme.id}
                      onClick={() => updateField('themeId', theme.id)}
                      className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between ${
                        isSelected 
                          ? 'border-amber-400 bg-neutral-900 shadow-md' 
                          : 'border-neutral-800 bg-neutral-950/60 hover:bg-neutral-950'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center ${theme.className}`}>
                          <span className={`text-[10px] ${theme.accentText} font-bold font-mono`}>W</span>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">{theme.name}</span>
                          <span className="text-[10px] text-neutral-500 font-mono">Theme profile</span>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-amber-500 text-black flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Footer secure label branding */}
      <div className="pt-4 mt-4 border-t border-neutral-800 text-center text-[10px] text-neutral-500 flex items-center justify-between">
        <span>Designed by Teamsheesh Financer Lance mata</span>
        <span>Local Client Sandbox</span>
      </div>

    </div>
  );
}
