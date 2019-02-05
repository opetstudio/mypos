import React, { Component } from 'react'
import _ from 'lodash'
import { Container, Image } from 'semantic-ui-react'
// import styles from './styles'
import { Images } from '../../Themes'

const LeftImage = () => (
  <Image
    floated='left'
    size='medium'
    src={Images.squareImage}
    style={{ margin: '2em 2em 2em -4em' }}
  />
)

// const RightImage = () => (
//   <Image
//     floated='right'
//     size='medium'
//     src='/images/wireframe/square-image.png'
//     style={{ margin: '2em -4em 2em 2em' }}
//   />
// )

// const Paragraph = () => (
//   <p>
//     {[
//       'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ',
//       'tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas ',
//       'semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ',
//       'ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean ',
//       'fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. ',
//       'Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor ',
//       'neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, ',
//       'accumsan porttitor, facilisis luctus, metus'
//     ].join('')}
//   </p>
// )
const paragraph =
  'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum '

export default class LayoutContentDetail extends Component {
  state = {
    menuFixed: false,
    overlayFixed: false,
    paragraph: this.props.paragraph || paragraph
  }
  handleOverlayRef = c => {
    const { overlayRect } = this.state

    if (!overlayRect) {
      this.setState({
        overlayRect: _.pick(c.getBoundingClientRect(), 'height', 'width')
      })
    }
  }
  stickOverlay = () => this.setState({ overlayFixed: true })

  stickTopMenu = () => this.setState({ menuFixed: true })

  unStickOverlay = () => this.setState({ overlayFixed: false })

  unStickTopMenu = () => this.setState({ menuFixed: false })
  render () {
    // console.log('=====>props', this.props)
    // console.log('=====>props.route', this.props.hasOwnProperty())
    // const { menuFixed, overlayFixed, overlayRect } = this.state
    return (
      <div>
        <style>{`
          html, body {
            background: #fff;
          }
        `}</style>
        <Container text>
          {/* {_.times(3, i => <Paragraph key={i} />)} */}
          <LeftImage />
          <p>{this.state.paragraph}</p>
          {/* <Paragraph /> */}
          {/* {_.times(2, i => <Paragraph key={i} />)} */}
          {/* <Visibility
            offset={80}
            once={false}
            onTopPassed={this.stickOverlay}
            onTopVisible={this.unStickOverlay}
            style={overlayFixed ? { ...styles.overlayStyle, ...overlayRect } : {}}
          />
          <div ref={this.handleOverlayRef} style={overlayFixed ? styles.fixedOverlayStyle : styles.overlayStyle}>
            <Menu
              icon='labeled'
              style={overlayFixed ? styles.fixedOverlayMenuStyle : styles.overlayMenuStyle}
              vertical
            >
              <Menu.Item>
                <Icon name='twitter' />
                Twitter
              </Menu.Item>

              <Menu.Item>
                <Icon name='facebook' />
                Share
              </Menu.Item>

              <Menu.Item>
                <Icon name='mail' />
                Email
              </Menu.Item>
            </Menu>
          </div> */}
          {/* {_.times(3, i => <Paragraph key={i} />)} */}
          {/* <LeftImage />
          <Paragraph />
          <RightImage />

          {_.times(4, i => <Paragraph key={i} />)}
          <LeftImage />

          <Paragraph />
          <RightImage />

          {_.times(2, i => <Paragraph key={i} />)} */}
        </Container>
      </div>
    )
  }
}
