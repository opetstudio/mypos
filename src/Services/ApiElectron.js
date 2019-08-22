class ApiElectron {
  constructor (ipcRenderer) {
    this.headers = {
      inc: 0,
      channelid: 'ELECTRON'
    }
    this.ipcRenderer = ipcRenderer
    this.neDBDataPath = ''
  }
    postAndGetElectron = (opt) => new Promise((resolve) => {
      const thePackage = {'url': opt.path, 'headers': {...this.headers, neDBDataPath: this.neDBDataPath}, 'body': opt.body, 'params': opt.params}
      console.log('thePackage', thePackage)
      this.ipcRenderer.send(opt.path, thePackage)
      // if (!this.trx[opt.path]) {
      this.ipcRenderer.once(opt.path, (event, e, o) => {
        console.log('hitElectron on path=' + opt.path + '|o=', o)
        this.headers.inc = o.headers.inc
        resolve(o.body)
      })
    })
    // static post = this.postAndGetElectron
    // static get = this.postAndGetElectron
    setupPath (path, method, data, bodyGet) {
      let pathArr = path.split('/')
      let result = ''
      let params = []
      if (pathArr.length > 1) {
        result = '/' + method + '_' + pathArr[1]
        if (pathArr.length > 2) {
          for (var i = 2; i < pathArr.length; i++) {
            params.push(pathArr[i])
          }
        }
      }
      return {
        path: result,
        params,
        body: bodyGet || data
      }
    }
    post (path, data = {}) {
      let spath = this.setupPath(path, 'post', data)
      return this.postAndGetElectron(spath)
    }
    patch (path, data = {}) {
      let spath = this.setupPath(path, 'patch', data)
      return this.postAndGetElectron(spath)
    }
    get (path, data = {}, bodyGet) {
      let spath = this.setupPath(path, 'get', data, bodyGet)
      return this.postAndGetElectron(spath)
    }
    setHeader (par, val) {
      this.headers = {
        ...this.headers,
        [par]: val
      }
    }
}
export default ApiElectron
