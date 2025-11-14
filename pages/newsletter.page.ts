import { type Page, type Locator, type FrameLocator } from '@playwright/test';
import { BasePage } from './base.page';

export class NewsletterPage extends BasePage {
  readonly beehiivFrame: FrameLocator;
  readonly emailInput: Locator;
  readonly subscribeButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    // Iframe located
    this.beehiivFrame = page.locator('[data-test-id="beehiiv-embed"]').contentFrame();
    // Find elements into iframe
    this.emailInput = this.beehiivFrame.getByRole('textbox', { name: 'Escribe tu email' });
    this.subscribeButton = this.beehiivFrame.getByRole('button', { name: 'Suscríbete' });
    this.successMessage = this.beehiivFrame.getByText('¡Listo, estás suscrito!');
  }

  async subscribe(email: string) {
    await this.emailInput.fill(email);
    await this.subscribeButton.click();
  }
}