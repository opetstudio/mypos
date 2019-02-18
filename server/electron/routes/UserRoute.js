const fs = require('fs')
const b64 = require('base-64')
const os = require('os')
const _ = require('lodash')
const { session } = require('electron')
const erevnaServices = require('erevna-services')
const Transformation = require('../helper/Transformation')
const ReceiveRequest = require('../services/ReceiveRequest')

const Datastore = require('nedb')
const path = require('path')
const config = require('../config')
const utils = require('../utils')

let crypto = require('crypto'),
  UUID = require('uuid/v1'),
  ID_KEY = 'ID_KEY',
  VALUE_KEY = 'VALUE_KEY',
  ENCODING = 'base64', // 'hex'
  cipherType = 'aes-256-cbc', // 'des-ede3-cbc'
  bitAccessToken = 'tes',
  bitKeySecret = 'tos'

const entityName = 'user'
const tableName = 'user'

function cipherHelper (KEY, data) {
  var cipherer = crypto.createCipher(cipherType, KEY),
    crypted

  try {
    crypted = cipherer.update(JSON.stringify(data), 'utf8', ENCODING) + cipherer.final(ENCODING)
  } catch (e) {
  // console.error('[e] cipher');
  // console.error(e);
    return null
  }

  return crypted
}

function decipherHelper (KEY, data) {
  var decipherer = crypto.createDecipher(cipherType, KEY), decrypted

  try {
    decrypted = JSON.parse(decipherer.update(data, ENCODING, 'utf8') + decipherer.final('utf8'))
  } catch (e) {
    // console.error('[e] decipher');
    // console.error(e);
    return null
  }

  return decrypted
}

function _afterSerialization (opt) {
  return utils._afterSerialization(opt)
}
function _beforeDeserialization (opt) {
  return utils._beforeDeserialization(opt)
}
function _onload (opt) {
  console.log('_onload', opt)
}

// const dataStore = new Datastore({ filename: path.join(`${tableName}.db`), autoload: true, timestampData: true, onload:_onload, afterSerialization:_afterSerialization, beforeDeserialization:_beforeDeserialization });
function createDB (pathDb) {
  // if (!fs.existsSync(pathDb)) return {}
  let res
  try {
    res = new Datastore({ filename: pathDb, autoload: true, timestampData: true, afterSerialization: utils._afterSerialization, beforeDeserialization: utils._beforeDeserialization })
  } catch (e) {
    res = {}
  }
  return res
}
const dataStore = new Datastore()
function getDatastore (neDBDataPath, entity) {
  neDBDataPath = neDBDataPath || os.tmpdir()
  var pathDb = path.join(neDBDataPath, `${entity}.db`)
  // console.log('pathDb=', pathDb)
  // console.log('dataStore.filename=', dataStore.filename)
  if (pathDb === dataStore.filename) return dataStore
  else return createDB(pathDb)
}

function getSessionDatastore (neDBDataPath, entity) {
  neDBDataPath = neDBDataPath || os.tmpdir()
  var pathDb = path.join(neDBDataPath, `${entity}.db`)
  if (pathDb === dataStore.filename) return dataStore
  else return createDB(pathDb)
}

// const DB_USER = getDatastore(config.defaultDataPath, entityName)
// const DB.session = getSessionDatastore(config.defaultDataPath, 'session')

