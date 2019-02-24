import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Dropdown,
  Label,
  Input
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import HomepageHeading from '../Components/HomepageHeading'
import LoggedInAttribute from './LoggedinAttribute'

class MobileContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuEntityToggle: true
    }
    this.handlePusherClick = this.handlePusherClick.bind(this)
  }

  handlePusherClick () {
    const { sidebarOpened } = this.state

    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () =>
    this.setState({ sidebarOpened: !this.state.sidebarOpened })

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

    return (
      // <Responsive {...Responsive.onlyMobile}>
      // <Responsive>
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          vertical
          visible={sidebarOpened}
          width='thin'
        >
          <Menu.Item as={Link} to='/' active={isHome}>
            {/* <Icon name='home' /> */}
            Home
          </Menu.Item>
          <Menu.Item
            as={Link}
            to='/about'
            active={pathname === '/about'}
          >
            {/* <Icon name='gamepad' /> */}
            About
          </Menu.Item>
          <LoggedInAttribute
            attr='mainmenu'
            pathname={pathname}
          />
          <Menu.Item
            name='entity'
            onClick={() => {
              this.setState({ menuEntityToggle: !this.state.menuEntityToggle })
            }}
            style={{
              backgroundColor:
                pathname.startsWith('/entity') || !this.state.menuEntityToggle
                  ? 'rgba(255, 255, 255, 0.05)'
                  : '#1b1c1d'
            }}
          >
            Master Data
          </Menu.Item>
          <div
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            hidden={this.state.menuEntityToggle}
          >
            {/* ---list new entity--- */}

    {/* begin Ignite-Entity-Pointofsale */}
    <Menu.Item
      as={Link}
      to='/entity/pointofsale'
      active={pathname === '/entity/pointofsale'}
    >
    Pointofsale
    </Menu.Item>
    {/* end Ignite-Entity-Pointofsale */}
    

            {/* begin Ignite-Entity-Role */}
            <Menu.Item
              as={Link}
              to='/entity/role'
              active={pathname === '/entity/role'}
            >
              Role
            </Menu.Item>
            {/* end Ignite-Entity-Role */}

            {/* begin Ignite-Entity-File */}
            <Menu.Item
              as={Link}
              to='/entity/file'
              active={pathname === '/entity/file'}
            >
              File
            </Menu.Item>
            {/* end Ignite-Entity-File */}

            {/* begin Ignite-Entity-Conference */}
            <Menu.Item
              as={Link}
              to='/entity/conference'
              active={pathname === '/entity/conference'}
            >
              Conference
            </Menu.Item>
            {/* end Ignite-Entity-Conference */}

            {/* begin Ignite-Entity-Badge */}
            <Menu.Item
              as={Link}
              to='/entity/badge'
              active={pathname === '/entity/badge'}
            >
              Badge
            </Menu.Item>
            {/* end Ignite-Entity-Badge */}

            {/* <Menu.Item
                as={Link}
                to='/entity/entity1'
                active={((window.location.hash || window.location.pathname).replace('#','')).startsWith('/entity/entity1')}
              >
                Entity1
              </Menu.Item> */}
          </div>
          <LoggedInAttribute
            attr='buttonLogout'
            pathname={pathname}
            onLogout={() => this.setState({ sidebarOpened: false })}
          />
        </Sidebar>

        <Sidebar.Pusher
          dimmed={sidebarOpened}
          onClick={this.handlePusherClick}
          style={{ minHeight: '100vh' }}
        >
          {window.localStorage.getItem('isLoggedIn') === 'true' && (
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: isHome ? 350 : 0, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                    Dashboard
                  </Menu.Item>
                </Menu>
              </Container>
              {isHome ? <HomepageHeading mobile /> : null}
            </Segment>
          )}
          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      // </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
}

export default MobileContainer
