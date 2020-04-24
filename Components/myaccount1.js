import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    CheckBox
} from "react-native";

class myaccount1 extends Component{
    
    render() {
        return (
            <View style={{ width: 300, height: 150, marginBottom: 40}}>
                <View >      
                </View>
                <View >
                    <Text>01.Registration Number</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>         {this.props.regNo}</Text>
                    <Text></Text>
                    <Text>04.Name</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>         {this.props.fName + "  "+ this.props.lName}</Text>
                    <Text></Text>
                    <Text>05.NIC</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>         {this.props.nic}</Text>
                    <Text></Text>
                </View>
            </View>
        );
    }
}
export default myaccount1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});