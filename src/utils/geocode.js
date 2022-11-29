const request = require('request');
require('dotenv').config();


const geocode = (address, callback) => {
  
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.TOKEN}`;

  request({ url, json: true }, (error, response) => {
    if(error || !response.body.features){
      callback('Unable to connect to location services!', undefined)
    }else if(response.body.features.length === 0){
      callback('Unable to find location. Try another location', undefined)
    }else{
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        logitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      })
    }
  })

}

module.exports = geocode;