import { Locator, type Page, expect } from '@playwright/test';

export class BasePage {

  readonly page: Page;
  readonly Title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.Title = page.getByRole('heading', { level: 1 });
  }

  getURL(): string {
    return this.page.url();
  }

  async getTitle(): Promise<Locator> {
    return this.Title;
  }
  
}