import React from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar, KeyboardAvoidingView, TextInput} from 'react-native';
import {Text} from 'native-base';

import Logo from '../../Components/logo'
import SignUpform from '../../Components/SignUpform'

export class Register extends React.Component {

  constructor(props){
    super(props);
    this.state={
      regno:'',
      nic:'',
      email:'',
      Password:''
    }
  }
    render() {
      return (
      <KeyboardAvoidingView style={{ flex:1}}>
        <View style={styles.container}>
          <Logo/>
          <View>
        <TextInput style={styles.inpuBox}
            onChangeText={(regno) => this.setState({regno})}
            placeholder="Reg No"
            placeholderTextColor="#ffffff"
            />
        <TextInput style={styles.inpuBox}
            onChangeText={(nic) => this.setState({nic})}
            placeholder="NIC"
            placeholderTextColor="#ffffff"
            />
        <TextInput style={styles.inpuBox}
            onChangeText={(email) => this.setState({email})} 
            placeholder="Email"
            placeholderTextColor="#ffffff"
            />
        <TextInput style={styles.inpuBox}
            onChangeText={(Password) => this.setState({Password})} 
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#ffffff"
            />
        <TouchableOpacity style={styles.button} onPress={this.SignUp}>
            <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
          <View style={styles.signUpTextCon}>
            <Text style={styles.signUpText}>Already have an account</Text>
            <Text style={styles.signupButton} onPress={()=> this.props.navigation.navigate('Login')}>   Sign in</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
      );
    }
    SignUp = () =>{
////////////////////////////////////////////////////////////////////////////////
      const {regno} =this.state;
      const {nic} =this.state;
      const {email} =this.state;
      const {Password} =this.state;
  
      if(checkOwnerName(regno) && validateNic(nic) && chackOwnerEmail(email) && validatePassword(Password)){
        
        fetch('http://192.168.8.100:3000/api/signUp',{
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            regno: this.state.regno,
            nic: this.state.nic,
            email: this.state.email,
            Password: this.state.Password,
          })
        })
        .then((response) => response.json())
        .then((res) => {
          
          if(res.success === true){
            
            alert(res.succmessage);
            this.props.navigation.navigate('Login')
          }
          else if(res.success === false){
              alert(res.errmessage);
          }
        })
        .done();
      }
  
  
//SignUP form validations----------------------------------------------------------------------
  
      //User Name validation-------------------------------------------------------------------------
      function checkOwnerName(regno){
        if(regno==""){
          alert("You should fill the Registation Number")
        }
        else if(regno.length==10){
          if(((regno.charAt(0)=='I') && (regno.charAt(1)=='T') || (regno.charAt(0)=='B') && (regno.charAt(1)=='M'))){
              return true;
          }
          else{
            alert("Invalid Contact Number(ITxxxxxxxx)")
          }
        }
        else if(regno.length > 10){
          alert("Invalid Registation Number.! It must be 10 characters")
        }
        else if(regno.length < 10){
          alert("Invalid Registation Number.! It must be at least 10 characters")
        }
        else{
            return true;
        }
      }
    
      //Email validation-----------------------------------------------------------------------------
      function chackOwnerEmail(email) {
        if(email==""){
          alert("You should fill the Email")
          
        }
        else{
            at = email.indexOf('@');
            dot = email.lastIndexOf('.');
            if(at<dot){
                return true;
            }
            else{
              alert("Invalied Email")
                
            }
        }
      }

      function validateNic(nic){
        if(nic==""){
          alert("You should fill the NIC")
        }
        else{
            return true;
        }
      }
  
      //Password validation--------------------------------------------------------------------------
      function validatePassword(Password){
        if(Password==""){
          alert("You should fill the Password")
        }
        else if(Password.length < 6){
          alert("Password must be at least 6 characters")
        }
        else{
            return true;
        }
      }
    }
  }

  const styles = StyleSheet.create({
    container : {
      backgroundColor: '#455a64',
      flex: 1,
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
    signUpTextCon: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingVertical:20,
      flexDirection:'row'
    },
    signUpText: {
      color:'rgba(255,255,255,0.6)',
      fontSize:17
    },
    signupButton: {
      color:'#ffffff',
      fontSize:17,
      fontWeight:'700'
    },
    button: {
      marginLeft:100,
      width: 150,
      backgroundColor: '#1c313a',
      height:50,
      borderRadius: 25,
      paddingVertical: 12,
      marginVertical:10
    }
    });