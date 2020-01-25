import React, {Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {Container,Header, Left, Right, Content, List, ListItem } from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon  from "../components/icons.js"

class ContactScreen extends Component{
  static navigationOptions = {
    drawerIcon : ({tintColor}) => (
      <Icon.FontAwesome name= "address-book" style = {{fontSize:24, color:tintColor}}/>
    )
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
          <Content>
            <List>
              <ListItem itemDivider>
                <Text>A</Text>
              </ListItem>
              <ListItem>
                <Text>Aaron Bennet</Text>
              </ListItem>
              <ListItem>
                <Text>Ali Connors</Text>
              </ListItem>
              <ListItem itemDivider>
                <Text>B</Text>
              </ListItem>
              <ListItem>
                <Text>Bradley Horowitz</Text>
              </ListItem>
            </List>
          </Content>
        </Container>
      );
    }
  }

const syles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
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
