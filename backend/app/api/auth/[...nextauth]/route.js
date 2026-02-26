// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { name, email, image } = user;
        try {
          const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
          const res = await fetch(`${baseUrl}/api/user`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, email, image }),
            });
          if (res.ok) {
            return user;
          }
        }

        catch (error) {
          // Handle error silently or with dedicated monitoring in production
          return false; // Stop sign-in if DB save fails
        }
      }

      return true; // Allow sign-in
    },
  },
});

export { handler as GET, handler as POST };
