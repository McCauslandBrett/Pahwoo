import {StyleSheet,Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window').height;

// colors
const ICON_COLOR = "#52575D";

export default styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent: 'center'
  },

  menuIcon:{
    zIndex:9,
    position:"absolute",
    top:10,
    left:20,
    color:ICON_COLOR
  },
  mdmore:{
      color:ICON_COLOR,
      zIndex:9,
      position:"absolute",
      top:10,
      right:20,
  },
  
  contactsContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  
  contactsItem: {
    backgroundColor: 'lightgreen',
    padding: 20,
    marginVertical: 8,
    justifyContent: 'center'
  },
  
  contactsHeader: {
    fontSize: 32,
  },
  
  contactsTitle: {
    fontSize: 24,
  }
});
