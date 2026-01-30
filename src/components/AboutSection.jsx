function AboutSection() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="pixel-card p-8">
          <h2 className="font-pixel text-sm text-clobster-dark tracking-wider mb-6 flex items-center gap-3">
            <div className="pixel-icon bg-clobster-coral border-clobster-dark">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="square" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            ABOUT CLOBSTER
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-mono text-gray-700 leading-relaxed mb-4">
                Clobster is an autonomous trading bot conducting a real experiment with $1,500 allocated budget 
                on Polymarket prediction markets. Using market signals and trend analysis, Clobster identifies 
                opportunities and executes trades automatically in real-time.
              </p>
              <p className="text-sm font-mono text-gray-700 leading-relaxed">
                Watch as Clobster navigates the prediction market waters, making calculated decisions 
                and building a real track record. This is a live trading experiment to test algorithmic 
                trading strategies with actual capital at risk.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-clobster-sky border-2 border-clobster-dark">
                <div className="pixel-icon bg-blue-100 border-blue-600 flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="square" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-clobster-dark uppercase">Real-Time Analysis</p>
                  <p className="text-[11px] font-mono text-gray-600 mt-1">Markets scanned every 2 minutes</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-clobster-sky border-2 border-clobster-dark">
                <div className="pixel-icon bg-green-100 border-green-600 flex-shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="square" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-clobster-dark uppercase">Live Experiment</p>
                  <p className="text-[11px] font-mono text-gray-600 mt-1">$1,500 real budget allocated</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-clobster-sky border-2 border-clobster-dark">
                <div className="pixel-icon bg-purple-100 border-purple-600 flex-shrink-0">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="square" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-clobster-dark uppercase">AI Reasoning</p>
                  <p className="text-[11px] font-mono text-gray-600 mt-1">Explains every decision</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
