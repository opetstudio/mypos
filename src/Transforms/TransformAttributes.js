import {
  prepend,
  sortBy,
  compose,
  toLower,
  prop,
  map,
  pipe,
  pick,
  isNil,
  path
} from 'ramda'
import _ from 'lodash'

function mapAttributes (dataIn, obj) {
  // console.log('mapAttributes')
  // const mrg = (x) => {
  //   // console.log('mapAttributes mrg ==>', x)
  //   return merge(x.company, pick(['id'], x))
  // }
  const mp = map(x => {
    // console.log('mapAttributes map ==>', x)
    // return mrg(x)
    // return mrg(x)
    if (!isNil(obj)) return pick(obj, x)
    else return x
  })
  var mapAttrs = pipe(mp)
  return mapAttrs(dataIn)
  // return mapAttrs(isNil(obj) ? dataIn : dataIn.data)
}

function getEntityBatch (dataIn, obj) {
  const contentDetail = dataIn || {}
  const { byId, allIds, status } = contentDetail
  // const byId = {}
  // byId[contentDetail._id] = contentDetail
  // const allIds = [contentDetail._id]
  // const status = path(['status'], contentDetail)
  return {
    byId,
    allIds,
    status
  }
}
function getEntity (dataIn, obj) {
  const contentDetail = dataIn || {}
  const byId = {}
  delete contentDetail.password
  delete contentDetail._links
  byId[contentDetail._id] = contentDetail
  const allIds = [contentDetail._id]
  const status = path(['status'], contentDetail)
  return {
    detail: contentDetail,
    byId,
    allIds,
    status
  }
}
function getEntityCollection (dataIn, entity, obj) {
  const allData = path(['_embedded', entity], dataIn) || []
  const byId = {}
  const slug = {}
  var maxModifiedon = 0
  let allIds = _.compact(
    allData.map(r => {
      // const allIds = _.difference(state.allIds, action.data.listId)
      // const byId = state.byId.without(action.data.listId)
      delete r._links
      delete r.password
      if (r.status === 'remove') return null
      if (r._id === undefined || r._id === 'undefined' || typeof r._id === 'undefined' || r._id === null) return null
      byId['' + r._id] = obj ? { ...pick(obj, r), _id: r._id } : r
      slug['' + r.slug] = r._id
      maxModifiedon = r.modifiedon || 0
      return r._id
    })
  )
  return {
    byId,
    allIds,
    maxModifiedon,
    slug
  }
}

function getAttributes (dataIn, obj) {
  const contentDetail = dataIn || {}
  const byId = {}
  byId[contentDetail._id] = contentDetail
  const allIds = [contentDetail._id]
  const status = path(['status'], contentDetail)
  return {
    byId,
    allIds,
    status
  }

  // var x = dataIn

  // console.log('x.company==>', x.company)
  // console.log('p==>', p)
  // var co = merge(x.company, p)
  // console.log('co==>', co)
  // var mapAttrs = pipe(map((x) => {
  //   // console.log('xxx=>', x)
  //   var p = pick(['id'], x)
  //   // console.log('p=>', p)
  //   // console.log('x.company=>', x.company)
  //   var m = merge(x.company, p)
  //   // console.log('m=>', m)
  //   return m
  // }))
  // var mapAttrs = pipe(x => {
  //   // var p = pick(['id'], x)
  //   // var m = merge(x.company, p)
  //   // return m
  //   if (!isNil(obj)) return pick(obj, x)
  //   else return x
  // })
  // var mapAttrs = pipe((x) => {
  //   var p = pick(['id'], x)
  //   var m = merge(x.company, p)
  //   return m
  // }, path(['catchPhrase']))
  // var mapAttrs = pipe(
  //   map(x => merge(x.company, pick(['id'], x))),
  //   path(['data'])
  // )
  // return mapAttrs(dataIn)
  // var mapAttrs = pipe(merge(x.company, pick(['id'], x)))
  // return mapAttrs(dataIn)
  // var r = mapAttrs(dataIn)
  // console.log('r=>=====>', r)
  // return r
}

function updateMulti (singleIn, multiIn) {
  // If the key matches, return whats in Single Object,
  // Otherwise, return whats in multi
  return map(x => (x.id === singleIn.id ? singleIn : x), multiIn)
}

function insertMulti (singleIn, multiIn) {
  var newList = pipe(
    prepend(singleIn),
    sortBy(
      compose(
        toLower,
        prop('name')
      )
    )
  )
  return newList(multiIn)
}

export {
  getAttributes,
  mapAttributes,
  updateMulti,
  insertMulti,
  getEntity,
  getEntityCollection,
  getEntityBatch
}
