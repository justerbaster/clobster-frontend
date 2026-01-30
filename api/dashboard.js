import { getStats, getPositions, getTrades, getThoughts } from './_lib/db.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const stats = await getStats();
    const positions = await getPositions();
    const trades = await getTrades(20);
    const thoughts = await getThoughts(10);

    // Add P&L calculations to positions
    const positionsWithPnl = positions.map(p => ({
      ...p,
      current_value: p.shares * p.current_price,
      pnl: (p.shares * p.current_price) - p.invested,
      pnl_percent: ((p.shares * p.current_price - p.invested) / p.invested * 100).toFixed(2)
    }));

    res.status(200).json({
      stats,
      positions: positionsWithPnl,
      trades,
      thoughts,
      last_update: new Date().toISOString()
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: error.message });
  }
}
