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
   console.log("Consoling the user from route.js:", user);
  console.log("Consoling the Account:", account);

      if (account.provider === "google") {
        const { name, email,image } = user;
        try {
         const res= await fetch("http://localhost:3000/api/user", 
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email,image }),
          });
          if(res.ok)
          {
            return user;
          }
        } 
        
        catch (error) {
          console.error("Error saving user to DB:", error);
          return false; // Stop sign-in if DB save fails
        }
      }

      return true; // Allow sign-in
    },
  },
});

export { handler as GET, handler as POST };
