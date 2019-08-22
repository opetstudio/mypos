import React from 'react'
import PropTypes from 'prop-types'
import {
  Dropdown,
  Icon,
  Menu,
  Segment,
  Button,
  Header,
  Modal,
  Label
} from 'semantic-ui-react'
import Moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

class InputDate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    //   startDate: Moment(new Date())
      startDate: Moment(new Date(parseInt(this.props.value || '' + Date.now())))
    }
    console.log('InputDate constructor ' + this.props.value)
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillMount () {
    console.log('InputDate componentWillMount')
  }

  handleChange (date) {
    console.log('handleChange')
    this.setState({
      startDate: date
    })
    //     // console.log(Moment(date).valueOf())
    this.props.onChange(Moment(date).valueOf())
  }
  render () {
    return <DatePicker
      selected={this.state.startDate}
      onChange={this.handleChange}
      showTimeSelect
      timeFormat='HH:mm'
      timeIntervals={5}
      dateFormat='MMMM D, YYYY hh:mm a'
      timeCaption='time'
    />
    // return (<input type='text' name={this.props.name} placeholder={'xxxxx' + this.props.placeholder} value={this.props.value} onChange={(o) => this.this.props.handleChange(o, this.props.name)} />)
  }
}
export default InputDate
