import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, beforeEach, vi } from "vitest";

import SeasonSwitcher from "@/components/nav/SeasonSwitcher";
import { STORAGE_KEY } from "@/lib/season/types";
import { SeasonProvider } from "@/providers/season";

// Framer-motion uses `IntersectionObserver` and other browser APIs the polyfills
// in setup.ts already cover. We additionally stub `localStorage` per-test below
// so persistence can be asserted.

describe("<SeasonSwitcher />", () => {
  beforeEach(() => {
    document.documentElement.removeAttribute("data-season");
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("renders all four season options as radio buttons", () => {
    render(
      <SeasonProvider>
        <SeasonSwitcher />
      </SeasonProvider>
    );

    const buttons = screen.getAllByRole("radio");
    expect(buttons).toHaveLength(4);
    ["Spring", "Summer", "Autumn", "Winter"].forEach((label) => {
      expect(
        screen.getByRole("radio", { name: `Switch to ${label}` })
      ).toBeInTheDocument();
    });
  });

  it("persists the chosen season into localStorage and onto html[data-season]", () => {
    render(
      <SeasonProvider>
        <SeasonSwitcher />
      </SeasonProvider>
    );

    const winter = screen.getByRole("radio", { name: "Switch to Winter" });
    fireEvent.click(winter);

    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("winter");
    expect(document.documentElement.getAttribute("data-season")).toBe("winter");
    expect(winter.getAttribute("aria-checked")).toBe("true");
  });
});
