/**
 * AuthCard — the shared shell of prototype/auth.html (route table #13):
 * warm paper ground with a faint concentric arch, brand line, "Welcome home"
 * lede, and ONE card that holds the two auth modes behind tab links.
 *
 * /login and /register stay separate URLs (confirm/invite links depend on
 * them), so the tabs are plain <Link>s that navigate — there is no
 * client-side tab state in this component. The active tab is styled per the
 * prototype (card fill + lift shadow), the inactive one is muted.
 *
 * PRESENTATION ONLY. The page owns `children` (the real form) and every
 * fetch, payload key and validation rule inside it, byte for byte — this
 * component never touches them. It renders no buttons of its own: the one
 * primary Button per screen is the page's submit (DIRECTION §1).
 */
import Link from "next/link";
import type { ReactNode } from "react";

export type AuthMode = "login" | "register";

export interface AuthCardProps {
  /** Which tab is active — drives tab styling, the foot wording and the register footnote. */
  mode: AuthMode;
  /** The page's actual form (fields + the ONE primary submit), rendered inside the card under the tabs. */
  children: ReactNode;
  /** The page's error slot — above the form, brick (DIRECTION §1: brick is danger only). */
  error?: ReactNode;
  /** The page's success slot (register's confirmation note) — same position, sage. */
  success?: ReactNode;
}

/** auth.html `body::before` — the soft warm arch behind the card (no images, no CDN). */
const ARCH_BACKGROUND =
  "radial-gradient(circle at 50% 50%, rgba(156,74,46,.10) 0%, rgba(156,74,46,.05) 38%, rgba(156,74,46,0) 62%), " +
  "repeating-radial-gradient(circle at 50% 50%, rgba(140,120,95,.16) 0 1px, transparent 1px 46px)";

/** auth.html `.tabbar label` base — both tabs share it; the active one swaps to TAB_ACTIVE. */
const TAB_BASE = "flex-1 rounded-[7px] px-[6px] py-[8px] text-center text-[14px] font-650";
const TAB_ACTIVE =
  "bg-[var(--card)] text-[var(--ink)] shadow-[0_1px_2px_rgba(60,42,24,0.16)]";
const TAB_IDLE = "text-[var(--muted)] hover:text-[var(--ink)]";

/**
 * The Familyverse mark + wordmark (auth.html `.brand`). Exported for the
 * other nav-less screens (create-family, confirm) so the brand line stays
 * byte-identical across them.
 */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`relative z-10 flex items-center gap-[10px] text-[19px] font-bold tracking-[-0.02em] no-underline ${className}`}
    >
      <svg
        width="23"
        height="23"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
        className="text-[var(--clay)]"
      >
        <circle cx="12" cy="4.8" r="2.6" />
        <circle cx="5.6" cy="18.6" r="2.6" />
        <circle cx="18.4" cy="18.6" r="2.6" />
        <path d="M12 7.4v4.2M12 11.6 6.4 16.4M12 11.6l5.6 4.8" />
      </svg>
      Familyverse
    </Link>
  );
}

/** Centered auth screen: arch + brand + lede + tabbed card + trust lines. */
export function AuthCard({ mode, children, error, success }: AuthCardProps) {
  const isLogin = mode === "login";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 py-12">
      {/* Warm arch behind everything. Fixed (not absolute): sits outside the
          viewport's scrollable overflow, so it never adds scrollbars. */}
      <div
        aria-hidden="true"
        style={{
          background: ARCH_BACKGROUND,
          width: "min(1200px,150vw)",
          height: "min(1200px,150vw)",
        }}
        className="pointer-events-none fixed left-1/2 top-[-30vh] z-0 -translate-x-1/2 rounded-full"
      />

      <BrandMark className="mb-[34px]" />

      <div className="relative z-10 w-full max-w-[416px]">
        <div className="mb-[22px] text-center">
          <h1 className="text-[26px] leading-[1.2] tracking-[-0.02em]">Welcome home</h1>
          <p className="mt-[6px] text-[13.5px] text-[var(--muted)]">
            One household, one tree — hosted on your own machine.
          </p>
        </div>

        <div className="rounded-[16px] border border-[var(--line)] bg-[var(--card)] px-[26px] pb-[26px] pt-[10px] shadow-[var(--shadow-lift)]">
          <nav
            aria-label="Authentication"
            className="mb-[22px] mt-[16px] flex gap-[4px] rounded-[10px] border border-[var(--line)] bg-[#F4EDE3] p-[4px]"
          >
            <Link
              href="/login"
              aria-current={isLogin ? "page" : undefined}
              className={`${TAB_BASE} ${isLogin ? TAB_ACTIVE : TAB_IDLE}`}
            >
              Sign in
            </Link>
            <Link
              href="/register"
              aria-current={isLogin ? undefined : "page"}
              className={`${TAB_BASE} ${isLogin ? TAB_IDLE : TAB_ACTIVE}`}
            >
              Create account
            </Link>
          </nav>

          {error ? (
            <p role="alert" className="mb-[14px] text-center text-[13.5px] text-[var(--brick)]">
              {error}
            </p>
          ) : null}
          {success ? (
            <p role="status" className="mb-[14px] text-center text-[13.5px] text-[var(--sage)]">
              {success}
            </p>
          ) : null}

          {children}

          {/* DIRECTION §5: register's footnote previews the next step.
              (The login-side fine print of the prototype names a sample family
              it cannot know — omitted rather than shipped as a false claim.) */}
          {!isLogin && (
            <p className="mt-[14px] text-center text-[12px] leading-[1.6] text-[var(--muted)]">
              Next step: name your family — e.g.{" "}
              <b className="font-650 text-[var(--ink)]">The Kessler Family</b> — then start
              adding people.
            </p>
          )}

          {/* auth.html `.card-foot` — wording per mode, destinations unchanged */}
          <div className="mt-[18px] flex items-center justify-center gap-[8px] border-t border-[var(--line)] pt-[16px] text-[13.5px] text-[var(--muted)]">
            {isLogin ? (
              <>
                <span>New here?</span>
                <Link href="/register" className="font-650 text-[var(--clay)] hover:underline">
                  Create an account
                </Link>
              </>
            ) : (
              <>
                <span>Already have an account?</span>
                <Link href="/login" className="font-650 text-[var(--clay)] hover:underline">
                  Sign in instead
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-[24px] flex flex-col items-center gap-[7px] text-center text-[12px] text-[var(--muted)]">
          <span className="flex items-center gap-[6px]">
            <span className="font-bold text-[var(--sage)]">✓</span> Self-hosted — your data stays
            home
          </span>
          <span className="flex items-center gap-[6px]">
            <span className="font-bold text-[var(--sage)]">✓</span> Invite only the people you
            choose
          </span>
        </div>
      </div>
    </div>
  );
}
