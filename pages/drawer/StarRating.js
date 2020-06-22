//This is an example code to make a Star Rating Bar // 
import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon } from 'native-base';
//import react in our code. 
import {
  StyleSheet,
  View,
  Platform,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
//import all the components we are going to use.
import CustomHeader from '../../Components/CustomHeader'

// getData = async () => {
//   try {
//     const value = await AsyncStorage.getItem('passengers')
//     if(value !== null) {
//       // value previously stored
//     }
//   } catch(e) {
//     // error reading value
//   }
// }

export class StarRating extends React.Component{

  

  constructor(props) {
    super(props);
    this.state = {
      regno:'',
      rate:'',
      date:'',
      Default_Rating: 1,
      //To set the default Star Selected
      Max_Rating: 5,
      //To set the max number of Stars
    };
    //Filled Star. You can also give the path from local
    this.Star = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';

    //Empty Star. You can also give the path from local
    this.Star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
  }
  UpdateRating(key) {
    this.setState({ Default_Rating: key });
    //Keeping the Rating Selected in state
  }
  render() {
    let React_Native_Rating_Bar = [];
    //Array to hold the filled or empty Stars
    for (var i = 1; i <= this.state.Max_Rating; i++) {
      React_Native_Rating_Bar.push(
        <TouchableOpacity
          activeOpacity={0.7}
          key={i}
          onPress={this.UpdateRating.bind(this, i)}>
          <Image
            style={styles.StarImage}
            source={
              i <= this.state.Default_Rating
                ? { uri: this.Star }
                : { uri: this.Star_With_Border }
            }
          />
        </TouchableOpacity>
      );
    }
    return (
        <Container>
            <CustomHeader title="Rate us" navigation={this.props.navigation}/>
          
            <View style={styles.MainContainer}>
            <Image style={{width:120, height:150, marginBottom:50}}
             source={require('../../assets/SLIIT_Logo.png')}
            />
        <Text style={styles.textStyle}>How was your experience with us</Text>
        <Text style={styles.textStyleSmall}>Please Rate Us</Text>
        {/*View to hold our Stars*/}
        <View style={styles.childView}>{React_Native_Rating_Bar}</View>
        
        <Text style={styles.textStyle}>
        {/*To show the rating selected*/}
          {this.state.Default_Rating} / {this.state.Max_Rating}
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={this.saveRating}>
          {/*Clicking on button will show the rating as an alert*/}
          <Text>Get Selected Value</Text>
        </TouchableOpacity>
      </View>
        
      </Container>
    );
  }
  saveRating = async () =>{

    const value = await AsyncStorage.getItem('passengers')
      //Alert.alert(value);
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds

      const fullDate = year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec
  
    
    fetch('http://192.168.8.101:3000/api/makeStarRating',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
        rate: this.state.Default_Rating,
        regno:value,
        date:fullDate
        })
    })
        .then((response) => response.json())
        .then((res) => {
          
          if(res.success === true){
            
            alert("You give us with " + this.state.Default_Rating + "  Stars.  Thank You...!")
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
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  childView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  button: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    padding: 15,
    backgroundColor: '#8ad24e',
  },
  StarImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 23,
    color: '#000',
    marginTop: 15,
  },
  textStyleSmall: {
    textAlign: 'center',
    fontSize: 16,

    color: '#000',
    marginTop: 15,
  },
});