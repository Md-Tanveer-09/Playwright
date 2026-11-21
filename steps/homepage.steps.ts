import { createBdd } from 'playwright-bdd';
import { HomePage } from '../pages/home.page';
import { StorePage } from '../pages/store.page';

const { Given, When, Then } = createBdd();

Given('I navigate to the {string}', async ({ page }, pageName: string) => {
  await new StorePage(page).navigateTo(pageName);
});

Then(
  'the page URL should match the {string}',
  async ({ page }, pageName: string) => {
    await new StorePage(page).verifyUrl(pageName);
  },
);

Then(
  'the {string} should be present',
  async ({ page }, componentName: string) => {
    await new HomePage(page).verifyComponentIsPresent(componentName);
  },
);

When(
  'I add {string} to the cart',
  async ({ page }, productName: string) => {
    await new HomePage(page).addProductToCart(productName);
  },
);

When('I click on {string}', async ({ page }, linkName: string) => {
  await new HomePage(page).clickLink(linkName);
});

When('I click the {string} button', async ({ page }, buttonName: string) => {
  await new HomePage(page).clickButton(buttonName);
});

When(
  'I enter the coupon code {string}',
  async ({ page }, couponCode: string) => {
    await new HomePage(page).enterCouponCode(couponCode);
  },
);

