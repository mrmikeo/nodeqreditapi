# Node Qredit API Helper

A Promised NodeJS Module for connecting with the Qredit V2 API

```
git clone https://github.com/mrmikeo/nodeqreditapi
cd nodeqreditapi
npm install

node index.js
```

```
const qreditApi = require("./lib/qreditApi");
const qapi = new qreditApi.default();


(async () => {
  
  var currentHeight = await qapi.getBlockHeight();
  
  console.log("Blockchain Height: " + currentHeight);
  
})();
```
