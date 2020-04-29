import React from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, StatusBar, Alert, AsyncStorage} from 'react-native';
import {Text, Container, Header, Content, Textarea, Form} from 'native-base';

import CustomHeader from '../../Components/CustomHeader'
import InquiryHistory from './inquiry/inquiryHistory'

export class Inquiry extends React.Component {

  constructor(props){
    super(props);
    this.state={
      regno:'',
      msg:'',
      inq_date:'',
      contactNo:'',
      titles:''
    }
  }



  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     //defauilt value of the date time
  //     date: '',
  //   };
  // }

  // componentDidMount() {
  //   var that = this;
  //   var date = new Date().getDate(); //Current Date
  //   var month = new Date().getMonth() + 1; //Current Month
  //   var year = new Date().getFullYear(); //Current Year
  //   var hours = new Date().getHours(); //Current Hours
  //   var min = new Date().getMinutes(); //Current Minutes
  //   var sec = new Date().getSeconds(); //Current Seconds
  //   that.setState({
  //     //Setting the value of the date time
  //     date:
  //       year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec,
  //   });
  //   console.log(date)
  // }
  

    render() {
      return (
        <KeyboardAvoidingView style={{ flex:1}} behavior="padding">
        <View style={{flex:1}}>
        <CustomHeader title="Inquiry" navigation={this.props.navigation}/>
        <StatusBar 
          barStyle = "light-content" 
          hidden = {false}
          backgroundColor = "#1a237e"
          translucent = {false}
          networkActivityIndicatorVisible = {true}
        />
        <View style={styles.container}>
          <Text style={styles.logoStyle}>Make your Inquiry</Text>

          <TextInput style={{width: 220,
            height:50,
            backgroundColor: 'rgba(33, 33, 33,0.3)',
            borderRadius: 0,
            paddingHorizontal: 16,
            fontSize: 20,
            color: "#212121",
            marginTop:-40,
            marginBottom:20,
            marginLeft:40}} 
            placeholder="Title"
            placeholderTextColor="#212121"
            onChangeText={(titles) => this.setState({titles})}
          />

          <TextInput style={{width: 220,
            height:50,
            backgroundColor: 'rgba(33, 33, 33,0.3)',
            borderRadius: 0,
            paddingHorizontal: 16,
            fontSize: 20,
            color: "#212121",
            marginBottom:20,
            marginLeft:40}} 
            placeholder="Type Contact Number"
            placeholderTextColor="#212121"
            onChangeText={(contactNo) => this.setState({contactNo})}
          />
          
          <TextInput
            placeholder="Type Your comment"
            placeholderTextColor="black"
            multiline={true}
            numberOfLines={10}
            onChangeText={(msg) => this.setState({msg})}
            style={{ height:150, marginLeft:40, fontSize: 20, textAlignVertical: 'top',backgroundColor: 'rgba(33, 33, 33,0.3)', width:350, marginBottom: 30}}
          />
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={this.makeInquiry}>Submit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button2}>
            <Text style={styles.buttonText} onPress={()=> this.props.navigation.navigate('InquiryHistory')}>View Inquiry History</Text>
        </TouchableOpacity>
        
        </View>
        </View>
        </KeyboardAvoidingView>
      );
    }

    makeInquiry = async () =>{
      const value = await AsyncStorage.getItem('passengers')
      //Alert.alert(value);
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds

      const fullDate = year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec
    
      

      fetch('http://192.168.8.101:3000/api/makeInquiry',{
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            regno: value,
            msg: this.state.msg,
            inq_date: fullDate,
            contactNo: this.state.contactNo,
            titles: this.state.titles,
          })
        })
        .then((response) => response.json())
        .then((res) => {
          
          if(res.success === true){
            
            alert(res.succmessage);
            this.props.navigation.goBack()
          }
          else if(res.success === false){
              alert(res.errmessage);
          }
        })
        .done();
    }
  }

  const styles = StyleSheet.create({
    container : {
      //backgroundColor: '#ffffff',
      marginTop: 100,
      //flexGrow: 1,
      //alignItems: 'center',
      justifyContent: 'center',
    },
    logoStyle: {
      //justifyContent:'center',
      marginTop:-20,
      marginLeft:80,
      fontWeight: 'bold',
      marginBottom:60,
      fontSize: 30,
      color: 'rgba(33, 33, 33,0.3)'
    },
    inpuBox: {
      width: 350,
      height:50,
      backgroundColor: 'rgba(33, 33, 33,0.3)',
      borderRadius: 25,
      paddingHorizontal: 16,
      fontSize: 16,
      color: "#212121",
      marginVertical:4,
      marginLeft:40
    },
    buttonText: {
        fontSize:18,
        fontWeight:'500',
        color: '#212121',
        textAlign: 'center',
        
    },
    button: {
      width: 150,
      borderRadius: 7,
      backgroundColor: 'rgba(33, 33, 33,0.3)',
      height:50,
      //borderRadius: 25,
      paddingVertical: 12,
      //marginVertical:10,
      marginTop:20,
      marginLeft:250,
      marginBottom:200
    },
    button2: {
      width: 350,
      borderRadius: 7,
      backgroundColor: 'rgba(33, 33, 33,0.3)',
      height:50,
      //borderRadius: 25,
      paddingVertical: 12,
      //marginVertical:10,
      marginTop:-150,
      marginLeft:44,
      marginBottom:250
    }
    });