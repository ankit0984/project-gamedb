import NextAuth from "next-auth";
import Nodemailer from "next-auth/providers/nodemailer";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/db";
import Credentials from "next-auth/providers/credentials";
import * as argon2 from "argon2";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),

  providers: [
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        const pwHash = await argon2.hash(credentials.password);
        user = await getUserFromDb(credentials.email, pwHash);
        if (!user) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
});
