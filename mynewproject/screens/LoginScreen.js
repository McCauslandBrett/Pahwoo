import React, {Component} from 'react';
import { View, Text,Button,TextInput} from 'react-native';
import HomeScreen from './HomeScreen';
// dependecies
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateEmail,updatePassword,login, getUser} from '../actions/user.js'
import firebase from 'firebase';
import styles from '../styles.js'

class LoginScreen extends Component{
    // no header since we show the drawer navigation
    static navigationOptions = {
    header:null
  }

  // Function called when component loads/reloads
  componentDidMount = async () => {
    firebase.auth().onAuthStateChanged( async (user)=>{
      if(user){
        await this.props.getUser(user.uid)
        if(this.props.user != null){
            this.props.navigation.navigate('SignedIn')
        }
      }
    })
  }


  login = () => {
    this.props.login()
  }

  render(){
    return(
      <View style={styles.container}>
      <TextInput
          style = {styles.border} // remove when updating global styling if you with
          value = {this.props.user.email}
          onChangeText = {input => this.props.updateEmail(input)}
          placeholder = 'Email'
          placeholderTextColor= 'gray'
       />
       <TextInput
          style = {styles.border} // remove when updating global styling if you with
          value = {this.props.user.password}
          onChangeText = {input => this.props.updatePassword(input)}
          placeholder = 'Password'
          placeholderTextColor= 'gray'
          secureTextEntry={true}
        />
        <Button title ="Login" onPress = {()=> this.login()} />
        <Text> or </Text>
        <Button title ="Sign Up" onPress = {()=> this.props.navigation.navigate('SignUp')} />
      </View>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({updateEmail, updatePassword, login, getUser},dispatch)
  }
  const mapStateToProps = (state) => {
    return {
      user:state.user
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen)
