import React, {Component} from 'react';
import { View, Text, StyleSheet,SafeAreaView,
        ScrollView,TextInput,TouchableOpacity,
        Animated, Dimensions,Modal,TouchableHighlight,
        Alert,   ColorPropType,Keyboard,
        Picker,
        } from 'react-native';
import {Header, Left, Right} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js";
import {Ionicons,AntDesign,Entypo} from "@expo/vector-icons";
import styles from '../styles.js'
import { width, height, totalSize } from 'react-native-dimension';

import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import ToggleSwitch from 'toggle-switch-react-native'
import {toggleBodyoneModal,updateBodyoneTextBold,updateBodyoneTextItalic,
        updateBodyoneTextAlignment,updateBodyoneFont,
        updateBodyoneText,updateBodyoneTextSize,
        updateBodyoneTextColor}
        from '../actions/card.js'
import NumericInput from 'react-native-numeric-input'
import { ColorPicker, TriangleColorPicker } from 'react-native-color-picker'

class EditBodyoneModal extends Component{
  state = {
    textalignment:{},
    font:{},
    fA:{},
    isOnBoldToggleSwitch: false,
    isOnItalicToggleSwitch:false,
    defaultTextSize:24,
  };

  render(){

    const placeholder = {
    label: 'Select a textAlignment',
    value: null,
    color: '#9EA0A4',
    };

    const placeholderfont = {
    label: 'Select a Font',
    value: null,
    color: '#9EA0A4',
    };

    const fontAlignOptions = [
      {
        label: 'Center',
        value: 'center',
      },
      {
        label: 'Right',
        value: 'right',
      },
      {
        label: 'Left',
        value: 'left',
      },
    ];

  const placeholderFonts = {
    label: 'Select a font',
    value: null,
    color: '#9EA0A4',
  };
  const fontOptions = [
    {
      label: 'Times New Roman',
      value: 'Times New Roman',

    },
    {
      label: 'American Typewriter',
      value: 'American Typewriter',
    },
    {
      label: 'Arial',
      value: 'Arial',
    },
    {
      label: 'Didot',
      value: 'Didot',
    },
    {
      label: 'Helvetica',
      value: 'Helvetica',
    },
    {
      label: 'Avenir',
      value: 'Avenir',

    },
    {
      label: 'Baskerville',
      value: 'Baskerville',
    },
    {
      label: 'Bradley Hand',
      value: 'Bradley Hand',
    },
    {
      label: 'Chalkboard SE',
      value: 'Chalkboard SE',
    },
    {
      label: 'Cochin',
      value: 'Cochin',
    },
    {
      label: 'Snell Roundhand',
      value: 'Snell Roundhand',
    },
    {
      label: 'Zapfino',
      value: 'Zapfino',
    },
  ];

  return(
    <View style={{  justifyContent: 'center', alignItems:'center', flex:1}}>
      <Modal animationType={'slide'} transparent={true} visible={this.props.card.isBodyoneModalVisible === true}>
          <View style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
              <View style={{ width: '100%', height: '100%', backgroundColor: 'black', opacity: .6 }}/>
              <View style={{ position: 'absolute', width: '100%', height: '50%', backgroundColor: 'white', flex: 1}}>

                 <AntDesign name="close" style = {styles.menuIcon} size ={24} onPress={() => {this.props.toggleBodyoneModal(false)}}   />
                 <View style= {styles.stat}>
                   <Text style={styles.modal_title}> Edit Body One </Text>
                 </View>


                 <RNPickerSelect
                   placeholder={placeholder}
                   items={fontAlignOptions}
                   onValueChange={input => {
                                  this.props.updateBodyoneTextAlignment(input);
                                  this.setState({fA: input});
                                }
                    }
                   value={this.state.fA}
                   Icon={() => {
                     return <Chevron style = {styles.mdmore3} size={2.0} color="gray" />;
                   }}


                   useNativeAndroidPickerStyle={false}

                   />
                    <View paddingVertical={20} />
                   <RNPickerSelect
                     placeholder={placeholderfont}

                     items={fontOptions}
                     onValueChange={input => {
                                    this.props.updateBodyoneFont(input);
                                    this.setState({font: input});
                                  }
                                }
                     value={this.state.font}
                     Icon={() => {
                       return <Chevron style = {styles.mdmore3} size={2.0} color="gray" />;
                     }}


                     useNativeAndroidPickerStyle={false}

                     />
                     <View paddingVertical={20} />

                     <View style = {styles.statsContainer}>

                     <NumericInput value = {(this.props.card.bodyone_font_size == null) ? this.state.defaultTextSize:this.props.card.bodyone_font_size}
                      onChange={value => this.props.updateBodyoneTextSize(value)}
                      rounded
                      totalWidth={100}
                      totalHeight={40}
                      />
                     <ToggleSwitch
                       label="Bold"
                       onColor="#2196F3"
                       isOn={this.props.card.bodyone_text_bold}
                       onToggle={isOnBoldToggleSwitch => this.props.updateBodyoneTextBold(isOnBoldToggleSwitch)}

                     />
                     <ToggleSwitch
                       label="Italic"
                       onColor="#2196F3"
                       isOn={this.props.card.bodyone_text_italic}
                       onToggle={isOnItalicToggleSwitch => this.props.updateBodyoneTextItalic(isOnItalicToggleSwitch)}
                     />

                     </View>
                     <View paddingVertical={20} />
              </View>
          </View>
      </Modal>
      </View>
    );
  }
  }
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({toggleBodyoneModal,updateBodyoneTextBold,updateBodyoneTextItalic,updateBodyoneTextAlignment,updateBodyoneFont,updateBodyoneTextSize },dispatch)
  }
  const mapStateToProps = (state) => {
    return {

     card: state.card,
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(EditBodyoneModal)
