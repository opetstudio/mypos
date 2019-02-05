// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'

export const create = api => ({
  postConference: (data, opt) => {
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.post('conferences', data)
  },
  getConference: (data, opt) => {
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.get('conferences/' + data.id)
  },
  getConferences: ({ apiName, baseUrl, newerModifiedon }, opt) => {
    if (baseUrl) api.setBaseURL(baseUrl)
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.get(apiName || 'conferences', { newerModifiedon })
  },
  updateConference: (data, id, opt) => {
    // console.log('hit api updateConference', data)
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.patch('conferences/' + id, data)
  },
  updateConferenceBatch: (data, opt) => {
    // console.log('hit api updateConferenceBatch', data)
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.post('conferences-update-batch', data)
  },
  removeConference: (data, id, opt) => {
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.delete('conferences/' + id, data)
  }
})
