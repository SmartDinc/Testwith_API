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

### 2. Gaze Tracking

```JavaScript
const serviceId = "YOUR_SERVICE_ID_HERE";
const tw = new Testwith(serviceId);
const token = 'YOUR_TOKEN_HERE';

async function gazeOptimize() {
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

      try {
        // Create a UI for face registration
        await tw.createRegister();

        // Connect AI
        await tw.connectAI();

        // Create a UI for optimizing gaze tracking
        tw.createGazeOptimize({ "testId": testId, "userId": userId });
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log(`No student found with the examinee's number "${numberToFind}"`);
    }
  } catch (error) {
    console.error(error);
  }
}

gazeOptimize();
```

### ※ Important
- The test room unique identifier (testId) and the examinee unique identifier (userId) are obtained through querying the lists of test rooms and examinees, respectively.
- You can find more detailed usage instructions in [Creating a UI for Gaze Calibration](https://testwith.co.kr/twguide/kr?doc=2-4-10) and [Gaze Calibration](https://testwith.co.kr/twguide/kr?doc=2-4-11).



