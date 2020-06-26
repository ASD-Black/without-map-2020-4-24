import React from 'react';
import { View, TouchableOpacity, StatusBar} from 'react-native';
import {Container, Header, Tab, Tabs, TabHeading, Icon, Text} from 'native-base';
import Tab1 from './Notifications/notices';
import Tab2 from './Notifications/inquiryReplys';

import CustomHeader from '../../Components/CustomHeader'

export class Setting extends React.Component{
    render() {
      return (
        <View style={{flex: 1}}>
        
        <StatusBar 
        barStyle = "light-content" 
        hidden = {false}
        backgroundColor = "#1a237e"
        translucent = {false}
        networkActivityIndicatorVisible = {true}
        />
        <Container>
        <CustomHeader title="Notifications" navigation={this.props.navigation}/>
          <Tabs>
            <Tab heading={ <TabHeading><Text>Notices</Text></TabHeading>}>
              <Tab2/>
            </Tab>
            <Tab heading={ <TabHeading><Text>Inquiry Replys</Text></TabHeading>}>
              <Tab1/>
            </Tab>
          </Tabs>
        </Container>
      </View>
      );
    }
  }