const { geocode } = require("./utils/geocode")
const { forecast } = require("./utils/forecast")

const city = 'Blumenau'

geocode(city, (error, geoLocation) => {
  if (error) {
    return console.log(`Some error occurred: ${error}`)
  }
  const { latitude, longitude } = geoLocation
  forecast(latitude, longitude, (error, message) => {
    if (error) return console.log(error)
    console.log(message)
  })
})