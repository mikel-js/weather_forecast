const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./Utils/geocode')
const weatherstack = require('./Utils/weatherstack')

const app = express()

// Define paths for express. yung templates ksi binago ntn ung views, default kc sa hbs ung views folder. prng index
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// use hbs to serve dynamic, html for static. like pag header at footer. yung res.render('index) dpt same sya ng index.hbs
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'What is the weather like now? / Millainen sää on nyt?'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About'
  })
})

// Json ung result n2

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Input a valid address'
    })
  }

  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({
        error: err
      })
    }
    weatherstack(latitude, longitude, (err, forecast) => {
      if (err) {
        return res.send({
          error: err
        })
      }
      res.send({
        forecast: forecast,
        address: location
      })
    })
  })
})

app.get('/about/*', (req, res) => {
  res.render('error', {
    title: 404,
    message: 'About page'
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    title: 404,
    message: 'Page'
  })
})

app.listen(3000, () => {
  console.log('Server up')
})