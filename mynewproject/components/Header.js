import React from 'react';
import {StyleSheet,SafeAreaView, Text, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

export default function Header({navigation}){
  const openMenu = () => {
    navigation.openDrawer()
  }
  return(
    <View>
      <MaterialIcons name='menu' size={28} onPress = {openMenu} style={styles.iconLeft} />
      <MaterialIcons name='accessible' size={28} onPress = {openMenu} style={styles.iconRight} />
    </View>
  );
}
const styles = StyleSheet.create({
  iconLeft:{
    zIndex:1,
    position:'absolute',
    left:16,
    top:25,

  },
  iconRight:{
    position:'absolute',
    right:16,
    top:25,
  }
})
