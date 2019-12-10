// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'

export const create = (api) => ({
  postBulletin: (data, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.post('/bulletins', data)
  },
  getBulletin: (data, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get('/bulletins/' + data.id)
  },
  getBulletins: (data, opt) => {
    // console.log('bulletin.api.getBulletins===>>>>')
    let { apiName, baseUrl, newerModifiedon } = data
    // if (!opt.session.token) return {}
    if (baseUrl) api.setBaseURL(baseUrl)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get(apiName || '/bulletins', { newerModifiedon }, data)
  },
  updateBulletin: (data, id, opt) => {
    console.log('hit api updateBulletin', data)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.patch('/bulletins/' + id, data)
  },
  updateBulletinBatch: (data, opt) => {
    console.log('hit api updateBulletinBatch', data)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.post('/bulletins-update-batch', data)
  },
  removeBulletin: (data, id, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.delete('/bulletins/' + id, data)
  }
})
