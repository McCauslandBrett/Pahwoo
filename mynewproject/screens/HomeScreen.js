import React, {Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {Header, Left, Right, Icon} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class HomeScreen extends Component{
  static navigationOptions = {
    drawerIcon : ({tintColor}) => (
      <Icon name= "home" style = {{fontSize:24, color:tintColor}}/>
    )
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
          <Text> HomeScreen</Text>
          <Text> {this.props.user.username}</Text>
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
