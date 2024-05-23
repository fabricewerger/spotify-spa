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
            <a onclick="getAlbums()">Click this and open console</a>
        `
  }
}
