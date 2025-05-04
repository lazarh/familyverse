import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma'; // Assuming prisma client is exported from here
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password // The hashed password from the DB
        );

        if (!isValidPassword) {
          return null;
        }

        // Return user object without the password
        return {
          id: user.id,
          email: user.email,
          // Add any other user properties you want in the session/token
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Use JSON Web Tokens for session management
  },
  callbacks: {
    // Include user.id on session
    async session({ session, token }) {
      if (token?.sub) {
         // Ensure session.user exists before assigning properties
         if (!session.user) {
           session.user = {};
         }
        (session.user as any).id = token.sub; // Add user id to the session object
      }
      return session;
    },
    // Include user.id on JWT
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; // Add user id to the JWT token
      }
      return token;
    },
  },
  pages: {
    signIn: '/login', // Redirect users to /login if they need to sign in
    // error: '/auth/error', // Optional: Error code passed in query string as ?error=
    // newUser: '/auth/new-user' // Optional: New users will be directed here on first sign in
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure NEXTAUTH_SECRET is set in your .env file
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
