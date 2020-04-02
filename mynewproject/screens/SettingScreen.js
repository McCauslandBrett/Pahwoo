import React, {Component} from 'react';
import { View, Text, StyleSheet, Button,SafeAreaView,
  ScrollView,TextInput} from 'react-native';
import {Header, Left, Right} from 'native-base';
import { List, Checkbox } from 'react-native-paper';
import Icon  from "../components/icons.js";
import {Ionicons} from "@expo/vector-icons";

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {logout} from '../actions/user.js'
import firebase from 'firebase';
import styles from '../styles.js'

class SettingScreen extends Component{

  static navigationOptions = {
    drawerIcon : ({tintColor}) => (
       <Icon.FontAwesome name= "cogs" style = {{fontSize:24, color:tintColor}}/>
    )
  }
  state = {
  expanded: true
};

_handlePress = () =>
  this.setState({
    expanded: !this.state.expanded
  });

  logout = () => {
    firebase.auth().signOut()
    this.props.logout()
    this.props.navigation.navigate('Login')
  }

  render(){


    return(
      <SafeAreaView >
   <ScrollView showsVerticalScrollIndicator={false}>

          <Icon.FontAwesome name = "bars" style = {styles.menuIcon} size ={24} onPress={ () => this.props.navigation.openDrawer()}   />
          <Ionicons name="md-more" size={24} style = {styles.mdmore} />


      <View style = {{marginTop:60, alignItems:"center"}}>


          <View   style = {styles.border}>
            <Button title ="logout" onPress = {()=> this.logout()} />
          </View>
          <List.Section title="Accordions">
              <List.Accordion
                title="Uncontrolled Accordion"
                left={props => <List.Icon {...props} icon="folder" />}
              >
              <List.Item title="First item" />
              <List.Item title="Second item" />
          </List.Accordion>

        <List.Accordion
          title="Controlled Accordion"
          left={props => <List.Icon {...props} icon="folder" />}
          expanded={this.state.expanded}
          onPress={this._handlePress}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </List.Section>

          <View   style = {styles.border}>
            <Text>Hello</Text>
          </View>

          <View   style = {styles.border}>
            <Text>Hello</Text>
          </View>

          <View   style = {styles.border}>
            <Text>Hello</Text>
          </View>

      </View>
      </ScrollView>
  </SafeAreaView>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({logout},dispatch)
  }
  const mapStateToProps = (state) => {
    return {
      user:state.user
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(SettingScreen)
