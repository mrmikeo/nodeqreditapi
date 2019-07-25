# Node Qredit API Helper

A Promised NodeJS Module for connecting with the Qredit V2 API

```
const qreditApi = require("./qreditApi");
const qapi = new qreditApi.default();


(async () => {
  
  var currentHeight = await qapi.getBlockHeight();
  
});
```
