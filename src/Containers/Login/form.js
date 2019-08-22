import React, { Component } from 'react'
import { connect } from 'react-redux'
import { path } from 'ramda'
import { Redirect } from 'react-router-dom'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import LoginActions, { LoginSelectors } from './redux'
import LayoutFormLogin from '../../Components/LayoutFormLogin'
import { makeData } from '../../Utils/Utils'
import { columns } from './columns'

const TheComponent = props =>
  window.localStorage.getItem('isLoggedIn') !== 'true' ? (
    <LayoutFormLogin {...props} />
  ) : (
    <Redirect to='/' />
  )
// const Login = LayoutFormLogin
const column = columns
const defaultPageSize = 10

const mapStateToProps = (state, ownProps) => {
  // console.log('myownprops ', ownProps)
  const id = path(['match', 'params', 'id'], ownProps)
  return {
    // ignite boilerplate state list
    defaultPageSize,
    column,
    dataDetail: LoginSelectors.getDetailById(state.login, id),
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    isError: LoginSelectors.getError(state.login),
    formSubmitMessage: LoginSelectors.getFormSubmitMessage(state.login),
    id,
    // allDataArr: LoginSelectors.getAllDataArr(state.login),
    // allDataArr: makeData(),
    entityName: 'Login'
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ignite boilerplate dispatch list
    fetchOne: query => dispatch(LoginActions.loginRequest(query)),
    loginCreate: data => dispatch(LoginActions.loginCreate(data)),
    resetFormLogin: () => dispatch(LoginActions.loginReset())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TheComponent)
