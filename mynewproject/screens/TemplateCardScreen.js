import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput} from 'react-native';
import {Header, Left, Right} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js";
import styles from '../styles.js'
import db from '../config/firebase.js';
import {createCard} from '../actions/card.js'
class TemplateCardScreen extends Component{
  static navigationOptions = {
    drawerIcon : ({tintColor}) => (
        <Icon.FontAwesome name= "gift" style = {{fontSize:24, color:tintColor}}/>
    )
  }
  state = {
    modalVisible: false,
    newName: ``
  }
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }
  createCard = () => {
   //   should create a card with just a name for now and add it to the database
    console.log(this.state.newName)
    this.props.createCard(this.state.newName)
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
