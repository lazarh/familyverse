import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { AuthCard, BrandMark } from "./AuthCard";

// Same precedent as ui.test.tsx: node environment, markup asserted via
// react-dom/server, no jsdom / testing-library / new dependencies. AuthCard
// renders next/link anchors; next's app-dir Link only reads the router
// context through useContext (null ⇒ prefetch off, no throw), so bare SSR
// works. AuthCard itself must render zero buttons — one primary per screen
// is the page's submit (DIRECTION §1).

/** The FIRST anchor whose tag contains `href` — in both cards the tabbar
 *  precedes the card-foot, so the first match is always the tab. */
function firstAnchorTag(html: string, href: string): string {
  const match = new RegExp(`<a[^>]*href="${href}"`).exec(html);
  if (!match) return "";
  const end = html.indexOf(">", match.index);
  return html.slice(match.index, end + 1);
}

describe("AuthCard chrome (prototype/auth.html)", () => {
  it("renders brand line, lede, trust lines and the warm arch", () => {
    const html = renderToStaticMarkup(
      <AuthCard mode="login">
        <form />
      </AuthCard>,
    );
    expect(html).toContain("Family Verse");
    expect(html).toContain("Welcome home");
    expect(html).toContain("One household, one tree");
    expect(html).toContain("Self-hosted — your data stays home");
    expect(html).toContain("Invite only the people you choose");
    // the arch is inline-styled (globals.css must stay untouched)
    expect(html).toContain("repeating-radial-gradient");
    expect(html).toContain("min(1200px,150vw)");
    // card: 16px radius, --card fill, --line border, lifted shadow
    expect(html).toContain("rounded-[16px]");
    expect(html).toContain("bg-[var(--card)]");
    expect(html).toContain("shadow-[var(--shadow-lift)]");
    // tabbar: warm trough + 4px padding
    expect(html).toContain("bg-[#F4EDE3] p-[4px]");
  });

  it("renders children (the page's form) inside the card, under the tabs", () => {
    const html = renderToStaticMarkup(
      <AuthCard mode="login">
        <form data-form="login">
          <input name="email" />
        </form>
      </AuthCard>,
    );
    expect(html).toContain('<form data-form="login"');
    expect(html).toContain('name="email"');
    expect(html.indexOf("Sign in</a>")).toBeLessThan(html.indexOf("<form"));
  });

  it("never renders a button of its own", () => {
    const html = renderToStaticMarkup(
      <AuthCard mode="register">
        <span />
      </AuthCard>,
    );
    expect(html).not.toContain("<button");
  });
});

describe("AuthCard tabs (links, active styled per prototype)", () => {
  it("login mode: Sign in tab is active (card fill + lift + aria-current), Create account is muted", () => {
    const html = renderToStaticMarkup(
      <AuthCard mode="login">
        <span />
      </AuthCard>,
    );
    const loginTab = firstAnchorTag(html, "/login");
    const registerTab = firstAnchorTag(html, "/register");

    expect(loginTab).toContain('aria-current="page"');
    expect(loginTab).toContain("bg-[var(--card)]");
    expect(loginTab).toContain("shadow-[0_1px_2px_rgba(60,42,24,0.16)]");

    expect(registerTab).not.toContain('aria-current="page"');
    expect(registerTab).toContain("text-[var(--muted)]");
    expect(registerTab).not.toContain("bg-[var(--card)]");

    // exactly one tab is lifted
    expect((html.match(/shadow-\[0_1px_2px_rgba\(60,42,24,0\.16\)\]/g) ?? []).length).toBe(1);
    expect((html.match(/aria-current="page"/g) ?? []).length).toBe(1);
  });

  it("register mode: the styling flips", () => {
    const html = renderToStaticMarkup(
      <AuthCard mode="register">
        <span />
      </AuthCard>,
    );
    const loginTab = firstAnchorTag(html, "/login");
    const registerTab = firstAnchorTag(html, "/register");

    expect(registerTab).toContain('aria-current="page"');
    expect(registerTab).toContain("bg-[var(--card)]");
    expect(loginTab).not.toContain('aria-current="page"');
    expect(loginTab).toContain("text-[var(--muted)]");
    expect(loginTab).not.toContain("bg-[var(--card)]");
  });
});

describe("AuthCard message slots and foot", () => {
  it("renders the error slot in brick with role=alert, only when passed", () => {
    const withError = renderToStaticMarkup(
      <AuthCard mode="login" error="Invalid email or password">
        <span />
      </AuthCard>,
    );
    expect(withError).toContain('role="alert"');
    expect(withError).toContain("Invalid email or password");
    expect(withError).toContain("text-[var(--brick)]");

    const without = renderToStaticMarkup(
      <AuthCard mode="login">
        <span />
      </AuthCard>,
    );
    expect(without).not.toContain('role="alert"');
  });

  it("renders the success slot in sage with role=status, only when passed", () => {
    const withSuccess = renderToStaticMarkup(
      <AuthCard mode="register" success="Registration successful!">
        <span />
      </AuthCard>,
    );
    expect(withSuccess).toContain('role="status"');
    expect(withSuccess).toContain("Registration successful!");
    expect(withSuccess).toContain("text-[var(--sage)]");

    const without = renderToStaticMarkup(
      <AuthCard mode="register">
        <span />
      </AuthCard>,
    );
    expect(without).not.toContain('role="status"');
  });

  it("shows the register footnote only on the register pane", () => {
    const register = renderToStaticMarkup(
      <AuthCard mode="register">
        <span />
      </AuthCard>,
    );
    expect(register).toContain("name your family");

    const login = renderToStaticMarkup(
      <AuthCard mode="login">
        <span />
      </AuthCard>,
    );
    expect(login).not.toContain("name your family");
  });

  it("card-foot swaps wording per mode and keeps the destinations", () => {
    const login = renderToStaticMarkup(
      <AuthCard mode="login">
        <span />
      </AuthCard>,
    );
    expect(login).toContain("New here?");
    expect(login).toContain("Create an account");
    expect(login).toContain('href="/register"');

    const register = renderToStaticMarkup(
      <AuthCard mode="register">
        <span />
      </AuthCard>,
    );
    expect(register).toContain("Already have an account?");
    expect(register).toContain("Sign in instead");
    expect(register).toContain('href="/login"');
    // foot divider (auth.html .card-foot)
    expect(register).toContain("border-t border-[var(--line)]");
  });
});

describe("BrandMark", () => {
  it("renders the clay family mark with the wordmark, linking home", () => {
    const html = renderToStaticMarkup(<BrandMark />);
    expect(html).toContain('href="/"');
    expect(html).toContain("Family Verse");
    expect(html).toContain("text-[var(--clay)]");
    expect(html).toContain('cx="12"'); // the three-circle mark
    expect(html).toContain('aria-hidden="true"');
  });

  it("accepts an extra class (callers own the 34px gap under the brand)", () => {
    const html = renderToStaticMarkup(<BrandMark className="mb-[34px]" />);
    expect(html).toContain("mb-[34px]");
  });
});
