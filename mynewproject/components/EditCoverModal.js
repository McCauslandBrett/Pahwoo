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
import {toggleCoverModal,updateCoverTextBold,updateCoverTextItalic,
        updateCoverTextAlignment,updateCoverFont,updateCoverText,
        updateBodyoneText,updateBodytwoText,updateCoverTextSize,
        updateCoverTextColor,toggleCoverColorModal}
        from '../actions/card.js'

import Options from '../constants/Options.js'
import NumericInput from 'react-native-numeric-input'
import CoverColorPicker from './CoverColorPicker.js'
import PropTypes from 'prop-types';
class EditCoverModal extends Component{
  state = {
    textalignment:{},
    font:{},
    fA:{},
    isOnBoldToggleSwitch: false,
    isOnItalicToggleSwitch:false,
    defaultTextSize:32,
    defaultColor:'black'
  };
  render(){
    const {toggle,text_color,updateAlignment,
           updateFont,fontSize,updateTextSize,
           updateItalic,updateBold} = this.props;
  return(
    <View style={{  justifyContent: 'center', alignItems:'center', flex:1}}>

      <Modal animationType = {'slide'}
             transparent = {true}
             visible = {this.props.isCoverModalVisible === true}>

          <View style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
              <View style={{ width: '100%', height: '100%', backgroundColor: 'black', opacity: .6 }}/>
              <View style={{ position: 'absolute', width: '100%', height: '50%', backgroundColor: 'white', flex: 1}}>

                 <AntDesign name="close" style = {styles.menuIcon} size ={24} onPress={() => {this.props.toggleCoverModal(false)}}   />
                 <View style= {styles.stat}>
                   <Text style={styles.modal_title}> Edit Cover </Text>
                 </View>
                 <SafeAreaView>

                 <CoverColorPicker />
                 <TouchableOpacity onPress={() => {this.props.toggle(true)}} >
                      <View style={localstyles.square}
                       backgroundColor={this.props.text_color == null ? 'black': this.props.text_color}
                       />
                  </TouchableOpacity>

                  <View paddingVertical={20} />
                   <RNPickerSelect
                    placeholder={Options.placeholder}
                    items={Options.fontAlignOptions}
                    onValueChange={input => { this.props.updateTextAlignment(input);
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
                                        this.props.updateFont(input);
                                        this.setState({font: input});
                                    }
                                    }
                        value={this.state.font}
                        Icon={() => {
                        return <Chevron style = {styles.mdmore3} size={2.0} color="gray" />;
                        }}


                        useNativeAndroidPickerStyle={false}

                        />
                     </SafeAreaView>
                     <View paddingVertical={20} />

                     <View style = {styles.statsContainer}>

                     <NumericInput value = {(this.props.card.font_size == null) ? this.state.defaultTextSize:this.props.card.font_size}
                      onChange={value => this.props.updateTextSize(value)}
                      rounded
                      totalWidth={100}
                      totalHeight={40}
                      />
                     <ToggleSwitch
                       label="Bold"
                       onColor="#2196F3"
                       isOn={this.props.card.text_bold}
                       onToggle={isOnBoldToggleSwitch => this.props.updateTextBold(isOnBoldToggleSwitch)}

                     />
                     <ToggleSwitch
                       label="Italic"
                       onColor="#2196F3"
                       isOn={this.props.card.text_italic}
                       onToggle={isOnItalicToggleSwitch => this.props.updateTextItalic(isOnItalicToggleSwitch)}
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
    return bindActionCreators({toggleCoverModal,toggleCoverColorModal,updateCoverTextBold,
      updateCoverTextItalic,updateCoverTextAlignment,updateCoverFont,
      updateCoverTextSize },dispatch)
  }
  const mapStateToProps = (state) => {
    return {

     card: state.card,
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(EditCoverModal)
