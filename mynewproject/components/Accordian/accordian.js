import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "../icons.js";
import { styles } from "./styles";

export default class Acordian extends Component {
  state = {
    collapse: false,
  };
  OptionText(text, mode) {
    if (mode == this.props.user.mode) {
      return <Text style={styles.optionSelected}> {text} </Text>;
    } else {
      return (
        <Text style={[styles.option, { color: this.props.user.theme.TEXT }]}>
          {text}
        </Text>
      );
    }
  }
  setmode = (num) => {
    this.props.setMode(num);
    this.props.setTheme(num);
  };
  render() {
    const CHECKMARK = (
      <Ionicons
        name="md-checkbox-outline"
        style={styles.optiontoggle}
        size={20}
        color="green"
      />
    );

    return (
      <View
        style={{
          backgroundColor: "#fff",
          width: "90%",
          borderRadius: 10,
          shadowColor: "#b3b3b3",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 6,
          elevation: 6,
          justifyContent: "center",
          marginLeft: (Dimensions.get("window").width * 0.1) / 2,
          padding: 10,
        }}
      >
        <Collapse
          isCollapsed={this.state.collapsed}
          onToggle={() => this.setState({ collapse: !this.state.collapse })}
        >
          <CollapseHeader>
            <View style={styles.rowcontainer}>
              <View style={styles.pairContainer}>
                <MaterialCommunityIcons
                  name="palette-advanced"
                  style={[
                    styles.optionlogo,
                    { color: this.props.user.theme.ICON },
                  ]}
                />
                <Text
                  style={[
                    styles.optiontextTitle,
                    { color: this.props.user.theme.TEXT },
                  ]}
                >
                  Theme Option
                </Text>
              </View>
              <Icon.AntDesign
                style={styles.optiontoggle}
                size={16}
                name={this.state.collapse ? "up" : "down"}
                color="gray"
              />
            </View>
          </CollapseHeader>

          <CollapseBody style={styles.container}>
            {[
              { mode: "Light Mode", modeIndex: 0 },
              { mode: "Dark Mode", modeIndex: 1 },
              { mode: "Pahwoo Mode", modeIndex: 2 },
            ].map((val) => {
              return (
                <TouchableOpacity
                  onPress={() => this.setmode(val.modeIndex)}
                  style={styles.optionContainer}
                >
                  {this.OptionText(val.mode, 0)}
                  {this.props.user.mode == val.modeIndex ? CHECKMARK : null}
                </TouchableOpacity>
              );
            })}
          </CollapseBody>
        </Collapse>
      </View>
    );
  }
}
