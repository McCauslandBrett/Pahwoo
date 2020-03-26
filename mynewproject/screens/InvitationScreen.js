import React, {Component} from 'react';
import { View, Text,SafeAreaView,ScrollView,
   StyleSheet,Button} from 'react-native';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js";
import {Ionicons,AntDesign} from "@expo/vector-icons";

import styles from '../styles.js'

class InvitationScreen extends Component{
  static navigationOptions = {
      headerBackTitle: null,
  }
  render(){
    return(
      <SafeAreaView >
          <ScrollView showsVerticalScrollIndicator={false}>
             <View style = {{marginTop:60, alignItems:"center"}}>
                 <Text> Invitations Screen</Text>
                 <Button
                 onPress={()=> this.props.navigation.navigate('Invite')}
                 title="Invite"

                 />
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
export default connect(mapStateToProps,mapDispatchToProps)(InvitationScreen)
