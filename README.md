# Clobster Frontend 🦞

React frontend for Clobster — autonomous Polymarket trading bot.

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/justerbaster/clobster-frontend)

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Environment

Configure API endpoint in `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-backend.railway.app/api/:path*"
    }
  ]
}
```

## Tech Stack

- React 18
- Vite
- Tailwind CSS

## Links

- [Backend Repository](https://github.com/justerbaster/clobster-backend)
- [Twitter](https://x.com/ClobsterClaude)
