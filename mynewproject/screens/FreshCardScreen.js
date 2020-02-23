import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,
        Modal, TextInput,Animated,TouchableHighlight,
        Alert,ColorPropType,Keyboard,
        Picker,SafeAreaView,ScrollView, FlatList, Image
       } from 'react-native';
import {Header, Left, Right} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js";
import styles from '../styles.js'
// const screenHeight = Dimensions.get("window").height;
import db from '../config/firebase.js';
import {updateCoverText,updateBodyoneText,
        updateBodytwoText,createCard,
        sendCard,toggleCoverModal,toggleBodyoneModal} from '../actions/card.js'

import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';

import ToggleSwitch from 'toggle-switch-react-native'
import EditCoverModal from '../components/EditCoverModal.js'
import EditBodyoneModal from '../components/EditBodyoneModal.js'

import {Ionicons,AntDesign,Entypo} from "@expo/vector-icons";

import TextinCover from '../components/TextinCover.js'
import TextinBodyone from '../components/TextinBodyone.js'

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

  saveCard = () => {

  }
  
  state = {
      recipients: []
  }

  componentDidMount = async () => {
    let tempData = []
    // for loop with async calls
    for (var i = 0; i < this.props.card.recipients.length; i++){
        const query = await db.collection('users').where('uid', '==', this.props.card.recipients[i]).get()
        query.forEach((response) => {
            tempData.push({
                id: response.data().uid,
                thmb: response.data().profileImage
            })
        })
    }
    this.setState({recipients: tempData});
    console.log(tempData)
  }
  
  render(){
    return(
      <SafeAreaView >
         <ScrollView showsVerticalScrollIndicator={false}>


        <EditCoverModal/>
        <EditBodyoneModal/>

           <View >
            <TextinCover/>
              <TouchableOpacity  style = {styles.mdmore} onPress={() => {this.props.toggleCoverModal(true)}}>
                  <Ionicons  name="md-more" size={36} />
              </TouchableOpacity>
            </View>

            <View >
             <TextinBodyone/>
               <TouchableOpacity  style = {styles.mdmore} onPress={() => {this.props.toggleBodyoneModal(true)}}>
                   <Ionicons  name="md-more" size={28} style = {styles.cardAttachment}/>
               </TouchableOpacity>
             </View>

       <View>
        <Ionicons name="md-more" size={28} style = {styles.mdmore} />
        <TextInput multiline = {true} style={styles.bodytwoText}
        value = {this.props.card.body_two_text}
        onChangeText = {input_body_two => this.props.updateBodytwoText(input_body_two)}
        placeholder = 'Body Two'
        />
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
                <TouchableOpacity>
                    <Ionicons name= "ios-person-add" size={36}/>
                </TouchableOpacity> 
          </View>
      </SafeAreaView>
      <View style={styles.playContainer}>
      <TouchableOpacity style={styles.button}
            onPress={() => {this.sendCard()}}>
            <Text>Send</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
            onPress={() => {}}>
            <Text>Save</Text>
      </TouchableOpacity>    
      </View>
      
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
  return bindActionCreators({createCard, sendCard, updateCoverText,updateBodytwoText,updateBodyoneText,toggleCoverModal,toggleBodyoneModal},dispatch)
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    card: state.card,
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(FreshCardScreen)
