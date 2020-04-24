import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    CheckBox
} from "react-native";

class SlideMenueStd extends Component{
    
    render() {
        return (
            <View style={{ width: 300, height: 150, marginBottom:-135}}>
                <View >      
                </View>
                <View >
                    <Text style={{flexDirection:'row', marginLeft:150, fontSize: 18, marginTop:-95, marginBottom:60}}>{this.props.regNo}</Text>
                    <Text style={{flexDirection:'row', marginLeft:150, fontSize: 18, marginTop:-55, marginBottom:40}}>{this.props.fName + "  "+ this.props.lName}</Text>
                </View>
            </View>
        );
    }
}
export default SlideMenueStd;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});