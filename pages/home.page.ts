import { expect, type Page } from '@playwright/test';
import { logStep } from './log-step';

const componentSelectors: Record<string, string> = {
  Header: 'header.site-header',
  'Navigation Bar': 'nav.container',
  'Body Content': 'main#main-content',
  Footer: 'footer.site-footer',
};

const linkSelectors: Record<string, string> = {
  Cart: 'a[href="/practice/apps/ecommerce/cart/"]:has(#store-cart-count)',
  'Apply coupon': 'button.button.button--secondary[type="submit"]',
  'Continue to checkout': '#store-checkout-link',
  'Place fake order': '#store-checkout-form > button.button.button--primary[type="submit"]',
  'View order history': 'a.button.button--primary[href="/practice/apps/ecommerce/orders/"]',
};

export class HomePage {
  constructor(private readonly page: Page) {}

  async clickLink(linkName: string): Promise<void> {
    const selector = linkSelectors[linkName];
    if (!selector) {
      throw new Error(
        `Unknown link "${linkName}". Add its selector to linkSelectors.`,
      );
    }

    const link = this.page.locator(selector);
    await logStep(`Finding "${linkName}"`);
    await expect(
      link,
      `Expected "${linkName}" to be visible before clicking`,
    ).toBeVisible();
    await expect(
      link,
      `Expected exactly one link for "${linkName}"`,
    ).toHaveCount(1);
    await logStep(`Clicking "${linkName}"`);
    await link.click();
    await logStep(`Clicked "${linkName}"`);
  }

  async clickButton(buttonName: string): Promise<void> {
    const button = this.page.getByRole('button', {
      name: buttonName,
      exact: true,
    });

    await logStep(`Finding "${buttonName}"`);
    await expect(
      button,
      `Expected exactly one button named "${buttonName}"`,
    ).toHaveCount(1, { timeout: 15_000 });
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
    await logStep(`Clicking "${buttonName}"`);
    await button.click();
    await logStep(`Clicked "${buttonName}"`);
  }

  async addProductToCart(productName: string): Promise<void> {
    const productCard = this.page.getByRole('article').filter({
      has: this.page.getByRole('heading', {
        name: productName,
        exact: true,
      }),
    });

    await logStep(`Finding product "${productName}"`);
    await productCard.waitFor({ state: 'visible' });
    const productCount = await productCard.count();
    if (productCount !== 1) {
      throw new Error(
        `Expected exactly one product card for "${productName}", found ${productCount}`,
      );
    }
    await logStep(`Product "${productName}" is present`);

    const addToCartButton = productCard.getByRole('button', {
      name: 'Add to cart',
    });
    await addToCartButton.waitFor({ state: 'visible' });
    const isInStock = await addToCartButton.isEnabled();
    await logStep(
      `Product "${productName}" is ${isInStock ? 'in stock' : 'out of stock'}`,
    );
    if (!isInStock) {
      throw new Error(`Product "${productName}" is out of stock`);
    }

    await logStep(`Adding "${productName}" to the cart`);
    await addToCartButton.click();
  }

  async enterCouponCode(couponCode: string): Promise<void> {
    const couponInput = this.page.locator('input#store-coupon');
    await logStep(`Entering coupon code "${couponCode}"`);
    await expect(couponInput).toBeVisible();
    await expect(couponInput).toBeEnabled();
    await couponInput.fill(couponCode);
    await expect(couponInput).toHaveValue(couponCode);
    await logStep(`Entered coupon code "${couponCode}"`);
  }

  async verifyComponentIsPresent(componentName: string): Promise<void> {
    const selector = componentSelectors[componentName];
    if (!selector) {
      throw new Error(
        `Unknown page component "${componentName}". Add its selector to componentSelectors.`,
      );
    }

    await logStep(`Verifying ${componentName} is present`);
    await expect(this.page.locator(selector)).toBeVisible();
    await logStep(`Verified ${componentName} is present`);
  }
}
