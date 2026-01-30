// Using Vercel KV (Redis) for serverless storage
// Install: npm install @vercel/kv

import { kv } from '@vercel/kv';

const INITIAL_BALANCE = parseFloat(process.env.INITIAL_BALANCE) || 1500;

// Initialize account if not exists
async function initAccount() {
  const account = await kv.get('account');
  if (!account) {
    await kv.set('account', {
      balance: INITIAL_BALANCE,
      initial_balance: INITIAL_BALANCE,
      created_at: new Date().toISOString()
    });
  }
  return await kv.get('account');
}

export async function getAccount() {
  let account = await kv.get('account');
  if (!account) {
    account = await initAccount();
  }
  return account;
}

export async function updateBalance(newBalance) {
  const account = await getAccount();
  account.balance = newBalance;
  account.updated_at = new Date().toISOString();
  await kv.set('account', account);
}

export async function getPositions() {
  const positions = await kv.get('positions') || [];
  return positions;
}

export async function getPosition(marketId, outcome) {
  const positions = await getPositions();
  return positions.find(p => p.market_id === marketId && p.outcome === outcome);
}

export async function upsertPosition(position) {
  const positions = await getPositions();
  const existingIndex = positions.findIndex(
    p => p.market_id === position.market_id && p.outcome === position.outcome
  );
  
  if (existingIndex >= 0) {
    positions[existingIndex] = {
      ...positions[existingIndex],
      ...position,
      updated_at: new Date().toISOString()
    };
  } else {
    positions.push({
      ...position,
      id: Date.now(),
      created_at: new Date().toISOString()
    });
  }
  
  await kv.set('positions', positions);
}

export async function deletePosition(marketId, outcome) {
  let positions = await getPositions();
  positions = positions.filter(
    p => !(p.market_id === marketId && p.outcome === outcome)
  );
  await kv.set('positions', positions);
}

export async function updatePositionPrice(marketId, outcome, currentPrice) {
  const positions = await getPositions();
  const position = positions.find(
    p => p.market_id === marketId && p.outcome === outcome
  );
  if (position) {
    position.current_price = currentPrice;
    position.updated_at = new Date().toISOString();
    await kv.set('positions', positions);
  }
}

export async function getTrades(limit = 50) {
  const trades = await kv.get('trades') || [];
  return trades.slice(0, limit);
}

export async function addTrade(trade) {
  const trades = await kv.get('trades') || [];
  const newTrade = {
    ...trade,
    id: Date.now(),
    created_at: new Date().toISOString()
  };
  trades.unshift(newTrade); // Add to beginning
  
  // Keep only last 100 trades
  if (trades.length > 100) {
    trades.splice(100);
  }
  
  await kv.set('trades', trades);
  return newTrade.id;
}

export async function getThoughts(limit = 20) {
  const thoughts = await kv.get('thoughts') || [];
  return thoughts.slice(0, limit);
}

export async function addThought(tradeId, content) {
  const thoughts = await kv.get('thoughts') || [];
  const trades = await getTrades(100);
  const trade = trades.find(t => t.id === tradeId);
  
  thoughts.unshift({
    id: Date.now(),
    trade_id: tradeId,
    content,
    market_title: trade?.market_title,
    action: trade?.action,
    outcome: trade?.outcome,
    created_at: new Date().toISOString()
  });
  
  // Keep only last 50 thoughts
  if (thoughts.length > 50) {
    thoughts.splice(50);
  }
  
  await kv.set('thoughts', thoughts);
}

export async function getStats() {
  const account = await getAccount();
  const trades = await kv.get('trades') || [];
  const positions = await getPositions();
  
  const completedTrades = trades.filter(t => t.action === 'SELL');
  const wins = completedTrades.filter(t => (t.pnl || 0) > 0).length;
  const losses = completedTrades.filter(t => (t.pnl || 0) < 0).length;
  const totalPnl = completedTrades.reduce((sum, t) => sum + (t.pnl || 0), 0);
  
  const unrealizedPnl = positions.reduce((sum, p) => {
    return sum + (p.shares * p.current_price - p.invested);
  }, 0);
  
  const bestTrade = completedTrades.reduce(
    (best, t) => ((t.pnl || 0) > (best?.pnl || 0) ? t : best), 
    null
  );
  const worstTrade = completedTrades.reduce(
    (worst, t) => ((t.pnl || 0) < (worst?.pnl || 0) ? t : worst), 
    null
  );
  
  return {
    balance: account.balance,
    initial_balance: account.initial_balance,
    total_pnl: totalPnl,
    unrealized_pnl: unrealizedPnl,
    total_trades: trades.length,
    wins,
    losses,
    win_rate: completedTrades.length > 0 ? (wins / completedTrades.length * 100).toFixed(1) : 0,
    best_trade: bestTrade,
    worst_trade: worstTrade,
    active_positions: positions.length
  };
}
