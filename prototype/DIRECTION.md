# Familyverse — visual direction (ticket #6)

A reaction artifact, not a spec. Four static files, openable by double-click, no build step, no CDN:

| File | Screen | The one decision it exists to get a reaction to |
|---|---|---|
| `index.html` | Tree view | Where the four header buttons went |
| `member.html` | Member profile | A screen that doesn't exist yet — card → profile, edit is explicit |
| `form.html` | Add / edit member | Drawer instead of a centred modal |
| `auth.html` | Login / register | One tabbed card on warm paper instead of a grey page |

Sample data (the Kessler family: Walter & Ruth → Daniel & Anita → Maya, Sam, Theo) is invented for the
prototype — it is there so the type, dates and relationship lists read as a real family.

**Human reaction (recorded on ticket #6):** direction **approved**, with one amendment — members get a
**bio** field: a textarea with formatting (bold, italics, lists, quotes, links). Added to `form.html`
(editor with toolbar) and `member.html` (full-width *About* panel). The **storage format** (markdown vs
sanitized rich-text HTML) is *not* a visual decision — it is routed to the domain-model ticket (#5),
which owns the member shape.

---

## 1. Colour tokens

The opinion: **warm paper and clay — a family album on a shelf, not a SaaS dashboard.**
Every grey in the current app becomes a warm neutral; every accent becomes a pigment.

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#241C15` | Primary text (warm near-black, never `#000`) |
| `--ink-soft` | `#4B4139` | Secondary text, vital dates |
| `--muted` | `#7D7164` | Tertiary text, labels, hints |
| `--paper` | `#FBF7F0` | App background |
| `--canvas` | `#F1E9DC` | Tree canvas, with a faint 26px dot grid |
| `--card` | `#FFFEFB` | Cards, panels, drawers, menus |
| `--line` | `#E5DACA` | Hairline borders, dividers |
| `--line-strong` | `#CEC0AB` | Input borders, connector strokes (with `#C0AE93` on canvas) |
| `--clay` | `#9C4A2E` | **The** primary accent: one primary button per screen, focus rings, brand mark, links |
| `--clay-dark` | `#7F3A22` | Hover/pressed state |
| `--sage` | `#4F6B55` | "Living" chip, switch-on, success |
| `--brick` | `#A03636` | Destructive only (remove, sign out) |

Avatar monograms (stand-ins for photos): Walter `#8A6B3B`, Ruth `#7A5B7E`, Daniel `#55708E`,
Anita `#4F6B55`, Maya `#9C4A2E`, Sam `#4E7A72`, Theo `#6E5F8E` — all muted, all white initials.

**Kill list from the current UI:** `bg-blue-500` / `bg-green-500` / `bg-yellow-500` / `bg-red-500`
button rainbow, `bg-gray-50` boxes, `text-gray-800`. One accent colour, one danger colour, warm neutrals.

## 2. Type scale

`font-family: 'Geist', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`
(offline-safe: Geist if installed, system stack otherwise — nothing is fetched).

| Token | Size / line | Weight | Use |
|---|---|---|---|
| display | 34 / 1.15 | 650, `-0.02em` | Profile name |
| h1 | 26 / 1.2 | 650, `-0.015em` | Page title |
| h2 | 20 / 1.3 | 650 | Drawer title |
| h3 | 17 / 1.35 | 650 | Panel headers |
| body | 15 / 1.5 | 400 | Default text, inputs |
| sm | 13.5 / 1.5 | 400–650 | Dates, buttons, menu items |
| xs | 12 / 1.45 | 400–700 | Labels, hints; uppercase + `0.07em` for section labels only |

Two weights do all the work (400 and 650). Nothing is `font-bold` by default; nothing is uppercase except
tiny section labels.

## 3. Spacing & shape

Spacing scale (px): **4 · 8 · 12 · 16 · 24 · 32 · 48** — paddings snap to 12/16/24, sections to 24/32.

- Radii: small (inputs, buttons, menu items) `8px` · medium (person cards, panels) `12px` ·
  large (drawer, profile card, auth card) `16px` · pills `999px`.
- Shadows are warm-tinted (`rgba(60,42,24,…)`), two levels: resting card, lifted (hover / menus / drawer).
- Buttons: 36px tall (38–42px for form primaries), 9px radius, 14–15px semibold.
- Focus: `2px solid --clay` with 2px offset, everywhere.

## 4. Component vocabulary

- **Person card** — 220×96, monogram left, three lines: name / dates / birth place. Hover lifts 2px.
- **Buttons** — *primary* (clay fill, one per screen), *secondary* (card fill + line-strong border),
  *ghost* (transparent), *danger* (brick text, pale red hover).
- **Nav** — sticky 60px bar: brand mark + family switcher (left), avatar menu (right). Deliberately quiet.
- **Menu** — rounded panel under a pill/avatar trigger; grouped with uppercase micro-headings.
  Built from `<details>`, so the prototypes open and switch with **zero JavaScript**.
- **Form field** — label above (semibold, sm) + 40px input, `req`/`opt` micro-tag right-aligned, hint below.
- **Segmented control** — for gender (2–4 equal choices instead of a `<select>`).
- **Switch** — the "Living" toggle; sage when on.
- **Person picker** — selected person shown as monogram + name + role, with *Change*;
  empty state is a dashed "+ Link …" slot.
- **Bio editor** — textarea in a bordered box with a formatting toolbar row (B · I · list · quote · Link),
  hint below; profile renders it as prose in an *About* panel. Storage format: domain-model ticket (#5).
- **Drawer** — 486px right panel, sticky header + footer, scrolling body.
- **Profile card / relationship row / details list** — the profile page's three panels.
- **Chip** — pill: `living` (sage), plain (warm neutral).
- **Proto note** — the dark pill bottom-left. **Prototype chrome, delete on implementation.**

## 5. Interaction notes

**Clicking a card**

| | Today | Proposed |
|---|---|---|
| Click card | Opens the *edit* modal (you can only look at a person by editing them) | Opens `member.html` — a read-only profile |
| Edit | The modal is also the profile | Explicit **Edit profile** button on the profile → opens the drawer |
| Relationship list | Doesn't exist | Each row navigates, so you can walk the family without going back to the tree |
| Right-click / long-press | — | Out of scope here; quick actions ("add child") would live here later |

**Where the four header buttons went**

| Current button | Proposed home | Why |
|---|---|---|
| Add Family Member (blue) | **Primary button, top-right of the page header** — plus empty-tree state gets the same button | It's the only action that acts on the page you're looking at; it earns primary weight |
| Add User to Family (green) | **Family switcher → "Share & manage family"** | It acts on *the family*, not the session; grouped with rename/export |
| Remove User from Family (yellow) | **Family switcher → "Share & manage family"** (same screen) | Same reason; plus *Remove from family* on the member's own profile/drawer footer where the person is in front of you |
| Sign Out (red) | **Avatar menu (top-right)** → Sign out | Session actions live with the signed-in identity, not with the tree |

Export (new-ish) also sits in the **family switcher → Export tree (GEDCOM · CSV)** for the same reason.
Rule of thumb: *page actions on the page, family actions in the family menu, session actions in the avatar menu.*

**Sharing/export surface** — one menu entry ("Share & manage family") opening an invite screen later;
export is a menu entry with format in a hint label. Neither gets a permanent coloured button.

**Legibility of tree cards (the `Age: N` fix)**

- Living people: **`b. 14 Mar 1994`** — no age arithmetic, no number that goes stale.
- Deceased people: **`1941 – 2016`** — the range is the meaningful fact.
- Age never appears on the card. If we ever want it, it belongs on the profile page.
- Third line = birth place, because "where they're from" is half of what identifies a relative.
- Cards widen 150px → 220px and go horizontal (monogram + text) so names don't wrap.

**Relationships / partners** — partners are drawn as a horizontal bar with a small ring where a person
would be (`Walter —○— Ruth`). The legend says "partners". No marriage dates are invented: when the
domain model gets spouse/partner, the year rides on that bar. Parent-child stays a single warm line,
no arrowheads (the current child→parent arrows fight the reading direction of a family tree).

**Add/edit flow** — right-side **drawer**, not a centred modal, not a full page:
the tree stays visible behind you (you're picking *people* out of it), same field set as today,
plus a **Living** switch that disables the death-date field by default, an optional **partner** picker,
and the **bio** editor (human amendment — formatted textarea).
Saving places the card automatically — parents determine position, no drag-and-drop.

**Auth** — sign-in and register as two tabs in one centred card, warm paper with a faint concentric
arch instead of flat grey. Register's footnote previews the next step ("name your family").
No invented features (no forgot-password yet).

## 6. Left out on purpose

- **Animations** — only 120ms hover lifts; no transitions on load, no choreography.
- **Mobile / responsive** — desktop-first prototypes; the profile grid has one `max-width:880px`
  collapse for convenience, nothing more. Real responsive work happens after the direction is approved.
- **Dark mode** — left out. It is cheap to *add* later (the tokens are all CSS custom properties and
  every surface is a token), but shipping an unjudged second theme doubles the surface the human has to
  react to. Say the word and it's ~20 lines.
- **Real photos** — monograms stand in; the upload dropzone is shown once in `form.html`.
- **Search, pan/zoom behaviour, drag-and-drop, context menus, toasts, skeletons** — the zoom bar and
  "Find a person" button are placement proposals, not wired behaviour.
- **Anything out of the product's scope** — no collaboration features, no payments, no mobile app,
  no invitation emails, no accessibility audit beyond semantic markup + visible focus rings.

## 7. Where I expect pushback

1. **Drawer vs modal** — if you hate it, the fallback is a centred modal; the field layout survives either way.
2. **Actions hidden in menus** — Share/Export being one menu-click away is less discoverable than a
   green button. My position: they're used once a month, not once a visit.
3. **Card → profile** — an extra click to reach editing. The counter-offer is *Edit* in the card's
   hover state as a compromise.
4. **Warm/clay palette** — it is opinionated on purpose. Swapping `--clay` re-themes everything.
5. **Partners drawn before the model exists** — showing the bar may be premature; it's one SVG path to remove.
