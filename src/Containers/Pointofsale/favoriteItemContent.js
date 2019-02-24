import React, { Component } from 'react'
import { connect } from 'react-redux'

import FavoriteItemView from '../../Components/Pointofsale/favoriteItemView'
class TheComponent extends Component {
  render () {
    return (<FavoriteItemView />)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(TheComponent)
