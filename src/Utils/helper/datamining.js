export const arrayMerge = (args = []) => {
  //   var args = arguments
  var hash = {}
  var arr = []
  for (var i = 0; i < args.length; i++) {
    if (!args[i]) continue
    for (var j = 0; j < args[i].length; j++) {
      if (hash[args[i][j]] !== true && args[i][j] !== null && args[i][j] !== undefined) {
        arr[arr.length] = args[i][j]
        hash[args[i][j]] = true
      }
    }
  }
  return arr
}
export const getParameterByName = (name, url) => {
  if (!url) return ''
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}
export const updateQueryStringParameter = (uri, key, value) => {
  var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i')
  var separator = uri.indexOf('?') !== -1 ? '&' : '?'
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + '=' + value + '$2')
  } else {
    return uri + separator + key + '=' + value
  }
}
export const cleaningObject = (obj) => {
  delete obj[undefined]
  delete obj['undefined']
  delete obj['']
  delete obj['null']
  delete obj[null]
  // Object.keys(obj).forEach(key => {
  //   if (obj[key] === undefined || obj[key] === null || obj[key] === 'undefined' || obj[key] === 'null' || obj[key] === '') {
  //     Object.assign(key, {})
  //     delete obj[key]
  //     // if (window.UndefinedVariable) {
  //     //   Object.assign(window.UndefinedVariable, {})
  //     // }
  //   }
  // })
  return obj
}
