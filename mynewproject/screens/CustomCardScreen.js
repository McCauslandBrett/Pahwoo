import React, {Component} from 'react';
import { View, Text,SafeAreaView,FlatList, TouchableOpacity, Modal, ScrollView, Button, TextInput} from 'react-native';
import {Header, Left, Right} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js";
import {AntDesign} from "@expo/vector-icons";
import db from '../config/firebase';
import {createCard, setCard, flushCardState} from '../actions/card.js'


import styles from '../styles.js'
// Alright, flow needs to be established, so we can accomplish the most at once
// Do we want to force users to select a card before they edit one? this would make it easy

function Item({ id, title, onSelect }) {
    return (
      <TouchableOpacity
        onPress={ async () => await onSelect(id)}
        style={[
          styles.contactsItem
        ]}
      >
        <Text style={styles.contactsHeader}>{title}</Text>
      </TouchableOpacity>
    );
}


class CustomCardScreen extends Component{
  static navigationOptions = {
    headerBackTitle: null,
    drawerIcon : ({tintColor}) => (
      <Icon.FontAwesome name= "envelope" style = {{fontSize:24, color:tintColor}}/>
    )
  }
  
  state = {
    modalVisible: false,
    newName: '',
    userCards: [],
    selected: '',
    cardObjects: {}
  }
  
  createCard = async () => {
     // why should the next line have `await`? Bcus we log props.card.cid right after and want that to be set
     await this.props.createCard(this.state.newName, [])
     // need to add card to this components cards so it can rerender
     let tempData = this.state.userCards
     let tempObj = this.state.cardObjects
     tempData.push(this.props.card)
     tempObj[this.props.card.id] = this.props.card
     tempData.sort((a, b) => (a.name > b.name) ? 1 : -1)
     this.setState({userCards: tempData});
     this.setState({cardObjects: tempObj});
     this.setModalVisible(!this.state.modalVisible)
     this.props.navigation.navigate('FreshCards')
   }
   
   componentDidMount = async () => {
      let tempData = []
      let cardMap = {}
      try{
          // get user saved cards/templates
          let userObj = {}
          const user =  await db.collection("users").doc(this.props.user.uid).get();
          userObj = user.data()
          for (var i = 0; i < userObj.userCards.length; i++){
              const query = await db.collection('cards').doc(userObj.userCards[i]).get()
              tempData.push(query.data())
              cardMap[query.data().id] = query.data()
          }
      } catch(e){
          alert(e)
      }
      tempData.sort((a, b) => (a.name > b.name) ? 1 : -1)
      this.setState({userCards: tempData});
      this.setState({cardObjects: cardMap});
   }
  
   setModalVisible = (visible) => {
     this.setState({modalVisible: visible});
   }
   
    onSelect = async (id) => {
        this.setState({selected: id})
        await this.props.setCard(this.state.cardObjects[id])
        this.props.navigation.navigate('FreshCards')
    }
    
  flushAndNavigate = () => {
      this.props.flushCardState();
      this.props.navigation.navigate('FreshCards');
  }
   
  render(){
    return(
      <SafeAreaView>
          <ScrollView>
             <Icon.FontAwesome name = "bars" style = {styles.menuIcon} size ={24} onPress={ () => this.props.navigation.openDrawer()}   />
             <AntDesign name="plussquareo" size={24} style = {styles.topRightBtn} onPress = {()=> this.flushAndNavigate()}/>
             <View style = {{marginTop:60, alignItems:"center"}}>
                 <Text> CustomCardScreen</Text>
                 <Button title ="Template Cards" onPress = {()=> this.props.navigation.navigate('CardTemplates')} />
                 <Button title ="Cards" onPress = {()=> this.flushAndNavigate()} />
                 <Text> Edit Previous Cards</Text>

             </View>
          </ScrollView>
             <SafeAreaView style={styles.cardListContainer}>
                <FlatList
                        data={this.state.userCards}
                        numColumns={2}
                        renderItem={({ item }) => (
                        <Item
                            id={item.id}
                            title={item.name}
                            onSelect={this.onSelect}
                        />
                        )}
                        keyExtractor={item => item.id}
                    />
                <Modal
                    style={styles.container}
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {}}>
                    <ScrollView>
                        <TextInput
                            style = {styles.border}
                            value = {this.state.newName}
                            onChangeText = {input => this.setState({newName: input})}
                            placeholder = 'New name'
                        />
                        <TouchableOpacity style={styles.button}
                            onPress={async () => {
                            await this.createCard();
                            }}>
                            <Text>Create</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Text>Hide Modal</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </Modal>
            </SafeAreaView>
    </SafeAreaView>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({createCard, setCard, flushCardState},dispatch)
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    card: state.card

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(CustomCardScreen)
