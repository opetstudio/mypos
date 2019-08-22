import React from 'react'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  List,
  Container
} from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

// var bcrypt = require('bcryptjs')
// var salt = bcrypt.genSaltSync(1)

class LayoutUserProfile extends React.Component {
  renderFields () {
    let r = []
    for (var key in this.props.myProfile) {
      if (this.props.myProfile.hasOwnProperty(key)) {
        //    console.log(key, yourobject[key]);
        r.push(
          <List.Item key={key}>
            <List.Icon name='marker' />
            <List.Content>
              <List.Header as='a'>{key}</List.Header>
              <List.Description>{this.props.myProfile[key]}</List.Description>
            </List.Content>
          </List.Item>
        )
      }
    }
    return r
  }
  render () {
    const { isLoggedIn } = this.props

    if (window.localStorage.getItem('isLoggedIn') !== 'true') { return <Redirect to='/login' /> }
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
          <Grid>
            <Grid.Column width={4}>
              <Image src='http://react.semantic-ui.com/images/wireframe/image.png' />
            </Grid.Column>
            <Grid.Column width={11}>
              <List>{(this.renderFields() || []).map(r => r)}</List>
            </Grid.Column>
            {/* <Grid.Column width={11}>
              <Image src='http://react.semantic-ui.com/images/wireframe/paragraph.png' />
            </Grid.Column> */}
          </Grid>
        </Container>
      </div>
    )
  }
}

export default LayoutUserProfile
