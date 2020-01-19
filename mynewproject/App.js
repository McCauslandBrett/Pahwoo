import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,
         SafeAreaView,ScrollView,Dimensions, Image
} from 'react-native';

// prject files
import HomeScreen from './screens/HomeScreen';
import SettingScreen from './screens/SettingScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

// Redux
import reducer from './reducers'
import AuthStackNavigator from './navigation/AuthStackNavigator';
import AuthSwitchNavigator from './navigation/AuthSwitchNavigator';

//added imports
import { createAppContainer} from 'react-navigation'
import {createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import {createStackNavigator, StackNavigator} from 'react-navigation-stack';

// - Redux
import {createStore,applyMiddleware} from 'redux'
import{Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk';
// import logger from 'redux-logger';

const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer,middleware);
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
       <Provider store={store}>
          <AuthSwitchNavigator/>
        </Provider>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
