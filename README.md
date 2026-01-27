# Vidora — Full-Stack Video Platform

Vidora is a modern full-stack web application built with Next.js, allowing users to upload, stream, and manage videos. It includes features for user authentication, subscription management, AI-enhanced video watching, courses, chat, and more. The platform supports free and pro users, with upgrades handled via Stripe payments. Videos are stored and streamed using Cloudinary, while data is managed with MongoDB and Supabase.

## Features

- **User Authentication**: Secure login and registration via Google, email/password, powered by NextAuth.js.
- **Video Uploading and Streaming**: Upload videos with daily limits for free users; stream videos with a modern, responsive player.
- **Dashboard and Feed**: Personalized dashboard for managing uploads, and a feed for discovering content.
- **Courses and Study Tools**: Create and access courses, study materials integrated with video content.
- **AI Features**: AI-powered video analysis or enhancements (e.g., via Google Generative AI).
- **Chat and Collaboration**: Real-time chat for users.
- **Subscription System**: Free vs. Pro tiers with Stripe integration for payments and upgrades.
- **Profile and Settings**: Customize user profiles and app settings.
- **Gallery and Premium Content**: Browse galleries and access premium features.
- **Responsive UI**: Dark theme support, animations with Framer Motion, and icons from Lucide React.
- **Additional Pages**: About, Careers, Pricing for subscriptions.

## Tech Stack

| Layer          | Technology                  |
|----------------|-----------------------------|
| Frontend      | Next.js, React, Tailwind CSS, Framer Motion, Lucide React |
| Backend       | Next.js API Routes          |
| Database      | MongoDB (via Mongoose), Supabase (PostgreSQL) |
| Authentication| NextAuth.js, Bcrypt.js      |
| Video Storage | Cloudinary                  |
| Payments      | Stripe                      |
| AI            | Google Generative AI        |
| Validation    | Zod                         |
| Others        | Axios, Clsx, Tailwind Merge |

The app uses TypeScript for type safety and Turbopack for faster development and builds.

## Prerequisites

- Node.js (v20 or higher)
- Accounts and API keys for:
  - MongoDB Atlas (for database)
  - Supabase (for additional storage/database/auth)
  - Cloudinary (for video storage)
  - Stripe (for payments)
  - Google (for authentication and Generative AI)
  - NextAuth (generate secret)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Hanishsaini/nextjs-fullstack-videoUploading.git
   cd nextjs-fullstack-videoUploading
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables (replace with your actual keys):
   ```
   # MongoDB
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority

   # Supabase
   SUPABASE_URL=https://<project-id>.supabase.co
   SUPABASE_ANON_KEY=<your-anon-key>

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=<your-cloud-name>
   CLOUDINARY_API_KEY=<your-api-key>
   CLOUDINARY_API_SECRET=<your-api-secret>

   # NextAuth
   NEXTAUTH_SECRET=<generate-a-secret>  # e.g., openssl rand -base64 32
   NEXTAUTH_URL=http://localhost:3000   # Update for production

   # Google Auth
   GOOGLE_CLIENT_ID=<your-client-id>
   GOOGLE_CLIENT_SECRET=<your-client-secret>

   # Stripe
   STRIPE_SECRET_KEY=<your-secret-key>
   STRIPE_WEBHOOK_SECRET=<your-webhook-secret>

   # Google Generative AI
   GOOGLE_API_KEY=<your-api-key>

   # Optional: Other secrets as needed
   ```

4. Run the development server:
   ```
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. For production build:
   ```
   npm run build
   npm start
   ```

## Usage

- **Sign Up/Login**: Navigate to `/register` or `/login` to create an account or sign in (supports Google OAuth).
- **Upload Videos**: Go to `/upload` to upload videos (subject to daily limits for free users).
- **Dashboard**: Access `/dashboard` to view your uploads, stats, and manage content.
- **Feed and Discovery**: Browse the `/feed` for popular videos.
- **Courses**: Create or join courses at `/courses` or study at `/study`.
- **AI Watch**: View videos with AI features at `/watch/ai/[id]`.
- **Upgrade to Pro**: Visit `/pricing` or `/premium` to subscribe via Stripe.
- **Chat**: Engage in conversations at `/chat`.
- **Profile/Settings**: Customize at `/profile` and `/settings`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details (if available).

## Contact

For questions or support, open an issue on the GitHub repository.
