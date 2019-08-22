// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'

export const create = (api) => ({
  postProduct: (data, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.post('/products', data)
  },
  getProduct: (data, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get('/products/' + data.id)
  },
  getProducts: (data, opt) => {
    let { apiName, baseUrl, newerModifiedon } = data
    if (!opt.session.token) return {}
    if (baseUrl) api.setBaseURL(baseUrl)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get(apiName || '/products', { newerModifiedon }, data)
  },
  updateProduct: (data, id, opt) => {
    console.log('hit api updateProduct', data)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.patch('/products/' + id, data)
  },
  updateProductBatch: (data, opt) => {
    console.log('hit api updateProductBatch', data)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.post('/products-update-batch', data)
  },
  removeProduct: (data, id, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.delete('/products/' + id, data)
  }
})
