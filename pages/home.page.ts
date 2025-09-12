import { type Page, type Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchToggleButton: Locator;
  readonly searchInput: Locator;
  readonly newsletterLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // Defining Selectors
    this.searchToggleButton = page.locator('#search-toggle');
    this.searchInput = page.getByRole('searchbox', { name: 'Buscar:' });
    this.newsletterLink = page.getByRole('link', { name: 'Newsletter', exact: true });
  }

  async navigate() {
    await this.page.goto('https://hipertextual.com/');
  }

  async search(text: string) {
    await this.searchToggleButton.click();
    await this.page.$eval('#header-search', el => el.style.display = 'block');
    await this.searchInput.fill(text);
    await this.searchInput.press('Enter');
  }

  async goToNewsletterPage() {
    await this.newsletterLink.click();
  }
}