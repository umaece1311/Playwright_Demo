class LoginPage{
    constructor(page)
    {
      this.page=page
      this.userName=page.locator("#userEmail");
      this.pwd = page.locator("#userPassword");
      this.sign = page.locator("#login");
    } 
    async goToLogin()
    {
        await this.page.goto("https://rahulshettyacademy.com/client")
    }

    async validLogin(username,password)
    {
        await this.userName.type(username)
        await this.pwd.type(password)
        await this.sign.click()
        await this.page.waitForLoadState('networkidle')
        console.log(await this.page.title());
    }
}
module.exports={LoginPage}