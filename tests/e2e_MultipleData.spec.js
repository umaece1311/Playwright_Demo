const { test, expect } = require("@playwright/test");
const { PageObjecsManager } = require("../page_object/PageObjecsManager");
const dataSet=JSON.parse(JSON.stringify(require("../utils/TestDataList.json")))

for(const data of dataSet)
{
test(`@smoke Place the order of ${data.productName}`, async ({ page }) => {
 const pageObject =new PageObjecsManager(page)
  const loginPage = pageObject.getLoginPage()
  await loginPage.goToLogin();
  await loginPage.validLogin(data.username, data.password);
  const dashboard =  pageObject.getDashboardPage()
  await dashboard.searchProductAddCart(data.productName);
  await dashboard.navigateToCart();
  const checkout = pageObject.getCheckoutPage()
  await checkout.checkoutItem(data.productName);
  const payment= pageObject.getPaymentPage()
  await payment.selectCountry(data.countryCode,data.countryName)
  await payment.CardDetails(data.cvc,data.cardName,data.discountCode)
  await payment.verifyUserEmail(data.username)
  await payment.submitOrder()
  const confirm= pageObject.getconfirmPage()
  await confirm.confirmatioMsg()
  const orderId =await confirm.getOrderId()
  const history= pageObject.getHistoryPage()
  await history.orderIdisPresent(orderId)
});
}