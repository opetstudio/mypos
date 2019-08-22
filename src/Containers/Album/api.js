// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'

export const create = (api) => ({
  postAlbum: (data, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.post('/albums', data)
  },
  getAlbum: (data, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get('/albums/' + data.id)
  },
  getAlbums: (data, opt) => {
    // console.log('album.api.getAlbums===>>>>')
    let { apiName, baseUrl, newerModifiedon } = data
    // if (!opt.session.token) return {}
    if (baseUrl) api.setBaseURL(baseUrl)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get(apiName || '/albums', { newerModifiedon }, data)
  },
  updateAlbum: (data, id, opt) => {
    console.log('hit api updateAlbum', data)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.patch('/albums/' + id, data)
  },
  updateAlbumBatch: (data, opt) => {
    console.log('hit api updateAlbumBatch', data)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.post('/albums-update-batch', data)
  },
  removeAlbum: (data, id, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.delete('/albums/' + id, data)
  }
})
