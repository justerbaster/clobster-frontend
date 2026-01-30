function PositionsCard({ positions }) {
  const formatMoney = (value) => {
    const num = parseFloat(value) || 0;
    return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPercent = (value) => {
    const num = parseFloat(value) || 0;
    return `${num >= 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  if (!positions || positions.length === 0) {
    return (
      <div className="pixel-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-pixel text-xs text-clobster-dark tracking-wider">POSITIONS</h3>
          <span className="pixel-badge">0 OPEN</span>
        </div>
        <div className="text-center py-8 border-2 border-dashed border-clobster-sky-dark">
          <div className="w-16 h-16 mx-auto mb-3 bg-clobster-sky border-2 border-clobster-dark flex items-center justify-center">
            <svg className="w-8 h-8 text-clobster-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="square" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-xs font-mono text-gray-500 uppercase">No active positions</p>
          <p className="text-[10px] font-mono text-gray-400 mt-1">Scanning markets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pixel-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-pixel text-xs text-clobster-dark tracking-wider">POSITIONS</h3>
        <span className="pixel-badge">{positions.length} OPEN</span>
      </div>

      <div className="space-y-3">
        {positions.map((position, index) => {
          const pnl = parseFloat(position.pnl) || 0;
          const pnlPercent = parseFloat(position.pnl_percent) || 0;
          const isProfit = pnl >= 0;

          return (
            <div 
              key={position.id || index}
              className="p-4 bg-white border-2 border-clobster-dark hover:bg-clobster-sky transition-colors"
            >
              {/* Market Title */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <a 
                    href={`https://polymarket.com/event/${position.market_slug || position.market_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-bold text-clobster-dark line-clamp-2 hover:text-clobster-coral transition-colors"
                  >
                    {position.market_title}
                  </a>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="pixel-badge pixel-badge-buy">
                      {position.outcome}
                    </span>
                  </div>
                </div>
                <div className={`text-right ${isProfit ? 'number-positive' : 'number-negative'}`}>
                  <p className="font-mono font-bold">{formatMoney(pnl)}</p>
                  <p className="text-xs font-mono">{formatPercent(pnlPercent)}</p>
                </div>
              </div>

              {/* Price Info */}
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div>
                  <p className="font-mono text-gray-400 uppercase text-[10px]">Entry</p>
                  <p className="font-mono font-bold text-clobster-dark">
                    {(position.entry_price * 100).toFixed(1)}c
                  </p>
                </div>
                <div>
                  <p className="font-mono text-gray-400 uppercase text-[10px]">Current</p>
                  <p className={`font-mono font-bold ${
                    position.current_price > position.entry_price ? 'number-positive' : 
                    position.current_price < position.entry_price ? 'number-negative' : 'text-clobster-dark'
                  }`}>
                    {(position.current_price * 100).toFixed(1)}c
                  </p>
                </div>
                <div>
                  <p className="font-mono text-gray-400 uppercase text-[10px]">Invested</p>
                  <p className="font-mono font-bold text-clobster-dark">{formatMoney(position.invested)}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 pixel-progress">
                <div 
                  className={`pixel-progress-fill ${isProfit ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(Math.abs(pnlPercent), 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PositionsCard;
