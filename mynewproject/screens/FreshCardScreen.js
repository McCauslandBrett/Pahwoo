import React, {Component} from 'react';
import { View, Text, TouchableOpacity,
        Modal, TextInput,SafeAreaView,ScrollView, FlatList, Image
       } from 'react-native';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js";
import styles from '../styles.js'
// const screenHeight = Dimensions.get("window").height;
import db from '../config/firebase.js';
import {updateCoverText,updateBodyoneText,
        updateBodytwoText,createCard,
        sendCard, saveCard, toggleCoverModal,toggleBodyoneModal, toggleBodytwoModal} from '../actions/card.js'

import palette from '../palette.js'

import EditCoverModal from '../components/EditCoverModal.js'
import EditBodyoneModal from '../components/EditBodyoneModal.js'
import EditBodytwoModal from '../components/EditBodytwoModal.js'

import {Ionicons} from "@expo/vector-icons";

import TextinCover from '../components/TextinCover.js'
import TextinBodyone from '../components/TextinBodyone.js'
import MultiSelect from 'react-native-multiple-select';

class FreshCardScreen extends Component{
  static navigationOptions = {
      headerTintColor: 'black',
      headerBackTitle: null,
      headerStyle: {
        borderBottomColor:'transparent',
        borderBottomWidth: 0,
      },
    }
  sendCard = async () => {
      await this.props.sendCard()
  }

  saveCard = async () => {
      await this.props.saveCard(this.state.selectedItems);
  }

  state = {
      recipients: [],
      selectContactsVisible: false,
      selectedItems: [],
      selected: '',
      // contactAvatarMapping will be used to store key-value pairs between key: contact's uid, value: contact-profileImage
      // this is crucial for re-rendering the recipient photo array at the bottom of the card
      // will be useful to get this mapping during ComponentDidMount() when querying the contacts array
      contactAvatarMapping: [],
      contactData: []
  }
  setSelectContactsModalVisible = (visible) => {
    this.setState({selectContactsVisible: visible});
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({selectedItems: selectedItems});
    console.log(this.state.selectedItems)
  };
  componentDidMount = async () => {
    let tempData = []
    let recipientKeys = []
    let mapping = {}
    let contacts = []
    // for loop with async calls
    // get each recipient
    for (var i = 0; i < this.props.card.recipients.length; i++){
        const query = await db.collection('users').where('uid', '==', this.props.card.recipients[i]).get()
        query.forEach((response) => {
            tempData.push({
                id: response.data().uid,
                thmb: response.data().profileImage,
                username: response.data().username
            })
            recipientKeys.push(response.data().uid)
        })
    }

    // get contact data for avatar mapping needed for recipient list rendering

    for (var i = 0; i < this.props.user.contacts.length; i++){
        const query = await db.collection('users').where('uid', '==', this.props.user.contacts[i]).get()
        query.forEach((response) => {
            contacts.push(response.data())
            mapping[this.props.user.contacts[i]] = [response.data().profileImage, response.data().username]
        })
    }
    console.log(contacts);
    this.setState({contactAvatarMapping: mapping});
    this.setState({recipients: tempData});
    this.setState({contactData: contacts});
    this.setState({selectedItems: recipientKeys});
  }

