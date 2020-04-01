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
import { fromHsv } from 'react-native-color-picker'
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import ToggleSwitch from 'toggle-switch-react-native'


import Options from '../constants/Options.js'
import NumericInput from 'react-native-numeric-input'
import ColorPicker from './ColorPicker.js'
import PropTypes from 'prop-types';
class EditModal extends Component{
  state = {
    textalignment:{},
    font:{},
    fA:{},
    isOnBoldToggleSwitch: false,
    isOnItalicToggleSwitch:false,
    defaultTextSize:32,
    defaultColor:'black',
    colorVisible:false,
  };
  toggleColorModal = (bool) => {
    this.setState({
      colorVisible:bool
    })

  }
  render(){

  return(
    <View style={{  justifyContent: 'center', alignItems:'center', flex:1}}>

      <Modal animationType = {'slide'}
             transparent = {true}
             visible = {this.props.isModalVisible === true}>

          <View style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
              <View style={{ width: '100%', height: '100%', backgroundColor: 'black', opacity: .6 }}/>
              <View style={{ position: 'absolute', width: '100%', height: '50%', backgroundColor: 'white', flex: 1}}>

                 <AntDesign name="close" style = {styles.menuIcon} size ={24} onPress={() => {this.props.toggle(false)}}   />
                 <View style= {styles.stat}>
                   <Text style={styles.modal_title}> Edit {this.props.name} </Text>
                 </View>
                 <SafeAreaView>

                 <ColorPicker
                  name = {this.props.name}
                  toggleColorModal = {this.toggleColorModal}
                  updateTextColor = {this.props.updateTextColor}
                  text_color = {this.props.text_color}
                  isVisible = {this.state.colorVisible}
                  />

                 <TouchableOpacity onPress={() => this.toggleColorModal(true)} >
                      <View style={localstyles.square}
                       backgroundColor={this.props.text_color == null ? 'black':
                       fromHsv({ h: this.props.text_color.hue, s: this.props.text_color.sat, v:this.props.text_color.val })}
                       />
                  </TouchableOpacity>

                  <View paddingVertical={20} />
                   <RNPickerSelect
                    placeholder={Options.placeholder}
                    items={Options.fontAlignOptions}
                    onValueChange={input => { this.props.updateAlignment(input);
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

                     <NumericInput value = {(this.props.fontSize == null) ? this.state.defaultTextSize:this.props.fontSize}
                      onChange={value => this.props.updateTextSize(value)}
                      rounded
                      totalWidth={100}
                      totalHeight={40}
                      />
                     <ToggleSwitch
                       label="Bold"
                       onColor="#2196F3"
                       isOn={this.props.isBold}
                       onToggle={isOnBoldToggleSwitch => this.props.updateBold(isOnBoldToggleSwitch)}

                     />
                     <ToggleSwitch
                       label="Italic"
                       onColor="#2196F3"
                       isOn={this.props.isItalic}
                       onToggle={isOnItalicToggleSwitch => this.props.updateItalic(isOnItalicToggleSwitch)}
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
    return bindActionCreators({},dispatch)
  }
  const mapStateToProps = (state) => {
    return {

     card: state.card,
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(EditModal)
