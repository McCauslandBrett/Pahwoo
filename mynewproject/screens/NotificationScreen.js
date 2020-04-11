import React, {Component} from 'react';
import { View, Text,SafeAreaView, FlatList,ScrollView, Modal, TouchableOpacity, Image} from 'react-native';
import { connect } from 'react-redux';
import {Container,Header, Left} from 'native-base';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js";
import {Ionicons} from "@expo/vector-icons";
import db from '../config/firebase.js';
import {makeFriends} from '../actions/user.js';
import styles from '../styles.js'


class NotificationScreen extends Component{
    state = {
        potentialFriends: [],
        friendRequestModal: false,
        selectedRequestID: '',
        selectedRequestUsername: ''
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

    static navigationOptions = {
        drawerIcon : ({tintColor}) => (
        <Icon.FontAwesome name= "bell" style = {{fontSize:24, color:tintColor}}/>
        )
    }

    setModalVisible = (visible) => {
        this.setState({friendRequestModal: visible});
    }
    //5HNNtDVc2oRBv0Y5kI7zEVYDFj12
    acceptFriend = async (accepted, newContactID, newContactUsername) => {
        let tempData = []
        await this.props.makeFriends(accepted, newContactID, newContactUsername);
        console.log(this.props.user.requests.length)
        for (var i = 0; i < this.props.user.requests.length; i++){
            const query = await db.collection('users').where('uid', '==', this.props.user.requests[i].requestingUser).get()
            query.forEach((response) => {
                tempData.push(response.data())
            })
        }
        tempData.sort((a, b) => (a.username > b.username) ? 1 : -1)
        this.setState({potentialFriends: tempData})
    }

    onSelect = (username, userID) => {
        this.setState({selectedRequestUsername: username});
        this.setState({selectedRequestID: userID});
        this.setState({friendRequestModal: true});
    }

    render(){
        return(
          <SafeAreaView style={{backgroundColor: this.props.user.theme.BACKGROUND,
                                flex: 1, justifyContent: "center"} }>

                  <Icon.FontAwesome name = "bars" style = {[styles.menuIcon,{color: this.props.user.theme.ICON}]} size ={24} onPress={ () => this.props.navigation.openDrawer()}   />
                    <SafeAreaView style={styles.contactsContainer}>
                        <FlatList
                            data={this.state.potentialFriends}
                            renderItem={({ item }) => (
                                <Item
                                    username={item.username}
                                    profileImage={item.profileImage}
                                    userID={item.uid}
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
                                    onPress= {async () => {
                                        await this.acceptFriend(true, this.state.selectedRequestID, this.state.selectedRequestUsername);
                                        this.setModalVisible(!this.state.friendRequestModal);
                                    }}>
                                    <Text>Accept</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button}
                                    onPress={async () => {
                                        await this.acceptFriend(false, this.state.selectedRequestID, this.state.selectedRequestUsername);
                                        this.setModalVisible(!this.state.friendRequestModal);
                                    }}>
                                    <Text>Deny</Text>
                                </TouchableOpacity>
                            </SafeAreaView>
                        </Modal>
                    </SafeAreaView>
              </SafeAreaView>
        );
    }
}

function Item({username, profileImage, userID, onSelect}) {
    return (
        <TouchableOpacity
            style={styles.list}
            onPress={() => onSelect(username, userID)}
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
  return bindActionCreators({makeFriends},dispatch)
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NotificationScreen)
