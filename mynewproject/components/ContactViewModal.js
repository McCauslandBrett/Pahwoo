import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,
        Modal, TextInput,Animated,TouchableHighlight,
        Alert,ColorPropType,Keyboard,
        Picker,SafeAreaView,ScrollView, FlatList, Image
       } from 'react-native';
import {Header, Left, Right} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js";
import styles from '../styles.js'
// const screenHeight = Dimensions.get("window").height;
import db from '../config/firebase.js';
import {updateCoverText,updateBodyoneText,
        updateBodytwoText,createCard,
        sendCard, saveCard, toggleCoverModal,toggleBodyoneModal, toggleBodytwoModal} from '../actions/card.js'

import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import palette from '../palette.js'

import ToggleSwitch from 'toggle-switch-react-native'
import {Ionicons,AntDesign,Entypo} from "@expo/vector-icons";


class ContactView extends Component{



  state = {
      isModalVisible: false,

  }
  setModalVisible = (visible) => {
    this.setState({isModalVisible: visible});
  }




  render(){
    return(
      <SafeAreaView >
         <ScrollView showsVerticalScrollIndicator={false}>
         <Modal animationType={'slide'} transparent={true} visible={this.isModalVisible === true}>
             <View style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                 <View style={{ width: '100%', height: '100%', backgroundColor: 'black', opacity: .6 }}/>
                 <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'white', flex: 1}}>
                    <AntDesign name="close" style = {styles.menuIcon} size ={24} onPress={() => {this.state.setModalVisible(false)}}   />


            <SafeAreaView style={{flex: 1}}>

            </SafeAreaView>

          </Modal>

         </ScrollView>
      </SafeAreaView>
    );
  }
}




const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({},dispatch)
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    card: state.card,
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ContactView)
