import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {
  Grid,
  Container,
  Header,
  Image
} from 'semantic-ui-react'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
import {Helmet} from 'react-helmet'

import ImageGallery from 'react-image-gallery'
import BreadcrumbCustom from '../BreadcrumbCustom'
import {Images} from '../../Themes'

import 'react-image-gallery/styles/css/image-gallery.css'

class GalleryLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItemBottomMenu: '1'
    }
  }
  componentWillMount () {
    // console.log('componentWillMounts')
    this.setState({
      username: this.props.username,
      images: Immutable.asMutable(this.props.images, { deep: true }),
      breadcrumb: Immutable.asMutable(this.props.breadcrumb, { deep: true }),
      albumDetail: Immutable.asMutable(this.props.albumDetail, { deep: true })
    })
  }
  componentDidUpdate (prevProps, prevState) {
    if (!_.isEqual(prevProps.images, this.props.images)) {
      this.setState({
        images: Immutable.asMutable(this.props.images, { deep: true })
      })
    }
    if (!_.isEqual(prevProps.breadcrumb, this.props.breadcrumb)) {
      this.setState({
        breadcrumb: Immutable.asMutable(this.props.breadcrumb, { deep: true })
      })
    }
    if (!_.isEqual(prevProps.albumDetail, this.props.albumDetail)) {
      this.setState({
        albumDetail: Immutable.asMutable(this.props.albumDetail, { deep: true })
      })
    }
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      accessToken: nextProps.username
    })
  }
  componentDidMount () {
  }
  imageSrcRemoveDot (path) {
    return (path).startsWith('.') ? path.substring(1) : path
  }
  render () {
    // console.log('GalleryLayout===>', this.state)
    // const images = [
    //   {
    //     original: 'http://lorempixel.com/1000/600/nature/1/',
    //     thumbnail: 'http://lorempixel.com/250/150/nature/1/',
    //   },
    //   {
    //     original: 'http://lorempixel.com/1000/600/nature/2/',
    //     thumbnail: 'http://lorempixel.com/250/150/nature/2/'
    //   },
    //   {
    //     original: 'http://lorempixel.com/1000/600/nature/3/',
    //     thumbnail: 'http://lorempixel.com/250/150/nature/3/'
    //   }
    // ]
    return (
      <div>
        <Helmet>
          <title>Gallery - Prisma SDA Church</title>
        </Helmet>
        <Container style={{minHeight: window.innerHeight - 75}}>
          <Grid container style={{ padding: '1em 0em' }}>
            {this.state.breadcrumb && (
              <Grid.Row>
                <Grid.Column>
                  <BreadcrumbCustom breadcrumb={this.state.breadcrumb} />
                </Grid.Column>
              </Grid.Row>
            )}
            <Grid.Row>
              <Grid.Column>
                {(this.state.images && this.state.images.length > 0) && <ImageGallery items={this.state.images} showIndex showBullets thumbnailPosition='bottom' />}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign='center'>
              <Grid.Column>
                <Header as='h3' onClick={() => window.open(`https://photos.app.goo.gl/${this.state.albumDetail.album_code}`, '_blank')} style={{cursor: 'pointer'}}>
                  <p>Open album with Google Photo</p>
                  <Image src={this.imageSrcRemoveDot(Images.googlephotoicon)} style={{ width: '50%' }} />
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        {/* <Segment style={{ padding: '2em 0em' }} vertical>
          <Container text>
            <ImageGallery items={images} showIndex showBullets thumbnailPosition='left' />
          </Container>
        </Segment> */}
        {this.props.footer}
      </div>
    )
  }
}

export default GalleryLayout
