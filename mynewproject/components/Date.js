import React from 'react';
import {StyleSheet,View,Text, Button, Platform} from 'react-native';
import {Month} from '../constants/Month.js'
const Date = (props) => {

  return (
    <Text style= {localstyles.cardtext}>{
            Month[props.date.getMonth()]+
            ' ' + props.date.getDate() + ', '+
            props.date.getFullYear()
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
export default Date;
