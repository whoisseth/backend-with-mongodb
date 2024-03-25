/** @format */

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { getEnv } from "@/env";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = getEnv();

export default NextAuth({
  providers: [
    // OAuth authentication providers...

    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET
    }),
    // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: "NextAuth.js <no-reply@example.com>"
    // })
  ]
});
