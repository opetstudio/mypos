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
import AlbumActions, {AlbumSelectors} from '../Album/redux'
import GalleryLayout from '../../Components/Gallery/GalleryLayout'

class TheComponent extends Component {
    static propTypes = {
    }
    static defaultProps = {
    }
    constructor (props) {
      super(props)
      this.state = {
        allDataArrAlbumgallery: this.props.allDataArrAlbumgallery,
        getByIdGallery: this.props.getByIdGallery,
        albumDetail: this.props.albumDetail
      }
    }
    componentWillMount () {
      // console.log('PageGallery.componentWillMount===>>>>')
      this.props.fetchAll({})
      this.props.fetchAllAlbumgallery({})
      this.props.fetchAllAlbum({})
    }
    componentDidUpdate (prevProps, prevState) {
      if (!_.isEqual(prevProps.allDataArrAlbumgallery, this.props.allDataArrAlbumgallery)) {
        this.setState({
          allDataArrAlbumgallery: Immutable.asMutable(this.props.allDataArrAlbumgallery, { deep: true })
        })
      }
      if (!_.isEqual(prevProps.getByIdGallery, this.props.getByIdGallery)) {
        this.setState({
          getByIdGallery: Immutable.asMutable(this.props.getByIdGallery, { deep: true })
        })
      }
      if (!_.isEqual(prevProps.albumDetail, this.props.albumDetail)) {
        this.setState({
          albumDetail: Immutable.asMutable(this.props.albumDetail, { deep: true })
        })
      }
    }
    render () {
      // console.log('albumDetail=> ', this.state.albumDetail)

      const albumgallerylist = this.state.allDataArrAlbumgallery
      const getByIdGallery = this.state.getByIdGallery

      const images = _.compact(albumgallerylist.map(r => {
        const gal = getByIdGallery[r.gallery_id]
        if (gal) {
          // console.log('yes ' + r.gallery_id)
          return {original: gal.data_src, thumbnail: gal.data_src}
        }
        // else console.log('no ' + r.gallery_id)
        // return (<span key={r._id}>{(gal).data_src}</span>)
      }))
      console.log('counttttt====>', images.length)
      console.log('counttttxxxxxx==>', albumgallerylist.length)
      return <GalleryLayout
        footer={(<Footer1 />)}
        // albumgallerylist={this.state.allDataArrAlbumgallery}
        // gallerylist={this.props.allDataArr}
        // getByIdGallery={this.state.getByIdGallery}
        albumDetail={this.state.albumDetail}
        albumId={this.props.albumId}
        images={images}
        breadcrumb={[
          { key: 'key-1', link: '/', label: 'Home' },
          { key: 'key-2', link: '/gallery-album', label: 'Gallery' },
          { key: 'key-3', link: null, label: this.state.albumDetail.album_title }
        ]}
      />
      // return <ContentIframe footer={(<Footer1 />)} />
    }
}

const mapStateToProps = (state, ownProps) => {
  // console.log('ownProps', ownProps)
  const albumId = ownProps.match.params.id
  console.log('albummmid=', albumId)
  const allDataArrAlbumgallery = AlbumgallerySelectors.getAllByAlbumId(state.albumgallery, albumId)
  // const allDataArr = GallerySelectors.getAllDataArr(state.gallery)
  return {
    // allDataArr,
    albumId,
    allDataArrAlbumgallery,
    getByIdGallery: GallerySelectors.getById(state.gallery),
    albumDetail: AlbumSelectors.getOneById(state.album, albumId) || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAll: (query) => dispatch(GalleryActions.galleryRequestAll(query)),
    fetchAllAlbumgallery: (query) => dispatch(AlbumgalleryActions.albumgalleryRequestAll(query)),
    fetchAllAlbum: (query) => dispatch(AlbumActions.albumRequestAll(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheComponent)
