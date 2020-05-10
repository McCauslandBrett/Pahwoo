import React, {Component} from 'react';
import { View, StyleSheet,
  SafeAreaView,ScrollView,Dimensions} from 'react-native';
import {Header, Left, Right} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js";
import {Ionicons} from "@expo/vector-icons";
import styles from '../styles.js'
import { Block,theme,Text} from 'galio-framework';
const { height, width } = Dimensions.get('screen');
import Constants from 'expo-constants';
const { statusBarHeight } = Constants;
class GiftCardScreen extends Component{
  static navigationOptions = {
    drawerIcon : ({tintColor}) => (
        <Icon.FontAwesome name= "gift" style = {{fontSize:24, color:tintColor}}/>
    )
  }
  render(){
    return(
        <Block flex center safe style={{width: width,backgroundColor: this.props.user.theme.BACKGROUND}}>
             <Icon.FontAwesome name = "bars" style = {[styles.menuIcon,{color: this.props.user.theme.ICON}]} size ={24} onPress={ () => this.props.navigation.openDrawer()}   />
             <Ionicons name="md-more" size={24} style = {[styles.mdmore,{color: this.props.user.theme.ICON}]} />
             <ScrollView showsVerticalScrollIndicator={false}>

             <Block middle style = {{marginTop:60, alignItems:"center"}}>
                 <Text color= {this.props.user.theme.TEXT}>GiftCardScreen</Text>
              </Block>
          </ScrollView>
       </Block>
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
export default connect(mapStateToProps,mapDispatchToProps)(GiftCardScreen)
