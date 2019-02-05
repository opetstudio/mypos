import React from 'react'
import { Accordion, Icon, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

class ParentDetail extends React.Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
  render () {
    const { activeIndex } = this.state
    const perField = (vk = {}) => {
      return (
        _.transform(
          vk,
          (result, value, key) => {
            result.push({ v: value, k: key })
          },
          []
        ) || []
      ).map(r => (
        <List key={r.k} horizontal>
          <List.Item>
            <List.Content>
              <List.Header>{r.k}</List.Header>
              {r.v}
            </List.Content>
          </List.Item>
        </List>
      ))
    }
    const rows = (this.props.dataArr || []).map(r => {
      return (
        <div key={r.i}>
          <Accordion.Title
            active={activeIndex === r.i}
            index={r.i}
            onClick={this.handleClick}
          >
            <Icon name='dropdown' />
            {r.title}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === r.i}>
            {perField(r.data)}
          </Accordion.Content>
        </div>
      )
    })
    return (
      <Accordion fluid styled>
        {rows}
      </Accordion>
    )
  }
}
export default ParentDetail
