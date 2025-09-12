import { type Page, type Locator } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getArticleLinkByTitle(title: string | RegExp): Locator {
    return this.page.getByRole('link', { name: title }).first();
  }

  async clickArticleByTitle(title: string | RegExp) {
    await this.getArticleLinkByTitle(title).click();
  }
}