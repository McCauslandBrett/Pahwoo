import React, { Component } from 'react';
import store from './store';
// import { Platform, StyleSheet, Text, View,
//          SafeAreaView,ScrollView,Dimensions, Image
// } from 'react-native';
import AuthSwitchNavigator from './navigation/AuthSwitchNavigator';

import {Provider} from 'react-redux'

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
// });
import { AppearanceProvider } from 'react-native-appearance';
export default class App extends Component {
  render() {
    return (
       <Provider store={store}>
       <AppearanceProvider>
          <AuthSwitchNavigator/>
       </AppearanceProvider>
        </Provider>
    );
  }
}
