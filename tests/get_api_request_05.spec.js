// Load playwright module
const {test, expect} = require('@playwright/test')
const bookingAPIRequestBody = require('../test-data/post_dynamic_request_body.json');
import { stringFormat } from '../utils/common';

// Write a test
test('Create GET API Request in playwright',async({ request })=>{

    const dynamicRequestBody = stringFormat(JSON.stringify(bookingAPIRequestBody),"Rivita Anggun","Octaviani","Playwright")

    // Create POST API Request
    const postAPIResponse = await request.post(`/booking`,{
        data: JSON.parse(dynamicRequestBody)
    })

    // Validate Status Code
    expect(postAPIResponse.ok()).toBeTruthy();
    expect(postAPIResponse.status()).toBe(200);

    const postAPIResponseBody = await postAPIResponse.json();
    console.log(postAPIResponseBody);

    const bId = postAPIResponseBody.bookingid;

    // Validate JSON Api Response
    expect(postAPIResponseBody.booking).toHaveProperty("firstname","Rivita Anggun")
    expect(postAPIResponseBody.booking).toHaveProperty("lastname","Octaviani")
    
    // Validate nested JSON objects
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01")
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout","2019-01-01")

    // GET API Call
    const getAPIResponse = await request.get(`/booking/${bId}`)
    console.log(await getAPIResponse.json());

    // Validate Status Code
    expect(getAPIResponse.ok()).toBeTruthy();
    expect(getAPIResponse.status()).toBe(200);
})