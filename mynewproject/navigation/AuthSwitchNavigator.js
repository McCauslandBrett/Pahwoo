import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,
         SafeAreaView,ScrollView,Dimensions, Image
} from 'react-native';
//added imports
import { createAppContainer,createSwitchNavigator} from 'react-navigation'
// import {createSwitchNavigator} from 'react-navigation-switch';

import AuthStackNavigator from './AuthStackNavigator';
import ProjStackNavigator from './AppDrawerNavigator'

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const AuthSwitchNavigator = createAppContainer(createSwitchNavigator(
  {
  Auth: {screen: AuthStackNavigator},
  SignedIn:{screen: ProjStackNavigator},

}));

export default AuthSwitchNavigator;
