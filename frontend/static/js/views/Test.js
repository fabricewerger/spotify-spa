import AbstractView from './AbstractView.js'

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle('Test')
  }

  async getHtml() {
    return `
            <h1>Test</h1>
            <p>testpage</p>
            <a onclick="getAlbums()">Show favorite songs</a>
            <br>
             <a onclick="getRandomNumber()">random nummer promise</a>

            <h2>Top Tracks:</h2>
                  <ul id="trackList"></ul>
        `
  }
}