module.exports[`get_logout`] = function (event, request, DB) {
  const responseRoute = `/get_logout`
  let neDBDataPath = request.headers.neDBDataPath
  let entity = request.headers.entity
  console.log(`${responseRoute} entity=${entity} request=${request} path=${neDBDataPath}`)
  entity = entity || entityName
  neDBDataPath = neDBDataPath || config.defaultDataPath
  const sessionDatastore = DB.session
  const token = erevnaServices.security.tokenExtractor(request.headers.authorization)
  // console.log('token===>', token)
  sessionDatastore.remove({token}, (e, o) => {
    event.sender.send(responseRoute, null, {'headers': {...request.headers},
      'body': Transformation.response({'status': true, 'responseMessage': 'success'})})
  })
}
module.exports[`get_get-login-status`] = async function (event, request, DB) {
  request = await ReceiveRequest(request)
  const sessionDatastore = DB.session
  sessionDatastore.find({}, (e, o) => {
    event.sender.send(request.url, null, {'headers': {...request.headers},
      'body': Transformation.response({'status': true, 'responseMessage': 'success'})})
  })
}
module.exports[`get_getUserProfile`] = async function (event, request, DB) {
  request = await ReceiveRequest(request)
  const sessionDatastore = DB.session
  sessionDatastore.findOne({token: request.params[0]}, (e, o) => {
    let resp = {}
    if (e || !o) resp = {}
    else resp = o.userDetail
    event.sender.send(request.url, null, {'headers': {...request.headers},
      'body': Transformation.response(resp)})
  })
}
module.exports[`get_users`] = async function (event, request, DB) {
  request = await ReceiveRequest(request)
  const storage = DB.user
  const sessionDatastore = DB.session
  const token = erevnaServices.security.tokenExtractor(request.headers.authorization)
  // console.log('token===>', token)
  sessionDatastore.findOne({token}, (e, o) => {
    // console.log('session====>>>', o)
    let scope = ((o || {}).userDetail || {}).scope
    // console.log('scope====>>>', scope)
    if (e || !o) {
      let errorCode = 'INVALID_AUTHORIZATION_TOKEN'
      let errorDetail = erevnaServices.errorCode[errorCode]
      return event.sender.send(
        request.url,
        errorCode,
        {
          'headers': {},
          'body': Transformation.response_error({
            title: errorCode,
            status: 401,
            statusText: errorDetail.statusText,
            detail: errorDetail.detail,
            problem: errorCode
          })
        })
    }
    storage.find({scope: { $gt: scope }}, (e2, o2) => {
      // console.log('result e2====>>>', e2)
      // console.log('result o2====>>>', o2)
      let resp = []
      if (e2 || !o2) resp = []
      else resp = o2
      event.sender.send(request.url, null, {'headers': {...request.headers},
        'body': Transformation.response({_embedded: { tb_users: resp }})})
    })
  })
}

