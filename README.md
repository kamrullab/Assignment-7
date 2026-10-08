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
