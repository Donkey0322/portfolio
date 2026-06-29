import { test, expect } from "@playwright/test";

test.describe("Landing page", () => {
  test("renders the hero, navigates to About via the CTA, and shows the project cards", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /Hi, I'?m Yun-Chen Lee/i, level: 1 })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: /Three things I/i, level: 2 })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Graphics Town" })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "JobRadar" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Jovana" })).toBeVisible();

    await page.getByRole("link", { name: /wander in/i }).first().click();
    await expect(page).toHaveURL(/#about$/);
    await expect(
      page.getByRole("heading", { name: /quiet pond/i, level: 2 })
    ).toBeInViewport({ ratio: 0.1 });
  });

  test("season switcher persists the chosen palette across reloads", async ({
    page,
  }) => {
    await page.goto("/");

    await page
      .getByRole("radio", { name: /switch to autumn/i })
      .first()
      .click();

    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-season", "autumn");

    await page.reload();
    await expect(html).toHaveAttribute("data-season", "autumn");
  });

  test("résumé page renders the heading and a download link", async ({
    page,
  }) => {
    await page.goto("/resume");

    await expect(
      page.getByRole("heading", { name: /On paper, in one page/i, level: 1 })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /download pdf/i })
    ).toBeVisible();
  });
});
