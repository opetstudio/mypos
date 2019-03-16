import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Image,
  Label,
  Input,
  Button
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import HomepageHeading from '../Components/HomepageHeading'
import LoggedInAttribute from './LoggedinAttribute'
import Carousel1 from '../Components/Carousel/carousel1'
import {Images} from '../Themes'

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class MobileContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuEntityToggle: true
    }
    // this.handlePusherClick = this.handlePusherClick.bind(this)
    this.handleSidebarHide = this.handleSidebarHide.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  // handlePusherClick () {
  //   const { sidebarOpened } = this.state

  //   if (sidebarOpened) this.setState({ sidebarOpened: false })
  // }

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render () {
    const { children } = this.props
    const { sidebarOpened } = this.state

    // const isHome =
    //   (window.location.hash || window.location.pathname).replace('#', '') ===
    //     '/home' ||
    //   (window.location.hash || window.location.pathname).replace('#', '') ===
    //     '/'

    const pathname = (window.location.hash || window.location.pathname).replace(
      '#',
      ''
    )
    // #/entity/participant
    const isHome =
      pathname === '/home' ||
      pathname === '/' ||
      pathname === '#/' ||
      pathname === '#/home'

    // console.log('pathname===>', pathname)

    return (
      // <Responsive {...Responsive.onlyMobile}>
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as={Link} to='/home' active={pathname === '/home'}>Home</Menu.Item>
          {/* <Menu.Item as={Link} to='/event' active={pathname === '/event'}>Events</Menu.Item> */}
          {/* <Menu.Item as={Link} to='/article' active={pathname === '/article'}>Articles</Menu.Item>
          <Menu.Item as={Link} to='/news' active={pathname === '/news'}>News</Menu.Item> */}
          <Menu.Item as={Link} to='/gallery-album' active={['/gallery-album'].indexOf(pathname) !== -1}>Gallery</Menu.Item>
          {/* <Menu.Item as='a'>Log in</Menu.Item>
          <Menu.Item as='a'>Sign Up</Menu.Item> */}
          {/* ---list new entity--- */}

          <LoggedInAttribute
            attr='buttonLogin'
            pathname={pathname}
            onLogout={() => this.setState({ sidebarOpened: false })}
            mobile
          />

        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: isHome ? 350 : 0, padding: '0em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item as={Link} to='/' style={{paddingBottom: '5px'}} position='right'>
                  PRISMA SDA CHURCH <Image src={Images.adventistlogo} size={'mini'} spaced='right' />
                </Menu.Item>
                {/* <LoggedInAttribute
                  attr='buttonLogin'
                  pathname={pathname}
                  onLogout={() => this.setState({ sidebarOpened: false })}
                  mobile
                /> */}
              </Menu>
            </Container>
            {isHome ? <Carousel1 /> : null}
            {/* {isHome ? <HomepageHeading mobile /> : null} */}
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
}

export default MobileContainer
