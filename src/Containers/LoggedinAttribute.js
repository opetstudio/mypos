import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  // Container,
  Menu,
  // Responsive,
  // Segment,
  // Visibility,
  Dropdown,
  Button,
  Modal,
  Header,
  Icon
} from 'semantic-ui-react'
import LoginActions, {LoginSelectors} from './Login/redux'
import UserActions, {UserSelectors} from './User/redux'

class LoggedInAttribute extends Component {
   // Prop type warnings
   static propTypes = {
     onLogout: PropTypes.func
   }

  // Defaults for props
  static defaultProps = {
    onLogout: () => {}
  }
  constructor (props) {
    super(props)
    this.state = {}
    this.logoutDialog = this.logoutDialog.bind(this)
  }
  logoutDialog (isShow) {
    // console.log('logoutDialog')
    this.setState({ showLogoutDialog: isShow })
  }
  render () {
    if (this.props.isLoggedIn && this.props.attr === 'buttonLogout') {
      const ModalBasic = () => (
        <Modal open={this.state.showLogoutDialog} onClose={() => this.setState({showLogoutDialog: false})} basic size='small'>
          <Header icon='archive' content='Logout Confirmation' />
          <Modal.Content>
            <p>
              Apakah anda yakin ingin logout? Klik Yes untuk logout, Klik No untuk kembali ke Dashboard
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' inverted onClick={() => this.logoutDialog(false)}>
              <Icon name='remove' /> No
            </Button>
            <Button color='green' inverted onClick={() => { this.props.doLogout(); this.logoutDialog(false); this.props.onLogout() }}>
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      )
      let m = [0, 1]
      return <Menu.Menu position='right'>{m.map(r => {
        if (r === 0) {
          return (<Menu.Item key={r}>
            <Button inverted as={Link} to='/profile'>
          Profile
            </Button>
          </Menu.Item>)
        }
        if (r === 1) {
          return (<Menu.Item key={r} >
            <Button inverted onClick={() => this.logoutDialog(true)}>
              Logout
            </Button>
            <div>{ModalBasic()}</div>
          </Menu.Item>)
        }
      })}</Menu.Menu>
    }
    if (this.props.isLoggedIn && this.props.attr === 'mainmenu') {
      let m = ['0', '1', '2', '3', '4']
      return m.map(r => {
        if (r === '0') {
          if (this.props.userScope < 10) {
            return (
              <Menu.Item
                key={r}
                as={Link}
                to='/entity/user'
                active={(this.props.pathname).startsWith('/entity/user')}
              >
              User Management
              </Menu.Item>
            )
          }
        }
        if (r === '1') {
          return (
            <Menu.Item
              key={r}
              as={Link}
              to='/entity/participant'
              active={(this.props.pathname).startsWith('/entity/participant')}
            >
          Participants
            </Menu.Item>
          )
        }
        if (r === '2') {
          return (
            <Menu.Item
              key={r}
              as={Link}
              to='/entity/classes'
              active={(this.props.pathname).startsWith('/entity/classes')}
            >
          Classes
            </Menu.Item>
          )
        }
        if (r === '4') {
          return (
            <Menu.Item
              key={r}
              as={Link}
              to='/entity/file'
              active={(this.props.pathname).startsWith('/entity/file')}
            >
          Files
            </Menu.Item>
          )
        }
        if (r === '3' && window.screen.width >= 769) {
          return (
            <Dropdown
              key={r}
              item
              simple
              text='Master Data'
            >
              <Dropdown.Menu
                // open={window.location.pathname === '/about'}
              >
                {/* ---list new entity--- */}

                {/* begin Ignite-Entity-Conference */}
                <Dropdown.Item
                  as={Link}
                  to='/entity/conference'
                  open
                >
Conference
                </Dropdown.Item>
                {/* end Ignite-Entity-Conference */}

                {/* begin Ignite-Entity-Badge */}
                <Dropdown.Item
                  as={Link}
                  to='/entity/badge'
                  open
                >
Badge
                </Dropdown.Item>
                {/* end Ignite-Entity-Badge */}

                {/* <Dropdown.Item
                as={Link}
                to='/home'
                open
              >
              Entity1
              </Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          )
        }
      })
    }
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    userScope: (UserSelectors.getProfile(state.user) || {}).scope
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // ignite boilerplate dispatch list
    doLogout: (data) => dispatch(LoginActions.loginRemove(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInAttribute)
