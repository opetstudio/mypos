// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'

export const create = (api) => ({
  postRole: (data, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.post('/roles', data)
  },
  getRole: (data, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get('/roles/' + data.id)
  },
  getRoles: (data, opt) => {
    let { apiName, baseUrl, newerModifiedon } = data
    if (!opt.session.token) return {}
    if (baseUrl) api.setBaseURL(baseUrl)
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )

    // if (baseUrl) api.setBaseURL(baseUrl)
    // api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get(apiName || '/roles', { newerModifiedon }, data)
  },
  updateRole: (data, id, opt) => {
    console.log('hit api updateRole', data)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.patch('/roles/' + id, data)
  },
  updateRoleBatch: (data, opt) => {
    console.log('hit api updateRoleBatch', data)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.post('/roles-update-batch', data)
  },
  removeRole: (data, id, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.delete('/roles/' + id, data)
  }
})
