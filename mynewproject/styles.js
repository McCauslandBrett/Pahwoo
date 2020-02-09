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
    paddingVertical:10,
    alignItems:'center',
    borderColor:'#d3d3d3',
    borderWidth:1,
    borderRadius:5,
    width:200
  }
});
