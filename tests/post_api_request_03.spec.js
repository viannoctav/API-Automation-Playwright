// Load playwright module
const {test, expect} = require('@playwright/test')
import { faker } from '@faker-js/faker';

const { DateTime } = require('luxon');

// Write a test
test('Create POST API Request using dynamic request body',async({ request })=>{

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int(1000);

    const checkInDate = DateTime.now().toFormat('yyyy-MM-dd');
    const checkOutDate = DateTime.now().plus({day:5}).toFormat('yyyy-MM-dd');

    // Create POST API Request
    const postAPIResponse = await request.post(`/booking`,{
        data:{
            "firstname": firstName,
            "lastname": lastName,
            "totalprice": totalPrice,
            "depositpaid": true,
            "bookingdates": {
                "checkin": checkInDate,
                "checkout": checkOutDate
            },
            "additionalneeds": "Playwright"
        }
    })

    // Validate Status Code
    expect(postAPIResponse.ok()).toBeTruthy();
    expect(postAPIResponse.status()).toBe(200);

    const postAPIResponseBody = await postAPIResponse.json();
    console.log(postAPIResponseBody);

    // Validate JSON Api Response
    expect(postAPIResponseBody.booking).toHaveProperty("firstname",firstName)
    expect(postAPIResponseBody.booking).toHaveProperty("lastname",lastName)
    
    // Validate nested JSON objects
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin",checkInDate)
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout",checkOutDate)
})