// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'

export const create = (api) => ({
  postPointofsale: (data, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.post('/pointofsales', data)
  },
  getPointofsale: (data, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get('/pointofsales/' + data.id)
  },
  getPointofsales: ({ apiName, baseUrl, newerModifiedon }, opt) => {
    if (!opt.session.token) return {}
    if (baseUrl) api.setBaseURL(baseUrl)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get(apiName || '/pointofsales', { newerModifiedon })
  },
  updatePointofsale: (data, id, opt) => {
    console.log('hit api updatePointofsale', data)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.patch('/pointofsales/' + id, data)
  },
  updatePointofsaleBatch: (data, opt) => {
    console.log('hit api updatePointofsaleBatch', data)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.post('/pointofsales-update-batch', data)
  },
  removePointofsale: (data, id, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.delete('/pointofsales/' + id, data)
  }
})
