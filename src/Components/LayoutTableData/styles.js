const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '1em',
  marginTop: '4em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease'
}

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
}

const overlayStyle = {
  float: 'left',
  margin: '0em 3em 1em 0em'
}

const fixedOverlayStyle = {
  ...overlayStyle,
  position: 'fixed',
  top: '80px',
  zIndex: 10
}

const overlayMenuStyle = {
  position: 'relative',
  left: 0,
  transition: 'left 0.5s ease'
}

const fixedOverlayMenuStyle = {
  ...overlayMenuStyle,
  left: '0px'
  //   left: '800px'
}
export default {
  menuStyle,
  fixedMenuStyle,
  overlayStyle,
  fixedOverlayStyle,
  overlayMenuStyle,
  fixedOverlayMenuStyle
}
