# Token
## ※ Info
- Users access the service using an API Key, and there is a limit on the number of requests, so caution is advised.
- You can access the service using an API Key, which enables user identification.
- The TestWith server allows only one API request per second, and multiple requests within a second are restricted.
 
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

|Item|Mandatory|Description|
|:--------|:-----|:------------|
|`Content-Type`|`Mandatory`|`Specify the request Body Content Type as application/json (POST)` |

### Request Body
```JSON
{
    "apiKey": "string",
    "apiSecret": "string",
    "serviceId": "string"
}
```
|Item|Type|Description|Remarks|
|:--------|:-----|:------------|:-----|
|`apiKey`|`string`|`api Key`|`Issued upon TestWith registration`|
|`apiSceret`|`string`|`Secret Key`|`Issued upon TestWith registration`|
|`serviceId`|`string`|`service Id`|`Issued upon TestWith registration`|

### Response Body
```JSON
{
    "access": "string",
    "exp": "int",
    "now": "int",
    "resultCode": "int",
    "resultMsg": "string"
}
```

|Item|Type|Description|Remarks|
|:--------|:-----|:------------|:-----|
|`access`|`string`|`Token`||
|`exp`|`int`|`Token expiration time`|`timestamp`|
|`now`|`int`|`Token issuance time (current time)`|`timestamp`|
|`resultCode`|`int`|`Result code`||
|`resultMsg`|`string`|`Result content`||