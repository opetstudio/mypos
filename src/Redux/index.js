import { combineReducers } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import CreateStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({

    // begin Ignite-Entity-Product
    product: require('../Containers/Product/redux').reducer,
    // end Ignite-Entity-Product
    

    // begin Ignite-Entity-Albumgallery
    albumgallery: require('../Containers/Albumgallery/redux').reducer,
    // end Ignite-Entity-Albumgallery
    // begin Ignite-Entity-Album
    album: require('../Containers/Album/redux').reducer,
    // end Ignite-Entity-Album
    
    // begin Ignite-Entity-Gallery
    gallery: require('../Containers/Gallery/redux').reducer,
    // end Ignite-Entity-Gallery
    
    // begin Ignite-Entity-News
    news: require('../Containers/News/redux').reducer,
    // end Ignite-Entity-News
    

    // begin Ignite-Entity-Article
    article: require('../Containers/Article/redux').reducer,
    // end Ignite-Entity-Article
    

    // begin Ignite-Entity-Event
    event: require('../Containers/Event/redux').reducer,
    // end Ignite-Entity-Event
    

    // begin Ignite-Entity-Userrole
    userrole: require('../Containers/Userrole/redux').reducer,
    // end Ignite-Entity-Userrole
    

    // begin Ignite-Entity-Pointofsale
    pointofsale: require('../Containers/Pointofsale/redux').reducer,
    // end Ignite-Entity-Pointofsale
    

    // begin Ignite-Entity-Role
    role: require('../Containers/Role/redux').reducer,
    // end Ignite-Entity-Role
    
    // begin Ignite-Entity-Filecontent
    filecontent: require('../Containers/Filecontent/redux').reducer,
    // end Ignite-Entity-Filecontent

    // begin Ignite-Entity-File
    file: require('../Containers/File/redux').reducer,
    // end Ignite-Entity-File

    // begin Ignite-Entity-Participantbadge
    participantbadge: require('../Containers/Participantbadge/redux').reducer,
    // end Ignite-Entity-Participantbadge

    // begin Ignite-Entity-Classparticipant
    classparticipant: require('../Containers/Classparticipant/redux').reducer,
    // end Ignite-Entity-Classparticipant

    // begin Ignite-Entity-Classes
    classes: require('../Containers/Classes/redux').reducer,
    // end Ignite-Entity-Classes

    // begin Ignite-Entity-User
    user: require('../Containers/User/redux').reducer,
    // end Ignite-Entity-User

    // begin Ignite-Entity-Participant
    participant: require('../Containers/Participant/redux').reducer,
    // end Ignite-Entity-Participant

    // begin Ignite-Entity-Conference
    conference: require('../Containers/Conference/redux').reducer,
    // end Ignite-Entity-Conference

    // begin Ignite-Entity-Badge
    badge: require('../Containers/Badge/redux').reducer,
    // end Ignite-Entity-Badge

    // begin Ignite-Entity-Login
    login: require('../Containers/Login/redux').reducer,
    // end Ignite-Entity-Login

    home: require('./HomeRedux').reducer
  })
  let finalReducers = rootReducer

  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, rootReducer)
  }
  const store = CreateStore(finalReducers, rootSaga)
  return { store }

  // return configureStore(finalReducers, rootSaga)
}
