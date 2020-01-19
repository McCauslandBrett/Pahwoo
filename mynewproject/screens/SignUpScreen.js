import React, {Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';
// dependecies
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateEmail,updatePassword,updateUsername,updateBirthday} from '../actions/user.js'
class SignUpScreen extends Component{
  render(){
    return(
      <View style={syles.container}>
        <Text> SignUpScreen</Text>
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({updateEmail,updatePassword,updateUsername,updateBirthday},dispatch)
  }
  const mapStateToProps = (state) => {
    return {
      user:state
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(SignUpScreen)

const syles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
});
