class DashboardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.Cart = page.locator("[routerlink*='cart']");
  }

  async searchProductAddCart(productName) {
    const titles = await this.productsText;
    await titles.first().waitFor();
    console.log(await titles.allTextContents());
    const count = await this.products.count();
    for (let i = 0; i < count; i++) {
      if (
        (await this.products.nth(i).locator("b").textContent()) === productName
      ) {
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
    await this.Cart.click();
  }
  async navigateToCart()
  {
    await this.Cart.click();
  }
}

module.exports = { DashboardPage };
