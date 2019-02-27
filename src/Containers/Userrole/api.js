// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'

export const create = (api) => ({
  postUserrole: (data, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.post('/userroles', data)
  },
  getUserrole: (data, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get('/userroles/' + data.id)
  },
  getUserroles: ({ apiName, baseUrl, newerModifiedon }, opt) => {
    if (!opt.session.token) return {}
    if (baseUrl) api.setBaseURL(baseUrl)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get(apiName || '/userroles', { newerModifiedon })
  },
  updateUserrole: (data, id, opt) => {
    console.log('hit api updateUserrole', data)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.patch('/userroles/' + id, data)
  },
  updateUserroleBatch: (data, opt) => {
    console.log('hit api updateUserroleBatch', data)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.post('/userroles-update-batch', data)
  },
  removeUserrole: (data, id, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.delete('/userroles/' + id, data)
  },
  doDeleteUserRole: (data, opt) => {
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.post('/userrole-delete-role', data)
  }
})
