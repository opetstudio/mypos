import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
import Footer1 from '../Footer/footer1'
import ContentIframe from '../../Components/ContentIframe'
import GalleryActions, {GallerySelectors} from './redux'
import AlbumgalleryActions, {AlbumgallerySelectors} from '../Albumgallery/redux'
import GalleryLayout from '../../Components/Gallery/GalleryLayout'

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
      // console.log('PageGallery.componentWillMount===>>>>')
      this.props.fetchAll({})
      this.props.fetchAllAlbumgallery({})
    }
    render () {
      // console.log('allDataArrAlbumgallery=> ', this.props.allDataArrAlbumgallery)
      return <GalleryLayout
        footer={(<Footer1 />)}
        albumgallerylist={this.props.allDataArrAlbumgallery}
        // gallerylist={this.props.allDataArr}
        getByIdGallery={this.props.getByIdGallery}
      />
      // return <ContentIframe footer={(<Footer1 />)} />
    }
}

const mapStateToProps = (state, ownProps) => {
  console.log('ownProps', ownProps)
  const albumId = ownProps.match.params.id
  const allDataArrAlbumgallery = AlbumgallerySelectors.getAllByAlbumId(state.albumgallery, albumId)
  // const allDataArr = GallerySelectors.getAllDataArr(state.gallery)
  return {
    // allDataArr,
    allDataArrAlbumgallery,
    getByIdGallery: GallerySelectors.getById(state.gallery)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAll: (query) => dispatch(GalleryActions.galleryRequestAll(query)),
    fetchAllAlbumgallery: (query) => dispatch(AlbumgalleryActions.albumgalleryRequestAll(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheComponent)
