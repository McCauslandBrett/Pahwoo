import React, {Component} from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, Dimensions, FlatList, Image} from 'react-native';
import {Header, Left, Right} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js"
import db from '../config/firebase.js';
import firebase from 'firebase';
// import { TextInput } from 'react-native-gesture-handler';
import styles from '../styles.js'
const  { width } = Dimensions.get('window');

class SearchScreen extends Component{
    state = {
        search: '',
        query: []
    }

    searchUser = async () => {
        let search = []
        const query = await db.collection('users').where('username', '>=', this.state.search).get()
        query.forEach((response) => {
            search.push(response.data())
        })
        this.setState({query: search})
    }

    addBtnOnSelect = async (userID) => {
        console.log("hello from addBtn")
        try {
            var newUserRef = db.collection('users').doc(userID)
            await newUserRef.update({
                requests: firebase.firestore.FieldValue.arrayUnion(
                    {
                        requestingUser: this.props.user.uid,
                        username: this.props.user.username
                    }
                )
            });
        } catch(e){
            alert(e)
        }

    }

    render(){
      return(

        <SafeAreaView style={styles.thumbnailContainer}>
            <TextInput
            style={styles.thumbnailInput}
            onChangeText={(search)=> this.setState({search})}
            value={this.state.search}
            textColor={'black'}
            returnKeyType='send'
            placeholder='Search for new friends'
            placeholderTextColor= 'gray'
            onSubmitEditing={this.searchUser}/>
            <SafeAreaView>
                <FlatList
                data={this.state.query}
                keyExtractor={(item) => item.uid}
                renderItem={({item}) => (
                    <Item
                        img={item.profileImage}
                        userID={item.uid}
                        username={item.username}
                        birthday={item.birthday}
                        addBtnOnSelect={this.addBtnOnSelect}
                    />
                )}/>
            </SafeAreaView>
        </SafeAreaView>

      );
    }
  }

  function Item({ img, userID, username, birthday, addBtnOnSelect}) {
    return (
            <TouchableOpacity
                style={styles.list2}
                onPress={() => {
                    console.log("hello from parant touchable");
                }}
            >
                <Image
                    source={{ uri: img }}
                    style={styles.thumbnailRoundImage}
                />
                <Text style={styles.thumbnailBold}>{username} </Text>
                <Text style={styles.thumbnailGray}>{birthday} </Text>
                <TouchableOpacity
                    style={styles.smallButton}
                    onPress={ async () => addBtnOnSelect(userID)}
                >
                    <Text style={styles.lightText}>+</Text>

                </TouchableOpacity>
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
  export default connect(mapStateToProps,mapDispatchToProps)(SearchScreen)
