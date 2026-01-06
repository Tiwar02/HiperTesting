import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base.page";

export class DemoQaHomePage extends BasePage {
  
    constructor(page: Page) {
        super(page);
    }

    async goToCategory(categoryName: string) {
        await this.page.locator('.card').filter({ hasText: categoryName }).click();
    }
}