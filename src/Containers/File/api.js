// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'
import _ from 'lodash'

export const create = api => ({
  postFile: (data, opt) => {
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    api.setHeader('Content-Type', 'multipart/form-data')
    let fData = new FormData()
    _.mapKeys(data, (value, key) => {
      return fData.append(key, value)
    })
    // fData.append('filecontent', data.filecontent)
    if (data.filecontent) fData.set('filecontent', data.filecontent)
    console.log('===>create file fData=', fData)
    return api.post('files', fData)
  },
  getFile: (data, opt) => {
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.get('files/' + data.id)
  },
  getFiles: ({ apiName, baseUrl, newerModifiedon }, opt) => {
    if (baseUrl) api.setBaseURL(baseUrl)
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.get(apiName || 'files', { newerModifiedon })
  },
  updateFile: (data, id, opt) => {
    console.log('hit api updateFile', data)
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    api.setHeader('Content-Type', 'multipart/form-data')
    let fData = new FormData()
    _.mapKeys(data, (value, key) => {
      return fData.append(key, value)
    })
    // fData.append('filecontent', data.filecontent)
    if (data.filecontent) fData.set('filecontent', data.filecontent)

    return api.patch('files/' + id, fData)
  },
  updateFileBatch: (data, opt) => {
    console.log('hit api updateFileBatch', data)
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.post('files-update-batch', data)
  },
  removeFile: (data, id, opt) => {
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.delete('files/' + id, data)
  }
})
