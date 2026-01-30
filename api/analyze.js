import { TradingService } from './_lib/trading.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const tradingService = new TradingService();
    await tradingService.analyze();
    
    res.status(200).json({ 
      success: true, 
      message: 'Analysis complete',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: error.message });
  }
}
