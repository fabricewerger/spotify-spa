export async function getTopFive() {
  // Authorization token that must have been created previously. See: https://developer.spotify.com/documentation/web-api/concepts/authorization
  // fill in from https://developer.spotify.com/
  const token =
    'BQD6tX8uS9UMtdA7BhjTLStyCHQVWdm258UBDVYHwJVqe2cAO7kcX9Jz3ckYVymzsAW86UpaWjoeloHMBRaV0FKvPcFou7OKmF1migYdRG19e6U5CSpZhYc2y9SvAWEkrQHmWdJP6odo5nwp8G4uxvNpiyv9qVZQVW_14OIH6C6lcyHNXHluSshDf8hv7fjK06yyoiH5ZRukx2OwoAEgjge0WgtBKd4YOS4UqdnMjT9yRg2UgO4Vbx7H2RMEIJQxWo80Vmft'

  async function fetchWebApi(endpoint, method, body) {
    try {
      const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method,
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      return await res.json()
    } catch (error) {
      console.error('Failed to fetch data from Spotify API:', error)
      throw error
    }
  }

  async function getTopTracks() {
    return (
      await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5', 'GET')
    ).items
  }

  try {
    const topTracks = await getTopTracks()
    const trackList = topTracks?.map(
      ({ name, artists }) =>
        `${name} by ${artists.map((artist) => artist.name).join(', ')}`,
    )

    const trackListContainer = document.getElementById('trackList')
    trackListContainer.innerHTML = ''

    trackList.forEach((track) => {
      const listItem = document.createElement('li')
      listItem.textContent = track
      trackListContainer.appendChild(listItem)
    })
  } catch (error) {
    console.error('Error in getTopFive:', error)
    const trackListContainer = document.getElementById('trackList')
    trackListContainer.innerHTML =
      '<li>Failed to load top tracks. Please try again later.</li>'
  }
}

window.getTopFive = getTopFive
