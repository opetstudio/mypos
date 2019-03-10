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

class GalleryLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItemBottomMenu: '1'
    }
  }
  componentWillMount () {
    console.log('componentWillMounts')
    this.setState({
      username: this.props.username
    })
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      accessToken: nextProps.username
    })
  }
  componentDidMount () {
  }
  render () {
    // console.log('GalleryLayout===>', this.props)
    return (
      <div>
        <Segment style={{ padding: '2em 0em' }} vertical>
          <Container text>
            {
              this.props.albumgallerylist.map(r => {
                const gal = this.props.getByIdGallery[r.gallery_id] || {}
                return (<span key={r._id}>{(gal).data_src}</span>)
              })
            }
          </Container>
        </Segment>
        {this.props.footer}
      </div>
    )
  }
}

export default GalleryLayout
