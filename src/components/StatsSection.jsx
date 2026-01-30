function StatsSection({ stats }) {
  if (!stats) return null;

  const metrics = [
    {
      label: 'Starting Capital',
      value: `$${(stats.initial_balance || 10000).toLocaleString()}`,
      description: 'Experiment budget',
    },
    {
      label: 'Update Frequency',
      value: '2 MIN',
      description: 'Market scan interval',
    },
    {
      label: 'Max Positions',
      value: '10',
      description: 'Concurrent trades limit',
    },
    {
      label: 'Risk Per Trade',
      value: '5-15%',
      description: 'Position size range',
    },
    {
      label: 'Take Profit',
      value: '+30%',
      description: 'Profit target',
    },
    {
      label: 'Stop Loss',
      value: '-25%',
      description: 'Max loss per trade',
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-pixel text-sm text-white tracking-wider mb-2 drop-shadow-lg">PARAMETERS</h2>
          <p className="text-xs font-mono text-white/70">Trading configuration</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className="pixel-card p-4 text-center"
            >
              <p className="font-pixel text-lg text-clobster-coral">{metric.value}</p>
              <p className="text-[10px] font-mono font-bold text-clobster-dark uppercase mt-2">{metric.label}</p>
              <p className="text-[9px] font-mono text-gray-400 mt-1">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
