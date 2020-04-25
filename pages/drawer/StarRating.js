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
} from 'react-native';
//import all the components we are going to use.
import CustomHeader from '../../Components/CustomHeader'

export class StarRating extends React.Component{
  constructor() {
    super();
    this.state = {
      Default_Rating: 2,
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
  saveRating = () =>{
    alert("You give us  " + this.state.Default_Rating + "  Stars.  Thank You...!")
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