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