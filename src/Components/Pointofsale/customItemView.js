import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  // Icon,
  Image,
  // List,
  // Menu,
  // Responsive,
  Segment,
  Message,
  Checkbox, Form, Menu
  // Sidebar,
  // Visibility
} from 'semantic-ui-react'

class CustomItemView extends Component {
  render () {
    return (
      <div>
        <Grid doubling columns={5}>
          <Grid.Column>
            <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
          </Grid.Column>
          <Grid.Column>
            <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
          </Grid.Column>
          <Grid.Column>
            <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
          </Grid.Column>
          <Grid.Column>
            <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
          </Grid.Column>
          <Grid.Column>
            <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
export default CustomItemView
