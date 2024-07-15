// Load playwright module
const {test, expect} = require('@playwright/test')
const bookingAPIRequestBody = require('../test-data/post_dynamic_request_body.json');
import { stringFormat } from '../utils/common';
const tokenRequestBody = require('../test-data/token_request_body.json');
const putRequestBody = require('../test-data/put_request_body.json');

// Write a test
test('Create PUT API Request in playwright',async({ request })=>{
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
    
    // Generate Token
    const tokenResponse = await request.post(`/auth`,{
        data:tokenRequestBody
    })

    const tokenAPIResponseBody = await tokenResponse.json();
    const tokenNo = tokenAPIResponseBody.token;
    console.log("Token No is : "+ tokenNo);
    
    // PUT API Call
    const putResponse = await request.put(`/booking/${bId}`,{
        headers:{
            "Content-Type":"application/json",
            "cookie":`token=${tokenNo}`
        },
        data:putRequestBody
    })
    
    const putResponseBody = await putResponse.json();
    console.log(putResponseBody)

    // Validate Status Code
    expect(putResponse.status()).toBe(200);
})