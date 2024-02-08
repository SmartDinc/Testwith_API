const serviceId = "YOUR_SERVICE_ID_HERE";
const tw = new Testwith(serviceId);
const token = 'YOUR_TOKEN_HERE';

async function screenAI() {
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

      // Code to execute upon successful screen sharing
      tw.onSuccessScreen = () => {
        tw.setScreenAI({
          "testId": testId,
          "userId": userId,
          "detectOption": {
            "screenLeave": true, // False: Screen departure undetected (default), True: Screen departure detected
            "rightClick": true,  // False: Right-click undetected (default), True: Right-click detected
            "specialKey": true,  // False: Special key undetected (default), True: Special key detected
          },
          "recordOption": true   // False: Screen recording inactive (default), True: Screen recording active
        });
      }
      
      tw.createScreen({ "userId": userId });
    } else {
      console.log(`No student found with the examinee's number "${numberToFind}"`);
    }
  } catch (error) {
    console.error(error);
  }
}

screenAI();