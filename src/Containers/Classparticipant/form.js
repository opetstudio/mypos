import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { path, pick } from 'ramda'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import ClassparticipantActions, { ClassparticipantSelectors } from './redux'
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
  const dataDetail = ClassparticipantSelectors.getDetailById(
    state.classparticipant,
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
    submitFailed: ClassparticipantSelectors.getFormSubmitFailed(
      state.classparticipant
    ),
    submitSuccess: ClassparticipantSelectors.getFormSubmitSuccess(
      state.classparticipant
    ),
    submit: ClassparticipantSelectors.getFormSubmit(state.classparticipant),
    submitMessage: ClassparticipantSelectors.getFormSubmitMessage(
      state.classparticipant
    ),
    newRecordId: ClassparticipantSelectors.getNewRecordId(
      state.classparticipant
    ),
    formData: ClassparticipantSelectors.getForm(state.classparticipant),
    id,
    redirectPath: '/entity/classparticipant/update/',
    // allDataArr: makeData(),
    entityName: 'Classparticipant',
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    loginDetail: LoginSelectors.getSingle(state.login),
    loginToken: LoginSelectors.getToken(state.login)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ignite boilerplate dispatch list
    setFormValue: data =>
      dispatch(ClassparticipantActions.classparticipantSetFormValue(data)),
    formReset: data =>
      dispatch(ClassparticipantActions.classparticipantFormReset(data)),
    fetchOne: query =>
      dispatch(ClassparticipantActions.classparticipantRequest(query)),
    entityCreate: data =>
      dispatch(ClassparticipantActions.classparticipantCreate(data)),
    entityUpdate: (data, id) =>
      dispatch(ClassparticipantActions.classparticipantUpdate(data, id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TheComponent)
