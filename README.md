# Testwith_API
 
`Testwith_API` allows for the integration of AI proctoring, streaming (camera, screen sharing), exam venue creation, examinee/proctor management, and chat services into your own service, making it easier to utilize Testwith's diverse features through API integration. This guide provides step-by-step instructions on how to quickly get started and use `Testwith_API`.

※ Detailed API guidance can be found at the [Testwith API Guide](https://testwith.co.kr/twguide/kr).

## Important

Important considerations for using the API are specified below:

- Ensure that the necessary authentication information(keys, [tokens](/Token/TokenREADME.md), etc)required for using the API is properly configured. Authentication information can be obtained after contacting the [Sales](#Contact) team.
- The unique exam venue ID and examinee ID can be queried after creating the exam venue and registering the examinee.
- Please adhere to the necessary permissions and authentication procedures when making API calls.

By following these guidelines, you can smoothly utilize the features of `Testwith_API`.

## Load and Initialize
### 1. Load Library
Before using `Testwith_API`, you must complete the initial setup for API calls. To do this, you can access the Testwith service and load the features of the service.

Add the following script tag to your HTML page:
```html
<script src="https://www.testwith.co.kr/static/js/testwith_api.js"></script>
```

### 2. Create and Initialize the Testwith Object

In JavaScript, create the Testwith object and initialize it by passing the service ID as an argument.

```javascript
const serviceId = "string";   // The service ID issued by Testwith
const tw = new Testwith(serviceId);
```

### 3. Load Testwith Features
In JavaScript, use the loadTestwith() method to load the features of the Testwith service.

```javascript
tw.loadTestwith().then(() => {
  // Code to Execute Next
}).catch(err => {
  console.error('Error Occurred While Loading Resources:', err);
});
```

### ※ Important
- The serviceId variable should contain the actual ID of the service. It must be initialized with the correct service ID.
- You need to verify that the Testwith library has been loaded and that the service ID has been correctly passed.
- Before making an API call, ensure that the Testwith library is correctly loaded on the page.

### Request Parameters

|Item|Type|Description|Remarks|
|:--------|:-----|:------------|:--------------------|
|`serviceId`|`string`|`Service ID` |`Use Testwith Corporate ID`|

## Quick Start
 
This guide provides instructions on how to use the Testwith API simply and quickly by following the steps below.

1. [Face Registration](/Quick%20Start/Ouick_start_Face/Face.md)
2. [Gaze Tracking](/Quick%20Start/Ouick_start_Gaze/Gaze.md)
3. [Camera Sharing](/Quick%20Start/Ouick_start_Cam/Cam.md)
4. [Screen Sharing](/Quick%20Start/Ouick_start_Screen/Screen.md)
5. [Mobile Sharing](/Quick%20Start/Ouick_start_Mobile/Mobile.md)

## Contact

- CEO : Hwanjin Kim
- Tel : 070-7728-0327
- Email : maxkim@sdcor.net
- WebSite :  https://www.testwith.io


