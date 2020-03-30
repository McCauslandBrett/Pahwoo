import React, {Component} from 'react';
import { View, Text, FlatList, TouchableOpacity,
        Modal, SafeAreaView, TextInput} from 'react-native';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js";
import styles from '../styles.js'
import db from '../config/firebase.js';
import {createCard, getCard} from '../actions/card.js'
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
    selectCardVisible: false,
    newName: '',
    selectedItems: [],
    contactData: [],
    savedTemplates: [],
    selected: '',
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  setSelectContactsModalVisible = (visible) => {
    this.setState({selectContactsVisible: visible});
  }
  setSelectCardModalVisible = (visible) => {
    this.setState({selectCardVisible: visible});
  }

  createCard = async () => {
   //   should create a card with just a name for now and add it to the database
    // why should the next line have `await`? Bcus we log props.card.cid right after and want that to be set
    await this.props.createCard(this.state.newName, this.state.selectedItems)
    // console.log(this.props.card.cid)
    console.log(this.props.card.id)
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
    try{
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
        // at this point I have an array of user objects from the current user's contact array
        mappedData.sort((a, b) => (a.username > b.username) ? 1 : -1)
        this.setState({contactData: mappedData})
        // get user saved cards/templates
        tempData = []
        let userObj = {}
        const user =  await db.collection("users").doc(this.props.user.uid).get();
        userObj = user.data()
        for (var i = 0; i < userObj.savedTemplates.length; i++){
            let cardData = []
            const query = await db.collection('cards').where('id', '==', userObj.savedTemplates[i]).get()
            query.forEach((response) => {
                cardData.push(response.data())
            })
            tempData.push({
                id: userObj.savedTemplates[i],
                title: cardData[0].cover_text
            });
        }
    } catch(e){
        alert(e)
    }
    this.setState({savedTemplates: tempData});
  }

  onSelect = async (id) => {
    // const newSelected = new Map(this.state.selected);
    // newSelected.set(id, !this.state.selected.get(id));
    // this.setState({selected: newSelected});
    this.setState({selected: id})
    console.log(this.state.selected)
    await this.props.getCard(id)
    this.setSelectCardModalVisible(!this.state.selectCardVisible);
    this.props.navigation.navigate('FreshCards')
  }

  render(){
    // const {selected} = this.state
    return(
      <View style={styles.container}>
      {/* new card modal */}
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
            onPress={async () => {
            await this.createCard();
            }}>
            <Text>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
            onPress={() => {this.setSelectContactsModalVisible(true);}}>
            <Text>Select Contacts</Text>
        </TouchableOpacity>
          {/* select multiple contacts modal */}
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
              this.setModalVisible(!this.state.modalVisible);}}>
              <Text>Hide Modal</Text>
          </TouchableOpacity>
        </Modal>
        {/* modal for selecting a card to edit */}

        <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.selectCardVisible}
            onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.savedTemplates}
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
            <TouchableOpacity style={styles.button}
                onPress={() => {
                this.setSelectCardModalVisible(!this.state.selectCardVisible);
                }}>
                <Text>Hide Modal</Text>
            </TouchableOpacity>
          </Modal>
          <TouchableOpacity style={styles.button}
            onPress={() => {
                this.setSelectCardModalVisible(true);}}>
            <Text>Select Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
            onPress={() => {this.setModalVisible(true);}}>
            <Text>New Card</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({createCard, getCard},dispatch)
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    card: state.card
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(TemplateCardScreen)
