import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ProjectCard from "@/components/sections/ProjectCard";
import { PROJECTS } from "@/lib/site/profile";

describe("<ProjectCard />", () => {
  it("renders all of the project's headline content", () => {
    const project = PROJECTS[0];
    render(<ProjectCard project={project} />);

    expect(screen.getByText(project.title)).toBeInTheDocument();
    expect(screen.getByText(project.tagline)).toBeInTheDocument();
    expect(screen.getByText(project.description)).toBeInTheDocument();
    project.highlights.forEach((h) => {
      expect(screen.getByText(h)).toBeInTheDocument();
    });
    project.stack.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it("flags featured projects with a Featured badge", () => {
    const featured = PROJECTS.find((p) => p.featured);
    if (!featured) throw new Error("Test fixture lost: no featured project");
    render(<ProjectCard project={featured} />);

    expect(screen.getByText(/featured/i)).toBeInTheDocument();
  });

  it("does not render Visit / Code links when no href / repo are provided", () => {
    const placeholder = PROJECTS.find((p) => p.slug === "jovana");
    if (!placeholder) throw new Error("Test fixture lost: no placeholder");
    render(<ProjectCard project={placeholder} />);

    expect(screen.queryByRole("link", { name: /visit/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /code/i })).toBeNull();
  });
});
