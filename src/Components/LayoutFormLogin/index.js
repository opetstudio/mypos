import React from 'react'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Container
} from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import CryptoJS from 'crypto-js'

// var bcrypt = require('bcryptjs')
// var salt = bcrypt.genSaltSync(1)

class LayoutFormLogin extends React.Component {
  state = {
    password: '',
    email: '',
    grant_type: 'password',
    username: '',
    client_id: '',
    formSubmitMessage: ''
  }
  componentWillMount () {
    // console.log('componentWillMount')
    this.props.resetFormLogin()
    this.setState({
      formSubmitMessage: this.props.formSubmitMessage
    })
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      formSubmitMessage: nextProps.formSubmitMessage
    })
  }
  handleChange = (e, { name, value }) => {
    var newSt = {}
    newSt[name] = value
    if (name === 'email') {
      // let hash = bcrypt.hashSync(value, salt)
      // console.log(name + ' hash=>', hash)
      newSt['username'] = value
      newSt['client_id'] = value
    }
    this.setState(newSt)
  }
  handleSubmit = () => {
    // console.log('handleSubmit')
    const { username, password } = this.state
    // encrypt password
    // let hash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64)
    // let secondHash = CryptoJS.SHA256(hash).toString(CryptoJS.enc.Base64)

    const submittedData = {
      grant_type: this.state.grant_type,
      username,
      password,
      client_id: this.state.client_id
    }
    this.setState(submittedData)
    this.props.loginCreate(submittedData)
  }
  render () {
    const { isLoggedIn } = this.props
    const { password, email } = this.state

    if (window.localStorage.getItem('isLoggedIn') === 'true') { return <Redirect to='/' /> }
    return (
      <div className='login-form' style={{ marginTop: 30 }}>
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Container>
          <Grid
            textAlign='center'
            style={{ height: '100%' }}
            verticalAlign='middle'
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                <Image src='http://react.semantic-ui.com/logo.png' /> Log-in to
                your account
              </Header>
              {this.state.formSubmitMessage && (
                <Message color={this.props.isError ? 'red' : 'green'}>
                  {this.state.formSubmitMessage}
                </Message>
              )}
              <Form size='large' onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='Username'
                    name='email'
                    value={email}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    name='password'
                    value={password}
                    onChange={this.handleChange}
                  />

                  {/* <Button color='teal' fluid size='large'> */}
                  <Form.Button
                    content='Login'
                    color='teal'
                    fluid
                    size='large'
                  />
                </Segment>
              </Form>
              {/* <Message>
              New to us? <a href='#'>Sign Up</a>
            </Message> */}
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default LayoutFormLogin
