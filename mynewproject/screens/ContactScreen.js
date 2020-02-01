import React, {Component} from 'react';
import { View, Text, StyleSheet, SafeAreaView, SectionList} from 'react-native';
import {Container,Header, Left, Right, Content, List, ListItem } from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js"


// might want to fetch the user's contacts in the ComponentDidMount function
// that way they are loaded when the ContactScreen Component loads
// What features/functionality should the contact screen have? 
// What should the contact screen look like?




function Item({ title }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
}

class ContactScreen extends Component{
  static navigationOptions = {
    drawerIcon : ({tintColor}) => (
      <Icon.FontAwesome name= "address-book" style = {{fontSize:24, color:tintColor}}/>
    )
  }
  
  componentDidMount(){
      this.loadContacts()
  }
//   contactData = []
  contactData = [
    {
        title: 'A', 
        data: ['Ben Aberdeen', 'Range Alexis', 'Covalt Azure']
    },

    {
        title: 'B', 
        data: ['Tommy Benson', 'Billy Blanks', 'Andy Bolton']
    },

    {
        title: 'C', 
        data: ['Thomas Cat', 'Cassidy Christopher', 'CC Cephala']
    },

    {
        title: 'D', 
        data: ['Dan Daily', 'Guy Dorman', 'Gigi Dozophere']
    }
  ]
  loadContacts(){
    // initialize data
    this.contactData = []
    this.contactData.push(
        {
            title: 'A', 
            data: ['Ben Aberdeen', 'Range Alexis', 'Covalt Azure']
        }
    )
    this.contactData.push(
        {
            title: 'B', 
            data: ['Tommy Benson', 'Billy Blanks', 'Andy Bolton']
        }
    )
    this.contactData.push(
        {
            title: 'C', 
            data: ['Thomas Cat', 'Cassidy Christopher', 'CC Cephala']
        }
    )
    this.contactData.push(
        {
            title: 'D', 
            data: ['Dan Daily', 'Guy Dorman', 'Gigi Dozophere']
        }
    )
    // More things needed here
  }
  
    render() {
      return (
        <Container>
        <View>
        <Header>
            <Left>
                <Icon.FontAwesome name = "bars" size ={24} onPress={ () => this.props.navigation.openDrawer()}   />
            </Left>
        </Header>   
        </View>
        <SafeAreaView style={styles.container}>
        <SectionList
            sections={this.contactData}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Item title={item} />}
            renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
            )}
        />
        
        </SafeAreaView>
        </Container>
      );
    }
  }

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  item: {
    backgroundColor: 'lightgreen',
    padding: 20,
    marginVertical: 8,
    justifyContent: 'center'
  },
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
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
export default connect(mapStateToProps,mapDispatchToProps)(ContactScreen)
