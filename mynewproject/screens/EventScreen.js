import React, {Component} from 'react';
import { View, Text,SafeAreaView,ScrollView, StyleSheet,Button} from 'react-native';
import {Header, Left, Right} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js";
import {Ionicons,AntDesign} from "@expo/vector-icons";
import {uploadImage} from '../actions/event.js'

class EventScreen extends Component{
  static navigationOptions = {
      headerBackTitle: null,
    drawerIcon : ({tintColor}) => (
      <Icon.FontAwesome name= "spoon" style = {{fontSize:24, color:tintColor}}/>
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
      <SafeAreaView >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Icon.FontAwesome name = "bars" style = {styles.menuIcon} size ={24} onPress={ () => this.props.navigation.openDrawer()}/>
             <AntDesign name="plussquareo" size={24} style = {styles.mdmore} onPress = {()=> this.props.navigation.navigate('Event')}/>
             <View style = {{marginTop:60, alignItems:"center"}}>
                 <Text> EventScreen</Text>
             </View>
      </ScrollView>
    </SafeAreaView>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({uploadImage},dispatch)
}
const mapStateToProps = (state) => {
  return {
    event: state.event
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(EventScreen)
