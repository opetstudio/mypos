// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'

export const create = api => ({
  postUser: (data, opt) => {
    if (!opt.session.token) return {}
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.post('/users', data)
  },
  getUser: (data, opt) => {
    if (!opt.session.token) return {}
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.get('/users/' + data.id)
  },
  getUserProfile: (data, opt) => {
    if (!opt.session.token) return {}
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.get('/getUserProfile/' + data.username)
  },
  getUsers: (data, opt) => {
    let { apiName, baseUrl, newerModifiedon } = data
    if (!opt.session.token) return {}
    if (baseUrl) api.setBaseURL(baseUrl)
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.get(apiName || '/users', {newerModifiedon}, data)
  },
  updateUser: (data, id, opt) => {
    if (!opt.session.token) return {}
    // console.log('hit api updateUser', data)
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.patch('/users/' + id, data)
  },
  updateUserBatch: (data, opt) => {
    if (!opt.session.token) return {}
    // console.log('hit api updateUserBatch', data)
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.post('/users-update-batch', data)
  },
  removeUser: (data, id, opt) => {
    if (!opt.session.token) return {}
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.delete('/users/' + id, data)
  }
  // doDeleteRole: (data, opt) => {
  //   api.setHeader(
  //     AppConfig.authHeader,
  //     opt.session.token_type + ' ' + opt.session.access_token
  //   )
  //   return api.post('/user-delete-role', data)
  // }
})
