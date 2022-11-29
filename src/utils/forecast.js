const request = require('request');
require('dotenv').config();


const forecast = (lat, lon, callback) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.APP_ID}`
  request({url, json: true}, (error, response)=>{
      if(error){
        callback('Unable to connect Weather service!', undefined)
      }else if(response.body.error){
        callback('Unable to find location', undefined)
      }else{
       callback(undefined, {
        current: Math.round(response.body.main.temp - 273.15),
        humidity: response.body.main.humidity,
     });
      }
   })
}

module.exports = forecast;