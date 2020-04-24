import React from 'react';
import { View, TouchableOpacity, StatusBar} from 'react-native';
import {Text} from 'native-base';

import CustomHeader from '../../Components/CustomHeader'

export class Setting extends React.Component {
    render() {
      return (
        <View style={{flex: 1}}>
        <CustomHeader title="Settings" navigation={this.props.navigation}/>
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