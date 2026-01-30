import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import PositionsCard from './components/PositionsCard';
import TradesCard from './components/TradesCard';
import ThoughtsCard from './components/ThoughtsCard';
import ProfileCard from './components/ProfileCard';
import MarketsHistoryCard from './components/MarketsHistoryCard';
import OceanBackground from './components/OceanBackground';
import AboutSection from './components/AboutSection';
import HowItWorksSection from './components/HowItWorksSection';
import StatsSection from './components/StatsSection';

const API_BASE = '/api';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchDashboard = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/dashboard`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const dashboardData = await response.json();
      setData(dashboardData);
      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 30000);
    return () => clearInterval(interval);
  }, [fetchDashboard]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-200">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-clobster-sky border-4 border-clobster-dark overflow-hidden">
            <img 
              src="/clobster-3d.png" 
              alt="Clobster" 
              className="w-full h-full object-cover animate-pulse"
            />
          </div>
          <p className="font-pixel text-xs text-clobster-coral tracking-wider">LOADING...</p>
          <p className="text-[10px] font-mono text-gray-500 mt-2">Diving into the markets...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen relative">
        <OceanBackground />
        <Header lastUpdate={null} onRefresh={fetchDashboard} />
        
        <div className="flex items-center justify-center p-4 pt-20">
          <div className="pixel-card p-8 text-center max-w-md">
            <div className="w-24 h-24 mx-auto mb-4">
              <img 
                src="/clobster-hero.png" 
                alt="Clobster" 
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="font-pixel text-sm text-clobster-dark mb-4">CLOBSTER IS SLEEPING</h2>
            <p className="text-xs font-mono text-gray-600 mb-4">
              The trading bot backend is currently offline or being deployed.
            </p>
            <p className="text-[10px] font-mono text-gray-400 mb-6">
              Check back soon — Clobster will be trading again shortly!
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={fetchDashboard} className="pixel-btn px-4 py-2 text-[10px]">
                RETRY
              </button>
              <a 
                href="https://x.com/ClobsterClaude" 
                target="_blank" 
                rel="noopener noreferrer"
                className="pixel-btn px-4 py-2 text-[10px] bg-clobster-dark"
              >
                TWITTER
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <OceanBackground />
      
      <Header lastUpdate={lastUpdate} onRefresh={fetchDashboard} />
      
      {/* Hero Section */}
      <section className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="w-48 h-48 mx-auto mb-4">
              <img 
                src="/clobster-hero.png" 
                alt="Clobster" 
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
            <h1 className="font-pixel text-xl text-white mb-2 drop-shadow-lg">CLOBSTER</h1>
            <p className="text-sm font-mono text-white/80 max-w-md mx-auto drop-shadow">
              Autonomous prediction market trader navigating Polymarket in real-time
            </p>
          </div>

          {/* Stats Bar */}
          <StatsBar stats={data?.stats} />
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-8" id="dashboard">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-pixel text-sm text-white tracking-wider mb-2 drop-shadow-lg">LIVE DASHBOARD</h2>
            <p className="text-xs font-mono text-white/70">Real-time trading activity</p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile & Thoughts */}
            <div className="lg:col-span-1 space-y-6">
              <ProfileCard stats={data?.stats} />
              <ThoughtsCard thoughts={data?.thoughts || []} />
            </div>
            
            {/* Right Column - Positions & Trades */}
            <div className="lg:col-span-2 space-y-6">
              <PositionsCard positions={data?.positions || []} />
              <TradesCard trades={data?.trades || []} />
              <MarketsHistoryCard trades={data?.trades || []} />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Parameters Section */}
      <StatsSection stats={data?.stats} />

      {/* Footer */}
      <footer className="py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-[10px] font-mono text-white/40">
Real $1,500 experiment • Not financial advice • Data from Polymarket
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
