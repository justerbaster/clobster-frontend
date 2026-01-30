import { useState } from 'react';

function HowItWorksModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'algorithm', label: 'Algorithm' },
    { id: 'api', label: 'API Integration' },
    { id: 'risk', label: 'Risk Management' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden pixel-card bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-4 border-clobster-dark bg-clobster-sky">
          <h2 className="font-pixel text-xs text-clobster-dark tracking-wider">HOW IT WORKS</h2>
          <button 
            onClick={onClose}
            className="pixel-btn px-3 py-1 text-[10px]"
          >
            CLOSE
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b-2 border-clobster-sky-dark bg-white">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-[10px] font-mono font-bold uppercase transition-colors ${
                activeTab === tab.id 
                  ? 'bg-clobster-coral text-white border-b-2 border-clobster-dark' 
                  : 'text-gray-500 hover:text-clobster-coral'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'algorithm' && <AlgorithmTab />}
          {activeTab === 'api' && <ApiTab />}
          {activeTab === 'risk' && <RiskTab />}
        </div>
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-pixel text-[10px] text-clobster-dark mb-3">SYSTEM ARCHITECTURE</h3>
        <p className="text-xs font-mono text-gray-600 leading-relaxed mb-4">
          Clobster is a fully autonomous trading system designed to analyze and trade on Polymarket prediction markets. 
          The system operates on a continuous 2-minute cycle, scanning markets, evaluating opportunities, and executing 
          trades based on predefined algorithmic strategies.
        </p>
        
        <div className="bg-clobster-dark p-4 font-mono text-xs text-green-400 overflow-x-auto">
          <pre>{`┌─────────────────────────────────────────────────────────────┐
│                    CLOBSTER ARCHITECTURE                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐            │
│   │ POLYMARKET│───▶│ ANALYZER │───▶│ EXECUTOR │            │
│   │   API    │    │  ENGINE  │    │  MODULE  │            │
│   └──────────┘    └──────────┘    └──────────┘            │
│        │               │               │                   │
│        ▼               ▼               ▼                   │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐            │
│   │  MARKET  │    │ SCORING  │    │ POSITION │            │
│   │   DATA   │    │  SYSTEM  │    │ MANAGER  │            │
│   └──────────┘    └──────────┘    └──────────┘            │
│                                                             │
│   ┌─────────────────────────────────────────────────┐      │
│   │              SQLite DATABASE                     │      │
│   │  • Positions  • Trades  • Thoughts  • Account   │      │
│   └─────────────────────────────────────────────────┘      │
│                                                             │
└─────────────────────────────────────────────────────────────┘`}</pre>
        </div>
      </div>

      <div>
        <h3 className="font-pixel text-[10px] text-clobster-dark mb-3">CORE COMPONENTS</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-3 bg-clobster-sky border-2 border-clobster-dark">
            <p className="text-[10px] font-mono font-bold text-clobster-coral uppercase">Market Scanner</p>
            <p className="text-[11px] font-mono text-gray-600 mt-1">
              Fetches active markets from Polymarket Gamma API every 2 minutes. Filters by volume, liquidity, and market status.
            </p>
          </div>
          <div className="p-3 bg-clobster-sky border-2 border-clobster-dark">
            <p className="text-[10px] font-mono font-bold text-clobster-coral uppercase">Opportunity Analyzer</p>
            <p className="text-[11px] font-mono text-gray-600 mt-1">
              Scores each market based on multiple factors: volume trends, price inefficiencies, liquidity depth, and timing.
            </p>
          </div>
          <div className="p-3 bg-clobster-sky border-2 border-clobster-dark">
            <p className="text-[10px] font-mono font-bold text-clobster-coral uppercase">Trade Executor</p>
            <p className="text-[11px] font-mono text-gray-600 mt-1">
              Calculates optimal position size, executes real trades, and records all activity to the database.
            </p>
          </div>
          <div className="p-3 bg-clobster-sky border-2 border-clobster-dark">
            <p className="text-[10px] font-mono font-bold text-clobster-coral uppercase">LLM Reasoning</p>
            <p className="text-[11px] font-mono text-gray-600 mt-1">
              Optional GPT-4 integration generates human-readable explanations for each trading decision.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-pixel text-[10px] text-clobster-dark mb-3">TRADING CYCLE</h3>
        <div className="flex items-center justify-between text-center">
          {['SCAN', 'ANALYZE', 'SCORE', 'DECIDE', 'EXECUTE'].map((step, i) => (
            <div key={step} className="flex items-center">
              <div className="w-16">
                <div className="w-10 h-10 mx-auto bg-clobster-coral border-2 border-clobster-dark flex items-center justify-center">
                  <span className="font-pixel text-[8px] text-white">{i + 1}</span>
                </div>
                <p className="text-[9px] font-mono font-bold text-clobster-dark mt-1">{step}</p>
              </div>
              {i < 4 && <div className="w-8 h-0.5 bg-clobster-coral"></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AlgorithmTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-pixel text-[10px] text-clobster-dark mb-3">SCORING ALGORITHM</h3>
        <p className="text-xs font-mono text-gray-600 leading-relaxed mb-4">
          Each market opportunity is assigned a score based on multiple weighted factors. 
          Only opportunities exceeding the minimum threshold are considered for trading.
        </p>
        
        <div className="bg-clobster-dark p-4 font-mono text-xs overflow-x-auto">
          <pre className="text-gray-300">
            <span className="text-purple-400">function</span>{" "}
            <span className="text-yellow-400">evaluateOpportunity</span>
            <span className="text-gray-500">(market, outcome, price)</span> {"{"}
            {"\n"}  <span className="text-blue-400">let</span> score = <span className="text-orange-400">0</span>;
            {"\n"}  <span className="text-blue-400">const</span> reasons = [];
            {"\n"}
            {"\n"}  <span className="text-gray-500">// Volume analysis (max +20 points)</span>
            {"\n"}  <span className="text-purple-400">if</span> (volume24h {">"} <span className="text-orange-400">10000</span>) {"{"}
            {"\n"}    score += <span className="text-orange-400">20</span>;
            {"\n"}    reasons.<span className="text-yellow-400">push</span>(<span className="text-green-400">'High trading volume'</span>);
            {"\n"}  {"}"} <span className="text-purple-400">else if</span> (volume24h {">"} <span className="text-orange-400">1000</span>) {"{"}
            {"\n"}    score += <span className="text-orange-400">10</span>;
            {"\n"}  {"}"}
            {"\n"}
            {"\n"}  <span className="text-gray-500">// Liquidity check (max +15 points)</span>
            {"\n"}  <span className="text-purple-400">if</span> (liquidity {">"} <span className="text-orange-400">50000</span>) {"{"}
            {"\n"}    score += <span className="text-orange-400">15</span>;
            {"\n"}    reasons.<span className="text-yellow-400">push</span>(<span className="text-green-400">'High liquidity'</span>);
            {"\n"}  {"}"}
            {"\n"}
            {"\n"}  <span className="text-gray-500">// Price range scoring (max +25 points)</span>
            {"\n"}  <span className="text-purple-400">if</span> (price {">="} <span className="text-orange-400">0.20</span> && price {"<="} <span className="text-orange-400">0.40</span>) {"{"}
            {"\n"}    score += <span className="text-orange-400">25</span>; <span className="text-gray-500">// Undervalued zone</span>
            {"\n"}  {"}"} <span className="text-purple-400">else if</span> (price {">="} <span className="text-orange-400">0.60</span> && price {"<="} <span className="text-orange-400">0.80</span>) {"{"}
            {"\n"}    score += <span className="text-orange-400">20</span>; <span className="text-gray-500">// High probability</span>
            {"\n"}  {"}"}
            {"\n"}
            {"\n"}  <span className="text-gray-500">// Minimum threshold: 30 points</span>
            {"\n"}  <span className="text-purple-400">return</span> score {">"} <span className="text-orange-400">30</span> ? {"{"} score, reasons {"}"} : <span className="text-orange-400">null</span>;
            {"\n"}{"}"}
          </pre>
        </div>
      </div>

      <div>
        <h3 className="font-pixel text-[10px] text-clobster-dark mb-3">SCORING WEIGHTS</h3>
        <div className="space-y-2">
          {[
            { factor: 'Volume 24h > $10k', points: '+20', desc: 'Active market with significant trading' },
            { factor: 'Liquidity > $50k', points: '+15', desc: 'Deep order book, low slippage' },
            { factor: 'Price 20-40%', points: '+25', desc: 'Potential undervalued opportunity' },
            { factor: 'Price 60-80%', points: '+20', desc: 'High probability outcome' },
            { factor: 'Active timeframe', points: '+10', desc: '1-30 days until resolution' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-2 bg-clobster-sky border-l-4 border-clobster-coral">
              <span className="font-mono font-bold text-green-600 w-12">{item.points}</span>
              <span className="font-mono text-xs text-clobster-dark font-bold">{item.factor}</span>
              <span className="font-mono text-[10px] text-gray-500">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ApiTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-pixel text-[10px] text-clobster-dark mb-3">POLYMARKET INTEGRATION</h3>
        <p className="text-xs font-mono text-gray-600 leading-relaxed mb-4">
          Clobster connects to Polymarket through their public Gamma API to fetch market data, 
          prices, and trading volumes. No authentication required for read operations.
        </p>
        
        <div className="bg-clobster-dark p-4 font-mono text-xs overflow-x-auto">
          <pre className="text-gray-300">
            <span className="text-gray-500">// API Endpoints</span>
            {"\n"}<span className="text-blue-400">const</span> GAMMA_API = <span className="text-green-400">'https://gamma-api.polymarket.com'</span>;
            {"\n"}
            {"\n"}<span className="text-gray-500">// Fetch active markets</span>
            {"\n"}<span className="text-purple-400">async function</span> <span className="text-yellow-400">getActiveMarkets</span>() {"{"}
            {"\n"}  <span className="text-blue-400">const</span> response = <span className="text-purple-400">await</span> <span className="text-yellow-400">fetch</span>(
            {"\n"}    <span className="text-green-400">`${"{"}</span><span className="text-blue-400">GAMMA_API</span><span className="text-green-400">{"}"}/markets?active=true&closed=false`</span>
            {"\n"}  );
            {"\n"}  <span className="text-purple-400">return</span> response.<span className="text-yellow-400">json</span>();
            {"\n"}{"}"}
            {"\n"}
            {"\n"}<span className="text-gray-500">// Fetch trending by volume</span>
            {"\n"}<span className="text-purple-400">async function</span> <span className="text-yellow-400">getTrendingMarkets</span>() {"{"}
            {"\n"}  <span className="text-blue-400">const</span> response = <span className="text-purple-400">await</span> <span className="text-yellow-400">fetch</span>(
            {"\n"}    <span className="text-green-400">`${"{"}</span><span className="text-blue-400">GAMMA_API</span><span className="text-green-400">{"}"}/markets?order=volume24hr&ascending=false`</span>
            {"\n"}  );
            {"\n"}  <span className="text-purple-400">return</span> response.<span className="text-yellow-400">json</span>();
            {"\n"}{"}"}
            {"\n"}
            {"\n"}<span className="text-gray-500">// Market data structure</span>
            {"\n"}<span className="text-blue-400">interface</span> <span className="text-yellow-400">Market</span> {"{"}
            {"\n"}  id: <span className="text-blue-400">string</span>;
            {"\n"}  question: <span className="text-blue-400">string</span>;
            {"\n"}  outcomes: <span className="text-blue-400">string</span>[];
            {"\n"}  outcomePrices: <span className="text-blue-400">number</span>[];
            {"\n"}  volume24hr: <span className="text-blue-400">number</span>;
            {"\n"}  liquidity: <span className="text-blue-400">number</span>;
            {"\n"}  endDate: <span className="text-blue-400">string</span>;
            {"\n"}{"}"}
          </pre>
        </div>
      </div>

      <div>
        <h3 className="font-pixel text-[10px] text-clobster-dark mb-3">CLOBSTER API (INTERNAL)</h3>
        <div className="space-y-3">
          {[
            { method: 'GET', endpoint: '/api/dashboard', desc: 'Full dashboard data (stats, positions, trades, thoughts)' },
            { method: 'GET', endpoint: '/api/positions', desc: 'Active positions with P&L calculations' },
            { method: 'GET', endpoint: '/api/trades', desc: 'Trade history with reasoning' },
            { method: 'GET', endpoint: '/api/stats', desc: 'Account statistics and performance metrics' },
            { method: 'POST', endpoint: '/api/analyze', desc: 'Trigger manual analysis cycle' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-2 border-2 border-clobster-sky-dark">
              <span className={`px-2 py-0.5 text-[9px] font-mono font-bold border-2 border-clobster-dark ${
                item.method === 'GET' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {item.method}
              </span>
              <code className="font-mono text-xs text-clobster-coral">{item.endpoint}</code>
              <span className="font-mono text-[10px] text-gray-500">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RiskTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-pixel text-[10px] text-clobster-dark mb-3">RISK MANAGEMENT</h3>
        <p className="text-xs font-mono text-gray-600 leading-relaxed mb-4">
          Clobster implements multiple layers of risk management to protect the portfolio from significant drawdowns. 
          All parameters are configurable through environment variables.
        </p>
        
        <div className="bg-clobster-dark p-4 font-mono text-xs overflow-x-auto">
          <pre className="text-gray-300">
            <span className="text-gray-500">// Risk parameters</span>
            {"\n"}<span className="text-blue-400">const</span> RISK_CONFIG = {"{"}
            {"\n"}  <span className="text-gray-500">// Position sizing</span>
            {"\n"}  maxPositionSize: <span className="text-orange-400">500</span>,      <span className="text-gray-500">// Max $ per position</span>
            {"\n"}  maxPositions: <span className="text-orange-400">10</span>,          <span className="text-gray-500">// Max concurrent</span>
            {"\n"}  minTradeSize: <span className="text-orange-400">50</span>,          <span className="text-gray-500">// Minimum trade</span>
            {"\n"}  positionSizeRange: [<span className="text-orange-400">0.05</span>, <span className="text-orange-400">0.15</span>], <span className="text-gray-500">// 5-15% of balance</span>
            {"\n"}
            {"\n"}  <span className="text-gray-500">// Exit rules</span>
            {"\n"}  takeProfitPercent: <span className="text-orange-400">30</span>,    <span className="text-gray-500">// +30% take profit</span>
            {"\n"}  stopLossPercent: <span className="text-orange-400">-25</span>,     <span className="text-gray-500">// -25% stop loss</span>
            {"\n"}  
            {"\n"}  <span className="text-gray-500">// Market filters</span>
            {"\n"}  minPrice: <span className="text-orange-400">0.05</span>,           <span className="text-gray-500">// Skip {"<"}5% odds</span>
            {"\n"}  maxPrice: <span className="text-orange-400">0.95</span>,           <span className="text-gray-500">// Skip {">"}95% odds</span>
            {"\n"}{"}"};
          </pre>
        </div>
      </div>

      <div>
        <h3 className="font-pixel text-[10px] text-clobster-dark mb-3">EXIT CONDITIONS</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 border-2 border-green-600">
            <p className="font-pixel text-[10px] text-green-700 mb-2">TAKE PROFIT</p>
            <p className="font-mono text-3xl text-green-600 font-bold">+30%</p>
            <p className="text-[10px] font-mono text-green-600 mt-2">
              Automatically close position when unrealized P&L exceeds +30%
            </p>
          </div>
          <div className="p-4 bg-red-50 border-2 border-red-600">
            <p className="font-pixel text-[10px] text-red-700 mb-2">STOP LOSS</p>
            <p className="font-mono text-3xl text-red-600 font-bold">-25%</p>
            <p className="text-[10px] font-mono text-red-600 mt-2">
              Cut losses when position drops below -25% to protect capital
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-pixel text-[10px] text-clobster-dark mb-3">POSITION SIZING FORMULA</h3>
        <div className="bg-clobster-sky p-4 border-2 border-clobster-dark">
          <div className="font-mono text-sm text-center text-clobster-dark mb-4">
            <span className="font-bold">Position Size</span> = min(
            <span className="text-clobster-coral"> Balance × Random(5-15%)</span>,
            <span className="text-clobster-coral"> $500</span>,
            <span className="text-clobster-coral"> Available Balance</span>
            )
          </div>
          <p className="text-[10px] font-mono text-gray-600 text-center">
            Each trade uses 5-15% of available balance, capped at $500 maximum per position
          </p>
        </div>
      </div>
    </div>
  );
}

export default HowItWorksModal;
