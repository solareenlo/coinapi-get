const fs = require('fs');
const csv = require('csv');
const makeOutput = require('./makeOutput.js');

const parser = csv.parse({columns: true});
const transformer = csv.transform(data => {
  data.Timestamp = data.Timestamp.replace(/ /g, 'T');
  return data;
});
const stringifier = csv.stringify({header: true});

if(process.argv.length !== 3) {
  console.log(`csvファイル名を入力してください.`);
  process.exit(1);
}

const inputFile = fs.createReadStream(process.argv[2], 'utf-8');
const outputFile = fs.createWriteStream('dest.csv', 'utf8');
let output = new Object();

inputFile.pipe(process.stdout);

inputFile.on('readable', () => {
  while(data = inputFile.read()) {
    parser.write(data);
  }
});

parser.on('readable', () => {
  while(data = parser.read()){
    transformer.write(data);
  }
});

transformer.on('readable', () => {
  while(data = transformer.read()){
    output = makeOutput(data);
    stringifier.write(output);
  }
});

stringifier.on('readable', () => {
  while(data = stringifier.read()){
    outputFile.write(data);
    console.log(`string: ${data.toString()}`);
  }
});

// console.log(inputFile);

// getZenBTC();
// getBTCJPY();
