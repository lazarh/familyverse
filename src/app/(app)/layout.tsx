import AppNav from '@/app/components/nav/AppNav';

/**
 * Layout for signed-in app screens (tree + profile): sticky nav, no auth
 * pages (those live outside this route group) — the #13 route table.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNav />
      <main>{children}</main>
    </>
  );
}
