// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'

export const create = api => ({
  postParticipantbadge: (data, opt) => {
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.post('participantbadges', data)
  },
  getParticipantbadge: (data, opt) => {
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.get('participantbadges/' + data.id)
  },
  getParticipantbadges: ({ apiName, baseUrl, newerModifiedon }, opt) => {
    if (baseUrl) api.setBaseURL(baseUrl)
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.get(apiName || 'participantbadges', { newerModifiedon })
  },
  updateParticipantbadge: (data, id, opt) => {
    console.log('hit api updateParticipantbadge', data)
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.patch('participantbadges/' + id, data)
  },
  updateParticipantbadgeBatch: (data, opt) => {
    console.log('hit api updateParticipantbadgeBatch', data)
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.post('participantbadges-update-batch', data)
  },
  removeParticipantbadge: (data, id, opt) => {
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.delete('participantbadges/' + id, data)
  }
})
