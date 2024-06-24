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
  return fetchWebApi('v1/me/top/tracks?time_range=short_term&limit=5', 'GET')
}

async function getArtistGenres(artistId) {
  return fetchWebApi(`v1/artists/${artistId}`, 'GET')
    .then((artist) => artist.genres)
    .catch((error) => {
      console.error('Failed to fetch artist genres:', error)
      return []
    })
}

const genreToClass = {
  'alternative rock': 'genre-alternative-rock',
  'ambient folk': 'genre-ambient-folk',
  'modern rock': 'genre-modern-rock',
  'electro house': 'genre-electro-house',
}

const getTopFive = async () => {
  const trackListContainer = document.getElementById('trackList')
  const spinner = document.createElement('div')
  spinner.className = 'spinner'
  trackListContainer.innerHTML = ''
  trackListContainer.appendChild(spinner)

  try {
    const [res] = await Promise.all([getTopTracks(), waitaMoment()])
    const topTracks = res.items
    trackListContainer.innerHTML = ''

    for (const { name, artists, album, popularity } of topTracks) {
      const genres = (
        await Promise.all(artists.map((artist) => getArtistGenres(artist.id)))
      ).flat()
      const listItem = document.createElement('li')
      listItem.classList.add('track-item')

      genres.forEach((genre) => {
        const genreClass = genreToClass[genre]
        if (genreClass) {
          listItem.classList.add(genreClass)
        }
      })

      const trackInfo = document.createElement('div')
      trackInfo.classList.add('track-item-info')
      const trackImage = document.createElement('img')
      trackImage.classList.add('track-item-image')

      trackInfo.innerHTML = `
        <span class='track-item-info-title'>${name}</span>
        <br><span>${artists.map((artist) => artist.name).join(', ')}</span>
        <br><span>Popularity: ${popularity}</span>
        <br><span>Genres: ${genres.join(', ')}</span>`
      trackImage.src = album.images[1]?.url
      trackImage.alt = name

      listItem.appendChild(trackImage)
      listItem.appendChild(trackInfo)
      trackListContainer.appendChild(listItem)
    }
  } catch (error) {
    console.error('Error in getTopFive:', error)
    trackListContainer.innerHTML =
      '<li>Failed to load top tracks. Please try again later.</li>'
  } finally {
    if (spinner.parentNode === trackListContainer) {
      trackListContainer.removeChild(spinner)
    }
  }
}

window.getTopFive = getTopFive
