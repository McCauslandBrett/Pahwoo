import React, {Component} from 'react';
import { View, Text,SafeAreaView, FlatList,ScrollView, Modal, TouchableOpacity, Image} from 'react-native';
import { connect } from 'react-redux';
import {Container,Header, Left} from 'native-base';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js";
import {Ionicons} from "@expo/vector-icons";
import db from '../config/firebase.js';

import styles from '../styles.js'


class NotificationScreen extends Component{
    state = {
        potentialFriends: [],
        friendRequestModal: false
    }
    
    componentDidMount = async () => {
        let tempData = []
        // for loop with async calls
        for (var i = 0; i < this.props.user.requests.length; i++){
            const query = await db.collection('users').where('uid', '==', this.props.user.requests[i].requestingUser).get()
            query.forEach((response) => {
                tempData.push(response.data())
            })
        }

        // at this point I have an array of user objects from the current user's contact array

        tempData.sort((a, b) => (a.username > b.username) ? 1 : -1)
        this.setState({potentialFriends: tempData})
        console.log(this.state.potentialFriends);
    }
    
    onSelect = (profileName) => {
        this.setState({friendRequestModal: true});
        

    }
    
    static navigationOptions = {
        drawerIcon : ({tintColor}) => (
        <Icon.FontAwesome name= "bell" style = {{fontSize:24, color:tintColor}}/>
        )
    }
    
    setModalVisible = (visible) => {
        this.setState({friendRequestModal: visible});
      }
    
  render(){
    return(
      <Container>
            <View>
                <Header>
                    <Left>
                        <Icon.FontAwesome name = "bars" size ={24} onPress={ () => this.props.navigation.openDrawer()}/>
                    </Left>
                </Header>
            </View>
            
            <SafeAreaView style={styles.contactsContainer}>
                <FlatList
                    data={this.state.potentialFriends}
                    renderItem={({ item }) => (
                        <Item
                            username={item.username}
                            profileImage={item.profileImage}
                            onSelect={this.onSelect}
                        />
                    )}
                    keyExtractor={item => item.uid}
                />
                
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.friendRequestModal}
                    onRequestClose={() => {
                    alert('Modal has been closed.');
                }}>
                    <SafeAreaView>
                        <Text>inside modal</Text>
                        <TouchableOpacity style={styles.button}
                            onPress={() => {
                            this.setModalVisible(!this.state.friendRequestModal);
                            }}>
                            <Text>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => {
                            this.setModalVisible(!this.state.friendRequestModal);
                            }}>
                            <Text>Deny</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </Modal> 
            </SafeAreaView>
      </Container>
    );
  }
}

function Item({username, profileImage, onSelect}) {
    return (
        <TouchableOpacity
            style={styles.list}
            onPress={() => onSelect(username)}
        >
            <Image
                source={{ uri: profileImage }}
                style={styles.thumbnailRoundImage}
            />
            <Text style={styles.thumbnailBold}>{username} </Text>
            <Text style={styles.thumbnailGray}>wants to connect :) </Text>
        </TouchableOpacity>
    );
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({},dispatch)
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NotificationScreen)
