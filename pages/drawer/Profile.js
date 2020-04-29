import React from 'react';
import { View, TouchableOpacity, StatusBar, AsyncStorage, Image, StyleSheet} from 'react-native';
import {Text} from 'native-base';

import CustomHeader from '../../Components/CustomHeader'
import MyaccountComponent from '../../Components/myaccount'
import MyaccountComponent1 from '../../Components/myaccount1'
import MyaccountComponentBalance from '../../Components/myaccountBalance'


export class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

      logedUser1: [],
      logedUser: [],
      accBalance: [],
      logedUser2: [],

    }
  }
  componentDidMount = async () => {
    var value = await AsyncStorage.getItem('passengers')
    //console.log(value)

    fetch('http://192.168.8.101:3000/api/getLoadedUser/' + value)
      .then((response) => response.json())
      .then((res) => {

        if (res.success === true) {
          this.setState({ logedUser: res.RegNo });
          //console.log(Category)
        }
        else {
          alert("You are not a SLIIT student...!");
        }
      }).done()

      fetch('http://192.168.8.101:3000/api/getLoadedUserFromSLIITdb/' + value)
      .then((response) => response.json())
      .then((res) => {

        if (res.success === true) {
          this.setState({ logedUser1: res.RegNo });
          //console.log(Category)
        }
        else {
          alert("You are not a SLIIT student...!");
        }
      }).done()

      fetch('http://192.168.8.101:3000/api/getLoadedUserFromSLIITdb/' + value)
      .then((response) => response.json())
      .then((res) => {

        if (res.success === true) {
          this.setState({ logedUser2: res.RegNo });
          //console.log(Category)
        }
        else {
          alert("You are not a SLIIT student...!");
        }
      }).done()

      fetch('http://192.168.8.101:3000/api/getAccountBal/' + value)
      .then((response) => response.json())
      .then((res) => {

        if (res.success === true) {
          this.setState({ accBalance: res.RegNo });
          //console.log(Category)
        }
        else {
          alert("You are not a SLIIT student...!");
        }
      }).done()
  }

    render() {
      return (
        <View style={{flex: 1}}>
        <CustomHeader title="Profile" navigation={this.props.navigation}/>
        <StatusBar 
        barStyle = "light-content" 
        hidden = {false}
        backgroundColor = "#1a237e"
        translucent = {false}
        networkActivityIndicatorVisible = {true}
        />

        <Image style={{width:150, height:150, marginTop:10, marginBottom:30, marginLeft:20, flexDirection:'row' }}
          source={require('../../assets/logeduser.jpg')}
        />

          <View style={{ marginHorizontal: 55, marginTop: 20, marginBottom: 1}}>

          {this.state.accBalance &&

            this.state.accBalance[0] &&
            this.state.accBalance.map((val, key) => {

            return <MyaccountComponentBalance key={key} accBal={val.balance}/>
            })
          }
          {this.state.logedUser1 &&

            this.state.logedUser1[0] &&
            this.state.logedUser1.map((val, key) => {

            return <MyaccountComponent1 key={key} regNo={val.RegNo} fName={val.first_name} lName={val.last_name} nic={val.nic} imgSrc={val.profile_img}/>
            })
          }

          {this.state.logedUser &&

            this.state.logedUser[0] &&
            this.state.logedUser.map((val, key) => {

            return <MyaccountComponent key={key} regNo={val.RegNo} contactNo={val.contactNo} email={val.email}/>
            })
          }

          
          
          <TouchableOpacity style={{backgroundColor: '#1c313a',width: 120, height:50, marginTop:-150, paddingVertical: 12, borderRadius: 5, marginLeft:220}} onPress={this.login}>
            <Text style={styles.buttonText}>Edit Details</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.login}>
            <Text style={styles.buttonText}>Show Traval History</Text>
        </TouchableOpacity>
        </View>
      </View>
      );
    }

    
  }
  const styles = StyleSheet.create({
    button: {
      width: 220,
      backgroundColor: '#1c313a',
      height:50,
      borderRadius: 5,
      paddingVertical: 12,
      marginHorizontal:50,
      marginVertical:70
    },
    buttonText: {
      fontSize:18,
      fontWeight:'500',
      color: '#ffffff',
      textAlign: 'center',
  }
  })





  