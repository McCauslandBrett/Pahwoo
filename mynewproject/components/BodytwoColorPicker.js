import React, {Component} from 'react';
import { View, Text, StyleSheet,SafeAreaView,
        ScrollView,TextInput,TouchableOpacity,
        Animated, Dimensions,Modal,TouchableHighlight,
        } from 'react-native';
import { fromHsv } from 'react-native-color-picker'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Ionicons,AntDesign,Entypo} from "@expo/vector-icons";
import styles from '../styles.js'
import {toggleBodytwoColorModal,
  updateBodytwoTextColor
} from '../actions/card.js'
import HsvColorPicker from 'react-native-hsv-color-picker';
class BodytwoColorPicker extends Component{
  constructor(props) {
    super(props);
    this.state = {
      hue: 0,
      sat: 0,
      val: 1,
    };
    this.onSatValPickerChange = this.onSatValPickerChange.bind(this);
    this.onHuePickerChange = this.onHuePickerChange.bind(this);
  }


  onSatValPickerChange({ saturation, value }) {
    this.setState({
      sat: saturation,
      val: value,
    });
    this.props.updateBodytwoTextColor({
        sat: saturation,
        val: value,
        hue: this.state.hue,
      });
  }

  onHuePickerChange({ hue }) {
    this.setState({
      hue,
    });
    this.props.updateBodytwoTextColor({
        sat: this.state.saturation,
        val: this.state.value,
        hue: hue,
      });
  }
  render(){
    const { hue, sat, val } = this.state;
  return(

    <View style={{  justifyContent: 'center', alignItems:'center', flex:1}}>
      <Modal animationType={'slide'} transparent={true} visible={this.props.card.isBodytwoColorModalVisible === true}>
          <View style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
              <View style={{ width: '100%', height: '100%', backgroundColor: 'black', opacity: .6 }}/>
              <View style={{ position: 'absolute', width: '100%', height: '45%', backgroundColor: 'white', flex: 1}}>

                 <AntDesign name="close" style = {styles.menuIcon} size ={24} onPress={() => {this.props.toggleBodytwoColorModal(false)}}   />
                 <View style= {styles.stat}>
                   <Text style={styles.modal_title}> Bodytwo Text Color </Text>
                 </View>


                     <View paddingVertical={20} />

                     <View style = {styles.statsContainer}>
                     <Text style={{fontSize:30 ,color: this.props.card.bodytwo_text_color == null ? 'red':
                       fromHsv({ h: this.props.card.bodytwo_text_color.hue, s: this.props.card.bodytwo_text_color.sat, v:this.props.card.bodytwo_text_color.val })}}> Color </Text>
                     <View style={styles.container}>
                       <HsvColorPicker
                       huePickerHue={hue}
                       onHuePickerDragMove={this.onHuePickerChange}
                       onHuePickerPress={this.onHuePickerChange}
                       satValPickerHue={hue}
                       satValPickerSaturation={sat}
                       satValPickerValue={val}
                       onSatValPickerDragMove={this.onSatValPickerChange}
                       onSatValPickerPress={this.onSatValPickerChange}
                       />
                     </View>
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
    return bindActionCreators({toggleBodytwoColorModal,updateBodytwoTextColor},dispatch)
  }
  const mapStateToProps = (state) => {
    return {

     card: state.card,
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(BodytwoColorPicker )
