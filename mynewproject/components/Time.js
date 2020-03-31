import React from 'react';
import {StyleSheet,View,Text, Button, Platform} from 'react-native';
import {Month} from '../constants/Month.js'
const Time = (props) => {

  return (
    <Text style= {localstyles.cardtext}>{
            (props.time.getHours() > 12 ? props.time.getHours() - 12:
            props.time.getHours() == 0 ? 12:props.time.getHours()) + ':'+
            (props.time.getUTCMinutes() < 10 ? '0'+ props.time.getUTCMinutes(): props.time.getUTCMinutes() )
            + ' '+ ( props.time.getHours() > 11 ? 'pm':'am')

           }
    </Text>
  );
};
const localstyles = StyleSheet.create({


  cardtext: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize:20,
    fontWeight:'bold',
    alignItems:"center",
    justifyContent:"center"
  },

});
export default Time;
