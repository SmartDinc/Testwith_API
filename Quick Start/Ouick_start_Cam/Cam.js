const serviceId = "YOUR_SERVICE_ID_HERE";
const tw = new Testwith(serviceId);
const token = 'YOUR_TOKEN_HERE';

async function faceAI() {
  try {
    await tw.loadTestwith();

    const testCenterResult = await tw.getTestCenterList({ "token": token });
    const testCenterList = testCenterResult.resultData;  // Complete List of Exam Venues

    if (testCenterList.length === 0) {
      console.log('testCenterList is empty');
      return;
    }

    const testId = testCenterList[0].testId;  // Retrieve the unique ID of the first exam venue in the list of exam venues.

    const studentResult = await tw.getStudentList({ "token": token, "testId": testId });
    const studentList = studentResult.resultData;  // Complete List of Examinees

    if (studentList.length === 0) {
      console.log('studentList is empty');
      return;
    }

    const numberToFind = '';  // The examination number of the examinee you are looking for
    const foundStudentData = studentList.find((data)=> data.userNum === numberToFind);

    if (foundStudentData) {
      const userId = foundStudentData.userId;

      // Code to Execute Upon Successful Camera Sharing
      tw.onSuccessStream = () => {
        tw.setFaceAI({
          "testId": testId,
          "userId": userId,
          "detectOption": {
            "existFace": true,  // false: No face detection not detected (default), true: Face detection not detected detected
            "multiFace": true,  // false: No multiple detection detected (default), true: Multiple detection detected
            "validFace": true,  // false: No mismatch detected (default), true: Mismatch detected
            "gaze": true,       // false: No abnormal eye tracking detected (default), true: Abnormal eye tracking detected
          },
          "recordOption": true  // False: Face recording inactive (default), True: Face recording active
        });
      }
      // Create a UI for webcam sharing
      tw.createWebcam({ "userId": userId });
    } else {
      console.log(`No student found with the examinee's number "${numberToFind}"`);
    }
  } catch (error) {
    console.error(error);
  }
}

faceAI();