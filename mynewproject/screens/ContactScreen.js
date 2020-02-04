import React, {Component} from 'react';

// global
import { View, Text, StyleSheet, Button,SafeAreaView,ScrollView} from 'react-native';
import Icon  from "../components/icons.js";
import {Ionicons} from "@expo/vector-icons";
import styles from '../styles.js'

import {Container,Header, Left, Right, Content, List, ListItem } from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';


class ContactScreen extends Component{
  static navigationOptions = {
    drawerIcon : ({tintColor}) => (
      <Icon.FontAwesome name= "address-book" style = {{fontSize:24, color:tintColor}}/>
    )
  }

    render() {
      return (

        <Container>
        <View>
          <Header>
           <Left>
             <Icon.FontAwesome name = "bars" size ={24} onPress={ () => this.props.navigation.openDrawer()}   />
          </Left>
          </Header>
        </View>
          <Content>
            <List>
              <ListItem itemDivider>
                <Text>A</Text>
              </ListItem>
              <ListItem>
                <Text>Aaron Bennet</Text>
              </ListItem>
              <ListItem>
                <Text>Ali Connors</Text>
              </ListItem>
              <ListItem itemDivider>
                <Text>B</Text>
              </ListItem>
              <ListItem>
                <Text>Bradley Horowitz</Text>
              </ListItem>
            </List>
          </Content>
        </Container>
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
export default connect(mapStateToProps,mapDispatchToProps)(ContactScreen)
