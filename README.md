# Testwith_API
 
`Testwith_API`는 AI감독, 스트리밍(카메라,화면 공유), 시험장생성, 응시자/감독관 관리, 채팅 서비스까지 Testwith의 다양한 기능을 자사서비스에 API연동으로 보다 쉽게 사용할 수 있습니다. 이 가이드는 `Testwith_API`를 빠르게 시작하고 사용하는 방법을 단계별로 안내합니다.

※ 자세한 API 가이드는 [테스트위드 API 가이드](https://testwith.co.kr/twguide/kr)에서 확인할 수 있습니다.

## Important

API 사용에 있어서 중요한 사항들을 아래에 명시합니다:

- API를 사용하기 위해 필요한 인증 정보(키, [토큰](/Token/TokenREADME.md) 등)가 제대로 설정되었는지 확인하세요. 인증 정보는 [영업](#Contact)팀에 문의 후 발급 받을 수 있습니다.
- 시험장 고유번호 및 응시자 고유번호는 시험장 생성 및 응시자 등록 후에 조회할 수 있습니다.
- API 호출 시 필요한 권한과 인증 절차를 준수하세요.

이러한 지침을 준수함으로써, `Testwith_API`의 기능들을 원활하게 사용할 수 있습니다.

## 로드 및 초기화
### 1. 라이브러리 로드
`Testwith_API`를 사용하기 전에, API 호출을 위한 초기 설정을 완료해야 합니다. 이를 위해, Testwith 서비스에 접근하고 해당 서비스의 기능을 로드할 수 있습니다.

HTML 페이지에 다음 스크립트 태그를 추가하세요:
```html
<script src="https://www.testwith.co.kr/static/js/testwith_api.js"></script>
```

### 2. Testwith 객체 생성 및 초기화
JavaScript에서 Testwith 객체를 생성하고 서비스 ID를 인자로 전달하여 초기화합니다.

```javascript
const serviceId = "string";   // 테스트위드에서 발급 받은 서비스 아이디
const tw = new Testwith(serviceId);
```

### 3. Testwith 기능 로드
JavaScript에서 loadTestwith() 메서드를 사용하여 Testwith 서비스의 기능을 로드합니다.

```javascript
tw.loadTestwith().then(() => {
  // 다음 실행할 코드
}).catch(err => {
  console.error('자원 로드 중 오류 발생:', err);
});
```

### ※ Important
- serviceId 변수에는 실제 서비스의 ID가 있어야 합니다. 올바른 서비스 ID를 사용하여 초기화해야 합니다.
- Testwith 라이브러리가 로드되었는지 확인하고, 서비스 ID가 올바르게 전달되었는지 확인해야 합니다.
- API 호출 전에 해당 페이지에 Testwith 라이브러리가 올바르게 로드되었는지 확인하세요.

## 요청 파라미터

|항목|타입|설명|비고|
|:--------|:-----|:------------|:--------------------|
|`serviceId`|`string`|`서비스 아이디` |`테스트위드 기업 ID 사용`|

## Contact

- Name : Hwanjin Kim
- Tel : 070-7728-0327
- Email : maxkim@sdcor.net
- WebSite :  https://www.testwith.io


