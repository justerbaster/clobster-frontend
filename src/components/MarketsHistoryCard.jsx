function MarketsHistoryCard({ trades }) {
  // Get unique markets from trades
  const marketsMap = new Map();
  
  if (trades && trades.length > 0) {
    trades.forEach(trade => {
      const key = trade.market_id;
      if (!marketsMap.has(key)) {
        marketsMap.set(key, {
          market_id: trade.market_id,
          market_slug: trade.market_slug,
          market_title: trade.market_title,
          first_trade: trade.created_at,
          last_trade: trade.created_at,
          total_trades: 1,
          total_volume: Math.abs(trade.total),
          total_pnl: trade.pnl || 0,
          outcomes: new Set([trade.outcome])
        });
      } else {
        const existing = marketsMap.get(key);
        existing.total_trades += 1;
        existing.total_volume += Math.abs(trade.total);
        existing.total_pnl += trade.pnl || 0;
        existing.outcomes.add(trade.outcome);
        if (trade.created_at > existing.last_trade) {
          existing.last_trade = trade.created_at;
        }
        if (trade.created_at < existing.first_trade) {
          existing.first_trade = trade.created_at;
        }
      }
    });
  }

  const markets = Array.from(marketsMap.values()).sort((a, b) => 
    new Date(b.last_trade) - new Date(a.last_trade)
  );

  const formatMoney = (value) => {
    const num = parseFloat(value) || 0;
    return `$${Math.abs(num).toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/Los_Angeles'
    });
  };

  if (markets.length === 0) {
    return (
      <div className="pixel-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="pixel-icon bg-clobster-sky">
            <svg className="w-4 h-4 text-clobster-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="square" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="font-pixel text-xs text-clobster-dark tracking-wider">MARKETS HISTORY</h3>
        </div>
        <div className="text-center py-8 border-2 border-dashed border-clobster-sky-dark">
          <p className="text-xs font-mono text-gray-500 uppercase">No markets visited yet</p>
          <p className="text-[10px] font-mono text-gray-400 mt-1">Waiting for first trade...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pixel-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="pixel-icon bg-clobster-sky">
            <svg className="w-4 h-4 text-clobster-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="square" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="font-pixel text-xs text-clobster-dark tracking-wider">MARKETS HISTORY</h3>
        </div>
        <span className="pixel-badge">{markets.length} MARKETS</span>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {markets.map((market, index) => {
          const pnl = market.total_pnl;
          const isProfit = pnl >= 0;

          return (
            <a
              key={market.market_id || index}
              href={`https://polymarket.com/event/${market.market_slug || market.market_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-white border-2 border-clobster-sky-dark hover:border-clobster-coral transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono font-bold text-clobster-dark line-clamp-2 group-hover:text-clobster-coral transition-colors">
                    {market.market_title}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    {Array.from(market.outcomes).map((outcome, i) => (
                      <span key={i} className="pixel-badge text-[8px]">
                        {outcome}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-2 text-[10px] font-mono text-gray-500">
                    <span>{market.total_trades} trades</span>
                    <span>Vol: {formatMoney(market.total_volume)}</span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className={`font-mono font-bold text-sm ${isProfit ? 'number-positive' : 'number-negative'}`}>
                    {pnl >= 0 ? '+' : '-'}{formatMoney(pnl)}
                  </p>
                  <p className="text-[9px] font-mono text-gray-400 mt-1">
                    {formatDate(market.last_trade)}
                  </p>
                </div>
              </div>

              {/* Link indicator */}
              <div className="flex items-center gap-1 mt-2 text-[9px] font-mono text-gray-400 group-hover:text-clobster-coral transition-colors">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="square" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>View on Polymarket</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default MarketsHistoryCard;
