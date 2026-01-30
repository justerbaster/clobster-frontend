function ThoughtsCard({ thoughts }) {
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'NOW';
    if (diffMins < 60) return `${diffMins}M`;
    if (diffHours < 24) return `${diffHours}H`;
    return date.toLocaleDateString();
  };

  if (!thoughts || thoughts.length === 0) {
    return (
      <div className="pixel-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="pixel-icon bg-clobster-sky">
            <svg className="w-4 h-4 text-clobster-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="square" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="font-pixel text-xs text-clobster-dark tracking-wider">THOUGHTS</h3>
        </div>
        <div className="text-center py-6 border-2 border-dashed border-clobster-sky-dark">
          <p className="text-xs font-mono text-gray-500">Analyzing markets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pixel-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="pixel-icon bg-clobster-sky">
          <svg className="w-4 h-4 text-clobster-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="square" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="font-pixel text-xs text-clobster-dark tracking-wider">THOUGHTS</h3>
      </div>

      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
        {thoughts.map((thought, index) => (
          <div 
            key={thought.id || index}
            className="relative pl-4 border-l-4 border-clobster-coral"
          >
            {/* Trade context */}
            {thought.action && (
              <div className="flex items-center gap-2 mb-1">
                <span className={`pixel-badge text-[8px] ${
                  thought.action === 'BUY' ? 'pixel-badge-buy' : 'pixel-badge-sell'
                }`}>
                  {thought.action}
                </span>
                <span className="text-[10px] font-mono text-gray-400 uppercase">{thought.outcome}</span>
              </div>
            )}

            {/* Thought content */}
            <p className="text-xs font-mono text-clobster-dark leading-relaxed">
              {thought.content}
            </p>

            {/* Market reference */}
            {thought.market_title && (
              <p className="text-[10px] font-mono text-gray-400 mt-1 line-clamp-1">
                RE: {thought.market_title}
              </p>
            )}

            {/* Time */}
            <p className="text-[10px] font-mono text-gray-400 mt-1">
              {formatTime(thought.created_at)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThoughtsCard;
