import React, {Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {Header, Left, Right, Icon} from 'native-base';
class SettingScreen extends Component{
  static navigationOptions = {
    drawerIcon : ({tintColor}) => (
      <Icon name= 'settings' style = {{fontSize:24, color:tintColor}}/>
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
          <Text> SettingScreen</Text>
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
export default SettingScreen;
