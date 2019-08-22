// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'

export const create = api => ({
  postLogin: (data, opt) => {
    console.log('postLogin data', data)
    // api.setHeader('authorization', opt.session.token)
    const resp = api.post('/oauthhh', data)
    return resp
  },
  getLogin: data => api.get('/logins/' + data.id),
  getLogins: ({ apiName, baseUrl, newerModifiedon }) => {
    if (baseUrl) api.setBaseURL(baseUrl)
    return api.get(apiName || '/logins/', { newerModifiedon })
  },
  updateLogin: data => api.patch('/logins/' + data.id, { login: data }),
  removeLogin: (data, opt) => {
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.get('/logout')
  },
  getLoginStatus: (data, opt) => {
    // const auth = opt.session.token_type + ' ' + opt.session.access_token
    // console.log('auth===>', auth)
    api.setHeader('Content-Type', 'application/json')
    api.setHeader('Accept', 'application/json')
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.get('/get-login-status')
  }
})
