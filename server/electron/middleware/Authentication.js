let Transformation = require('../helper/Transformation')
const ErevnaServices = require('erevna-services')
const Security = ErevnaServices.security
const ErrorCode = ErevnaServices.errorCode
module.exports = function (event, opt) {
  let routeName = opt.routeName
  let request = opt.request
  let cb = opt.callback
  const DB = opt.DB
  //   console.log(`execute authentication for route ${routeName} params=`, params)
  // validasi token
  var authorization = request.headers.authorization || request.headers.Authorization
  let token = ErevnaServices.security.tokenExtractor(authorization)
  request.headers.inc++
  // console.log('authorization=', authorization)
  const noNeedAuth = [
    '/post_oauthhh',
    '/api/login/create',
    '/api/login/cek'
  ]
  let respCallback = { request }
  let outError = (e) => {
    let errCode = ErrorCode[e] || {}
    return event.sender.send(
      '/' + routeName,
      true,
      {
        'headers': {...request.headers},
        'body': Transformation.response_error({
          title: e,
          status: 401,
          statusText: errCode.statusText,
          detail: errCode.detail,
          problem: e
        })
      }
    ) 
  }
  if (noNeedAuth.indexOf('/' + routeName) !== -1) return cb(respCallback)
  DB.session.findOne({token: token}, (e, o) => {
    if (e || !o) return outError('INVALID_AUTHORIZATION_TOKEN')
    return Security.authAuthorizationToken({authorization, channelid: request.headers.channelid}, (e, o) => {
      if (e) {
        return outError(e)
      } else {
        request.headers.session = o.credentials
        delete request.headers.Authorization
        request.headers.authorization = o.authorization
        respCallback = { request }
        return cb(respCallback)
      }
    })
  })
}
