const express = require('express')

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const cors = require('cors');
const morgan = require('morgan')
const {best} = require('./utils/BestProfit');
const { CORS_CONFIG, PORT } = require('./config/config')
const fs = require('fs');
const luxon = require('luxon');

const app = express()

app.use(cors(CORS_CONFIG));
app.use(morgan('tiny'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

function fetchAllData() {
  return fs.readFileSync('./server/data/CryptoData.json', 'utf8');
}

app.get('/data/best', (req, res) => {
  var contents = fetchAllData();
  var allCurrencyDataObj = JSON.parse(contents);
  var bestData = allCurrencyDataObj.map(currencyData => {
    return { 
      currency: currencyData.currency, 
      date: luxon.DateTime.fromISO(currencyData.date).toJSON(), 
      best: best(currencyData.quotes)
    }
  });
  res.send(bestData);
});

app.listen(PORT, () => console.log(`Crypto Server app listening on port ${PORT}!`))