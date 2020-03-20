import React from 'react';
import PropTypes from 'prop-types';
import {TextInput,Text, StyleSheet,View} from 'react-native';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateBodyoneText} from '../actions/card.js'
import palette from '../palette.js'
import * as Font from 'expo-font';
import { fromHsv } from 'react-native-color-picker'

class TextinBodyone extends React.Component{
state = {
  align:null,
  defaultAlign :'center', //default

}
textA = () => {
 return (
   <TextInput multiline = {true}
   style={[
        {
          fontSize: (this.props.card.bodyone_font_size == null) ?
          24 : this.props.card.bodyone_font_size,
          color: (this.props.card.bodyone_text_color== null) ? palette.LIGHT_GRAY:
            fromHsv({ h: this.props.card.bodyone_text_color.hue, s: this.props.card.bodyone_text_color.sat, v:this.props.card.bodyone_text_color.val }),
          fontWeight:this.props.card.bodyone_bold,
          fontStyle:this.props.card.bodyone_italic,
          fontFamily:this.props.card.bodyone_font,
          alignItems:'center',
          justifyContent: 'center',
          margin:20,
          textAlign: (this.props.card.bodyone_text_align == null) ?
          this.state.defaultAlign :
          this.props.card.bodyone_text_align
        }
     ]}
     value = {this.props.card.bodyone_text}
     onChangeText = {input => this.props.updateBodyoneText(input)}
     placeholder = 'Body One'
     />
)
}
 render(){
        var message = this.textA()
        return (<View>{message}</View>);
   }

}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({updateBodyoneText},dispatch)
}
const mapStateToProps = (state) => {
  return {
   // user: state.user,
   card: state.card,
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(TextinBodyone)
