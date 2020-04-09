import React, {Component} from 'react';
import {View, Text, SafeAreaView,ScrollView, FlatList, TouchableOpacity, Image} from 'react-native';
import Icon  from "../components/icons.js";
import styles from '../styles.js'
import {Container,Header, Left} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import db from '../config/firebase.js';
import {getContactProfile} from '../actions/user.js';

import {FriendModal} from '../components/FriendModal.js'
class ContactScreen extends Component{
    static navigationOptions = {
        drawerIcon : ({tintColor}) => (
        <Icon.FontAwesome name= "address-book" style = {{fontSize:24, color:tintColor}}/>
        )
    }

    state = {
        contactData: [],
        modalProfileImage: '',
        modalProfileName: ''
    }

    componentDidMount = async () => {
        this.props.getContactProfile(false);
        let tempData = []
        // for loop with async calls
        for (var i = 0; i < this.props.user.contacts.length; i++){
            const query = await db.collection('users').where('uid', '==', this.props.user.contacts[i]).get()
            query.forEach((response) => {
                tempData.push(response.data())
            })
        }

        // at this point I have an array of user objects from the current user's contact array

        tempData.sort((a, b) => (a.username > b.username) ? 1 : -1)
        this.setState({contactData: tempData})
    }

    onSelect = (profileImage, profileName) => {
        this.setState({modalProfileImage: profileImage});
        this.setState({modalProfileName: profileName});
        this.props.getContactProfile(true);
    }

    displayModal() {
        return (this.props.user.selectedProfileView) ?
            <FriendModal p={this.state.modalProfileImage} o={true} props={this.props} username={this.state.modalProfileName}/>
            : <View></View>;
    }

    render() {

      return (

              <SafeAreaView style={{backgroundColor: this.props.user.theme.BACKGROUND,
                                    flex: 1, justifyContent: "center"} }>

            <Icon.FontAwesome name = "bars" style = {[styles.menuIcon,{color: this.props.user.theme.ICON}]} size ={24} onPress={ () => this.props.navigation.openDrawer()}   />
            <View>{this.displayModal()}</View>
            <SafeAreaView style={styles.contactsContainer}>
                <FlatList
                    data={this.state.contactData}
                    renderItem={({ item }) => (
                        <Item
                            birthday={item.birthday}
                            username={item.username}
                            profileImage={item.profileImage}
                            onSelect={this.onSelect}
                        />
                    )}
                    keyExtractor={item => item.uid}
                />
            </SafeAreaView>

            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Search')}>
                <Text>Search</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
      );
    }
}



function Item({ birthday, username, profileImage, onSelect}) {
    return (
        <TouchableOpacity
            style={styles.list}
            onPress={() => onSelect(profileImage, username)}
        >
            <Image
                source={{ uri: profileImage }}
                style={styles.thumbnailRoundImage}
            />
            <Text style={styles.thumbnailBold}>{username} </Text>
            <Text style={styles.thumbnailGray}>{birthday}</Text>
        </TouchableOpacity>
    );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getContactProfile},dispatch)
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ContactScreen)
