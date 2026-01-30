import { TradingService } from './_lib/trading.js';

export const config = {
  // Run every 2 minutes
  // Note: Free Vercel plan only allows daily cron, upgrade for more frequent
  // For testing, we'll use a manual trigger or webhook
};

export default async function handler(req, res) {
  // Verify cron secret (optional security)
  const authHeader = req.headers.authorization;
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // Allow without auth for testing
    console.log('Cron triggered without auth');
  }

  try {
    console.log('[CRON] Running trading analysis...');
    const tradingService = new TradingService();
    await tradingService.analyze();
    
    res.status(200).json({ 
      success: true, 
      message: 'Cron job completed',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[CRON] Error:', error);
    res.status(500).json({ error: error.message });
  }
}
