const { expect } = require("@playwright/test");
class PaymentPage {
  constructor(page) {
    this.page = page;
    this.cvc = page.locator(".payment__cc input").nth(1);
    this.name = page.locator(".payment__cc input").nth(2);
    this.dicount = page.locator(".payment__cc input").nth(3);
    this.country = page.locator("input[placeholder='Select Country']");
    this.dropdown = page.locator(".ta-results");
    this.userEmail = page.locator("label[type='text']");
    this.submit = page.locator(".action__submit");
  }

  async CardDetails(cvc, name, discount) {
    await this.cvc.fill(cvc);
    await this.name.fill(name);
    await this.dicount.fill(discount);
  }
  async selectCountry(countryCode, countryName) {
    await this.country.type(countryCode, { delay: 100 });
    await this.dropdown.waitFor();
    const optionsCount = await this.dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
      const text = await this.dropdown.locator("button").nth(i).textContent();
      if (text.trim() === countryName) {
        await this.dropdown.locator("button").nth(i).click();
        break;
      }
    }
  }

  async verifyUserEmail(username) {
    await expect(await this.userEmail).toHaveText(username);
  }

  async submitOrder() {
    await this.submit.click();
  }
}

module.exports = { PaymentPage };
