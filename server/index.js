const express = require('express')

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const cors = require('cors');
const morgan = require('morgan')
const {best} = require('./utils/BestProfit');
const fs = require('fs');
const luxon = require('luxon');

const app = express()
var allowedOrigins = ['http://localhost:3000'];

app.use(cors({

  origin: function(origin, callback){
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },

  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],

  credentials: true,
}));
app.use(morgan('tiny'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
    return { 
      currency: currencyData.currency, 
      date: luxon.DateTime.fromISO(currencyData.date).toJSON(), 
      best: best(currencyData.quotes)
    }
  });
  res.send(bestData);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))