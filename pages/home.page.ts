import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly searchToggleButton: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.searchToggleButton = page.locator('#search-toggle');
    this.searchInput = page.getByRole('searchbox', { name: 'Buscar:' });
  }

  async search(text: string) {
    await this.searchToggleButton.click();
    await this.page.$eval('#header-search', el => el.style.display = 'block');
    await this.searchInput.fill(text);
    await this.searchInput.press('Enter');
  }
}