const getZenJPY = require('./getZenJPY.js');

module.exports = data => {
  let output = new Object();
  let a = data.Timestamp.slice(0, -2) ;
  a = `${a}00`;
  // let b = getZenJPY(a);
  output['日時'] = data.Timestamp;
  output['ソース'] = data.Source;
  output['ペア'] = `${data.Base}${data.Counter}`;
  output['種類'] = data.Action;
  output['取引量'] = data.Volume;
  output['価格'] = 700000;
  output['主軸通貨価格（JPY)'] = 700000;
  output['決済通貨価格（JPY）'] = '';
  output['主軸通貨移動平均価格'] = '';
  output['決済通貨移動平均価格'] = '';
  output['取引後主軸通貨ポジション'] = '';
  output['取引後決済通貨ポジション'] = '';
  output['手数料通貨'] = data.FeeCcy;
  output['手数料（JPY）'] = '0.00';
  output['手数料％'] = '0.00％';
  output['損益（JPY)'] = 700000 * data.Volume;
  return output;
}
