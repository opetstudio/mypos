// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'

export const create = api => ({
  postFilecontent: (data, opt) => {
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.post('filecontents', data)
  },
  getFilecontent: (data, opt) => {
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.get('filecontents/' + data.id)
  },
  getFilecontents: ({ apiName, baseUrl, newerModifiedon }, opt) => {
    if (baseUrl) api.setBaseURL(baseUrl)
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.get(apiName || 'filecontents', { newerModifiedon })
  },
  updateFilecontent: (data, id, opt) => {
    console.log('hit api updateFilecontent', data)
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.patch('filecontents/' + id, data)
  },
  updateFilecontentBatch: (data, opt) => {
    console.log('hit api updateFilecontentBatch', data)
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.post('filecontents-update-batch', data)
  },
  removeFilecontent: (data, id, opt) => {
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.delete('filecontents/' + id, data)
  }
})
