function StatsBar({ stats }) {
  if (!stats) return null;

  const formatMoney = (value) => {
    const num = parseFloat(value) || 0;
    return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPercent = (value) => {
    const num = parseFloat(value) || 0;
    return `${num >= 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  const totalPnl = (stats.total_pnl || 0) + (stats.unrealized_pnl || 0);
  const pnlPercent = stats.initial_balance > 0 
    ? (totalPnl / stats.initial_balance) * 100 
    : 0;

  const statItems = [
    {
      label: 'PORTFOLIO',
      value: formatMoney(stats.balance + (stats.unrealized_pnl || 0)),
      subtext: `Start: ${formatMoney(stats.initial_balance)}`,
    },
    {
      label: 'TOTAL P&L',
      value: formatMoney(totalPnl),
      subtext: formatPercent(pnlPercent),
      isProfit: totalPnl >= 0,
    },
    {
      label: 'WIN RATE',
      value: `${stats.win_rate || 0}%`,
      subtext: `${stats.wins || 0}W / ${stats.losses || 0}L`,
    },
    {
      label: 'POSITIONS',
      value: stats.active_positions || 0,
      subtext: `${stats.total_trades || 0} trades`,
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <div key={index} className="pixel-card p-4">
          <p className="text-[10px] font-mono font-bold text-gray-500 tracking-wider">{item.label}</p>
          <p className={`font-pixel text-lg mt-2 ${
            item.isProfit !== undefined 
              ? item.isProfit ? 'number-positive' : 'number-negative'
              : 'text-clobster-dark'
          }`}>
            {item.value}
          </p>
          <p className={`text-xs font-mono mt-1 ${
            item.isProfit !== undefined
              ? item.isProfit ? 'number-positive' : 'number-negative'
              : 'text-gray-400'
          }`}>
            {item.subtext}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StatsBar;
