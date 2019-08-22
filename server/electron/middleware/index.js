function executeFunction (event, routeName, funcList, i, request, DB, cb) {
  if (funcList.length === i) return cb(request)
  funcList[i](
    event,
    {
      DB,
      routeName,
      request,
      callback: (out) => {
        executeFunction(event, routeName, funcList, i + 1, out.request, DB, cb)
      }
    })
}

module.exports = (middleware = [], routeName, route, DB) => {
  // INIT DATA
  return (event, request) => {
    executeFunction(event, routeName, middleware, 0, request, DB, (request) => {
      route[routeName](event, request, DB)
    })
    // middleware[0](params, middleware[1])
  }
}
