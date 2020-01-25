import React, {Component} from 'react';
import { View, Text, StyleSheet,Button} from 'react-native';
import {Header, Left, Right} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js"

class HomeScreen extends Component{
  static navigationOptions = {
    drawerIcon : ({tintColor}) => (
      <Icon.FontAwesome name= "home" style = {{fontSize:24, color:tintColor}}/>
    )
  }
  render(){
    return(
      <View >
        <Header>
          <Left>
             <Icon.FontAwesome name = "bars" size = {24} onPress={ () => this.props.navigation.openDrawer()}   />
          </Left>
        </Header>

      <View>
          <Text> HomeScreen</Text>
          <Button title ="Events" onPress = {()=> this.props.navigation.navigate('Events')} />
          <Button title ="Cards" onPress = {()=> this.props.navigation.navigate('Cards')} />
          <Button title ="Invitations" onPress = {()=> this.props.navigation.navigate('Invitations')} />
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
  export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen)
