const mockRequest = (res) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(res)
    }, 1200);
})

module.exports = mockRequest
