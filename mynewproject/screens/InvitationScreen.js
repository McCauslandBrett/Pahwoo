import React, {Component} from 'react';
import { StyleSheet, Dimensions,  View, Text,
  Image,TouchableOpacity,
  ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';
import {Cards} from '../components/Card.js'
// import { Block} from 'galio-framework';
// import  theme from '../constants/Theme.js';
import styles from '../styles.js';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
const users = [
 {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
 },
]
import { Card, ListItem, Button, Icon } from 'react-native-elements'
class InvitationScreen extends Component {

  render() {
    const cardContainer = [localstyles.card, localstyles.shadow,localstyles.verticalStyles];
    const statscardContainer = [localstyles.statscard, localstyles.shadow,localstyles.verticalStyles];
    const imgContainer = [localstyles.imageContainer,localstyles.shadow];
    return (
       <ScrollView>
      <Block  card style={cardContainer}>
       <Block  style={imgContainer}>
         <Image source={{uri: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'}} style={localstyles.fullImage} />
       </Block>
       <Block flex space="between" style={localstyles.cardDescription}>
         <Text  style={localstyles.cardTitle}>Guests</Text>
         <Text  size={12}>Hi </Text>
       </Block>
      </Block>

      <Block  card style={statscardContainer}>

       <View style = {styles.statsContainer}>
           <TouchableOpacity style = {styles.stat}>
              <Text style ={styles.statAmount}>76</Text>
              <Text style = {styles.statTitle}>ATTENDING</Text>
           </TouchableOpacity>

           <TouchableOpacity style = {styles.statbox} >
              <Text style ={styles.statAmount}>24</Text>
              <Text style = {styles.statTitle}>RESPONDED</Text>
           </TouchableOpacity>

           <TouchableOpacity style = {styles.stat} >
             <Text style ={styles.statAmount}>3</Text>
             <Text style = {styles.statTitle}>NOT ATTENDING</Text>
          </TouchableOpacity>
         </View>
      </Block>

      <Block  card style={statscardContainer}>
      <Block flex space="between" style={localstyles.cardDescription}>
      <Text  style={localstyles.cardTitle}>Location</Text>
      </Block>

      </Block>
      </ScrollView>

    );
}

}
const localstyles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    marginVertical: 0,
    borderWidth: 0,
    minHeight: 200,
    marginBottom: 10,

  },
  statscard: {
    backgroundColor: 'white',
    marginVertical: 0,
    borderWidth: 0,
    minHeight: 100,
    marginBottom: 10,

  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize:28,
    fontWeight:'bold'
  },
  cardDescription: {
     padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    height:240,
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 215,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  home: {
  width: width,
},
articles: {
  width: width - theme.SIZES.BASE * 2,
  paddingVertical: theme.SIZES.BASE,
},
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({},dispatch)
  }
  const mapStateToProps = (state) => {
    return {
      user: state.user,
      card: state.card
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(InvitationScreen)
