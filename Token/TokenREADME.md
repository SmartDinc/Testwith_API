# Token
## ※ Info
- 사용자는 API Key를 이용하여 서비스에 접속하며, 요청 횟수에 제한이 있으므로 주의해야 합니다.
- API Key를 사용하여 서비스에 접근할 수 있고, 이를 통해 사용자 식별이 가능합니다.
- 테스트위드 서버는 초당 1회의 API 요청만을 허용하며, 초당 여러 번의 요청은 제한됩니다.
 
 ```python
def get_token():
  headers = {
    "Content-Type": 'application/json; charset=utf-8' ,
  }
  body = {
    "apiKey": {apiKey},        # api key (from TestWith)
    "apiSecret": {apiSecret},  # api secret (from TestWith)
    "serviceId": {serviceId}   # service id (from TestWith)
  }
  URL = f'https://www.testwith.co.kr/services/token'
  response = requests.post(URL, headers=headers, json=body)
  if response.status_code == 200:
    return response.json()
  else:
    return response.json()
```

### API URL

```HTTPS
https://www.testwith.co.kr/services/token
```

### API Header

|항목|Mandatory|Description|
|:--------|:-----|:------------|
|`Content-Type`|`Mandatory`|`요청 Body Content Type을 application/json으로 지정(POST)` |

### 요청 Body
```JSON
{
    "apiKey": "string",
    "apiSecret": "string",
    "serviceId": "string"
}
```
|항목|타입|설명|비고|
|:--------|:-----|:------------|:-----|
|`apiKey`|`string`|`API 키`|`테스트위드 가입 시 발급`|
|`apiSceret`|`string`|`시크릿 키`|`테스트위드 가입 시 발급`|
|`serviceId`|`string`|`서비스 아이디`|`테스트위드 가입 시 발급`|

### 응답 Body
```JSON
{
    "access": "string",
    "exp": "int",
    "now": "int",
    "resultCode": "int",
    "resultMsg": "string"
}
```

|항목|타입|설명|비고|
|:--------|:-----|:------------|:-----|
|`access`|`string`|`토큰`||
|`exp`|`int`|`토큰 만료 시간`|`timestamp`|
|`now`|`int`|`토큰 발급 시간(현재 시간)`|`timestamp`|
|`resultCode`|`int`|`결과 코드`||
|`resultMsg`|`string`|`결과 내용`||