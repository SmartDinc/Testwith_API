# Quick Start
 
This guide provides instructions on how to use the Testwith API simply and quickly by following the steps below.

- Preparation for API Calls (Loading and Initializing Testwith)
- Querying Unique Exam Venue ID and Examinee ID
- Executing Feature APIs (Camera, Screen, Mobile, etc.)

## Load and Initialize
### 1. Load Library
Before using `Testwith_API`, you must complete the initial setup for API calls. To do this, you can access the Testwith service and load the features of the service.

Add the following script tag to your HTML page:
```html
<script src="https://www.testwith.co.kr/static/js/testwith_api.js"></script>
```

### 2. Face Registration

```JavaScript
const serviceId = "YOUR_SERVICE_ID_HERE";
const tw = new Testwith(serviceId);
const token = 'YOUR_TOKEN_HERE';

async function registerAndVerifyFace() {
  try {
    await tw.loadTestwith();

    const testCenterResult = await tw.getTestCenterList({ "token": token });
    const testCenterList = testCenterResult.resultData;  // List of all examination rooms

    if (testCenterList.length === 0) {
      console.log('testCenterList is empty');
      return;
    }

    const testId = testCenterList[0].testId;  // Retrieve the unique identifier of the first examination room from the list of examination rooms.

    const studentResult = await tw.getStudentList({ "token": token, "testId": testId });
    const studentList = studentResult.resultData;  // List of all examinees

    if (studentList.length === 0) {
      console.log('studentList is empty');
      return;
    }

    const numberToFind = '';  // Examinee ID you are looking for
    const foundStudentData = studentList.find((data)=> data.userNum === numberToFind);

    if (foundStudentData) {
      const userId = foundStudentData.userId;

      // Create a UI for face registration
      tw.createRegister();

      // Create a button for face registration
      const registerButton = document.createElement('button');
      registerButton.textContent = 'Register Face';
      document.body.appendChild(registerButton);
      registerButton.style = 'position: absolute; left: 50%; transform: translate(-50%, 0%);';

      // Call the face registration API when the face registration button is clicked.
      registerButton.addEventListener('click', () => {
        tw.registFace({ "testId": testId, "userId": userId }).then((registerFaceResult) => {
          console.log(registerFaceResult);
          if (registerFaceResult.resultCode == '200') { // Upon successful face registration
            registerButton.remove(); // Remove the face registration button

            // Create a button for face verification
            const verifyButton = document.createElement('button');
            verifyButton.textContent = 'Verify Face';
            document.body.appendChild(verifyButton);
            verifyButton.style = 'position: absolute; left: 50%; transform: translate(-50%, 0%);';

            // Call the face verification API when the face verification button is clicked.
            verifyButton.addEventListener('click', () => {
              tw.registFace({ "testId": testId, "userId": userId, "valid": true }).then((verifyFaceResult) => {
                console.log(verifyFaceResult);
              }).catch((error) => {
                console.error(error);
              });
            });
          }
        }).catch ((error) => {
          console.error(error);
        });
      });
    } else {
      console.log(`No student found with the examinee's number "${numberToFind}"`);
    }
  } catch (error) {
    console.error(error);
  }
}

registerAndVerifyFace();
```

### ※ Important
- The unique identifier for the exam room (testId) and the unique identifier for the examinee (userId) will be obtained through querying the lists of exam rooms and examinees, respectively.
- You can find more detailed usage instructions in [Creating a UI for Face Registration ](https://testwith.co.kr/twguide/kr?doc=2-4-6) and [Face Registration](https://testwith.co.kr/twguide/kr?doc=2-4-7).
- The validity status (valid) is a parameter used for face verification during face registration. To skip face verification during face registration, set it to false (default). To perform face verification, set it to true.




