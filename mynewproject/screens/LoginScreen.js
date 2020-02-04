import React, {Component} from 'react';
import { View, Text, StyleSheet,Button,TextInput} from 'react-native';
import HomeScreen from './HomeScreen';
// dependecies
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateEmail,updatePassword,login, getUser} from '../actions/user.js'
import firebase from 'firebase';


class LoginScreen extends Component{
    // no header since we show the drawer navigation
    static navigationOptions = {
    header:null
  }
  
  // Function called when component loads/reloads
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.props.getUser(user.uid)
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
       />
       <TextInput
          style = {styles.border} // remove when updating global styling if you with
          value = {this.props.user.password}
          onChangeText = {input => this.props.updatePassword(input)}
          placeholder = 'Password'
          secureTextEntry={true}
        />
        <Button title ="Login" onPress = {()=> this.login()} />
        <Text> or </Text>
        <Button title ="Sign Up" onPress = {()=> this.props.navigation.navigate('SignUp')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  border: { // used above
    width: '85%',
    margin: 10,
    padding:15,
    fontSize:16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign:'center'
  }
});


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({updateEmail, updatePassword, login, getUser},dispatch)
  }
  const mapStateToProps = (state) => {
    return {
      user:state.user
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen)
