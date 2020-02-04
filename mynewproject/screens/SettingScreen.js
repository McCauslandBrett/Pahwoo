import React, {Component} from 'react';
import { View, Text, StyleSheet, Button,SafeAreaView,ScrollView} from 'react-native';
import {Header, Left, Right} from 'native-base';

import Icon  from "../components/icons.js";
import {Ionicons} from "@expo/vector-icons";

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {logout} from '../actions/user.js'
import firebase from 'firebase';
import styles from '../styles.js'
class SettingScreen extends Component{

  static navigationOptions = {
    drawerIcon : ({tintColor}) => (
       <Icon.FontAwesome name= "cogs" style = {{fontSize:24, color:tintColor}}/>
    )
  }

  logout = () => {
    firebase.auth().signOut()
    this.props.logout()
    this.props.navigation.navigate('Login')
  }

  render(){
    return(
      <SafeAreaView >
   <ScrollView showsVerticalScrollIndicator={false}>

          <Icon.FontAwesome name = "bars" style = {styles.menuIcon} size ={24} onPress={ () => this.props.navigation.openDrawer()}   />
          <Ionicons name="md-more" size={24} style = {styles.mdmore} />


      <View style = {{marginTop:60, alignItems:"center"}}>
          <Text> SettingScreen</Text>
          <Button title ="logout" onPress = {()=> this.logout()} />
      </View>
      </ScrollView>
  </SafeAreaView>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({logout},dispatch)
  }
  const mapStateToProps = (state) => {
    return {
      user:state.user
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(SettingScreen)
