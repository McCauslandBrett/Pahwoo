import React, {Component} from 'react';
import { View, Text,SafeAreaView,ScrollView, StyleSheet,Button} from 'react-native';
import {Header, Left, Right} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js";
import {Ionicons} from "@expo/vector-icons";

import styles from '../styles.js'
// Alright, flow needs to be established, so we can accomplish the most at once
// Do we want to force users to select a card before they edit one? this would make it easy

class CustomCardScreen extends Component{
  static navigationOptions = {
    headerBackTitle: null,
    drawerIcon : ({tintColor}) => (
      <Icon.FontAwesome name= "envelope" style = {{fontSize:24, color:tintColor}}/>
    )
  }
  render(){
    return(
      <SafeAreaView >
          <ScrollView showsVerticalScrollIndicator={false}>
             <Icon.FontAwesome name = "bars" style = {styles.menuIcon} size ={24} onPress={ () => this.props.navigation.openDrawer()}   />
             <Ionicons name="md-more" size={24} style = {styles.mdmore} />
             <View style = {{marginTop:60, alignItems:"center"}}>
                 <Text> CustomCardScreen</Text>
                 <Button title ="Template Cards" onPress = {()=> this.props.navigation.navigate('CardTemplates')} />
                 <Button title ="Cards" onPress = {()=> this.props.navigation.navigate('FreshCards')} />
             </View>
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
    user: state.user
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(CustomCardScreen)
