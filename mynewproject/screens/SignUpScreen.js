import React, {Component} from 'react';
import { View, Text,TextInput,TouchableOpacity} from 'react-native';
// dependecies
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateEmail,updatePassword,updateUsername,updateBirthday, signup, getPushPermissions} from '../actions/user.js'
import styles from '../styles.js'
class SignUpScreen extends Component{
  
  
  signup = async () => {
    await this.props.signup();
    await this.props.getPushPermissions(this.props.user.uid);
    if (this.props.user.uid != null){
        this.props.navigation.navigate('SignedIn');
    }
    
  }
  
  render(){
    return(
      <View style = {styles.container}>
      <TextInput
          style = {styles.border}
          value = {this.props.user.email}
          onChangeText =  {input => this.props.updateEmail(input)}
          placeholder = 'Email'
      />
      <TextInput
          style = {styles.border}
          value = {this.props.user.password}
          onChangeText = {input => this.props.updatePassword(input)}
          placeholder = 'Password'
      />
      <TextInput
          style = {styles.border}
          value = {this.props.user.username}
          onChangeText = {input => this.props.updateUsername(input)}
          placeholder = 'Username'
      />
      <TextInput
          style = {styles.border}
          value = {this.props.user.birthday}
          onChangeText = {input => this.props.updateBirthday(input)}
          placeholder = 'Birthday'
      />
      <TouchableOpacity style ={styles.button} onPress = {()=> this.signup()}>
        <Text> Sign Up </Text>
      </TouchableOpacity>
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({updateEmail, updatePassword, updateUsername, updateBirthday, signup, getPushPermissions}, dispatch)
  }
  const mapStateToProps = (state) => {
    return {
      user:state.user
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(SignUpScreen)
