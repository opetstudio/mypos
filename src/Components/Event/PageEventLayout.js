import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import {
  Grid,
  Icon,
  Header,
  Image,
  List,
  Button,
  Container,
  Card,
  Item,
  Divider
} from 'semantic-ui-react'
import {Helmet} from 'react-helmet'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
import BreadcrumbCustom from '../BreadcrumbCustom'
import Moment from 'moment'

class PageEventLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItemBottomMenu: '1',
      breadcrumb: Immutable.asMutable(this.props.breadcrumb, { deep: true })
    }
  }
  componentWillMount () {
    console.log('componentWillMounts')
    this.setState({
      username: this.props.username
    })
  }
  componentDidUpdate (prevProps, prevState) {
    if (!_.isEqual(prevProps.breadcrumb, this.props.breadcrumb)) {
      this.setState({
        breadcrumb: Immutable.asMutable(this.props.breadcrumb, { deep: true })
      })
    }
  }
  componentDidMount () {
  }
  render () {
    const upcomingEvent = this.props.allNextEventArr[0]
    return (
      <div>
        <Helmet>
          <title>Events - Prisma SDA Church</title>
        </Helmet>
        <Container style={{minHeight: window.innerHeight - 75}}>
          <Grid container style={{ padding: '1em 0em' }} stackable>
            {this.state.breadcrumb && (
              <Grid.Row>
                <Grid.Column>
                  <BreadcrumbCustom breadcrumb={this.state.breadcrumb} />
                </Grid.Column>
              </Grid.Row>
            )}
            <Grid.Row>
              <Grid.Column width={6}>
                <Header as='h3' style={{ fontSize: '2em' }}>Upcoming Event</Header>
                {/* <Image bordered rounded style={{width: '100%'}} src='https://react.semantic-ui.com/images/wireframe/white-image.png' /> */}
                {upcomingEvent && <Card
                  onClick={() => this.props.history.push(`/event/${upcomingEvent.slug}`)}
                  style={{width: '100%'}}
                  image={upcomingEvent.event_img}
                  header={upcomingEvent.event_title}
                  description={upcomingEvent.event_desc}
                  extra={(<List>
                    <List.Item icon='calendar alternate' content={Moment(parseInt(upcomingEvent.event_date || '0')).format('LLL').toString()} />
                    <List.Item icon='marker' content={upcomingEvent.event_address} />
                    <List.Item icon='building' content={upcomingEvent.event_vanue} />
                  </List>)}
                />}
              </Grid.Column>
              <Grid.Column width={10}>
                <Header as='h3' style={{ fontSize: '2em' }}>Next Events</Header>
                <Item.Group divided>
                  {
                    (this.props.allNextEventArr).map((r, i) => {
                      return (
                        <Item key={`event${i}`} style={{ backgroundColor: '#cdcdcd', color: '#fff', marginTop: (i === 0) ? '0px' : '10px', padding: '10px' }} color={'gray'} onClick={() => this.props.history.push(`/event/${r.slug}`)} >
                          {r.event_img && <Item.Image src={r.event_img} style={{padding: '5px'}} />}
                          <Item.Content style={{paddingTop: '10px'}}>
                            <Item.Header as='a'>{r.event_title}</Item.Header>
                            {/* <Item.Meta>
                              <span className='cinema'>Union Square 14</span>
                            </Item.Meta> */}
                            <Item.Description style={{paddingBottom: '10px'}}>
                              {r.event_desc}
                              <div style={{ height: '5px', 'width': '100%' }} />
                              <List>
                                <List.Item icon='calendar alternate' content={Moment(parseInt(r.event_date || '0')).format('LLL').toString()} />
                                <List.Item icon='marker' content={r.event_address} />
                                <List.Item icon='building' content={r.event_vanue} />
                              </List>
                            </Item.Description>
                            {/* <Item.Extra>
                              <Label>IMAX</Label>
                              <Label icon='globe' content='Additional Languages' />
                            </Item.Extra> */}
                          </Item.Content>
                        </Item>
                      )
                    })
                  }
                </Item.Group>
                <Header as='h3' style={{ fontSize: '2em' }}>Prev Events</Header>
                <Item.Group divided>
                  {
                    (this.props.allPrevEventArr).map((r, i) => {
                      return (
                        <Item key={`event${i}`} style={{ backgroundColor: '#cdcdcd', color: '#fff', marginTop: (i === 0) ? '0px' : '10px', padding: '10px' }} color={'gray'} onClick={() => this.props.history.push(`/event/${r.slug}`)} >
                          {r.event_img && <Item.Image src={r.event_img} style={{padding: '5px'}} />}
                          <Item.Content style={{paddingTop: '10px'}}>
                            <Item.Header as='a'>{r.event_title}</Item.Header>
                            {/* <Item.Meta>
                                  <span className='cinema'>Union Square 14</span>
                                </Item.Meta> */}
                            <Item.Description style={{paddingBottom: '10px'}}>
                              {r.event_desc}
                              <div style={{ height: '5px', 'width': '100%' }} />
                              <List>
                                <List.Item icon='calendar alternate' content={Moment(parseInt(r.event_date || '0')).format('LLL').toString()} />
                                <List.Item icon='marker' content={r.event_address} />
                                <List.Item icon='building' content={r.event_vanue} />
                              </List>
                            </Item.Description>
                            {/* <Item.Extra>
                                  <Label>IMAX</Label>
                                  <Label icon='globe' content='Additional Languages' />
                                </Item.Extra> */}
                          </Item.Content>
                        </Item>
                      )
                    })
                  }
                </Item.Group>
              </Grid.Column>
            </Grid.Row>
            {/* <Grid.Row>
              <Grid.Column textAlign='center'>
                <Button size='huge'>Check Them Out</Button>
              </Grid.Column>
            </Grid.Row> */}
          </Grid>
        </Container>
        {/* <Segment style={{ padding: '2em 0em' }} vertical>
            <Container text>
              <ImageGallery items={images} showIndex showBullets thumbnailPosition='left' />
            </Container>
          </Segment> */}
        {this.props.footer}
      </div>
    )
  }
}

export default PageEventLayout
