module.exports = {
  geocode_variables: {
    access_token: process.env.GEOCODE_TOKEN,
    base_url: process.env.GEOCODE_URL,
  },
  forecast_variables: {
    access_key: process.env.FORECAST_TOKEN,
    base_url: process.env.FORECAST_URL,
  },
  server: {
    port: process.env.PORT || 3000,
  }
}

