// @format
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const transformSync = require('stream-transform/lib/sync');
const stringify = require('csv-stringify/lib/sync');
const transform = require('stream-transform');
const dayjs = require('dayjs');

const makeOutputSync = require('./makeOutputSync.js');

let output = [];

if (process.argv.length !== 4) {
  console.log(`inputとoutputのcsvファイル名を入力してください.`);
  console.log('Usage');
  console.log('sync.js input.csv output.csv');
  process.exit(1);
}

const input = fs.readFileSync(process.argv[2], 'utf-8');
console.log('Input');
console.log(input);

let records = parse(input, {
  columns: true,
});

// records = transformSync(records, data => {
//   data.Timestamp = data.Timestamp.replace(/ /g, 'T');
//   data.Timestamp = dayjs(data.Timestamp).format('YYYY-MM-DDTHH:mm:ss');
//   return data;
// });

const out = async data => {
  output = await makeOutputSync(data);
  console.log('Output');
  console.log(stringify(output, {header: true}));
  fs.writeFileSync(process.argv[3], stringify(output, {header: true}), 'utf-8');
};

out(records);
