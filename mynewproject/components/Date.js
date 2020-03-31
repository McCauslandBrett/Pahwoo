import React from 'react';
import {View,Text, Button, Platform} from 'react-native';
import {Month} from '../constants/Month.js'
const Date = (props) => {

  return (
    <Text>{
            Month[props.date.getMonth()]+
            ' ' + props.date.getDate() + ', '+
            props.date.getFullYear()
           }
    </Text>
  );
};

export default Date;
