const rp = require('request-promise');

require('dotenv').config();
const env = process.env;

const asset_id_base = 'ZEN';
const asset_id_quote = 'BTC';
const period_id = '1MIN';
const time_start = '2019-05-06T19:06:00';
const time_end = '2019-05-06T19:16:00';
const limit = '2';
const include_empty_items = 'false';

const options = {
  method: 'GET',
  uri: `https://rest.coinapi.io/v1/ohlcv/${asset_id_base}/${asset_id_quote}/history?period_id=${period_id}&time_start=${time_start}&time_end=${time_end}&limit=${limit}&include_empty_items=${include_empty_items}`,
  headers: {'X-CoinAPI-Key': env.COINAPI_KEY},
  json: true
};

rp(options)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  })
