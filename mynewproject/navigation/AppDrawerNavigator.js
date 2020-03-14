import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,
         SafeAreaView,ScrollView,Dimensions, Image
} from 'react-native';


//added imports
import { createAppContainer} from 'react-navigation'
import {createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import {createStackNavigator, StackNavigator} from 'react-navigation-stack';
// prject files
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

import CustomCardScreen from '../screens/CustomCardScreen';
import ContactScreen from '../screens/ContactScreen';
import CardScreen from '../screens/CardScreen';
import InvitationScreen from '../screens/InvitationScreen';
import TemplateCardScreen from '../screens/TemplateCardScreen';
import FreshCardScreen from '../screens/FreshCardScreen';
import GiftCardScreen from '../screens/GiftCardScreen';
import NotificationScreen from '../screens/NotificationScreen';
import EventScreen from '../screens/EventScreen';
import SearchScreen from '../screens/SearchScreen';
import { SocialIcon } from 'react-native-elements'
import { Block } from "galio-framework";
const CustomDrawerComponent = (props) => (
  <SafeAreaView style = {{flex: 1}}>
    <View style = {{height:150,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
    <Image source ={require('../assets/elephant.png')} style = {{height:120,width:120,borderRadius:60}}/>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
      </ScrollView>
      <Block row center space="between">
            <Block flex middle left>
              <SocialIcon type='twitter'/>
            </Block>
            <Block flex middle center>
              <SocialIcon type='instagram'/>
            </Block>
            <Block flex middle right>
              <SocialIcon type='facebook'/>
            </Block>

        </Block>


  </SafeAreaView>
)

const AppDrawerNavigator = createAppContainer(createDrawerNavigator(
  {
    Home:HomeScreen,
    Settings:SettingScreen,
    Gifts: GiftCardScreen,
    Notifications:NotificationScreen,
    Personalize: CustomCardScreen,
    Contacts:ContactScreen
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

const ProjStackNavigator = createAppContainer(createStackNavigator(
  {
    AppDrawerNavigator:{
      screen:AppDrawerNavigator,
      navigationOptions: () => ({
        header:null,
      }),
    },
    Events:EventScreen,
    Cards:CardScreen,
    Invitations:InvitationScreen,
    CardTemplates:TemplateCardScreen,
    FreshCards: FreshCardScreen,
    Search: SearchScreen
},
{
  initialRouteName:"AppDrawerNavigator",
}
));

export default ProjStackNavigator;
