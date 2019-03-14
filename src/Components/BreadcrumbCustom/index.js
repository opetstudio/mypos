import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import Immutable from 'seamless-immutable'
import _ from 'lodash'

class BreadcrumbCustom extends React.Component {
  static propTypes = {
    breadcrumb: PropTypes.array
  }
  static defaultProps = {}
  constructor (props) {
    super(props)
    this.state = {
      breadcrumb: this.props.breadcrumb
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (!_.isEqual(prevProps.breadcrumb, this.props.breadcrumb)) {
      this.setState({
        breadcrumb: Immutable.asMutable(this.props.breadcrumb, { deep: true })
      })
    }
  }
  render () {
    var i = 1
    const bc = (this.state.breadcrumb || [])
      .map(r =>
        r.link ? (
          <Breadcrumb.Section
            key={r.key || r.label}
            as={Link}
            to={r.link}
            // onClick={(e, o) => { console.log('e==>', e); console.log('o==>', o) }}
          >
            {r.label}
          </Breadcrumb.Section>
        ) : (
          <Breadcrumb.Section
            key={r.key || r.label}
            // onClick={(e, o) => { console.log('e==>', e); console.log('o==>', o) }}
          >
            {r.label}
          </Breadcrumb.Section>
        )
      )
      .reduce((accu, elem) => {
        return accu === null
          ? [elem]
          : [
            ...accu,
            <Breadcrumb.Divider key={++i} icon='right chevron' />,
            elem
          ]
      }, null)
    return <Breadcrumb size='big'>{bc}</Breadcrumb>
  }
}
export default BreadcrumbCustom
