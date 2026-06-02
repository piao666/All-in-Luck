function mockRequest(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 120)
  })
}

module.exports = {
  mockRequest
}
