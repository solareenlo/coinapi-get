const request = require('request');

require('dotenv').config();
const env = process.env;

const doRequest = options => {
  return new Promise((resolve, reject) => {
    request(options, (error, res, body) => {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

const dispatch = async (asset_id_base, asset_id_quote, period_id, time_start, time_end, limit, include_empty_items) => {
  const options = {
    method: 'GET',
    uri: `https://rest.coinapi.io/v1/ohlcv/${asset_id_base}/${asset_id_quote}/history?period_id=${period_id}&time_start=${time_start}&time_end=${time_end}&limit=${limit}&include_empty_items=${include_empty_items}`,
    headers: {'X-CoinAPI-Key': env.COINAPI_KEY},
    json: true
  };
  try {
    const json = await doRequest(options);
    return json;
  }
  catch(e) {
    console.error(e);
  }
}

const getZenBTC = async (strat, end) => {
  const zen = await dispatch('ZEN', 'BTC', '1MIN', '2018-09-08T01:48:00', '2018-09-08T01:49:00', '1', 'false');
  console.log(zen);
}
getZenBTC();

const getBTCJPY = async (start, end) => {
  const btc = await dispatch('BTC', 'JPY', '1MIN', '2018-09-08T01:48:00', '2018-09-08T01:49:00', '1', 'false');
  console.log(btc);
}

const hoge = async (word) => {
  console.log(word);
}

// module.exports = async (time) => {
//   setTimeout(() => {
//     return hoge(`getZenJPY: ${time}`);
//   }, 1000);
// };
