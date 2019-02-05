import PropTypes from 'prop-types'
import React from 'react'
import DesktopContainer from './DesktopContainer'
import MobileContainer from './MobileContainer'

const ResponsiveContainer = ({ children }) => {
  // console.log('render ResponsiveContainer width ', window.screen.width)
  return (
    <div>
      {window.screen.width >= 769 && (
        <DesktopContainer>{children}</DesktopContainer>
      )}
      {window.screen.width <= 768 && (
        <MobileContainer>{children}</MobileContainer>
      )}
    </div>
  )
}

ResponsiveContainer.propTypes = {
  children: PropTypes.node
}

export default ResponsiveContainer
