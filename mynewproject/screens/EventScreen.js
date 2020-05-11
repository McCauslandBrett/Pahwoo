import React, {Component} from 'react';
import { View,SafeAreaView,ScrollView,
  StyleSheet,Button,Dimensions} from 'react-native';
import {Header, Left, Right} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
// import Icon  from "../components/icons.js";
import {Ionicons,AntDesign} from "@expo/vector-icons";
import {uploadImage} from '../actions/event.js'
import { Card,Block,theme,Text,NavBar,Icon} from 'galio-framework';
const { height, width } = Dimensions.get('screen');
import Constants from 'expo-constants';

class EventScreen extends Component{
  static navigationOptions = {
      headerBackTitle: null,
    drawerIcon : ({tintColor}) => (
      <Icon family="MaterialIcons" name= "event" style = {{fontSize:24, color:tintColor}}/>
    )
  }
  _pickImage = async () => {
    console.log("_pickImage")
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
      else {
        let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
           this.props.uploadImage(result.uri)
        }
      }
  };
  render(){
    return(
    <Block flex center safe style={{width: width,backgroundColor: this.props.user.theme.BACKGROUND}}>

        
        <Icon name="menu" family="feather"  style = {[styles.menuIcon,{color: this.props.user.theme.ICON}]} size ={24} onPress={ () => this.props.navigation.openDrawer()}/>
        <Icon family="AntDesign" name="plussquareo" size={24} style = {[styles.topRightBtn,{color: this.props.user.theme.ICON}]} onPress = {()=> this.props.navigation.navigate('Event')}/>

          <ScrollView showsVerticalScrollIndicator={false}>

             <Block middle style = {{marginTop:60}}>
                 <Text style = {{color: this.props.user.theme.TEXT}}> EventScreen</Text>
             </Block>
      </ScrollView>
    </Block>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({uploadImage},dispatch)
}
const mapStateToProps = (state) => {
  return {
    user:state.user,
    event: state.event
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(EventScreen)
