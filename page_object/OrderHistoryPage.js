class OrderHistoryPage {
  constructor(page) {
    this.page = page;
    this.OrderLink =  page.locator("label[routerlink*='myorders']")
    this.row=page.locator("tbody tr");
  
  }
  

  async orderIdisPresent(orderId)
  {   
  await this.OrderLink.click();
  const rows = this.row
  await rows.first().waitFor();
  console.log(rows);
  for (let i = 0; i < (await rows.count()); i++) {
    const orderNum = await rows.nth(i).locator("th").textContent();
    console.log(orderNum);

    if (orderNum.includes(orderId.replace(/[^a-zA-Z0-9 ]/g, ""))) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  }
}

module.exports = { OrderHistoryPage};
