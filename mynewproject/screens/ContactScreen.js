import React, {Component} from 'react';
import {View, Text, SafeAreaView, FlatList, TouchableOpacity, Image} from 'react-native';
import Icon  from "../components/icons.js";
import {Ionicons} from "@expo/vector-icons";
import styles from '../styles.js'
import {Container,Header, Left} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import db from '../config/firebase.js';
import {FriendModal} from '../components/FriendModal.js'
class ContactScreen extends Component{
    static navigationOptions = {
        drawerIcon : ({tintColor}) => (
        <Icon.FontAwesome name= "address-book" style = {{fontSize:24, color:tintColor}}/>
        )
    }

    state = {
        contactData: [],
    }

    componentDidMount = async () => {
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

    render() {
      return (
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
                    data={this.state.contactData}
                    renderItem={({ item }) => (
                        <Item
                            uid={item.uid}
                            birthday={item.birthday}
                            username={item.username}
                            profileImage={item.profileImage}
                            userContacts={this.state.contactData}
                        />
                    )}
                    keyExtractor={item => item.uid}
                />
            </SafeAreaView>

            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Search')}>
                <Text>Search</Text>
            </TouchableOpacity>
        </Container>
      );
    }
}

function Item({ uid, birthday, username, profileImage, userContacts}) {
    return (
        <TouchableOpacity
            style={styles.list}
            onPress={() => {
              <FriendModal
                p={profileImage}
                o={true}
              />
            }}
        >
            <Image
                source={{ uri: profileImage }}
                style={styles.thumbnailRoundImage}
            />
            <Text style={styles.thumbnailBold}>{username}</Text>
            <Text style={styles.thumbnailGray}>{birthday}</Text>
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
export default connect(mapStateToProps,mapDispatchToProps)(ContactScreen)
