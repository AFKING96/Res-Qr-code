# Jera Restaurant QR Ordering System

## Setup Instructions

To run locally:
1. Create a `.env.local` file in the root directory.
2. Copy the values from `.env.example` into your new `.env.local` file:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=nfbe39tj
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   ```
3. Install dependencies using `npm install`
4. Run the development server using `npm run dev`

## Tech Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Sanity.io
