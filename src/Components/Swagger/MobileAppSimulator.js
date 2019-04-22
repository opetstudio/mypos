import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {
  Grid,
  Segment,
  Header,
  Form,
  TextArea,
  Button,
  Container,
  List,
  Divider,
  Message
} from 'semantic-ui-react'
import Immutable from 'seamless-immutable'
import {Images} from '../../Themes'
import {Helmet} from 'react-helmet'
import _ from 'lodash'
import API from '../../Services/Api'

class MobileAppSimulator extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItemBottomMenu: '1',
      username: this.props.username,
      // scene: ['sceneMerchantPage'],
      currentScene: '',
      initMdoData: this.props.initMdoData
    }
    this.renderScene = this.renderScene.bind(this)
    this.back = this.back.bind(this)
  }
  componentWillMount () {
    console.log('componentWillMounts')
    this.setState({
      username: this.props.username
    })
    this.props.getUserProfile({ username: this.props.username })
  }
  componentDidUpdate (prevProps, prevState) {
    // console.log('componentDidUpdate ', this.state)
    if (!_.isEqual(prevProps.username, this.props.username)) {
      this.props.getUserProfile({ username: this.props.username })
      this.setState({
        username: this.props.username
      })
    }
  }
  componentDidMount () {
  }
  back () {
    if (this.props.scene.length > 1) {
      let sc = Immutable.asMutable(this.props.scene, { deep: true })
      sc.pop()
      this.props.debitonlineRequestPatch({scene: sc})
    }
  }
  renderScene () {
    let nextScene = this.props.scene[this.props.scene.length - 1]
    if (this.state.currentScene !== nextScene) {
      this.props.debitonlineRequestPatch({log: ['render ' + nextScene]})
      this.state.currentScene = nextScene
      if (this.state.currentScene === 'scenePaymentProcessPage') {
        this.props.debitonlineRequest({
          message: 'requesting',
          payload: JSON.parse(this.props.mdoPaymentData),
          url: '/MdoPaymentApi/rest/doSale',
          method: 'post'
        })
      }
    }

    let theScene = {
      sceneMerchantPage: () => {
        return (
          <div>
            <Grid divided='vertically'>
              <Grid.Row verticalAlign='top'>
                <Grid.Column>

                  <Form>
                    <Form.Field onChange={(o, v) => {
                      // console.log('oooooo', o)
                      // console.log('vvvvv', v)
                      this.props.debitonlineRequestPatch({initMdoData: v.value})
                    }} control={TextArea} label='payload' placeholder='cart content' rows={30} value={JSON.stringify(JSON.parse(this.props.initMdoData), undefined, 4)} />
                  </Form>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  {
                    (this.props.message !== '' && this.props.message !== '00') &&
                    <Message negative>
                      <p>{this.props.message}</p>
                    </Message>
                  }

                  <Button onClick={() => {
                    // hit remove card api
                    this.props.debitonlineRequest({message: 'requesting', payload: JSON.parse(this.props.removeCardData), url: '/CardRemoveAPI/rest/cardRemoveRs', method: 'post'})
                    this.setState({log: this.state.log})
                  }}>Remove Card</Button><br /><br />
                  <Button onClick={() => {
                    this.props.debitonlineRequest({
                      message: 'requesting',
                      payload: JSON.parse(this.props.initMdoData),
                      url: '/InitMDOApiV2/rest/validate',
                      method: 'post',
                      nextScene: 'sceneInputCardNumberPage'
                      // callback: (msg) => {
                      //   if (msg === '00') {
                      //     this.props.scene.push('sceneInputCardNumberPage')
                      //     this.props.debitonlineRequestPatch({scene: this.props.scene})
                      //     // this.setState({scene: this.state.scene})
                      //   }
                    })
                    // console.log('=======>>>>>message=', this.props.message)
                  }} >Mandiri Direct Debit</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        )
      },
      sceneInputCardNumberPage: () => {
        return (
          <div>
            <Grid divided='vertically'>
              <Grid.Row verticalAlign='top'>
                <Grid.Column>
                  <Form>
                    <Form.Field control={TextArea} label='payload' placeholder='input' rows={30} value={JSON.stringify(JSON.parse(this.props.cardVerifyGenerateOtpData), undefined, 4)} onChange={(o, v) => this.props.debitonlineRequestPatch({cardVerifyGenerateOtpData: v.value})} />
                  </Form>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  {
                    (this.props.message !== '' && this.props.message !== '00') &&
                    <Message negative>
                      <p>{this.props.message}</p>
                    </Message>
                  }
                  <Button onClick={() => {
                    this.props.debitonlineRequest({
                      message: 'requesting',
                      payload: JSON.parse(this.props.cardVerifyGenerateOtpData),
                      url: '/CardVerifyGenerateOtpApi/rest/cardverifyRs',
                      method: 'post',
                      nextScene: 'sceneInputOtpPage'
                    })
                  }}>Submit Card No</Button>
                  <Button onClick={() => this.back()}>Back</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        )
      },
      sceneInputOtpPage: () => {
        return (
          <div>
            <Grid divided='vertically'>
              <Grid.Row verticalAlign='top'>
                <Grid.Column>
                  <Form>
                    <Form.Field control={TextArea} label='payload' placeholder='input' rows={30} value={JSON.stringify(JSON.parse(this.props.validateOtpData), undefined, 4)} onChange={(o, v) => this.props.debitonlineRequestPatch({validateOtpData: v.value})} />
                  </Form>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  {
                    (this.props.message !== '' && this.props.message !== '00') &&
                    <Message negative>
                      <p>{this.props.message}</p>
                    </Message>
                  }
                  <Button onClick={() => {
                    this.props.debitonlineRequest({
                      message: 'requesting',
                      payload: JSON.parse(this.props.validateOtpData),
                      url: '/MdoOtpVerificationApi/rest/validateOtpRs',
                      method: 'post',
                      nextScene: 'sceneInputLimitPage'
                      // callback: (message) => {
                      //   if (message === '00') {
                      //     this.props.debitonlineRequest({
                      //       message: 'requesting',
                      //       payload: JSON.parse(this.props.cardVerifyGenerateOtpData),
                      //       url: '/simulator/service/mdo/bindCard',
                      //       method: 'post',
                      //       nextScene: 'sceneInputLimitPage'
                      //     })
                      //   }
                      // }
                    })
                  }}>Submit OTP</Button>
                  <Button onClick={() => this.back()}>Back</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        )
      },
      sceneInputLimitPage: () => {
        return (
          <div>
            <Grid divided='vertically'>
              <Grid.Row verticalAlign='top'>
                <Grid.Column>
                  <Form>
                    <Form.Field control={TextArea} label='payload' placeholder='input' rows={30} value={JSON.stringify(JSON.parse(this.props.customerSetTrxLimitData), undefined, 4)} onChange={(o, v) => this.props.debitonlineRequestPatch({customerSetTrxLimitData: v.value})} />
                  </Form>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  {
                    (this.props.message !== '' && this.props.message !== '00') &&
                    <Message negative>
                      <p>{this.props.message}</p>
                    </Message>
                  }
                  <Button onClick={() => {
                    this.props.debitonlineRequest({
                      message: 'requesting',
                      payload: JSON.parse(this.props.customerSetTrxLimitData),
                      url: '/SetLimitTrxCustomerAPI/rest/setMaximumDailyTransactionCustomer',
                      method: 'post',
                      nextScene: 'scenePaymentProcessPage'
                    })
                  }}>Submit Limit</Button>
                  <Button onClick={() => this.back()}>Back</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        )
      },
      scenePaymentProcessPage: () => {
        return (
          <div>
            <Grid divided='vertically'>
              <Grid.Row verticalAlign='top'>
                <Grid.Column>
                  {
                    this.props.message !== '00' &&
                    <Message negative>
                      <p>{this.props.message}</p>
                    </Message>
                  }
                  {
                    this.props.message === '00' &&
                    <Message>
                      <p>Successfully Bind and pay</p>
                    </Message>
                  }
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button onClick={() => this.props.debitonlineRequestPatch({scene: ['sceneMerchantPage'], message: ''})}>Back to Merchant</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        )
      }
    }
    return theScene[nextScene]()
  }
  render () {
    // console.log('render ', this.state)
    return (
      <div>
        {/* <Segment>
          {this.props.carousel}
        </Segment> */}
        <Helmet>
          <title>MobileAppSimulator</title>
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
        <Segment style={{ padding: '0em 0em', minHeight: window.innerHeight - 50.125 - 33 }} vertical>
          <Grid stackable>
            <Grid.Row style={{paddingBottom: '3em', paddingTop: '2.4em'}}>

              <Grid.Column style={{}} width={4}>

                <Grid padded>
                  <Grid.Row>
                    <Grid.Column style={{backgroundColor: 'blue'}}>
                      <h2 style={{color: 'yellow'}}>{this.state.currentScene}</h2>
                      {this.renderScene()}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

              </Grid.Column>

              <Grid.Column width={12} style={{whiteSpace: 'nowrap', overflow: 'auto'}}>
                <h3>Log</h3>
                <ul>
                  {this.props.log.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        {this.props.footer}
      </div>
    )
  }
}

export default MobileAppSimulator
