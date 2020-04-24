import React from 'react';
import { View, TouchableOpacity, StatusBar} from 'react-native';
import {Text} from 'native-base';


export class Pay extends React.Component {
    render() {
      return (
        <View>
        <StatusBar 
        barStyle = "light-content" 
        hidden = {false}
        backgroundColor = "#1a237e"
        translucent = {false}
        networkActivityIndicatorVisible = {true}
        />
      </View>
      );
    }
  }