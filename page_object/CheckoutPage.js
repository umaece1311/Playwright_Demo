const { expect } = require("@playwright/test");
class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.listItem = page.locator("div li");
    this.checkout = page.locator("li[class='totalRow'] button[type='button']");
  }

  async checkoutItem(productName) {
   await  this.listItem.first().waitFor();
    const check = await this.getProductLocator(productName)
      .isVisible();
      expect(check).toBeTruthy()
    this.checkout.click();
  }

  getProductLocator(productName)
  {
  return this.page.locator("h3:has-text('" + productName + "')")
  }
}

module.exports = { CheckoutPage };
