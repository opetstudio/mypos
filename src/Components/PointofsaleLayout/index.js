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
  Segment,
  Message,
  Checkbox, Form, Menu
  // Sidebar,
  // Visibility
} from 'semantic-ui-react'
// import { Link } from 'react-router-dom'

let isUserDetailAccessed = false

class PageHomeLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItemBottomMenu: '1'
    }
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
  handleItemClick = (e, { name }) => this.setState({ activeItemBottomMenu: name })
  render () {
    // console.log('===>==', this.state)
    if (!isUserDetailAccessed && this.state.username) {
      this.props.getUserProfile({ username: this.state.username })
    }
    const { activeItemBottomMenu } = this.state
    return (
      <div>
        <Segment style={{ padding: '1em 0em' }} vertical>
          <Grid container columns={2} stackable>
            <Grid.Column width={10}>
              <div>
                <Segment attached='top'>
                  <Grid doubling columns={5}>
                    <Grid.Column>
                      <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Grid.Column>
                    <Grid.Column>
                      <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Grid.Column>
                    <Grid.Column>
                      <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Grid.Column>
                    <Grid.Column>
                      <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Grid.Column>
                    <Grid.Column>
                      <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Grid.Column>
                  </Grid>
                  <Grid doubling columns={5}>
                    <Grid.Column>
                      <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Grid.Column>
                    <Grid.Column>
                      <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Grid.Column>
                    <Grid.Column>
                      <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Grid.Column>
                    <Grid.Column>
                      <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Grid.Column>
                    <Grid.Column>
                      <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Grid.Column>
                  </Grid>
                  <Grid doubling columns={5}>
                    <Grid.Column>
                      <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Grid.Column>
                    <Grid.Column>
                      <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Grid.Column>
                    <Grid.Column>
                      <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Grid.Column>
                    <Grid.Column>
                      <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Grid.Column>
                    <Grid.Column>
                      <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Grid.Column>
                  </Grid>
                  <Grid doubling columns={5}>
                    <Grid.Column>
                      <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Grid.Column>
                    <Grid.Column>
                      <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Grid.Column>
                    <Grid.Column>
                      <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Grid.Column>
                    <Grid.Column>
                      <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Grid.Column>
                    <Grid.Column>
                      <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Grid.Column>
                  </Grid>
                </Segment>
                <Menu attached='bottom' tabular>
                  <Menu.Item name='1' active={activeItemBottomMenu === '1'} onClick={this.handleItemClick}>
                    Favorite
                  </Menu.Item>

                  <Menu.Item name='2' active={activeItemBottomMenu === '2'} onClick={this.handleItemClick}>
                    Library
                  </Menu.Item>

                  <Menu.Item name='3' active={activeItemBottomMenu === '3'} onClick={this.handleItemClick}>
                    Custom
                  </Menu.Item>
                </Menu>
              </div>
            </Grid.Column>
            <Grid.Column width={6}><Form>
              <Form.Field>
                <label>First Name</label>
                <input placeholder='First Name' />
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                <input placeholder='Last Name' />
              </Form.Field>
              <Form.Field>
                <Checkbox label='I agree to the Terms and Conditions' />
              </Form.Field>
              <Button type='submit'>Submit</Button>
            </Form></Grid.Column>
          </Grid>
        </Segment>
        {/* <Segment inverted vertical style={{ padding: '5em 0em' }}> */}
        {/* <FooterContainer /> */}
        {/* </Segment> */}
      </div>
    )
  }
}

export default PageHomeLayout
