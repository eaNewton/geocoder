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

geoBatch.geocode(addresses)
  .on('data', function(data) {
    const subpremise = extractFromAddress(data.results.address_components, 'subpremise');
    const street_number = extractFromAddress(data.result.address_components, 'street_number');
    const route = extractFromAddress(data.result.address_components, 'route');
    const locality = extractFromAddress(data.result.address_components, 'locality');
    const admin_area_1 = extractFromAddress(data.result.address_components, 'administrative_area_level_1');
    const zip = extractFromAddress(data.result.address_components, 'postal_code');

    const addressComponents = {};
    addressComponents['subpremise'] = subpremise;
    addressComponents['street_number'] = street_number;
    addressComponents['route'] = route;
    addressComponents['locality'] = locality;
    addressComponents['admin_area_1'] = admin_area_1; 
    addressComponents['zip'] = zip;

    const dataArray = {};
    dataArray['full_input'] = data.address;
    dataArray['formatted_address'] = data.result.formatted_address;
    dataArray['address_components'] = addressComponents;
    dataArray['lat'] = data.result.geometry.location.lat;
    dataArray['lng'] = data.result.geometry.location.lng;
    dataArray['place_id'] = data.result.place_id;
    dataArray['types'] = data.result.types;

    const dataArrayJSON = JSON.stringify(dataArray);

    console.log(dataArrayJSON);
  })
  .on('end', function() {
    console.log('Finished!');
  });