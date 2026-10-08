# বাজার দর (BazarDor)

BazarDor is a responsive market-price web application for viewing the latest prices of essential products in Bangladesh. Users can browse products by category, compare price changes, inspect market-specific prices, and securely access protected product details through Better Auth.

## Live Project

- **Live website:** https://bazardors.vercel.app
- **GitHub repository:** https://github.com/kamrullab/Assignment-7

## Project Overview

The application presents everyday commodity prices in an accessible Bengali interface. It includes price risers and fallers, category-based browsing, numerical price sorting, protected product details, market comparisons, authentication, profile management, loading states, toast notifications, and responsive layouts.

## Main Features

- Responsive interface for mobile, tablet, laptop, and desktop screens
- Homepage sections for today's price increases, price decreases, and all products
- Product cards with image or emoji, category, unit, current price, and percentage change
- Category pages with low-to-high and high-to-low numerical price sorting
- Dynamic product detail routes with minimum, maximum, and average prices
- Market-based price comparison for individual products
- Protected product details and profile routes
- Email and password authentication using Better Auth
- Google and GitHub OAuth authentication
- User registration, sign-in, sign-out, and toast feedback
- Protected profile page with user-name update functionality
- Skeleton loading states for home, category, and product pages
- Friendly 404 page for unknown products, categories, and routes
- Automatic fallback to the alternative API when the primary API fails
- Active category highlighting, responsive navigation, and scrolling price ticker

## Technologies Used

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS
- Better Auth
- MongoDB and the Better Auth MongoDB adapter
- React Hot Toast
- Lucide React icons
- Vercel

## API Integration

The project uses the official BazarDor APIs.

### Primary API

```text
https://api.api-store.workers.dev/api/bazardor
```

### Alternative API

```text
https://api.abcz.workers.dev/api/bazardor
```

The primary API is requested first. If the request fails or returns an unsuccessful HTTP response, the application automatically retries the same endpoint using the alternative API.

### Endpoints

| Purpose         | Endpoint                  |
| --------------- | ------------------------- |
| All products    | `/products`               |
| Filter products | `/products?category=chal` |
| Single product  | `/products/1`             |
| All categories  | `/categories`             |
| Single category | `/categories/chal`        |

API responses are cached and revalidated every five minutes through Next.js.

## Application Routes

| Route                | Description                                  | Access    |
| -------------------- | -------------------------------------------- | --------- |
| `/`                  | Homepage with price changes and all products | Public    |
| `/category/[slug]`   | Category products and sorting                | Public    |
| `/product/[slug]`    | Product summary and market prices            | Protected |
| `/signin`            | Email/password and social sign-in            | Public    |
| `/signup`            | Account registration and social sign-in      | Public    |
| `/profile`           | Current user information                     | Protected |
| `/profile/update`    | Update the user's name                       | Protected |
| `/api/auth/[...all]` | Better Auth route handler                    | API       |

The homepage CTA scrolls to the `#all-products` section without changing routes.

## Authentication

Authentication is implemented with Better Auth and MongoDB. Supported methods are:

- Email and password
- Google OAuth
- GitHub OAuth

Email verification and password recovery are intentionally not included, following the assignment requirements.

Unauthenticated users who open protected routes are redirected to the sign-in page and receive a toast notification. Successful sign-in, registration, sign-out, profile updates, validation failures, and authentication errors also provide feedback.

## Environment Variables

Create `.env.local` in the project root. Never commit this file or share its contents.

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/bazardor
BETTER_AUTH_SECRET=YOUR_RANDOM_SECRET_OF_AT_LEAST_32_CHARACTERS
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET
```

Generate a secure Better Auth secret with Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

For production, set `BETTER_AUTH_URL` to:

```text
https://bazardors.vercel.app
```

## OAuth Callback URLs

### Local development

```text
Google: http://localhost:3000/api/auth/callback/google
GitHub: http://localhost:3000/api/auth/callback/github
```

### Production

```text
Google: https://bazardors.vercel.app/api/auth/callback/google
GitHub: https://bazardors.vercel.app/api/auth/callback/github
```

Add the Google callback URLs in Google Cloud Console under **Authorized redirect URIs**. GitHub OAuth applications support one authorization callback URL, so using separate development and production OAuth apps is recommended when both environments must work simultaneously.

## Local Installation

### Prerequisites

- Node.js 20 or newer
- npm
- MongoDB Atlas database or a compatible MongoDB instance
- Google OAuth credentials
- GitHub OAuth credentials

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/kamrullab/Assignment-7.git
   ```

2. Enter the project directory:

   ```bash
   cd Assignment-7
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Copy the environment template:

   ```bash
   cp .env.example .env.local
   ```

   On Windows PowerShell:

   ```powershell
   Copy-Item .env.example .env.local
   ```

5. Replace the placeholder values in `.env.local` with your credentials.

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open http://localhost:3000.

## Available Scripts

| Command         | Purpose                                  |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start the local development server       |
| `npm run lint`  | Run ESLint                               |
| `npm run build` | Create and validate the production build |
| `npm run start` | Start the compiled production server     |

## Deployment on Vercel

1. Import `https://github.com/kamrullab/Assignment-7` into Vercel.
2. Keep the default Next.js framework settings.
3. Add every variable from `.env.example` in **Project Settings → Environment Variables**.
4. Use `https://bazardors.vercel.app` for the production `BETTER_AUTH_URL`.
5. Add the production OAuth callback URLs to Google Cloud and GitHub Developer Settings.
6. Make sure MongoDB Atlas network access allows connections from the deployed application.
7. Deploy the `main` branch.

The project uses Next.js route handlers and server-side authentication. For Cloudflare, use the full-stack Next.js Workers/OpenNext runtime rather than a static Pages export.

## Project Structure

```text
src/
├── app/
│   ├── api/auth/[...all]/     # Better Auth handler
│   ├── category/[slug]/       # Category listing and loading UI
│   ├── product/[slug]/        # Protected product details
│   ├── profile/update/        # User-name update page
│   ├── profile/               # Protected user profile
│   ├── signin/                # Sign-in page
│   ├── signup/                # Registration page
│   ├── loading.tsx            # Homepage loading skeleton
│   ├── not-found.tsx          # Friendly 404 page
│   └── page.tsx               # Homepage
├── components/                # Shared UI and authentication components
└── lib/                       # API, authentication, database, types, and formatting
```

## Responsive and User Experience Features

- Desktop category navigation and compact mobile menu
- Horizontally usable price ticker
- Responsive product grids
- Stacked mobile hero and product layouts
- Compact authentication forms designed to fit laptop and mobile viewports
- Button hover, pressed, disabled, and animated loading states
- Bengali number and currency formatting for displayed market data

## Security Notes

- `.env.local` is ignored by Git.
- No credentials are stored in the repository.
- Never force-add environment files with `git add -f`.
- Use a unique, randomly generated Better Auth secret.
- Restrict OAuth callback URLs to trusted local and production domains.
- Rotate credentials immediately if they are accidentally exposed.

## Assignment Compliance

This project includes the basic, main, and challenge requirements from the B14 Assignment 7 specification:

- Responsive implementation
- Meaningful Git commit history
- Production deployment
- Required homepage, navigation, ticker, products, details, authentication, and footer
- Sorting with numeric price values
- Profile information update feature
- Loading skeletons, toast feedback, protected routes, and friendly 404 handling
- Complete project documentation

## Author

**Kamrul**

- GitHub: https://github.com/kamrullab
