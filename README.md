### Prevent duplicate requests

example:
```
import mockRequest from 'xx';
const request = DebounceRequest(mockRequest,500)
request({data: 1}) // from field a
request({data: 1}) // from field b
request({data: 1}) // from field c
```
the main of top code is: if many same(params) request within 500ms, the request only execte once.