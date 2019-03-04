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
const entityName = 'news'
const tableName = 'role'
const tableNameOnServer = 'tb_news'

// set initial data
module.exports[`set_init`] = function (DB) {
  let setInitialData = (initData) => {
    console.log('set initial data for entity ' + entityName)
    const storage = DB.news
    let schema = erevnaServices.model.news.schema
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
      let dataCreate = erevnaServices.model.news.convertToSchemaForCreate(v) || {}
      let dataNotValid = erevnaServices.model.user.isDataNotValid(dataCreate)
      if (dataNotValid) return console.log('data not valid = ', v)
      storage.insert(dataCreate, (e2, o2) => {
        if (e2 || !o2) console.log('error when insert data ', e2)
        else console.log('success insert data')
      })
    })
  }
  setInitialData([
    {
      'news_name': 'KASIR',
      'news_rank': 250,
      'status': 'publish'
    }
  ])
}
module.exports[`post_newss`] = function (event, request, DB) {
}
module.exports[`get_newss`] = function (event, request, DB) {
 Pagination(request, tableNameOnServer, DB[tableName], {}, (resp) => {
    event.sender.send(request.url, null, {'headers': {...request.headers},
      'body': Transformation.response(resp)})
  }) 
}
module.exports[`patch_newss`] = function (event, request, DB) {
}