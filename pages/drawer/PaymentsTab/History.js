import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  CheckBox,
  AsyncStorage,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar} from 'react-native';

  import CustomHeader from '../../../Components/CustomHeader'



export default class History extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

      paymentHistory: [],

    }
}

renderItem = ({ item }) => {
    console.log(item.msg)
    
    return (
           
        <View style={{flex:1, flexDirection:'row', marginBottom:20}}>
          <View style={{flex:1, justifyContent:'center'}}>

          <Text style={{fontSize:20, color:'green'}}>Date:-   {item.date}</Text>
            <Text style={{fontSize:22, color:'red'}}>Amount:-   {item.amount}</Text>
            <Text style={{fontSize:20, color:'green'}}>Method:-   {item.method}</Text>
            
            
          </View>
          
        </View>
      
      
    )
  }

  componentDidMount = async () => {
    var value = await AsyncStorage.getItem('passengers')
    //console.log(value)

    fetch('http://192.168.8.100:3000/api/getPaymentsDetails/' + value)
  .then((response) => response.json())
  .then((res) => {

    if (res.success === true) {
      this.setState({ paymentHistory: res.RegNo });
      //console.log(Category)
    }
    else {
      alert("No any inqiry yet...!");
    }
  }).done()
}
renderSeparator = () => {
  return(
    <View style={{ height:1, width:'100%', backgroundColor:'black'}}>
      
    </View>
  )
}
    render() {
      
      return (
        <View>
        
        <StatusBar 
        barStyle = "light-content" 
        hidden = {false}
        backgroundColor = "#1a237e"
        translucent = {false}
        networkActivityIndicatorVisible = {true}
        />
        <View >
              
              
        <ScrollView style={{ width: 400, height: 550, borderWidth: 5, borderColor: '#dddddd', marginHorizontal: 8, paddingBottom:20, }}>
        
        <View style={styles.container}>
          <FlatList
            data={this.state.paymentHistory}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      
      </ScrollView>
            </View>
      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
        flex:1
    },
    button: {
        width: 90,
        borderRadius: 7,
        backgroundColor: 'rgba(33, 33, 33,0.3)',
        height:50,
        //borderRadius: 25,
        paddingVertical: 12,
        //marginVertical:10,
        marginTop:-50,
        marginLeft:280,
      },
    buttonText: {
        fontSize:18,
        fontWeight:'500',
        color: '#212121',
        textAlign: 'center',
    }
});