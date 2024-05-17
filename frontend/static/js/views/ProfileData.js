import AbstractView from './AbstractView.js'

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle('ProfileData')
  }

  async getHtml() {
    return `
            <h1>Profile</h1>
            <p>Manage your privacy and configuration.</p>
            <section id="profile">
                <h3>Logged in as <span id="displayName"></span></3>
                <span id="avatar"></span>
                <ul>
                    <li>User ID: <span id="id"></span></li>
                    <li>Email: <span id="email"></span></li>
                    <li>Spotify URI: <a id="uri" href="#"></a></li>
                    <li>Link: <a id="url" href="#"></a></li>
                    <li>Profile Image: <span id="imgUrl"></span></li>
                </ul>
                </section>
        `
  }
}
