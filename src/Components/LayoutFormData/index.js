import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Immutable from 'seamless-immutable'
import {
  Container,
  Image,
  Button,
  Menu,
  Dropdown,
  Grid,
  Form,
  Checkbox,
  Message,
  Icon,
  Input,
  Label
} from 'semantic-ui-react'
import ReactTable from 'react-table'
import { path, pick, pickBy, isEmpty, find, propEq } from 'ramda'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import BreadcrumbCustom from '../BreadcrumbCustom'
import FormFieldMultiselect from '../FormFieldMultiselect'
import AppConfig from '../../Config/AppConfig'
// import styles from './styles'
import { Images } from '../../Themes'
import InputDate from '../InputDate';

const minDesktopScreenWidth = AppConfig.minDesktopScreenWidth
var formDataFile = new FormData()
export default class LayoutFormData extends Component {
  // Prop type warnings
  static propTypes = {
    id: PropTypes.string,
    dataDetail: PropTypes.object,
    formData: PropTypes.object.isRequired,
    formReset: PropTypes.func.isRequired,
    column: PropTypes.array.isRequired,
    multiselectComponent: PropTypes.object,
    selectoptions: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    setFormValue: PropTypes.func.isRequired,
    entityCreate: PropTypes.func.isRequired,
    entityUpdate: PropTypes.func.isRequired,
    createItemForFieldMultiselect: PropTypes.func,
    entityName: PropTypes.string.isRequired,
    submit: PropTypes.bool,
    submitFailed: PropTypes.bool,
    submitSuccess: PropTypes.bool,
    submitMessage: PropTypes.string.isRequired,
    initial: PropTypes.bool.isRequired,
    breadcrumb: PropTypes.array
  }

