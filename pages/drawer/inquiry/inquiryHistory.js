import React, { Component } from "react";
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
    Alert
} from "react-native";
import CustomHeader from '../../../Components/CustomHeader'

class inquiryHistory extends Component{

    constructor(props) {
        super(props);

        this.showMSG = this.showMSG.bind(this);
    
        this.state = {
    
          qryHistoryData: [],
    
        }
    }

    renderItem = ({ item }) => {
        console.log(item.msg)
        
        return (
               
            <View style={{flex:1, flexDirection:'row', marginBottom:20}}>
              <View style={{flex:1, justifyContent:'center'}}>
                
                <Text style={{fontSize:22, color:'red'}}>Title:-   {item.title}</Text>
                <Text style={{fontSize:20, color:'green'}}>Date:-   {item.inq_date}</Text>
                <TouchableOpacity style={styles.button} onPress={() => this.showMSG(item.msg)}>
                    <Text style={styles.buttonText}>More</Text>
                </TouchableOpacity>
              </View>
              
            </View>
          
          
        )
      }

      showMSG = (msg) => {
        //val = this.item.cid
        //console.log(msg)
        // this.props.navigation.navigate('QRcode', { 
        //     inq_id: inq_id 
        // var msg = item.msg
        
        //Alert.alert(msg);
        Alert.alert(
            'Inquiry',
            msg,
            [
              //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              //{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
      }

    componentDidMount = async () => {
        var value = await AsyncStorage.getItem('passengers')
        //console.log(value)
    
        fetch('http://192.168.8.100:3000/api/getInquiryData/' + value)
      .then((response) => response.json())
      .then((res) => {

        if (res.success === true) {
          this.setState({ qryHistoryData: res.RegNo });
          //console.log(Category)
        }
        else {
          alert("No any inqiry yet...!");
        }
      }).done()
    }
    
    render() {
        return (
            <View >
              <CustomHeader title="Inquiry History" navigation={this.props.navigation}/>
              <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: 'rgba(33, 33, 33,0.3)', marginBottom:20, marginTop:40 }}>Inquiry History</Text>
              <ScrollView style={{ width: 400, height: 500, borderWidth: 5, borderColor: '#dddddd', marginHorizontal: 17, paddingBottom:20 }}>
        
        <View style={styles.container}>
          <FlatList
            data={this.state.qryHistoryData}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      
      </ScrollView>
            </View>
        );
    }
}


export default inquiryHistory;

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