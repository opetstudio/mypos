let Transformation = require('../helper/Transformation')
const ErevnaServices = require('erevna-services')
const Security = ErevnaServices.security
const ErrorCode = ErevnaServices.errorCode
module.exports = function (event, opt) {
  let routeName = opt.routeName
  let params = opt.params
  let cb = opt.callback
  //   console.log(`execute authentication for route ${routeName} params=`, params)
  let request = params
  // validasi token
  var authorization = request.headers.authorization || request.headers.Authorization
  request.headers.inc++
  console.log('authorization=', authorization)
  const noNeedAuth = [
    '/oauthhh',
    '/api/login/create',
    '/api/login/cek'
  ]
  let respCallback = { params: request }
  if (noNeedAuth.indexOf('/' + routeName) !== -1) return cb(respCallback)
  return Security.authAuthorizationToken({authorization, channelid: request.headers.channelid}, (e, o) => {
    if (e) {
      let errCode = ErrorCode[e] || {}
      return event.sender.send(
        '/' + routeName,
        true,
        {
          'headers': {...request.headers},
          'body': Transformation.response_failed({
            title: e,
            status: 400,
            detail: errCode.detail,
            ok: false,
            problem: e
          })
        }
      )
    } else {
      request.headers.session = o.credentials
      request.headers.authorization = o.authorization
      respCallback = { params: request }
      return cb(respCallback)
    }
  })
//   callback({ params: request })
}
