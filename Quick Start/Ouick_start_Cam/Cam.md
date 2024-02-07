# Quick Start
 
이 가이드는 다음 단계를 따라서 Testwith API를 간단하고 빠르게 사용할 수 있도록 안내합니다.

- API 호출을 위한 준비(테스트위드 로드 및 초기화)
- 시험장 고유번호 및 응시자 고유번호 조회
- 기능 API(카메라, 화면, 모바일 등) 실행

## 로드 및 초기화
### 1. 라이브러리 로드
`Testwith_API`를 사용하기 전에, API 호출을 위한 초기 설정을 완료해야 합니다. 이를 위해, Testwith 서비스에 접근하고 해당 서비스의 기능을 로드할 수 있습니다.

HTML 페이지에 다음 스크립트 태그를 추가하세요:
```html
<script src="https://www.testwith.co.kr/static/js/testwith_api.js"></script>
```

### 2. 카메라

```JavaScript
const serviceId = "YOUR_SERVICE_ID_HERE";
const tw = new Testwith(serviceId);
const token = 'YOUR_TOKEN_HERE';

async function faceAI() {
  try {
    await tw.loadTestwith();

    const testCenterResult = await tw.getTestCenterList({ "token": token });
    const testCenterList = testCenterResult.resultData;  // 시험장 전체 목록

    if (testCenterList.length === 0) {
      console.log('testCenterList is empty');
      return;
    }

    const testId = testCenterList[0].testId;  // 시험장 목록의 첫 번째 시험장 고유번호를 가져옵니다.

    const studentResult = await tw.getStudentList({ "token": token, "testId": testId });
    const studentList = studentResult.resultData;  // 응시자 전체 목록

    if (studentList.length === 0) {
      console.log('studentList is empty');
      return;
    }

    const numberToFind = '';  // 찾고자 하는 응시자의 수험번호
    const foundStudentData = studentList.find((data)=> data.userNum === numberToFind);

    if (foundStudentData) {
      const userId = foundStudentData.userId;

      // 카메라 공유 성공 시 실행할 코드
      tw.onSuccessStream = () => {
        tw.setFaceAI({
          "testId": testId,
          "userId": userId,
          "detectOption": {
            "existFace": true,  // false: 얼굴 미검출 미감지(기본값), true: 얼굴 미검출 감지
            "multiFace": true,  // false: 다중 검출 미감지(기본값), true: 다중 검출 감지
            "validFace": true,  // false: 불일치 미감지(기본값), true: 불일치 감지
            "gaze": true,       // false: 시선 비정상 미감지(기본값), true: 시선 비정상 감지
          },
          "recordOption": true  // false: 얼굴 녹화 비활성(기본값), true: 얼굴 녹화 활성
        });
      }
      // 웹 카메라 공유 UI 생성
      tw.createWebcam({ "userId": userId });
    } else {
      console.log(`No student found with the examinee's number "${numberToFind}"`);
    }
  } catch (error) {
    console.error(error);
  }
}

faceAI();
```

### ※ Important
- 시험장 고유번호(testId)와 응시자 고유번호(userId)는 시험장 목록 및 응시자 목록 조회를 통해 추출한 각각의 고유번호를 사용합니다.
- 더 자세한 함수 사용법은 [웹 카메라 공유 UI 생성]()과 [얼굴 AI 감독 설정]()에서 확인할 수 있습니다.



