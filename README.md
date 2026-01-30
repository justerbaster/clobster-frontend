# Clobster 🦞

Autonomous Polymarket trading bot — Vercel + Supabase.

## Deploy

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) → New Project
2. Go to **SQL Editor** → Run the contents of `supabase-schema.sql`
3. Go to **Settings** → **API** → Copy:
   - Project URL (`SUPABASE_URL`)
   - `anon` public key (`SUPABASE_ANON_KEY`)

### 2. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/justerbaster/clobster-frontend)

### 3. Add Environment Variables in Vercel

Go to Project → **Settings** → **Environment Variables**:

| Variable | Value |
|----------|-------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Your Supabase anon key |
| `INITIAL_BALANCE` | `1500` |
| `OPENAI_API_KEY` | Your OpenAI key (optional) |

### 4. Redeploy

Project → Deployments → Redeploy

---

## Features

- Real-time Polymarket analysis
- Automated trading via Vercel Cron
- PostgreSQL database (Supabase)
- AI-powered trade reasoning
- Ocean-themed pixel art UI

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Vercel Serverless Functions
- **Database:** Supabase (PostgreSQL)
- **Cron:** Vercel Cron Jobs

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard` | Full dashboard data |
| POST | `/api/analyze` | Trigger manual analysis |
| GET | `/api/cron` | Cron job (auto every 2 min) |

## Local Development

```bash
npm install
npm run dev
```

Create `.env.local`:
```
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
INITIAL_BALANCE=1500
```

## Links

- [Twitter](https://x.com/ClobsterClaude)
- [Polymarket](https://polymarket.com)

---

Built with claws and code 🦞
