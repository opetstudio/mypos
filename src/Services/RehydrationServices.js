import ReduxPersist from '../Config/ReduxPersist'
import LocalForage from 'localforage'
import { persistStore } from 'redux-persist'
import StartupActions from '../Redux/StartupRedux'
import DebugConfig from '../Config/DebugConfig'

const updateReducers = store => {
  const reducerVersion = ReduxPersist.reducerVersion
  const config = ReduxPersist.storeConfig
  const startup = () => store.dispatch(StartupActions.startup())

  // Check to ensure latest reducer version
  const setPersistStore = () =>
    new Promise(resolve => {
      LocalForage.getItem('reducerVersion')
        .then(localVersion => {
          if (localVersion !== reducerVersion) {
            if (DebugConfig.useReactotron) {
              console.tron.display({
                name: 'PURGE',
                value: {
                  'Old Version:': localVersion,
                  'New Version:': reducerVersion
                },
                preview: 'Reducer Version Change Detected',
                important: true
              })
            } else {
              // console.log(
              //  'Reducer Version Change from: ' +
              //    localVersion +
              //    ' to: ' +
              //    reducerVersion
              // )
            }
            // Purge store
            // console.log('do purge')
            // persistStore(store, config, startup).purge()
            resolve(persistStore(store, null, startup).purge())
            LocalForage.setItem('reducerVersion', reducerVersion)
          } else {
            // console.log('dont purge')
            resolve(persistStore(store, null, startup))
            // persistStore(store, config, startup)
          }
        })
        .catch(() => {
          resolve(persistStore(store, null, startup))
          // persistStore(store, config, startup)
          LocalForage.setItem('reducerVersion', reducerVersion)
        })
    })
  // var r
  // r = await setPersistStore()
  // const doit = async () => {
  //   r = await setPersistStore()
  //   console.log('rrr===>', r)
  //   // return result
  // }
  // // setPersistStore().then(resp => resp)
  // // return setPersistStore().then(resp => resp)
  // return doit()
  // const cek = await setPersistStore().then(r => { console.log('rrrr===>', r); return r })
  // return await setPersistStore().then(r => r)
  // return cek
  // await doit()
  // return r
  // return r
  setPersistStore().then(r => r)
}

export default { updateReducers }
