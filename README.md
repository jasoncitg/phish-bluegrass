# Phish Out of Water

A fan-made tool to discover **bluegrass moments from Phish's live history**.

Pick an era, cast your line — and find a show where Phish played a bluegrass song.

Built with **Next.js 14**, **Tailwind CSS**, and the **[Phish.net API](https://phish.net/api)**.
Deployed on **Vercel** (Hobby tier compatible).

---

## Setup

### 1. Get a Phish.net API Key

1. Visit [phish.net/api](https://phish.net/api)
2. Request a free API key (fan registration required)
3. You'll receive the key by email

### 2. Local Development

```bash
# Clone the repo
git clone <your-repo-url>
cd phish-out-of-water

# Install dependencies
npm install

# Add your API key
cp .env.example .env.local
# Edit .env.local and set PHISH_NET_API_KEY=your_key

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 3. Deploying to Vercel

1. Push this repo to GitHub
2. Import the project at [vercel.com](https://vercel.com) (connect your GitHub)
3. In your Vercel project → **Settings → Environment Variables**:
   - Name: `PHISH_NET_API_KEY`
   - Value: your Phish.net API key
   - Environments: Production, Preview, Development
4. **Redeploy** the project

Vercel Hobby tier handles everything here — no paid plan needed.

---

## How It Works

- **Era selection** — choose from Phish's four commonly recognized eras (1.0–4.0)
- **Bluegrass song library** — curated list of covers and originals with a bluegrass character
- **Phish.net API** — fetches all live performances of each song, filters to the chosen era, picks one at random
- **24-hour caching** — API responses are cached by Next.js to be kind to Phish.net's servers
- Results link directly to the full setlist on Phish.net

---

## Song Library

**Covers**
- Ginseng Sullivan (Norman Blake)
- Uncle Pen (Bill Monroe)
- Foggy Mountain Breakdown (Flatt & Scruggs)
- Rocky Top (Osborne Brothers)
- Nellie Kane (Hot Rize)
- Old Home Place (Country Gentlemen)
- Long Journey Home (Traditional)
- Bill Bailey (Won't You Please Come Home)

**Phish Originals with Bluegrass Character**
- My Sweet One
- Poor Heart
- Dog Faced Boy
- Fast Enough for You

---

## Eras

| Era | Years | Description |
|-----|-------|-------------|
| 1.0 | 1983–2000 | Formative years through the first hiatus |
| 2.0 | 2002–2004 | Brief return before the breakup |
| 3.0 | 2009–2020 | Triumphant reunion era |
| 4.0 | 2021–Present | Post-pandemic, fully charged |

---

## Tech Stack

- [Next.js 14](https://nextjs.org) (App Router)
- [TypeScript](https://typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Phish.net API v5](https://phish.net/api)
- [Vercel](https://vercel.com)

---

*Setlist data courtesy of [Phish.net](https://phish.net), a non-commercial project run by Phish fans under the auspices of the [Mockingbird Foundation](https://mbird.org).*
