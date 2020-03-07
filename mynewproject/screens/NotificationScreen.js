import React, {Component} from 'react';
import { View, Text, StyleSheet,SafeAreaView,ScrollView} from 'react-native';
import {Header, Left, Right} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js";
import {Ionicons} from "@expo/vector-icons";

import styles from '../styles.js'


class NotificationScreen extends Component{
  static navigationOptions = {
    drawerIcon : ({tintColor}) => (
      <Icon.FontAwesome name= "bell" style = {{fontSize:24, color:tintColor}}/>
    )
  }
  render(){
    return(
      <SafeAreaView >
          <ScrollView showsVerticalScrollIndicator={false}>

             <Icon.FontAwesome name = "bars" style = {styles.menuIcon} size ={24} onPress={ () => this.props.navigation.openDrawer()}   />
             <Ionicons name="md-more" size={24} style = {styles.mdmore} />


            <View style = {{marginTop:60, alignItems:"center"}}>
                <Text> NotificationScreen</Text>
                
                
            </View>
      </ScrollView>
      </SafeAreaView>
    );
  }
}
const syles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({},dispatch)
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NotificationScreen)
