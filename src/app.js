const path = require('path')
const express = require('express')
const constants = require('../config/constants')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

//TODO add template engine: ejs, pug, hbs(handlebars)

app.get('/weather', (req, res) => {
  res.json({
    forecast: 'minha previsão do tempo',
    location: {
      latitude: 9.87345,
      longitude: 9.827348
    }
  })
})

const port = constants.server.port

app.listen(port, () => {
  console.log(`🚀 Starting app on port ${port}...`)
})





// const { geocode } = require("./utils/geocode")
// const { forecast } = require("./utils/forecast")

// const city = 'Blumenau'

// geocode(city, (error, geoLocation) => {
//   if (error) {
//     return console.log(`Some error occurred: ${error}`)
//   }
//   const { latitude, longitude } = geoLocation
//   forecast(latitude, longitude, (error, message) => {
//     if (error) return console.log(error)
//     console.log(message)
//   })
// })