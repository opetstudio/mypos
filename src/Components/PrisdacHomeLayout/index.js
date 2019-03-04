import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {
  Grid,
  Segment
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
        <Segment style={{ padding: '1em 0em' }} vertical>
          <Grid container columns={2} stackable>
            <Grid.Column width={10}>
              <div>
                <span>left</span>
              </div>
            </Grid.Column>
            <Grid.Column width={6}>
              <div>
                <span>right</span>
              </div>
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    )
  }
}

export default PrisdacHomeLayout
