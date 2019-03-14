module.exports = (request) => new Promise((resolve) => {
  // console.log('receive request headers = ', request.headers)
  // console.log('receive request body = ', request.body)
  // console.log(`receive request|url=${request.url} entity=${request.headers.entity} body=${request.headers.entity} neDBDataPath=${request.headers.neDBDataPath}`)
  resolve(request)
})
