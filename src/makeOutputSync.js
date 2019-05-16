// @format
const getZenJPY = require('./getZenJPY.js');
const {map} = require('p-iteration');
const dayjs = require('dayjs');

module.exports = async data => {
  let output = await map(data, async a => {
    a.Timestamp = `${a.Timestamp.slice(0, -2)}00`;
    a.Timestamp = dayjs(a.Timestamp).format('YYYY-MM-DDTHH:mm:ss');
    let price = await getZenJPY(a.Timestamp);
    console.log('price: ' + price);
    let out = {};
    out['日時'] = a.Timestamp;
    out['ソース'] = 'coinapi.io';
    out['ペア'] = `ZenJPY`;
    out['種類'] = a.Action;
    out['取引量'] = a.Volume;
    out['価格'] = price;
    out['主軸通貨価格（JPY)'] = price;
    out['決済通貨価格（JPY）'] = '';
    out['主軸通貨移動平均価格'] = '';
    out['決済通貨移動平均価格'] = '';
    out['取引後主軸通貨ポジション'] = '';
    out['取引後決済通貨ポジション'] = '';
    out['手数料通貨'] = a.FeeCcy;
    out['手数料（JPY）'] = '0.00';
    out['手数料％'] = '0.00％';
    out['損益（JPY)'] = price;
    return out;
  });
  return output;
};
