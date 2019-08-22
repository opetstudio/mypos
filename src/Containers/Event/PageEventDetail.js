import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
import Footer1 from '../Footer/footer1'
import EventActions, {EventSelectors} from './redux'
import {path} from 'ramda'

import PageEventDetailLayout from '../../Components/Event/PageEventDetailLayout'

class TheComponent extends Component {
    static propTypes = {
    }
    static defaultProps = {
    }
    constructor (props) {
      super(props)
      this.state = {
        dataDetail: this.props.dataDetail
      }
    }
    componentWillMount () {
      console.log('PageEvent.componentWillMount====')
      this.props.fetchAll({ newerModifiedon: this.state.maxModifiedon })
    }
    componentDidUpdate (prevProps, prevState) {
      if (!_.isEqual(prevProps.dataDetail, this.props.dataDetail)) {
        this.setState({dataDetail: Immutable.asMutable(this.props.dataDetail, {deep: true})})
      }
    }
    render () {
      console.log('dataDetail===>', this.props)
      let eventTitle = ''
      if (this.state.dataDetail) {
        eventTitle = this.state.dataDetail['event_title']
      }
      return <PageEventDetailLayout
        breadcrumb={[
          { key: 'key-1', link: '/', label: 'Home' },
          { key: 'key-2', link: '/events', label: 'Prisdac Events' },
          { key: 'key-3', link: null, label: eventTitle }
        ]}
        dataDetail={this.state.dataDetail}
        footer={(<Footer1 />)}
        history={this.props.history}
      />
    }
}

const mapStateToProps = (state, ownProps) => {
  const slug = path(['match', 'params', 'slug'], ownProps)
  console.log('sluggg====>', slug)
  const dataDetail = EventSelectors.getDetailBySlug(state.event, slug)
  return {
    maxModifiedon: parseInt(EventSelectors.getMaxModifiedon(state.event) || 0),
    dataDetail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAll: (query) => dispatch(EventActions.eventRequestAll(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheComponent)
