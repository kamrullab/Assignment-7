# বাজার দর (BazarDor)

A responsive web application for checking the daily prices of essential products in Bangladesh.

## Live Links

- Live site: https://bazardors.vercel.app
- GitHub: https://github.com/kamrullab/Assignment-7

## Features

- View products whose prices increased or decreased today
- Browse all products and filter them by category
- Sort category products by price
- View minimum, maximum, average, and market-based prices
- Protected dynamic product details pages
- Email/password, Google, and GitHub authentication with Better Auth
- Protected profile page and name update option
- Loading skeletons, toast messages, and custom 404 page
- Responsive design for mobile, tablet, and desktop
- Automatic backup API when the primary API is unavailable

## Technologies

- Next.js 16, React 19, and TypeScript
- Tailwind CSS
- Better Auth and MongoDB
- React Hot Toast
- Lucide React
- Vercel

## APIs

Primary API:

```text
https://api.api-store.workers.dev/api/bazardor
```

Backup API:

```text
https://api.abcz.workers.dev/api/bazardor
```

The application first calls the primary API. If it fails, the same request is sent to the backup API automatically.

Main endpoints:

```text
/products
/products?category=chal
/products/1
/categories
/categories/chal
```

## Routes

| Route              | Purpose                       |
| ------------------ | ----------------------------- |
| `/`                | Homepage and product sections |
| `/category/[slug]` | Category products and sorting |
| `/product/[slug]`  | Protected product details     |
| `/signin`          | Sign in                       |
| `/signup`          | Create an account             |
| `/profile`         | Protected user profile        |
| `/profile/update`  | Update user name              |

## Environment Variables

Create `.env.local` in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Do not commit `.env.local` or share its values.

OAuth callback URLs:

```text
Local Google:  http://localhost:3000/api/auth/callback/google
Local GitHub:  http://localhost:3000/api/auth/callback/github
Google live:   https://bazardors.vercel.app/api/auth/callback/google
GitHub live:   https://bazardors.vercel.app/api/auth/callback/github
```

## Run Locally

```bash
git clone https://github.com/kamrullab/Assignment-7.git
cd Assignment-7
npm install
npm run dev
```

Open http://localhost:3000 after adding the environment variables.

## Available Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Deployment

The project is deployed on Vercel. Add the same environment variables in the Vercel project settings and use `https://bazardors.vercel.app` as the production `BETTER_AUTH_URL`.

## Author

Kamrul — https://github.com/kamrullab
