import React, { Component } from 'react'
import { connect } from 'react-redux'

import CustomItemView from '../../Components/Pointofsale/customItemView'
class TheComponent extends Component {
  render () {
    return (<CustomItemView />)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(TheComponent)