  render(){
    return(
      <SafeAreaView >
         <ScrollView showsVerticalScrollIndicator={false}>


        <EditCoverModal/>
        <EditBodyoneModal/>
        <EditBodytwoModal/>
           <View >
            <TextinCover/>
              <TouchableOpacity  style = {styles.mdmore} onPress={() => {this.props.toggleCoverModal(true)}}>
                  <Ionicons  name="md-more" size={28} />
              </TouchableOpacity>
            </View>

            <View >
             <TextinBodyone/>
               <TouchableOpacity  style = {styles.mdmore} onPress={() => {this.props.toggleBodyoneModal(true)}}>
                   <Ionicons  name="md-more" size={28} />
               </TouchableOpacity>
             </View>

       <View>
        {/* <Ionicons name="md-more" size={28} style = {styles.mdmore} />
        <TextInput multiline = {true} style={styles.bodytwoText}
        value = {this.props.card.bodytwo_text}
        onChangeText = {input_body_two => this.props.updateBodytwoText(input_body_two)}
        placeholder = 'Body Two'
        /> */}
            <TextInput multiline = {true}
                style={[
                    {
                    fontSize: (this.props.card.bodytwo_font_size == null) ?
                    24 : this.props.card.bodytwo_font_size
                    , 
                    color:palette.LIGHT_GRAY,
                    fontWeight:this.props.card.bodytwo_bold,
                    fontStyle:this.props.card.bodytwo_italic,
                    fontFamily:this.props.card.bodytwo_font,
                    alignItems:'center',
                    justifyContent: 'center',
                    margin:20,
                    textAlign: (this.props.card.bodytwo_text_align == null) ?
                    'center' :
                    this.props.card.bodytwo_text_align
                    }
                ]}
                    value = {this.props.card.bodytwo_text}
                    onChangeText = {input => this.props.updateBodytwoText(input)}
                    placeholder = 'BODY TWO'
            />
            <TouchableOpacity  style = {styles.mdmore} onPress={() => {this.props.toggleBodytwoModal(true)}}>
                <Ionicons  name="md-more" size={28}/>
            </TouchableOpacity>
      </View>
      <View style = {styles.cardAttachmentContainer}>
          <TouchableOpacity style = {styles.stat} onPress = {()=> this.props.navigation.navigate('Invitations')}>
            <Icon.FontAwesome name= "gift" style = {styles.cardAttachment} color = "#DFD8C8"/>
            <Text style = {styles.statTitle}>Gift</Text>
          </TouchableOpacity>

          <TouchableOpacity style = {styles.stat} onPress = {()=> this.props.navigation.navigate('Invitations')}>
            <Icon.FontAwesome name= "camera" style = {styles.cardAttachment}/>
            <Text style = {styles.statTitle}>Photo</Text>
          </TouchableOpacity>

        <TouchableOpacity style = {styles.stat} onPress = {()=> this.props.navigation.navigate('Invitations')}>
          <Icon.FontAwesome name= "video-camera" style = {styles.cardAttachment}/>
          <Text style = {styles.statTitle}>Video</Text>
        </TouchableOpacity>

      <TouchableOpacity style = {styles.stat} onPress = {()=> this.props.navigation.navigate('Invitations')}>
        <Icon.FontAwesome name= "microphone" style = {styles.cardAttachment}/>
        <Text style = {styles.statTitle}>Audio</Text>
      </TouchableOpacity>

      </View>
      <View  style =  {styles.deliveryContainer}>
        <TouchableOpacity style ={styles.deliveryElement} onPress = {()=> this.props.navigation.navigate('Invitations')}>
          <Ionicons name= "md-clock" style = {styles.cardAttachment}/>
        </TouchableOpacity>
        <Text style= {styles.deliveryTitle}> Deliverd Date June 2, 2020</Text>
      </View>

      <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.selectContactsVisible}
            onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
            <SafeAreaView style={{flex: 1}}>
                <MultiSelect
                    // hideTags
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
                    itemFontSize={20}
                    itemTextColor="#000"
                    displayKey="username"
                    searchInputStyle={{ color: '#CCC' }}
                    submitButtonColor="darkorange"
                    submitButtonText="Submit"
                />
            </SafeAreaView>
            <TouchableOpacity style={styles.button}
                onPress={() => {
                this.setSelectContactsModalVisible(!this.state.selectContactsVisible);
                // logic to update the recipient avatar rendering on selectedItems change
                let update = [];
                for (var i = 0; i < this.state.selectedItems.length; i++){
                    update.push({
                        id: this.state.selectedItems[i],
                        thmb: this.state.contactAvatarMapping[this.state.selectedItems[i]][0],
                        username: this.state.contactAvatarMapping[this.state.selectedItems[i]][1]
                    })
                }
                this.setState({recipients: update});
                }}>
                <Text>Hide Modal</Text>
            </TouchableOpacity>
          </Modal>
      <SafeAreaView style={styles.contactRowStack}>
            <FlatList
                horizontal={true}
                inverted={true}
                data={this.state.recipients}
                renderItem={({ item }) => (
                <Item
                    id={item.id}
                    img={item.thmb}
                />
                )}
                keyExtractor={item => item.id}
            />
            <View style={styles.addContactButton}>
                <TouchableOpacity onPress={() =>{this.setSelectContactsModalVisible(true);}}>
                    <Ionicons name= "ios-person-add" size={36}/>
                </TouchableOpacity>
          </View>
      </SafeAreaView>
      <SafeAreaView style={styles.playContainer}>
      <TouchableOpacity style={styles.button}
            onPress={async () => {
                await this.sendCard();
            }}>
            <Text>Send</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
            onPress={async () => {
                await this.saveCard();
                // save the recipients (selectedItems) here to state so that state is updated before addint to database
                // console.log(this.state.selectedItems);
                
            }}>
            <Text>Save</Text>
      </TouchableOpacity>
      </SafeAreaView>

         </ScrollView>
      </SafeAreaView>
    );
  }
}


function Item({ id, img }) {
    return (
        <Image
            source={{ uri: img }}
            style={styles.rowStackImages}
        />
        );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({createCard, sendCard, saveCard, updateCoverText,updateBodytwoText,updateBodyoneText,toggleCoverModal,toggleBodyoneModal, toggleBodytwoModal},dispatch)
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    card: state.card,
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(FreshCardScreen)