  // Defaults for props
  static defaultProps = {
    id: '',
    submitMessage: '',
    dataDetail: {},
    formData: {},
    formReset: () => {},
    column: [],
    multiselectComponent: {},
    selectoptions: {},
    setFormValue: () => {},
    entityCreate: () => {},
    entityUpdate: () => {},
    createItemForFieldMultiselect: () => {}
  }
  constructor (props) {
    super(props)
    this.state = {
      breadcrumb: this.props.breadcrumb
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // console.log('constructor props', this.props)
    this.props.formReset({})
    // if (!this.props.id && this.props.id !== '') this.props.formReset({})
  }
  // componentWillMount () {
  //   // this.props.formReset({})
  //   const p = this.props
  //   const column = p.column[0].columns
  //   var st = {
  //     dataDetail: p.dataDetail,
  //     column,
  //     defaultPageSize: p.defaultPageSize,
  //     // form: pick(column.map(c => c.fieldtype !== 'input-hidden' && c.id), p.dataDetail || {}),
  //     submitSuccess: p.submitSuccess
  //   }

  //   // if (p.id) {
  //   //   let initialFormValue = pick(column.map(c => c.fieldtype !== 'input-hidden' && c.id), p.dataDetail || {})
  //   //   p.setFormValue(initialFormValue)
  //   // }
  //   // else p.setFormValue()

  //   // this.setState(st)
  //   // load single data
  //   if (this.props.id && this.props.dataDetail) {
  //     // this.props.fetchOne({id: (this.props.dataDetail || {})._id})
  //   }
  // }
  // componentWillReceiveProps (nextProps) {
  //   // console.log('componentWillReceiveProps formData', nextProps.formData)
  //   // console.log('componentWillReceiveProps this.state.form', this.state.form)
  //   const p = nextProps
  //   const column = p.column[0].columns
  //   var st = {
  //     dataDetail: p.dataDetail,
  //     column,
  //     defaultPageSize: p.defaultPageSize,
  //     // form: pick(column.map(c => c.fieldtype !== 'input-hidden' && c.id), p.dataDetail || {}),
  //     submitSuccess: p.submitSuccess
  //   }
  //   // console.log('current-dataDetail', this.props.dataDetail)
  //   // console.log('next-dataDetail', p.dataDetail)
  //   // if (this.props.id) this.props.setFormValue(pick(column.map(c => c.fieldtype !== 'input-hidden' && c.id), p.dataDetail || {}))
  //   // this.setState(st)
  // }
  componentDidUpdate (prevProps, prevState) {
    if (
      !_.isEqual(prevProps.breadcrumb, this.props.breadcrumb) &&
      !_.isEmpty(this.props.breadcrumb)
    ) {
      this.setState({
        breadcrumb: Immutable.asMutable(this.props.breadcrumb, { deep: true })
      })
    }
  }
  componentWillUnmount () {
    // this.props.formReset({})
  }
  handleSubmit (event) {
    console.log('form submit')
    if (this.props.onSubmit) return this.props.onSubmit(event)
    // alert('Your favorite flavor is: ' + this.state.value)
    // console.log('submit', this.state.form._id)
    let column = ((this.props.column || [])[0] || {}).columns
    // console.log('submit formData', this.props.formData)
    // console.log('submit dataDetail', this.props.dataDetail)
    // console.log('submit column', column)
    if (isEmpty(this.props.formData)) return false
    if (this.props.id && this.props.id !== '') {
      // update
      // R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
      // const r = filter((a, b) => {
      //   console.log('filterrrr a===>', a)
      //   console.log('filterrrr b===>', b)
      // }, this.state.form)
      // console.log('rrrr===>', r)
      // var isUpperCase = (val, key) => key.toUpperCase() === key;
      // R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}

      var dataPatch = pickBy((v, k) => {
        let isSubmit = true
        if (v === undefined) isSubmit = false
        if (_.isEqual(this.props.dataDetail[k], v)) isSubmit = false
        if (!(find(propEq('id', k))(column) || {}).fieldtype) isSubmit = false
        return isSubmit
      }, this.props.formData)
      // console.log('formDataPicture   ====>', formDataPicture)
      if (!isEmpty(dataPatch)) this.props.entityUpdate(dataPatch, this.props.id)
    } else {
      // console.log('dataPatch====>', this.props.formData)
      // create
      if (!isEmpty(this.props.formData)) {
        // console.log('formDataPicture===>', formDataPicture)
        this.props.entityCreate(this.props.formData)
      }
    }
    event.preventDefault()
  }
  handleChange (event, fieldName, type) {
    console.dir(event)
    // console.log('handleChange', event)
    // console.log('handleChange', event.target)
    // console.log('handleChange value', event.target.value)
    // console.log('handleChange fieldName', fieldName)
    // console.log('handleChange type', type)
    let val = null
    if (type === 'select') {
      val = event.value
    } else if (type === 'file') {
      // console.log('handleChange', event.target.files[0])
      // let fileDetail = event.target.files[0] || {}
      // let data = new FormData()
      // formDataFile = new FormData(event.target)
      // const form = new FormData()
      // form.append('image[image]', {
      //   name: 'omgitsme.jpg',
      //   uri: pathToImageOnFilesystem,
      //   type: 'image/jpg'
      // })
      // formDataFile.append('file', event.target.files[0])
      // console.log('formDataFile======>>>>', formDataFile)
      this.props.setFormValue({ [fieldName]: event.target.files[0] })
      // this.props.setFormValue({'file_name_origin': fileDetail.name})
    } else if (type === 'multiselect-component') {
      console.log('event.value=====>', event.value)
      val = _.compact(_.uniq(_.concat(this.props.formData[fieldName], event.value)))
      console.log('event.value val=====>', val)
      // val = event.value
    } else if (type === 'input-date') {
      val = event
      // val = event.value.valueOf()
      // val = new Date(event.value.startOf('day').toString()).getTime()
      // console.dir(val)
      // this.setState({
      //   startDate: event.value
      // })
    } else {
      val = event.target.value
    }
    // console.log('val==>', val)

    if (val !== null) this.props.setFormValue({ [fieldName]: val })
  }
  renderField ({
    type,
    name,
    value,
    placeholder,
    label,
    options,
    widthfield,
    isDesktop
  }) {
    // console.log('this.state.startDate', this.state.startDate)
    // console.log(`renderField name=${name} value=${value} type=${type}`)
    // const options = [
    //   { key: 'm', text: 'Male', value: 'male' },
    //   { key: 'f', text: 'Female', value: 'female' },
    // ]
    const selectStyle = isDesktop
      ? { position: 'relative', top: -20, left: 210 }
      : {}
    const datepickerStyle = isDesktop
      ? { position: 'relative', top: -25, left: 210 }
      : {}
    const textareaStyle = isDesktop
      ? { position: 'relative', top: -25, left: 210 }
      : {}
    let opt = options || []
    // if (options) opt = options.map(r => ({key: r._id, text: r.conference_name, value: r.conference_code}))
    if (type === 'input-date') {
      let el = []
      // if (this.props.id && (name === 'email' || name === 'username')) return (<label key={name + value}>{value}</label>)
      return (<InputDate name={name} placeholder={placeholder} value={value} onChange={(o) => this.handleChange(o, name, type)} />)
    } else if (type === 'input-text') {
      let el = []
      if (this.props.id && (name === 'email' || name === 'username')) return (<label key={name + value}>{value}</label>)
      else return (<input type='text' name={name} placeholder={placeholder} value={value} onChange={(o) => this.handleChange(o, name)} />)
    } else if (type === 'file') {
      return (
        <input
          type='file'
          name={name}
          placeholder={placeholder}
          onChange={o => this.handleChange(o, name, type)}
        />
      )
    }else if (type === 'textarea') {
      return (
        <Form.TextArea
          style={textareaStyle}
          width={widthfield}
          type='text'
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={o => this.handleChange(o, name)}
        />
      )
    } else if (type === 'input-hidden') {
      return (
        <Form.Input
          type='hidden'
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={o => this.handleChange(o, name)}
        />
      )
    }
    // else if (type === 'select') return (<Dropdown placeholder='Skills' name={name} fluid multiple selection options={options} onChange={(o) => this.handleChange(o, name)} />)
    else if (type === 'select') {
      // console.log('field select opt=', opt)
      // console.log('field select value=', value)
      return (
        <Form.Select
          style={selectStyle}
          width={widthfield}
          name={name}
          value={'' + value}
          options={opt}
          placeholder={label}
          onChange={(o, obj) => this.handleChange(obj, name, type)}
        />
      )
    } 
    return null
  }

  render () {
    // console.log('[LayoutFormData.render] props', this.props.initial)
    // console.log('[LayoutFormData.render] formData', this.props.formData)
    const id = path(['id'], this.props)
    // const recordId = id
    // const id = path(['match', 'params', 'id', 'formData'], this.props)
    // console.log('this.props.formData===>', this.props.formData)
    // console.log('props===>', this.props)
    const MessageIcon = () => (
      <Message
        icon
        negative={this.props.submitFailed}
        success={this.props.submitSuccess}
      >
        {this.props.submit && id && <Icon name='circle notched' loading />}
        <Message.Content>
          {this.props.submit && <Message.Header>Please wait.</Message.Header>}
          {this.props.submitMessage && <span>{this.props.submitMessage}</span>}
        </Message.Content>
      </Message>
    )

    // if (this.props.submitSuccess && !id) this.props.history.push(`${this.props.redirectPath}${this.props.newRecordId}`)
    // if (this.props.submitSuccess && !id) return <Redirect push to={`${this.props.redirectPath}${this.props.newRecordId}`} />
    // if (this.state.submitSuccess && !id) {
    // console.log('redireeeeeedcccccttt=====asdfadfdafdfas', this.state)
    // return <Redirect to={`${this.props.redirectPath}${this.props.newRecordId}`} />
    // }
    // const isDesktop = true
    const isDesktop = window.screen.width >= minDesktopScreenWidth
    const labelStyle = isDesktop ? { width: 200, textAlign: 'right' } : {}
    const buttonStyle = isDesktop ? { position: 'relative', left: 210 } : {}
    const multiselectTemplate1Style = isDesktop ? { position: 'relative', top: -23, left: 210 } : {}
    return (
      <div>
        <Container>
          <Grid container style={{ padding: '1em 0em' }}>
            {this.state.breadcrumb && (
              <Grid.Row>
                <Grid.Column>
                  <BreadcrumbCustom breadcrumb={this.state.breadcrumb} />
                </Grid.Column>
              </Grid.Row>
            )}
            <Grid.Row>
              <Grid.Column>
                {this.props.submitMessage !== '' && !this.props.initial && (
                  <MessageIcon />
                )}
                <h2>Form {this.props.entityName}</h2>
                <Form>
                  {this.props.column &&
                    this.props.column.map(
                      colGroup =>
                        colGroup.Action !== 'ACT' &&
                        colGroup.columns.map(col => (
                          <Form.Field inline={isDesktop} key={col.id}>
                            {/* {(this.props.dataDetail.scope <= 1 && col.fieldtype) && (<label style={labelStyle}>{col.Header}</label>)} */}
                            {/* {(recordId !== '' && col.fieldtype) && (<label style={labelStyle}>{col.Header}</label>)} */}
                            {/* {(recordId === '' && col.fieldtype) && (<label style={labelStyle}>{col.Header}</label>)} */}
                            {col.fieldtype && (<label style={labelStyle}>{col.Header}</label>)}

                            {/* {(recordId !== '' && col.fieldtype !== 'multiselect-component' && col.id !== 'password' && col.id !== 'email' && col.id !== 'username' && col.id !== 'scope') && */}
                            {(col.fieldtype !== 'multiselect-component') &&
                              this.renderField({
                                type: col.fieldtype,
                                name: col.id,
                                value:
                                  (this.props.formData || {})[col.id] || '',
                                widthfield: col.widthfield,
                                placeholder: col.Header,
                                label: col.Header,
                                options: this.props.selectoptions
                                  ? this.props.selectoptions[col.id]
                                  : [],
                                isDesktop
                              })
                            }
                            {(col.fieldtype !== 'multiselect-component' && col.id === 'password' && id) &&
                              <Label key={2} pointing='left'>keep empty if don't wanna change</Label>
                            }
                            {/* {(recordId === '' && col.fieldtype !== 'multiselect-component') &&
                              this.renderField({
                                type: col.fieldtype,
                                name: col.id,
                                value:
                                  (this.props.formData || {})[col.id] || '',
                                widthfield: col.widthfield,
                                placeholder: col.Header,
                                label: col.Header,
                                options: this.props.selectoptions
                                  ? this.props.selectoptions[col.id]
                                  : [],
                                isDesktop
                              })} */}
                            {/* {col.fieldtype === 'multiselect-component' && (this.props.multiselectComponent && !this.props.multiselect) &&
                              (<FormFieldMultiselect
                                options={(this.props.multiselectComponent[col.id] || {}).data || []}
                                columns={(this.props.multiselectComponent[col.id] || {}).column || {}}
                                columnTable={(this.props.multiselectComponent[col.id] || {}).columnTable}
                                selected={this.props.formData[col.id] || []}
                                onSubmitSelected={listSelectedId => this.handleChange({ value: listSelectedId }, col.id, col.fieldtype)}
                                createItemForFieldMultiselect={
                                  this.props.createItemForFieldMultiselect
                                }
                              />
                              )} */}
                            
                            {(col.fieldtype === 'multiselect-component' && this.props.multiselect) &&
                              <div style={multiselectTemplate1Style}>{this.props.multiselect[col.id]({currentSelected: (this.props.formData || {})[col.id] || [], onSubmitSelected: listSelectedId => this.handleChange({ value: listSelectedId }, col.id, col.fieldtype)})}</div>
                              // (this.props.multiselect[col.id]({onSubmitSelected: listSelectedId => this.handleChange({ value: listSelectedId }, col.id, col.fieldtype)}))
                            }
                          </Form.Field>
                        ))
                    )}
                  {/* <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' />
                  </Form.Field> */}
                  {/* <Form.Field inline key={'file'} >
                    <input id='myfiles' multiple type='file' name='myfiles' />
                  </Form.Field> */}
                  <Form.Field inline key={'submit'}>
                    <Button
                      style={buttonStyle}
                      type='submit'
                      onClick={e => this.handleSubmit(e)}
                    >
                      Submit
                    </Button>
                    <Button
                      style={buttonStyle}
                      type='button'
                      onClick={e => window.history.back()}
                    >
                      Back
                    </Button>
                  </Form.Field>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
  }
}
