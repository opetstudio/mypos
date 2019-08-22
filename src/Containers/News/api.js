// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'

export const create = (api) => ({
  postNews: (data, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.post('/newss', data)
  },
  getNews: (data, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get('/newss/' + data.id)
  },
  getNewss: (data, opt) => {
    let { apiName, baseUrl, newerModifiedon } = data
    if (!opt.session.token) return {}
    if (baseUrl) api.setBaseURL(baseUrl)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get(apiName || '/newss', { newerModifiedon }, data)
  },
  updateNews: (data, id, opt) => {
    console.log('hit api updateNews', data)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.patch('/newss/' + id, data)
  },
  updateNewsBatch: (data, opt) => {
    console.log('hit api updateNewsBatch', data)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.post('/newss-update-batch', data)
  },
  removeNews: (data, id, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.delete('/newss/' + id, data)
  }
})
