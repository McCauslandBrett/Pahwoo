import React, {Component} from 'react';
// global
import { View, Text, StyleSheet, Button,SafeAreaView,ScrollView} from 'react-native';
import {Header, Left, Right} from 'native-base';
import Icon  from "../components/icons.js";
import {Ionicons} from "@expo/vector-icons";
import styles from '../styles.js'

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';



class CardScreen extends Component{

  render(){
    return(
      <View >
      <View>
          <Text> CardScreen</Text>
      </View>
  </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({},dispatch)
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(CardScreen)