module.exports[`post_users`] = async function (event, request, DB) {
  request = await ReceiveRequest(request)
  const storage = DB.user
  let dataCreate = erevnaServices.model.user.convertToSchemaForCreate(request.body) || {}
  let dataNotValid = erevnaServices.model.user.isDataNotValid(dataCreate)
  if (dataNotValid) {
    return event.sender.send(
      request.url,
      dataNotValid.status,
      {
        'headers': {},
        'body': Transformation.response_error(dataNotValid)
      })
  }
  erevnaServices.security.encryptPassword(dataCreate.password, (encryptedPassword) => {
    dataCreate.password = encryptedPassword
    storage.insert(dataCreate, (e2, o2) => {
      console.log('new user =', o2)
      if (e2 || !o2) {
        console.log('error when create new user =', e2)
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
  })
}
module.exports[`patch_users`] = async function (event, request, DB) {
  // RECIVE REQUEST
  request = await ReceiveRequest(request)
  const storage = DB.user
  // PROCESS DATA
  // VALIDASI
  // CRUD
  let _id = request.params[0]
  // console.log('request.body==>', request.body)
  let dataUpdate = erevnaServices.model.user.convertToSchemaForUpdate(request.body) || {}
  // console.log('dataUpdate==>', dataUpdate)
  let dataNotValid = erevnaServices.model.user.isDataNotValid(dataUpdate)
  if (dataNotValid) {
    return event.sender.send(
      request.url,
      dataNotValid.status,
      {
        'headers': {},
        'body': Transformation.response_error(dataNotValid)
      })
  }
  if (dataUpdate.password && dataUpdate.password !== '') {
    dataUpdate.password = await (new Promise((resolve) => {
      erevnaServices.security.encryptPassword(dataUpdate.password, (encryptedPassword) => {
        resolve(encryptedPassword)
      })
    }))
  }
  // console.log('dataUpdate==>', dataUpdate)
  storage.update({ _id: _id }, { $set: dataUpdate }, { multi: true }, (err, numReplaced) => {
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
    storage.findOne({_id: _id}, (e, o) => {
      let resp = []
      if (e || !o) resp = []
      else resp = o
      event.sender.send(request.url, null, {'headers': {...request.headers},
        'body': Transformation.response(resp)})
    })
  })

  // SEND RESPONSE
}
module.exports[`post_oauthhh`] = async function (event, request, DB) {
  request = await ReceiveRequest(request)
  const storage = DB.user
  const sessionDatastore = DB.session
  erevnaServices.user.userLogin(storage, request.body, (newToken, userDetail) => {
    // console.log(`FetchAllApi entity=${entity} path=${neDBDataPath} err=${err} doc=${doc}`, doc)
    if (!newToken) {
      let errorCode = 'INVALID_USER_OR_PASSWORD'
      let errorDetail = erevnaServices.errorCode[errorCode]
      return event.sender.send(
        request.url,
        errorCode,
        {
          'headers': {},
          'body': Transformation.response_failed({
            title: errorCode,
            status: 400,
            ok: false,
            detail: errorDetail.detail,
            problem: errorCode
          })
        })
    } else {
      sessionDatastore.update({userId: request.body.username}, {token: newToken, userId: request.body.username, userDetail: userDetail}, { upsert: true }, (e, o) => {
        request.headers.authorization = 'Bearer ' + newToken
        event.sender.send(request.url, null, {'headers': {...request.headers},
          'body': Transformation.response_success_login({
            access_token: newToken,
            refresh_token: newToken,
            token_type: 'Bearer',
            _id: userDetail._id
          })})
      })
    }
    // if (!err && doc) {
    //   sessionDatastore.update({}, doc, { upsert: true }, (err2, newDoc) => {
    //     event.sender.send(responseRoute, err2, {'headers': {}, 'body': newDoc})
    //   })
    // } else {
    //   event.sender.send(responseRoute, err, {'headers': {}, 'body': doc})
    // }
    // event.sender.send(responseRoute, err, JSON.stringify(doc));
  })
}
module.exports[`get-login-status`] = async function (event, request, DB) {
  request = await ReceiveRequest(request)
  // const storage = DB.user
  // const sessionDatastore = DB.session
  event.sender.send('get-login-status', 'err', 'doc')
  // const responseRoute = `/${entityName}FetchAllApiResponse`
  // entity = entity || entityName
  // neDBDataPath = neDBDataPath || config.defaultDataPath
  // const storage = getDatastore(neDBDataPath, entity)
  // // console.log('===========================>>>>>>>>>', storage);
  // erevnaServices.fetchAll(storage, {}, (err, doc) => {
  //   console.log(`FetchAllApi entity=${entity} path=${neDBDataPath} result=`, doc)
  //   // event.sender.send(responseRoute, err, JSON.stringify(doc));
  //   event.sender.send(responseRoute, err, doc)
  // })
}
module.exports[`${entityName}FetchAllApi`] = function (event, neDBDataPath, entity) {
  console.log(`FetchAllApi entity=${entity} path=${neDBDataPath}`)
  const responseRoute = `/${entityName}FetchAllApiResponse`
  entity = entity || entityName
  neDBDataPath = neDBDataPath || config.defaultDataPath
  const storage = getDatastore(neDBDataPath, entity)
  // console.log('===========================>>>>>>>>>', storage);
  erevnaServices.fetchAll(storage, {}, (err, doc) => {
    console.log(`FetchAllApi entity=${entity} path=${neDBDataPath} result=`, doc)
    // event.sender.send(responseRoute, err, JSON.stringify(doc));
    event.sender.send(responseRoute, err, doc)
  })
}
module.exports[`${entityName}FetchAllApiGurustaff`] = function (event, neDBDataPath, entity) {
  entity = entity || entityName
  console.log(`FetchAllApiGurustaff entity=${entity} path=${neDBDataPath}`)
  const responseRoute = `/${entityName}FetchAllApiGurustaffResponse`
  neDBDataPath = neDBDataPath || config.defaultDataPath
  const storage = getDatastore(neDBDataPath, entity)
  storage.find({}, (err, doc) => {
    console.log(`FetchAllApiGurustaff entity=${entity} path=${neDBDataPath} result=`, doc)
    // event.sender.send(responseRoute, err, JSON.stringify(doc));
    event.sender.send(responseRoute, err, doc)
  })
}
module.exports[`${entityName}FetchAllApiSiswa`] = function (event, neDBDataPath, entity) {
  entity = entity || entityName
  console.log(`FetchAllApiSiswa entity=${entity} path=${neDBDataPath}`)
  const responseRoute = `/${entityName}FetchAllApiSiswaResponse`
  neDBDataPath = neDBDataPath || config.defaultDataPath
  const storage = getDatastore(neDBDataPath, entity)
  storage.find({}, (err, doc) => {
    console.log(`FetchAllApiSiswa entity=${entity} path=${neDBDataPath} result=`, doc)
    // event.sender.send(responseRoute, err, JSON.stringify(doc));
    event.sender.send(responseRoute, err, doc)
  })
}
function upload_photo (photoPath, new_photo_path) {
  let newPath = ''
  if (fs.existsSync(photoPath)) {
    // Do something
    // fs.unlinkSync(photoPath);
    // const photoPathSplit = photoPath.split('/');
    // const photoName = photoPathSplit[photoPathSplit.length - 1];
    // const photoNameSplit = photoName.split('.');
    // const photoExt = photoNameSplit[photoNameSplit.length - 1];
    // const newName = b64.encode(photoName);

    newPath = new_photo_path
    fs.createReadStream(photoPath).pipe(fs.createWriteStream(newPath))
  }
  return newPath
}
function delete_photo (photoPath) {
  if (fs.existsSync(photoPath)) {
    fs.unlinkSync(photoPath)
  }
}
function set_new_photo_path (photoPath, neDBDataPath) {
  let newPath = ''
  neDBDataPath = neDBDataPath || config.defaultDataPath
  // if (fs.existsSync(photoPath)) {
  // Do something
  // fs.unlinkSync(photoPath);
  const photoPathSplit = photoPath.split('/')
  const photoName = photoPathSplit[photoPathSplit.length - 1]
  const photoNameSplit = photoName.split('.')
  const photoExt = photoNameSplit[photoNameSplit.length - 1]
  const newName = b64.encode(photoName)

  const now = new Date().getTime()

  newPath = path.join(neDBDataPath, `${now}-${newName}.${photoExt}`)
  // fs.createReadStream(photoPath).pipe(fs.createWriteStream(newPath));
  // }
  return newPath
}
module.exports.openImageApi = function (event, photoPath) {
  console.log('openImageApi==>', photoPath)
  // console.log('appRoot==>', appRoot);
  if (fs.existsSync(photoPath)) {
    fs.readFile(photoPath, (err, data) => {
      const base64data = Buffer.from(data)
      //  const base64dataStr = base64data.toString('base64');
      //  console.log(base64dataStr);
      console.log('send /openImageApi-response')
      return event.sender.send('/openImageApi-response',
        '1', base64data
      )
    })
    // const photoPathSplit = photoPath.split('/');
    // const photoName = photoPathSplit[photoPathSplit.length - 1];
    // fs.createReadStream(photoPath).pipe(
    //   fs.createWriteStream(`${appRoot.path}/src/img/${photoName}`));
    // return event.sender.send('/openImageApi-response',
    //   '1', 'image ready'
    // );
  } else {
    return event.sender.send('/openImageApi-response',
      '0', 'image not ready'
    )
  }
}
module.exports.closeImageApi = function (event, photoPath) {
  console.log('closeImageApi==>', photoPath)
  if (photoPath) {
    const photoPathSplit = photoPath.split('/')
    const photoName = photoPathSplit[photoPathSplit.length - 1]
    if (fs.existsSync(photoName)) {
      // fs.unlinkSync(`${appRoot.path}/src/img/${photoName}`);
      return event.sender.send('/closeImageApi-response',
        '1', 'image closed'
      )
    }
  }

  return event.sender.send('/closeImageApi-response',
    '0', 'image not closed'
  )
}
function createDataApi (event, arg1, neDBDataPath, entity) {
  entity = entity || entityName
  // console.log(`${entityName}CreateDataApi`, arg1);
  neDBDataPath = neDBDataPath || config.defaultDataPath
  const storage = getDatastore(neDBDataPath, entity)
  const responseRoute = `/${entityName}CreateDataApiResponse`
  const dataObj = JSON.parse(arg1)
  console.log(`${entityName}CreateDataApi dataObj`, dataObj)

  if (!dataObj.id) {
    return event.sender.send(responseRoute,
      '0', 'Gagal input data. "ID" tidak boleh kosong', dataObj
    )
  }
  if (dataObj.username === 'root') {
    return event.sender.send(responseRoute,
      '0', 'Gagal input data. "USERNAME" tidak boleh gunakan root', dataObj
    )
  }
  // Using a unique constraint with the index
  // storage.ensureIndex({ fieldName: 'nip', unique: true }, err => {
  //   console.log(err);
  // });
  // storage.ensureIndex({ fieldName: 'id', unique: true }, err => {
  //   console.log(err);
  // });
  // Remove index on field somefield
  // storage.removeIndex('id', function (err) {
  // });
  // storage.removeIndex('nip');
  // storage.ensureIndex({ fieldName: 'nip', unique: true });
  let new_photo_path = ''
  if (dataObj.photo_path !== '') {
    new_photo_path = set_new_photo_path(dataObj.photo_path, neDBDataPath)
    dataObj.new_photo_path = new_photo_path
    upload_photo(dataObj.photo_path, new_photo_path)
  }
  storage.findOne({ id: dataObj.id }, (err, doc) => {
    if (doc) {
      return event.sender.send(responseRoute,
        '0', `Gagal input data. ID ${doc.id} telah terpakai.`, dataObj
      )
    }
    storage.findOne({ username: dataObj.username }, (err1, doc1) => {
      if (doc1) {
        return event.sender.send(responseRoute,
          '0', `Gagal input data. USERNAME ${doc1.username} telah terpakai.`, dataObj
        )
      }
      storage.insert(dataObj, (err2, newDoc) => {
        // Callback is optional
        // newDoc is the newly inserted document, including its _id
        // newDoc has no key called notToBeSaved since its value was undefined
        // console.log('err', err);
        // console.log('newDoc', newDoc);
        // ipcMain.send(responseRoute, 'berhasil input data');
        if (err2) {
          return event.sender.send(responseRoute,
            '0', `Gagal input data. msg: ${err2}`, dataObj
          )
        }
        event.sender.send(responseRoute, '1', 'berhasil input data', newDoc)
      })
    })
  })
}
module.exports[`${entityName}CreateDataApi`] = createDataApi
module.exports[`${entityName}UpdateDataApi`] = function (event, arg1, _id, neDBDataPath) {
  const responseRoute = `/${entityName}UpdateDataApiResponse`
  const dataObj = JSON.parse(arg1)
  neDBDataPath = neDBDataPath || config.defaultDataPath
  const storage = getDatastore(neDBDataPath, tableName)
  if (!dataObj.id) {
    return event.sender.send(responseRoute,
      '0', 'Gagal input data. "ID" tidak boleh kosong', dataObj
    )
  }
  if (dataObj.username === 'root') {
    return event.sender.send(responseRoute,
      '0', 'Gagal input data. "USERNAME" tidak boleh gunakan root', dataObj
    )
  }
  storage.findOne({ _id }, (err0, doc0) => {
    if (!doc0) {
      return event.sender.send(responseRoute,
        '0', 'Gagal update data. data current tidak ditemukan.'
      )
    }
    const dataDetail = doc0 // old Data

    let new_photo_path = ''
    let gantiPhoto = false
    if (dataObj.photo_path === '') {
      // set new path
      dataObj.new_photo_path = dataDetail.new_photo_path
      dataObj.photo = dataDetail.photo
      dataObj.photo_path = dataDetail.photo_path
      new_photo_path = dataDetail.new_photo_path
    } else {
      gantiPhoto = true
      new_photo_path = set_new_photo_path(dataObj.photo_path, neDBDataPath)
      console.log('ganti photo ==>', dataObj.photo_path)
      dataObj.new_photo_path = new_photo_path
    }
    console.log('dataDetail=>', dataDetail)
    console.log('dataObj=>', dataObj)
    const updatedData = _.merge(dataDetail, dataObj)
    console.log('updatedData=>', updatedData)

    storage.findOne({ id: dataObj.id }, (err, doc) => {
      if (doc && dataDetail._id !== doc._id) {
        return event.sender.send(responseRoute,
          '0', `Gagal input data. ID ${doc.id} telah terpakai.`,
          updatedData
        )
      }
      storage.findOne({ username: dataObj.username }, (err, doc) => {
        if (doc && dataDetail._id !== doc._id) {
          return event.sender.send(responseRoute,
            '0', `Gagal input data. USERNAME ${doc.username} telah terpakai.`,
            updatedData
          )
        }
        storage.update({ _id }, { $set: dataObj }, {}, (err2, totalUpdated) => {
          // Callback is optional
          // newDoc is the newly inserted document, including its _id
          // newDoc has no key called notToBeSaved since its value was undefined
          // console.log('err', err);
          console.log('totalUpdated', totalUpdated)
          if (err2) {
            return event.sender.send(responseRoute,
              '0', `Gagal update data. msg: ${err2}`,
              updatedData
            )
          }
          if (gantiPhoto) {
            upload_photo(dataObj.photo_path, dataObj.new_photo_path)
          }

          // const updatedData = {};
          // _.extend(updatedData, dataDetail, dataObj);
          console.log('updated data=>', updatedData)

          event.sender.send(responseRoute, '1', 'berhasil update data', updatedData)
        })
      })
    })
  })
}
module.exports[`${entityName}DeleteDataApi`] = function (event, arg1, neDBDataPath) {
  const responseRoute = `/${entityName}DeleteDataApiResponse`
  // const dataObj = JSON.parse(arg1);
  const dataObj = arg1
  neDBDataPath = neDBDataPath || config.defaultDataPath
  const storage = getDatastore(neDBDataPath, tableName)
  storage.findOne({ _id: dataObj._id }, (err0, doc0) => {
    if (!doc0) {
      return event.sender.send(responseRoute,
        '0', 'Gagal delete. Data current tidak ditemukan.'
      )
    }
    const dataDetail = doc0 // old Data
    const updatedData = _.merge(dataDetail, dataObj)
    storage.remove({ _id: dataDetail._id }, {}, (err2, numRemoved) => {
      console.log('total data deleted=', numRemoved)
      if (err2) {
        return event.sender.send(responseRoute,
          '0', `Gagal delete. msg: ${err2}`,
          updatedData
        )
      }
      delete_photo(updatedData.new_photo_path)
      event.sender.send(responseRoute, '1', 'berhasil delete', updatedData)
    })
  })
}

// set initial data
module.exports[`set_init`] = function (DB) {
  let setInitialData = () => {
    console.log('set initial data for entity ' + entityName)
    // const storage = getDatastore(config.defaultDataPath, entityName)
    const storage = DB.user
    let userModel = erevnaServices.model.user.schema
    let dataObj = {}

    for (var key in userModel) {
      const fieldDesc = userModel[key]
      // console.log('fieldDesc=', fieldDesc)
      dataObj[key] = fieldDesc['default'] || (fieldDesc['type'] === String ? '' : 0)
      if (fieldDesc['index']) {
        let theIndex = fieldDesc['index']
        if (theIndex['unique']) {
          // Using a sparse unique index
          storage.ensureIndex({ fieldName: key, unique: true }, function (err) {
            if (err) console.log('error when ensureIndex err=', err)
          })
        }
      }

      if (key === 'id') dataObj[key] = '0000'
      if (key === 'name') dataObj[key] = 'Super Admin'
      if (key === 'first_name') dataObj[key] = 'Super'
      if (key === 'last_name') dataObj[key] = 'Admin'
      if (key === 'username') dataObj[key] = 'root'
      if (key === 'password') dataObj[key] = 'toor'
      if (key === 'scope') dataObj[key] = 1
      if (key === 'email') dataObj[key] = 'root@xxxxxxx.com'
      if (key === 'status') dataObj[key] = 'active'
    }
    // console.log('dataObj=', dataObj)

    storage.findOne({ username: dataObj.username }, (err1, doc1) => {
      if (doc1) return
      erevnaServices.security.encryptPassword(dataObj.password, (encryptedPassword) => {
        dataObj.password = encryptedPassword
        storage.insert(dataObj, (e2, o2) => {
          console.log('new user =', o2)
        })
      })
    })
  }
  setInitialData()
}
// let log = () => {
//   var pathDb = path.join(config.defaultDataPath, `user.db`)
//   console.log(pathDb)
//   if (!fs.existsSync(pathDb)) setTimeout(log, 1000)
// }

