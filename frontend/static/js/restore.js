
const getRefreshToken = async () => {
    // refresh token that has been previously stored
    const refreshToken = localStorage.getItem('refresh_token');
    const url = "https://accounts.spotify.com/api/token";
  
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: '3cd3b5de3b7e48d7ad01d44fa07f4afb'
      }),
    };
  
    const body = await fetch(url, payload);
    const response = await body.json();
  
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
    console.log(access_token, refreshToken)
  };  