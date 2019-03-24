import storage from 'redux-persist/lib/storage' // or whatever storage you are using
import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'

// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const REDUX_PERSIST = {
  active: true,
  reducerVersion: '181',
  storeConfig: {
    key: 'root',
    storage: storage, // Come back and replace this at some point
    // storage: 'AsyncStorage', // Come back and replace this at some point
    blacklist: ['search', 'album', 'gallery', 'albumgallery', 'event'], // reducer keys that you do NOT want stored to persistence here
    // whitelist: [], Optionally, just specify the keys you DO want stored to
    // persistence. An empty array means 'don't store any reducers' -> infinitered/ignite#409
    transforms: [immutablePersistenceTransform]
  }
}

export default REDUX_PERSIST
