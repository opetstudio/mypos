// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'

export const create = (api) => ({
  postGallery: (data, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.post('/gallerys', data)
  },
  getGallery: (data, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get('/gallerys/' + data.id)
  },
  getGallerys: (data, opt) => {
    // console.log('gallery.api.getGallerys===>>>>')
    let { apiName, baseUrl, newerModifiedon } = data
    // if (!opt.session.token) return {}
    if (baseUrl) api.setBaseURL(baseUrl)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get(apiName || '/gallerys', { newerModifiedon }, data)
  },
  updateGallery: (data, id, opt) => {
    console.log('hit api updateGallery', data)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.patch('/gallerys/' + id, data)
  },
  updateGalleryBatch: (data, opt) => {
    console.log('hit api updateGalleryBatch', data)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.post('/gallerys-update-batch', data)
  },
  removeGallery: (data, id, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.delete('/gallerys/' + id, data)
  }
})
