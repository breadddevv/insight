import { betterAuth } from "better-auth";
import { pool } from "@/utils/prisma";

export const auth = betterAuth({
  database: pool,
  socialProviders: {
    roblox: {
      clientId: process.env.ROBLOX_CLIENT_ID!,
      clientSecret: process.env.ROBLOX_CLIENT_SECRET!
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!
    }
  }
});