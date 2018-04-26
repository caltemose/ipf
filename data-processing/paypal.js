const fs = require('fs')
const csvToJson = require('csvtojson')

// const filein = './paypal-2017.csv'
// const fileout = './paypal-2017.json'

const filein = process.argv[2];
const fileout = process.argv[3];

if (!filein || !fileout) {
    return console.log('You must supply file paths for input and output.');
}


function writeFile (transactions) {
    var data = {
        "transactions": transactions
    }
    fs.writeFile(fileout, JSON.stringify(data), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log('Out: ' + fileout ) //+ ' = ' + Object.keys(transactions).length + ' entries.');
    });
}

let transactions = {}
let gross = 0
let net = 0
let tix = 0

csvToJson()
  .fromFile(filein)
  .on('json', (row) => {
    if (row['Item Title'] === '' && row['Type'] === 'Website Payment') {
      let obj = transactions[row['Transaction ID']] = {}
      obj.date = row['Date']
      obj.time = row['Time']
      obj.gross = Number(row['Gross'])
      obj.net = Number(row['Net'])
      obj.email = row['From Email Address']
      obj.quantity = Number(row['Quantity'])
    } else {
      if (row['Item Title'].indexOf('Tour of Home') > -1) {
        transactions[row['Transaction ID']].title = row['Item Title']
        gross += transactions[row['Transaction ID']].gross
        net += transactions[row['Transaction ID']].net
        tix += transactions[row['Transaction ID']].quantity
      } else {
        delete transactions[row['Transaction ID']]
      }
    }
  })
  .on('done', (error) => {
    console.log('transactions:', Object.keys(transactions).length)
    console.log('tix:', tix)
    console.log('gross:', gross)
    console.log('net:', net)
    writeFile(transactions)
  })
