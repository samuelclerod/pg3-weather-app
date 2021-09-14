const request = require('postman-request')
const { forecast_variables } = require('../config/constants')


const forecast = (latitude, logitude, callback) => {
  const { access_key, base_url } = forecast_variables
  const url = `${base_url}?access_key=${access_key}&query=${latitude},${logitude}`

  request({ url, json: true }, (error, response) => {
    if (error) {
      // console.error(error)
      callback('Unavailable weather service', undefined)
    } else if (response.body.error) {
      // console.error(response.body.error)
      callback('Invalid coordinates', undefined)
    } else {
      const { temperature, feelslike, weather_descriptions, precip } = response.body.current
      const weather = weather_descriptions[0]
      let outputText = `It is currently  ${temperature} degrees out, and feels like ${feelslike}. There is a ${precip}% chance of rain, and sky is ${weather.toLowerCase()}.`
      callback(undefined, outputText)
    }
  })

}


module.exports = { forecast }