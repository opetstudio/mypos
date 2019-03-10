import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
import Footer1 from '../Footer/footer1'
import ContentIframe from '../../Components/ContentIframe'
import AlbumActions, {AlbumSelectors} from './redux'
import AlbumLayout from '../../Components/Album/AlbumLayout'
import AlbumgalleryActions, {AlbumgallerySelectors} from '../Albumgallery/redux'

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
      // console.log('PageAlbum.componentWillMount===>>>>')
      this.props.fetchAll({})
      this.props.fetchAllAlbumgallery({})
    }
    render () {
      return <AlbumLayout
        footer={(<Footer1 />)}
        allDataArr={this.props.allDataArr}
        history={this.props.history}
        breadcrumb={[
          { key: 'key-1', link: '/', label: 'Home' },
          { key: 'key-2', link: null, label: 'Gallery' }
        ]}
      />
      // return <ContentIframe footer={(<Footer1 />)} />
    }
}

const mapStateToProps = (state, ownProps) => {
  const allDataArr = AlbumSelectors.getAllDataArr(state.album)
  // console.log('data ownProps===>', ownProps)
  return {
    allDataArr,
    history: ownProps.history
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAll: (query) => dispatch(AlbumActions.albumRequestAll(query)),
    fetchAllAlbumgallery: (query) => dispatch(AlbumgalleryActions.albumgalleryRequestAll(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheComponent)
