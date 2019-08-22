// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'

export const create = (api) => ({
  postAlbumgallery: (data, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.post('/albumgallerys', data)
  },
  getAlbumgallery: (data, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get('/albumgallerys/' + data.id)
  },
  getAlbumgallerys: (data, opt) => {
    // console.log('albumgallery.api.getAlbumgallerys===>>>>')
    let { apiName, baseUrl, newerModifiedon } = data
    // if (!opt.session.token) return {}
    if (baseUrl) api.setBaseURL(baseUrl)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get(apiName || '/albumgallerys', { newerModifiedon }, data)
  },
  updateAlbumgallery: (data, id, opt) => {
    console.log('hit api updateAlbumgallery', data)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.patch('/albumgallerys/' + id, data)
  },
  updateAlbumgalleryBatch: (data, opt) => {
    console.log('hit api updateAlbumgalleryBatch', data)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.post('/albumgallerys-update-batch', data)
  },
  removeAlbumgallery: (data, id, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.delete('/albumgallerys/' + id, data)
  }
})
