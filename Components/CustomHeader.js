import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';



export default class CustomHeader extends React.Component {
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
            {/* <Button transparent>
              <Icon name='menu' />
            </Button> */}
          </Right>
        </Header>
    );
  }
}