import React, {Component} from 'react';
// global
import { View, Text, TouchableOpacity,TextInput,
  SafeAreaView, FlatList, Modal} from 'react-native';
import {Header, Left, Right} from 'native-base';
import Icon  from "../components/icons.js";
import {Ionicons} from "@expo/vector-icons";
import styles from '../styles.js'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import db from '../config/firebase.js';
import {getCard} from '../actions/card.js'
import palette from '../palette.js'

import TextinCover from '../components/TextinCover.js'
import TextinBodyone from '../components/TextinBodyone.js'
class CardScreen extends Component{
    state = {
        modalVisible: false,
        selectCardVisible: false,
        selectedItems: [],
        receivedCards: [],
        selected: '',
        cardID: '',
        cardHolder: {},
    }

    setSelectCardModalVisible = (visible) => {
        this.setState({selectCardVisible: visible});
    }

    onSelect = async (id) => {
        this.setState({selected: id})
        // await this.props.getCard(id)
        let cardData = []
        try{
            const query = await db.collection('cards').where('id', '==', id).get()
            query.forEach((response) => {
                cardData.push(response.data())
            })
            this.setState({cardID: cardData[0].id})
            this.setState({cardHolder: cardData[0]})
            this.setSelectCardModalVisible(true);
        } catch (e){
            alert(e)
        }
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
                    <View >
                    <TextInput multiline = {true} editable={false}
                    style={[
                         {
                           fontSize: (this.state.cardHolder.cover_font_size == null) ?
                           32 : this.state.cardHolder.cover_font_size
                           , color:palette.LIGHT_GRAY,
                           fontWeight:this.state.cardHolder.cover_bold,
                           fontStyle:this.state.cardHolder.cover_italic,
                           fontFamily:this.state.cardHolder.cover_font,
                           alignItems:'center',
                           justifyContent: 'center',
                           margin:20,
                           textAlign: (this.state.cardHolder.cover_text_align == null) ?
                           this.state.defaultAlign :
                           this.state.cardHolder.cover_text_align
                         }
                      ]}
                      value = {this.state.cardHolder.cover_text}
                      />

                     </View>

                     <View >
                     <TextInput multiline = {true} editable={false}
                     style={[
                          {
                            fontSize: (this.state.cardHolder.bodyone_font_size == null) ?
                            24 : this.state.cardHolder.bodyone_font_size
                            , color:palette.LIGHT_GRAY,
                            fontWeight:this.state.cardHolder.bodyone_bold,
                            fontStyle:this.state.cardHolder.bodyone_italic,
                            fontFamily:this.state.cardHolder.bodyone_font,
                            alignItems:'center',
                            justifyContent: 'center',
                            margin:20,
                            textAlign: (this.state.cardHolder.bodyone_text_align == null) ?
                            this.state.defaultAlign :
                            this.state.cardHolder.bodyone_text_align
                          }
                       ]}
                       value = {this.state.cardHolder.bodyone_text}
                       />

                      </View>

                <View>

            <TextInput multiline = {true} editable={false}
                style={[
                    {
                    fontSize: (this.state.cardHolder.bodytwo_font_size == null) ?
                    24 : this.state.cardHolder.bodytwo_font_size
                    ,
                    color:palette.LIGHT_GRAY,
                    fontWeight:this.state.cardHolder.bodytwo_bold,
                    fontStyle:this.state.cardHolder.bodytwo_italic,
                    fontFamily:this.state.cardHolder.bodytwo_font,
                    alignItems:'center',
                    justifyContent: 'center',
                    margin:20,
                    textAlign: (this.state.cardHolder.bodytwo_text_align == null) ?
                    'center' :
                    this.state.cardHolder.bodytwo_text_align
                    }
                ]}
                    value = {this.state.cardHolder.bodytwo_text}
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
