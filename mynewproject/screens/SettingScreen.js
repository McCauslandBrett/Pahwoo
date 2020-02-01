import React, {Component} from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import {Header, Left, Right, Icon} from 'native-base';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {logout} from '../actions/user.js'
import firebase from 'firebase';
class SettingScreen extends Component{
  static navigationOptions = {
    drawerIcon : ({tintColor}) => (
      <Icon name= 'settings' style = {{fontSize:24, color:tintColor}}/>
    )
  }
  
  logout = () => {
    firebase.auth().signOut()
    this.props.logout()
    this.props.navigation.navigate('Login')
  }
  
  render(){
    return(
      <View >
        <Header>
          <Left>
             <Icon name = "menu" onPress={ () => this.props.navigation.openDrawer()}   />
          </Left>
        </Header>

      <View>
          <Text> SettingScreen</Text>
          <Button title ="logout" onPress = {()=> this.logout()} />
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
    return bindActionCreators({logout},dispatch)
  }
  const mapStateToProps = (state) => {
    return {
      user:state.user
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(SettingScreen)
