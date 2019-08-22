// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'

export const create = (api) => ({
  postEvent: (data, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.post('/events', data)
  },
  getEvent: (data, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get('/events/' + data.id)
  },
  getEvents: (data, opt) => {
    console.log('api.getEvents======')
    let { apiName, baseUrl, newerModifiedon } = data
    // if (!opt.session.token) return {}
    if (baseUrl) api.setBaseURL(baseUrl)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get(apiName || '/events', { newerModifiedon }, data)
  },
  updateEvent: (data, id, opt) => {
    console.log('hit api updateEvent', data)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.patch('/events/' + id, data)
  },
  updateEventBatch: (data, opt) => {
    console.log('hit api updateEventBatch', data)
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.post('/events-update-batch', data)
  },
  removeEvent: (data, id, opt) => {
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.delete('/events/' + id, data)
  }
})
