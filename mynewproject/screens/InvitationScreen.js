import React, {Component} from 'react';
import { StyleSheet, View,Text } from 'react-native';
import HsvColorPicker from 'react-native-hsv-color-picker';
import { fromHsv } from 'react-native-color-picker'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  updateCoverTextColor
} from '../actions/card.js'
class InvitationScreen extends Component {
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
    this.props.updateCoverTextColor({
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
      <Text style={{color: this.props.card.cover_text_color == null ? 'red':
        fromHsv({ h: hue, s: sat, v:val })}}> Color </Text>
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

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({updateCoverTextColor},dispatch)
}
const mapStateToProps = (state) => {
  return {

   card: state.card,
  }
}
  export default connect(mapStateToProps,mapDispatchToProps)(InvitationScreen )
