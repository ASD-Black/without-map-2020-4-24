import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    CheckBox
} from "react-native";

class myaccount extends Component{
    
    render() {
        return (
            <View style={{ width: 300, height: 200}}>
                <View >      
                </View>
                <View >
                    
                    <Text>02.Email</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>         {this.props.email}</Text>
                    <Text></Text>
                    <Text>03.Contact Number</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>         {this.props.contactNo}</Text>
                    <Text></Text>
                </View>
            </View>
        );
    }
}
export default myaccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});