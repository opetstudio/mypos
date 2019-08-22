import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import ParticipantbadgeActions, { ParticipantbadgeSelectors } from './redux'
import LayoutTableData from '../../Components/LayoutTableData'
import { makeData } from '../../Utils/Utils'
import { columns } from './columns'
import LoginActions, { LoginSelectors } from '../Login/redux'

// const Participantbadge = LayoutTableData
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
  const allDataArr = ParticipantbadgeSelectors.getAllDataArr(
    state.participantbadge
  )
  // console.log('params1===>', window.location.search)
  // console.log('params2===>', ownProps.location.search)
  return {
    // ignite boilerplate state list
    defaultPageSize,
    column,
    maxModifiedon: ParticipantbadgeSelectors.getMaxModifiedon(
      state.participantbadge
    ),
    allDataArr,
    allIds: ParticipantbadgeSelectors.getAllIds(state.participantbadge),
    byId: ParticipantbadgeSelectors.getById(state.participantbadge),
    entityName: 'Participantbadge',
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    loginToken: LoginSelectors.getToken(state.login),
    filter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ignite boilerplate dispatch list
    fetchAll: query =>
      dispatch(ParticipantbadgeActions.participantbadgeRequestAll(query)),
    deleteRow: query =>
      dispatch(ParticipantbadgeActions.participantbadgeDeleteSuccess(query)),
    updateOne: (data, id) =>
      dispatch(ParticipantbadgeActions.participantbadgeUpdate(data, id)),
    removeOne: (data, id) =>
      dispatch(ParticipantbadgeActions.participantbadgeRemove(data, id)),
    updateBatch: data =>
      dispatch(ParticipantbadgeActions.participantbadgeUpdateBatch(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TheComponent)
