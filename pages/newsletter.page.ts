import { type Page, type Locator, type FrameLocator } from '@playwright/test';

export class NewsletterPage {
  readonly page: Page;
  readonly beehiivFrame: FrameLocator;
  readonly emailInput: Locator;
  readonly subscribeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Iframe located
    this.beehiivFrame = page.locator('[data-test-id="beehiiv-embed"]').contentFrame();
    // Find elements into iframe
    this.emailInput = this.beehiivFrame.getByRole('textbox', { name: 'Escribe tu email' });
    this.subscribeButton = this.beehiivFrame.getByRole('button', { name: 'Suscríbete' });
  }

  async subscribe(email: string) {
    await this.emailInput.fill(email);
    await this.subscribeButton.click();
  }
}