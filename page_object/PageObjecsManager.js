const { LoginPage } = require("./LoginPage");
const { DashboardPage } = require("./DashboardPage");
const { CheckoutPage } = require("./CheckoutPage");
const { PaymentPage } = require("../page_object/PaymentPage");
const { OrderConfirmationPage } = require("./OrderConfirmationPage");
const { OrderHistoryPage } = require("./OrderHistoryPage");

class PageObjecsManager {
  constructor(page) {
    this.page=page
    this.loginPage = new LoginPage(this.page);
    this.dashboard = new DashboardPage(this.page);
    this.checkout = new CheckoutPage(this.page);
    this.payment = new PaymentPage(this.page);
    this.confirm = new OrderConfirmationPage(this.page);
    this.history = new OrderHistoryPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }
  getDashboardPage() {
    return this.dashboard;
  }

  getCheckoutPage() {
    return this.checkout;
  }

  getPaymentPage() {
    return this.payment;
  }

  getconfirmPage() {
    return this.confirm;
  }
  getHistoryPage() {
    return this.history;
  }
}
module.exports = { PageObjecsManager};