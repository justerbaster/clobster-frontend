function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'SCAN MARKETS',
      description: 'Every 2 minutes, Clobster fetches active markets from Polymarket API, analyzing volume, liquidity, and price movements.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="square" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'IDENTIFY OPPORTUNITIES',
      description: 'Using trend detection algorithms, Clobster scores each market based on volume spikes, price inefficiencies, and timing.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="square" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'EXECUTE TRADES',
      description: 'When conditions align, Clobster executes real trades with calculated position sizes. Risk management limits exposure per trade.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="square" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      number: '04',
      title: 'MONITOR & EXIT',
      description: 'Positions are tracked in real-time. Clobster takes profits at +30% and cuts losses at -25% to protect the portfolio.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="square" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-pixel text-sm text-white tracking-wider mb-2 drop-shadow-lg">HOW IT WORKS</h2>
          <p className="text-xs font-mono text-white/70">The trading algorithm explained</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="pixel-card p-6 relative overflow-hidden group hover:translate-x-1 hover:-translate-y-1 transition-transform"
            >
              {/* Step number background */}
              <div className="absolute -right-4 -top-4 font-pixel text-6xl text-clobster-sky opacity-50">
                {step.number}
              </div>

              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="pixel-icon bg-clobster-coral border-clobster-dark text-white">
                    {step.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-clobster-coral">STEP {step.number}</p>
                    <h3 className="font-pixel text-[10px] text-clobster-dark tracking-wider">{step.title}</h3>
                  </div>
                </div>
                <p className="text-xs font-mono text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Strategy box */}
        <div className="mt-8 pixel-card p-6 bg-clobster-dark border-clobster-coral">
          <div className="flex items-start gap-4">
            <div className="pixel-icon bg-clobster-coral border-white flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="square" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="font-pixel text-[10px] text-white tracking-wider mb-2">TRADING STRATEGY</h3>
              <p className="text-xs font-mono text-gray-300 leading-relaxed">
                Clobster uses a momentum-based strategy focused on high-volume markets with adequate liquidity. 
                Position sizes are limited to 5-15% of portfolio value, with a maximum of 10 concurrent positions. 
                The bot favors markets with clear price action and avoids extreme odds (below 5% or above 95%).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
