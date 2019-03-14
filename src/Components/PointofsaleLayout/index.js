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
  Checkbox, Form, Menu, Table, Dropdown, Icon
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
    console.log('componentWillMounts')
    this.setState({
      username: this.props.username
    })
    if (!isUserDetailAccessed && this.props.username) {
      this.props.getUserProfile({ username: this.props.username })
      // isUserDetailAccessed = true
    }
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
    console.log('render')
    const { activeItemBottomMenu } = this.state
    return (
      <div>
        <Segment style={{ padding: '1em 0em' }} vertical>
          <Grid container columns={2} stackable>
            <Grid.Column width={10}>
              <div>
                <Segment attached='top'>
                  {activeItemBottomMenu === '1' && this.props.favoriteItemContent}
                  {activeItemBottomMenu === '2' && this.props.libraryItemContent}
                  {activeItemBottomMenu === '3' && this.props.customItemContent}
                </Segment>
                <Menu attached='bottom' tabular>
                  {/* <Menu.Item name='1' active={activeItemBottomMenu === '1'} onClick={this.handleItemClick}>
                    Favorite
                  </Menu.Item> */}

                  <Menu.Item name='2' active={activeItemBottomMenu === '2'} onClick={this.handleItemClick}>
                    Library
                  </Menu.Item>

                  {/* <Menu.Item name='3' active={activeItemBottomMenu === '3'} onClick={this.handleItemClick}>
                    Custom
                  </Menu.Item> */}
                </Menu>
              </div>
            </Grid.Column>
            <Grid.Column width={6}>
              <div>
                <Menu attached='top' inverted>
                  <Menu.Item as='a'><Icon name={'user'} /></Menu.Item>
                  <Menu fluid vertical inverted>
                    <Menu.Item style={{textAlign: 'center'}} as='a'>New Customer</Menu.Item>
                  </Menu>
                  <Menu.Item as='a' position={'right'}><Icon name={'bars'} /></Menu.Item>
                </Menu>
                <Table attached>
                  {/* <Table.Header>
                    <Table.HeaderCell>Header</Table.HeaderCell>
                    <Table.HeaderCell>Header</Table.HeaderCell>
                    <Table.HeaderCell>Header</Table.HeaderCell>
                  </Table.Header> */}
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <Segment attached='bottom' inverted>
                  Charge Rp. 76.500
                </Segment>
              </div>


            </Grid.Column>
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
