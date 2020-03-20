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
import {toggleBodytwoColorModal,toggleBodytwoModal,updateBodytwoTextBold,updateBodytwoTextItalic,
        updateBodytwoTextAlignment,updateBodytwoFont,
        updateBodytwoText,updateBodytwoTextSize,
        updateBodytwoTextColor}
        from '../actions/card.js'
import NumericInput from 'react-native-numeric-input'
import { ColorPicker, TriangleColorPicker } from 'react-native-color-picker'
import Options from '../constants/Options.js'
import BodytwoColorPicker from './BodytwoColorPicker.js'
class EditBodytwoModal extends Component{
  state = {
    textalignment:{},
    font:{},
    fA:{},
    isOnBoldToggleSwitch: false,
    isOnItalicToggleSwitch:false,
    defaultTextSize:24,
  };

  render(){
  return(
    <View style={{  justifyContent: 'center', alignItems:'center', flex:1}}>
      <Modal animationType={'slide'} transparent={true} visible={this.props.card.isBodytwoModalVisible === true}>
          <View style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
              <View style={{ width: '100%', height: '100%', backgroundColor: 'black', opacity: .6 }}/>
              <View style={{ position: 'absolute', width: '100%', height: '50%', backgroundColor: 'white', flex: 1}}>

                 <AntDesign name="close" style = {styles.menuIcon} size ={24} onPress={() => {this.props.toggleBodytwoModal(false)}}   />
                 <View style= {styles.stat}>
                   <Text style={styles.modal_title}> Edit Body Two </Text>
                 </View>

                 <BodytwoColorPicker />
                 <TouchableOpacity onPress={() => {this.props.toggleBodytwoColorModal(true)}} >
                      <View style={localstyles.square}
                       backgroundColor={this.props.card.bodytwo_text_color == null ? 'black':this.props.bodytwo_font_color}
                       />
                  </TouchableOpacity>

                 <RNPickerSelect
                   placeholder={Options.placeholder}
                   items={Options.fontAlignOptions}
                   onValueChange={input => {
                                  this.props.updateBodytwoTextAlignment(input);
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
                     placeholder={Options.placeholderfont}

                     items={Options.fontOptions}
                     onValueChange={input => {
                                    this.props.updateBodytwoFont(input);
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

                     <NumericInput value = {(this.props.card.bodytwo_font_size == null) ? this.state.defaultTextSize:this.props.card.Bodytwo_font_size}
                      onChange={value => this.props.updateBodytwoTextSize(value)}
                      rounded
                      totalWidth={100}
                      totalHeight={40}
                      />
                     <ToggleSwitch
                       label="Bold"
                       onColor="#2196F3"
                       isOn={this.props.card.bodytwo_text_bold}
                       onToggle={isOnBoldToggleSwitch => this.props.updateBodytwoTextBold(isOnBoldToggleSwitch)}

                     />
                     <ToggleSwitch
                       label="Italic"
                       onColor="#2196F3"
                       isOn={this.props.card.bodytwo_text_italic}
                       onToggle={isOnItalicToggleSwitch => this.props.updateBodytwoTextItalic(isOnItalicToggleSwitch)}
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
  const localstyles = StyleSheet.create({
    square: {
      width: 30,
      height: 30,
      marginLeft: 11,
    }
  });
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({toggleBodytwoColorModal,toggleBodytwoModal,updateBodytwoTextBold,updateBodytwoTextItalic,updateBodytwoTextAlignment,updateBodytwoFont,updateBodytwoTextSize },dispatch)
  }
  const mapStateToProps = (state) => {
    return {

     card: state.card,
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(EditBodytwoModal)
