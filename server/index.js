const express = require('express')
const morgan = require('morgan')
const best = require('./utils/BestProfit');
const fs = require('fs');

const app = express()
app.use(morgan('tiny'))
const port = 3030

const maxQuotes = 3000

function fetchAllData() {
  return fs.readFileSync('./server/data/CryptoData.json', 'utf8');
}

app.get('/data/all', (req, res) => {
  res.send(JSON.parse(fetchAllData()));
});

app.get('/data/best', (req, res) => {
  var contents = fetchAllData();
  var allCurrencyDataObj = JSON.parse(contents);
  var bestData = allCurrencyDataObj.map(currencyData => {
    return { currency: currencyData.currency, best: best(currencyData.quotes)}
  });
  res.send(bestData);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))