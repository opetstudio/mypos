import React, { Component } from 'react'
import { connect } from 'react-redux'

import LibraryItemView from '../../Components/Pointofsale/libraryItemView'
class TheComponent extends Component {
  render () {
    return (<LibraryItemView />)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(TheComponent)
