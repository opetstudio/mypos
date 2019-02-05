// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'

export const create = api => ({
  postClassparticipant: (data, opt) => {
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.post('classparticipants', data)
  },
  getClassparticipant: (data, opt) => {
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.get('classparticipants/' + data.id)
  },
  getClassparticipants: (
    { apiName, baseUrl, newerModifiedon, params },
    opt
  ) => {
    if (baseUrl) api.setBaseURL(baseUrl)
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.get(apiName || 'classparticipants', params)
  },
  updateClassparticipant: (data, id, opt) => {
    console.log('hit api updateClassparticipant', data)
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.patch('classparticipants/' + id, data)
  },
  updateClassparticipantBatch: (data, opt) => {
    console.log('hit api updateClassparticipantBatch', data)
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.post('classparticipants-update-batch', data)
  },
  removeClassparticipant: (data, id, opt) => {
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.delete('classparticipants/' + id, data)
  }
})
