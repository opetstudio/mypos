module.exports = (request, tbName, db, whereCondition, cb) => {
    // console.log('request.body', request.body)
  let pageSize = request.body.pageSize
  let page = request.body.page
  let sorting = {}
  if (request.body.sorted && request.body.sorted.length > 0) {
    let sortBy = request.body.sorted[0].id
    sorting[sortBy] = request.body.sorted[0].desc ? 1 : -1
  }
  let pageCount = 0
  if (request.body.filtered && request.body.filtered.length > 0) {
    request.body.filtered.forEach((filter, k) => {
      var re = new RegExp(filter.value, 'i')
      whereCondition[filter.id] = {$regex: re}
    })
  }
  if (request.body.status && request.body.status !== '') {
    whereCondition.status = request.body.status
  }
  console.log('whereCondition==>', whereCondition)
  db.find(whereCondition).sort(sorting).skip(page * pageSize).limit(pageSize).exec((e2, o2) => {
    //   console.log('====result=', o2)
    if (e2) console.log('error query', e2)
    let resp = []
    if (e2 || !o2) resp = []
    else resp = o2
    db.count(whereCondition, (e3, count) => {
      if (e3) console.log('error query count', e3)
      pageCount = Math.ceil(count / pageSize)
      let response = {
        _embedded: { [tbName]: resp },
        page: request.body.page,
        page_count: pageCount,
        page_size: pageSize,
        total_items: count
      }
      cb(response)
    })
  })
}
