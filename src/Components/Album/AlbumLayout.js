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

class AlbumLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItemBottomMenu: '1'
    }
  }
  componentWillMount () {
    // console.log('componentWillMounts')
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
    // console.log('albumsss===>', this.props.allDataArr)
    return (
      <div>
        <Segment style={{ padding: '2em 0em' }} vertical>
          <Container text>
            {
              (this.props.allDataArr).map(r => {
                return (
                  <div key={r._id} onClick={() => this.props.history.push('/gallery/' + r._id)}>
                    <Image src={r.data_src} size='tiny' verticalAlign='middle' /> <span>{r.album_title}</span>
                    <Divider />
                  </div>
                )
              })
            }
          </Container>
        </Segment>
        {this.props.footer}
      </div>
    )
  }
}

export default AlbumLayout
