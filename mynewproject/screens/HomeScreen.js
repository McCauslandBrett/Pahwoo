import React, {Component} from 'react';
import { View,SafeAreaView,ScrollView, StyleSheet,Dimensions, Image,TouchableOpacity} from 'react-native';
import {Header, Left, Right} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Card,Button,Block,theme,Text,Icon,NavBar} from 'galio-framework';

import {Ionicons} from "@expo/vector-icons";
import {updateProfileImage,uploadImage} from '../actions/user.js'
import * as firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import styles from '../styles.js';
import uuid from 'uuid';
import db from '../config/firebase';
const { height, width } = Dimensions.get('screen');
import Constants from 'expo-constants';
const { statusBarHeight } = Constants;


class HomeScreen extends Component{
  static navigationOptions = {
      headerBackTitle: null,
    drawerIcon : ({tintColor}) => (
      <Icon family="FontAwesome" name= "home" style = {{fontSize:24, color:tintColor}}/>
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
      <Block flex center safe style={{width: width,backgroundColor: this.props.user.theme.BACKGROUND}}>
      <Block style={localstyles.navbar}>
      <NavBar transparent
         left={(
            <TouchableOpacity onPress={ () => this.props.navigation.openDrawer()}>
              <Icon name="menu" family="feather"
                size={24}
                style = {{color: this.props.user.theme.ICON}}
              />
            </TouchableOpacity>
          )}

      />
      </Block>



         <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{  width: width - theme.SIZES.BASE * 2,
          paddingVertical: theme.SIZES.BASE}}>



             <Block middle>

              <Block middle style = {{marginTop:20}}>
              <Block style = {{shadowRadius:30,shadowOpacity:0.4,
                              shadowColor:this.props.user.theme.SHADOW}}>
                 <Image style = {styles.avatar}
                 source={this.props.user.profileImage === null
                          ? require('../assets/imgs/image.png')
                          : {uri:this.props.user.profileImage}
                        }
                  />
                 <TouchableOpacity style = {[styles.add,{backgroundColor:this.props.user.theme.ICON}]} onPress = {()=> this._pickImage()}>
                    <Ionicons name = "ios-add" size = {30} style = {{color:this.props.user.theme.PLUS}}   ></Ionicons>
                 </TouchableOpacity>
              </Block>
              <Text bold h5 color={this.props.user.theme.TEXT} style = {{marginTop:20}}>{this.props.user.username}</Text>
              </Block>

            <Block row middle space={'between'} style = {{margin:20}}>
                <TouchableOpacity style = {styles.stat} onPress = {()=> this.props.navigation.navigate('Invitations')}>
                   <Text color={this.props.user.theme.TEXT} size={18}>76</Text>
                   <Text color={this.props.user.theme.TEXT} size={12} style = {{marginTop:4}}>Invitations</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {localstyles.statbox} onPress = {()=> this.props.navigation.navigate('Cards')}>
                   <Text color={this.props.user.theme.TEXT} size={18}>{this.props.user.receivedCards.length}</Text>
                   <Text color={this.props.user.theme.TEXT} size={14} style = {{marginTop:4}}>Cards</Text>
                </TouchableOpacity>

            </Block>

            </Block>
      </ScrollView>
      </Block>
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
  },
  navbar: {
  top: 10,
  left: 0,
  right: 0,
  zIndex: 9999,
  position: 'absolute',

  justifyContent: "space-between"

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
