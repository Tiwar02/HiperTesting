import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { SearchResultsPage } from '../pages/searchResultsPage.page';
import { NewsletterPage } from '../pages/newsletter.page';
import { createRandomEmail } from '../helpers/testData.helper';

test.describe('Test Hipertextual page with POM', () => {

  test('Should find a article about Reed Jobs @search', async ({ page }) => {
    // Initialize POM objects
    const homePage = new HomePage(page);
    const searchResultsPage = new SearchResultsPage(page);

    // Find a article about Steve Jobs and click in the first about Reed Jobs
    await homePage.navigate();
    await homePage.search('Steve Jobs');
    await searchResultsPage.clickArticleByTitle(/Reed Jobs/i);

    // Make assertions
    expect(searchResultsPage.getURL(), 'The URL must contain reed-jobs').toMatch(/reed-jobs/);
    await expect(await searchResultsPage.getTitle(), 'The title of the article on the page must contain “Reed Jobs”').toContainText('Reed Jobs');
  });

  test('Should subscribe to newsletter @newsletter', async ({ page }) => {
    // Initialize POM objects
    const homePage = new HomePage(page);
    const newsletterPage = new NewsletterPage(page);
    const testEmail = createRandomEmail();

    // Go to newsletter page
    await homePage.navigate();
    await homePage.goToNewsletterPage();
    
    // Make assertions and suscribe
    expect(newsletterPage.getURL(), 'The URL must contain newsletter').toMatch(/newsletter/);
    await newsletterPage.subscribe(testEmail);
    await expect(newsletterPage.successMessage, 'The success message must be visible: "¡Listo, estás suscrito!"').toBeVisible();
  })
});