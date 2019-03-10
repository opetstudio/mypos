import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {
  Grid,
  Segment,
  Header,
  Image,
  Button,
  Container,
  List,
  Divider
} from 'semantic-ui-react'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

import ImageGallery from 'react-image-gallery'
import BreadcrumbCustom from '../BreadcrumbCustom'

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
      breadcrumb: Immutable.asMutable(this.props.breadcrumb, { deep: true })
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
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      accessToken: nextProps.username
    })
  }
  componentDidMount () {
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
    // console.log('this.state.images', this.state.images)
    return (
      <div>
        <Container>
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
                {(this.state.images && this.state.images.length > 0) && <ImageGallery items={this.state.images} showIndex showBullets thumbnailPosition='left' />}
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
