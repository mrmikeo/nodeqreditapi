/*
  Example of using this library without NPM install
*/

const qreditApi = require("./lib/qreditApi");
const qapi = new qreditApi.default();


(async () => {
  
  var currentHeight = await qapi.getBlockHeight();
  
  console.log('Current Blockchain Height: ' + currentHeight);
  
})();
