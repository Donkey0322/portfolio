import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import About from "@/components/sections/About";
import { PROFILE } from "@/lib/site/profile";

describe("<About />", () => {
  it("renders the bio summary, name, and contact links", () => {
    render(<About />);

    expect(
      screen.getByRole("heading", { level: 2 })
    ).toHaveTextContent(/quiet pond/i);
    expect(screen.getByText(PROFILE.summary)).toBeInTheDocument();
    expect(screen.getByText(PROFILE.education[0].degree)).toBeInTheDocument();

    PROFILE.contact.forEach((c) => {
      // Each contact appears at least once in the card body.
      const label = screen.getAllByText(c.label).length;
      expect(label).toBeGreaterThan(0);
    });
  });

  it("provides a downloadable resume link with a friendly filename", () => {
    render(<About />);
    const resumeLinks = screen
      .getAllByRole("link", { name: /résumé|resume/i })
      .filter((el) => el.getAttribute("download"));
    expect(resumeLinks.length).toBeGreaterThan(0);
    expect(resumeLinks[0]).toHaveAttribute(
      "download",
      "Yun-Chen-Lee-Resume.pdf"
    );
  });
});
