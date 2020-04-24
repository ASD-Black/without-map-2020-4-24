import React, {Component} from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import { StyleSheet, View, Dimensions, StatusBar } from 'react-native';
import Tab1 from './PaymentsTab/History';
import Tab2 from './PaymentsTab/Card Payment';


import CustomHeader from '../../Components/CustomHeader'

export class Payments extends React.Component{
  render() {
    return (
      <View style={{flex:1}}>
      <StatusBar 
        barStyle = "light-content" 
        hidden = {false}
        backgroundColor = "#1a237e"
        translucent = {false}
        networkActivityIndicatorVisible = {true}
      />
      <Container>
      <CustomHeader title="Payments" navigation={this.props.navigation}/>
        <Tabs>
          <Tab heading={ <TabHeading><Text>History</Text></TabHeading>}>
            <Tab1/>
          </Tab>
          <Tab heading={ <TabHeading><Text>Card Payment</Text></TabHeading>}>
            <Tab2/>
          </Tab>
        </Tabs>
      </Container>
      </View>
    );
  }
}