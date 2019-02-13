function executeFunction (event, routeName, funcList, i, params, cb) {
  if (funcList.length === i) return cb(params)
  funcList[i](
    event,
    {
      routeName,
      params,
      callback: (out) => {
        executeFunction(event, routeName, funcList, i + 1, out.params, cb)
      }
    })
}

module.exports = (middleware = [], routeName, route) => {
  return (event, params) => {
    executeFunction(event, routeName, middleware, 0, params, (paramsOut) => {
      route[routeName](event, paramsOut)
    })
    // middleware[0](params, middleware[1])
  }
}
