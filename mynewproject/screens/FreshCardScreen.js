import React, {Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {Header, Left, Right} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js";


class FreshCardScreen extends Component{
  static navigationOptions = {
    drawerIcon : ({tintColor}) => (
        <Icon.FontAwesome name= "gift" style = {{fontSize:24, color:tintColor}}/>
    )
  }
  render(){
    return(
      <View >
      <View>
          <Text> Fresh Card Screen </Text>
      </View>
  </View>
    );
  }
}
const styles = StyleSheet.create({
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
export default connect(mapStateToProps,mapDispatchToProps)(FreshCardScreen)
