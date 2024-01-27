const { test, expect,request } = require("@playwright/test");
let webContext
const email="uma.k@gmail.com"
test.beforeAll(async({browser}) =>
{
    const context = await browser.newContext();
    // Create a new page in a pristine context.
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());
    //Type the text in text field
    const userName = page.locator("#userEmail");
    const pwd = page.locator("#userPassword");
    const sign = page.locator("#login");

    await userName.fill(email);
    await pwd.fill("San#2017");
    await sign.click();
    await page.waitForLoadState('networkidle')
    await context.storageState({path:'store.json'})
    webContext= await browser.newContext({storageState:'store.json'});
})


test("E2E", async ({  }) => {
   const page=await webContext.newPage()
   await page.goto("https://rahulshettyacademy.com/client");
   const products=page.locator(".card-body");
    const productName="ZARA COAT 3"
   
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
  
test("Title", async ({  }) => 
{
    const page=await webContext.newPage()
    await page.goto("https://rahulshettyacademy.com/client");
    const products=page.locator(".card-body");
     const productName="ZARA COAT 3"
     const email="uma.k@gmail.com"
     //wait for method to wait til element is available
     const titles = page.locator(".card-body b");
     await titles.first().waitFor();
})