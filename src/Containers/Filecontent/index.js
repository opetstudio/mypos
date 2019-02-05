import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import FilecontentActions, { FilecontentSelectors } from './redux'
import ButtonAction from '../../Components/ButtonAction'
import LayoutTableData from '../../Components/LayoutTableData'
import { makeData } from '../../Utils/Utils'
import { columns } from './columns'
import LoginActions, { LoginSelectors } from '../Login/redux'
import { FileSelectors } from '../File/redux'

// const Filecontent = LayoutTableData
const column = columns
const defaultPageSize = 10

// const TheComponent = (props) => window.localStorage.getItem('isLoggedIn') === 'true' ? <LayoutTableData {...props} /> : <Redirect to='/login' />
class TheComponent extends Component {
  static propTypes = {
    defaultPageSize: PropTypes.number.isRequired,
    maxModifiedon: PropTypes.number.isRequired,
    column: PropTypes.array.isRequired,
    allDataArr: PropTypes.array.isRequired,
    allIds: PropTypes.array.isRequired,
    byId: PropTypes.object.isRequired,
    entityName: PropTypes.string.isRequired,
    filter: PropTypes.string,
    fetchAll: PropTypes.func.isRequired,
    deleteRow: PropTypes.func.isRequired,
    updateOne: PropTypes.func.isRequired,
    removeOne: PropTypes.func.isRequired,
    updateBatch: PropTypes.func.isRequired,
    fileDetail: PropTypes.object
  }
  static defaultProps = {
    fileDetail: {}
  }
  constructor (props) {
    super(props)
    this.state = {
      defaultPageSize: this.props.defaultPageSize,
      column: this.props.column,
      allDataArr: this.props.allDataArr,
      allIds: this.props.allIds,
      byId: this.props.byId,
      entityName: this.props.entityName,
      filter: this.props.filter,
      fetchAll: this.props.fetchAll,
      deleteRow: this.props.deleteRow,
      updateOne: this.props.updateOne,
      removeOne: this.props.removeOne,
      updateBatch: this.props.updateBatch,
      searchString: '',
      fileDetail: this.props.fileDetail
    }
    this.props.fetchAll({ newerModifiedon: this.props.maxModifiedon })
    this.state.column = this._setupColumn(this.state.column, {
      updateOne: this.state.updateOne
    })
    this.state.allDataArr = this._filterData(
      Immutable.asMutable(this.props.allDataArr, { deep: true }),
      this.props.filter
    )
    this._onSearch = this._onSearch.bind(this)
    this._setupColumn = this._setupColumn.bind(this)
  }
  _setupColumn (column, { updateOne }) {
    if (_.isEmpty(column)) return []
    const columnTable = _.cloneDeep(column) || [{}]
    if (
      (window.location.hash || window.location.pathname).replace('#', '') ===
      `/entity/${this.state.entityName.toLowerCase()}-trash`
    ) {
      columnTable[0].columns.push({
        Header: 'Action',
        id: 'act',
        accessor: o => {
          return (
            <div>
              <ButtonAction
                redoButton
                onClick={() => updateOne({ status: 'publish' }, o._id)}
              />
              <ButtonAction
                deleteButton
                onClick={() => updateOne({ status: 'remove' }, o._id)}
              />
            </div>
          )
        }
      })
    } else {
      columnTable[0].columns.push({
        Header: 'Action',
        id: 'act',
        accessor: o => {
          return (
            <div>
              <ButtonAction
                as={'link'}
                to={`/entity/${this.state.entityName}/update/${o._id}`}
                editButton
                onClick={() => updateOne({ status: 'publish' }, o._id)}
              />
              <ButtonAction
                trashButton
                onClick={() => updateOne({ status: 'delete' }, o._id)}
              />
            </div>
          )
        }
      })
    }
    // console.log('columnTable ', columnTable)
    return columnTable
  }
  _onSearch (searchString) {
    this.setState({ searchString })
  }
  _filterData (dataArr, filter, searchString = '') {
    const filterInArr = filter && (filter || '').split(',')
    let result = []
    if (
      (window.location.hash || window.location.pathname).replace('#', '') ===
      `/entity/${this.state.entityName.toLowerCase()}-trash`
    ) { result = _.filter(dataArr, o => o.status === 'delete') } else if (filterInArr && filterInArr.length > 0) { result = _.filter(dataArr, o => filterInArr.indexOf(o.status) !== -1) } else result = _.filter(dataArr, o => o.status === 'publish')
    if (searchString === '') return result
    return _.filter(result, o => {
      for (var key in o) {
        const targetString = (o[key] || '').toLowerCase()
        if (targetString.includes(searchString.toLowerCase())) {
          return true
        }
      }
      return false
    })
  }
  componentDidUpdate (prevProps, prevState) {
    if (!_.isEqual(prevProps.allDataArr, this.props.allDataArr)) {
      this.setState({
        allDataArr: this._filterData(
          Immutable.asMutable(this.props.allDataArr, { deep: true }),
          this.props.filter
        )
      })
    }
    if (
      !_.isEqual(prevProps.fileDetail, this.props.fileDetail) &&
      !_.isEmpty(this.props.fileDetail)
    ) {
      this.setState({
        fileDetail: Immutable.asMutable(this.props.fileDetail, { deep: true })
      })
    }
    if (
      !_.isEqual(prevProps.allIds, this.props.allIds) &&
      !_.isEmpty(this.props.allIds)
    ) {
      this.setState({
        allIds: Immutable.asMutable(this.props.allIds, { deep: true })
      })
    }
    if (!_.isEqual(prevState.searchString, this.state.searchString)) {
      this.setState({
        allDataArr: this._filterData(
          Immutable.asMutable(this.props.allDataArr, { deep: true }),
          this.props.filter,
          this.state.searchString
        )
      })
    }
    if (
      !_.isEqual(prevProps.column, this.props.column) &&
      !_.isEmpty(this.props.column)
    ) {
      this.setState({
        column: this._setupColumn(this.props.column, {
          updateOne: this.state.updateOne
        })
      })
    }
  }
  render () {
    if (window.localStorage.getItem('isLoggedIn') !== 'true') { return <Redirect to='/login' /> }
    if (!this.props.allDataArr) {
      return (
        <div>
          <span>Loading</span>
        </div>
      )
    }
    return (
      <LayoutTableData
        allIds={this.state.allIds}
        byId={this.state.byId}
        entityName={this.state.entityName}
        allDataArr={this.state.allDataArr}
        column={this.state.column}
        defaultPageSize={this.state.defaultPageSize}
        updateOne={this.state.updateOne}
        removeOne={this.state.removeOne}
        updateBatch={this.state.updateBatch}
        onSearch={this._onSearch}
        breadcrumb={[
          { link: '/', label: 'Home' },
          { link: '/entity/file', label: 'File' },
          { link: null, label: 'File Content' }
        ]}
        parentDetail={[
          { i: 0, title: 'File Detail', data: this.state.fileDetail }
        ]}
        subMenu={[
          {
            label: 'Extract Data File',
            to: '',
            iconName: '',
            isLink: true,
            onClick: () => {}
          },
          {
            label: 'Submit Selected Rows',
            to: '',
            iconName: '',
            isLink: true,
            onClick: () => {}
          },
          {
            label: 'Submit All Rows',
            to: '',
            iconName: '',
            isLink: true,
            onClick: () => {}
          }
        ]}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const params = new URLSearchParams(window.location.search)
  const filter = params.get('filter') // bar
  const fileId = params.get('file') // bar
  const fileDetail = FileSelectors.getDetailById(state.file, fileId)
  // console.log('fileDetail====>', fileDetail)
  const allDataArr = FilecontentSelectors.getAllDataArr(state.filecontent)
  // console.log('params1===>', window.location.search)
  // console.log('params2===>', ownProps.location.search)
  return {
    // ignite boilerplate state list
    defaultPageSize,
    column,
    maxModifiedon: parseInt(
      FilecontentSelectors.getMaxModifiedon(state.filecontent) || 0
    ),
    allDataArr,
    allIds: FilecontentSelectors.getAllIds(state.filecontent),
    byId: FilecontentSelectors.getById(state.filecontent),
    entityName: 'Filecontent',
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    loginToken: LoginSelectors.getToken(state.login),
    filter,
    fileDetail
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ignite boilerplate dispatch list
    fetchAll: query =>
      dispatch(FilecontentActions.filecontentRequestAll(query)),
    deleteRow: query =>
      dispatch(FilecontentActions.filecontentDeleteSuccess(query)),
    updateOne: (data, id) =>
      dispatch(FilecontentActions.filecontentUpdate(data, id)),
    removeOne: (data, id) =>
      dispatch(FilecontentActions.filecontentRemove(data, id)),
    updateBatch: data =>
      dispatch(FilecontentActions.filecontentUpdateBatch(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TheComponent)
