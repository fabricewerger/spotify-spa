require('dotenv').config()
const axios = require('axios')

function init() {
  const client_id = process.env.CLIENT_ID
  const client_secret = process.env.CLIENT_SECRET
  axios
    .post(
      'https://accounts.spotify.com/api/token',
      `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .then((response) => {
      console.log('Access Token:', response.data.access_token)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

module.exports = {
  init: init,
}
