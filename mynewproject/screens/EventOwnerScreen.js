import React, {Component} from 'react';

import { StyleSheet, Dimensions,  View, Text,
  Image,TouchableOpacity,Modal,
  ScrollView, Button ,SafeAreaView} from 'react-native';

import { SocialIcon } from 'react-native-elements'
import { Block, theme } from 'galio-framework';
import {Cards} from '../components/Card.js'
import styles from '../styles.js';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Ionicons} from "@expo/vector-icons";
import { Images, argonTheme } from "../constants";
const thumbMeasure = (width - 48 - 32) / 3;
import { HeaderHeight } from "../constants/utils";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Appearance, useColorScheme } from 'react-native-appearance';
import {updateDate,updateTime} from '../actions/event.js'
import Date from '../components/Date.js'
class EventOwnerScreen extends Component {


  state = {
    isDatePickerVisible:false,
    date:null,
    mode:'date',
    colorMode: Appearance.getColorScheme()
  };


  setDatePickerVisibility = (_bool) =>{
    this.setState({
      isDatePickerVisible:_bool
    })
  };
  showDatePicker = () => {
    this.setState({
      mode:'date'
    })
    this.setDatePickerVisibility(true);
  };
  showTimePicker = () => {
    this.setState({
      mode:'time'
    })
    this.setDatePickerVisibility(true);
  };

  hideDatePicker = () => {
    this.setDatePickerVisibility(false);
  };

  handleConfirm = date => {
    const num = date.getMonth()
    if(num === 1){
      console.log("its a number")
    }

    console.log(JSON.stringify(date));
    this.setState({
      date:date
    });
    this.props.updateDate(date);
    this.hideDatePicker();


  };
  handleConfirmTime = time => {
    this.props.updateTime(time)
    this.hideDatePicker();

  };
  render() {

    const cardContainer = [localstyles.card, localstyles.shadow,localstyles.verticalStyles];
    const statscardContainer = [localstyles.statscard, localstyles.shadow,localstyles.verticalStyles];
    const imgContainer = [localstyles.imageContainer,localstyles.shadow];
    const ovalButton = [localstyles.ButtonGuest,localstyles.shadow];
    const roundButton = [localstyles.addUser,localstyles.shadow];
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({
        colorMode:colorScheme
      })
    });


    return (

       <ScrollView>
       <DateTimePickerModal
       format="DD-MM-YYYY"
       isVisible={this.state.isDatePickerVisible}
       mode={this.state.mode}
       onConfirm={this.handleConfirm}
       onCancel={this.hideDatePicker}
       headerTextIOS = {this.state.mode=='time' ? 'Pick A Time':null }
       isDarkModeEnabled = {this.state.colorMode === 'dark' ? true:false}
       />

      <Block  card style={cardContainer}>
       <Block  style={imgContainer}>
         <Image source={{uri: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'}} style={localstyles.fullImage} />
         <TouchableOpacity style = {localstyles.add} >
            <Ionicons name = "ios-add" size = {30} color = "#DFD8C8"   ></Ionicons>
          </TouchableOpacity>
       </Block>
       <Block flex space="between" style={localstyles.cardDescription}>
         <Text  style={localstyles.cardTitle}>Guests</Text>
      <SafeAreaView style={styles.contactRowStack}>

       <TouchableOpacity style = {ovalButton} >
            <Text style ={{color:'white', textAlign:'center',fontSize:20,fontWeight:'bold'}}> EDIT </Text>
       </TouchableOpacity>

       <TouchableOpacity style = {roundButton} >
            <Ionicons style ={{color:'white'}} name= "ios-person-add" size={25}/>
       </TouchableOpacity>
      </SafeAreaView>
       </Block>
      </Block>

      <Block  card style={statscardContainer}>

       <View style = {styles.statsContainer}>
           <TouchableOpacity style = {styles.stat}>
              <Text style ={styles.statAmount}>76</Text>
              <Text style = {styles.statTitle}>ATTENDING</Text>
           </TouchableOpacity>

           <TouchableOpacity style = {styles.statbox} >
              <Text style ={styles.statAmount}>24</Text>
              <Text style = {styles.statTitle}>RESPONDED</Text>
           </TouchableOpacity>

           <TouchableOpacity style = {styles.stat} >
             <Text style ={styles.statAmount}>3</Text>
             <Text style = {styles.statTitle}>NOT ATTENDING</Text>
          </TouchableOpacity>
         </View>
      </Block>

      <Block  card style={statscardContainer}>

        <Block flex space="between" style={localstyles.cardDescription}>
          <Text  style={localstyles.cardTitle}>Location</Text>
          </Block>

      </Block>

      <Block  card style={statscardContainer}>
      <View style={styles.contactRowStack}>
      <Block flex space="between" style={localstyles.cardDescription}>
        <Text  style={localstyles.cardTitle}>DATE</Text>

        { this.props._event.date != null ?
          <Date
            date={this.props._event.date}
          />
          :<Text>No Date</Text>}

        <TouchableOpacity style = {ovalButton} onPress={()=>{this.showDatePicker()}}>
           <Text style ={{color:'white', textAlign:'center',fontSize:20,fontWeight:'bold'}} > DATE </Text>
        </TouchableOpacity>


        <TouchableOpacity style = {ovalButton} onPress={()=>{this.showTimePicker()}}>
           <Text style ={{color:'white', textAlign:'center',fontSize:20,fontWeight:'bold'}}> Time </Text>
        </TouchableOpacity>

      </Block>
      </View>
      </Block>

      <Block style = {{marginBottom:20,marginLeft:5}}>
      <Text  style={localstyles.cardTitle}>Photos</Text>
      </Block>

      <Block style = {{marginLeft:20,marginRight:20}}>
        <Block row space="between" style={{ flexWrap: "wrap" }}>
          {Images.Viewed.map((img, imgIndex) => (
            <Image
              source={{ uri: img }}
              key={`viewed-${img}`}
              resizeMode="cover"
              style={localstyles.thumb}
            />
          ))}
        </Block>
      </Block>

      </ScrollView>

    );
}

}
const localstyles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    marginVertical: 0,
    borderWidth: 0,
    minHeight: 200,
    marginBottom: 10,

  },
  thumb: {
  borderRadius: 4,
  marginVertical: 4,
  alignSelf: "center",
  width: thumbMeasure,
  height: thumbMeasure
},
  add:{
    backgroundColor:"blue",
    position: "absolute",
    bottom:35,
    right:10,
    width:40,
    height:40,
    borderRadius:40,
    alignItems:"center",
    justifyContent:"center"
  },
  ButtonGuest: {
    width: 80,
    height: 40,
    borderRadius: 25,
    backgroundColor: 'blue',
    justifyContent:'center',

},
addUser: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: 'blue',
  justifyContent:'center',
  alignItems:'center',
  marginLeft:4

},
  statscard: {
    backgroundColor: 'white',
    marginVertical: 0,
    borderWidth: 0,
    minHeight: 100,
    marginBottom: 10,

  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize:28,
    fontWeight:'bold'
  },
  cardDescription: {
     padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    height:240,
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 215,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  home: {
  width: width,
},
articles: {
  width: width - theme.SIZES.BASE * 2,
  paddingVertical: theme.SIZES.BASE,
},
});


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({updateDate,updateTime},dispatch)
  }
  const mapStateToProps = (state) => {
    return {
      _event:state._event
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(EventOwnerScreen)
