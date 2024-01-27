const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require("../utils/ApiUtils");
const loginPayload = { userEmail: "uma.k@gmail.com", userPassword: "San#2017" };
const orderPayload = {
  orders: [{ country: "cuba", productOrderedId: "6581ca399fd99c85e8ee7f45" }],
};
const fakePayLoad = { message: "No Product in Cart" };
let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});
test.describe.configure({mode:'parallel'})
test("Intercept Response", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoad);
      route.fulfill({
        response,
        body,
      });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    }
  );

  await page.locator("button[routerlink*='myorders']").click();

  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
  );
  console.log(await page.locator(".mt-4.ng-star-inserted").textContent());
});

test
("Intercept Request", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  console.log(await page.title());
  //Type the text in text field
  const userName = page.locator("#userEmail");
  const pwd = page.locator("#userPassword");
  const sign = page.locator("#login");
  const products = page.locator(".card-body");
  const productName = "zara coat 3";
  const email = "uma.k@gmail.com";
  await userName.fill(email);
  await pwd.fill("San#2017");
  await sign.click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  await page.locator("button[routerlink*='myorders']").click();
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6",
      })
  );
  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
 
});

test("Abort css", async ({ browser }) => {

  const context = await browser.newContext();
  // Create a new page in a pristine context.
  const page = await context.newPage();
  page.route('**/*.{jpg,png,jpeg}',route=>route.abort())
  await page.goto("https://rahulshettyacademy.com/client");
  console.log(await page.title());
  //Type the text in text field
  const userName = page.locator("#userEmail");
  const pwd = page.locator("#userPassword");
  const sign = page.locator("#login");
  const products = page.locator(".card-body");
  const productName = "zara coat 3";
  const email = "uma.k@gmail.com";
  await userName.fill(email);
  await pwd.fill("San#2017");
  await sign.click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  await page.locator("button[routerlink*='myorders']").click();
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6",
      })
  );
  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
 
});