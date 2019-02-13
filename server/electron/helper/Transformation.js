module.exports.response_failed = function (params) {
  let responseData = {'type': 'http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html', 'title': params.title, 'status': params.status, 'detail': params.detail}
  let responseWrapper = {
    ok: params.ok,
    data: responseData,
    problem: params.problem,
    status: params.status
  }
  return responseWrapper
}
module.exports.response = function (body) {
  let responseWrapper = {
    ok: true,
    data: body,
    problem: '',
    status: 200
  }
  return responseWrapper
}
module.exports.response_success_login = function (params) {
  let responseData = {'access_token': params.access_token, 'expires_in': 3600, 'token_type': params.token_type, 'scope': null, 'refresh_token': params.refresh_token, '_id': params._id}
  let responseWrapper = {
    ok: true,
    data: responseData,
    problem: '',
    status: 200
  }
  return responseWrapper

//   let responseData = {'type': 'http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html', 'title': params.title, 'status': params.status, 'detail': params.detail}
//   let responseWrapper = {
//     ok: params.ok,
//     data: responseData,
//     problem: params.problem,
//     status: params.status
//   }
//   return responseWrapper
}
