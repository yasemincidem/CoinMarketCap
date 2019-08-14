import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { Provider } from 'react-redux'
import createStore from './App/Stores/CreateStore'
import AppNavigator from './App/Navigators/AppNavigators'

const { store } = createStore();

export default class App extends Component<*,*> {
  render() {
    return (
      /**
       * @see https://github.com/reduxjs/react-redux/blob/master/docs/api.md#provider-store
       */
      <Provider store={store}>
        {/**
         * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
         * and saved to redux.
         * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
         * for example `loading={<SplashScreen />}`.
         * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
         */}
         <SafeAreaView style={{ flex: 1 }}>
           <AppNavigator />
         </SafeAreaView>
      </Provider>
    )
  }
}
