import AbstractView from './AbstractView.js'

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle('Profile')
  }

  async getHtml() {
    return `
            <h1>Profile</h1>
            <p>View your privacy and configuration. This will be gone when you refresh the page.</p>
            <a onclick="handleAuth(event)" href="/profile-data">Authenticate with Spotify</a>
        `
  }
}
