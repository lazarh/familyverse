import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Button } from "./Button";
import { Field, Input, TextArea } from "./Field";
import { Menu, MenuGroup, MenuItem, MenuSeparator, handleMenuKeyDown } from "./Menu";
import { Segmented } from "./Segmented";
import { Switch } from "./Switch";
import { Chip } from "./Chip";
import Monogram, { MONOGRAM_COLORS, monogramColor, monogramInitials } from "./Monogram";
import { Dialog } from "./Dialog";
import { EmptyState } from "./EmptyState";

// These tests stay in the node environment on purpose: markup is asserted via
// react-dom/server's renderToStaticMarkup, and event-driven behaviour (Escape,
// arrow roving) is asserted through the pure handleMenuKeyDown helper. No
// jsdom, no testing-library, no new dependencies.

describe("monogramInitials", () => {
  it("takes the first letter of the first and last word", () => {
    expect(monogramInitials("Maya Kessler")).toBe("MK");
    expect(monogramInitials("Walter Kessler")).toBe("WK");
  });

  it("trims and collapses whitespace, and uppercases", () => {
    expect(monogramInitials("  maya   kessler ")).toBe("MK");
    expect(monogramInitials("maya kessler")).toBe("MK");
  });

  it("returns a single initial for a single word", () => {
    expect(monogramInitials("Cher")).toBe("C");
    expect(monogramInitials("Walter")).toBe("W");
    expect(monogramInitials("m")).toBe("M");
  });

  it("splits hyphenated names on the hyphen only when it acts as a separator", () => {
    // two words: hyphen inside the first word must not leak an initial
    expect(monogramInitials("Jean-Luc Picard")).toBe("JP");
    expect(monogramInitials("Anne-Marie van der Berg")).toBe("AB");
    // one written word split only by the hyphen still yields two initials
    expect(monogramInitials("Jean-Luc")).toBe("JL");
    expect(monogramInitials("Jean-Luc ")).toBe("JL");
  });

  it("handles empty and whitespace-only names", () => {
    expect(monogramInitials("")).toBe("");
    expect(monogramInitials("   ")).toBe("");
    expect(monogramInitials(" - ")).toBe("");
  });
});

