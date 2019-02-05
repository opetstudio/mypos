import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import ClassparticipantActions, { ClassparticipantSelectors } from './redux'
import LayoutTableData from '../../Components/LayoutTableData'
import { makeData } from '../../Utils/Utils'
import { columns } from './columns'
import LoginActions, { LoginSelectors } from '../Login/redux'

// const Classparticipant = LayoutTableData
const column = columns
const defaultPageSize = 10

const TheComponent = props =>
  window.localStorage.getItem('isLoggedIn') === 'true' ? (
    <LayoutTableData {...props} />
  ) : (
    <Redirect to='/login' />
  )

const mapStateToProps = (state, ownProps) => {
  const params = new URLSearchParams(window.location.search)
  const filter = params.get('filter') // bar
  const allDataArr = ClassparticipantSelectors.getAllDataArr(
    state.classparticipant
  )
  // console.log('params1===>', window.location.search)
  // console.log('params2===>', ownProps.location.search)
  return {
    // ignite boilerplate state list
    defaultPageSize,
    column,
    maxModifiedon: ClassparticipantSelectors.getMaxModifiedon(
      state.classparticipant
    ),
    allDataArr,
    allIds: ClassparticipantSelectors.getAllIds(state.classparticipant),
    byId: ClassparticipantSelectors.getById(state.classparticipant),
    entityName: 'Classparticipant',
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    loginToken: LoginSelectors.getToken(state.login),
    filter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ignite boilerplate dispatch list
    fetchAll: query =>
      dispatch(ClassparticipantActions.classparticipantRequestAll(query)),
    deleteRow: query =>
      dispatch(ClassparticipantActions.classparticipantDeleteSuccess(query)),
    updateOne: (data, id) =>
      dispatch(ClassparticipantActions.classparticipantUpdate(data, id)),
    removeOne: (data, id) =>
      dispatch(ClassparticipantActions.classparticipantRemove(data, id)),
    updateBatch: data =>
      dispatch(ClassparticipantActions.classparticipantUpdateBatch(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TheComponent)
