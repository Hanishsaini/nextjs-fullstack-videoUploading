
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import User from "@/models/Users";
import { connectToDatabase } from "@/lib/db";

export const authOptions: AuthOptions = {
  providers: [
    // ✅ Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // ✅ Credentials (Email + Password)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();

        const user = await User.findOne({ email: credentials?.email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      // Handle Google OAuth sign in
      if (account?.provider === "google") {
        try {
          await connectToDatabase();

          // Check if user exists
          let existingUser = await User.findOne({ email: user.email });

          // Create user if doesn't exist
          if (!existingUser) {
            existingUser = await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              password: "", // No password for OAuth users
            });
          }

          return true;
        } catch (error) {
          console.error("Error in Google sign in:", error);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      // Fetch latest user data to get isPro status
      if (token.email) {
        try {
          await connectToDatabase();
          const dbUser = await User.findOne({ email: token.email });
          if (dbUser) {
            token.isPro = dbUser.isPro;
            token.id = dbUser._id.toString();
          }
        } catch (error) {
          console.error("Error fetching user data in JWT callback:", error);
          // Keep token as is, don't crash
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.isPro = token.isPro as boolean;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
