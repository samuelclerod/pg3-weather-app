const path = require('path')
const express = require('express')
const hbs = require('hbs')
const dotenv = require('dotenv')
dotenv.config()

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
    title: '🏡 Home',
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
  res.json({
    forecast: 'minha previsão do tempo',
    location: {
      latitude: 9.87345,
      longitude: 9.827348
    }
  })
})

app.get('/help/*', (req, res) => {
  res.send("Tópico de ajuda não encontrado")
})

app.get('*', (req, res) => {
  res.send("404 Page not found")
})

app.listen(port, () => {
  console.log(`🚀 Starting app on port ${port}...`)
})

// TODO: Criar pagina personalizada 404 para geral, que permita receber mensagens diferentes 
// para ser usada tanto na rota "*" quanto na rota "/help/*"



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