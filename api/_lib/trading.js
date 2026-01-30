import { PolymarketService } from './polymarket.js';
import { LLMService } from './llm.js';
import {
  getAccount, updateBalance, getPositions, getPosition,
  upsertPosition, deletePosition, updatePositionPrice,
  addTrade, addThought, getStats
} from './db.js';

export class TradingService {
  constructor() {
    this.polymarket = new PolymarketService();
    this.llm = new LLMService();
    this.maxPositionSize = 200;
    this.maxPositions = 10;
    this.minTradeSize = 30;
  }

  async analyze() {
    console.log('[Trading] Starting analysis...');
    
    await this.updatePositionPrices();
    await this.checkExits();
    await this.findNewTrades();
    
    console.log('[Trading] Analysis complete');
  }

  async updatePositionPrices() {
    const positions = await getPositions();
    if (positions.length === 0) return;
    
    console.log(`[Trading] Updating prices for ${positions.length} positions...`);
    
    const updates = await this.polymarket.updatePrices(positions);
    for (const update of updates) {
      await updatePositionPrice(update.market_id, update.outcome, update.current_price);
    }
  }

  async checkExits() {
    const positions = await getPositions();
    const account = await getAccount();
    
    for (const position of positions) {
      const currentValue = position.shares * position.current_price;
      const pnl = currentValue - position.invested;
      const pnlPercent = (pnl / position.invested) * 100;
      
      let shouldExit = false;
      let exitReason = '';
      
      if (pnlPercent >= 30) {
        shouldExit = true;
        exitReason = 'Taking profits';
      } else if (pnlPercent <= -25) {
        shouldExit = true;
        exitReason = 'Cutting losses';
      } else if (position.current_price > 0.90) {
        shouldExit = true;
        exitReason = 'Market nearly resolved';
      } else if (pnl > 0 && Math.random() < 0.05) {
        shouldExit = true;
        exitReason = 'Locking in gains';
      }
      
      if (shouldExit) {
        await this.executeSell(position, account, exitReason);
      }
    }
  }

  async executeSell(position, account, reason) {
    const currentValue = position.shares * position.current_price;
    const pnl = currentValue - position.invested;
    
    console.log(`[Trading] SELL: ${position.outcome} @ ${position.current_price.toFixed(3)} | PnL: $${pnl.toFixed(2)}`);
    
    const newBalance = account.balance + currentValue;
    await updateBalance(newBalance);
    
    const tradeId = await addTrade({
      market_id: position.market_id,
      market_slug: position.market_slug,
      market_title: position.market_title,
      outcome: position.outcome,
      action: 'SELL',
      shares: position.shares,
      price: position.current_price,
      total: currentValue,
      pnl: pnl
    });
    
    const stats = await getStats();
    const reasoning = await this.llm.generateTradeReasoning(
      'SELL',
      position.market_title,
      position.outcome,
      position.current_price,
      { ...stats, pnl, reason }
    );
    
    await addThought(tradeId, reasoning);
    console.log(`[Clobster] ${reasoning}`);
    
    await deletePosition(position.market_id, position.outcome);
  }

  async findNewTrades() {
    const positions = await getPositions();
    const account = await getAccount();
    
    if (positions.length >= this.maxPositions) {
      console.log('[Trading] Max positions reached, skipping new trades');
      return;
    }
    
    if (account.balance < this.minTradeSize * 2) {
      console.log('[Trading] Low balance, skipping new trades');
      return;
    }
    
    let trending = [], newMarkets = [];
    try {
      [trending, newMarkets] = await Promise.all([
        this.polymarket.getTrendingMarkets().catch(() => []),
        this.polymarket.getNewMarkets().catch(() => [])
      ]);
    } catch (e) {
      console.error('[Trading] Failed to fetch markets:', e);
      return;
    }
    
    const allMarkets = [...trending, ...newMarkets];
    const opportunities = this.polymarket.analyzeOpportunities(allMarkets);
    
    console.log(`[Trading] Found ${opportunities.length} opportunities`);
    
    const existingMarketIds = new Set(positions.map(p => p.market_id));
    const newOpportunities = opportunities.filter(o => !existingMarketIds.has(o.market_id));
    
    const maxNewTrades = Math.min(2, this.maxPositions - positions.length);
    const tradesToMake = newOpportunities.slice(0, maxNewTrades);
    
    for (const opportunity of tradesToMake) {
      if (Math.random() > 0.6) continue;
      
      const currentAccount = await getAccount();
      await this.executeBuy(opportunity, currentAccount);
      
      if (currentAccount.balance < this.minTradeSize) break;
    }
  }

  async executeBuy(opportunity, account) {
    const positionPercent = 0.05 + Math.random() * 0.10;
    const rawSize = account.balance * positionPercent;
    const positionSize = Math.min(rawSize, this.maxPositionSize, account.balance - this.minTradeSize);
    
    if (positionSize < this.minTradeSize) return;
    
    const shares = positionSize / opportunity.price;
    
    console.log(`[Trading] BUY: ${opportunity.outcome} @ ${opportunity.price.toFixed(3)} | $${positionSize.toFixed(2)}`);
    
    const newBalance = account.balance - positionSize;
    await updateBalance(newBalance);
    
    const tradeId = await addTrade({
      market_id: opportunity.market_id,
      market_slug: opportunity.market_slug,
      market_title: opportunity.market_title,
      outcome: opportunity.outcome,
      action: 'BUY',
      shares: shares,
      price: opportunity.price,
      total: positionSize,
      pnl: 0
    });
    
    await upsertPosition({
      market_id: opportunity.market_id,
      market_slug: opportunity.market_slug,
      market_title: opportunity.market_title,
      outcome: opportunity.outcome,
      shares: shares,
      entry_price: opportunity.price,
      current_price: opportunity.price,
      invested: positionSize
    });
    
    const stats = await getStats();
    const reasoning = await this.llm.generateTradeReasoning(
      'BUY',
      opportunity.market_title,
      opportunity.outcome,
      opportunity.price,
      { ...stats, reasons: opportunity.reasons }
    );
    
    await addThought(tradeId, reasoning);
    console.log(`[Clobster] ${reasoning}`);
  }
}
