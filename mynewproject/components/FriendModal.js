import React, {useState} from 'react';
import { View, Text, StyleSheet,SafeAreaView,ScrollView,Modal,Dimensions,Image,ImageBackground} from 'react-native';
import { Button, Block,theme  } from 'galio-framework';
import  ArButton from "./ArButton.js";
import styles from '../styles.js'
import {AntDesign,MaterialIcons,MaterialCommunityIcons} from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import {callNumber} from "./callNumber.js";

const thumbMeasure = (width - 48 - 32) / 3;

export function FriendModal ({p, o, props, username}){
//    const [modal,toggleModal] = useState(o);
    return(
      <SafeAreaView >
         <ScrollView showsVerticalScrollIndicator={false}>
         <Modal animationType={'slide'} transparent={true} visible={o}>
            <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'white', flex: 1}}>
               <AntDesign name="close" style = {styles.menuIcon} size ={24} onPress={() => {props.getContactProfile(false)}}   />

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
                source={{ uri: p }}
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

                <Block row space="between">

                <Block middle>
                  <MaterialIcons  name="phone" size={20}
                    color="#525F7F" style={{ marginBottom: 4 }}
                    onPress = {() => {callNumber(6198690403)}} >
                  </MaterialIcons>
                  <Text size={12}>Call</Text>
                </Block>

                <Block middle>
                <MaterialCommunityIcons  name="calendar-multiselect" size={20}
                  color="#525F7F" style={{ marginBottom: 4 }}
                  onPress = {() => {}} >
                </MaterialCommunityIcons>
                  <Text size={12}>Availablity</Text>
                </Block>

                <Block middle>
                <MaterialCommunityIcons  name="calendar-heart" size={20}
                  color="#525F7F" style={{ marginBottom: 4 }}
                  onPress = {() => {}} >
                </MaterialCommunityIcons>
                  <Text size={12}>Special Dates</Text>
                </Block>

              </Block>

                <Block flex>
                  <Block middle style={Arstyles.nameInfo}>
                  <Text bold size={28} color="#32325D">
                    {username}
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
                  <ArButton color="transparent"
                    textStyle={{
                      color: "#233DD2",
                      fontWeight: "500",
                      fontSize: 16
                      }}
                  >
                    Show more
                 </ArButton>
                  </Block>

                  <Block row style={{ paddingVertical: 14, alignItems: "baseline" }}>
                  <Text bold size={16} color="#525F7F">
                    Album
                  </Text>
                  </Block>

                  <Block row style={{ paddingBottom: 20, justifyContent: "flex-end" }}>
                  <ArButton small color="transparent" textStyle={{ color: "#5E72E4", fontSize: 12 }}>
                      View all
                  </ArButton>
                  </Block>

                  <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                    <Block row space="between" style={{ flexWrap: "wrap" }}>
                      {Images.Viewed.map((img, imgIndex) => (
                        <Image
                          source={{ uri: img }}
                          key={`viewed-${img}`}
                          resizeMode="cover"
                          style={Arstyles.thumb}
                        />
                      ))}
                    </Block>
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
         </ScrollView>
      </SafeAreaView>
    );

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
