import React, {Component} from 'react';
import { View, Text, StyleSheet,SafeAreaView,
        ScrollView,TextInput,TouchableOpacity,
        Animated, Dimensions,Modal,TouchableHighlight,
        } from 'react-native';
import {setMode} from '../actions/user.js';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import {Ionicons,Entypo,
        MaterialCommunityIcons,
        SimpleLineIcons,AntDesign} from "@expo/vector-icons";
import Icon  from "../components/icons.js";
class Acordian extends Component{

   OptionText(text,mode){
     if(mode == this.props.user.theme){
       return <Text style = {localstyles.optionSelected}> {text} </Text>
     }
     else{
       return <Text style = {localstyles.option}> {text} </Text>
     }

   }
  render(){
    const CHECKMARK = <Ionicons name = "md-checkbox-outline" style = {localstyles.optiontoggle} size = {20} color = "green"/>;

  return(
    <Collapse>
      <CollapseHeader>
        <View style = {localstyles.rowcontainer}>
           <View style = {localstyles.pairContainer}>
            <MaterialCommunityIcons name= "palette-advanced" style = {localstyles.optionlogo}/>
            <Text style = {localstyles.optiontextTitle}>Theme Option </Text>
           </View>
            <Icon.AntDesign style = {localstyles.optiontoggle} size={24} name= "down" color="gray" />
        </View>
      </CollapseHeader>

      <CollapseBody style = {localstyles.container}>

        <TouchableOpacity onPress={()=>this.props.setMode(0)} style = {localstyles.optionContainer}>
         {this.OptionText('Light Mode',0)}
         {this.props.user.theme == 0 ? CHECKMARK:null}
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>this.props.setMode(1)} style = {localstyles.optionContainer}>
         {this.OptionText('Dark Mode',1)}
         { this.props.user.theme == 1 ? CHECKMARK:null}
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>this.props.setMode(2)} style = {localstyles.optionContainer}>
         {this.OptionText('Pahwoo Mode',2)}
         {this.props.user.theme == 2 ? CHECKMARK:null}
        </TouchableOpacity>

      </CollapseBody>
    </Collapse>
    );
  }
  }
  const localstyles = StyleSheet.create({
    optionlogo:{
      fontSize:30,
      marginLeft:15,
    },
    rowcontainer:{
      marginTop:15,
      flexDirection: 'row',
      alignItems:'center',
      flex:1,
      justifyContent:'space-between',

    },
    optiontoggle:{
      marginRight:15,
    },
    optionContainer:{
      justifyContent:'space-between',
      paddingVertical:10,
      flexDirection: 'row',
    },
    container:{
      marginTop:15,
      marginLeft:15,
      paddingHorizontal:10
    },
    optiontextTitle:{
      fontSize:20,
      marginLeft:25,
    },
    pairContainer:{
      flexDirection: 'row',
      alignItems:'center'
    },
    option:{
      fontSize:20
    },
    optionSelected:{
      fontSize:20,
      color: "green"
    }
  });
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setMode},dispatch)
  }
  const mapStateToProps = (state) => {
    return {

     user: state.user,
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Acordian )
