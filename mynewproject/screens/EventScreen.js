import React, {Component} from 'react';
import { View, Text, StyleSheet,SafeAreaView,ScrollView,Modal,Dimensions,Image,ImageBackground} from 'react-native';
import {Header, Left, Right} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Button, Block,theme  } from 'galio-framework';
import  ArButton from "../components/ArButton.js";
import styles from '../styles.js'
import Icon  from "../components/icons.js";
import {Ionicons,AntDesign,Entypo,MaterialIcons,MaterialCommunityIcons} from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import {callNumber} from "../components/callNumber.js"
const thumbMeasure = (width - 48 - 32) / 3;
class InvitationScreen extends Component{
  static navigationOptions = {
    headerTintColor: 'black',
    headerBackTitle: null,
    headerStyle: {
      borderBottomColor:'transparent',
      borderBottomWidth: 0,
    },
  }
  state = {
      isModalVisible: false,

  }
  setModalVisible = (visible) => {
    this.setState({isModalVisible: visible});
  }

  render(){
    return(
      <SafeAreaView >
         <ScrollView showsVerticalScrollIndicator={false}>
         <Modal animationType={'slide'} transparent={true} visible={this.state.isModalVisible === true}>
            <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'white', flex: 1}}>
               <AntDesign name="close" style = {styles.menuIcon} size ={24} onPress={() => {this.setModalVisible(false)}}   />

      <Block flex style={Arstyles.profile}>
        <Block flex>
        <ImageBackground
            source={{uri:Images.ProfileBackground}}
            style={Arstyles.profileContainer}
            imageStyle={Arstyles.profileBackground}
          >
          <ScrollView showsVerticalScrollIndicator={false} style={{ width, marginTop: '25%' }}>
            <Block flex style = {Arstyles.profileCard}>

              <Block middle style={Arstyles.avatarContainer}>
                <Image
                source={{ uri: Images.ProfilePicture }}
                style={Arstyles.avatar}
                />
              </Block>

              <Block flex>

                <Block style={Arstyles.info}>
                  <Block middle row space="evenly" style={{ marginTop: 20, paddingBottom: 24 }}>
                    <ArButton small style={{ backgroundColor: argonTheme.COLORS.INFO }}>
                      CONNECT
                    </ArButton>
                    <ArButton small style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}>
                      MESSAGE
                    </ArButton>
                  </Block>
                </Block>


                <Block flex>
                  <Block middle style={Arstyles.nameInfo}>
                  <Text bold size={28} color="#32325D">
                    Jessica Jones, 27
                  </Text>
                  <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                    San Francisco, USA
                  </Text>
                  </Block>

                  <Block middle>
                  <Text size={16} color="#525F7F" style={{ textAlign: "center" }}>
                    An artist of considerable range, Jessica name taken by
                    Melbourne …
                  </Text>

                  </Block>

                  <Block row style={{ paddingVertical: 14, alignItems: "baseline" }}>

                  </Block>
                </Block>
              </Block>

            </Block>

          </ScrollView>
          </ImageBackground>
        </Block>
      </Block>
      </View>
 </Modal>



          <Block center>
            <Button shadowless color="info"
            onPress={() => {this.setModalVisible(true)}}
            style={[styles.button, styles.shadow]}>
              INFO
            </Button>
          </Block>

         </ScrollView>
      </SafeAreaView>
    );
  }
}
const Arstyles = StyleSheet.create({
profile: {
marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
 marginBottom: -HeaderHeight * 2,
flex: 1
},
profileContainer: {
width: width,
height: height,
padding: 0,

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
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({},dispatch)
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(InvitationScreen)
