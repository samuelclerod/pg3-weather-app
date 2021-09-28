const request = require('postman-request')
const { geocode_variables } = require('../../config/constants')
// Usando o request, você vai passar o nome da cidade e mostrar as coordenadas a partir da api do MAPBOX.

const geocode = (searchTerm, callback) => {
  console.log(searchTerm)
  const { access_token, base_url } = geocode_variables
  const url = `${base_url}/${searchTerm}.json?access_token=${access_token}`
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unavailable geolocation service', undefined)
    } else if (response.body.message) {
      callback('Invalid credentials', undefined)
    } else {
      const [longitude, latitude] = response.body.features[0].center
      const location = response.body.features[0].place_name
      callback(undefined, { latitude, longitude, location })
    }
  })

}

module.exports = { geocode }