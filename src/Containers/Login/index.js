import React, { Component } from 'react'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import LoginActions, { LoginSelectors } from './redux'
import LayoutTableData from '../../Components/LayoutTableData'
import { makeData } from '../../Utils/Utils'
import { columns } from './columns'

const Login = LayoutTableData
const column = columns
const defaultPageSize = 10

const mapStateToProps = (state, ownProps) => {
  // const foo = params.get('foo'); // bar
  return {
    // ignite boilerplate state list
    defaultPageSize,
    column,
    // allDataArr: LoginSelectors.getAllDataArr(state.login),
    allDataArr: LoginSelectors.getAllDataArr(state.login),
    entityName: 'Login'
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ignite boilerplate dispatch list
    fetchAll: query => dispatch(LoginActions.loginAll(query))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
