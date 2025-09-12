import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { SearchResultsPage } from '../pages/searchResultsPage.page';
import { NewsletterPage } from '../pages/newsletter.page';

test.describe('Test Hipertextual page with POM', () => {

  test('Should find a article about Reed Jobs', async ({ page }) => {
    // Initialize POM objects
    const homePage = new HomePage(page);
    const searchResultsPage = new SearchResultsPage(page);

    // Find a article about Steve Jobs and click in the first about Reed Jobs
    await homePage.navigate();
    await homePage.search('Steve Jobs');
    await searchResultsPage.clickArticleByTitle(/Reed Jobs/i);

    // Make assertions
    await expect(page).toHaveURL(/reed-jobs/);
    const articleTitle = page.locator('h1');
    await expect(articleTitle).toContainText('Reed Jobs', { ignoreCase: true });

    // Go to Newsletter page
    const newsletterPage = new NewsletterPage(page);
    const uniqueEmail = `test-user-${Date.now()}@example.com`;
    await homePage.goToNewsletterPage();

    // Subscribe to newsletter
    await page.waitForURL('**/newsletter/');
    await newsletterPage.subscribe(uniqueEmail);
  });

});