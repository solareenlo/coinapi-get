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

const getZenBTC = async () => {
  const zen = await dispatch('ZEN', 'BTC', '1MIN', '2019-05-06T19:06:00', '2019-05-06T19:16:00', '1', 'false');
  console.log(zen);
}

const getBTCJPY = async () => {
  const btc = await dispatch('BTC', 'JPY', '1MIN', '2019-05-06T19:06:00', '2019-05-06T19:16:00', '1', 'false');
  console.log(btc);
}

getZenBTC();
getBTCJPY();
