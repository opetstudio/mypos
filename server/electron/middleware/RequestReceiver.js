function Main (event, opt) {
//   let routeName = opt.routeName
  let request = opt.request
  let cb = opt.callback
  request.headers.inc++
  let respCallback = { request }
  return cb(respCallback)
}
module.exports = Main
