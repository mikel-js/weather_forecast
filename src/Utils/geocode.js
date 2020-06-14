const request = require('postman-request');

// const geocode = (address, callback) => {
  const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWVrZWwxNyIsImEiOiJjazNycGlsZ2YwY2E4M21wZTV5OHg1amViIn0.kut3aybasux0zRBygTwPfQ&limit=1`

  request({ url, json: true }, (err, res) => {
    if (err) {
      callback('Unable to connect to location', undefined)
    } else if (res.body.features.length === 0) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, {
        latitude: res.body.features[0].center[1],
        longitude: res.body.features[0].center[0],
        location: res.body.features[0].place_name
      })
    }
  })
}



module.exports = geocode;