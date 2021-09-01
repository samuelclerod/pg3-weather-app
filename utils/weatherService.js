const request = require('postman-request')
const { access_key, base_url } = require('../config/constants')

const lat = '-7.2237358', lon = "-39.3265404"

const url = `${base_url}?access_key=${access_key}&query=${lat},${lon}`
// imprimir "It is currently  y degrees out. There is a X% chance of rain.
request({ url, json: true }, (error, response) => {
  if (error) {
    return console.log("Unavailable weather service")
  }
  if (response.body.error) {
    return console.log("Invalid coordinates")
  }

  const { temperature, feelslike, weather_descriptions, precip } = response.body.current
  const weather = weather_descriptions[0]

  let outputText = `It is currently  ${temperature} degrees out, and feels like`
  outputText += ` ${feelslike}. There is a ${precip}% chance of rain, and sky is ${weather.toLowerCase()}`

  console.log(outputText)
})
