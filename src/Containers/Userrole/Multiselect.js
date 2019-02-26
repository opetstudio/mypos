import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

import RoleActions, { RoleSelectors } from '../Role/redux'
import UserroleActions, { UserroleSelectors } from '../Userrole/redux'
import { columns as roleColumns } from '../Role/columns'

const columnOptions = _.cloneDeep(roleColumns)

class Multiselect extends Component {
    static propTypes = {
      userId: PropTypes.string.isRequired,
      allRoleIdByUserId: PropTypes.array.isRequired,
      multiselectComponent: PropTypes.object,
      deleteRole: PropTypes.func.isRequired
    }
    static defaultProps = {
      userId: '',
      allRoleIdByUserId: [],
      multiselectComponent: {},
      deleteRole: () => {}
    }
    constructor (props) {
      super(props)
      this.setupMultiselectComponent = this.setupMultiselectComponent.bind(this)
      this.props.fetchAllRole({})
      this.props.fetchAllUserRole({params: { user_id: this.props.userId }})
      const allRoles = _.filter(Immutable.asMutable(this.props.allRoles, { deep: true }), o => o.status !== 'remove')
      let allUserroles = Immutable.asMutable(this.props.allUserroles, { deep: true })
      const multiselectComponent = this.setupMultiselectComponent({ options: allRoles, allUserroles })
      this.state = {}
    }
    setupMultiselectComponent({options, allUserroles}) {

    }
    render () {
      return ()
    }
}
const mapStateToProps = (state, ownProps) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(Multiselect)
