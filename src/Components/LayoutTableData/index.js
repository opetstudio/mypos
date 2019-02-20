import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import Immutable from 'seamless-immutable'
import {
  Container,
  Image,
  Button,
  Menu,
  Dropdown,
  Grid,
  Icon,
  Modal,
  Header,
  Input,
  Responsive,
  Segment,
  GridColumn
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ReactTable from 'react-table'
import checkboxHOC from 'react-table/lib/hoc/selectTable'
import Chance from 'chance'
import { pick } from 'ramda'
import BreadcrumbCustom from '../BreadcrumbCustom'
import ParentDetail from '../ParentDetail'
// import styles from './styles'
import { Images } from '../../Themes'

const CheckboxTable = checkboxHOC(ReactTable)
const chance = new Chance()

function getData (theData, column, filter, entityName) {
  const filterInArr = filter && (filter || '').split(',')
  const data = theData.map(item => {
    // using chancejs to generate guid
    // shortid is probably better but seems to have performance issues
    // on codesandbox.io
    // const _id = chance.guid()
    return {
      // _id,
      ...item
    }
  })
  // console.log('====>>>filterInArr', filterInArr)
  if (
    (window.location.hash || window.location.pathname).replace('#', '') ===
    `/entity/${entityName.toLowerCase()}-trash`
  ) { return _.filter(data, o => o.status === 'delete') }
  if (filterInArr && filterInArr.length > 0) { return _.filter(data, o => filterInArr.indexOf(o.status) !== -1) }
  return _.filter(data, o => o.status !== 'delete')
  // return data.asMutable()
}

function getColumns (data) {
  const columns = []
  const sample = data[0]
  Object.keys(sample).forEach(key => {
    if (key !== '_id' && key !== 'password') {
      columns.push({
        accessor: key,
        Header: key
      })
    }
  })
  return columns
}

export default class LayoutTableData extends Component {
  static propTypes = {
    parentDetail: PropTypes.array,
    breadcrumb: PropTypes.array
  }
  static defaultProps = {
    parentDetail: []
  }
  constructor (props) {
    super(props)
    this.deleteDialog = this.deleteDialog.bind(this)
    this.setupDataSource = this.setupDataSource.bind(this)

    // console.log('componentWillMount===>', this.props)
    // const data = getData(this.props.allDataArr, this.props.column, this.props.filter, this.props.entityName)
    // const data = this.setupDataSource(this.props.allDataArr, this.props.column, this.props.filter, this.props.entityName)
    // console.log('LayoutFormData data', data)
    // const columns = this.props.column || getColumns(data)
    const entityName = (this.props.entityName || '').toLowerCase()
    const pathname = (window.location.hash || window.location.pathname).replace('#', '')
    this.state = {
      allIds: this.props.allIds,
      byId: this.props.byId,
      // allDataArr: data,
      allDataArr: this.props.allDataArr,
      columns: this.props.column,
      // column: this.props.column,
      defaultPageSize: this.props.defaultPageSize,
      selection: [],
      selectAll: false,
      entityName,
      showLogoutDialog: false,
      selectedOneId: '',
      modalMessage:
        'Apakah anda yakin untuk hapus data? Klik Yes untuk hapus, Klik No untuk kembali ke Dashboard',
      modalYesFunc: () => {},
      searchString: '',
      parentDetail: Immutable.asMutable(this.props.parentDetail, {
        deep: true
      }),
      breadcrumb: this.props.breadcrumb,
      pathname: pathname
    }
  }
  setupDataSource (theData, column, filter, entityName) {
    const filterInArr = filter && (filter || '').split(',')
    const data = theData.map(item => {
      // using chancejs to generate guid
      // shortid is probably better but seems to have performance issues
      // on codesandbox.io
      // const _id = chance.guid()
      return {
        // _id,
        ...item
      }
    })
    // console.log('====>>>filterInArr', filterInArr)
    if (
      (window.location.hash || window.location.pathname).replace('#', '') ===
      `/entity/${entityName.toLowerCase()}-trash`
    ) { return _.filter(data, o => o.status === 'delete') }
    if (filterInArr && filterInArr.length > 0) { return _.filter(data, o => filterInArr.indexOf(o.status) !== -1) }
    return _.filter(data, o => o.status !== 'delete')
    // return data.asMutable()
  }
  componentDidUpdate (prevProps, prevState) {
    if (!_.isEqual(prevProps.allDataArr, this.props.allDataArr)) {
      this.setState({
        allDataArr: Immutable.asMutable(this.props.allDataArr, { deep: true })
      })
    }
    if (!_.isEqual(prevProps.allIds, this.props.allIds)) {
      this.setState({
        allIds: Immutable.asMutable(this.props.allIds, { deep: true })
      })
    }
    if (!_.isEqual(prevProps.column, this.props.column)) {
      this.setState({
        columns: Immutable.asMutable(this.props.column, { deep: true })
      })
    }
    if (
      !_.isEqual(prevProps.parentDetail, this.props.parentDetail) &&
      !_.isEmpty(this.props.parentDetail)
    ) {
      this.setState({
        parentDetail: Immutable.asMutable(this.props.parentDetail, {
          deep: true
        })
      })
    }
    if (
      !_.isEqual(prevProps.breadcrumb, this.props.breadcrumb) &&
      !_.isEmpty(this.props.breadcrumb)
    ) {
      this.setState({
        breadcrumb: Immutable.asMutable(this.props.breadcrumb, { deep: true })
      })
    }
  }
  // componentWillReceiveProps (nextProps) {
  //   // console.log('[LayoutFormData.componentWillReceiveProps] nextProps=', nextProps)
  //   this.setState({
  //     allIds: nextProps.allIds,
  //     byId: nextProps.byId,
  //     allDataArr: getData(nextProps.allDataArr, nextProps.column, nextProps.filter, nextProps.entityName),
  //     columns: nextProps.column,
  //     defaultPageSize: nextProps.defaultPageSize
  //   })
  // }
  toggleSelection = (keys, shift, row) => {
    console.log('key===>', keys)
    let key = (keys.split('-') || ['', ''])[1]
    if (key === '') return
    /*
      Implementation of how to manage the selection state is up to the developer.
      This implementation uses an array stored in the component state.
      Other implementations could use object keys, a Javascript Set, or Redux... etc.
    */
    // start off with the existing state
    let selection = [...this.state.selection]
    const keyIndex = selection.indexOf(key)
    // check to see if the key exists
    if (keyIndex >= 0) {
      // it does exist so we will remove it using destructing
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ]
    } else {
      // it does not exist so add it
      selection.push(key)
    }
    // console.log('toggleSelection==>selection=', selection)
    // update the state
    this.setState({ selection })
  }
  toggleAll = () => {
    /*
      'toggleAll' is a tricky concept with any filterable table
      do you just select ALL the records that are in your data?
      OR
      do you only select ALL the records that are in the current filtered data?

      The latter makes more sense because 'selection' is a visual thing for the user.
      This is especially true if you are going to implement a set of external functions
      that act on the selected information (you would not want to DELETE the wrong thing!).

      So, to that end, access to the internals of ReactTable are required to get what is
      currently visible in the table (either on the current page or any other page).

      The HOC provides a method call 'getWrappedInstance' to get a ref to the wrapped
      ReactTable and then get the internal state and the 'sortedData'.
      That can then be iterrated to get all the currently visible records and set
      the selection state.
    */
    const selectAll = !this.state.selectAll
    const selection = []
    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.checkboxTable.getWrappedInstance()
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData
      // we just push all the IDs onto the selection array
      currentRecords.forEach(item => {
        selection.push(item._original._id)
      })
    }
    this.setState({ selectAll, selection })
  }

  isSelected = key => {
    /*
      Instead of passing our external selection state we provide an 'isSelected'
      callback and detect the selection state ourselves. This allows any implementation
      for selection (either an array, object keys, or even a Javascript Set object).
    */
    return this.state.selection.includes(key)
  }

  logSelection = () => {
    // console.log('selection:', this.state.selection)
  }
  deleteDialog (isShow, _id, act) {
    const newState = {}
    if (act === 'trash') {
      newState.modalMessage =
        'Remove to the trash? Klik Yes untuk hapus, Klik No untuk kembali ke Dashboard'
      newState.modalYesFunc = () => {
        this.props.updateOne({ status: 'delete' }, _id)
        this.deleteDialog(false)
      }
    }
    if (act === 'remove') {
      newState.modalMessage =
        'Remove forever (cannot be undo)? Klik Yes untuk hapus, Klik No untuk kembali ke Dashboard'
      newState.modalYesFunc = () => {
        this.props.removeOne({ status: 'remove' }, _id)
        this.deleteDialog(false)
      }
    }
    if (act === 'remove-batch') {
      newState.modalMessage =
        'Batch remove to the trash? Klik Yes untuk hapus, Klik No untuk kembali ke Dashboard'
      newState.modalYesFunc = () => {
        this.props.updateBatch({ status: 'delete', ids: _id })
        this.deleteDialog(false)
      }
    }
    newState.showLogoutDialog = isShow
    newState.selectedOneId = _id
    this.setState(newState)
  }

  render () {
    const { toggleSelection, toggleAll, isSelected, logSelection } = this
    const { allDataArr, columns, selectAll, parentDetail } = this.state
    const ModalBasic = () => (
      <Modal
        open={this.state.showLogoutDialog}
        onClose={() => this.setState({ showLogoutDialog: false })}
        basic
        size='small'
      >
        <Header icon='archive' content='Delete Data Confirmation' />
        <Modal.Content>
          <p>{this.state.modalMessage}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            color='red'
            inverted
            onClick={() => this.deleteDialog(false)}
          >
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted onClick={this.state.modalYesFunc}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    )
    // const colArr = []
    // columns.forEach(colGroup => (colGroup.colGroup || []).forEach(col => {
    //   colArr.push(col.id)
    // }))
    // const colArr = columns.map(colGroup => (colGroup.columns.map(col => col.id)))
    // colArr.push('_id')
    // const data = allDataArr
    // const data = allDataArr.map(r => {
    // console.log('r===>', r)
    // return {
    //   title: r['title']
    // }
    // return pick(colArr, r)
    // })
    // const dataMutable = data
    // const dataMutable = data.asMutable()
    // console.log('LayoutTableData.render allDataArr=', allDataArr)
    // console.log('LayoutTableData.render colArr=', colArr)
    // console.log('LayoutTableData.render data=', data)
    // console.log('LayoutTableData.render dataMutable=', dataMutable)
    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: 'checkbox',
      getTrProps: (s, r) => {
        if (!r) return {}
        // console.log('=====>>>>>>selected selection', this.state.selection)
        // console.log('=====>>>>>>selected s', s)
        // console.log('=====>>>>>>selected r', r)
        // someone asked for an example of a background color change
        // here it is...
        const selected = this.isSelected(r.original._id)
        return {
          style: {
            backgroundColor: selected ? 'lightgreen' : 'inherit'
            // color: selected ? 'white' : 'inherit',
          }
        }
      }
    }
    const MenuButtons = row => {
      // row.original._id
      // if (!row) return null
      // console.log('row======>>>>', row.original)
      // if (row.original.status === 'delete' || row.original.status === null || row.original.status === undefined) {
      //   this.props.deleteRow({listId: [row.original._id, undefined]})
      // }
      if (
        (window.location.hash || window.location.pathname).replace('#', '') ===
        `/entity/${this.props.entityName.toLowerCase()}-trash`
      ) {
        return (
          <div>
            <Menu secondary>
              <Menu.Item
                onClick={() =>
                  this.props.updateOne({ status: 'publish' }, row.original._id)
                }
              >
                <Icon name='redo' />
              </Menu.Item>
              {/* <Menu.Item
              as={Link}
              to={`/entity/${this.state.entityName}/view/${row.original._id}`}
            >
              <Icon name='play' />
            </Menu.Item> */}
              <Menu.Item
                onClick={() =>
                  this.deleteDialog(true, row.original._id, 'remove')
                }
              >
                <Icon name='remove circle' />
              </Menu.Item>
            </Menu>
          </div>
        )
      }
      return (
        <div>
          <Menu secondary>
            <Menu.Item
              as={Link}
              to={`/entity/${this.state.entityName}/update/${row.original._id}`}
            >
              <Icon name='edit' />
            </Menu.Item>
            {/* <Menu.Item
            as={Link}
            to={`/entity/${this.state.entityName}/view/${row.original._id}`}
          >
            <Icon name='play' />
          </Menu.Item> */}
            <Menu.Item
              onClick={() => this.deleteDialog(true, row.original._id, 'trash')}
            >
              <Icon name='trash' />
            </Menu.Item>
          </Menu>
        </div>
      )
    }
    const listSubMenu = (this.props.subMenu || []).map(r =>
      r.isLink ? (
        <Dropdown.Item key={r.label} as={Link} to={r.to}>
          {' '}
          <Icon name={r.iconName} size='small' /> {r.label}
        </Dropdown.Item>
      ) : (
        <Dropdown.Item key={r.label} onClick={() => {}}>
          {' '}
          <Icon name={r.iconName} size='small' /> {r.label}
        </Dropdown.Item>
      )
    )
    const dropdownItems = () => (
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to={`/entity/${this.state.entityName}/create`}>
          {' '}
          <Icon name='file outline' size='small' /> Create New
        </Dropdown.Item>
        <Dropdown.Item as={Link} to={`/entity/${this.state.entityName}`}>
          {' '}
          <Icon name='database' size='small' /> All Data
        </Dropdown.Item>
        <Dropdown.Item as={Link} to={`/entity/${this.state.entityName}-trash`}>
          <Icon name='trash' size='small' /> Trash
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() =>
            this.deleteDialog(true, this.state.selection, 'remove-batch')
          }
        >
          {' '}
          <Icon name='remove circle' size='small' /> Delete selected
        </Dropdown.Item>
        {this.props.subMenu && listSubMenu}
      </Dropdown.Menu>
    )
    return (
      <div>
        <div>{ModalBasic()}</div>
        <Container>
          <Grid container style={{ padding: '1em 0em' }}>
            {this.state.breadcrumb && (
              <Grid.Row>
                <Grid.Column>
                  <BreadcrumbCustom breadcrumb={this.state.breadcrumb} />
                </Grid.Column>
              </Grid.Row>
            )}
            {(parentDetail && parentDetail.length > 0) && (
              <Grid.Row>
                <Grid.Column>
                  <ParentDetail dataArr={parentDetail} />
                </Grid.Column>
              </Grid.Row>
            )}
            <Grid.Row>
              <Grid.Column>
                <Menu attached='top'>
                  <Menu.Menu position='left'>
                    {/* <Menu.Item> */}
                    <div className='ui left aligned category search item'>
                      <div className='ui transparent icon input'>
                        <Input
                          icon='search'
                          placeholder='Search...'
                          onChange={event =>
                            this.props.onSearch(event.target.value)
                          }
                        />
                      </div>
                    </div>
                    
                    {/* </Menu.Item> */}
                    {/* <Menu.Item>
                      <div><span>{this.props.entityName}</span></div>
                    </Menu.Item> */}
                  </Menu.Menu>
                  <Menu.Menu position='right'>
                    <Menu.Item header>{this.state.pathname}</Menu.Item>
                    <Responsive
                      icon='bars'
                      as={Dropdown}
                      minWidth={769}
                      pointing='right'
                      className='link item'
                      text='Menu'
                    >
                      {/* <Dropdown icon='bars' text={Responsive.onlyMobile ? 'Menu' : ''} pointing='right' className='link item'> */}
                      {dropdownItems()}
                      {/* </Dropdown> */}
                    </Responsive>
                    <Responsive
                      icon='bars'
                      as={Dropdown}
                      maxWidth={768}
                      pointing='right'
                      className='link item'
                    >
                      {/* <Dropdown icon='bars' text={Responsive.onlyMobile ? 'Menu' : ''} pointing='right' className='link item'> */}
                      {dropdownItems()}
                      {/* </Dropdown> */}
                    </Responsive>
                  </Menu.Menu>
                </Menu>
                <Segment attached='bottom'>
                  <CheckboxTable
                    // SubComponent={row => {
                    //   return (
                    //     <div>
                    //       {MenuButtons(row)}
                    //     </div>
                    //   )
                    // }}
                    ref={r => (this.checkboxTable = r)}
                    data={this.state.allDataArr}
                    columns={this.state.columns}
                    defaultPageSize={this.state.defaultPageSize}
                    className='-striped -highlight'
                    {...checkboxProps}
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
  }
}
