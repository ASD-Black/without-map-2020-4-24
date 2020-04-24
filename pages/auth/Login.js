import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import { StyleSheet, View, StatusBar, KeyboardAvoidingView, TextInput, AsyncStorage  } from 'react-native';


import Logo from '../../Components/logo'


export class Login extends React.Component{
  
  constructor(props){
    super(props)
    this.state={
      RegNo:'',
      password:''
    }
    this.login = this.login.bind(this);
  }
  componentDidMount(){
    this._loadInitialState().done();
 }
 _loadInitialState = async() => {
      var value = await AsyncStorage.getItem('passengers');
      //console.log(value);
      if(value !== null){
        this.props.navigation.navigate('app');
      }
  }

  render(){
    return (
      <KeyboardAvoidingView style={{ flex:1}} behavior="padding">
      <View style={styles.container}>
        <Logo/>
        <TextInput style={styles.inpuBox} 
            placeholder="Registration No"
            placeholderTextColor="#ffffff"
            onChangeText={ (RegNo) => this.setState({RegNo}) }
            />
        <TextInput style={styles.inpuBox} 
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#ffffff"
            onChangeText={ (password) => this.setState({password}) }
            />
        <TouchableOpacity style={styles.button} onPress={this.login}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.signUpTextCon}>
          <Text style={styles.signUpText}>Don't have an account yet</Text>
          <Text style={styles.signupButton} onPress={()=> this.props.navigation.navigate('Register')}>   SignUp</Text>
        </View>
      </View>
      </KeyboardAvoidingView>
    );
  }

  login = () =>{
    //alert(this.state.email)
    fetch('http://100.98.18.51:3000/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        RegNo: this.state.RegNo,
        password: this.state.password,
      })
    })
  
    .then((response) => response.json())
    .then((res) => {
      if(res.success === true){
        AsyncStorage.setItem('passengers', res.passengers);
        //alert('lknsdklsnnsl')
        this.props.navigation.navigate('app');
      }
  
      else{
        alert(res.message1)
      }
    })
    .done()
  }
}

const styles = StyleSheet.create({
  container : {
    backgroundColor: '#455a64',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  signupButton: {
    color:'#ffffff',
    fontSize:17,
    fontWeight:'700'
  }
  });