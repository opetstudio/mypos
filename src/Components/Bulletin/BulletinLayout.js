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
import {Helmet} from 'react-helmet'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

import BreadcrumbCustom from '../BreadcrumbCustom'

class BulletinLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItemBottomMenu: '1',
      breadcrumb: Immutable.asMutable(this.props.breadcrumb, { deep: true })
    }
  }
  componentWillMount () {
    // console.log('componentWillMounts')
    this.setState({
      username: this.props.username
    })
  }
  componentDidUpdate (prevProps, prevState) {
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
    return (
      <div>
        <Helmet>
          <title>Bulletin - Prisma SDA Church</title>
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
                {/* */}
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

export default BulletinLayout
