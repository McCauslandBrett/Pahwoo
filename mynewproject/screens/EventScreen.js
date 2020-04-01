import React, {Component} from 'react';
import { View, Text,SafeAreaView,ScrollView, StyleSheet,Button} from 'react-native';
import {Header, Left, Right} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js";
import {Ionicons,AntDesign} from "@expo/vector-icons";


class EventScreen extends Component{
  static navigationOptions = {
      headerBackTitle: null,
    drawerIcon : ({tintColor}) => (
      <Icon.FontAwesome name= "spoon" style = {{fontSize:24, color:tintColor}}/>
    )
  }
  render(){
    return(
      <SafeAreaView >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Icon.FontAwesome name = "bars" style = {styles.menuIcon} size ={24} onPress={ () => this.props.navigation.openDrawer()}/>
             <AntDesign name="plussquareo" size={24} style = {styles.mdmore} onPress = {()=> this.props.navigation.navigate('Event')}/>
             <View style = {{marginTop:60, alignItems:"center"}}>
                 <Text> EventScreen</Text>
             </View>
      </ScrollView>
    </SafeAreaView>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({},dispatch)
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(EventScreen)
