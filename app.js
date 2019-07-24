require('dotenv').config({path: __dirname + '/.env'});

const GeoBatch = require('geobatch');
const addresses = require('./data/addresses_test.js').addresses;

geobatch = new GeoBatch({
  apiKey: process.env.API_KEY,
});

function extractFromAddress(components, type) {
  if (!components) {
    console.log("No components found.");
    return;
  }

  return components.filter(
    (component) => component.type.indexOf(type) === 0
  ).map(
    (item) => item.long_name
  ).pop() || null
}