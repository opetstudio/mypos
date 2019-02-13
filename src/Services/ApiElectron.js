class ApiElectron {
  constructor (ipcRenderer) {
    this.headers = {
      inc: 0,
      channelid: 'ELECTRON'
    }
    this.ipcRenderer = ipcRenderer
    this.neDBDataPath = ''
  }
    postAndGetElectron = (path, data = {}) => new Promise((resolve) => {
      this.ipcRenderer.send(path, {'headers': {...this.headers, neDBDataPath: this.neDBDataPath}, 'body': data})
      this.ipcRenderer.on(path, (event, e, o) => {
        console.log('hitElectron on path=' + path + '|o=', o)
        this.headers.inc = o.headers.inc
        resolve(o.body)
      })
    })
    // static post = this.postAndGetElectron
    // static get = this.postAndGetElectron
    post (path, data = {}) {
      console.log(`post ${path} data=`, data)
      return this.postAndGetElectron(path, data)
    }
    get (path, data = {}) {
      let pathArr = path.split('/')
      if (pathArr.length > 2) {
        path = '/' + pathArr[1]
        data.params = [pathArr[2]]
      }
      console.log(`get ${path} data`, data)
      return this.postAndGetElectron(path, data)
    }
    setHeader (par, val) {
      this.headers = {
        ...this.headers,
        [par]: val
      }
    }
}
export default ApiElectron
