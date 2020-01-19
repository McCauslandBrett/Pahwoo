import React, {Component} from 'react';
import { View, Text, StyleSheet,Button} from 'react-native';
import HomeScreen from './HomeScreen';
// dependecies
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateEmail,updatePassword} from '../actions/user.js'

class LoginScreen extends Component{
  static navigationOptions = {
    header:null
  }
  render(){
    return(
      <View style={syles.container}>
        <Text> username</Text>
        <Text> password</Text>
        <Button title ="login" onPress = {()=> this.props.navigation.navigate('SignedIn')} />
        <Text> or </Text>
        <Button title ="SignUp" onPress = {()=> this.props.navigation.navigate('SignUp')} />
      </View>
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
    return bindActionCreators({updateEmail,updatePassword},dispatch)
  }
  const mapStateToProps = (state) => {
    return {
      user:state
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen)
