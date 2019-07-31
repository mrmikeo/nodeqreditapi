# Node Qredit API Helper

A Promised NodeJS Module for connecting with the Qredit V2 API

## Install via git
```
git clone https://github.com/mrmikeo/nodeqreditapi
cd nodeqreditapi
npm install

node example.js
```

example.js:
```
const qreditApi = require("./lib/qreditApi");
const qapi = new qreditApi.default();


(async () => {
  
  var currentHeight = await qapi.getBlockHeight();
  
  console.log("Blockchain Height: " + currentHeight);
  
})();
```

## Install via npm
```
npm install --save https://github.com/mrmikeo/nodeqreditapi
```

```
const qreditApi = require("nodeQreditApi");
const qapi = new qreditApi.default();


(async () => {
  
  var currentHeight = await qapi.getBlockHeight();
  
  console.log("Blockchain Height: " + currentHeight);
  
})();
```
