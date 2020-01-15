import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,
         SafeAreaView,ScrollView,Dimensions, Image
} from 'react-native';


//added imports
import { createAppContainer} from 'react-navigation'
import {createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';

// prject files
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const CustomDrawerComponent = (props) => (
  <SafeAreaView style = {{flex: 1}}>
    <View style = {{height:150,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
    <Image source ={require('../assets/elephant.png')} style = {{height:120,width:120,borderRadius:60}}/>
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
export default AppDrawerNavigator;
