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

class PrisdacHomeLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItemBottomMenu: '1'
    }
  }
  componentWillMount () {
    console.log('componentWillMounts')
    this.setState({
      username: this.props.username
    })
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      accessToken: nextProps.username
    })
  }
  componentDidMount () {
  }
  render () {
    return (
      <div>
        {/* <Segment>
          {this.props.carousel}
        </Segment> */}
        <Segment style={{ padding: '0em' }} vertical>
          <Grid celled='internally' columns='equal' stackable>
            <Grid.Row textAlign='center'>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>
              "What a Company"
                </Header>
                <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>
              "I shouldn't have gone with their competitor."
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  <Image avatar src='https://react.semantic-ui.com/images/avatar/large/nan.jpg' />
                  <b>Nan</b> Chief Fun Officer Acme Toys
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        {this.props.footer}
      </div>
    )
  }
}

export default PrisdacHomeLayout
