import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Menu,
  // Responsive,
  Segment,
  Visibility,
  // Dropdown,
  Image,
  // Modal,
  // Header,
  Responsive,
  Icon,
  Header
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import LoginActions, { LoginSelectors } from './Login/redux'
import HomepageHeading from '../Components/HomepageHeading'
import LoggedInAttribute from './LoggedinAttribute'
import Carousel1 from '../Components/Carousel/carousel1'
import {Images} from '../Themes'

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class DesktopContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
    this.showFixedMenu = this.showFixedMenu.bind(this)
    this.hideFixedMenu = this.hideFixedMenu.bind(this)
    // this.logoutDialog = this.logoutDialog.bind(this)
  }

  hideFixedMenu () {
    return this.setState({ fixed: false })
  }
  showFixedMenu () {
    return this.setState({ fixed: true })
  }
  // logoutDialog (isShow) {
  //   console.log('logoutDialog')
  //   this.setState({ showLogoutDialog: isShow })
  // }
  render () {
    const { children } = this.props
    const { fixed } = this.state
    console.log('window=', window)
    const pathname = (window.location.hash || window.location.pathname).replace(
      '#',
      ''
    )
    // #/entity/participant
    let isHome =
      pathname === '/home' ||
      pathname === '/' ||
      pathname === '#/' ||
      pathname === '#/home'

    // isHome = false
    // console.log('pathname=', pathname)

    // const children = React.Children.map(this.props.children, (child, index) => {
    //   // console.log('cekk===>', child)
    //   let TheComponent = child.thecomponent
    //   let addProps = {
    //     index,
    //     isActive: index === this.state.activeIndex,
    //     someFunction: () => this.setState({ activeIndex: index }),
    //     raisa: 'haloo'
    //   }
    //   // Object.defineProperty(child.props, 'render', (routerProps) => (<TheComponent {...routerProps} />))
    //   // child.props.render = (routerProps) => (<TheComponent {...routerProps} />)
    //   return React.cloneElement(child, addProps)
    // })

    // const ModalBasicExample = () => (
    //   <Modal open={this.state.showLogoutDialog} onClose={() => this.setState({showLogoutDialog: false})} basic size='small'>
    //     <Header icon='archive' content='Logout Confirmation' />
    //     <Modal.Content>
    //       <p>
    //         Apakah anda yakin ingin logout? Klik Yes untuk logout, Klik No untuk kembali ke Dashboard
    //       </p>
    //     </Modal.Content>
    //     <Modal.Actions>
    //       <Button basic color='red' inverted onClick={() => this.logoutDialog(false)}>
    //         <Icon name='remove' /> No
    //       </Button>
    //       <Button color='green' inverted onClick={() => { this.props.doLogout(); this.logoutDialog(false) }}>
    //         <Icon name='checkmark' /> Yes
    //       </Button>
    //     </Modal.Actions>
    //   </Modal>
    // )
    // console.log('pathname===>', pathname)
    return (
      // <Responsive {...Responsive.onlyComputer}>

      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        {/* <div><Segment inverted><Container>
          <Header as='h1'> <Image size={'huge'} src='https://www.prisdac.org/sites/default/files/logoprisdac_1.png' style={{ marginRight: '1em' }} />Prisma SDAC Jakarta</Header>
          <p>
            Reaching The Soul, Keeping The Soul, Recovery The Soul
          </p>
        </Container>
        </Segment></div> */}
        {(pathname.startsWith('/entity') || pathname.startsWith('/admin') || pathname.startsWith('/point-of-sale')) && (
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 0, padding: '0em 0em' }}
              // style={{ minHeight: isHome ? 700 : 0, padding: '1em 0em' }}
              vertical
            >
              {/* <Segment
              inverted
              textAlign='center'
              // style={{ minHeight: 0, padding: '1em 0em' }}
              style={{ minHeight: isHome ? 700 : 0, padding: '1em 0em' }}
              vertical
            > */}
              <Menu
                // style={{backgroundColor: 'red', WebkitAppRegion: 'drag', WebkitUserSelect: 'none'}}
                // fixed={fixed ? 'top' : null}
                // fixed={fixed ? 'top' : null}
                inverted
                // inverted={false}
                // pointing={!fixed}
                // secondary={!fixed}
                size='small'
              >
                {/* <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='small'
              > */}
                {/* <Container> */}
                <Menu.Item onClick={() => { window.history.back() }}>
                  <Icon name='angle left' size={'big'} />
                </Menu.Item>
                <Menu.Item as={Link} to='/admin/dashboard' active={['/admin/dashboard'].indexOf(pathname) !== -1}>Home</Menu.Item>
                <Menu.Item as={Link} to='/' active={isHome}>Frontend</Menu.Item>
                {/* <Menu.Item
                  as={Link}
                  to='/about'
                  active={pathname === '/about'}
                >
                    About
                </Menu.Item> */}
                <LoggedInAttribute attr='mainmenu' pathname={pathname} />
                <LoggedInAttribute attr='buttonLogout' pathname={pathname} />
                {/* </Container> */}
              </Menu>
              {/* {isHome ? <HomepageHeading /> : null} */}
            </Segment>
          </Visibility>
        )}
        {!(pathname.startsWith('/entity') || pathname.startsWith('/admin') || pathname.startsWith('/point-of-sale')) && (
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
              inverted
              // textAlign='center'
              style={{ minHeight: isHome ? 0 : 0, padding: '0em 0em' }}
              vertical
            >
              <div style={{ paddingTop: '1em', borderBottom: '10px solid black', backgroundImage: `url(${Images.headerbg2})`, backgroundSize: '100%' }}>
                <Container style={{}}>
                  
                  <Header as='h2'>
                    {/* <Icon name='settings' /> */}
                    <Image src={Images.headerlogo} style={{ width: '100px' }} />
                    <Header.Content style={{color: 'white'}}>
                      Nofrets Poai
                      <Header.Subheader style={{color: 'white'}}>kuli koding jakarta | nofrets.poai@gmail.com | 085342805673</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Container>
                <Menu
                  fixed={fixed ? 'top' : null}
                  inverted={!fixed}
                  pointing={!fixed}
                  secondary={!fixed}
                  size='large'
                  style={{ borderWidth: '0px' }}
                >
                  <Container>
                    {/* {window.history.back && <Menu.Item onClick={window.history.back}>
                      <Icon name='angle left' size={'big'} />
                    </Menu.Item>} */}
                    {/* <Menu.Item>
                      <Image size={'mini'} src='https://react.semantic-ui.com/logo.png' style={{ marginRight: '1.5em' }} />
                      Prisma SDAC Jakarta
                    </Menu.Item> */}
                    <Menu.Item as={Link} to='/' active={isHome}>Home</Menu.Item>
                    {/* <Menu.Item
                    as={Link}
                    to='/about'
                    active={pathname === '/about'}
                  >
                      About
                  </Menu.Item> */}
                    <Menu.Item as={Link} to='/about' active={['/about'].indexOf(pathname) !== -1}>About</Menu.Item>
                    <Menu.Item as={Link} to='/contact' active={['/contact'].indexOf(pathname) !== -1}>Contact</Menu.Item>
                    <LoggedInAttribute
                      attr='frontMainMenu'
                      pathname={pathname}
                      fixed={fixed}
                    />
                    <LoggedInAttribute attr='buttonLogout' pathname={pathname} fixed={fixed} />
                    {/* <LoggedInAttribute
                      attr='buttonLogin'
                      pathname={pathname}
                      onLogout={() => this.setState({ sidebarOpened: false })}
                      fixed={fixed}
                    /> */}
                    
                    {/* <Menu.Item position='right'>
                      <Button as='a' inverted={!fixed}>
                      Log in
                      </Button>
                      <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                      Sign Up
                      </Button>
                    </Menu.Item> */}
                  </Container>
                </Menu>
              </div>
              {/* {isHome ? <div><Carousel1 /></div> : null} */}
              {/* {isHome ? <HomepageHeading /> : null} */}
            </Segment>
          </Visibility>
        )}
        {children}
      </Responsive>
      // </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
}
export default DesktopContainer
// const mapStateToProps = (state) => {
//   return {
//     isLoggedIn: LoginSelectors.isLoggedIn(state.login)
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // ignite boilerplate dispatch list
//     doLogout: (data) => dispatch(LoginActions.loginRemove(data))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(DesktopContainer)
