import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import LoginActions, { LoginSelectors } from './Login/redux'
import HomepageHeading from '../Components/HomepageHeading'
import LoggedInAttribute from './LoggedinAttribute'

class MaterialuiContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }
  render () {
    return <div />
  }
}

export default MaterialuiContainer
