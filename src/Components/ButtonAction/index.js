import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class ButtonAction extends React.Component {
  render () {
    const as = this.props.as === 'link' ? Link : 'button'
    if (this.props.viewButton) {
      return (
        <Button
          size='mini'
          as={as}
          icon
          onClick={this.props.onClick}
          to={this.props.to}
        >
          <Icon name='eye' />
        </Button>
      )
    }
    if (this.props.trashButton) {
      return (
        <Button
          size='mini'
          as={as}
          icon
          onClick={this.props.onClick}
          to={this.props.to}
        >
          <Icon name='trash' />
        </Button>
      )
    }
    if (this.props.redoButton) {
      return (
        <Button
          size='mini'
          as={as}
          icon
          onClick={this.props.onClick}
          to={this.props.to}
        >
          <Icon name='redo' />
        </Button>
      )
    }
    if (this.props.editButton) {
      return (
        <Button
          size='mini'
          as={as}
          icon
          onClick={this.props.onClick}
          to={this.props.to}
        >
          <Icon name='edit' />
        </Button>
      )
    }
    if (this.props.evaluatedButton) {
      return (
        <Button
          size='mini'
          as={as}
          icon
          onClick={this.props.onClick}
          to={this.props.to}
        >
          <Icon name='checkmark' />
        </Button>
      )
    }
    if (this.props.deleteButton) {
      return (
        <Button
          size='mini'
          as={as}
          onClick={this.props.onClick}
          to={this.props.to}
        >
          {this.props.buttonLabel}
          <Icon name='delete' />
        </Button>
      )
    }
    return null
  }
}
export default ButtonAction
