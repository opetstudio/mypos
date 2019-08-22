const b64 = require('base-64')
const os = require('os')
const _ = require('lodash')
const erevnaServices = require('erevna-services')
const Transformation = require('../helper/Transformation')
const ReceiveRequest = require('../services/ReceiveRequest')
const Pagination = require('../helper/Pagination')

const Datastore = require('nedb')
const path = require('path')
const config = require('../config')
const utils = require('../utils')
const entityName = 'product'
const tableName = 'product'
const tableNameOnServer = 'tb_product'

// set initial data
module.exports[`set_init`] = function (DB) {
  let setInitialData = (initData) => {
    console.log('set initial data for entity ' + entityName)
    const storage = DB.product
    let schema = erevnaServices.model.product.schema
    for (var key in schema) {
      const fieldDesc = schema[key]
      if (fieldDesc['index']) {
        let theIndex = fieldDesc['index']
        if (theIndex['unique']) {
          // Using a sparse unique index
          storage.ensureIndex({ fieldName: key, unique: true }, function (err) {
            if (err) console.log('error when ensureIndex err=', err)
          })
        }
      }
    }
    initData.forEach((v, k) => {
      let dataCreate = erevnaServices.model.product.convertToSchemaForCreate(v) || {}
      let dataNotValid = erevnaServices.model.user.isDataNotValid(dataCreate)
      if (dataNotValid) return console.log('data not valid = ', v)
      storage.insert(dataCreate, (e2, o2) => {
        if (e2 || !o2) console.log('error when insert data ', e2)
        else console.log('success insert data')
      })
    })
  }
  // setInitialData([
  //   {
  //     'product_name': 'KASIR',
  //     'product_rank': 250,
  //     'status': 'publish'
  //   }
  // ])
}
module.exports[`post_products`] = function (event, request, DB) {
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
module.exports[`get_products`] = function (event, request, DB) {
  // console.log('get_products request=>', request)
  Pagination(request, tableNameOnServer, DB[tableName], {}, (resp) => {
    event.sender.send(request.url, null, {'headers': {...request.headers},
      'body': Transformation.response(resp)})
  })
}
module.exports[`patch_products`] = function (event, request, DB) {
}
