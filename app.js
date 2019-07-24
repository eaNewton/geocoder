require('dotenv').config({path: __dirname + '/.env'});

const GeoBatch = require('geobatch');
const addresses = require('./data/addresses_test.js').addresses;

geobatch = new GeoBatch({
  apiKey: process.env.API_KEY,
});