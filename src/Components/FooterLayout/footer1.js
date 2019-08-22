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

class Footer1Layout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItemBottomMenu: '1'
    }
  }
  componentWillMount () {
    // console.log('componentWillMounts')
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
        <Segment inverted vertical style={{ padding: '0em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column textAlign='center'>
                  <p>Copyright © 2019 Prisma SDA Church</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>)
    // return (
    //   <div>
    //     <Segment inverted vertical style={{ padding: '5em 0em' }}>
    //       <Container>
    //         <Grid divided inverted stackable>
    //           <Grid.Row>
    //             <Grid.Column width={3}>
    //               <Header inverted as='h4' content='About' />
    //               <List link inverted>
    //                 <List.Item as='a'>Sitemap</List.Item>
    //                 <List.Item as='a'>Contact Us</List.Item>
    //                 <List.Item as='a'>Religious Ceremonies</List.Item>
    //                 <List.Item as='a'>Gazebo Plans</List.Item>
    //               </List>
    //             </Grid.Column>
    //             <Grid.Column width={3}>
    //               <Header inverted as='h4' content='Services' />
    //               <List link inverted>
    //                 <List.Item as='a'>Banana Pre-Order</List.Item>
    //                 <List.Item as='a'>DNA FAQ</List.Item>
    //                 <List.Item as='a'>How To Access</List.Item>
    //                 <List.Item as='a'>Favorite X-Men</List.Item>
    //               </List>
    //             </Grid.Column>
    //             <Grid.Column width={7}>
    //               <Header as='h4' inverted>
    //             Footer Header
    //               </Header>
    //               <p>
    //             Extra space for a call to action inside the footer that could help re-engage users.
    //               </p>
    //             </Grid.Column>
    //           </Grid.Row>
    //         </Grid>
    //       </Container>
    //     </Segment>
    //   </div>
    // )
  }
}

export default Footer1Layout
