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

const IFRAME = "<iframe src='https://photos.google.com/share/AF1QipM877txej-2IjG2sk2G6WIelVpSFzgBNpbBcxD2Vr1-_JuwUZxXrnvdU2QsHXvKRQ?key=NjhvaGNYU2JOZ3Z5TDhVOEV6MExVY21UdWd0dWxn' width='100%' height='100%' frameborder='0' style='border:0' allowfullscreen />"

class ContentIframe extends Component {
  constructor (props) {
    super(props)
    this.iframe = this.iframe.bind(this)
    this.state = {
      activeItemBottomMenu: '1'
    }
  }
  iframe () {
    return {
      __html: IFRAME
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
    return (
      <div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container>
            <div>
              <div dangerouslySetInnerHTML={this.iframe()} />
            </div>
          </Container>
        </Segment>
        {this.props.footer}
      </div>
    )
  }
}

export default ContentIframe
