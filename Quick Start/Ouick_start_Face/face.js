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