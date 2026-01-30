function TradesCard({ trades }) {
  const formatMoney = (value) => {
    const num = parseFloat(value) || 0;
    return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'NOW';
    if (diffMins < 60) return `${diffMins}M`;
    if (diffHours < 24) return `${diffHours}H`;
    if (diffDays < 7) return `${diffDays}D`;
    return date.toLocaleDateString();
  };

  if (!trades || trades.length === 0) {
    return (
      <div className="pixel-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-pixel text-xs text-clobster-dark tracking-wider">TRADE LOG</h3>
        </div>
        <div className="text-center py-8 border-2 border-dashed border-clobster-sky-dark">
          <div className="w-16 h-16 mx-auto mb-3 bg-clobster-sky border-2 border-clobster-dark flex items-center justify-center">
            <svg className="w-8 h-8 text-clobster-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="square" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-xs font-mono text-gray-500 uppercase">No trades yet</p>
          <p className="text-[10px] font-mono text-gray-400 mt-1">Waiting for signals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pixel-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-pixel text-xs text-clobster-dark tracking-wider">TRADE LOG</h3>
        <span className="text-xs font-mono text-gray-500">{trades.length} TRADES</span>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
        {trades.map((trade, index) => {
          const isBuy = trade.action === 'BUY';
          const pnl = parseFloat(trade.pnl) || 0;
          const showPnl = !isBuy && pnl !== 0;

          return (
            <div 
              key={trade.id || index}
              className="p-3 bg-white border-2 border-clobster-sky-dark hover:border-clobster-dark transition-colors animate-pixel-in"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {/* Action Icon */}
                  <div className={`pixel-icon flex-shrink-0 ${
                    isBuy ? 'bg-blue-100 border-blue-600' : 'bg-purple-100 border-purple-600'
                  }`}>
                    {isBuy ? (
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="square" d="M12 4v16m8-8H4" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="square" d="M20 12H4" />
                      </svg>
                    )}
                  </div>

                  {/* Trade Info */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`pixel-badge ${isBuy ? 'pixel-badge-buy' : 'pixel-badge-sell'}`}>
                        {trade.action}
                      </span>
                      <span className="pixel-badge">
                        {trade.outcome}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400">
                        @{(trade.price * 100).toFixed(1)}c
                      </span>
                    </div>
                    <a 
                      href={`https://polymarket.com/event/${trade.market_slug || trade.market_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-clobster-dark line-clamp-1 mt-1 hover:text-clobster-coral transition-colors block"
                    >
                      {trade.market_title}
                    </a>
                    <p className="text-[10px] font-mono text-gray-400 mt-0.5">
                      {formatTime(trade.created_at)}
                    </p>
                  </div>
                </div>

                {/* Amount / P&L */}
                <div className="text-right flex-shrink-0">
                  <p className={`font-mono font-bold text-sm ${
                    showPnl 
                      ? pnl >= 0 ? 'number-positive' : 'number-negative'
                      : 'text-clobster-dark'
                  }`}>
                    {showPnl ? (
                      <>{pnl >= 0 ? '+' : ''}{formatMoney(pnl)}</>
                    ) : (
                      formatMoney(trade.total)
                    )}
                  </p>
                  {showPnl && (
                    <p className="text-[10px] font-mono text-gray-400">{formatMoney(trade.total)}</p>
                  )}
                </div>
              </div>

              {/* Reasoning */}
              {trade.reasoning && (
                <div className="mt-2 pl-11">
                  <p className="text-[10px] font-mono text-gray-500 line-clamp-2 border-l-2 border-clobster-coral pl-2">
                    {trade.reasoning}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TradesCard;
