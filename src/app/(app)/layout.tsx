import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/authOptions';
import AppNav from '@/app/components/nav/AppNav';

/**
 * Layout for signed-in app screens (tree + profile): session guard, sticky
 * nav, no auth pages (those live outside this route group) — the #13 route
 * table. API routes keep their own guards; this turns the browser around
 * before any screen code runs.
 */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  return (
    <>
      <AppNav />
      <main>{children}</main>
    </>
  );
}
