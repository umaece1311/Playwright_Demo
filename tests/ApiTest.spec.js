const { test, expect,request } = require("@playwright/test");
const{ApiUtils}=require ('../utils/ApiUtils')
const loginPayload={userEmail: "uma.k@gmail.com", userPassword: "San#2017"}
const orderPayload={orders: [{country: "cuba", productOrderedId: "6581ca399fd99c85e8ee7f45"}]}
let response
test.beforeAll(async() =>
{
  const apiContext= await request.newContext();
  const apiUtils=new ApiUtils(apiContext,loginPayload)
  response=await apiUtils.createOrder(orderPayload)
 
})


test("E2E", async ({ page }) => {
   
    page.addInitScript( value=>{
            window.localStorage.setItem('token',value)
        },response.token)
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("[routerlink*='myorders']").click()
  const rows =await page.locator("tbody tr");
  await rows.first().waitFor()
  console.log(rows)
  for(let i=0;i<await rows.count();i++)
   {
   const orderNum= await rows.nth(i).locator('th').textContent()
   console.log(orderNum)
  
   if(orderNum.includes(response.orderId.replace(/[^a-zA-Z0-9 ]/g, '')))
   {
   await rows.nth(i).locator("button").first().click()
    break;
   }
   }
  
   //await expect(page.locator(".col-text.-main")).toHaveText(orderId)
  });   