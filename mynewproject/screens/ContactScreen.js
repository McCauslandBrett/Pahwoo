import React, {Component} from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView, SectionList} from 'react-native';
import Icon  from "../components/icons.js";
import {Ionicons} from "@expo/vector-icons";
import styles from '../styles.js'
import {Container,Header, Left, Right, Content, List, ListItem } from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import db from '../config/firebase.js';


function Item({ title }) {
    return (
      <View style={styles.contactsItem}>
        <Text style={styles.contactsTitle}>{title}</Text>
      </View>
    );
}



class ContactScreen extends Component{
    static navigationOptions = {
        drawerIcon : ({tintColor}) => (
        <Icon.FontAwesome name= "address-book" style = {{fontSize:24, color:tintColor}}/>
        )
    }
  
    state = {
        contactData: []
    }
    // when we sort the contacts alphabetically, I will use a hashtable where each key is 
    // a letter of the alpbabet and each value is an array of users that start with that letter
    componentDidMount = async () => {
        let tempData = []
        // for loop with async calls
        for (var i = 0; i < this.props.user.contacts.length; i++){
            const query = await db.collection('users').where('uid', '==', this.props.user.contacts[i]).get()
            query.forEach((response) => {
                tempData.push(response.data())
            })
        }
        console.log(tempData)
        // this.setState({contactData: tempData})
        let newTempData = []
        for (var i = 0; i < tempData.length; i++){
            newTempData.push(
                {
                    title: 'B',
                    data: [tempData[i].username]
                }
            )
            this.setState({contactData: newTempData})
        }
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
        <SafeAreaView style={styles.contactsContainer}>
        <SectionList
            sections={this.state.contactData}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Item title={item} />}
            renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.contactsHeader}>{title}</Text>
            )}
        />
        
        </SafeAreaView>
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
