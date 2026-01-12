<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# Vidora - Fullstack Video Uploading Platform

A modern, full-stack video uploading platform built with Next.js 15, MongoDB, Cloudinary, and Stripe.

## Features

-   **User Authentication**: Secure login with Google (NextAuth.js).
-   **Video Uploading**: Upload videos to Cloudinary with daily limits for free users.
-   **Video Playback**: Stream videos with a modern player.
-   **Pro Subscription**: Upgrade to Pro via Stripe for unlimited uploads and badges.
-   **Responsive Design**: Beautiful, dark-themed UI with smooth animations.

## Getting Started

### Prerequisites

-   Node.js 18+
-   MongoDB Atlas URI
-   Cloudinary Account
-   Stripe Account
-   Google Cloud Console Project (for OAuth)

### Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/vidora

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_super_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/vidora.git
    cd vidora
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser.

### Stripe Webhook Setup (Local Development)

To test payments locally, you need to forward Stripe webhooks to your local server:

1.  Install the Stripe CLI.
2.  Login: `stripe login`
3.  Listen for events:
    ```bash
    stripe listen --forward-to localhost:3000/api/webhook/stripe
    ```
4.  Copy the webhook signing secret (`whsec_...`) to your `.env.local` file.

## Deployment

Deploy easily on [Vercel](https://vercel.com). Remember to add all environment variables in the Vercel dashboard.
