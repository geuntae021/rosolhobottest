const express = require('express');
const server = express();
 
server.all('/', (req, res) => {
  res.send(`OK`)
})
 
function keepAlive() {
  server.listen(3000, () => { console.log("뭔지 모르니깐 히히힣" + Date.now()) });
}
 
module.exports = keepAlive;