class ApiUtils {
  constructor(apiContext,loginPayload) {
    this.apiContext=apiContext
    this.loginPayload=loginPayload
  }
  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      { data: this.loginPayload }
    );
   
    const responseJson = await loginResponse.json();
    const token = responseJson.token;
    console.log(token)
    return token
  }

  async createOrder(orderPayload)
  {
    let response={}
    response.token= await this.getToken()
    const orderResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
    data : orderPayload,
      headers:
      {
          'Authorization':response.token,
          'Content-Type':'application/json'
      },
     })
    const orderJsonRespone=await orderResponse.json()
    const orderId=orderJsonRespone.orders[0]
    response.orderId=orderId
    console.log(orderId)
    return response
  }
}
module.exports={ApiUtils}