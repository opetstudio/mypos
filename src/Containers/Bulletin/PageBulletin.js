import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
import Footer1 from '../Footer/footer1'
import BulletinActions, {BulletinSelectors} from './redux'
import BulletinLayout from '../../Components/Bulletin/BulletinLayout'

class TheComponent extends Component {
    static propTypes = {
    }
    static defaultProps = {
    }
    constructor (props) {
      super(props)
      this.state = {}
    }
    componentWillMount () {
      this.props.fetchAll({})
    }
    render () {
      return <BulletinLayout
        footer={(<Footer1 />)}
        allDataArr={this.props.allDataArr}
        history={this.props.history}
        breadcrumb={[
          { key: 'key-1', link: '/', label: 'Home' },
          { key: 'key-2', link: null, label: 'Sabat Ini' }
        ]}
      />
    }
}

const mapStateToProps = (state, ownProps) => {
  const allDataArr = BulletinSelectors.getAllDataArr(state.bulletin)
  // console.log('data ownProps===>', ownProps)
  return {
    allDataArr,
    history: ownProps.history
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAll: (query) => dispatch(BulletinActions.bulletinRequestAll(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheComponent)
