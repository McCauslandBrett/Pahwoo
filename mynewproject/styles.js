import {StyleSheet,Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window').height;
import palette from './palette.js'
// colors
const ICON_COLOR = "#52575D";

export default styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent: 'center'
  },
  modalViewContainer:{
   height: palette.MODAL_HEIGHT,
   width: palette.MODAL_WIDTH,
   backgroundColor:palette.LIGHT_GRAY,
   borderRadius:5,

 },
 modalButtonText:{
   fontSize:20,
   color:'blue',
   fontWeight:'bold',
 },
 modalStyle:{
   justifyContent:'flex-end',
   height: 500,

 },
 modalSeperatorLine:{
  width:'100%',
  height:StyleSheet.hairlineWidth,
  backgroundColor:palette.LIGHT_GRAY,
  bottom:0,

},
modalSmallContainerView:{
  // width:'100%',
  // height: hieght / 3,
  alignItems:'center',
  justifyContent:'center'
},
modal_top:{
  flexDirection:"row",
  flex:1,
  margin:20,
},
modal_title:{
  marginBottom: 4,
  marginTop:10,
  fontSize:16,
  fontWeight:'bold',
  alignItems:'center',
  justifyContent:'center',
  color:'black',
},
iconContainer: {
  position: 'absolute',
  right: 0,
},
modalViewTop: {
  flex: 1,
},
modalViewMiddle: {
  height: 44,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 10,
  backgroundColor: '#EFF1F2',
  borderTopWidth: 0.5,
  borderTopColor: '#919498',
  zIndex: 2,
},
chevronContainer: {
  flexDirection: 'row',
},
chevron: {
  width: 15,
  height: 15,
  backgroundColor: 'transparent',
  borderColor: '#D0D4DB',
  borderTopWidth: 1.5,
  borderRightWidth: 1.5,
},
chevronUp: {
  marginLeft: 11,
  transform: [{ translateY: 4 }, { rotate: '-45deg' }],
},
chevronDown: {
  marginLeft: 22,
  transform: [{ translateY: -5 }, { rotate: '135deg' }],
},
chevronActive: {
  borderColor: '#007AFE',
},
done: {
  color: '#007AFE',
  fontWeight: 'bold',
  fontSize: 15,
  paddingTop: 1,
  paddingRight: 2,
},
modalViewBottom: {
  justifyContent: 'center',
  backgroundColor: '#D0D4DB',
},

  menuIcon:{
    zIndex:9,
    position:"absolute",
    top:10,
    left:20,
    color:ICON_COLOR
  },
  
  placeholder: {
    color: '#C7C7CD',
},
headlessAndroidPicker: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    color: 'transparent',
    opacity: 0,
},


  containerI:{
    flexDirection:"row",
    flex:2,
  },

  bodyoneText:{
    fontSize:24,
    color:palette.LIGHT_GRAY,
    alignItems:'center',
    justifyContent: 'center',
    margin:20,
    textAlign: 'center',
  },
  bodytwoText:{
    fontSize:24,
    color:palette.LIGHT_GRAY,
    alignItems:'center',
    justifyContent: 'center',
    margin:20,
    textAlign: 'center',
  },
  deliveryContainer:{
    flexDirection:"row",
    flex:1,
    // alignItems:'center',
    justifyContent: 'center',

  },

  deliveryElement:{
    // flexDirection:"row",
    // flex:1,
    // alignItems:'center',
    // justifyContent: 'center'
  },
  

  cardAttachment:{
    fontSize:24,
    color:palette.LIGHT_GRAY,
  },
  deliveryTitle:{
    color:"#888a8c",
    fontSize:12,
    fontWeight:"500",
    marginTop:4
  },
  menuIcon:{
    zIndex:9,
    position:"absolute",
    top:10,
    left:20,
    color:palette.ICON_COLOR
  },
  
  coverText:{
    fontSize:32,
    color:palette.LIGHT_GRAY,
    textAlign: 'center',
    flex: 5,
    margin: 20,
    alignSelf: 'center'
  },
  
  playContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent:'center'
  },
  contactRowStack: {
      flex: 1,
      flexDirection: 'row',
      alignSelf: 'flex-end'
  },
  mdmore:{
      color:palette.ICON_COLOR,
      zIndex:1,
      position:"absolute",
    //   top:8,
      right:0,
      flex: 3,
      alignSelf: 'flex-end',
      padding: 20
  },
  
  mdmore3:{
    color:palette.ICON_COLOR,
    marginRight:25
  },

  
  rowStackImages: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    marginRight: -2,
    position:"relative",
    backgroundColor: '#adadad'
  },
  addContactButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10,
    marginLeft: -2,
    backgroundColor: '#adadad'
  },
  
  text: {
    fontFamily:"HelveticaNeue",
    color: palette.LIGHT_GRAY,
    fontWeight:"200"

  },
  cardAttachmentContainer:{
  flexDirection:"row",
  justifyContent:"space-between",
  margin:20
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
  },
  text: {
    fontFamily:"HelveticaNeue",
    color: '#52575D',
    fontWeight:"200"

  },
  image: {
    flex:1,
    // width:undefined,
    // height:undefined
  },
  profileImage:{
    width:200,
    height:200,
    borderRadius:100,
    overflow:'hidden'
  },
  avatarContainer:{
    shadowColor:"#151734",
    shadowRadius:30,
    shadowOpacity:0.4
  },
  avatar:{
    width:136,
    height:136,
    borderRadius:68
  },
  name: {
    marginTop:20,
    fontSize:16,
    fontWeight:"600"
  },
  statsContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    margin:20
  },
  stat:{
    alignItems:"center",
    flex: 1,

  },
  statbox:{
    alignItems:"center",
    flex: 1,
    borderColor:"#DfD8C8",
    borderLeftWidth:1,
    borderRightWidth:1
  },
  statAmount:{
    color:'#52575D',
    fontSize:18,
    fontWeight:"400",

  },
  statTitle:{
    color:"#888a8c",
    fontSize:12,
    fontWeight:"500",
    marginTop:4
  },
  add:{
    backgroundColor:"#52575D",
    position: "absolute",
    bottom:0,
    right:0,
    width:30,
    height:30,
    borderRadius:30,
    alignItems:"center",
    justifyContent:"center"
  },
  border: {
    width: '85%',
    margin: 10,
    padding:15,
    fontSize:16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign:'center'
  },
  button: {
    marginTop:20,
    marginRight: 13,
    marginLeft: 13,
    paddingVertical:10,
    alignItems:'center',
    borderColor:'#d3d3d3',
    borderWidth:1,
    borderRadius:5,
    width:150,
    backgroundColor: 'mediumseagreen'
  },
  thumbnailInput: {
    width: width*.90,
    margin: 15,
    padding: 15,
    alignSelf: 'center',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 50,
    fontSize: 16,
  },
  thumbnailContainer:{
    flex: 1,
    backgroundColor: '#fff'
  },

  thumbnailSpace: {
    alignItems: 'center',
    justifyContent: 'space-between',
    },
  thumbnailLeft: {
    alignItems: 'flex-start',
  },

  thumbnailContainer2:{
    flex: 1,
    backgroundColor: 'blue',
    padding: 20,
    marginVertical: 8,
    justifyContent: 'center'
  },
  contactsItem: {
    backgroundColor: 'lightgreen',
    padding: 20,
    marginVertical: 8,
    justifyContent: 'center'
  },
  contactsContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  contactsHeader: {
    fontSize: 32,
  },

  contactsTitle: {
    fontSize: 24,
  },
  
  thumbnailBold: {
    fontWeight: 'bold',
    fontSize: 24,

  },
  thumbnailGray: {
    color: '#adadad',
  },
  
  thumbnailRoundImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10,
    backgroundColor: '#adadad',
    justifyContent: "flex-start",
  },
  
  list: {
    paddingVertical: 5,
    margin: 3,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "cornsilk",
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: -1
  },
  
  list2: {
    paddingVertical: 5,
    margin: 3,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "cornsilk",
    // alignItems: "center",
    zIndex: -1
  },
  
  smallButton: {
    height: 35,
    width: 35,
    right: 0,
    flex: 1,
    margin: 17,
    // flexDirection: "row",
    // alignSelf:'flex-end',
    // justifyContent:'center',
    position: "absolute",
    borderColor:'crimson',
    alignContent: "center",
    alignItems: "center",
    // borderWidth:3,
    borderRadius:20,
    backgroundColor: 'mediumseagreen'
  },
  
  lightText: {
    color: "#f7f7f7",
    paddingLeft: 2,
    fontSize: 30,
    bottom: 1.5
   },
   
  line: {
    height: 0.5,
    width: "100%",
    backgroundColor:"rgba(255,255,255,0.5)"
  },
  selected: {backgroundColor: "#FA7B5F"}
});
