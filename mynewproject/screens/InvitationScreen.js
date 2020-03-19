<<<<<<< HEAD
import React from 'react';
import { StyleSheet, View } from 'react-native';
import HsvColorPicker from 'react-native-hsv-color-picker';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hue: 0,
      sat: 0,
      val: 1,
    };
    this.onSatValPickerChange = this.onSatValPickerChange.bind(this);
    this.onHuePickerChange = this.onHuePickerChange.bind(this);
=======
import React, {Component} from 'react';
import { View, Text, StyleSheet,SafeAreaView,ScrollView,Modal,Dimensions,Image,ImageBackground} from 'react-native';
import {Header, Left, Right} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Button, Block,theme  } from 'galio-framework';
import  ArButton from "../components/ArButton.js";
import styles from '../styles.js';
import Icon  from "../components/icons.js";
import {Ionicons,AntDesign,Entypo,MaterialIcons,MaterialCommunityIcons} from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import {callNumber} from "../components/callNumber.js"
import { Card, ListItem} from 'react-native-elements'

const thumbMeasure = (width - 48 - 32) / 3;
class InvitationScreen extends Component{
  static navigationOptions = {
    headerTintColor: 'black',
    headerBackTitle: null,
    headerStyle: {
      borderBottomColor:'transparent',
      borderBottomWidth: 0,
    },
>>>>>>> master
  }

  onSatValPickerChange({ saturation, value }) {
    this.setState({
      sat: saturation,
      val: value,
    });
  }

  onHuePickerChange({ hue }) {
    this.setState({
      hue,
    });
  }

  render() {
    const { hue, sat, val } = this.state;
    return (
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
<<<<<<< HEAD
=======
 </Modal>



         </ScrollView>
      </SafeAreaView>
>>>>>>> master
    );
  }
}

<<<<<<< HEAD
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
=======
zIndex: 1
},
profileBackground: {
width: width,
height: height
},
profileCard: {
// position: "relative",
padding: theme.SIZES.BASE,
marginHorizontal: theme.SIZES.BASE,
marginTop: 65,
borderTopLeftRadius: 6,
borderTopRightRadius: 6,
backgroundColor: theme.COLORS.WHITE,
shadowColor: "black",
shadowOffset: { width: 0, height: 0 },
shadowRadius: 8,
shadowOpacity: 0.2,
zIndex: 2
},
info: {
paddingHorizontal: 40
},
avatarContainer: {
position: "relative",
marginTop: -80
},
avatar: {
width: 124,
height: 124,
borderRadius: 62,
borderWidth: 0
},
nameInfo: {
marginTop: 35
},
divider: {
width: "90%",
borderWidth: 1,
borderColor: "#E9ECEF"
},
thumb: {
borderRadius: 4,
marginVertical: 4,
alignSelf: "center",
width: thumbMeasure,
height: thumbMeasure
}
>>>>>>> master
});
