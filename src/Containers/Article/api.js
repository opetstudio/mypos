// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'

export const create = (api) => ({
  postArticle: (data, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.post('/articles', data)
  },
  getArticle: (data, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get('/articles/' + data.id)
  },
  getArticles: (data, opt) => {
    let { apiName, baseUrl, newerModifiedon } = data
    if (!opt.session.token) return {}
    if (baseUrl) api.setBaseURL(baseUrl)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get(apiName || '/articles', { newerModifiedon }, data)
  },
  updateArticle: (data, id, opt) => {
    console.log('hit api updateArticle', data)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.patch('/articles/' + id, data)
  },
  updateArticleBatch: (data, opt) => {
    console.log('hit api updateArticleBatch', data)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.post('/articles-update-batch', data)
  },
  removeArticle: (data, id, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.delete('/articles/' + id, data)
  }
})
