import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {
  Grid,
  Segment,
  Header,
  Image,
  Input,
  Button,
  Container,
  Icon,
  Form,
  Label,
  Message,
  Select,
  Checkbox
} from 'semantic-ui-react'
import {Images} from '../../Themes'
import {Helmet} from 'react-helmet'
import _ from 'lodash'
import Cookies from 'universal-cookie'

// let minOffset = 0
let maxOffset = 20
let thisYear = (new Date()).getFullYear()
let allYears = []
for (let x = 0; x <= maxOffset; x++) {
  allYears.push(thisYear + x)
}

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    // ctrxId
    const cookies = new Cookies()
    // cookies.set(data.payload.trxid, response.data.id, { path: '/' })
    const strxId = cookies.get(this.props.ctrxId)
    this.props.paymentpageRequest({message: 'requesting', payload: {id: strxId}, url: '/card-checking/find-id-status', method: 'post'})
  }
  //   componentWillMount () {
  //     console.log('componentWillMounts')
  //   }
  // componentDidUpdate (prevProps, prevState) {
  // }
  //   componentDidMount () {
  //   }
  render () {
    // console.log('render ', this.props)
    return (
      <div>
        {/* <Segment>
          {this.props.carousel}
        </Segment> */}
        <Helmet>
          <title>Payment Page</title>
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
        <Segment style={{ padding: '0em', height: window.innerHeight - 37.14 - 47 }} vertical>
          <Container>
            <Header as='h2' style={{marginTop: 15}}>
              {/* <Image src={Images.blogger} style={{ width: '50%', cursor: 'pointer' }} onClick={() => window.open('https://opetstudio.blogspot.com', '_blank')} /> */}
              {this.props.paymentStatus === '00' && <span>Payment success</span>}
              {this.props.paymentStatus !== '00' && <span>{this.props.paymentStatusMessage}</span>}
            </Header>
          </Container>
        </Segment>
        {this.props.footer}
      </div>
    )
  }
}

export default Home
