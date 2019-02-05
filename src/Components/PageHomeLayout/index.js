import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  // Icon,
  Image,
  // List,
  // Menu,
  // Responsive,
  Segment
  // Sidebar,
  // Visibility
} from 'semantic-ui-react'
// import { Link } from 'react-router-dom'

let isUserDetailAccessed = false

class PageHomeLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentWillMount () {
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
    // this.props.fetchUser({id: this.props.loginToken})
  }
  render () {
    // console.log('===>==', this.state)
    if (!isUserDetailAccessed && this.state.username) {
      this.props.getUserProfile({ username: this.state.username })
    }
    return (
      <div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={8}>
                <p>Home page</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment inverted vertical style={{ padding: '5em 0em' }}>
          {/* <FooterContainer /> */}
        </Segment>
      </div>
    )
  }
}

export default PageHomeLayout
