// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'

export const create = api => ({
  postParticipant: (data, opt) => {
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.post('participants', data)
  },
  getParticipant: (data, opt) => {
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.get('participants/' + data.id)
  },
  getParticipants: ({ apiName, baseUrl, newerModifiedon }, opt) => {
    if (!opt.session.token) return { ok: false }
    if (baseUrl) api.setBaseURL(baseUrl)
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.get(apiName || 'participants', { newerModifiedon })
  },
  participantFetchInspect: ({ apiName, baseUrl, newerModifiedon }, opt) => {
    if (baseUrl) api.setBaseURL(baseUrl)
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.get(apiName || 'inspects', { newerModifiedon })
  },
  updateParticipant: (data, id, opt) => {
    // console.log('hit api updateParticipant', data)
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.patch('participants/' + id, data)
  },
  updateParticipantBatch: (data, opt) => {
    // console.log('hit api updateParticipantBatch', data)
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.post('participants-update-batch', data)
  },
  removeParticipant: (data, id, opt) => {
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.delete('participants/' + id, data)
  }
})
