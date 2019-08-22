let erevnaServices = require('erevna-services')

let filtering = (request) => new Promise((resolve) => {
  request.body = erevnaServices.model[request.headers.entity].convertToSchemaForUpdate(request.body) || {}
  resolve(request)
})
let validate = (request) => new Promise((resolve) => {
  resolve(request)
})

module.exports = {
  filtering,
  validate
}
