import React, {Component} from 'react';
import { View, Text, StyleSheet, Button,SafeAreaView,
  ScrollView,TextInput,TouchableOpacity} from 'react-native';
import {Header, Left, Right} from 'native-base';
import { List, Checkbox } from 'react-native-paper';
import Icon  from "../components/icons.js";

import {Ionicons,Entypo,
        MaterialCommunityIcons,
        SimpleLineIcons,AntDesign} from "@expo/vector-icons";
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {logout} from '../actions/user.js'
import firebase from 'firebase';
import styles from '../styles.js'
import { Chevron } from 'react-native-shapes';
import Accordian from '../components/Acordian.js'
class SettingScreen extends Component{

  static navigationOptions = {
    drawerIcon : ({tintColor}) => (
       <Icon.FontAwesome name= "cogs" style = {{fontSize:24, color:tintColor}}/>
    )
  }
  state = {
  expanded: true
};

_handlePress = () =>
  this.setState({
    expanded: !this.state.expanded
  });

  logout = () => {
    firebase.auth().signOut()
    this.props.logout()
    this.props.navigation.navigate('Login')
  }

  render(){

    const optionContainer = [localstyles.rowcontainer]
    return(
      <SafeAreaView >
   <ScrollView showsVerticalScrollIndicator={false}>

          <Icon.FontAwesome name = "bars" style = {styles.menuIcon} size ={24} onPress={ () => this.props.navigation.openDrawer()}   />

          <View style = {{marginBottom:50}} />

          <Accordian/>

          <TouchableOpacity onPress = {()=> this.logout()} style = {localstyles.rowcontainer}>
            <SimpleLineIcons name= "logout" style = {localstyles.optionlogo}/>
            <Text style = {localstyles.optiontextTitle}>logout </Text>
          </TouchableOpacity>

          <TouchableOpacity  style = {localstyles.rowcontainer}>
            <AntDesign name= "edit" style = {localstyles.optionlogo}/>
            <Text style = {localstyles.optiontextTitle}>Username </Text>
          </TouchableOpacity>

          <TouchableOpacity  style = {localstyles.rowcontainer}>
            <AntDesign name= "edit" style = {localstyles.optionlogo}/>
            <Text style = {localstyles.optiontextTitle}>Email </Text>
          </TouchableOpacity>

          <TouchableOpacity  style = {localstyles.rowcontainer}>
            <AntDesign name= "edit" style = {localstyles.optionlogo}/>
            <Text style = {localstyles.optiontextTitle}>Password </Text>
          </TouchableOpacity>

          <TouchableOpacity  style = {localstyles.rowcontainer}>
            <MaterialCommunityIcons name= "calendar-edit" style = {localstyles.optionlogo}/>
            <Text style = {localstyles.optiontextTitle}>Birthday </Text>
          </TouchableOpacity>

          <TouchableOpacity  style = {localstyles.rowcontainer}>
            <MaterialCommunityIcons name= "credit-card-multiple" style = {localstyles.optionlogo}/>
            <Text style = {localstyles.optiontextTitle}>Payment </Text>
          </TouchableOpacity>



      </ScrollView>
  </SafeAreaView>
    );
  }
}

const localstyles = StyleSheet.create({
  optionlogo:{
    fontSize:30,
  },
  rowcontainer:{
    marginTop:15,
    marginLeft:15,
    flexDirection: 'row',
    alignItems:'center',

  },
  optiontoggle:{
    marginRight:10,

  },
  optionContainer:{
    paddingVertical:10
  },
  container:{
    marginTop:15,
    marginLeft:15,
    paddingHorizontal:10
  },
  optiontextTitle:{
    fontSize:20,
    paddingHorizontal:10,
    marginLeft:20,
  },
  option:{
    fontSize:20
  }
});
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({logout},dispatch)
  }
  const mapStateToProps = (state) => {
    return {
      user:state.user
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(SettingScreen)
