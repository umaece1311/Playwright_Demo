const { test, expect } = require("@playwright/test");

//javascript is asynchornous nature so it is mandatory to mentioned async in function level and await to add for each steps
//Test cases in each file will run sequentially
test("@smoke Open new browser with properties", async ({ browser }) => {
  // Create a new incognito browser context.
  const context = await browser.newContext();
  // Create a new page in a pristine context.
  const page = await context.newPage();
  //Open the url
  await page.goto("https:/google.com/");
  //Get the title of the page
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});

test('@smoke test', async ({ page }) => {
  await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/');
  await page.getByLabel('Username:').click();
  await page.getByLabel('Username:').fill('rahulshettyacademy');
  await page.getByLabel('Password:').click();
  await page.getByLabel('Password:').fill('learning');
  await page.getByLabel('I Agree to the terms and conditions').check();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet n' }).getByRole('button').click();
  await page.locator('app-card').filter({ hasText: 'Samsung Note 8 $24.99 Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' }).getByRole('button').click();
  await page.getByText('Checkout ( 2 ) (current)').click();
  await page.getByRole('row', { name: 'iphone X by Sim cart Status: In Stock ₹. 100000 ₹. 100000 Remove' }).locator('#exampleInputEmail1').click();
  await page.getByRole('row', { name: 'iphone X by Sim cart Status: In Stock ₹. 100000 ₹. 100000 Remove' }).locator('#exampleInputEmail1').fill('2');
  await page.getByLabel('Please choose your delivery location. Then click on purchase button').fill('j');
  await page.getByText('I agree with the term & Conditions').click();
  await page.getByRole('button', { name: 'Purchase' }).click();
});
test("@smoke Default browser context", async ({ page }) => {
  await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  //Type the text in text field
  const userName = page.locator("#username");
  const pwd = page.locator("#password");
  const cardTitles = page.locator(".card-title a");
  await userName.fill("rahulshetty");
  await pwd.fill("learning");
  //Click on the button
  await page.locator("#signInBtn").click();
  //Extract the content of element
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  /*  Enter valid username and Password */
  //Clear the text in the text field
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await pwd.fill("learning");
  await page.locator("#signInBtn").click();
  //Get the first element text from list of element
  //console.log(await cardTitles.first().textContent());
  //console.log(await cardTitles.nth(1).textContent());
  //Get all texts of list of element
  const allText = await cardTitles.allTextContents();
  console.log(allText);
});

test("@smoke Network load", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  console.log(await page.title());
  //Type the text in text field
  const userName = page.locator("#userEmail");
  const pwd = page.locator("#userPassword");
  const sign = page.locator("#login");
  await userName.fill("uma.k@gmail.com");
  await pwd.fill("San#2017");
  await sign.click();
  //wait to load api calls
  await page.waitForLoadState("networkidle");
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});

test("@smoke Wait for", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  console.log(await page.title());
  //Type the text in text field
  const userName = page.locator("#userEmail");
  const pwd = page.locator("#userPassword");
  const sign = page.locator("#login");
  await userName.fill("uma.k@gmail.com");
  await pwd.fill("San#2017");
  await sign.click();
  //wait for method to wait til element is available
  const titles = page.locator(".card-body b");
  await titles.first().waitFor();
  console.log(await titles.allTextContents());
});
test("@reg  UI control", async ({ page }) => {
  await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  //Type the text in text field
  const userName = page.locator("#username");
  const pwd = page.locator("#password");
  const signIn = page.locator("#signInBtn");
  const dropdown = page.locator("select");
  const documentLink = page.locator("a[href*='documents-request']");
  await userName.fill("rahulshettyacademy");
  await pwd.fill("learning");
  //Select dropdow and then chosen option
  await dropdown.selectOption("teach");
  //Radio button selection
  await page.locator(".checkmark").last().click();
  await page.locator("#okayBtn").click();
  await expect(page.locator(".checkmark").last()).toBeChecked();
  console.log(page.locator(".checkmark").last().isChecked());
  //Checkbox
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  //uncheck selected checkbox -we can't able to do assert for unchecked the checkbox
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
  //await page.pause()
  await signIn.click();
});

test("@reg Window Handling", async ({ browser }) => {
  const context = await browser.newContext();
  // Create a new page in a pristine context.
  const page = await context.newPage();
  await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("a[href*='documents-request']");
  const userName = page.locator("#username");
  const pwd = page.locator("#password");
  const signIn = page.locator("#signInBtn");
  const [newTab] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.click(),
  ]);
  const text = await newTab
    .locator(".red")
    .textContent()
    const name=text.split("@")[1].split(".")[0];
  console.log(name);
  await userName.fill(name);
  await pwd.fill("learning");
  await signIn.click();
});
 
