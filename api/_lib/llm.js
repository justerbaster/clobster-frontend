export class LLMService {
  constructor() {
    this.enabled = !!process.env.OPENAI_API_KEY;
  }

  async generateTradeReasoning(action, market, outcome, price, context = {}) {
    if (!this.enabled) {
      return this.getFallbackReasoning(action, market, outcome, price, context);
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are Clobster, a savvy lobster trader on Polymarket. You speak in first person, are confident but not arrogant, and explain your trades in a clear, engaging way. Keep responses to 2-3 sentences.'
            },
            {
              role: 'user',
              content: this.buildPrompt(action, market, outcome, price, context)
            }
          ],
          max_tokens: 150,
          temperature: 0.8
        })
      });

      const data = await response.json();
      return data.choices?.[0]?.message?.content || this.getFallbackReasoning(action, market, outcome, price, context);
    } catch (error) {
      console.error('LLM error:', error);
      return this.getFallbackReasoning(action, market, outcome, price, context);
    }
  }

  buildPrompt(action, market, outcome, price, context) {
    const actionText = action === 'BUY' ? 'buying' : 'selling';
    const pricePercent = (price * 100).toFixed(0);
    
    let prompt = `Explain why you're ${actionText} "${outcome}" at ${pricePercent}% on this market: "${market}"`;
    
    if (context.reasons?.length > 0) {
      prompt += `\n\nMarket signals: ${context.reasons.join(', ')}`;
    }
    
    if (context.pnl !== undefined) {
      const pnlText = context.pnl >= 0 ? `profit of $${context.pnl.toFixed(2)}` : `loss of $${Math.abs(context.pnl).toFixed(2)}`;
      prompt += `\n\nThis trade resulted in a ${pnlText}.`;
    }

    return prompt;
  }

  getFallbackReasoning(action, market, outcome, price, context) {
    const pricePercent = (price * 100).toFixed(0);
    const reasonings = {
      BUY: [
        `I'm taking a position on "${outcome}" at ${pricePercent}%. The volume and price action here caught my attention.`,
        `Picking up "${outcome}" shares at ${pricePercent}%. Market sentiment seems to be shifting in this direction.`,
        `Going in on "${outcome}" at ${pricePercent}%. The risk/reward here looks favorable for my portfolio.`,
        `Adding "${outcome}" to my positions at ${pricePercent}%. My analysis suggests this might be undervalued.`,
        `Buying "${outcome}" at ${pricePercent}%. The market dynamics here are interesting.`
      ],
      SELL: [
        `Taking profits on "${outcome}" at ${pricePercent}%. Time to lock in these gains.`,
        `Closing my "${outcome}" position at ${pricePercent}%. The trade has played out well.`,
        `Exiting "${outcome}" at ${pricePercent}%. Always good to secure profits when available.`,
        `Selling "${outcome}" at ${pricePercent}%. Market conditions have changed since I entered.`
      ]
    };

    const options = reasonings[action] || reasonings.BUY;
    return options[Math.floor(Math.random() * options.length)];
  }
}
