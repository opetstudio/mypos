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

const visaIcon = Images.visaicon
const mastercardicon = Images.mastercardicon

// let minOffset = 0
let maxOffset = 20
let thisYear = (new Date()).getFullYear()
let allYears = []
for (let x = 0; x <= maxOffset; x++) {
  allYears.push(thisYear + x)
}

const optionsYear = allYears.map((x) => { return {key: x, text: x, value: x} })

const optionsMonth = [
  {key: '01', text: 'January', value: '01'},
  {key: '02', text: 'February', value: '02'},
  {key: '03', text: 'March', value: '03'},
  {key: '04', text: 'April', value: '04'},
  {key: '05', text: 'May', value: '05'},
  {key: '06', text: 'June', value: '06'},
  {key: '07', text: 'July', value: '07'},
  {key: '08', text: 'August', value: '08'},
  {key: '09', text: 'September', value: '09'},
  {key: '10', text: 'October', value: '10'},
  {key: '11', text: 'November', value: '11'},
  {key: '12', text: 'December', value: '12'}
]

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItemBottomMenu: '1'
    //   firstName: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  //   componentWillMount () {
  //     console.log('componentWillMounts')
  //   }
  // componentDidUpdate (prevProps, prevState) {
  // }
  //   componentDidMount () {
  //   }
  handleChange (o, v) {
    // console.log('o===>', o)
    // console.log('v===>', v)
    if (v.type === 'checkbox') {
      return this.props.paymentpageRequestPatch({[v.name]: v.checked})
    }
    if (v.name === 'cardNumber') {
      //  trim
      let cardNo = v.value
      // console.log('cardNo=' + cardNo)
      if (cardNo.length === 16) {
        // hit luhn
        this.props.paymentpageRequest({message: 'requesting', payload: {cardNo}, url: '/card-checking/luhn-validate', method: 'post'})
      }
    }
    this.props.paymentpageRequestPatch({[v.name]: v.value})
    // this.setState({firstName: v.value})
  }
  handleSubmit () {
    let cardType = ''
    let cardNo = this.props.cardNumber
    if (cardNo.startsWith('3')) cardType = 'JCB'
    else if (cardNo.startsWith('4')) cardType = 'VISA'
    else if (cardNo.startsWith('5')) cardType = 'MASTERCARD'
    let trxid = Date.now()
    // let callbackUrl = this.props.callbackUrl || 'http://localhost:8080/PaymentPage/creditcard/callback?trxid=' + trxid
    let payload = {
      'trxid': trxid,
      'channelId': this.props.par1,
      'serviceCode': this.props.par2,
      'currency': this.props.par3,
      'transactionNo': this.props.par4,
      'transactionAmount': this.props.par5,
      'transactionDate': this.props.par6,
      'callbackURL': this.props.par12,
      'description': this.props.par7,
      'customerName': this.props.par8,
      'customerEmail': this.props.par9,
      'customerPhone': this.props.par10,
      'cardNo': this.props.cardNumber,
      'cardExpiryYear': this.props.expireYear,
      'cardExpiryMonth': this.props.expireMonth,
      'cardSecurityCode': this.props.cvv,
      'cardType': cardType,
      'secretKey': this.props.par11
    }

    this.props.paymentpageRequest({message: 'requesting', payload, url: '/card-checking/pcs-payment-register', method: 'post'})
  }
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
        <Segment style={{ padding: '0em', borderBottom: 0 }} vertical>
          <Container>
            <Header as='h2' style={{marginTop: 15}}>
              {/* <Image src={Images.blogger} style={{ width: '50%', cursor: 'pointer' }} onClick={() => window.open('https://opetstudio.blogspot.com', '_blank')} /> */}
              <span>Pay with credit card</span>
            </Header>
            <Grid celled='internally' columns='equal' stackable>
              <Grid.Row>
                <Grid.Column>
                  {(this.props.message !== '00' && this.props.message !== '') &&
                    <Message error content={this.props.message} />
                  }
                  {/* {(this.props.message === '00' && this.props.message !== '') &&
                    <Message success content={this.props.message} />
                  } */}
                  <Form loading={this.props.isRequesting}>
                    {/* <Form.Group>
                      <Form.Input name='firstName' label='First name' placeholder='First Name' width={8} value={this.props.firstName} readOnly />
                      <Form.Input name='lastName' label='Last Name' placeholder='Last Name' width={8} value={this.props.lastName} readOnly />
                    </Form.Group> */}
                    <Form.Field>
                      <label style={{position: 'relative'}}>Card Number <Icon name='question circle outline' />
                        <div style={{position: 'absolute', right: 0, bottom: 0}}>
                          <Image src={visaIcon} style={{width: 25, marginLeft: 10, display: 'inline'}} />
                          <Image src={mastercardicon} style={{width: 25, marginLeft: 10, display: 'inline'}} />
                        </div>
                      </label>
                      <Form.Input name='cardNumber' placeholder='Card number' icon={<Icon name='lock' />} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Group widths='equal'>
                      <Form.Field disabled={!this.props.isLuhnOk}>
                        <label>Expiry</label>
                        {/* <Input fluid placeholder='First name' /> */}
                        <Select name='expireMonth' fluid placeholder='Month' options={optionsMonth} onChange={this.handleChange} />
                      </Form.Field>
                      <Form.Field disabled={!this.props.isLuhnOk}>
                        <label style={{visibility: 'hidden'}}>.</label>
                        {/* <Input fluid placeholder='Middle name' /> */}
                        <Select name='expireYear' fluid placeholder='Year' options={optionsYear} onChange={this.handleChange} />
                      </Form.Field>
                      <Form.Field disabled={!this.props.isLuhnOk}>
                        <label>CVV <Icon name='question circle outline' /></label>
                        <Input name='cvv' fluid placeholder='cvv' icon={<Icon name='lock' />} onChange={this.handleChange} />
                      </Form.Field>
                    </Form.Group>
                    <br />
                    <br />
                    {/* <Form.Field>
                      <label>Billing Information</label>
                      <Checkbox name='isShippingAddress' label='Same as shipping address' onChange={this.handleChange} checked={this.props.isShippingAddress} />
                    </Form.Field> */}
                    {/* <Form.Group widths='equal'>
                      <Form.Field control={Input} label='First name' placeholder='First name' />
                      <Form.Field control={Input} label='Last name' placeholder='Last name' />
                      <Form.Field control={Select} label='Gender' options={options} placeholder='Gender' />
                    </Form.Group> */}
                    {/* <Form.Field control={TextArea} label='About' placeholder='Tell us more about you...' /> */}
                    {/* <Input iconPosition='right' placeholder='Cvv' width={16}>
                      <Icon name='at' />
                      <input />
                    </Input> */}
                    <br />
                    <br />
                    <Button>Cancel</Button>
                    <Button primary onClick={this.handleSubmit} disabled={!this.props.isLuhnOk}>Submit</Button>
                  </Form>
                </Grid.Column>
                {/* <Grid.Column>
                  <Header as='h3'>
                    <span>Shipping address</span>
                  </Header>
                  <p>
                    {this.props.shippingAddress}
                  </p>
                </Grid.Column> */}
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
