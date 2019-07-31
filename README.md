# Node Qredit API Helper

[![https://telegram.me/@MrMike_O](https://img.shields.io/badge/💬%20Telegram-MrMike__O-blue.svg)](https://telegram.me/@MrMike_O)


A Promised NodeJS Module for connecting with the Qredit V2 API

A Full Integration Guide for both QreditAPI and QAE can be found here:  [Qredit Integration Guide](https://github.com/mrmikeo/nodeqreditintegration)

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
