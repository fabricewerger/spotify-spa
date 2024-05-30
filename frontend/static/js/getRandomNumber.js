function getRandomNumber() {
  return new Promise((resolve, reject) => {
    const randomNumber = Math.floor(Math.random() * 10) + 1

    if (randomNumber > 5) {
      resolve(console.log('nice number'))
    } else {
      reject(console.log('bad number'))
    }
  })
}

window.getRandomNumber = getRandomNumber
