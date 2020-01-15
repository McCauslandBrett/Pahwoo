import React, {Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';

class SignUpScreen extends Component{
  render(){
    return(
      <View style={syles.container}>
        <Text> SignUpScreen</Text>
      </View>
    );
  }
}
export default SignUpScreen;

const syles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
});
