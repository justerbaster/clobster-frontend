const GAMMA_API = 'https://gamma-api.polymarket.com';

export class PolymarketService {
  async getActiveMarkets(limit = 50) {
    const response = await fetch(
      `${GAMMA_API}/markets?limit=${limit}&active=true&closed=false`
    );
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
  }

  async getMarketById(marketId) {
    const response = await fetch(`${GAMMA_API}/markets/${marketId}`);
    if (!response.ok) throw new Error(`Market not found: ${marketId}`);
    return response.json();
  }

  async getTrendingMarkets() {
    const response = await fetch(
      `${GAMMA_API}/markets?limit=30&active=true&closed=false&order=volume24hr&ascending=false`
    );
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
  }

  async getNewMarkets() {
    const response = await fetch(
      `${GAMMA_API}/markets?limit=20&active=true&closed=false&order=startDate&ascending=false`
    );
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
  }

  analyzeOpportunities(markets) {
    const opportunities = [];

    for (const market of markets) {
      if (!market.outcomes || market.outcomes.length < 2) continue;
      
      const volume24h = parseFloat(market.volume24hr) || 0;
      const liquidity = parseFloat(market.liquidity) || 0;
      const outcomePrices = this.parseOutcomePrices(market);
      
      if (!outcomePrices) continue;

      for (const [outcome, price] of Object.entries(outcomePrices)) {
        const opportunity = this.evaluateOpportunity(market, outcome, price, volume24h, liquidity);
        if (opportunity) opportunities.push(opportunity);
      }
    }

    return opportunities.sort((a, b) => b.score - a.score);
  }

  parseOutcomePrices(market) {
    try {
      if (market.outcomePrices) {
        const prices = JSON.parse(market.outcomePrices);
        const outcomes = JSON.parse(market.outcomes);
        const result = {};
        outcomes.forEach((outcome, i) => {
          result[outcome] = parseFloat(prices[i]) || 0;
        });
        return result;
      }
      
      if (market.tokens && market.tokens.length > 0) {
        const result = {};
        for (const token of market.tokens) {
          result[token.outcome] = parseFloat(token.price) || 0;
        }
        return result;
      }

      return null;
    } catch (e) {
      return null;
    }
  }

  evaluateOpportunity(market, outcome, price, volume24h, liquidity) {
    if (price < 0.05 || price > 0.95) return null;
    
    let score = 0;
    const reasons = [];

    if (volume24h > 10000) {
      score += 20;
      reasons.push('High trading volume');
    } else if (volume24h > 1000) {
      score += 10;
      reasons.push('Moderate trading volume');
    }

    if (liquidity > 50000) {
      score += 15;
      reasons.push('High liquidity');
    } else if (liquidity > 10000) {
      score += 8;
      reasons.push('Adequate liquidity');
    }

    if (price >= 0.20 && price <= 0.40) {
      score += 25;
      reasons.push('Undervalued opportunity');
    } else if (price >= 0.60 && price <= 0.80) {
      score += 20;
      reasons.push('High probability play');
    } else if (price >= 0.40 && price <= 0.60) {
      score += 15;
      reasons.push('Balanced odds');
    }

    if (market.endDate) {
      const daysToEnd = (new Date(market.endDate) - new Date()) / (1000 * 60 * 60 * 24);
      if (daysToEnd > 1 && daysToEnd < 30) {
        score += 10;
        reasons.push('Active timeframe');
      }
    }

    if (score < 30) return null;

    return {
      market_id: market.id,
      market_slug: market.slug || market.id,
      market_title: market.question || market.title,
      outcome,
      price,
      volume24h,
      liquidity,
      endDate: market.endDate,
      score,
      reasons
    };
  }

  async updatePrices(positions) {
    const updates = [];
    
    for (const position of positions) {
      try {
        const market = await this.getMarketById(position.market_id);
        const prices = this.parseOutcomePrices(market);
        
        if (prices && prices[position.outcome] !== undefined) {
          updates.push({
            market_id: position.market_id,
            outcome: position.outcome,
            current_price: prices[position.outcome]
          });
        }
      } catch (error) {
        console.error(`Failed to update price for ${position.market_id}:`, error);
      }
    }
    
    return updates;
  }
}
