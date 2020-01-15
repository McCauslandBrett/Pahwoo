import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,
         SafeAreaView,ScrollView,Dimensions, Image
} from 'react-native';


//added imports
import { createAppContainer} from 'react-navigation'
import {createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import {createStackNavigator, StackNavigator} from 'react-navigation-stack';

// prject files
import HomeScreen from './screens/HomeScreen';
import SettingScreen from './screens/SettingScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

import AuthStackNavigator from './navigation/AuthStackNavigator';
import AuthSwitchNavigator from './navigation/AuthSwitchNavigator';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (

    <AuthSwitchNavigator/>
    // <AppDrawerNavigator/>
    );
  }
}


const CustomDrawerComponent = (props) => (
  <SafeAreaView style = {{flex: 1}}>
    <View style = {{height:150,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
    <Image source ={require('./assets/elephant.png')}style = {{height:120,width:120,borderRadius:60}}/>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

const AppDrawerNavigator = createAppContainer(createDrawerNavigator(
  {
    Home:HomeScreen,
    Settings:SettingScreen
  },
  {
    contentComponent:CustomDrawerComponent,
    contentOptions:{
      activeTintColor:'blue'
    }
  },
  {
    initialRouteName:'Home'
  }
))

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
