// Using Supabase for serverless PostgreSQL storage
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const INITIAL_BALANCE = parseFloat(process.env.INITIAL_BALANCE) || 1500;

// Initialize account if not exists
async function initAccount() {
  const { data: existing } = await supabase
    .from('account')
    .select('*')
    .eq('id', 1)
    .single();

  if (!existing) {
    const { data, error } = await supabase
      .from('account')
      .insert({
        id: 1,
        balance: INITIAL_BALANCE,
        initial_balance: INITIAL_BALANCE
      })
      .select()
      .single();
    
    if (error) console.error('Init account error:', error);
    return data;
  }
  return existing;
}

export async function getAccount() {
  const { data, error } = await supabase
    .from('account')
    .select('*')
    .eq('id', 1)
    .single();

  if (error || !data) {
    return await initAccount();
  }
  return data;
}

export async function updateBalance(newBalance) {
  const { error } = await supabase
    .from('account')
    .update({ balance: newBalance, updated_at: new Date().toISOString() })
    .eq('id', 1);
  
  if (error) console.error('Update balance error:', error);
}

export async function getPositions() {
  const { data, error } = await supabase
    .from('positions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Get positions error:', error);
    return [];
  }
  return data || [];
}

export async function getPosition(marketId, outcome) {
  const { data } = await supabase
    .from('positions')
    .select('*')
    .eq('market_id', marketId)
    .eq('outcome', outcome)
    .single();
  
  return data;
}

export async function upsertPosition(position) {
  const existing = await getPosition(position.market_id, position.outcome);
  
  if (existing) {
    const { error } = await supabase
      .from('positions')
      .update({
        shares: position.shares,
        current_price: position.current_price,
        invested: position.invested,
        updated_at: new Date().toISOString()
      })
      .eq('market_id', position.market_id)
      .eq('outcome', position.outcome);
    
    if (error) console.error('Update position error:', error);
  } else {
    const { error } = await supabase
      .from('positions')
      .insert({
        market_id: position.market_id,
        market_slug: position.market_slug,
        market_title: position.market_title,
        outcome: position.outcome,
        shares: position.shares,
        entry_price: position.entry_price,
        current_price: position.current_price,
        invested: position.invested
      });
    
    if (error) console.error('Insert position error:', error);
  }
}

export async function deletePosition(marketId, outcome) {
  const { error } = await supabase
    .from('positions')
    .delete()
    .eq('market_id', marketId)
    .eq('outcome', outcome);
  
  if (error) console.error('Delete position error:', error);
}

export async function updatePositionPrice(marketId, outcome, currentPrice) {
  const { error } = await supabase
    .from('positions')
    .update({ 
      current_price: currentPrice, 
      updated_at: new Date().toISOString() 
    })
    .eq('market_id', marketId)
    .eq('outcome', outcome);
  
  if (error) console.error('Update position price error:', error);
}

export async function getTrades(limit = 50) {
  const { data, error } = await supabase
    .from('trades')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Get trades error:', error);
    return [];
  }
  return data || [];
}

export async function addTrade(trade) {
  const { data, error } = await supabase
    .from('trades')
    .insert({
      market_id: trade.market_id,
      market_slug: trade.market_slug,
      market_title: trade.market_title,
      outcome: trade.outcome,
      action: trade.action,
      shares: trade.shares,
      price: trade.price,
      total: trade.total,
      pnl: trade.pnl || 0,
      reasoning: trade.reasoning || ''
    })
    .select()
    .single();

  if (error) {
    console.error('Add trade error:', error);
    return null;
  }
  return data?.id;
}

export async function getThoughts(limit = 20) {
  const { data, error } = await supabase
    .from('thoughts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Get thoughts error:', error);
    return [];
  }
  return data || [];
}

export async function addThought(tradeId, content) {
  // Get trade info for context
  const { data: trade } = await supabase
    .from('trades')
    .select('market_title, action, outcome')
    .eq('id', tradeId)
    .single();

  const { error } = await supabase
    .from('thoughts')
    .insert({
      trade_id: tradeId,
      content,
      market_title: trade?.market_title,
      action: trade?.action,
      outcome: trade?.outcome
    });

  if (error) console.error('Add thought error:', error);
}

export async function getStats() {
  const account = await getAccount();
  const positions = await getPositions();
  
  const { data: trades } = await supabase
    .from('trades')
    .select('*');
  
  const allTrades = trades || [];
  const completedTrades = allTrades.filter(t => t.action === 'SELL');
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
    balance: account?.balance || INITIAL_BALANCE,
    initial_balance: account?.initial_balance || INITIAL_BALANCE,
    total_pnl: totalPnl,
    unrealized_pnl: unrealizedPnl,
    total_trades: allTrades.length,
    wins,
    losses,
    win_rate: completedTrades.length > 0 ? (wins / completedTrades.length * 100).toFixed(1) : 0,
    best_trade: bestTrade,
    worst_trade: worstTrade,
    active_positions: positions.length
  };
}
