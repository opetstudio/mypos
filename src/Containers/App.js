import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import ReduxPersist from '../Config/ReduxPersist'

// create our store
const { store } = createStore()

/**
 * Provides an entry point into our application.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 */
class App extends Component {
  render () {
    // if (ReduxPersist.active) {
    //   return (
    //     <Provider store={store}>
    //       <PersistGate loading={null} persistor={persistor}>
    //         <RootContainer />
    //       </PersistGate>
    //     </Provider>
    //   )
    // }
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

export default App
