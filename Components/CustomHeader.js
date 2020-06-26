import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Badge, Text, View} from 'native-base';
import {AsyncStorage} from 'react-native'
import { FlatList } from 'react-native-gesture-handler';


export default class CustomHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      count: ''

    }
}

  
  async componentDidMount() {
    var value = await AsyncStorage.getItem('passengers')
    
    fetch('http://192.168.8.101:3000/api/getNewMessageCount/' + value)
      .then((response) => response.json())
      .then((res) => {

        if (res.success === true) {
          this.setState({ count: res.RegNo[0].COUNT });
          // const count = res.RegNo[0].count
          console.log(this.state.count)
        }
        else {
          alert("can't get count");
        }
      }).done()
      
    }
  render() {
      let { title, isHome} = this.props
    return (
      
        <Header>
          
          <Left>
            {
                isHome?
                <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                    <Icon name='menu' />
                    
                </Button>:
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                    <Icon name='arrow-back' />
                </Button>
            }
          </Left>
          <Body>
            <Title>{title}</Title>
          </Body>
          <Right>
            {
              isHome?
              <Button transparent onPress={() => this.props.navigation.navigate('Setting')}>
                    <Icon name='chatboxes' />          
            <Badge ><Text>{this.state.count||0}</Text></Badge>
                        
                        
                     
                    
              </Button>:
              <Button>
              
              </Button>
            }
          </Right>
        </Header>
    );
  }

}