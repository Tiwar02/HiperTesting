import { test, expect, Page } from '@playwright/test';

  test('should find an article about Reed Jobs and subscribe to the newsletter', async ({ page }) => {
    
    // Navigate to the specified URL.
    await page.goto('https://hipertextual.com');

    // Find the search toggle by its ID and click it.
    await page.locator('#search-toggle').click();
    // Force the search bar to be visible by changing its CSS.
    await page.$eval('#header-search', el => el.style.display = 'block');

    // Get the search input field by its accessibility role.
    const searchInput = page.getByRole("searchbox", { name: "Buscar:"});
    await expect(searchInput).toBeEditable();
    await searchInput.fill('Steve Jobs');
    await searchInput.press('Enter');

    // Find the first link containing the text "Reed Jobs".
    const reedJobsArticleLink = page.locator('a:has-text("Reed Jobs")').first();

    // Click the article link to navigate.
    await reedJobsArticleLink.click();

    // Assert that the new page URL contains "reed-jobs".
    await expect(page).toHaveURL(/reed-jobs/);

    // Locate the main title of the article, which is usually the H1 tag.
    const articleTitle = page.locator('h1');
    // Assert that the article title contains "Reed Jobs".
    await expect(articleTitle).toContainText('Reed Jobs', { ignoreCase: true });

    // Find the "Newsletter" link by its role and name, then click it.
    await page.getByRole("link", { name: "Newsletter" }).click();
    // Explicitly wait for the URL to navigate to the newsletter page.
    await page.waitForURL('**/newsletter/');

    // Locate the newsletter form's iframe and get a handle to its content.
    const emailInput = await page.locator('[data-test-id="beehiiv-embed"]').contentFrame()
    // Inside the iframe, find the email textbox and fill it with a unique email.
    await emailInput.getByRole('textbox', { name: 'Escribe tu email' }).fill(`test-user-${Date.now()}@example.com`);
    // Inside the iframe, find the subscribe button and click it.
    await emailInput.getByRole('button', { name: 'Suscríbete' }).click();

  });