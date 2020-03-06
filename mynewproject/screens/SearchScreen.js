import React, {Component} from 'react';
import { View, SafeAreaView, Text, StyleSheet, TextInput, Dimensions, FlatList, Image} from 'react-native';
import {Header, Left, Right} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js"
import db from '../config/firebase.js';
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
        console.log(search)
        this.setState({query: search})
    }
    
    render(){
      return(
        
        <SafeAreaView style={styles.thumbnailContainer}>
            <TextInput
            style={styles.thumbnailInput}
            onChangeText={(search)=> this.setState({search})}
            value={this.state.search}
            returnKeyType='send'
            placeholder='Search for new friends'
            onSubmitEditing={this.searchUser}/>
            <SafeAreaView>
                <FlatList
                data={this.state.query}
                keyExtractor={(item) => item.uid}
                renderItem={({item}) => (
                    <Item
                        img={item.profileImage}
                        username={item.username}
                        birthday={item.birthday}
                    />
                )}/>
            </SafeAreaView>
        </SafeAreaView>
    
      );
    }
  }

  function Item({ img, username, birthday }) {
    return (

        <SafeAreaView>
            <Image style={styles.thumbnailRoundImage} source={{uri: img}}/>
            <View style={[styles.thumbnailContainer, styles.thumbnailLeft]}>
                <Text style={styles.thumbnailBold}>{username}</Text>
                <Text style={styles.thumbnailGray}>{birthday}</Text>
            </View>
        </SafeAreaView>
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