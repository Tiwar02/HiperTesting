import { Locator, type Page, expect } from '@playwright/test';

export class BasePage {

  protected readonly page: Page;
  readonly title: Locator;
  readonly newsletterLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole('heading', { level: 1 });
    this.newsletterLink = page.getByRole('link', { name: 'Newsletter', exact: true });
  }

  getURL(): string {
    return this.page.url();
  }

  async getTitle(): Promise<Locator> {
    return this.title;
  }

  async navigate() {
    await this.page.goto('/'); // Uses baseURL from config
  }
  
  async goToNewsletterPage() {
    await this.newsletterLink.click();
  }
}