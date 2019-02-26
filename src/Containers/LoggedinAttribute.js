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
import LoginActions, { LoginSelectors } from './Login/redux'
import UserActions, { UserSelectors } from './User/redux'

let remote
if (window.require) {
  remote = window.require('electron').remote
}

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
  handleItemClick = (e, { name }) => this.logoutDialog(true, 'b')
  logoutDialog (isShow) {
    // console.log('logoutDialog')
    this.setState({
      showLogoutDialog: isShow,
      modalCommand: 'logout',
      modalTitle: 'Logout Confirmation',
      modalDescription: 'Ingin logout?  Klik Yes untuk logout, Klik No untuk kembali ke Dashboard'
    })
  }
  closewindowDialog (isShow) {
    // console.log('logoutDialog')
    this.setState({
      showLogoutDialog: isShow,
      modalCommand: 'closewindow',
      modalTitle: 'Close Window Confirmation',
      modalDescription: 'Ingin Close Window?  Klik Yes untuk close, Klik No untuk kembali ke Dashboard'
    })
  }
  render () {
    if (this.props.attr === 'buttonLogout') {
      const ModalBasic = () => (
        <Modal
          open={this.state.showLogoutDialog}
          onClose={() => this.setState({ showLogoutDialog: false })}
          basic
          size='small'
        >
          <Header icon='archive' content={this.state.modalTitle} />
          <Modal.Content>
            <p>
              {this.state.modalDescription}
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic
              color='red'
              inverted
              onClick={() => this.logoutDialog(false)}
            >
              <Icon name='remove' /> No
            </Button>
            <Button
              color='green'
              inverted
              onClick={() => {
                this.logoutDialog(false)
                if (this.state.modalCommand === 'closewindow' && remote !== null) remote.getCurrentWindow().close()
                if (this.state.modalCommand === 'logout') {
                  this.props.doLogout()
                  this.props.onLogout()
                }
                // if (command === 'closewindow' && remote !== null) remote.getCurrentWindow().minimize()
              }}
            >
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      )
      let m = [1]
      return m.map(r => {
        // if (r === 0 && this.props.isLoggedIn) {
        //   return (
        //     <Menu.Item
        //       key={this.props.attr + r}
        //       as={Link}
        //       to='/profile'
        //       active={this.props.pathname.startsWith('/profile')}
        //     >
        //       Profile
        //     </Menu.Item>
        //   )
        // }
        if (r === 1) {
          let mm = [0]
          return (
            <Menu.Menu key={this.props.attr + r} position='right'>
              <div>{ModalBasic()}</div>
              {
                mm.map(r => {
                  if (r === 0 && this.props.isLoggedIn) {
                    return (<Dropdown key={this.props.attr + r} item simple icon={(<Icon name='user circle' size={'big'} />)} text={`user: ${this.props.username}`}>
                      <Dropdown.Menu
                        // open={(window.location.hash || window.location.pathname).replace('#','') === '/about'}
                      >
                        <Dropdown.Item
                          as={Link}
                          to='/profile'
                          active={this.props.pathname.startsWith('/profile')}
                          open>
                          <Icon name='user circle' size={'large'} />
                          My Profile
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => this.logoutDialog(!this.state.showLogoutDialog)}>
                          <Icon name='sign out' size={'large'} />
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>)
                  }
                  // if (r === 0 && this.props.isLoggedIn) {
                  //   return <Menu.Item key={r} onClick={() => this.logoutDialog(!this.state.showLogoutDialog)}>
                  //     <Icon name='sign out' size={'large'} />

                  //   </Menu.Item>
                  // } else if (r === 1 && window.require) {
                  //   return <Menu.Item key={r} onClick={() => {
                  //     if (remote !== null) {
                  //       remote.getCurrentWindow().minimize()
                  //     }
                  //   }}>
                  //     <Icon name='window minimize' size={'large'} />
                  //   </Menu.Item>
                  // } else if (r === 2 && window.require) {
                  //   return <Menu.Item key={r} onClick={() => this.closewindowDialog(!this.state.showLogoutDialog)}>
                  //     <Icon name='window close' size={'large'} />
                  //   </Menu.Item>
                  // }
                })
              }
            </Menu.Menu>
          )
        }
      })
      // return (
      //   <Menu.Menu position='right'>
      //     {m.map(r => {
      //       if (r === 0) {
      //         return (
      //           <Menu.Item key={r}>
      //             <Button inverted as={Link} to='/profile'>
      //               Profile
      //             </Button>
      //           </Menu.Item>
      //         )
      //       }
      //       if (r === 1) {
      //         return (
      //           <Menu.Item key={r}>
      //             <Button inverted onClick={() => this.logoutDialog(true)}>
      //               Logout
      //             </Button>
      //             <div>{ModalBasic()}</div>
      //           </Menu.Item>
      //         )
      //       }
      //     })}
      //   </Menu.Menu>
      // )
    } else if (this.props.isLoggedIn && this.props.attr === 'mainmenu') {
      // let m = ['0', '1', '2', '3', '4']
      let m = ['0', '3']
      return m.map(r => {
        if (r === '0') {
          if (this.props.userScope < 10) {
            return (
              <Menu.Item
                key={this.props.attr + r}
                as={Link}
                to='/entity/user'
                active={this.props.pathname.startsWith('/entity/user')}
              >
                User Management
              </Menu.Item>
            )
          }
        }
        if (r === '1') {
          return (
            <Menu.Item
              key={this.props.attr + r}
              as={Link}
              to='/entity/participant'
              active={this.props.pathname.startsWith('/entity/participant')}
            >
              Participants
            </Menu.Item>
          )
        }
        if (r === '2') {
          return (
            <Menu.Item
              key={this.props.attr + r}
              as={Link}
              to='/entity/classes'
              active={this.props.pathname.startsWith('/entity/classes')}
            >
              Classes
            </Menu.Item>
          )
        }
        if (r === '4') {
          return (
            <Menu.Item
              key={this.props.attr + r}
              as={Link}
              to='/entity/file'
              active={this.props.pathname.startsWith('/entity/file')}
            >
              Files
            </Menu.Item>
          )
        }
        if (r === '3' && window.screen.width >= 769 && this.props.userScope < 10) {
          return (
            <Dropdown key={this.props.attr + r} item simple text='Master Data'>
              <Dropdown.Menu
              // open={(window.location.hash || window.location.pathname).replace('#','') === '/about'}
              >
                {/* ---list new entity--- */}
                {/* begin Ignite-Entity-Role */}
                <Dropdown.Item as={Link} to='/entity/role' open>
                  Role
                </Dropdown.Item>
                {/* end Ignite-Entity-Role */}

                {/* begin Ignite-Entity-Badge */}
                {/* <Dropdown.Item as={Link} to='/entity/badge' open>
                  Badgess
                </Dropdown.Item> */}
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

const mapStateToProps = state => {
  const userDetail = UserSelectors.getProfile(state.user)
  return {
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    userScope: userDetail.scope,
    username: userDetail.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ignite boilerplate dispatch list
    doLogout: data => dispatch(LoginActions.loginRemove(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggedInAttribute)
