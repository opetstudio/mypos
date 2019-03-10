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
                <Grid columns='three' divided>
                  <Grid.Row>
                    <Grid.Column>
                      <Header as='h3'>
                      <Image src={Images.fbicon} style={{ width: '50%' }} />
                      <p>Prisma Ministry Indonesia</p>
                    </Header>
                    </Grid.Column>
                    <Grid.Column>
                    <Header as='h3'>
                      <Image src={Images.igicon} style={{ width: '50%' }} />
                      <p>@prisdac</p>
                    </Header>
                    </Grid.Column>
                    <Grid.Column>
                    <Header as='h3'>
                      <Image src={Images.youtubeicon} style={{ width: '50%' }} />
                      <p>prisdacjkt</p>
                    </Header>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
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
