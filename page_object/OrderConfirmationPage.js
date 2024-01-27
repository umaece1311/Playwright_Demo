const { expect } = require("@playwright/test");
class OrderConfirmationPage {
  constructor(page) {
    this.page = page;
    this.msg = page.locator(".hero-primary");
    this.orderId =page.locator(".em-spacer-1 .ng-star-inserted")
  }
  async confirmatioMsg() {
    await expect(this.msg).toHaveText(" Thankyou for the order. ");
  }
  async getOrderId()
  {
    
    return await this.orderId.textContent(); 
  }
}

module.exports = { OrderConfirmationPage };
