import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { path, isEmpty, find, pickBy, propEq } from 'ramda'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
import ClassesActions, { ClassesSelectors } from './redux'
import BadgeActions, { BadgeSelectors } from '../Badge/redux'
import ParticipantActions, { ParticipantSelectors } from '../Participant/redux'
import ClassparticipantActions, {
  ClassparticipantSelectors
} from '../Classparticipant/redux'
import LayoutFormData from '../../Components/LayoutFormData'
import { columns as column } from './columns'
import { columns as participantColumns } from '../Participant/columns'
import { LoginSelectors } from '../Login/redux'
import ButtonAction from '../../Components/ButtonAction'

// const column = columns
const defaultPageSize = 10
const columnOptions = _.cloneDeep(participantColumns)

// (columnSelected[0].columns).push({})
class TheComponent extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    submitMessage: PropTypes.string.isRequired,
    submitFailed: PropTypes.bool.isRequired,
    submitSuccess: PropTypes.bool.isRequired,
    submit: PropTypes.bool,
    formData: PropTypes.object.isRequired,
    dataDetail: PropTypes.object.isRequired,
    allParticipantIdByClassId: PropTypes.array.isRequired,
    allClassParticipant: PropTypes.array.isRequired,
    multiselectComponent: PropTypes.object,
    formReset: PropTypes.func.isRequired,
    entityUpdate: PropTypes.func.isRequired,
    entityCreate: PropTypes.func.isRequired,
    setFormValue: PropTypes.func.isRequired,
    deleteParticipant: PropTypes.func.isRequired,
    evaluateParticipant: PropTypes.func.isRequired
  }
  static defaultProps = {
    submitFailed: false,
    submitSuccess: false,
    submit: null,
    id: '',
    submitMessage: '',
    formData: {},
    dataDetail: {},
    allClassParticipant: [],
    allParticipantIdByClassId: [],
    multiselectComponent: {},
    formReset: () => {},
    entityUpdate: () => {},
    entityCreate: () => {},
    setFormValue: () => {},
    deleteParticipant: () => {},
    evaluateParticipant: () => {}
  }
  constructor (props) {
    super(props)
    this.state = {}
    this.setupMultiselectComponent = this.setupMultiselectComponent.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.props.fetchAllBadge({})
    this.props.fetchAllParticipant({})
    this.props.fetchAllClassParticipant({
      params: { class_id: (this.props.dataDetail || {})['_id'] }
    })

    const allParticipants = _.filter(
      Immutable.asMutable(this.props.allParticipants, { deep: true }),
      o => o.status !== 'remove'
    )
    let allClassParticipant = Immutable.asMutable(
      this.props.allClassParticipant,
      { deep: true }
    )
    const multiselectComponent = this.setupMultiselectComponent({
      options: allParticipants,
      allClassParticipant
    })
    // console.log('constructor allClassParticipant', allClassParticipant)
    // console.log('constructor allParticipants', allParticipants)
    this.state = {
      column: this.props.column,
      allParticipants,
      selectoptions: Immutable.asMutable(this.props.selectoptions, {
        deep: true
      }),
      id: this.props.id,
      dataDetail: this.props.dataDetail,
      submit: this.props.submit,
      submitFailed: this.props.submitFailed,
      submitSuccess: this.props.submitSuccess,
      submitMessage: this.props.submitMessage,
      entityUpdate: this.props.entityUpdate,
      entityCreate: this.props.entityCreate,
      deleteParticipant: this.props.deleteParticipant,
      evaluateParticipant: this.props.evaluateParticipant,
      setFormValue: this.props.setFormValue,
      entityName: this.props.entityName,
      formReset: this.props.formReset,
      formData: this.props.formData,
      createItemForFieldMultiselect: () =>
        this.props.redirect('/entity/participant/create'),
      initial: true,
      allClassParticipant,
      multiselectComponent
    }
    if (this.props.id && this.props.id !== '') {
      this.props.fetchOne({ id: this.props.id })
      this.props.setFormValue({
        ...Immutable.asMutable(this.props.dataDetail, { deep: true }),
        class_participants: Immutable.asMutable(
          this.props.allParticipantIdByClassId,
          { deep: true }
        )
      })
    }

    // console.log('multiselectComponent', multiselectComponent)
    // this.setState({multiselectComponent})
  }
  onSubmit (event) {
    this.setState({ initial: false })
    // alert('Your favorite flavor is: ' + this.state.value)
    // console.log('submit', this.state.form._id)
    let column = ((this.props.column || [])[0] || {}).columns
    // console.log('submit formData', this.props.formData)
    // console.log('submit dataDetail', this.props.dataDetail)
    // console.log('submit column', column)
    if (isEmpty(this.props.formData)) return false
    if (this.props.id && this.props.id !== '') {
      // update
      // R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
      // const r = filter((a, b) => {
      //   console.log('filterrrr a===>', a)
      //   console.log('filterrrr b===>', b)
      // }, this.state.form)
      // console.log('rrrr===>', r)
      // var isUpperCase = (val, key) => key.toUpperCase() === key;
      // R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}

      var dataPatch = pickBy((v, k) => {
        let isSubmit = true
        if (_.isEqual(this.props.dataDetail[k], v)) isSubmit = false
        if (!(find(propEq('id', k))(column) || {}).fieldtype) isSubmit = false
        return isSubmit
      }, this.props.formData)
      // console.log('dataPatch   ====>', dataPatch)
      if (!isEmpty(dataPatch)) this.props.entityUpdate(dataPatch, this.props.id)
    } else {
      // console.log('dataPatch====>', this.props.formData)
      // create
      if (!isEmpty(this.props.formData)) { this.props.entityCreate(this.props.formData) }
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
  setupMultiselectComponent ({ options, allClassParticipant }) {
    // const options = this.state.allParticipants
    // const allClassParticipant = this.state.allClassParticipant
    // console.log('allParticipants===>', options)
    // console.log('allClassParticipant===>', allClassParticipant)
    // if (_.isEmpty(options)) return {}
    const multiselectComponent = {
      class_participants: {
        data: options,
        column: columnOptions,
        columnTable: (opt => {
          const columnSelected = _.cloneDeep(participantColumns) || [{}]
          columnSelected[0].columns.push({
            Header: 'Evaluate',
            id: 'evaluate',
            accessor: o => {
              if (!_.isEmpty(allClassParticipant)) {
                const isEvaluated =
                  ((_.filter(allClassParticipant, {
                    class_id: this.state.id,
                    participant_id: o._id
                  }) || [{}])[0] || {})['is_evaluated'] || '0'
                if (isEvaluated === '1') {
                  return (
                    <div>
                      <span>done</span>
                    </div>
                  )
                }
              }
              return (
                <ButtonAction
                  evaluatedButton
                  onClick={() => opt.onClickEvaluateButton(o._id)}
                />
              )
            }
          })
          columnSelected[0].columns.push({
            Header: 'Delete',
            id: 'Del',
            accessor: o => {
              // console.log(`classId=${this.state.id}|participantId=${o._id}|allClassParticipant`, allClassParticipant)
              if (!_.isEmpty(allClassParticipant)) {
                const isEvaluated =
                  ((_.filter(allClassParticipant, {
                    class_id: this.state.id,
                    participant_id: o._id
                  }) || [{}])[0] || {})['is_evaluated'] || '0'
                if (isEvaluated === '1') {
                  return (
                    <div>
                      <span>-</span>
                    </div>
                  )
                }
              }
              return (
                <ButtonAction
                  deleteButton
                  onClick={() => opt.onClickDeleteButton(o._id)}
                />
              )
            }
          })
          return columnSelected
        })({
          onClickEvaluateButton: participantId =>
            this.state.evaluateParticipant({
              classId: this.state.id,
              participantId: participantId
            }),
          onClickDeleteButton: participantId =>
            this.state.deleteParticipant({
              classId: this.state.id,
              participantId: participantId
            })
        })
      }
    }
    return multiselectComponent
  }
  componentDidUpdate (prevProps, prevState, snapshot) {
    // console.log('componentDidUpdate')
    if (
      !_.isEqual(prevProps.dataDetail, this.props.dataDetail) &&
      !_.isEmpty(this.props.dataDetail)
    ) {
      let dataDetail = Immutable.asMutable(this.props.dataDetail, {
        deep: true
      })
      this.props.setFormValue({ ...this.props.formData, ...dataDetail })
      this.setState({ dataDetail })
    }
    if (
      !_.isEqual(
        prevProps.allParticipantIdByClassId,
        this.props.allParticipantIdByClassId
      ) &&
      !_.isEmpty(this.props.allParticipantIdByClassId)
    ) {
      const currentFormClassParticipants = Immutable.asMutable(
        this.props.formData.class_participants || [],
        { deep: true }
      )
      this.props.setFormValue({
        ...this.props.formData,
        class_participants: _.uniq([
          ...currentFormClassParticipants,
          ...this.props.allParticipantIdByClassId
        ])
      })
    }
    if (
      !_.isEqual(prevProps.allParticipants, this.props.allParticipants) &&
      !_.isEmpty(this.props.allParticipants)
    ) {
      let allParticipants = _.filter(
        Immutable.asMutable(this.props.allParticipants, { deep: true }),
        o => o.status !== 'remove'
      )

      this.setState({ allParticipants })
    }
    if (
      !_.isEqual(
        prevProps.allClassParticipant,
        this.props.allClassParticipant
      ) &&
      !_.isEmpty(this.props.allClassParticipant)
    ) {
      let allClassParticipant = Immutable.asMutable(
        this.props.allClassParticipant,
        { deep: true }
      )
      this.setState({ allClassParticipant })
    }
    if (
      !_.isEqual(prevProps.selectoptions, this.props.selectoptions) &&
      !_.isEmpty(this.props.selectoptions)
    ) {
      this.setState({
        selectoptions: Immutable.asMutable(this.props.selectoptions, {
          deep: true
        })
      })
    }
    if (
      !_.isEqual(prevProps.formData, this.props.formData) &&
      !_.isEmpty(this.props.formData)
    ) {
      this.setState({
        formData: {
          ...this.state.formData,
          ...Immutable.asMutable(this.props.formData, { deep: true })
        }
      })
    }
    if (prevProps.id !== this.props.id) this.setState({ id: this.props.id })

    if (prevProps.submit !== this.props.submit) { this.setState({ submit: this.props.submit }) }
    if (prevProps.submitFailed !== this.props.submitFailed) { this.setState({ submitFailed: this.props.submitFailed }) }
    if (prevProps.submitSuccess !== this.props.submitSuccess) { this.setState({ submitSuccess: this.props.submitSuccess }) }
    if (prevProps.submitMessage !== this.props.submitMessage) { this.setState({ submitMessage: this.props.submitMessage }) }

    if (
      (prevState.allClassParticipant !== this.state.allClassParticipant &&
        !_.isEmpty(this.state.allClassParticipant)) ||
      (prevState.allParticipants !== this.state.allParticipants &&
        !_.isEmpty(this.state.allParticipants))
    ) {
      // console.log('======>allClassParticipant', this.state.allClassParticipant)
      // console.log('======>allParticipants', this.state.allParticipants)
      const allParticipants = this.state.allParticipants
      const allClassParticipant = this.state.allClassParticipant
      const multiselectComponent = this.setupMultiselectComponent({
        options: allParticipants,
        allClassParticipant
      })
      this.setState({
        multiselectComponent
      })
    }
  }
  componentWillUnmount () {
    this.props.formReset({})
  }
  render () {
    // console.log('render state=', this.state)
    if (window.localStorage.getItem('isLoggedIn') !== 'true') { return <Redirect to='/login' /> }
    if (!this.props.dataDetail) {
      return (
        <div>
          <span>Loading</span>
        </div>
      )
    }
    // console.log('render====>', this.state)
    return (
      <LayoutFormData
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
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log('ownProps', ownProps)
  const id = path(['match', 'params', 'id'], ownProps)
  return {
    // ignite boilerplate state list
    // this.props.history.push('/dashboard')
    redirect: ownProps.history.push,
    defaultPageSize,
    allClassParticipant: ClassparticipantSelectors.getAllDataArr(
      state.classparticipant
    ),
    allParticipants: ParticipantSelectors.getAllDataArr(state.participant),
    dataDetail: ClassesSelectors.getDetailById(state.classes, id),
    submitFailed: ClassesSelectors.getFormSubmitFailed(state.classes),
    submitSuccess: ClassesSelectors.getFormSubmitSuccess(state.classes),
    submit: ClassesSelectors.getFormSubmit(state.classes),
    submitMessage: ClassesSelectors.getFormSubmitMessage(state.classes),
    newRecordId: ClassesSelectors.getNewRecordId(state.classes),
    formData: ClassesSelectors.getForm(state.classes),
    id,
    allParticipantIdByClassId: ClassparticipantSelectors.getAllParticipantIdByClassId(
      state.classparticipant,
      id
    ),
    redirectPath: '/entity/classes/update/',
    entityName: 'Classes',
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    selectoptions: {
      status: [
        { key: '1', text: 'publish', value: 'publish' },
        { key: '2', text: 'draft', value: 'draft' },
        // {key: '3', text: 'delete', value: 'delete'},
        { key: '4', text: 'complete', value: 'complete' }
      ],
      badge: (BadgeSelectors.getAllDataArr(state.badge) || []).map(r => ({
        key: r._id,
        text: r.badge_name,
        value: r._id
      }))
    },
    loginDetail: LoginSelectors.getSingle(state.login),
    loginToken: LoginSelectors.getToken(state.login),
    column
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // dependences list
    fetchAllBadge: query => dispatch(BadgeActions.badgeRequestAll(query)),
    fetchAllParticipant: query =>
      dispatch(ParticipantActions.participantRequestAll(query)),
    fetchAllClassParticipant: query =>
      dispatch(ClassparticipantActions.classparticipantRequestAll(query)),
    // ignite boilerplate dispatch list
    setFormValue: data => dispatch(ClassesActions.classesSetFormValue(data)),
    formReset: data => dispatch(ClassesActions.classesFormReset(data)),
    fetchOne: query => dispatch(ClassesActions.classesRequest(query)),
    entityCreate: data => dispatch(ClassesActions.classesCreate(data)),
    entityUpdate: (data, id) =>
      dispatch(ClassesActions.classesUpdate(data, id)),
    deleteParticipant: data =>
      dispatch(ClassesActions.classesDeleteParticipant(data)),
    evaluateParticipant: data =>
      dispatch(ClassesActions.classesEvaluatedParticipant(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TheComponent)
