const weatherForm = document.querySelector('form')
const search = document.querySelector('#search')
const p1 = document.querySelector('#firstParagraph')
const p2 = document.querySelector('#secondParagraph')

weatherForm.addEventListener('submit', (ev) => {
  ev.preventDefault()
  console.log(search.value)
  fetch(`/weather?search=${search.value}`)
    .then(res => {
      res.json().then(data => {
        if (data.error) return setError(data.error)
        setSuccess(data)
      })
    })
    .catch(err => setError("We cannot proceed the request"))
})

const setError = (errorText) => {
  p1.setAttribute('class', 'error')
  p1.innerHTML = errorText
  p2.innerHTML = ""
}

const setSuccess = ({ location, forecast }) => {
  p1.setAttribute('class', '')
  p1.innerHTML = location.location
  p2.innerHTML = forecast
}