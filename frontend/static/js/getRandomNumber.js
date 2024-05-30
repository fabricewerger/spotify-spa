function waitaMoment() {
  return new Promise((resolve) => setTimeout(resolve, 2000))
}

function getRandomNumber() {
  return new Promise((resolve, reject) => {
    const randomNumber = Math.floor(Math.random() * 10) + 1
    const resultElement = document.getElementById('randomNumberResult')

    resultElement.innerText = 'Loading...'

    if (randomNumber > 5) {
      waitaMoment().then(() => {
        resultElement.innerText = `nice number: ${randomNumber}`
        console.log('nice number:', randomNumber)
        resolve(randomNumber)
      })
    } else {
      waitaMoment().then(() => {
        resultElement.innerText = `bad number error!`

        reject(randomNumber)
      })
    }
  })
}

window.getRandomNumber = getRandomNumber
