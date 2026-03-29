import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import nodemailer from "nodemailer";
import db from "@/lib/db";
import { user, session, account, verification } from "@/db/auth-schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user: u, url }) => {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'mailhog.flat.local',
        port: parseInt(process.env.SMTP_PORT || '1025'),
        secure: false,
        tls: { rejectUnauthorized: false },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'no-reply@familyverse.local',
        to: u.email,
        subject: 'Confirm your Familyverse account',
        html: `<p>Thanks for registering. Please confirm your email by clicking the link below:</p>
               <p><a href="${url}">Confirm your email</a></p>
               <p>If you did not sign up, ignore this message.</p>`,
      });
    },
  },
  baseURL: process.env.NEXTAUTH_URL || "http://localhost:3000",
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
