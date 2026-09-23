import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

// #20 D1: no adapter — the strategy is JWT (credentials-only) and the schema
// has no Account/Session tables, so the next-auth Prisma adapter wiring was
// dead weight.
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          console.error('Missing email or password in credentials');
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (user && credentials?.password && await bcrypt.compare(credentials.password, user.password)) {
            // Require email confirmation. #20 D7: an unconfirmed account fails
            // with the SAME generic outcome as bad credentials (below) — the
            // message stays "Invalid email or password", no enumeration hint.
            if (!user.isConfirmed) {
              console.warn('Attempted login for unconfirmed email:', user.email);
              return null;
            }
            return { id: String(user.id), email: user.email };
          } else {
            return null;
          }
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    // #20 (D7): session lifetime written EXPLICITLY — 30 days. next-auth's
    // default happens to be 30 days too, but the decision record wants the
    // value on the page instead of implicit.
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id: string; email?: string | null }).id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
