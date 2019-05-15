const request = require('request');
const dayjs = require('dayjs');

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

const getZenBTC = async (start, end) => {
  const zen = await dispatch('ZEN', 'BTC', '1MIN', start, end, '1', 'false');
  console.log(zen[0]);
  return (zen[0].price_open + zen[0].price_close) / 2.0;
}

const getBTCJPY = async () => {
  const btc = await dispatch('BTC', 'JPY', '1MIN', '2018-09-08T01:48:00', '2018-09-08T01:49:00', '1', 'false');
  console.log(btc);
}

const getZenJPY = async (start, end) => {
  const zenBTC = await dispatch('ZEN', 'BTC', '1MIN', start, end, '1', 'false');
  const btcJPY = await dispatch('BTC', 'JPY', '1MIN', start, end, '1', 'false');
  const zenBTCAve = (zenBTC[0].price_open + zenBTC[0].price_close) / 2.0;
  const btcJPYAve = (btcJPY[0].price_open + btcJPY[0].price_close) / 2.0;
  console.log(zenBTC[0], btcJPY[0]);
  return zenBTCAve * btcJPYAve;
}

module.exports = async (start) => {
  return new Promise(async (resolve, reject) => {
    let end = dayjs(start).add(1, 'minutes').format('YYYY-MM-DDTHH:mm:ss');
    resolve(getZenJPY(start, end));
  });
};
