import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { path, isEmpty, find, pickBy, propEq } from 'ramda'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Immutable from 'seamless-immutable'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import ButtonAction from '../../Components/ButtonAction'
import UserActions, { UserSelectors } from './redux'
// BEGIN MULTISELECT ROLE
import RoleActions, { RoleSelectors } from '../Role/redux'
import UserroleActions, { UserroleSelectors } from '../Userrole/redux'
import { columns as roleColumns } from '../Role/columns'
// END MULTISELECT ROLE
import LayoutFormData from '../../Components/LayoutFormData'
// import { makeData } from '../../Utils/Utils'
import { columns } from './columns'
import { LoginSelectors } from '../Login/redux'

import RoleMultiselect from '../Userrole/Multiselect'

// BEGIN MULTISELECT ROLE
const columnOptions = _.cloneDeep(roleColumns)
// END MULTISELECT ROLE
const column = columns
const defaultPageSize = 10

// const TheComponent = (props) => (window.localStorage.getItem('isLoggedIn') === 'true' ? <LayoutFormData {...props} /> : <Redirect to='/login' />)
class TheComponent extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    submitMessage: PropTypes.string.isRequired,
    submitFailed: PropTypes.bool.isRequired,
    submitSuccess: PropTypes.bool.isRequired,
    submit: PropTypes.bool.isRequired,
    formData: PropTypes.object.isRequired,
    dataDetail: PropTypes.object.isRequired,
    // BEGIN MULTISELECT ROLE
    allRoleIdByUserId: PropTypes.array.isRequired,
    multiselectComponent: PropTypes.object,
    deleteRole: PropTypes.func.isRequired,
    // END MULTISELECT ROLE
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
    // BEGIN MULTISELECT ROLE
    allRoleIdByUserId: [],
    multiselectComponent: {},
    deleteRole: () => {},
    // END MULTISELECT ROLE
    formReset: () => {},
    entityUpdate: () => {},
    entityCreate: () => {},
    setFormValue: () => {}
  }
  constructor (props) {
    super(props)
    if (this.props.id && this.props.id !== '') { this.props.fetchOne({ id: this.props.id }) }
    // BEGIN MULTISELECT ROLE
    this.setupMultiselectComponent = this.setupMultiselectComponent.bind(this)
    this.setFormValue = this.setFormValue.bind(this)
    this.props.fetchAllRole({})
    this.props.fetchAllUserRole({
      params: { user_id: (this.props.dataDetail || {})['_id'] }
    })
    const allRoles = _.filter(Immutable.asMutable(this.props.allRoles, { deep: true }), o => o.status !== 'remove')
    let allUserroles = Immutable.asMutable(this.props.allUserroles, { deep: true })
    const multiselectComponent = this.setupMultiselectComponent({ options: allRoles, allUserroles })
    // END MULTISELECT ROLE
    this.state = {
      column,
      // BEGIN MULTISELECT ROLE
      allRoles,
      allUserroles,
      createItemForFieldMultiselect: () => this.props.redirect('/entity/role/create'),
      multiselectComponent,
      deleteRole: this.props.deleteRole,
      // END MULTISELECT ROLE
      selectoptions: Immutable.asMutable(this.props.selectoptions, { deep: true }),
      id: this.props.id,
      dataDetail: this.props.dataDetail,
      submit: this.props.submit,
      submitFailed: this.props.submitFailed,
      submitSuccess: this.props.submitSuccess,
      submitMessage: this.props.submitMessage,
      entityUpdate: this.props.entityUpdate,
      entityCreate: this.props.entityCreate,
      setFormValue: this.props.setFormValue,
      entityName: this.props.entityName,
      formReset: this.props.formReset,
      formData: {
        ...Immutable.asMutable(this.props.dataDetail, { deep: true })
      },
      initial: true
    }
    this.onSubmit = this.onSubmit.bind(this)
    if (this.props.id && this.props.id !== '') {
      this.props.fetchOne({ id: this.props.id })
      // BEGIN MULTISELECT ROLE
      this.props.setFormValue({
        ...Immutable.asMutable(this.props.dataDetail, { deep: true }),
        user_roles: Immutable.asMutable(
          this.props.allRoleIdByUserId,
          { deep: true }
        )
      })
      // END MULTISELECT ROLE
    }
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
  componentDidUpdate (prevProps, prevState, snapshot) {
    console.log('componentDidUpdate')
    if (!_.isEqual(prevProps.dataDetail, this.props.dataDetail) && !_.isEmpty(this.props.dataDetail)) {
      // console.log('set form value because dataDetail is exist')
      let dataDetail = Immutable.asMutable(this.props.dataDetail, {deep: true})
      this.props.setFormValue({ ...this.props.formData, ...dataDetail })
      this.setState({
        dataDetail,
        formData: {
          ...this.state.formData,
          ...dataDetail
        }
      })
    }

    // BEGIN MULTISELECT ROLE

    // update state form value
    if (!_.isEqual(prevProps.allRoleIdByUserId, this.props.allRoleIdByUserId) && !_.isEmpty(this.props.allRoleIdByUserId)) {
      const currentFormUserRoles = Immutable.asMutable(this.props.formData.user_roles || [], { deep: true })
      this.props.setFormValue({
        ...this.props.formData,
        user_roles: _.uniq([
          ...currentFormUserRoles,
          ...this.props.allRoleIdByUserId
        ])
      })
    }
    // update state allRoles
    if (!_.isEqual(prevProps.allRoles, this.props.allRoles) && !_.isEmpty(this.props.allRoles)) {
      let allRoles = _.filter(Immutable.asMutable(this.props.allRoles, { deep: true }), o => o.status !== 'remove')
      this.setState({ allRoles })
    }
    // update state allUserroles
    if (!_.isEqual(prevProps.allUserroles, this.props.allUserroles) && !_.isEmpty(this.props.allUserroles)) {
      let allUserroles = Immutable.asMutable(this.props.allUserroles, { deep: true })
      this.setState({ allUserroles })
    }

    if ((prevState.allUserroles !== this.state.allUserroles && !_.isEmpty(this.state.allUserroles)) || (prevState.allRoles !== this.state.allRoles && !_.isEmpty(this.state.allRoles))) {
      const allRoles = this.state.allRoles
      const allUserroles = this.state.allUserroles
      const multiselectComponent = this.setupMultiselectComponent({
        options: allRoles,
        allUserroles
      })
      this.setState({
        multiselectComponent
      })
    }

    // END MULTISELECT ROLE

    if (!_.isEqual(prevProps.selectoptions, this.props.selectoptions) && !_.isEmpty(this.props.selectoptions)) {
      this.setState({ selectoptions: Immutable.asMutable(this.props.selectoptions, {deep: true}) })
    }
    if (!_.isEqual(prevProps.formData, this.props.formData) && !_.isEmpty(this.props.formData)) {
      // console.log('set form value because propsFormData is exist')
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
  }
  componentWillUnmount () {
    // reset form
    this.state.formReset({})
  }

  setupMultiselectComponent ({ options, allUserroles }) {
    // console.log('setupMultiselectComponent====>options=', options)
    const multiselectComponent = {
      user_roles: {
        data: options,
        column: columnOptions,
        columnTable: (opt => {
          const columnSelected = _.cloneDeep(roleColumns) || [{}]
          columnSelected[0].columns.push({
            Header: 'Delete',
            id: 'Del',
            accessor: o => {
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
          onClickDeleteButton: roleId =>
            this.state.deleteRole({
              userId: this.state.id,
              roleId: roleId
            })
        })
      }
    }
    return multiselectComponent
  }
  setFormValue (data) {
    this.props.setFormValue({
      ...Immutable.asMutable(this.props.dataDetail, { deep: true }),
      ...data
    })
  }
  render () {
    // console.log('===>user state====>>>>', this.state)
    // console.log('===>dataDetail', this.state.dataDetail)
    if (window.localStorage.getItem('isLoggedIn') !== 'true') { return <Redirect to='/login' /> }
    if (!this.props.dataDetail) {
      return (
        <div>
          <span>Loading</span>
        </div>
      )
    }
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
        multiselect={{
          user_roles: ({currentSelected, onSubmitSelected}) => {
            // console.log('accesss=====>>', currentSelected)
            return <RoleMultiselect
              userId={this.state.id}
              redirect={this.props.history.push}
              formData={currentSelected}
              onSubmitSelected={onSubmitSelected}
              setFormValue={this.setFormValue}
            />
          }
        }}

        // BEGIN MULTISELECT ROLE
        // multiselectComponent={this.state.multiselectComponent}
        // createItemForFieldMultiselect={this.state.createItemForFieldMultiselect}
        // BEGIN MULTISELECT ROLE

        onSubmit={this.onSubmit}
        myProfile={this.props.myProfile}
        breadcrumb={[
          { link: '/', label: 'Home' },
          { link: '/entity/user', label: 'User Management' },
          { link: null, label: 'User Form' }
        ]}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log('ownProps', ownProps)
  const id = path(['match', 'params', 'id'], ownProps)
  const dataDetail = UserSelectors.getDetailById(state.user, id)
  // console.log('mapStateToProps dataDetail===>', dataDetail)
  // if (id) ownProps.setFormValue(pick(column.map(c => c.fieldtype !== 'input-hidden' && c.id), dataDetail || {}))
  // console.log('[form] ownProps', ownProps.match.params.id)
  // const id = ownProps.params.id
  const myProfile = UserSelectors.getProfile(state.user)
  const scope = _.filter(
    [
      // { key: '1', text: 'root', value: '1' },
      { key: '2', text: 'super admin', value: '2' },
      { key: '3', text: 'admin', value: '5' },
      // { key: '4', text: 'fasilitator', value: '100' },
      { key: '5', text: 'regular user', value: '200' }
    ],
    o => parseInt(o.value || 0) > parseInt(myProfile.scope || 0)
  )
  return {
    // ignite boilerplate state list

    // BEGIN MULTISELECT ROLE
    allUserroles: UserroleSelectors.getAllDataArr(state.userrole),
    allRoles: RoleSelectors.getAllDataArr(state.role),
    allRoleIdByUserId: UserroleSelectors.getAllRoleIdByUserId(state.userrole, id),
    redirect: ownProps.history.push,
    // END MULTISELECT ROLE

    defaultPageSize,
    column,
    dataDetail,
    submitFailed: UserSelectors.getFormSubmitFailed(state.user),
    submitSuccess: UserSelectors.getFormSubmitSuccess(state.user),
    submit: UserSelectors.getFormSubmit(state.user),
    submitMessage: UserSelectors.getFormSubmitMessage(state.user),
    newRecordId: UserSelectors.getNewRecordId(state.user),
    formData: UserSelectors.getForm(state.user),
    id,
    redirectPath: '/entity/user/update/',
    // allDataArr: makeData(),
    entityName: 'User',
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    selectoptions: {
      status: [
        { key: '1', text: 'publish', value: 'publish' },
        { key: '2', text: 'draft', value: 'draft' }
        // {key: '3', text: 'delete', value: 'delete'}
      ],
      scope
    },
    loginDetail: LoginSelectors.getSingle(state.login),
    loginToken: LoginSelectors.getToken(state.login),
    myProfile: myProfile || {}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ignite boilerplate dispatch list

    // BEGIN MULTISELECT ROLE
    fetchAllRole: query => dispatch(RoleActions.roleRequestAll(query)),
    fetchAllUserRole: query => dispatch(UserroleActions.userroleRequestAll(query)),
    deleteRole: data => dispatch(UserActions.userDeleteRole(data)),
    // END MULTISELECT ROLE
    setFormValue: data => dispatch(UserActions.userSetFormValue(data)),
    formReset: data => dispatch(UserActions.userFormReset(data)),
    fetchOne: query => dispatch(UserActions.userRequest(query)),
    entityCreate: data => dispatch(UserActions.userCreate(data)),
    entityUpdate: (data, id) => dispatch(UserActions.userUpdate(data, id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TheComponent)
