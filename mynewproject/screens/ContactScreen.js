import React, {Component} from 'react';
import { Modal, View, Text, SafeAreaView, FlatList, TouchableOpacity, Image} from 'react-native';
import Icon  from "../components/icons.js";
import {Ionicons} from "@expo/vector-icons";
import styles from '../styles.js'
import {Container,Header, Left} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import db from '../config/firebase.js';
import MultiSelect from 'react-native-multiple-select';
class ContactScreen extends Component{
    static navigationOptions = {
        drawerIcon : ({tintColor}) => (
        <Icon.FontAwesome name= "address-book" style = {{fontSize:24, color:tintColor}}/>
        )
    }
    
    state = {
        contactData: [],
        modalVisible: false,
        selectedItems: []
    }
    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }
    componentDidMount = async () => {
        let tempData = []
        // for loop with async calls
        for (var i = 0; i < this.props.user.contacts.length; i++){
            const query = await db.collection('users').where('uid', '==', this.props.user.contacts[i]).get()
            query.forEach((response) => {
                tempData.push(response.data())
            })
        }
        
        let mappedData = tempData.map(item => {
            // add these to fields to every item in tempData
            item.isSelect = false;
            item.selectedClass = styles.list;
            
            return item;
        })
        console.log(mappedData)
        // at this point I have an array of user objects from the current user's contact array
        
        // tempData.sort((a, b) => (a.username > b.username) ? 1 : -1)
        mappedData.sort((a, b) => (a.username > b.username) ? 1 : -1)
        // this.setState({contactData: tempData})
        this.setState({contactData: mappedData})
    }
    
    FlatListItemSeparator = () => <View style={styles.line} />;

    selectItem = data => {
        data.item.isSelect = !data.item.isSelect;
        data.item.selectedClass = data.item.isSelect ? styles.selected : styles.list;
        const index = this.state.contactData.findIndex(
            item => data.item.uid === item.uid
        );
        this.state.contactData[index] = data.item;
        this.setState({
            contactData: this.state.contactData,
        });
    };
    
    renderItem = (data) => 
    <TouchableOpacity
            style={[styles.list, data.item.selectedClass]}      
            onPress={() => this.selectItem(data)}
        >
        <Image
            source={{ uri: data.item.photoURL }}
            style={styles.thumbnailRoundImage}
        />
            <Text style={styles.thumbnailBold}>{data.item.username}</Text>
            <Text style={styles.thumbnailGray}>{data.item.birthday}</Text>
    </TouchableOpacity>
    onSelectedItemsChange = selectedItems => {
        this.setState({selectedItems: selectedItems});
        console.log(this.state.selectedItems)
    };
          
    render() {
      const { selectedItems } = this.state;

      return (
        <Container>
            <View>
                <Header>
                    <Left>
                        <Icon.FontAwesome name = "bars" size ={24} onPress={ () => this.props.navigation.openDrawer()}   />
                    </Left>
                </Header>   
            </View>
            <SafeAreaView style={styles.contactsContainer}>
                <FlatList
                    data={this.state.contactData}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    keyExtractor={(item) => JSON.stringify(item.uid)}
                    renderItem={item => this.renderItem(item)}
                />
            </SafeAreaView>
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                alert('Modal has been closed.');
            }}>
                <SafeAreaView style={{flex: 1}}>
                    <MultiSelect
                        hideTags
                        items={this.state.contactData}
                        uniqueKey="uid"
                        // ref={(component) => { this.state.multiSelect = component }}
                        onSelectedItemsChange={this.onSelectedItemsChange}
                        selectedItems={this.state.selectedItems}
                        selectText="Pick Items"
                        searchInputPlaceholderText="Search Items..."
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="username"
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor="#CCC"
                        submitButtonText="Submit"
                    />
                </SafeAreaView>
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Text>Hide Modal</Text>
                </TouchableOpacity>
            </Modal>

            <TouchableOpacity style={styles.button}
                onPress={() => {this.setModalVisible(true)}}>
                <Text>Select Contacts</Text>
            </TouchableOpacity>
        </Container>
      );
    }
}



const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({},dispatch)
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ContactScreen)
