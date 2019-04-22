import PropTypes from 'prop-types'
import React from 'react'
import DesktopContainer from './DesktopContainer'
import MobileContainer from './MobileContainer'
// import MaterialuiContainer from './MaterialuiContainer'

const ResponsiveContainer = ({ children }) => {
  console.log('render ResponsiveContainer width ', window.innerWidth)
  return (
    <div>
      {/* {window.innerWidth >= 769 && ( */}
      <DesktopContainer>{children}</DesktopContainer>
      {/* )} */}
      {/* {window.innerWidth <= 768 && ( */}
      <MobileContainer>{children}</MobileContainer>
      {/* // <MaterialuiContainer /> */}
      {/* )} */}
    </div>
  )
}

ResponsiveContainer.propTypes = {
  children: PropTypes.node
}

export default ResponsiveContainer
