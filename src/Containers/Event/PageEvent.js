import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
import Footer1 from '../Footer/footer1'
import EventActions, {EventSelectors} from './redux'

import PageEventLayout from '../../Components/Event/PageEventLayout'

class TheComponent extends Component {
    static propTypes = {
    }
    static defaultProps = {
    }
    constructor (props) {
      super(props)
      this.state = {
        allDataArr: this.props.allDataArr,
        allNextEventArr: this.props.allNextEventArr,
        allPrevEventArr: this.props.allPrevEventArr,
        maxModifiedon: this.props.maxModifiedon
      }
    }
    componentWillMount () {
      console.log('PageEvent.componentWillMount====')
      this.props.fetchAll({ newerModifiedon: this.state.maxModifiedon })
    }
    componentDidUpdate (prevProps, prevState) {
      if (!_.isEqual(prevProps.allDataArr, this.props.allDataArr)) {
        this.setState({allDataArr: Immutable.asMutable(this.props.allDataArr, {deep: true})})
      }
      if (!_.isEqual(prevProps.allNextEventArr, this.props.allNextEventArr)) {
        this.setState({allNextEventArr: Immutable.asMutable(this.props.allNextEventArr, {deep: true})})
      }
      if (!_.isEqual(prevProps.allPrevEventArr, this.props.allPrevEventArr)) {
        this.setState({allPrevEventArr: Immutable.asMutable(this.props.allPrevEventArr, {deep: true})})
      }
    }
    render () {
      return <PageEventLayout
        breadcrumb={[
          { key: 'key-1', link: '/', label: 'Home' },
          { key: 'key-2', link: null, label: 'Prisdac Events' }
        ]}
        allDataArr={this.state.allDataArr}
        allNextEventArr={this.state.allNextEventArr}
        allPrevEventArr={this.state.allPrevEventArr}
        footer={(<Footer1 />)}
        history={this.props.history}
      />
    }
}

const mapStateToProps = (state, ownProps) => {
  const allDataArr = EventSelectors.getAllDataArr(state.event)
  return {
    maxModifiedon: parseInt(EventSelectors.getMaxModifiedon(state.event) || 0),
    allDataArr,
    allNextEventArr: EventSelectors.getAllNextEventArr(state.event),
    allPrevEventArr: EventSelectors.getAllPrevEventArr(state.event)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAll: (query) => dispatch(EventActions.eventRequestAll(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheComponent)
