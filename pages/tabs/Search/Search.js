import React from "react";
import {Text, StyleSheet, StatusBar} from "react-native";
import { View, InputGroup, Input } from "native-base";


import { SearchBox } from '../../../src/routes/Home/components/SearchBox/index'

import  CustomHeader  from '../../../Components/CustomHeader'

export default  class Search extends React.Component  {
    render(){
        return (
            <View style={{flex: 1}}> 
            <CustomHeader title = "Location Marking" isHome={true} navigation={this.props.navigation}/>
            <StatusBar 
            barStyle = "light-content" 
            hidden = {false}
            backgroundColor = "#1a237e"
            translucent = {false}
            networkActivityIndicatorVisible = {true}
            />
               <SearchBox></SearchBox>
            </View>
        );
    }
    
  }

  