const request = require('postman-request');


const weatherstack = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=6713453679c9b8a7a23ac9a6c0e0a9b6&query=${lat},${long}`

  request({ url, json: true }, (err, res) => {
    if (err) {
      callback('Unable to connect to weather service')
    } else if (res.body.error) {
      console.log('Unable to connect to weather service')
    } else {
      callback(undefined, `${res.body.current.weather_descriptions[0]}. Current temperature is ${res.body.current.temperature}. It feels like ${res.body.current.feelslike} degrees out and the humidity is ${res.body.current.humidity}%.`)
    }
  })
}

module.exports = weatherstack