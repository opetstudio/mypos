import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { path, pick } from 'ramda'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import ParticipantbadgeActions, { ParticipantbadgeSelectors } from './redux'
import LayoutFormData from '../../Components/LayoutFormData'
import { makeData } from '../../Utils/Utils'
import { columns } from './columns'
import { LoginSelectors } from '../Login/redux'

const column = columns
const defaultPageSize = 10

const TheComponent = props =>
  window.localStorage.getItem('isLoggedIn') === 'true' ? (
    <LayoutFormData {...props} />
  ) : (
    <Redirect to='/login' />
  )

const mapStateToProps = (state, ownProps) => {
  const id = path(['match', 'params', 'id'], ownProps)
  const dataDetail = ParticipantbadgeSelectors.getDetailById(
    state.participantbadge,
    id
  )
  // if (id) ownProps.setFormValue(pick(column.map(c => c.fieldtype !== 'input-hidden' && c.id), dataDetail || {}))
  // console.log('[form] ownProps', ownProps.match.params.id)
  // const id = ownProps.params.id
  return {
    // ignite boilerplate state list
    defaultPageSize,
    column,

    dataDetail,
    submitFailed: ParticipantbadgeSelectors.getFormSubmitFailed(
      state.participantbadge
    ),
    submitSuccess: ParticipantbadgeSelectors.getFormSubmitSuccess(
      state.participantbadge
    ),
    submit: ParticipantbadgeSelectors.getFormSubmit(state.participantbadge),
    submitMessage: ParticipantbadgeSelectors.getFormSubmitMessage(
      state.participantbadge
    ),
    newRecordId: ParticipantbadgeSelectors.getNewRecordId(
      state.participantbadge
    ),
    formData: ParticipantbadgeSelectors.getForm(state.participantbadge),
    id,
    redirectPath: '/entity/participantbadge/update/',
    // allDataArr: makeData(),
    entityName: 'Participantbadge',
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    loginDetail: LoginSelectors.getSingle(state.login),
    loginToken: LoginSelectors.getToken(state.login)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ignite boilerplate dispatch list
    setFormValue: data =>
      dispatch(ParticipantbadgeActions.participantbadgeSetFormValue(data)),
    formReset: data =>
      dispatch(ParticipantbadgeActions.participantbadgeFormReset(data)),
    fetchOne: query =>
      dispatch(ParticipantbadgeActions.participantbadgeRequest(query)),
    entityCreate: data =>
      dispatch(ParticipantbadgeActions.participantbadgeCreate(data)),
    entityUpdate: (data, id) =>
      dispatch(ParticipantbadgeActions.participantbadgeUpdate(data, id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TheComponent)
