import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
import Footer1 from '../Footer/footer1'

import ViewListItem2Column from '../../Components/ViewListItem2Column'

class TheComponent extends Component {
    static propTypes = {
    }
    static defaultProps = {
    }
    constructor (props) {
      super(props)
      this.state = {}
    }
    render () {
      return <ViewListItem2Column footer={(<Footer1 />)} />
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheComponent)