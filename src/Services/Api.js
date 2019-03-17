// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import { merge } from 'ramda'
import ApiElectron from '../Services/ApiElectron'

// our "constructor"
const create = (baseURL = 'https://jsonplaceholder.typicode.com/') => {
  // console.log('create API===>>>?>>><<<>><><><>')
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const API_REMOTE = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      // 'Cache-Control': 'no-cache',
      // 'Accept': '*/*',
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded'
      // 'Access-Control-Allow-Origin': 'origin'
      // 'tesss': 'ok'
      // 'Access-Control-Request-Method': 'POST'
      // 'Access-Control-Allow-Credentials': 'true',
      // 'content-type': 'application/x-www-form-urlencoded'
      // accept: 'application/vnd.api+json',
      // 'content-type': 'application/vnd.api+json'
      // 'Access-Control-Expose-Headers': 'X-My-Custom-Header, X-Another-Custom-Header'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  // Define API Constants

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  // console.log(api.getBaseURL())
  API_REMOTE.setHeader('channelid', 'WEB')
  let api = API_REMOTE

  let ipcRenderer = {
    send: () => {},
    on: () => {}
  }

  let server = ''
  // let neDBDataPath = ''

  if (window.require) {
    // console.log('require adaaaaa')
    ipcRenderer = window.require('electron').ipcRenderer
    server = 'electron'
  } else {
    console.log('require tidak adaaaaa')
  }
  api = (server === 'electron') ? new ApiElectron(ipcRenderer) : API_REMOTE

  let apiMerged = {}
  // merge api

    // begin Ignite-Entity-Event
    apiMerged = merge(apiMerged, require('../Containers/Event/api').create(api))
    // end Ignite-Entity-Event
    // begin Ignite-Entity-Product
    apiMerged = merge(apiMerged, require('../Containers/Product/api').create(api))
    // end Ignite-Entity-Product
    

    // begin Ignite-Entity-Albumgallery
    apiMerged = merge(apiMerged, require('../Containers/Albumgallery/api').create(api))
    // end Ignite-Entity-Albumgallery
    // begin Ignite-Entity-Album
    apiMerged = merge(apiMerged, require('../Containers/Album/api').create(api))
    // end Ignite-Entity-Album
    
    // begin Ignite-Entity-Gallery
    apiMerged = merge(apiMerged, require('../Containers/Gallery/api').create(api))
    // end Ignite-Entity-Gallery

    // begin Ignite-Entity-News
    apiMerged = merge(apiMerged, require('../Containers/News/api').create(api))
    // end Ignite-Entity-News
    

    // begin Ignite-Entity-Userrole
    apiMerged = merge(apiMerged, require('../Containers/Userrole/api').create(api))
    // end Ignite-Entity-Userrole
    

    // begin Ignite-Entity-Pointofsale
    apiMerged = merge(apiMerged, require('../Containers/Pointofsale/api').create(api))
    // end Ignite-Entity-Pointofsale
    

    // begin Ignite-Entity-Role
    apiMerged = merge(apiMerged, require('../Containers/Role/api').create(api))
    // end Ignite-Entity-Role
    

  // begin Ignite-Entity-Filecontent
  apiMerged = merge(
    apiMerged,
    require('../Containers/Filecontent/api').create(api)
  )
  // end Ignite-Entity-Filecontent

  // begin Ignite-Entity-File
  apiMerged = merge(apiMerged, require('../Containers/File/api').create(api))
  // end Ignite-Entity-File

  // begin Ignite-Entity-Participantbadge
  apiMerged = merge(
    apiMerged,
    require('../Containers/Participantbadge/api').create(api)
  )
  // end Ignite-Entity-Participantbadge

  // begin Ignite-Entity-Classparticipant
  apiMerged = merge(
    apiMerged,
    require('../Containers/Classparticipant/api').create(api)
  )
  // end Ignite-Entity-Classparticipant

  // begin Ignite-Entity-Classes
  apiMerged = merge(apiMerged, require('../Containers/Classes/api').create(api))
  // end Ignite-Entity-Classes

  // begin Ignite-Entity-User
  apiMerged = merge(apiMerged, require('../Containers/User/api').create(api))
  // end Ignite-Entity-User

  // begin Ignite-Entity-Participant
  apiMerged = merge(
    apiMerged,
    require('../Containers/Participant/api').create(api)
  )
  // end Ignite-Entity-Participant

  // begin Ignite-Entity-Conference
  apiMerged = merge(
    apiMerged,
    require('../Containers/Conference/api').create(api)
  )
  // end Ignite-Entity-Conference

  // begin Ignite-Entity-Badge
  apiMerged = merge(apiMerged, require('../Containers/Badge/api').create(api))
  // end Ignite-Entity-Badge

  // begin Ignite-Entity-Login
  apiMerged = merge(apiMerged, require('../Containers/Login/api').create(api))
  // end Ignite-Entity-Login

  apiMerged = merge(apiMerged, {})
  return {
    ...apiMerged
  }
}

// let's return back our create method as the default.
export default {
  create
}
