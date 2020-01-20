import React, {Component} from 'react';
import { View, Text, StyleSheet,TextInput,TouchableOpacity} from 'react-native';
// dependecies
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateEmail,updatePassword,updateUsername,updateBirthday} from '../actions/user.js'
class SignUpScreen extends Component{
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
      <TouchableOpacity style ={styles.button} onPress = {()=> this.props.navigation.navigate('SignedIn')}>
        <Text> SignUp </Text>
      </TouchableOpacity>
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({updateEmail,updatePassword,updateUsername,updateBirthday},dispatch)
  }
  const mapStateToProps = (state) => {
    return {
      user:state.user
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(SignUpScreen)

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  border: {
    width: '85%',
    margin: 10,
    padding:15,
    fontSize:16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign:'center'
  },
});
