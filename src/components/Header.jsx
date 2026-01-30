import { useState } from 'react';
import HowItWorksModal from './HowItWorksModal';

function Header({ lastUpdate, onRefresh }) {
  const [refreshing, setRefreshing] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setTimeout(() => setRefreshing(false), 500);
  };

  const formatTime = (date) => {
    if (!date) return '--:--:--';
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'America/Los_Angeles'
    });
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm border-b-4 border-clobster-dark sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo & Name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-clobster-sky border-2 border-clobster-dark overflow-hidden">
                <img 
                  src="/clobster-3d.png" 
                  alt="Clobster" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="font-pixel text-[10px] text-clobster-dark tracking-wider">CLOBSTER</h1>
                <p className="text-[8px] text-gray-500 font-mono uppercase tracking-widest">
                  Polymarket Trader
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-4">
              <a href="#dashboard" className="text-[10px] font-mono font-bold text-clobster-dark uppercase hover:text-clobster-coral transition-colors">
                Dashboard
              </a>
              <button 
                onClick={() => setShowHowItWorks(true)}
                className="text-[10px] font-mono font-bold text-gray-500 uppercase hover:text-clobster-coral transition-colors"
              >
                How It Works
              </button>
              <div className="flex items-center gap-1 px-2 py-1 bg-clobster-sky border-2 border-clobster-dark">
                <span className="text-[10px] font-mono font-bold text-clobster-dark uppercase">API</span>
                <span className="text-[8px] font-mono text-clobster-coral uppercase">soon</span>
              </div>
              <a 
                href="https://x.com/ClobsterClaude" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] font-mono font-bold text-gray-500 uppercase hover:text-clobster-coral transition-colors"
              >
                Twitter
              </a>
            </nav>

            {/* Status & Controls */}
            <div className="flex items-center gap-4">
              {/* Live Status */}
              <div className="flex items-center gap-2 px-2.5 py-1 bg-clobster-sky border-2 border-clobster-dark">
                <div className="status-dot"></div>
                <span className="text-[10px] font-mono font-bold text-clobster-dark uppercase">Live</span>
              </div>

              {/* Last Update */}
              <div className="hidden sm:flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-clobster-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[10px] font-mono font-bold text-clobster-dark">{formatTime(lastUpdate)}</span>
              </div>

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="pixel-btn px-2.5 py-1 text-[10px] disabled:opacity-50"
              >
                {refreshing ? '...' : 'SYNC'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <HowItWorksModal 
        isOpen={showHowItWorks} 
        onClose={() => setShowHowItWorks(false)} 
      />
    </>
  );
}

export default Header;
