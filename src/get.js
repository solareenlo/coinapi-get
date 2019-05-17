const https = require('https');

require('dotenv').config();
const env = process.env;

var options = {
  "method": "GET",
  "hostname": "rest.coinapi.io",
  // "path": "/v1/symbols",
  "path": "/v1/symbols?filter_symbol_id=BINANCE_SPOT_ZEN_BTC",
  "headers": {'X-CoinAPI-Key': env.COINAPI_KEY}
};

var request = https.request(options, function (response) {
  var chunks = [];
  response.on("data", function (chunk) {
    console.log(chunk.toString());
    chunks.push(chunk);
  });
});

request.end();
