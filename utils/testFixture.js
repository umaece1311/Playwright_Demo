const base= require("@playwright/test");
exports.customtest=base.test.extend(
    {
        testDataForOrder:
        {
            "username":"uma.k@gmail.com",
            "password":"San#2017",
            "productName": "ZARA COAT 3",
            "countryCode":"ind",
            "countryName":"India",
            "cvc":"123",
            "cardName":"uma",
            "discountCode":"1234243"
        }

    }
)