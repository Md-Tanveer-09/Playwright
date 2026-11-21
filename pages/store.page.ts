import { expect, type Page } from '@playwright/test';
import { getPageUrl } from '../data/page-urls';
import { logStep } from './log-step';

export class StorePage {
  constructor(private readonly page: Page) {}

  async navigateTo(pageName: string): Promise<void> {
    await logStep(`Navigating to the ${pageName}`);
    await this.page.goto(getPageUrl(pageName));
    await logStep(`Navigated to the ${pageName}`);
  }

  async verifyUrl(pageName: string): Promise<void> {
    await logStep(`Verifying the URL for the ${pageName}`);
    await expect(this.page).toHaveURL(getPageUrl(pageName));
    await logStep(`Verified the URL for the ${pageName}`);
  }
}
