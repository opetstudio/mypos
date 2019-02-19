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
            if (err) console.log('error when ensureIndex err=', err)
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
        if (e2 || !o2) console.log('error when insert data ', e2)
        else console.log('success insert data')
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
    console.dir(request)
}
module.exports[`get_roles`] = function (event, request, DB) {
    console.dir(request)
}
module.exports[`patch_roles`] = function (event, request, DB) {
    console.dir(request)
}