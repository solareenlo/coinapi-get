// @format
const fs = require('fs');
const csv = require('csv');
const makeOutput = require('./makeOutput.js');
let i = 0;
let output = [];

const parser = csv.parse({columns: true});
const transformer = csv.transform(data => {
  data.Timestamp = data.Timestamp.replace(/ /g, 'T');
  i++;
  return data;
});
const stringifier = csv.stringify({header: true});

if (process.argv.length !== 3) {
  console.log(`csvファイル名を入力してください.`);
  process.exit(1);
}

const inputFile = fs.createReadStream(process.argv[2], 'utf-8');
const outputFile = fs.createWriteStream('dest.csv', 'utf8');

inputFile.pipe(process.stdout);

inputFile
  .on('readable', () => {
    while ((data = inputFile.read())) {
      parser.write(data);
    }
  })
  .on('error', err => {
    console.error(err.message);
  });

parser
  .on('readable', () => {
    while ((data = parser.read())) {
      transformer.write(data);
    }
  })
  .on('error', err => {
    console.error(err.message);
  });

transformer
  .on('readable', () => {
    while ((data = transformer.read())) {
      output = makeOutput(data);
      stringifier.write(output);
    }
  })
  .on('error', err => {
    console.error(err.message);
  });

stringifier
  .on('readable', () => {
    while ((data = stringifier.read())) {
      outputFile.write(data);
    }
  })
  .on('error', err => {
    console.error(err.message);
  });

// console.log(inputFile);

// getZenBTC();
// getBTCJPY();
