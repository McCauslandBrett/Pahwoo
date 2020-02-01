import React, {Component} from 'react';
import { View, Text, StyleSheet,Button,TextInput} from 'react-native';
import HomeScreen from './HomeScreen';
// dependecies
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateEmail,updatePassword,login} from '../actions/user.js'
import firebase from 'firebase';

class LoginScreen extends Component{
  static navigationOptions = {
    header:null
  }

  login(){
    this.props.login()
      this.props.navigation.navigate('SignedIn')

    }

  render(){
    return(
      <View style={styles.container}>
      <TextInput
          value = {this.props.user.email}
          onChangeText = {input => this.props.updateEmail(input)}
          placeholder = 'Email'
       />
       <TextInput
          value = {this.props.user.password}
          onChangeText = {input => this.props.updatePassword(input)}
          placeholder = 'password'
        />
        <Button title ="login" onPress = {()=> this.login()} />
        <Text> or </Text>
        <Button title ="SignUp" onPress = {()=> this.props.navigation.navigate('SignUp')} />
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
    return bindActionCreators({updateEmail,updatePassword,login},dispatch)
  }
  const mapStateToProps = (state) => {
    return {
      user:state.user
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen)
