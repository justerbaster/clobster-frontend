function ProfileCard({ stats }) {
  const formatMoney = (value) => {
    const num = parseFloat(value) || 0;
    return `$${num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const totalPnl = (stats?.total_pnl || 0) + (stats?.unrealized_pnl || 0);
  const pnlPercent = stats?.initial_balance > 0 
    ? (totalPnl / stats.initial_balance) * 100 
    : 0;

  return (
    <div className="pixel-card p-6 relative scanlines">
      {/* Avatar */}
      <div className="text-center mb-6">
        <div className="w-32 h-32 mx-auto bg-clobster-sky border-4 border-clobster-dark p-1 relative">
          <img 
            src="/clobster-3d.png" 
            alt="Clobster" 
            className="w-full h-full object-cover"
          />
          {/* Corner decorations */}
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-clobster-coral"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-clobster-coral"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-clobster-coral"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-clobster-coral"></div>
        </div>
        <h2 className="font-pixel text-sm text-clobster-dark mt-4 tracking-wider">CLOBSTER</h2>
        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">
          Prediction Trader
        </p>
      </div>

      {/* Stats */}
      <div className="space-y-0">
        <div className="flex justify-between items-center py-3 border-b-2 border-dashed border-clobster-sky-dark">
          <span className="text-xs font-mono text-gray-500 uppercase">Portfolio</span>
          <span className="font-mono font-bold text-clobster-dark">
            {formatMoney((stats?.balance || 0) + (stats?.unrealized_pnl || 0))}
          </span>
        </div>
        
        <div className="flex justify-between items-center py-3 border-b-2 border-dashed border-clobster-sky-dark">
          <span className="text-xs font-mono text-gray-500 uppercase">Total P&L</span>
          <span className={`font-mono font-bold ${totalPnl >= 0 ? 'number-positive' : 'number-negative'}`}>
            {totalPnl >= 0 ? '+' : ''}{formatMoney(totalPnl)}
            <span className="text-[10px] ml-1">({pnlPercent >= 0 ? '+' : ''}{pnlPercent.toFixed(1)}%)</span>
          </span>
        </div>
        
        <div className="flex justify-between items-center py-3 border-b-2 border-dashed border-clobster-sky-dark">
          <span className="text-xs font-mono text-gray-500 uppercase">Win Rate</span>
          <span className="font-mono font-bold text-clobster-dark">{stats?.win_rate || 0}%</span>
        </div>
        
        <div className="flex justify-between items-center py-3">
          <span className="text-xs font-mono text-gray-500 uppercase">Trades</span>
          <span className="font-mono font-bold text-clobster-dark">{stats?.total_trades || 0}</span>
        </div>
      </div>

      {/* Best Trade */}
      {stats?.best_trade && stats.best_trade.pnl > 0 && (
        <div className="mt-4 p-3 bg-green-50 border-2 border-green-600">
          <p className="text-[10px] font-mono font-bold text-green-700 uppercase tracking-wider">Best Trade</p>
          <p className="text-xs font-mono text-gray-700 line-clamp-2 mt-1">{stats.best_trade.market_title}</p>
          <p className="text-sm font-mono font-bold number-positive mt-1">
            +{formatMoney(stats.best_trade.pnl)}
          </p>
        </div>
      )}

      {/* Trading Status */}
      <div className="mt-4 flex items-center justify-center gap-2 py-2 bg-clobster-sky border-2 border-clobster-dark">
        <div className="status-dot"></div>
        <span className="text-[10px] font-mono font-bold text-clobster-dark uppercase tracking-wider">
          Active Trading
        </span>
      </div>
    </div>
  );
}

export default ProfileCard;
