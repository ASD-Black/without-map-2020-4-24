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
    StatusBar
} from 'react-native';
// import {Text} from 'native-base';


export default class inquiryReplys extends React.Component {
    constructor(props) {
        super(props);

        this.showMSG = this.showMSG.bind(this);
    
        this.state = {
    
          qryHistoryData: [],
          date: []
    
        }
    }

    renderItem = ({ item }) => {
        console.log(item.msg)
        
        return (
               
            <View style={{flex:1, flexDirection:'row', marginBottom:20}}>
              <View style={{flex:1, justifyContent:'center'}}>
                
                <Text style={{fontSize:22, color:'red'}}>From Administration</Text>
                <Text style={{fontSize:18, color:'green'}}>Date:-   {item.date}</Text>
                <TouchableOpacity style={styles.button} onPress={() => this.showMSG(item.msg, item.n_id)}>
                    <Text style={styles.buttonText}>More</Text>
                </TouchableOpacity>
              </View>
              
            </View>
          
          
        )
      }

      showMSG = (msg, id) => {
        Alert.alert(
            'Notice',
            msg,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          );
          //console.log(id)

          fetch('http://192.168.8.101:3000/api/updateNoticeReadStatus',{
              method: 'PUT',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                n_id: id
                
              })
            })
            .then((response) => response.json())
            .then((res) => {
              
              if(res.success === true){
                
                //alert(res.succmessage);
                
              }
              else if(res.success === false){
                  //alert(res.errmessage);
              }
            })
            .done();
      }

    componentDidMount = async () => {
        //var value = await AsyncStorage.getItem('passengers')
        //console.log(value)
    
        fetch('http://192.168.8.101:3000/api/getPublicNotices/')
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
              
              <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: 'rgba(33, 33, 33,0.3)', marginBottom:20, marginTop:40 }}>Notices</Text>
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