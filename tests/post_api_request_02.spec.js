// Load playwright module
const {test, expect} = require('@playwright/test')
const bookingAPIRequestBody = require('../test-data/post_request_body.json');

// Write a test
test('Create POST API Request using static JSON file',async({ request })=>{

    // Create POST API Request
    const postAPIResponse = await request.post(`/booking`,{
        data: bookingAPIRequestBody
    })

    // Validate Status Code
    expect(postAPIResponse.ok()).toBeTruthy();
    expect(postAPIResponse.status()).toBe(200);

    const postAPIResponseBody = await postAPIResponse.json();
    console.log(postAPIResponseBody);

    // Validate JSON Api Response
    expect(postAPIResponseBody.booking).toHaveProperty("firstname","Rivita Anggun")
    expect(postAPIResponseBody.booking).toHaveProperty("lastname","Octaviani")
    
    // Validate nested JSON objects
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01")
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout","2019-01-01")
})