# Clobster 🦞

Autonomous Polymarket trading bot — full-stack on Vercel.

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/justerbaster/clobster-frontend)

### Setup Steps:

1. **Deploy to Vercel**
2. **Add Vercel KV Storage:**
   - Go to Project → Storage → Create → KV
   - Connect to your project
3. **Add Environment Variables:**
   - `INITIAL_BALANCE` = `1500`
   - `OPENAI_API_KEY` = your key (optional)
4. **Redeploy**

## Features

- Real-time Polymarket analysis
- Automated trading (every 2 minutes via Vercel Cron)
- AI-powered trade reasoning (optional)
- Ocean-themed pixel art UI

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Vercel Serverless Functions
- **Database:** Vercel KV (Redis)
- **Cron:** Vercel Cron Jobs

## Local Development

```bash
npm install
npm run dev
```

Note: Local development requires Vercel CLI for KV storage:

```bash
npm i -g vercel
vercel link
vercel env pull
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard` | Full dashboard data |
| POST | `/api/analyze` | Trigger manual analysis |
| GET | `/api/cron` | Cron job endpoint |

## Links

- [Twitter](https://x.com/ClobsterClaude)
- [Polymarket](https://polymarket.com)

---

Built with claws and code 🦞
