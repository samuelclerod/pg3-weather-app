const path = require('path')
const express = require('express')
const hbs = require('hbs')
const dotenv = require('dotenv')
dotenv.config()

//local imports
const { geocode } = require("./utils/geocode")
const { forecast } = require("./utils/forecast")
const { port } = require('../config/constants').server

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

// template engine configuration
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//static assets configuration
app.use(express.static(publicDirectoryPath))

// endpoints
app.get('/', (req, res) => {
  res.render('home', {
    title: '🏡 Weather',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: '🙇‍♂️ Help!',
    helpMessage: 'Aqui você encontra um pouco de ajuda...',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: '👨‍🦲 About me ',
    name: 'Samuel Rodrigues',
  })
})

app.get('/weather', (req, res) => {
  //retrieve search terms
  const { search } = req.query
  if (!search) {
    return res.status(400).send({ error: 'invalid search term' })
  }
  // get weather data
  geocode(search, (error, geoLocation) => {
    if (error) {
      return res.status(400).send({ error })
    }
    const { latitude, longitude } = geoLocation
    forecast(latitude, longitude, (error, message) => {
      if (error) {
        return res.status(500).send({ error })
      }
      res.json({
        searchTerm: search,
        forecast: message,
        location: geoLocation
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.send("Tópico de ajuda não encontrado")
})

app.get('*', (req, res) => {
  res.render('404', {
    layout: 'error_layout',
    title: '🔎 404',
    message: 'This is not the page you are looking for'
  })
})

app.listen(port, () => {
  console.log(`🚀 Starting app on port ${port}...`)
})