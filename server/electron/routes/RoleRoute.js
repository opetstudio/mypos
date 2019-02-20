const b64 = require('base-64')
const os = require('os')
const _ = require('lodash')
const erevnaServices = require('erevna-services')
const Transformation = require('../helper/Transformation')
const ReceiveRequest = require('../services/ReceiveRequest')

const Datastore = require('nedb')
const path = require('path')
const config = require('../config')
const utils = require('../utils')
const entityName = 'role'
const tableName = 'role'

// set initial data
module.exports[`set_init`] = function (DB) {
  let setInitialData = (initData) => {
    console.log('set initial data for entity ' + entityName)
    const storage = DB.role
    let schema = erevnaServices.model.role.schema
    for (var key in schema) {
      const fieldDesc = schema[key]
      if (fieldDesc['index']) {
        let theIndex = fieldDesc['index']
        if (theIndex['unique']) {
          // Using a sparse unique index
          storage.ensureIndex({ fieldName: key, unique: true }, function (err) {
            if (err) console.log('error when ensureIndex role err=', err)
          })
        }
      }
    }
    initData.forEach((v, k) => {
      let dataCreate = erevnaServices.model.role.convertToSchemaForCreate(v) || {}
      //   console.log('dataCreate===>', dataCreate)
      let dataNotValid = erevnaServices.model.role.isDataNotValid(dataCreate)
      if (dataNotValid) return console.log('data not valid = ', v)
      storage.insert(dataCreate, (e2, o2) => {
        // if (e2 || !o2) console.log('error when insert data ', e2)
        // else console.log('success insert data')
      })
    })
  }
  setInitialData([
    {
      'role_name': 'KASIR',
      'role_rank': 250,
      'status': 'publish'
    }
  ])
}
module.exports[`post_roles`] = function (event, request, DB) {
  let dataCreate = erevnaServices.model[entityName].convertToSchemaForCreate(request.body) || {}
  let dataNotValid = erevnaServices.model[entityName].isDataNotValid(dataCreate)
  if (dataNotValid) {
    return event.sender.send(
      request.url,
      dataNotValid.status,
      {
        'headers': {},
        'body': Transformation.response_error(dataNotValid)
      })
  }
  DB[tableName].insert(dataCreate, (e2, o2) => {
    if (e2 || !o2) {
      let errorCode = 'GENERAL_ERROR'
      let errorDetail = erevnaServices.errorCode[errorCode]
      return event.sender.send(
        request.url,
        e2,
        {
          'headers': {...request.headers},
          'body': Transformation.response_error({
            'type': 'http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html',
            'title': e2.errorType,
            'status': 500,
            'detail': e2.key + ' => ' + e2.errorType
          })
        })
    }
    event.sender.send(request.url, null, {'headers': {...request.headers},
      'body': Transformation.response_success_create(o2)})
  })
}
module.exports[`get_roles`] = function (event, request, DB) {
  DB[tableName].find({}, (e, o) => {
    event.sender.send(request.url, null, {'headers': {...request.headers},
      'body': Transformation.response({'_embedded': { 'tb_role': o }})})
  })
}
module.exports[`patch_roles`] = function (event, request, DB) {
  let _id = request.params[0]
  let dataUpdate = erevnaServices.model[entityName].convertToSchemaForUpdate(request.body) || {}
  let dataNotValid = erevnaServices.model[entityName].isDataNotValid(dataUpdate)
  if (dataNotValid) {
    return event.sender.send(
      request.url,
      dataNotValid.status,
      {
        'headers': {},
        'body': Transformation.response_error(dataNotValid)
      })
  }
  DB[tableName].update({ _id: _id }, { $set: dataUpdate }, { multi: true }, (err, numReplaced) => {
    if (err) {
      let errorCode = 'GENERAL_ERROR'
      let errorDetail = erevnaServices.errorCode[errorCode]
      return event.sender.send(
        request.url,
        err,
        {
          'headers': {...request.headers},
          'body': Transformation.response_error({
            'type': 'http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html',
            'title': errorDetail.detail,
            'status': 500,
            'detail': errorDetail.detail
          })
        })
    }
    DB[tableName].findOne({_id: _id}, (e, o) => {
      let resp = []
      if (e || !o) resp = []
      else resp = o
      event.sender.send(request.url, null, {'headers': {...request.headers},
        'body': Transformation.response(resp)})
    })
  })
}
