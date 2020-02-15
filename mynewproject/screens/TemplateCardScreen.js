import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, SafeAreaView, TextInput} from 'react-native';
import {Header, Left, Right} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js";
import styles from '../styles.js'
import db from '../config/firebase.js';
import {createCard} from '../actions/card.js'
import MultiSelect from 'react-native-multiple-select';
class TemplateCardScreen extends Component{
  static navigationOptions = {
    drawerIcon : ({tintColor}) => (
        <Icon.FontAwesome name= "gift" style = {{fontSize:24, color:tintColor}}/>
    )
  }
  state = {
    modalVisible: false,
    selectContactsVisible: false,
    newName: ``,
    selectedItems: [],
    contactData: []
  }
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }
  setSelectContactsModalVisible = (visible) => {
    this.setState({selectContactsVisible: visible});
  }
  createCard = async () => {
   //   should create a card with just a name for now and add it to the database
    console.log(this.state.newName)
    console.log(this.state.selectedItems)
    // why should the next line have `await`? Bcus we log props.card.cid right after and want that to be set
    await this.props.createCard(this.state.newName, this.state.selectedItems)
    console.log(this.props.card.cid)
  }
  sendCard = () => {
    //   should create a card with just a name for now and add it to the database
     this.props.sendCard(this.state.selectedItems)
   }
  onSelectedItemsChange = selectedItems => {
    this.setState({selectedItems: selectedItems});
    console.log(this.state.selectedItems)
  };
  componentDidMount = async () => {
    let tempData = []
    // for loop with async calls
    for (var i = 0; i < this.props.user.contacts.length; i++){
        const query = await db.collection('users').where('uid', '==', this.props.user.contacts[i]).get()
        query.forEach((response) => {
            tempData.push(response.data())
        })
    }
    
    let mappedData = tempData.map(item => {
        // add these to fields to every item in tempData
        item.isSelect = false;
        item.selectedClass = styles.list;
        
        return item;
    })
    console.log('begin ROGITH log')
    console.log(mappedData)
    console.log('EEEEEEEEND ROGITH log')
    // at this point I have an array of user objects from the current user's contact array
    
    // tempData.sort((a, b) => (a.username > b.username) ? 1 : -1)
    mappedData.sort((a, b) => (a.username > b.username) ? 1 : -1)
    // this.setState({contactData: tempData})
    this.setState({contactData: mappedData})
}

  render(){
    return(
      <View style={styles.container}>
      <Modal
        style={styles.container}
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {}}>
        <TextInput
          style = {styles.border}
          value = {this.state.newName}
          onChangeText = {input => this.setState({newName: input})}
          placeholder = 'New name'
       />
        <TouchableOpacity style={styles.button}
            onPress={() => {
            // this.setModalVisible(!this.state.modalVisible);
            this.createCard()
            }}>
            <Text>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
            onPress={() => {this.setSelectContactsModalVisible(true)}}>
            <Text>Select Contacts</Text>
        </TouchableOpacity>
        <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.selectContactsVisible}
                onRequestClose={() => {
                alert('Modal has been closed.');
            }}>
                <SafeAreaView style={{flex: 1}}>
                    <MultiSelect
                        hideTags
                        items={this.state.contactData}
                        uniqueKey="uid"
                        // ref={(component) => { this.state.multiSelect = component }}
                        onSelectedItemsChange={this.onSelectedItemsChange}
                        selectedItems={this.state.selectedItems}
                        selectText="Pick Items"
                        searchInputPlaceholderText="Search Items..."
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="username"
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor="#CCC"
                        submitButtonText="Submit"
                    />
                </SafeAreaView>
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                    this.setSelectContactsModalVisible(!this.state.selectContactsVisible);
                    }}>
                    <Text>Hide Modal</Text>
                </TouchableOpacity>
            </Modal>

        <TouchableOpacity style={styles.button}
            onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
            }}>
            <Text>Hide Modal</Text>
        </TouchableOpacity>
        </Modal>

        <TouchableOpacity style={styles.button}
            onPress={() => {this.setModalVisible(true)}}>
            <Text>New Card</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({createCard},dispatch)
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    card: state.card
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(TemplateCardScreen)
