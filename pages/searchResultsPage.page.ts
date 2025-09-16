import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class SearchResultsPage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  getArticleLinkByTitle(title: string | RegExp): Locator {
    return this.page.getByRole('link', { name: title }).first();
  }

  async clickArticleByTitle(title: string | RegExp) {
    await this.getArticleLinkByTitle(title).click();
  }
}