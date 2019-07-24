/*
  Example of using this library
*/

const qreditApi = require("./qreditApi");
const qapi = new qreditApi.default();


(async () => {
  
  var currentHeight = await qapi.getBlockHeight();
  
});
