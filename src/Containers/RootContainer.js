import React, { Component } from 'react'
// import Navigation from '../Navigation/SwaggerNavigation'
import Navigation from '../Navigation/PaymentpageNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import UserActions from './User/redux'
import ReduxPersist from '../Config/ReduxPersist'
import LoginActions, { LoginSelectors } from './Login/redux'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import enTranslationMessages from '../Translations/en.json'

addLocaleData([...en])

export const appLocales = ['en']

export const DEFAULT_LOCALE = 'en'

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {}
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key]
    return Object.assign(formattedMessages, { [key]: formattedMessage })
  }, {})
}

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages)
  // You can add other languages here.
}

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
    // console.log('halllleeeeeluuuyaaaaaaaa')
    // this.props.fetchUser({id: this.props.loginToken})
  }

  render (messages) {
    return (
      <IntlProvider locale='en' messages={translationMessages.en}>
        <Navigation checkLogedStatus={this.props.getLoginStatus} />
      </IntlProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loginToken: LoginSelectors.getToken(state.login)
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup()),
  getLoginStatus: query => dispatch(LoginActions.loginCheckStatus(query))
  // fetchUser: (query) => dispatch(UserActions.userRequest(query))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainer)
