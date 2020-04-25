import React from 'react';
import { View, TouchableOpacity, Dimensions, SafeAreaView, ScrollView,StatusBar, Image} from 'react-native';
//import { Button, Text } from 'native-base';
import { createAppContainer, createSwitchNavigator  } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Container, Header, Left, Body, Right, Button, Title, Text, Icon, List, ListItem } from 'native-base';

import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { Login} from './pages/auth/Login'
import { Register} from './pages/auth/Register'

import {Profile} from './pages/drawer/Profile'
import { Setting} from './pages/drawer/Setting'
import  {Payments}  from './pages/drawer/Payments'
import { Inquiry} from './pages/drawer/Inquiry'
import InquiryHistory from './pages/drawer/inquiry/inquiryHistory'
import { StarRating} from './pages/drawer/StarRating'

import Feed from './pages/tabs/Feed/Feed'
import { FeedDetails } from './pages/tabs/Feed/FeedDetails'
import  Search  from './pages/tabs/Search/Search'
import { SearchDetails } from './pages/tabs/Search/SearchDetails'

import { SideManu } from './Components/SideManu'



const navOptionHandler = (navigation) => ({
  headerShown: true
})
const navOptionHandlerOFF = (navigation) => ({
  headerShown: false
})

const FeedStack = createStackNavigator({
  Map: {
    screen: Feed,
    navigationOptions: navOptionHandlerOFF
  },
  FeedDetails: {
    screen: FeedDetails,
    navigationOptions: navOptionHandlerOFF
  }
})

const SearchStack = createStackNavigator({
  LocationMarker: {
    screen: Search,
    navigationOptions: navOptionHandlerOFF
  },
  SearchDetails: {
    screen: SearchDetails,
    navigationOptions: navOptionHandlerOFF
  }
})

const MainTabs = createBottomTabNavigator({
  Map: {
    screen: FeedStack,
    navigationOptions:{
      
      tabBarLabel:'Map',
      tabBarIcon: ({tintColor}) =>(
        <Image
          source={require('./assets/map.png')}
          resizeMode="contain"
          style={{width:25, height:25}}
        />
      )
    }
  },
  Search: {
    screen: SearchStack,
    navigationOptions:{
      
      tabBarLabel:'Location Marker',
      tabBarIcon: ({tintColor}) =>(
        <Image
          source={require('./assets/location.jpg')}
          resizeMode="contain"
          style={{width:25, height:25}}
        />
      )
    }
  }
});



const MainStack = createStackNavigator({
  Home: {
    screen: MainTabs,
    navigationOptions: navOptionHandlerOFF
  },
  Setting: {
    screen: Setting,
    navigationOptions: navOptionHandlerOFF
  },
  Profile: {
    screen: Profile,
    navigationOptions: navOptionHandlerOFF
  },
  Payments: {
    screen: Payments,
    navigationOptions: navOptionHandlerOFF
  },
  Inquiry: {
    screen: Inquiry,
    navigationOptions: navOptionHandlerOFF
  },
  InquiryHistory: {
    screen: InquiryHistory,
    navigationOptions: navOptionHandlerOFF
  },
  StarRating: {
    screen: StarRating,
    navigationOptions: navOptionHandlerOFF
  },
}, {initialRouteName: 'Home'})

const appDrawer = createDrawerNavigator(
  {
    drawer: MainStack
  },
  {
    contentComponent: SideManu,
    drawerWidth: Dimensions.get('window').width * 3/4
  }
  )

  const authStack = createSwitchNavigator({
    Login: {
      screen: Login,
      //navigationOptions: navOptionHandler
    },
    Register: {
      screen: Register,
      //navigationOptions: navOptionHandler
    }
  })

  const MainApp = createSwitchNavigator(
    {
      app: appDrawer,
      auth: authStack
    },
    {
      initialRouteName: 'auth'
    }
  )
const AppNavigator = createAppContainer(MainApp)

export default class App extends React.Component{
  render(){
    return(
      <AppNavigator/>
    )
     
  }
}