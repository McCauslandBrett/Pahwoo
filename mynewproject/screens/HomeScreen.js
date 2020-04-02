import React, {Component} from 'react';
import { View, Text,SafeAreaView,ScrollView, StyleSheet,Button, Image,TouchableOpacity} from 'react-native';
import {Header, Left, Right} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import Icon  from "../components/icons.js";
import {Ionicons} from "@expo/vector-icons";
import {updateProfileImage,uploadImage} from '../actions/user.js'
import * as firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import styles from '../styles.js';
import uuid from 'uuid';
import db from '../config/firebase';

class HomeScreen extends Component{
  static navigationOptions = {
      headerBackTitle: null,
    drawerIcon : ({tintColor}) => (
      <Icon.FontAwesome name= "home" style = {{fontSize:24, color:tintColor}}/>
    )
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
           this.props.uploadImage(result.uri)

        }
      }
  };


  render(){
    //   here is a use of the dollar sign: console.log(`props changed, image uri: ${this.props.user.profileImage}`)
    return(
      <SafeAreaView >
          <ScrollView showsVerticalScrollIndicator={false}>

             <Icon.FontAwesome name = "bars" style = {styles.menuIcon} size ={24} onPress={ () => this.props.navigation.openDrawer()}   />
             <Ionicons name="md-more" size={24} style = {styles.mdmore} />


             <View style = {styles.container}>
              <View style = {{marginTop:60, alignItems:"center"}}>
              <View style = {styles.avatarContainer}>
                 <Image style = {styles.avatar}
                 source={this.props.user.profileImage === null
                          ? require('../assets/imgs/image.png')
                          : {uri:this.props.user.profileImage}
                        }
                  />
                 <TouchableOpacity style = {styles.add} onPress = {()=> this._pickImage()}>
                    <Ionicons name = "ios-add" size = {30} color = "#DFD8C8"   ></Ionicons>
                  </TouchableOpacity>
                </View>

              <Text style = {styles.name}>{this.props.user.username}</Text>
            </View>
            <View style = {styles.statsContainer}>
                <TouchableOpacity style = {styles.stat} onPress = {()=> this.props.navigation.navigate('Invitations')}>
                   <Text style ={styles.statAmount}>76</Text>
                   <Text style = {styles.statTitle}>Invitations</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {localstyles.statbox} onPress = {()=> this.props.navigation.navigate('Cards')}>
                   <Text style ={styles.statAmount}>{this.props.user.receivedCards.length}</Text>
                   <Text style = {styles.statTitle}>Cards</Text>
                </TouchableOpacity>

              </View>
            </View>
      </ScrollView>
      </SafeAreaView>
    );
  }
}
const localstyles = StyleSheet.create({
  statbox:{
    alignItems:"center",
    flex: 1,
    borderColor:"#DfD8C8",
    borderLeftWidth:1,
    borderRightWidth:0
  }
});
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({updateProfileImage,uploadImage},dispatch)
  }
  const mapStateToProps = (state) => {
    return {
      user: state.user,
      card: state.card
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen)
