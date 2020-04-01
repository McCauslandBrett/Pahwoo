import React, {Component} from 'react';
import { View, Text, StyleSheet,SafeAreaView,
        ScrollView,TextInput,TouchableOpacity,
        Animated, Dimensions,Modal,TouchableHighlight,
        Alert,

        } from 'react-native';
import {Header, Left, Right} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js";
import {Ionicons,AntDesign,Entypo} from "@expo/vector-icons";
import styles from '../styles.js'
import { width, height, totalSize } from 'react-native-dimension';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Appearance, useColorScheme } from 'react-native-appearance';
import PropTypes from 'prop-types';

class SelectDateTimeModal extends Component{
  state = {
    date: new Date(),
  }


  render(){
  const { date } = this.state;

  return(
    <View style={{  justifyContent: 'center', alignItems:'center', flex:1}}>

      <Modal animationType = {'slide'}
             transparent = {true}
             visible = {this.props.show === true}>

          <View style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
              <View style={{ width: '100%', height: '100%', backgroundColor: 'black', opacity: .6 }}/>
              <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'white', flex: 1}}>

                 <AntDesign name="close" style = {styles.menuIcon} size ={24} onPress={() => {this.props.setShow(false)}}/>
                 {
                   <DateTimePicker
                         value={ date }
                         mode='default'
                         display='default'
                         onChange={ date => this.setState({ date }) } />
                         
  }

            </View>
          </View>
      </Modal>
      </View>
    );
  }
  }
  const localstyles = StyleSheet.create({

});
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({},dispatch)
  }
  const mapStateToProps = (state) => {
    return {

     card: state.card,
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(SelectDateTimeModal)
