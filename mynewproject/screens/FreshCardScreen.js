import React, {Component} from 'react';
import { View, Text, TouchableOpacity,
        Modal, TextInput,SafeAreaView,ScrollView,
        FlatList, Image,ImageBackground,StyleSheet,Dimensions
       } from 'react-native';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js";
import styles from '../styles.js'
// const screenHeight = Dimensions.get("window").height;
import db from '../config/firebase.js';
import {uploadCardBackgroundImage} from '../actions/card.js'
import {
        updateCoverText,updateCoverFont,
        updateCoverTextAlignment,updateCoverBold,
        updateCoverItalic,updateCoverTextSize,updateCoverTextColor,
        toggleCoverColorModal,

        updateBodyoneText,updateBodyoneFont,
        updateBodyoneTextAlignment,updateBodyoneBold,
        updateBodyoneItalic,updateBodyoneTextSize,updateBodyoneTextColor,
        toggleBodyoneColorModal,

        updateBodytwoText,updateBodytwoFont,
        updateBodytwoTextAlignment,updateBodytwoBold,
        updateBodytwoItalic,updateBodytwoTextSize,updateBodytwoTextColor,
        toggleBodytwoColorModal,

        createCard,
        sendCard, saveCard, toggleCoverModal,
        toggleBodyoneModal, toggleBodytwoModal} from '../actions/card.js'

import palette from '../palette.js'
import { HeaderHeight } from "../constants/utils";
const { width, height } = Dimensions.get("screen");
import { Images, argonTheme } from "../constants";
import EditModal from '../components/EditModal.js'

import {Ionicons} from "@expo/vector-icons";

import TextinCover from '../components/TextinCover.js'
import TextinBodyone from '../components/TextinBodyone.js'
import MultiSelect from 'react-native-multiple-select';
import { fromHsv } from 'react-native-color-picker'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

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
  _pickImage = async () => {
    console.log("_pickImage")
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
      else {
        let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
           this.props.uploadCardBackgroundImage(result.uri)
        }
      }
  };

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
      <ImageBackground
          source={{uri:this.props.card.BackgroundImage}}
          style={Arstyles.profileContainer}
          imageStyle={Arstyles.profileBackground}
       >
         <ScrollView showsVerticalScrollIndicator={false}>

        <EditModal
          toggle = {this.props.toggleCoverModal}
          name = "Cover"
          isModalVisible ={this.props.card.isCoverModalVisible}
          text_color = {this.props.card.cover_text_color}
          updateAlignment= {this.props.updateCoverTextAlignment}
          updateFont= {this.props.updateCoverFont}
          fontSize= {this.props.card.cover_font_size}
          updateTextSize = {this.props.updateCoverTextSize}
          isBold= {this.props.card.cover_bold}
          isItalic= {this.props.card.cover_italic}
          updateItalic = {this.props.updateCoverItalic}
          updateBold = {this.props.updateCoverBold}
          toggleColorModal = {this.props.toggleCoverColorModal}
          isColorModalVisible = {this.props.card.isCoverColorModalVisible}
          updateTextColor = {this.props.updateCoverTextColor}

          />
        <EditModal
            toggle = {this.props.toggleBodyoneModal}
            name = "BODY ONE"
            isModalVisible ={this.props.card.isBodyoneModalVisible}
            text_color = {this.props.card.bodyone_text_color}
            updateAlignment= {this.props.updateBodyoneTextAlignment}
            updateFont= {this.props.updateBodyoneFont}
            fontSize= {this.props.card.bodyone_font_size}
            updateTextSize = {this.props.updateBodyoneTextSize}
            isBold= {this.props.card.bodyone_bold}
            isItalic= {this.props.card.bodyone_italic}
            updateItalic = {this.props.updateBodyoneItalic}
            updateBold = {this.props.updateBodyoneBold}
            toggleColorModal = {this.props.toggleBodyoneColorModal}
            isColorModalVisible = {this.props.card.isBodyoneColorModalVisible}
            updateTextColor = {this.props.updateBodyoneTextColor}

            />
        <EditModal
              toggle = {this.props.toggleBodytwoModal}
              name = "BODY TWO"
              isModalVisible ={this.props.card.isBodytwoModalVisible}
              text_color = {this.props.card.bodytwo_text_color}
              updateAlignment= {this.props.updateBodytwoTextAlignment}
              updateFont= {this.props.updateBodytwoFont}
              fontSize= {this.props.card.bodytwo_font_size}
              updateTextSize = {this.props.updateBodytwoTextSize}
              isBold= {this.props.card.bodytwo_bold}
              isItalic= {this.props.card.bodytwo_italic}
              updateItalic = {this.props.updateBodytwoItalic}
              updateBold = {this.props.updateBodytwoBold}
              toggleColorModal = {this.props.toggleBodytwoColorModal}
              isColorModalVisible = {this.props.card.isBodytwoColorModalVisible}
              updateTextColor = {this.props.updateBodytwoTextColor}

              />
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
            <TextInput multiline = {true}
                style={[
                    {
                    fontSize: (this.props.card.bodytwo_font_size == null) ?
                    24 : this.props.card.bodytwo_font_size
                    ,
                    color: (this.props.card.bodytwo_text_color== null) ? palette.LIGHT_GRAY:
                      fromHsv({ h: this.props.card.bodytwo_text_color.hue,
                                s: this.props.card.bodytwo_text_color.sat,
                                v:this.props.card.bodytwo_text_color.val }),
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
      <TouchableOpacity style={styles.button}
            onPress={()=> this._pickImage()}>
            <Text>Background</Text>
      </TouchableOpacity>
      </SafeAreaView>

         </ScrollView>
        </ImageBackground>
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
const Arstyles = StyleSheet.create({

profileContainer: {
  width: width,
  height: height,
  padding: 0,
  zIndex: 1
},
profileBackground: {
  width: width,
  height: height
},

});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateCoverText,updateCoverFont,
    updateCoverTextAlignment,updateCoverBold,
    updateCoverItalic,updateCoverTextSize,updateCoverTextColor,
    toggleCoverColorModal,

    updateBodyoneText,updateBodyoneFont,
    updateBodyoneTextAlignment,updateBodyoneBold,
    updateBodyoneItalic,updateBodyoneTextSize,updateBodyoneTextColor,
    toggleBodyoneColorModal,

    updateBodytwoText,updateBodytwoFont,
    updateBodytwoTextAlignment,updateBodytwoBold,
    updateBodytwoItalic,updateBodytwoTextSize,updateBodytwoTextColor,
    toggleBodytwoColorModal,

    createCard,
    sendCard, saveCard, toggleCoverModal,
    toggleBodyoneModal, toggleBodytwoModal},dispatch)
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    card: state.card,
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(FreshCardScreen)
