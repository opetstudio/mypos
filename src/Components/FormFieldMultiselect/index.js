import React from 'react'
import PropTypes from 'prop-types'
import {
  Dropdown,
  Icon,
  Menu,
  Segment,
  Button,
  Header,
  Modal,
  Label
} from 'semantic-ui-react'
import ReactTable from 'react-table'
import _ from 'lodash'
import checkboxHOC from 'react-table/lib/hoc/selectTable'

const CheckboxTable = checkboxHOC(ReactTable)

class FormFieldMultiselect extends React.Component {
  static propTypes = {
    options: PropTypes.array,
    columns: PropTypes.array,
    columnTable: PropTypes.array,
    selected: PropTypes.array,
    onSubmitSelected: PropTypes.func,
    createItemForFieldMultiselect: PropTypes.func
  }
  // Defaults for props
  static defaultProps = {
    options: [],
    columns: [],
    columnTable: [],
    selected: [],
    onSubmitSelected: () => {},
    createItemForFieldMultiselect: () => {}
  }
  constructor (props) {
    super(props)
    // this.state = {}
    this.renderModal = this.renderModal.bind(this)
    let newState = {
      modalIsOpen: false,
      selection: [],
      selectAll: false,

      searchSelectedString: '',
      searchOptionsString: '',

      columns: this.props.columns,
      selected: this.props.selected,
      columnTable: this.props.columnTable,
      options: this.props.options,
      optionsData: _.filter(
        this.props.options,
        o => this.props.selected.indexOf(o._id) === -1
      ),
      optionsSelected: _.filter(
        this.props.options,
        o => this.props.selected.indexOf(o._id) !== -1
      )
    }
    // this.setState(newState)
    this.state = newState
  }
  componentDidUpdate (prevProps, prevState) {
    // console.log('componentDidUpdate====>')
    if (!_.isEqual(prevProps.columns, this.props.columns)) {
      this.setState({
        columns: this.props.columns
      })
    }
    if (!_.isEqual(prevProps.selected, this.props.selected)) {
      this.setState({
        selected: this.props.selected,
        optionsData: _.filter(
          this.props.options,
          o => this.props.selected.indexOf(o._id) === -1
        ),
        optionsSelected: _.filter(
          this.props.options,
          o => this.props.selected.indexOf(o._id) !== -1
        )
      })
    }
    if (!_.isEqual(prevProps.columnTable, this.props.columnTable)) {
      this.setState({
        columnTable: this.props.columnTable
      })
    }
    if (!_.isEqual(prevProps.options, this.props.options)) {
      this.setState({
        options: this.props.options,
        optionsData: _.filter(
          this.props.options,
          o => this.props.selected.indexOf(o._id) === -1
        ),
        optionsSelected: _.filter(
          this.props.options,
          o => this.props.selected.indexOf(o._id) !== -1
        )
      })
    }
    if (prevState.searchOptionsString !== this.state.searchOptionsString) {
      this.setState({
        optionsData: _.filter(this.state.options, o => {
          for (var key in o) {
            // console.log('key' + key + ':', o[key])
            const targetString = ('' + o[key] || '').toLowerCase()
            if (
              targetString.includes(this.state.searchOptionsString) &&
              this.state.selected.indexOf(o._id) === -1
            ) {
              //   // string.includes(substring);
              return true
            }
          }
          return false
        })
      })
      // this.setSt
    }
    if (prevState.searchSelectedString !== this.state.searchSelectedString) {
      this.setState({
        optionsSelected: _.filter(this.state.options, o => {
          for (var key in o) {
            // console.log('key' + key + ':', o[key])
            const targetString = ('' + o[key] || '').toLowerCase()
            if (
              targetString.includes(this.state.searchSelectedString) &&
              this.state.selected.indexOf(o._id) !== -1
            ) {
              //   // string.includes(substring);
              return true
            }
          }
          return false
        })
      })
      // this.setState({
      //   optionsSelected: _.filter(this.props.options, (o) => (this.props.selected.indexOf(o._id) !== -1 && ))
      // })
    }
  }
  toggleSelection = (keys, shift, row) => {
    // console.log('key======>', keys)
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
  renderModal () {
    const { selectAll } = this.state
    const { toggleSelection, toggleAll, isSelected, logSelection } = this
    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: 'checkbox',
      getTrProps: (s, r) => {
        // someone asked for an example of a background color change
        if (!r) return {}
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

    // let dataOptions = this.props.selected.map(participantId => (_.filter(this.props.options, {_id: participantId}) || [{}])[0])
    // let dataOptions = this.props.options.map(dataOption => (this.props.selected || []).indexOf(dataOption._id) !== -1)
    return (
      <Modal
        open={this.state.modalIsOpen}
        onOpen={() => this.setState({ modalIsOpen: true })}
        onClose={() => this.setState({ modalIsOpen: false })}
      >
        <Header icon='archive' content='Select Data' />
        <Modal.Content>
          <Menu attached='top'>
            <Menu.Menu position='right'>
              <div className='ui right aligned category search item'>
                <div className='ui transparent icon input'>
                  <input
                    className='prompt'
                    type='text'
                    onChange={event =>
                      this.setState({ searchOptionsString: event.target.value })
                    }
                    placeholder='Search...'
                  />
                  <i className='search link icon' />
                </div>
                <div className='results' />
              </div>
            </Menu.Menu>
          </Menu>
          <Segment attached='bottom'>
            <CheckboxTable
              data={this.state.optionsData}
              ref={r => (this.checkboxTable = r)}
              columns={this.state.columns}
              defaultPageSize={10}
              className='-striped -highlight'
              {...checkboxProps}
            />
          </Segment>

          <Segment>
            <Button
              primary
              onClick={() => {
                // console.log('==selected item===>', this.state.selection)
                this.props.onSubmitSelected(this.state.selection)
                this.setState({ modalIsOpen: false })
              }}
            >
              Add
            </Button>
            Don't forget to submit
          </Segment>
        </Modal.Content>
        {/* <Modal.Actions>
          <Button basic color='red' inverted>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions> */}
      </Modal>
    )
  }
  render () {
    // console.log('====>>>>this.state=', this.state)
    return (
      <div>
        {this.renderModal()}
        {/* <Menu attached='top'>
          <Menu.Item
            onClick={() => {
              this.setState({ modalIsOpen: true })
            }}
          >
            <Icon name='add' />
            Add Item
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              this.props.createItemForFieldMultiselect()
            }}
          >
            <Icon name='add' />
            Create New Item
          </Menu.Item>
          <Menu.Menu position='right'>
            <div className='ui right aligned category search item'>
              <div className='ui transparent icon input'>
                <input
                  className='prompt'
                  type='text'
                  placeholder='Search...'
                  onChange={event =>
                    this.setState({ searchSelectedString: event.target.value })
                  }
                />
                <i className='search link icon' />
              </div>
              <div className='results' />
            </div>
          </Menu.Menu>
        </Menu> */}
        {/* <Segment> */}
        {this.props.template === '1' &&
          <Segment>
            <ReactTable
              data={this.state.optionsSelected}
              columns={this.state.columnTable}
              defaultPageSize={10}
              className='-striped -highlight'
            />
          </Segment>
        }
        {this.props.template === '2' &&
            (
              <div>
                <Button onClick={() => this.setState({ modalIsOpen: true })} size={'mini'}>Add</Button>
                {(this.state.optionsSelected || []).map(r => (_.find(this.state.columnTable[0].columns, {'id': 'Del'}) || {}).contentLabel(r))}
              </div>
            )
        }
        {/* </Segment> */}
      </div>
    )
  }
}

export default FormFieldMultiselect
