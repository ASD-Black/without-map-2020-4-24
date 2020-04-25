import React from 'react';
import { View,SafeAreaView, ScrollView, AsyncStorage, Image} from 'react-native';
import { Text, List, ListItem } from 'native-base';

import SlideManueStd from './SlideMenueStd'

export class SideManu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logedUser2: []

    }
  }
  componentDidMount = async () => {
    var value = await AsyncStorage.getItem('passengers')
    //console.log(value)

      fetch('http://192.168.8.100:3000/api/getLoadedUserFromSLIITdb/' + value)
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

  }

    render(){
      return(
        <SafeAreaView style={{flex: 1}}>
          <View style={{alignText:'center', justifyContent: 'center', height:160}}>
          <Image style={{width:120, height:120, borderRadius: 60}}
             source={require('../assets/logeduser.jpg')}
            />
          </View>
          {this.state.logedUser2 &&

            this.state.logedUser2[0] &&
            this.state.logedUser2.map((val, key) => {

            return <SlideManueStd key={key} regNo={val.RegNo} fName={val.first_name} lName={val.last_name}/>
            })
          }
          {/* <Text style={{flexDirection:'row', marginLeft:150, fontSize: 22, marginTop:-115, marginBottom:60}}>{this.props.regNo}</Text>
          <Text style={{flexDirection:'row', marginLeft:150, fontSize: 22, marginTop:-60, marginBottom:60}}>{this.props.fName + "  "+ this.props.lName}</Text> */}
          <ScrollView>
            <List>
              <ListItem onPress={()=> this.props.navigation.navigate('Profile')}>
                <Text>Profile</Text>
              </ListItem>
              <ListItem onPress={()=> this.props.navigation.navigate('Setting')}>
                <Text>Setting</Text>
              </ListItem>
              <ListItem onPress={()=> this.props.navigation.navigate('Payments')}>
                <Text>Payments</Text>
              </ListItem>
              <ListItem onPress={()=> this.props.navigation.navigate('Inquiry')}>
                <Text>Inquiry</Text>
              </ListItem>
              <ListItem onPress={()=> this.props.navigation.navigate('StarRating')}>
                <Text>Rate Us</Text>
              </ListItem>
            </List>
          </ScrollView>
          
          <List>
              <ListItem onPress={this.LogOut}>
                <Text>Logout</Text>
              </ListItem>
            </List>
        </SafeAreaView>
        
      )
    }
    LogOut = async () => {
      AsyncStorage.clear()
      this.props.navigation.navigate('auth')
    }
  }