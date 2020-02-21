import React, {Component} from 'react';
// global
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Modal} from 'react-native';
import {Header, Left, Right} from 'native-base';
import Icon  from "../components/icons.js";
import {Ionicons} from "@expo/vector-icons";
import styles from '../styles.js'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import db from '../config/firebase.js';
import {getCard} from '../actions/card.js'

class CardScreen extends Component{
    state = {
        modalVisible: false,
        selectCardVisible: false,
        selectedItems: [],
        receivedCards: [],
        selected: '',
        cardID: ''
    }

    setSelectCardModalVisible = (visible) => {
        this.setState({selectCardVisible: visible});
    }
    
    onSelect = async (id) => {
        this.setState({selected: id})
        console.log(this.state.selected)
        await this.props.getCard(id)
        this.setState({cardID: this.props.card.id})
        this.setSelectCardModalVisible(true);
    }
    
    componentDidMount = async () => {
        // get user received cards
        let tempData = []
        let userObj = {}
        try{
            const user =  await db.collection("users").doc(this.props.user.uid).get();
            if (user != null) {
                // console.log("Document data:", user.data());
                userObj = user.data()
            } else {
                // user.data() will be undefined in this case
                console.log("No such document!");
            }
        } catch(e) {
            alert(e)
        }
        for (var i = 0; i < userObj.receivedCards.length; i++){
            let cardData = []
            const query = await db.collection('cards').where('id', '==', userObj.receivedCards[i]).get()
            query.forEach((response) => {
                cardData.push(response.data())
            })
            tempData.push({
                id: userObj.receivedCards[i],
                title: cardData[0].name
            });
        }
        console.log(tempData)
        this.setState({receivedCards: tempData});
    }
    
    render(){
        return(
            <View style={styles.container}> 
            {/* the style of the view right above added the header bar at the top of the screen */}
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={this.state.receivedCards}
                        renderItem={({ item }) => (
                        <Item
                            id={item.id}
                            title={item.title}
                            onSelect={this.onSelect}
                        />
                        )}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.selectCardVisible}
                    onRequestClose={() => {
                    alert('Modal has been closed.');
                    }}>
                    <SafeAreaView>
                        <Text>
                            {this.state.cardID}
                        </Text>
                    </SafeAreaView>
                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                        this.setSelectCardModalVisible(!this.state.selectCardVisible);
                        }}>
                        <Text>Hide Modal</Text>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }
}

function Item({ id, title, onSelect }) {
    return (
        <TouchableOpacity
            onPress={() => onSelect(id)}
            style={[
            styles.contactsItem
        ]}>
        <Text style={styles.contactsHeader}>{title}</Text>
        </TouchableOpacity>
    );
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getCard},dispatch)
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        card: state.card
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CardScreen)
