const request = require('postman-request')
const { access_key, base_url } = require('../config/constants')

const getWeather = (latitude, logitude, callback) => {
  const url = `${base_url}?access_key=${access_key}&query=${latitude},${logitude}`

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unavailable weather service', undefined)
    } else if (response.body.error) {
      callback('Invalid coordinates', undefined)
    } else {
      const { temperature, feelslike, weather_descriptions, precip } = response.body.current
      const weather = weather_descriptions[0]
      let outputText = `It is currently  ${temperature} degrees out, and feels like ${feelslike}. There is a ${precip}% chance of rain, and sky is ${weather.toLowerCase()}.`
      callback(undefined, outputText)
    }
  })

}


module.exports = { getWeather }