test("@reg E2E", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  console.log(await page.title());
  //Type the text in text field
  const userName = page.locator("#userEmail");
  const pwd = page.locator("#userPassword");
  const sign = page.locator("#login");
  const products=page.locator(".card-body");
  const productName="zara coat 3"
  const email="uma.k@gmail.com"
  await userName.fill(email);
  await pwd.fill("San#2017");
  await sign.click();
  //wait for method to wait til element is available
  const titles = page.locator(".card-body b");
  await titles.first().waitFor();
  console.log(await titles.allTextContents());
const count= await products.count()
 for(let i=0;i<count;i++)
 {
 if( await products.nth(i).locator('b').textContent() === productName)
 {
  await products.nth(i).locator("text= Add To Cart").click()
  break;
 }
}
await page.locator("[routerlink*='cart']").click()
await page.locator("div li").first().waitFor()
const check= await page.locator("h3:has-text('"+productName+"')").isVisible()
expect(check).toBeTruthy()
await page.locator("li[class='totalRow'] button[type='button']").click()
await page.locator(".payment__cc input").nth(1).fill('123')
await page.locator(".payment__cc input").nth(2).fill('uma')
await page.locator(".payment__cc input").nth(3).fill('231212')
await page.locator("input[placeholder='Select Country']").type('ind',{delay:100})
const dropdown=page.locator('.ta-results')
await dropdown.waitFor()
const optionCount =await dropdown.locator('button').count()
for(let i=0;i<optionCount;i++)
 {
 if(await dropdown.locator('button').nth(i).textContent() === " India")
 {
  await dropdown.locator('button').nth(i).click()
  break;
 }
 }

await expect(page.locator("label[type='text']")).toHaveText(email)
await page.locator(".action__submit").click()
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
console.log(orderId.replace(/[^a-zA-Z0-9 ]/g, ''))
await page.locator("label[routerlink*='myorders']").click()

const rows =await page.locator("tbody tr");
await rows.first().waitFor()
console.log(rows)
for(let i=0;i<await rows.count();i++)
 {
 const orderNum= await rows.nth(i).locator('th').textContent()
 console.log(orderNum)

 if(orderNum.includes(orderId.replace(/[^a-zA-Z0-9 ]/g, '')))
 {
 await rows.nth(i).locator("button").first().click()
  break;
 }
 }

 //await expect(page.locator(".col-text.-main")).toHaveText(orderId)
});   



test("Playwright Locator", async ({ page }) => {
  await page.goto("https://www.rahulshettyacademy.com/angularpractice/");
  await page.getByTitle('ProtoCommerce').isVisible()
  await page.getByLabel('Check me out if you Love IceCreams!').click()
  await page.getByLabel('Student').click()
  await page.getByLabel('Employed').check()
  await page.getByLabel('Gender').selectOption('Female')
  await page.getByPlaceholder('password').fill('123456')
  await page.getByRole('button',{name:'Submit'}).click()
  await page.getByText('Success! The Form has been submitted successfully!.').isVisible()
  await page.getByRole('link',{name:'Shop'}).click()
  await page.locator('app-card').filter({hasText:'Blackberry'}).getByRole('button').click()
  await page.getByTitle()
});   

test("showandHide", async ({ page }) => {
  await page.goto("https:/google.com/");
  await page.goto("https://www.rahulshettyacademy.com/AutomationPractice/");
  await page.goBack()
  await page.goForward()
  await expect(page.locator('#displayed-text')).toBeVisible()
  await page.locator('#hide-textbox').click()
  await expect(page.locator('#displayed-text')).toBeHidden()
});  

test("JavaScript-Dialogue", async ({ page }) => {
  await page.goto("https://www.rahulshettyacademy.com/AutomationPractice/");
  page.on('dialog', dialog => {
    dialog.accept();
  });
  await page.locator('#confirmbtn').click()
});  

test("Mouse-Over", async ({ page }) => {
  await page.goto("https://www.rahulshettyacademy.com/AutomationPractice/");
  await page.locator('#mousehover').hover()
  await page .locator("a[href='#top']").click()
});  

test("Frame and visible element click", async ({ page }) => {
  await page.goto("https://www.rahulshettyacademy.com/AutomationPractice/");
  const framePage= page.frameLocator('#courses-iframe')
 await framePage.locator("li a[href*='lifetime-access']:visible").click()
const text=await framePage.locator('.text span').textContent()
console.log(text)
});  