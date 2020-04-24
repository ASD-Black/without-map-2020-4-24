import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity } from 'react-native';


export default function SignUpform() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.inpuBox} 
            placeholder="Reg No"
            placeholderTextColor="#ffffff"
            />
        <TextInput style={styles.inpuBox} 
            placeholder="NIC"
            placeholderTextColor="#ffffff"
            />
        <TextInput style={styles.inpuBox} 
            placeholder="Email"
            placeholderTextColor="#ffffff"
            />
        <TextInput style={styles.inpuBox} 
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#ffffff"
            />
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container : {
    backgroundColor: '#455a64',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inpuBox: {
    width: 350,
    height:50,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#ffffff",
    marginVertical:10
  },
  buttonText: {
      fontSize:18,
      fontWeight:'500',
      color: '#ffffff',
      textAlign: 'center',
      
  },
  button: {
    width: 150,
    backgroundColor: '#1c313a',
    height:50,
    borderRadius: 25,
    paddingVertical: 12,
    marginVertical:10
  }
  });