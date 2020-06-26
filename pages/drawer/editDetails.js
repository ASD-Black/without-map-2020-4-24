import React, {Component} from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, Form,Item, Label,Input} from 'native-base';
import { StyleSheet, View, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import Tab1 from './PaymentsTab/History';
import Tab2 from './PaymentsTab/Card Payment';


import CustomHeader from '../../Components/CustomHeader'

export class EditDetails extends React.Component{
  render() {
    return (
      <View style={{flex:1}}>
      <StatusBar 
        barStyle = "light-content" 
        hidden = {false}
        backgroundColor = "#1a237e"
        translucent = {false}
        networkActivityIndicatorVisible = {true}
      />
      <Container>
      <CustomHeader title="Edit Details" navigation={this.props.navigation}/>
      <Form>
            <Item floatingLabel>
              <Label>Edit Contact Number</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Edite Password</Label>
              <Input />
            </Item>
          </Form>

          <TouchableOpacity style={{backgroundColor: '#1c313a',width: 120, height:50, marginTop:50, paddingVertical: 12, borderRadius: 5, marginLeft:150}} onPress={this.Update}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
      </Container>
      </View>
    );
  }

  Update = async () =>{
      alert("Update Successfully")
      this.props.navigation.goBack()
  }

}
const styles = StyleSheet.create({
    button: {
      width: 220,
      backgroundColor: '#1c313a',
      height:50,
      borderRadius: 5,
      paddingVertical: 12,
      marginHorizontal:50,
      marginVertical:70
    },
    buttonText: {
      fontSize:18,
      fontWeight:'500',
      color: '#ffffff',
      textAlign: 'center',
  }
  })