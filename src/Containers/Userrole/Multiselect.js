import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

import ButtonAction from '../../Components/ButtonAction'
import UserActions, { UserSelectors } from '../User/redux'
import RoleActions, { RoleSelectors } from '../Role/redux'
import UserroleActions, { UserroleSelectors } from '../Userrole/redux'
import { columns as roleColumns } from '../Role/columns'
import FormFieldMultiselect from '../../Components/FormFieldMultiselect'
import { Label, Icon } from 'semantic-ui-react';

const columnOptions = _.cloneDeep(roleColumns)

class Multiselect extends Component {
    static propTypes = {
      userId: PropTypes.string.isRequired,
      allRoleIdByUserId: PropTypes.array.isRequired,
      multiselectComponent: PropTypes.object,
      deleteRole: PropTypes.func.isRequired,
      onSubmitSelected: PropTypes.func.isRequired,
      formData: PropTypes.array.isRequired,
      setFormValue: PropTypes.func.isRequired
    }
    static defaultProps = {
      userId: '',
      allRoleIdByUserId: [],
      multiselectComponent: {},
      deleteRole: () => {},
      onSubmitSelected: () => {},
      formData: [],
      setFormValue: () => {}
    }
    constructor (props) {
      super(props)
      this.setupMultiselectComponent = this.setupMultiselectComponent.bind(this)
      this.props.fetchAllRole({})
      this.props.fetchAllUserRole({params: { user_id: this.props.userId }})
      const allRoles = _.filter(Immutable.asMutable(this.props.allRoles, { deep: true }), o => o.status !== 'remove')
      let allUserroles = Immutable.asMutable(this.props.allUserroles, { deep: true })
      const multiselectComponent = this.setupMultiselectComponent({ options: allRoles, allUserroles })
      this.state = {
        onSubmitSelected: this.props.onSubmitSelected,
        formData: this.props.formData,
        userId: this.props.userId,
        allRoles,
        allUserroles,
        createItemForFieldMultiselect: () => this.props.redirect('/entity/role/create'),
        multiselectComponent,
        deleteRole: this.props.deleteRole
      }
      if (this.props.userId && this.props.userId !== '') {
        // BEGIN MULTISELECT ROLE
        // this.props.setFormValue({
        //   user_roles: Immutable.asMutable(
        //     this.props.allRoleIdByUserId,
        //     { deep: true }
        //   )
        // })
        // END MULTISELECT ROLE
      }
    }
    componentDidUpdate (prevProps, prevState, snapshot) {
      // BEGIN MULTISELECT ROLE

    // update state form value
      // if (!_.isEqual(prevProps.allRoleIdByUserId, this.props.allRoleIdByUserId) && !_.isEmpty(this.props.allRoleIdByUserId)) {
      //   const currentFormUserRoles = Immutable.asMutable(this.props.formData || [], { deep: true })
      //   this.props.setFormValue({
      //     user_roles: _.uniq([
      //       ...currentFormUserRoles,
      //       ...this.props.allRoleIdByUserId
      //     ])
      //   })
      // }
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
      if (!_.isEqual(prevProps.formData, this.props.formData)) {
        // console.log('set form value because propsFormData is exist')
        this.setState({
          formData: _.uniq([
            ...Immutable.asMutable(this.props.formData, { deep: true })
          ])
        })
      }

    // END MULTISELECT ROLE
    }
    setupMultiselectComponent ({options}) {
      const multiselectComponent = {
        data: options,
        column: columnOptions,
        columnTable: (opt => {
          const columnSelected = _.cloneDeep(roleColumns) || [{}]
          columnSelected[0].columns.push({
            Header: 'Delete',
            id: 'Del',
            accessor: (o) => {
              return (
                <ButtonAction
                  deleteButton
                  onClick={() => opt.onClickDeleteButton(o._id)}
                />
              )
            },
            contentLabel: (o) => {
              return (
                <Label key={o._id}>{o.role_name}<Icon onClick={() => opt.onClickDeleteButton(o._id)} name='delete' /></Label>
              )
            }
          })
          return columnSelected
        })({
          onClickDeleteButton: roleId =>
            this.state.deleteRole({
              userId: this.state.userId,
              roleId: roleId
            })
        })
      }
      return multiselectComponent
    }
    render () {
      // console.log('multiselect state=====>', this.state)
      return (
        <FormFieldMultiselect
          options={(this.state.multiselectComponent || {}).data || []}
          columns={(this.state.multiselectComponent || {}).column || {}}
          columnTable={(this.state.multiselectComponent || {}).columnTable}
          selected={this.state.formData}
          onSubmitSelected={this.state.onSubmitSelected}
          createItemForFieldMultiselect={
            this.state.createItemForFieldMultiselect
          }
          template='2'
        />
      )
    }
}
const mapStateToProps = (state, ownProps) => {
  return {
    allUserroles: UserroleSelectors.getAllDataArr(state.userrole),
    allRoles: RoleSelectors.getAllDataArr(state.role),
    allRoleIdByUserId: UserroleSelectors.getAllRoleIdByUserId(state.userrole, ownProps.userId)
    // redirect: ownProps.history.push
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllRole: query => dispatch(RoleActions.roleRequestAll(query)),
    fetchAllUserRole: query => dispatch(UserroleActions.userroleRequestAll(query)),
    deleteRole: data => dispatch(UserroleActions.userroleDeleteRole(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Multiselect)
