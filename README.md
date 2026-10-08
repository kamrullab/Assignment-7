# বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের হালনাগাদ বাজারদর, মূল্য পরিবর্তন এবং বাজারভিত্তিক তুলনা দেখার একটি responsive web application।

## Technologies

- Next.js App Router, React, TypeScript
- Tailwind CSS
- Better Auth with MongoDB
- React Hot Toast and Lucide icons

## Key features

- আজকের দাম বৃদ্ধি ও হ্রাসসহ পূর্ণ পণ্য তালিকা
- বিভাগভিত্তিক filtering এবং সংখ্যাভিত্তিক price sorting
- সুরক্ষিত পণ্যের বিস্তারিত ও বাজার তুলনা
- Email/password, Google এবং GitHub authentication
- সুরক্ষিত profile এবং user-name update
- Skeleton loading, toast feedback, friendly 404 এবং responsive UI

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and provide your own credentials.
3. Run `npm run dev` and open `http://localhost:3000`.

Never commit `.env.local` or real credentials.

## Authentication configuration

Create `.env.local` from `.env.example`. Use a MongoDB database, a unique Better Auth secret, and OAuth credentials created in the Google Cloud and GitHub developer consoles.

OAuth callback URLs:

- Local Google: `http://localhost:3000/api/auth/callback/google`
- Local GitHub: `http://localhost:3000/api/auth/callback/github`
- Production: replace `http://localhost:3000` with the canonical HTTPS domain.

Set the same environment variables in the deployment dashboard. Do not commit real values.

## Deployment

- Vercel: import the repository, add environment variables, and deploy with the default Next.js settings.
- Cloudflare: this full-stack app uses route handlers and MongoDB authentication, so deploy the same repository with Cloudflare's full-stack Next.js runtime (Workers/OpenNext) rather than a static export.

## Links

- Live site: https://bazardors.vercel.app
- GitHub repository: https://github.com/kamrullab/Assignment-7
