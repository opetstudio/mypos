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
import _ from 'lodash'
// import { Link } from 'react-router-dom'
class AdminHome extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: this.props.username
    }
  }
  componentWillMount () {
    this.setState({
      username: this.props.username
    })
    this.props.getUserProfile({ username: this.props.username })
  }
  componentDidUpdate (prevProps, prevState) {
    if (!_.isEqual(prevProps.username, this.props.username)) {
      this.props.getUserProfile({ username: this.props.username })
      this.setState({
        username: this.props.username
      })
    }
  }
  componentDidMount () {
    // this.props.fetchUser({id: this.props.loginToken})
  }
  render () {
    return (
      <div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={8}>
                <p>Admin Home</p>
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

export default AdminHome
