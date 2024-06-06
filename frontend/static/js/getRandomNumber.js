function waitaMoment() {
  return new Promise((resolve) => setTimeout(resolve, 2000))
}

function getRandomNumber() {
  return new Promise((resolve, reject) => {
    const randomNumber = Math.floor(Math.random() * 10) + 1

    if (randomNumber > 5) {
      resolve(randomNumber)
    } else {
      reject(randomNumber)
    }
  })
}

const parentFunction = () => {
  const resultElement = document.getElementById('randomNumberResult')
  const spinner = document.createElement('div')
  spinner.className = 'spinner'
  resultElement.innerHTML = ''
  resultElement.appendChild(spinner)

  Promise.all([getRandomNumber(), waitaMoment()])
    .then((res) => {
      resultElement.innerHTML = ''
      resultElement.innerText = `nice number: ${res[0]}`
      console.log('nice number:', res[0])
    })
    .catch((rej) => {
      resultElement.innerHTML = ''
      resultElement.innerText = 'bad number error!'
      console.error('bad number:', rej)
    })
    .finally(() => {
      if (spinner.parentNode === resultElement) {
        resultElement.removeChild(spinner)
      }
    })
}

window.getRandomNumber = parentFunction
