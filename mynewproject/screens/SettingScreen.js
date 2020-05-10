import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Header, Left, Right } from "native-base";
import { List, Checkbox } from "react-native-paper";
import Icon from "../components/icons.js";

import {
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
  SimpleLineIcons,
  AntDesign,
} from "@expo/vector-icons";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { logout } from "../actions/user.js";
import firebase from "firebase";
import styles from "../styles.js";
import { Chevron } from "react-native-shapes";
import Accordian from "../components/Accordian";
import theme from "../constants/themeMode.js";

class SettingScreen extends Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon.FontAwesome
        name="cogs"
        style={{ fontSize: 24, color: tintColor }}
      />
    ),
  };
  state = {
    expanded: true,
  };

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded,
    });

  logout = () => {
    firebase.auth().signOut();
    this.props.logout();
    this.props.navigation.navigate("Login");
  };
  colorStyles = () => {
    backgroundColor: this.props.user.theme.BACKGROUND;
  };
  colorlogo = () => {
    color: this.props.user.theme.ICON;
  };

  render() {
    const optionContainer = [localstyles.rowcontainer];
    var icon = [localstyles.optionlogo, this.colorlogo];
    return (
      <SafeAreaView
        style={{
          backgroundColor: this.props.user.theme.BACKGROUND,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Icon.FontAwesome
            name="bars"
            style={[styles.menuIcon, { color: this.props.user.theme.ICON }]}
            size={24}
            onPress={() => this.props.navigation.openDrawer()}
          />

          <View style={{ marginBottom: 50 }} />

          <Accordian />

          <TouchableOpacity
            onPress={() => this.logout()}
            style={localstyles.rowcontainer}
          >
            <SimpleLineIcons
              name="logout"
              style={[
                localstyles.optionlogo,
                { color: this.props.user.theme.ICON },
              ]}
            />
            <Text
              style={[
                localstyles.optiontextTitle,
                { color: this.props.user.theme.TEXT },
              ]}
            >
              logout{" "}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={localstyles.rowcontainer}>
            <AntDesign
              name="edit"
              style={[
                localstyles.optionlogo,
                { color: this.props.user.theme.ICON },
              ]}
            />
            <Text
              style={[
                localstyles.optiontextTitle,
                { color: this.props.user.theme.TEXT },
              ]}
            >
              Username{" "}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={localstyles.rowcontainer}>
            <AntDesign
              name="edit"
              style={[
                localstyles.optionlogo,
                { color: this.props.user.theme.ICON },
              ]}
            />
            <Text
              style={[
                localstyles.optiontextTitle,
                { color: this.props.user.theme.TEXT },
              ]}
            >
              Email{" "}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={localstyles.rowcontainer}>
            <AntDesign
              name="edit"
              style={[
                localstyles.optionlogo,
                { color: this.props.user.theme.ICON },
              ]}
            />
            <Text
              style={[
                localstyles.optiontextTitle,
                { color: this.props.user.theme.TEXT },
              ]}
            >
              Password{" "}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={localstyles.rowcontainer}>
            <MaterialCommunityIcons
              name="calendar-edit"
              style={[
                localstyles.optionlogo,
                { color: this.props.user.theme.ICON },
              ]}
            />
            <Text
              style={[
                localstyles.optiontextTitle,
                { color: this.props.user.theme.TEXT },
              ]}
            >
              Birthday{" "}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={localstyles.rowcontainer}>
            <MaterialCommunityIcons
              name="credit-card-multiple"
              style={[
                localstyles.optionlogo,
                { color: this.props.user.theme.ICON },
              ]}
            />
            <Text
              style={[
                localstyles.optiontextTitle,
                { color: this.props.user.theme.TEXT },
              ]}
            >
              Payment{" "}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const localstyles = StyleSheet.create({
  optionlogo: {
    fontSize: 30,
  },
  rowcontainer: {
    marginTop: 15,
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  optiontoggle: {
    marginRight: 10,
  },
  optionContainer: {
    paddingVertical: 10,
  },
  container: {
    marginTop: 15,
    marginLeft: 15,
    paddingHorizontal: 10,
  },
  optiontextTitle: {
    fontSize: 20,
    paddingHorizontal: 10,
    marginLeft: 20,
  },
  option: {
    fontSize: 20,
  },
  backdrop: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme[1].BACKGROUND,
  },
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ logout }, dispatch);
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);
