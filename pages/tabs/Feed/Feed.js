import React from 'react';
//import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, StatusBar, ImageBackground } from 'react-native';
import { Container, Header, Content, Body, Right, Button, Icon, Title, Form, Item, Picker } from 'native-base';

import  CustomHeader  from '../../../Components/CustomHeader'

const image = { uri: '../../../assets/bg.png' };

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined
    };
  }
  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }
  render() {
    // const initialRegion = {
    //   latitude: 6.90866,
    //   longitude: 79.97,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    //}
    return (
      <View style={{flex: 1}}>
      
      <StatusBar 
        barStyle = "light-content" 
        hidden = {false}
        backgroundColor = "#1a237e"
        translucent = {false}
        networkActivityIndicatorVisible = {true}
        />
        
        <Container>
        <CustomHeader title="Bus Tracker" isHome={true} navigation={this.props.navigation}/>
        <ImageBackground source={require('../../../assets/bg.png')} style={{flex:1}}>
         
        </ImageBackground>
      </Container>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
});