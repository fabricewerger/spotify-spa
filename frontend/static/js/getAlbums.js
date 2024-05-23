export async function getAlbums() {
  // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
  const token =
    'BQAjEq-26k9RDidxW2s9YmsH3ry4zrZOQpuDBQQBD2ZgJOOnYi5eSISq9qmgZXXtN53fTZqTAOPSEs1VCUpiUaRMZP_SXacNCXQQUG2OXlTAioDI28fUOPDk3uwFFvKo3REWgi75qOmtaH19Q_dEX2WZE0x8t1n7xC1DTuIt2qKR11XNnNama0LhoAYPFfTuBNcY7jeMU-Kps-XVhbXBu3e_hGtzWvc1Th_lfRBxSAwX17Xu2iwm3R5iWnhqrUpXist81W-X'
  async function fetchWebApi(endpoint, method, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body: JSON.stringify(body),
    })
    return await res.json()
  }

  async function getTopTracks() {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (
      await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5', 'GET')
    ).items
  }

  const topTracks = await getTopTracks()
  console.log(
    topTracks?.map(
      ({ name, artists }) =>
        `${name} by ${artists.map((artist) => artist.name).join(', ')}`,
    ),
  )
}
window.getAlbums = getAlbums
