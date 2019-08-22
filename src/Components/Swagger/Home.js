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
import {Images} from '../../Themes'
import {Helmet} from 'react-helmet'
import _ from 'lodash'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItemBottomMenu: '1',
      username: this.props.username
    }
  }
  componentWillMount () {
    console.log('componentWillMounts')
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
  }
  render () {
    return (
      <div>
        {/* <Segment>
          {this.props.carousel}
        </Segment> */}
        <Helmet>
          <title>Home</title>
          {/* <meta name='description' content='Prisma Ministry Indonesia and Prisma SDAC Jakarta.' itemprop='description' />
          <meta charset='utf-8' />
          <meta property='og:type' content='article' />
          <meta property='og:site_name' content='prisdac' />
          <meta property='og:title' content='GMAHK Prisma' />
          <meta property='og:image' content='https://lh3.googleusercontent.com/v4ofZ6bWU--4LYHBhBItWr05e8uiJIQW-CbQrhIZDSuH-1LbqMuFkmNuyaPoUVZikwLQjlY3UBDA7Ka0mvlZVoxvTVIR_QOMIL-gUhwCTuOOpl8G9T2kgoMx9vEDzLy0P4_pNwDVsg=w650' />
          <meta property='og:description' content='Prisma SDA Church Jakarta' />
          <meta property='og:url' content='https://www.prisdac.org' />
          <meta property='og:image:type' content='image/jpeg' />
          <meta property='og:image:width' content='650' />
          <meta property='og:image:height' content='366' /> */}
        </Helmet>
        <Segment style={{ padding: '0em', height: window.innerHeight - 163.266 }} vertical>
          <Container>
            <Grid celled='internally' columns='equal' stackable>
              <Grid.Row>
                {/* <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>
              "What a Company"
                </Header>
                <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
              </Grid.Column> */}
                <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                  {/* <Header as='h3' style={{ fontSize: '2em' }}>
              "Follow instagram, facebook dan subscribe youtube kami"
                </Header> */}
                  <Grid>
                    <Grid.Row>
                   
                      <Grid.Column>
                        <Header as='h3'>
                          {/* <Image src={Images.blogger} style={{ width: '50%', cursor: 'pointer' }} onClick={() => window.open('https://opetstudio.blogspot.com', '_blank')} /> */}
                          <p>Untuk menuju ke halaman swaggerUi dan halaman simulator mobile app:</p>
                          <ul>
                            <li>Login menggunakan username "admin" dan password "password"</li>
                            <li>Setelah berhasil login, click menu "Admin Dashboard" untuk masuk ke halaman admin dashboard</li>
                            <li>click menu SwaggerUi untuk melihat daftar api yang di develop.</li>
                            <li>click menu MobileApp untuk melihat simulasi mobile app.</li>
                          </ul>
                        </Header>
                      </Grid.Column>
                   
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
        {this.props.footer}
      </div>
    )
  }
}

export default Home
