import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {path, isEmpty, find, pickBy, propEq} from 'ramda'
import _ from 'lodash'
import Immutable from 'seamless-immutable'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import EventActions, {EventSelectors} from './redux'
import LayoutFormData from '../../Components/LayoutFormData'
import {columns as column} from './columns'
import {LoginSelectors} from '../Login/redux'

class TheComponent extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    submitMessage: PropTypes.string.isRequired,
    submitFailed: PropTypes.bool.isRequired,
    submitSuccess: PropTypes.bool.isRequired,
    submit: PropTypes.bool.isRequired,
    formData: PropTypes.object.isRequired,
    dataDetail: PropTypes.object.isRequired,
    allParticipantIdByClassId: PropTypes.array.isRequired,
    multiselectComponent: PropTypes.object,
    formReset: PropTypes.func.isRequired,
    entityUpdate: PropTypes.func.isRequired,
    entityCreate: PropTypes.func.isRequired,
    setFormValue: PropTypes.func.isRequired
  }
  static defaultProps = {
    submitFailed: false,
    submitSuccess: false,
    submit: false,
    id: '',
    submitMessage: '',
    formData: {},
    dataDetail: {},
    allParticipantIdByClassId: [],
    multiselectComponent: {},
    formReset: () => {},
    entityUpdate: () => {},
    entityCreate: () => {},
    setFormValue: () => {}
  }
  constructor (props) {
    super(props)
    if (this.props.id && this.props.id !== '') this.props.fetchOne({id: this.props.id})
    this.state = {
      column,
      multiselectComponent: Immutable.asMutable(this.props.multiselectComponent, {deep: true}),
      selectoptions: Immutable.asMutable(this.props.selectoptions, {deep: true}),
      id: this.props.id,
      dataDetail: this.props.dataDetail,
      submit: this.props.submit,
      entityName: this.props.entityName,
      submitFailed: this.props.submitFailed,
      submitSuccess: this.props.submitSuccess,
      submitMessage: this.props.submitMessage,
      entityUpdate: this.props.entityUpdate,
      entityCreate: this.props.entityCreate,
      setFormValue: this.props.setFormValue,
      formReset: this.props.formReset,
      formData: Immutable.asMutable(this.props.dataDetail, {deep: true}),
      initial: true
    }
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit (event) {
    this.setState({initial: false})
    let column = ((this.props.column || [])[0] || {}).columns
    if (isEmpty(this.props.formData)) return false
    if (this.props.id && this.props.id !== '') {
      var dataPatch = pickBy((v, k) => {
        let isSubmit = true
        if (_.isEqual(this.props.dataDetail[k], v)) isSubmit = false
        if (!((find(propEq('id', k))(column) || {}).fieldtype)) isSubmit = false
        return isSubmit
      }, this.props.formData)
      if (!isEmpty(dataPatch)) this.props.entityUpdate(dataPatch, this.props.id)
    } else {
      if (!isEmpty(this.props.formData)) this.props.entityCreate(this.props.formData)
    }
    event.preventDefault()
  }
  getSnapshotBeforeUpdate (prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    // if (prevProps.list.length < this.props.list.length) {
    //   const list = this.listRef.current;
    //   return list.scrollHeight - list.scrollTop;
    // }
    return null
  }
  componentDidUpdate (prevProps, prevState, snapshot) {
    if (!_.isEqual(prevProps.dataDetail, this.props.dataDetail) && !_.isEmpty(this.props.dataDetail)) {
      let dataDetail = Immutable.asMutable(this.props.dataDetail, {deep: true})
      this.props.setFormValue({...this.props.formData, ...dataDetail})
      this.setState({
        dataDetail,
        formData: {
          ...this.state.formData,
          ...dataDetail
        }
      })
    }
    if (!_.isEqual(prevProps.selectoptions, this.props.selectoptions) && !_.isEmpty(this.props.selectoptions)) this.setState({selectoptions: Immutable.asMutable(this.props.selectoptions, {deep: true})})
    if (!_.isEqual(prevProps.formData, this.props.formData) && !_.isEmpty(this.props.formData)) this.setState({formData: {...this.state.formData, ...Immutable.asMutable(this.props.formData, {deep: true})}})
    if (prevProps.id !== this.props.id) this.setState({id: this.props.id})
    if (prevProps.submit !== this.props.submit) this.setState({submit: this.props.submit})
    if (prevProps.submitFailed !== this.props.submitFailed) this.setState({submitFailed: this.props.submitFailed})
    if (prevProps.submitSuccess !== this.props.submitSuccess) this.setState({submitSuccess: this.props.submitSuccess})
    if (prevProps.submitMessage !== this.props.submitMessage) this.setState({submitMessage: this.props.submitMessage})
  }
  componentWillUnmount () {
    // reset form
    this.state.formReset({})
  }
  render () {
    if (window.localStorage.getItem('isLoggedIn') !== 'true') return <Redirect to='/login' />
    if (!this.props.dataDetail) return <div><span>Loading</span></div>
    return <LayoutFormData
      id={this.state.id}
      column={this.state.column}
      formData={this.state.formData}
      dataDetail={this.state.dataDetail}
      entityUpdate={this.state.entityUpdate}
      setFormValue={this.state.setFormValue}
      submitSuccess={this.state.submitSuccess}
      submitMessage={this.state.submitMessage}
      submitFailed={this.state.submitFailed}
      submit={this.state.submit}
      initial={this.state.initial}
      entityName={this.state.entityName}
      selectoptions={this.state.selectoptions}
      multiselectComponent={this.state.multiselectComponent}
      createItemForFieldMultiselect={this.state.createItemForFieldMultiselect}
      onSubmit={this.onSubmit}
    />
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = path(['match', 'params', 'id'], ownProps)
  return {
    // ignite boilerplate state list
    column,
    dataDetail: EventSelectors.getDetailById(state.event, id),
    submitFailed: EventSelectors.getFormSubmitFailed(state.event),
    submitSuccess: EventSelectors.getFormSubmitSuccess(state.event),
    submit: EventSelectors.getFormSubmit(state.event),
    submitMessage: EventSelectors.getFormSubmitMessage(state.event),
    newRecordId: EventSelectors.getNewRecordId(state.event),
    formData: EventSelectors.getForm(state.event),
    id,
    redirectPath: '/entity/event/update/',
    entityName: 'Event',
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    selectoptions: {
      status: [
        {key: '1', text: 'publish', value: 'publish'},
        {key: '2', text: 'draft', value: 'draft'}
      ]
    },
    loginDetail: LoginSelectors.getSingle(state.login),
    loginToken: LoginSelectors.getToken(state.login)
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // ignite boilerplate dispatch list
    setFormValue: (data) => dispatch(EventActions.eventSetFormValue(data)),
    formReset: (data) => dispatch(EventActions.eventFormReset(data)),
    fetchOne: (query) => dispatch(EventActions.eventRequest(query)),
    entityCreate: (data) => dispatch(EventActions.eventCreate(data)),
    entityUpdate: (data, id) => dispatch(EventActions.eventUpdate(data, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheComponent)
