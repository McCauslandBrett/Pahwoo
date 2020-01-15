import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,
         SafeAreaView,ScrollView,Dimensions, Image
} from 'react-native';
//added imports
import { createAppContainer} from 'react-navigation'
import {createStackNavigator, StackNavigator} from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const AppStackNavigator = createAppContainer(createStackNavigator(
  {
  Login: {screen: LoginScreen},
  SignUp:{screen: SignUpScreen}
}));

export default AppStackNavigator;