describe("monogramColor / MONOGRAM_COLORS", () => {
  it("has exactly 8 colours, the 7 approved ones first (DIRECTION §1)", () => {
    expect(MONOGRAM_COLORS).toHaveLength(8);
    expect(MONOGRAM_COLORS.slice(0, 7)).toEqual([
      "#8A6B3B",
      "#7A5B7E",
      "#55708E",
      "#4F6B55",
      "#9C4A2E",
      "#4E7A72",
      "#6E5F8E",
    ]);
    for (const hex of MONOGRAM_COLORS) {
      expect(hex).toMatch(/^#[0-9A-F]{6}$/);
    }
  });

  it("cycles by personId % 8", () => {
    for (let i = 0; i < MONOGRAM_COLORS.length; i++) {
      expect(monogramColor(i)).toBe(MONOGRAM_COLORS[i]);
    }
    expect(monogramColor(8)).toBe(MONOGRAM_COLORS[0]);
    expect(monogramColor(9)).toBe(MONOGRAM_COLORS[1]);
    expect(monogramColor(15)).toBe(MONOGRAM_COLORS[7]);
    expect(monogramColor(100)).toBe(MONOGRAM_COLORS[4]); // 100 % 8 = 4
  });

  it("wraps negative ids into range instead of returning undefined", () => {
    expect(monogramColor(-1)).toBe(MONOGRAM_COLORS[7]);
    expect(monogramColor(-8)).toBe(MONOGRAM_COLORS[0]);
  });
});

describe("Monogram (rendered)", () => {
  it("renders white initials on the palette colour for personId", () => {
    const html = renderToStaticMarkup(<Monogram name="Maya Kessler" personId={4} />);
    expect(html).toContain(">MK<");
    expect(html).toContain("width:44px"); // default size
    expect(html).toContain("font-size:15px"); // 44 * 0.34 ≈ 15 (prototype .mono)
    expect(html).toContain("#9C4A2E"); // palette slot 4
    expect(html).toContain('role="img"');
    expect(html).toContain('aria-label="Maya Kessler"');
  });

  it("honours a custom size", () => {
    const html = renderToStaticMarkup(<Monogram name="Theo Kessler" personId={6} size={34} />);
    expect(html).toContain("width:34px");
    expect(html).toContain("#6E5F8E");
  });

  it("can be decorative when the name sits beside it", () => {
    const html = renderToStaticMarkup(
      <Monogram name="Sam Ortega" personId={5} decorative />,
    );
    expect(html).toContain('aria-hidden="true"');
    expect(html).not.toContain('role="img"');
    expect(html).toContain(">SO<");
  });
});

describe("Button", () => {
  it("renders a button with type=button by default", () => {
    const html = renderToStaticMarkup(<Button>Add member</Button>);
    expect(html).toContain("<button");
    expect(html).toContain('type="button"');
    expect(html).toContain("Add member");
  });

  it("primary variant carries the clay fill and clay-dark hover", () => {
    const html = renderToStaticMarkup(<Button variant="primary">Go</Button>);
    expect(html).toContain("bg-[var(--clay)]");
    expect(html).toContain("hover:bg-[var(--clay-dark)]");
    expect(html).toContain("rounded-[9px]");
    expect(html).toContain("h-9"); // 36px default
  });

  it("secondary variant is card fill with a line-strong border", () => {
    const html = renderToStaticMarkup(<Button variant="secondary">Find</Button>);
    expect(html).toContain("bg-[var(--card)]");
    expect(html).toContain("border-[var(--line-strong)]");
  });

  it("ghost variant is transparent with ink-soft text", () => {
    const html = renderToStaticMarkup(<Button variant="ghost">Cancel</Button>);
    expect(html).toContain("bg-transparent");
    expect(html).toContain("text-[var(--ink-soft)]");
  });

  it("danger variant is brick text with a pale red hover", () => {
    const html = renderToStaticMarkup(<Button variant="danger">Remove</Button>);
    expect(html).toContain("text-[var(--brick)]");
    expect(html).toContain("hover:bg-[#F8ECEA]");
  });

  it("renders an identically styled <a> when href is given", () => {
    const html = renderToStaticMarkup(
      <Button variant="secondary" href="/member/1">
        Open
      </Button>,
    );
    expect(html).toContain("<a");
    expect(html).toContain('href="/member/1"');
    expect(html).not.toContain("<button");
    expect(html).toContain("bg-[var(--card)]");
    expect(html).toContain("h-9");
  });

  it("size lg is 38px (form drawer) and xl is 42px (auth card)", () => {
    expect(renderToStaticMarkup(<Button size="lg">Save</Button>)).toContain("h-[38px]");
    expect(renderToStaticMarkup(<Button size="xl">Sign in</Button>)).toContain("h-[42px]");
    expect(renderToStaticMarkup(<Button size="xl">Sign in</Button>)).toContain("font-650");
  });

  it("disabled buttons render the native disabled attribute", () => {
    const html = renderToStaticMarkup(<Button disabled>Save</Button>);
    expect(html).toContain("disabled");
  });
});

describe("Menu", () => {
  const panel = (
    <>
      <MenuGroup label="Switch family">
        <MenuItem active hint="7 people">
          The Kessler Family
        </MenuItem>
        <MenuItem href="#" hint="3 people">
          Lindqvist side
        </MenuItem>
        <MenuSeparator />
        <MenuItem danger>Sign out</MenuItem>
      </MenuGroup>
    </>
  );

  it("closed: trigger announces aria-expanded=false and no panel is rendered", () => {
    const html = renderToStaticMarkup(
      <Menu open={false} panel={panel} label="Family switcher">
        The Kessler Family
      </Menu>,
    );
    expect(html).toContain('aria-expanded="false"');
    expect(html).not.toContain('role="menu"');
    expect(html).toContain('aria-haspopup="menu"');
  });

  it("open: renders the rounded --card panel below the trigger", () => {
    const html = renderToStaticMarkup(
      <Menu open panel={panel} label="Family switcher">
        The Kessler Family
      </Menu>,
    );
    expect(html).toContain('aria-expanded="true"');
    expect(html).toContain('role="menu"');
    expect(html).toContain("min-w-[264px]");
    expect(html).toContain("bg-[var(--card)]");
    expect(html).toContain("shadow-[var(--shadow-lift)]");
    expect(html).toContain("top-[calc(100%_+_8px)]");
    expect(html).toContain("left-0");
    expect(html).toContain("The Kessler Family");
  });

  it("align=right anchors the panel to the right edge", () => {
    const html = renderToStaticMarkup(
      <Menu open align="right" panel={panel}>
        MK
      </Menu>,
    );
    expect(html).toContain("right-0");
    expect(html).not.toContain("left-0");
  });

  it("applies triggerClassName to the trigger and data-open to the wrapper", () => {
    const html = renderToStaticMarkup(
      <Menu open panel={panel} triggerClassName="family-pill">
        The Kessler Family
      </Menu>,
    );
    expect(html).toContain("family-pill");
    expect(html).toContain('data-open="true"');
  });
});

describe("MenuGroup / MenuItem / MenuSeparator markup", () => {
  it("group has role=group, aria-label and the uppercase micro-heading style", () => {
    const html = renderToStaticMarkup(
      <MenuGroup label="Signed in" sub="Maya Kessler · maya@kessler.family">
        <MenuItem>My profile</MenuItem>
      </MenuGroup>,
    );
    expect(html).toContain('role="group"');
    expect(html).toContain('aria-label="Signed in"');
    expect(html).toContain("uppercase");
    expect(html).toContain("tracking-[0.07em]");
    expect(html).toContain("Maya Kessler · maya@kessler.family");
    expect(html).toContain('role="menuitem"');
  });

  it("active item is 650-weight with a clay tick and aria-current", () => {
    const html = renderToStaticMarkup(<MenuItem active>Current family</MenuItem>);
    expect(html).toContain("font-650");
    expect(html).toContain('aria-current="true"');
    expect(html).toContain("✓");
    expect(html).toContain("text-[var(--clay)]");
  });

  it("hint sits right-aligned in muted 12px", () => {
    const html = renderToStaticMarkup(<MenuItem hint="GEDCOM · CSV">Export tree</MenuItem>);
    expect(html).toContain("GEDCOM · CSV");
    expect(html).toContain("text-[12px]");
    expect(html).toContain("text-[var(--muted)]");
  });

  it("danger item is brick with a pale red hover", () => {
    const html = renderToStaticMarkup(<MenuItem danger>Sign out</MenuItem>);
    expect(html).toContain("text-[var(--brick)]");
    expect(html).toContain("hover:bg-[#F8ECEA]");
  });

  it("href items render as anchors, others as buttons", () => {
    expect(renderToStaticMarkup(<MenuItem href="/x">Go</MenuItem>)).toContain("<a");
    expect(renderToStaticMarkup(<MenuItem>Do</MenuItem>)).toContain("<button");
  });

  it("separator is a hairline with the prototype margins", () => {
    const html = renderToStaticMarkup(<MenuSeparator />);
    expect(html).toContain("<hr");
    expect(html).toContain("border-[var(--line)]");
    expect(html).toContain("my-[6px]");
  });
});

describe("handleMenuKeyDown (Escape / arrow contract)", () => {
  it("Escape closes", () => {
    const close = vi.fn();
    const focusNext = vi.fn();
    const focusPrev = vi.fn();
    handleMenuKeyDown("Escape", { close, focusNext, focusPrev });
    expect(close).toHaveBeenCalledTimes(1);
    expect(focusNext).not.toHaveBeenCalled();
    expect(focusPrev).not.toHaveBeenCalled();
  });

  it("ArrowDown / ArrowUp rove focus", () => {
    const close = vi.fn();
    const focusNext = vi.fn();
    const focusPrev = vi.fn();
    handleMenuKeyDown("ArrowDown", { close, focusNext, focusPrev });
    handleMenuKeyDown("ArrowUp", { close, focusNext, focusPrev });
    expect(focusNext).toHaveBeenCalledTimes(1);
    expect(focusPrev).toHaveBeenCalledTimes(1);
    expect(close).not.toHaveBeenCalled();
  });

  it("ignores every other key, and handlers are optional", () => {
    const close = vi.fn();
    handleMenuKeyDown("Enter", { close });
    handleMenuKeyDown("a", { close });
    expect(close).not.toHaveBeenCalled();
    expect(() => handleMenuKeyDown("Escape", { close: vi.fn() })).not.toThrow();
  });
});

describe("Switch", () => {
  it("off: role=switch, aria-checked=false, neutral track", () => {
    const html = renderToStaticMarkup(<Switch checked={false} aria-label="Living" />);
    expect(html).toContain('role="switch"');
    expect(html).toContain('aria-checked="false"');
    expect(html).toContain("bg-[var(--line-strong)]");
    expect(html).toContain('aria-label="Living"');
    expect(html).not.toContain("translate-x-[18px]");
  });

  it("toggles on: aria-checked flips, track turns sage, knob slides right", () => {
    const html = renderToStaticMarkup(<Switch checked aria-label="Living" />);
    expect(html).toContain('aria-checked="true"');
    expect(html).toContain("bg-[var(--sage)]");
    expect(html).toContain("translate-x-[18px]");
    expect(html).toContain("w-[44px]"); // 44×26 pill
    expect(html).toContain("h-[26px]");
  });

  it("starts uncontrolled from defaultChecked", () => {
    expect(renderToStaticMarkup(<Switch defaultChecked />)).toContain('aria-checked="true"');
    expect(renderToStaticMarkup(<Switch />)).toContain('aria-checked="false"');
  });

  it("disabled switch is announced", () => {
    const html = renderToStaticMarkup(<Switch checked={false} disabled />);
    expect(html).toContain("disabled");
    expect(html).toContain("cursor-not-allowed");
  });
});

describe("Segmented", () => {
  const options = [
    { value: "f", label: "Female" },
    { value: "m", label: "Male" },
    { value: "nb", label: "Non-binary" },
    { value: "ns", label: "Not said" },
  ];

  it("is a radiogroup of real radios, each with name and value", () => {
    const html = renderToStaticMarkup(
      <Segmented options={options} value="f" onChange={() => {}} name="gender" aria-label="Gender" />,
    );
    expect(html).toContain('role="radiogroup"');
    expect(html).toContain('aria-label="Gender"');
    expect(html).toContain('type="radio"');
    expect(html).toContain('name="gender"');
    expect((html.match(/type="radio"/g) ?? []).length).toBe(4);
    expect(html).toContain('value="nb"');
  });

  it("marks exactly the selected option as checked and lifts its cell", () => {
    const html = renderToStaticMarkup(
      <Segmented options={options} value="m" onChange={() => {}} name="gender" />,
    );
    expect((html.match(/checked/g) ?? []).length).toBe(1);

    const cells = html.split("<label");
    expect(cells).toHaveLength(5);
    // cells[1] = Female (not selected), cells[2] = Male (selected)
    expect(cells[1]).toContain("text-[var(--ink-soft)]");
    expect(cells[1]).not.toContain("bg-[var(--card)]");
    expect(cells[2]).toContain("bg-[var(--card)]");
    expect(cells[2]).toContain("shadow-[0_1px_2px_rgba(60,42,24,0.14)]");
  });

  it("moves the selection when value changes", () => {
    const first = renderToStaticMarkup(
      <Segmented options={options} value="f" onChange={() => {}} name="g" />,
    );
    const second = renderToStaticMarkup(
      <Segmented options={options} value="nb" onChange={() => {}} name="g" />,
    );
    expect(first.split("<label")[1]).toContain("bg-[var(--card)]");
    expect(second.split("<label")[3]).toContain("bg-[var(--card)]");
    expect(second.split("<label")[1]).not.toContain("bg-[var(--card)]");
  });

  it("auto-generates one shared radio name when name is omitted", () => {
    const html = renderToStaticMarkup(
      <Segmented options={options} value="f" onChange={() => {}} />,
    );
    const names = Array.from(html.matchAll(/name="([^"]+)"/g)).map((m) => m[1]);
    expect(names).toHaveLength(4);
    expect(new Set(names).size).toBe(1);
  });

  it("gives each cell the focus ring driven by its hidden radio", () => {
    const html = renderToStaticMarkup(
      <Segmented options={options} value="f" onChange={() => {}} />,
    );
    expect(html).toContain("has-[:focus-visible]:outline-[var(--clay)]");
    expect(html).toContain("sr-only");
  });
});

describe("Chip", () => {
  it("living variant is sage on pale green", () => {
    const html = renderToStaticMarkup(<Chip variant="living">Living</Chip>);
    expect(html).toContain("bg-[#E9F0EA]");
    expect(html).toContain("text-[var(--sage)]");
    expect(html).toContain("rounded-full");
    expect(html).not.toContain("bg-current");
  });

  it("plain variant is warm neutral and can show a leading dot", () => {
    const html = renderToStaticMarkup(<Chip dot>Generation 3</Chip>);
    expect(html).toContain("bg-[#F4EDE3]");
    expect(html).toContain("text-[var(--ink-soft)]");
    expect(html).toContain("bg-current");
    expect(html).toContain("h-[26px]");
  });
});

describe("Field / Input / TextArea", () => {
  it("renders label above, req tag right-aligned, hint below", () => {
    const html = renderToStaticMarkup(
      <Field label="Full name" tag="req" htmlFor="fullname" hint="As it should appear in the tree.">
        <Input id="fullname" />
      </Field>,
    );
    expect(html).toContain('<label for="fullname"');
    expect(html).toContain("Full name");
    expect(html).toContain(">Required<");
    expect(html).toContain("text-[var(--clay)]"); // req tag is clay
    expect(html).toContain("As it should appear in the tree.");
    expect(html).toContain("text-[12px]"); // hint size
    expect(html).toContain("mb-[18px]");
  });

  it("opt tag is muted, and without htmlFor the label is a plain div", () => {
    const html = renderToStaticMarkup(
      <Field label="Birth place" tag="opt">
        <Input />
      </Field>,
    );
    expect(html).toContain(">Optional<");
    expect(html).toContain("text-[var(--muted)]");
    expect(html).not.toContain("<label");
  });

  it("supports custom tag wording (prototype: long opt labels)", () => {
    const html = renderToStaticMarkup(
      <Field label="Partner" tag="opt" tagText="Optional · new in this direction">
        <Input />
      </Field>,
    );
    expect(html).toContain("Optional · new in this direction");
    expect(html).toContain("text-[var(--muted)]");
  });

  it("Input carries the prototype skin: 40px, r8, line-strong border, warm placeholder", () => {
    const html = renderToStaticMarkup(<Input placeholder="you@family.example" />);
    expect(html).toContain("h-10"); // 40px
    expect(html).toContain("rounded-[8px]");
    expect(html).toContain("border-[var(--line-strong)]");
    expect(html).toContain("placeholder:text-[var(--placeholder)]");
    expect(html).toContain('placeholder="you@family.example"');
    expect(html).toContain("focus:outline-[var(--clay)]");
    expect(html).toContain("focus:outline-offset-1");
  });

  it("disabled Input uses the warm disabled fill", () => {
    const html = renderToStaticMarkup(<Input disabled value="x" readOnly />);
    expect(html).toContain("disabled:bg-[#F4EFE6]");
    expect(html).toContain("disabled");
  });

  it("TextArea is prose-sized with the same skin", () => {
    const html = renderToStaticMarkup(<TextArea rows={5} />);
    expect(html).toContain("min-h-[132px]");
    expect(html).toContain("resize-y");
    expect(html).toContain("border-[var(--line-strong)]");
    expect(html).toContain('rows="5"');
  });
});

describe("Dialog", () => {
  it("renders nothing when closed", () => {
    expect(renderToStaticMarkup(<Dialog open={false} onClose={() => {}} title="Invite" />)).toBe("");
  });

  it("renders role=dialog with a modal flag over the warm scrim when open", () => {
    const html = renderToStaticMarkup(
      <Dialog open onClose={() => {}} title="Share &amp; manage family" maxWidth={560}>
        <p>Invite people</p>
      </Dialog>,
    );
    expect(html).toContain('role="dialog"');
    expect(html).toContain('aria-modal="true"');
    expect(html).toContain("bg-[rgba(36,28,21,0.42)]");
    expect(html).toContain("rounded-[16px]");
    expect(html).toContain("shadow-[var(--shadow-lift)]");
    expect(html).toContain("max-width:560px");
    expect(html).toContain("Invite people");
    expect(html).toContain('aria-labelledby=');
  });

  it("has an Esc-capable ✕ close button labelled Close", () => {
    const html = renderToStaticMarkup(<Dialog open onClose={() => {}} title="Invite" />);
    expect(html).toContain('aria-label="Close"');
    expect(html).toContain("h-8 w-8"); // icon-btn from the prototype
  });

  it("renders the footer actions and hides the ✕ on request", () => {
    const html = renderToStaticMarkup(
      <Dialog open onClose={() => {}} title="Invite" hideCloseButton footer={<Button>Send invite</Button>}>
        body
      </Dialog>,
    );
    expect(html).toContain("Send invite");
    expect(html).not.toContain('aria-label="Close"');
    expect(html).toContain("border-t");
  });
});

describe("EmptyState", () => {
  it("renders title, body and action children in a centred dashed block", () => {
    const html = renderToStaticMarkup(
      <EmptyState title="No family members yet" body="Start with yourself.">
        <Button>Add member</Button>
      </EmptyState>,
    );
    expect(html).toContain("No family members yet");
    expect(html).toContain("Start with yourself.");
    expect(html).toContain("Add member");
    expect(html).toContain("border-dashed");
    expect(html).toContain("text-center");
    expect(html).toContain("bg-[#FAF5EC]");
  });

  it("body and action are optional", () => {
    const html = renderToStaticMarkup(<EmptyState title="Empty" />);
    expect(html).toContain("Empty");
    expect(html).not.toContain("border-t");
  });
});
