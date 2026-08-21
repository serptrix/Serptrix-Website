# Serptrix Website

Marketing site for Serptrix — digital growth, development, AI, and strategy.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Framer Motion / GSAP / Three.js
- Hosted on Vercel

## Prerequisites

- Node.js `>=22.13.0`

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm start
```

## Deploy on Vercel

1. Import `serptrix/Serptrix-Website` in Vercel
2. Framework preset: **Next.js**
3. Node.js version: **22.x**
4. Build command: `next build` (default)
5. Deploy

Site code lives under `app/`. Shared entities live in `content/site-data.ts`; rich division and service-page narratives live in `content/service-pages.ts`. Build-time registry validation prevents those route definitions from drifting apart.

Online project inquiries require `CONTACT_WEBHOOK_URL`. When it is absent or unavailable, the API returns an error and directs the visitor to the verified contact email instead of claiming that an undelivered inquiry was received.
