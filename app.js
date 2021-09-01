const { getWeather } = require("./utils/weatherService")

const lat = '-7.2237358', lon = "-39678.3265404"

getWeather(lat, lon, (error, message) => {
  console.log(error)
  console.log(message)
})

