const { test} = require("@playwright/test");
const { PageObjecsManager } = require("../page_object/PageObjecsManager");
const dataSet = JSON.parse(JSON.stringify(require("../utils/TestData.json")));
const { customtest } = require("../utils/testFixture");
test("E2E", async ({ page }) => {
  const pageObject = new PageObjecsManager(page);
  const loginPage = pageObject.getLoginPage();
  await loginPage.goToLogin();
  await loginPage.validLogin(dataSet.username, dataSet.password);
  const dashboard = pageObject.getDashboardPage();
  await dashboard.searchProductAddCart(dataSet.productName);
  await dashboard.navigateToCart();
  const checkout = pageObject.getCheckoutPage();
  await checkout.checkoutItem(dataSet.productName);
  const payment = pageObject.getPaymentPage();
  await payment.selectCountry(dataSet.countryCode, dataSet.countryName);
  await payment.CardDetails(
    dataSet.cvc,
    dataSet.cardName,
    dataSet.discountCode
  );
  await payment.verifyUserEmail(dataSet.username);
  await payment.submitOrder();
  const confirm = pageObject.getconfirmPage();
  await confirm.confirmatioMsg();
  const orderId = await confirm.getOrderId();
  const history = pageObject.getHistoryPage();
  await history.orderIdisPresent(orderId);
});

customtest("E2E_Fixture", async ({ page, testDataForOrder }) => {
  const pageObject = new PageObjecsManager(page);
  const loginPage = pageObject.getLoginPage();
  await loginPage.goToLogin();
  await loginPage.validLogin(
    testDataForOrder.username,
    testDataForOrder.password
  );
  const dashboard = pageObject.getDashboardPage();
  await dashboard.searchProductAddCart(testDataForOrder.productName);
  await dashboard.navigateToCart();
  const checkout = pageObject.getCheckoutPage();
  await checkout.checkoutItem(testDataForOrder.productName);
  const payment = pageObject.getPaymentPage();
  await payment.selectCountry(
    testDataForOrder.countryCode,
    testDataForOrder.countryName
  );
  await payment.CardDetails(
    testDataForOrder.cvc,
    testDataForOrder.cardName,
    testDataForOrder.discountCode
  );
  await payment.verifyUserEmail(testDataForOrder.username);
  await payment.submitOrder();
  const confirm = pageObject.getconfirmPage();
  await confirm.confirmatioMsg();
  const orderId = await confirm.getOrderId();
  const history = pageObject.getHistoryPage();
  await history.orderIdisPresent(orderId);
});
