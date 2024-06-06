function waitaMoment() {
  return new Promise((resolve) => setTimeout(resolve, 2000))
}

function fetchWebApi(endpoint, method, body) {
  const token = ''

  return new Promise((resolve, reject) => {
    fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          reject(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then(resolve)
      .catch((error) => {
        console.error('Failed to fetch data from Spotify API:', error)
        reject(error)
      })
  })
}

function getTopTracks() {
  return fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5', 'GET')
}

const getTopFive = () => {
  const trackListContainer = document.getElementById('trackList')
  const spinner = document.createElement('div')
  spinner.className = 'spinner'
  trackListContainer.innerHTML = ''
  trackListContainer.appendChild(spinner)

  Promise.all([getTopTracks(), waitaMoment()])
    .then(([res]) => {
      const topTracks = res.items
      const trackList = topTracks?.map(
        ({ name, artists }) =>
          `${name} by ${artists.map((artist) => artist.name).join(', ')}`,
      )

      trackListContainer.innerHTML = ''

      trackList.forEach((track) => {
        const listItem = document.createElement('li')
        listItem.textContent = track
        trackListContainer.appendChild(listItem)
      })
    })
    .catch((rej) => {
      console.error('Error in getTopFive:', rej)
      trackListContainer.innerHTML =
        '<li>Failed to load top tracks. Please try again later.</li>'
    })
    .finally(() => {
      if (spinner.parentNode === trackListContainer) {
        trackListContainer.removeChild(spinner)
      }
    })
}

window.getTopFive = getTopFive
