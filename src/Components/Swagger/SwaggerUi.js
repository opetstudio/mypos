import React, { Component } from 'react'
import SwaggerUi, {presets} from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'
// import PropTypes from 'prop-types'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Menu,
  Dropdown,
  // List,
  // Menu,
  // Responsive,
  Segment
  // Sidebar,
  // Visibility
} from 'semantic-ui-react'
import _ from 'lodash'
// import { Link } from 'react-router-dom'
class SwaggerUiLayout extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.MenuExampleDropdownItem = this.MenuExampleDropdownItem.bind(this)
    this.setSwaggerUi = this.setSwaggerUi.bind(this)
    this.state = {
      username: this.props.username,
      appName: this.props.appName,
      mapServer: {
        'SetLimitTrxCustomerAPI': '/SetLimitTrxCustomerAPI/openapi/openapi.json',
        'CardRemoveAPI': '/CardRemoveAPI/openapi/openapi.json'
      }
    }
  }
  componentWillMount () {
    this.setState({
      username: this.props.username
    })
    this.props.getUserProfile({ username: this.props.username })
  }
  componentDidUpdate (prevProps, prevState) {
    console.log('componentDidUpdate')
    if (!_.isEqual(prevProps.username, this.props.username)) {
      this.props.getUserProfile({ username: this.props.username })
      this.setState({
        username: this.props.username
      })
    }
    if (!_.isEqual(prevProps.appName, this.props.appName)) {
      this.setState({
        appName: this.props.appName
      })
    }
    // if (!_.isEqual(prevState.appName, this.state.appName)) {
    //   this.setState({
    //     appName: this.state.appName
    //   })
    // }
  }
  setSwaggerUi (appName) {
    SwaggerUi({
      dom_id: '#swaggerContainer',
      url: this.state.mapServer[appName],
      presets: [presets.apis]
    })
  }
  componentDidMount () {
    this.setSwaggerUi(this.state.appName)
  }
  handleChange (e, { value }) {
    console.log('handleChange ', value)
    this.setSwaggerUi(value)
  }
  MenuExampleDropdownItem () {
    // const addressDefinitions = {
    //   state: [
    //     {}
    //   ]
    // }
    // const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
    //   key: addressDefinitions.state_abbr[index],
    //   text: state,
    //   value: addressDefinitions.state_abbr[index],
    // }))
    const opt = [
      { key: 1, text: 'CardRemoveAPI', value: 'CardRemoveAPI' },
      { key: 2, text: 'SetLimitTrxCustomerAPI', value: 'SetLimitTrxCustomerAPI' }
    ]

    return (
      <Dropdown placeholder='Choos App Name' defaultValue={this.state.appName} search selection options={opt} onChange={this.handleChange} />
    )
  }
  render () {
    console.log('renderrrrrr')
    return (
      <div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column>
                {this.MenuExampleDropdownItem()}
                <div id='swaggerContainer' />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment inverted vertical style={{ padding: '5em 0em' }}>
          {/* <FooterContainer /> */}
        </Segment>
      </div>
    )
  }
}

export default SwaggerUiLayout
