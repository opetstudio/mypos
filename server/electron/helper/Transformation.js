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
module.exports.halHateoas = function (dataList) {
  // {"_links":{"self":{"href":"http:\/\/localhost:8080\/users?page=1"},"first":{"href":"http:\/\/localhost:8080\/users"},"last":{"href":"http:\/\/localhost:8080\/users?page=1"}},"_embedded":{"tb_users":[{"_id":"12","uuid":null,"username":"admin","email":"ahok@gmail.com","password":"$2y$10$Rkbm7Gjw4O6rj9yX57sob.2CeebsjBJopvFoKM\/V\/S4CiNFY1hh2W","client_id":"admin","scope":"1","user_number":"U1","first_name":"ahok","last_name":"purnama","phone_number":"2323232","modifiedon":"1542799313705","createdon":"1536479653392","createdby":"ahok","modifiedby":"12","status":"publish","_links":{"self":{"href":"http:\/\/localhost:8080\/users\/12"}}},{"_id":"15","uuid":null,"username":"avi","email":"avis@gmail.com","password":"$2y$10$Nl81O6EadZru5.BMM2eqGeWEqLyC1YiBYTA7JEaBP3PPamZcMScLi","client_id":"avi","scope":"5","user_number":"IDE00013","first_name":"avi","last_name":"gailll","phone_number":"23232","modifiedon":"1538662027530","createdon":"1536480173252","createdby":"ahok","modifiedby":"12","status":"remove","_links":{"self":{"href":"http:\/\/localhost:8080\/users\/15"}}},{"_id":"16","uuid":null,"username":"achas","email":"acha@gmail.com","password":"$2y$10$p8XE3dyyflsUuh6g.nQU9.pA3GrG8NY.2EVmWLFJAYOAO7BFa3fC.","client_id":"achas","scope":"5","user_number":"IDE00016","first_name":"acha","last_name":"macaaa","phone_number":"2323233","modifiedon":"1538662573271","createdon":"1536482576987","createdby":"ahok","modifiedby":"12","status":"remove","_links":{"self":{"href":"http:\/\/localhost:8080\/users\/16"}}},{"_id":"17","uuid":"617e5650-c7e0-11e8-afc4-e36f7e2d6677","username":"raisa","email":"raisa@gmail.com","password":"$2y$10$Hbuxb1\/M2AJ\/51JLNpL1HehvA\/8i2TCVlhpBbE3kB.fKlybXPyJ1i","client_id":"raisa","scope":"100","user_number":"IDE00017","first_name":"raisa","last_name":"poai","phone_number":"085342805677","modifiedon":"1538662783325","createdon":"1538662715706","createdby":"12","modifiedby":"12","status":"remove","_links":{"self":{"href":"http:\/\/localhost:8080\/users\/17"}}},{"_id":"18","uuid":"de3f1698-c7e0-11e8-afc4-e36f7e2d6677","username":"raisa1","email":"raisa1@gmail.com","password":"$2y$10$4TcYVckRhFNEb4FMCUK9jOCUcwhsEvyeGzp38.mfc3D4b71fRXMDy","client_id":"raisa1","scope":"100","user_number":"IDE00018","first_name":"raisa","last_name":"poai","phone_number":"085342805677","modifiedon":"1538662943988","createdon":"1538662925007","createdby":"12","modifiedby":"12","status":"remove","_links":{"self":{"href":"http:\/\/localhost:8080\/users\/18"}}},{"_id":"19","uuid":"f7c0191e-c7e0-11e8-afc4-e36f7e2d6677","username":"raisa2","email":"raisa@gmail.com2","password":"$2y$10$rmw7PTM9.6\/r0OTwr2Jl.ubUjcKBjnoLg9kqAx21ic4aCWkKK7M3C","client_id":"raisa2","scope":"5","user_number":"IDE00019","first_name":"raisa","last_name":"poai","phone_number":"085342805677","modifiedon":"1538663450912","createdon":"1538662967796","createdby":"12","modifiedby":"19","status":"publish","_links":{"self":{"href":"http:\/\/localhost:8080\/users\/19"}}}]},"page_count":1,"page_size":25,"total_items":6,"page":1}
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
module.exports.response_success_create = function (body) {
  let responseWrapper = {
    ok: true,
    data: body,
    problem: '',
    status: 201
  }
  return responseWrapper
}
module.exports.response_error = function (body) {
  let responseWrapper = {
    originalError: {
      response: {
        data: body,
        status: body.status,
        statusText: body.statusText
      }
    },
    ok: false,
    data: body,
    problem: body,
    status: body.status
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
