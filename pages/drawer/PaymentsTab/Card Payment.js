import React from 'react';
import { View, TouchableOpacity, StatusBar, Text, StyleSheet, KeyboardAvoidingView, AsyncStorage} from 'react-native';
import {Container, Header, Content, Form, Item, Input, Label, Picker, Icon, Button } from 'native-base';


export default class CardPayment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      amount:'',
      selected2:'',
      nameOnCard:'',
      cNumber:'',
      cvc:'',
      expDate:'',



    };
  }
  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }
    render() {
      return (
        
        <Container>
        <Content>
          <View>
            <Text style={styles.headerTxt}>Card Details</Text>
          </View>
          <Form>
            <Item style={{marginBottom:'5%'}} floatingLabel>
              <Label style={{color:"blue"}}>Amount (Rs)</Label>
              <Input onChangeText={ (amount) => this.setState({amount}) }/>
            </Item>
            <Item picker>
              <Picker
                
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined, color:"blue" }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Payment Methods" value="key0" />
                <Picker.Item label="Visa" value="Visa" />
                <Picker.Item label="Master" value="Master" />
                <Picker.Item label="Amex" value="Amex" />
                
              </Picker>
            </Item>
            <Item style={{marginTop:'5%'}} floatingLabel last>
              <Label style={{color:"blue"}}>Name on Card</Label>
              <Input onChangeText={ (nameOnCard) => this.setState({nameOnCard})}/>
            </Item>
            <Item style={{marginTop:'5%'}} floatingLabel last>
              <Label style={{color:"blue"}}>Card Number</Label>
              <Input onChangeText={ (cNumber) => this.setState({cNumber})}/>
            </Item>
            <Item style={{marginTop:'5%'}} floatingLabel last>
              <Label style={{color:"blue"}}>Card Expiry Date (MM/YY)</Label>
              <Input onChangeText={ (expDate) => this.setState({expDate})}/>
            </Item>
            <Item style={{marginTop:'5%'}} floatingLabel last>
              <Label style={{color:"blue"}}>CVC</Label>
              <Input onChangeText={ (cvc) => this.setState({cvc})}/>
            </Item>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText} onPress={this.checkCardDetails}>Submit</Text>
            </TouchableOpacity>
          </Form>
        </Content>
      </Container>
      
      );
    }

    checkCardDetails = async () =>{
      const value = await AsyncStorage.getItem('passengers')
      
      fetch('http://192.168.8.101:3000/api/checkCardDetails', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nameOnCard: this.state.nameOnCard,
          cNumber: this.state.cNumber,
          cvc: this.state.cvc,
          expDate: this.state.expDate,
          cType: this.state.selected2,
        })
      })
    
      .then((response) => response.json())
      .then((res) => {
        if(res.success === true){
          
          
          var date = new Date().getDate();
          var month = new Date().getMonth() + 1;
          var year = new Date().getFullYear();
          var hours = new Date().getHours(); //Current Hours
          var min = new Date().getMinutes(); //Current Minutes
          var sec = new Date().getSeconds(); //Current Seconds

          const fullDate = year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec
        
          

          fetch('http://192.168.8.101:3000/api/makeCardPayments',{
              method: 'PUT',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                regno: value,
                inq_date: fullDate,
                amount: this.state.amount,
                pay_type: "Card"
              })
            })
            .then((response) => response.json())
            .then((res) => {
              
              if(res.success === true){
                
                alert(res.succmessage);
                //this.props.navigation.navigate('Payments')
              }
              else if(res.success === false){
                  alert(res.errmessage);
              }
            })
            .done();
        }
    
        else{
          alert(res.message1)
        }
      })
      .done()
    }

    makeInquiry = () =>{
      alert("wede godaaaa")
      // 
    }
  }

  const styles = StyleSheet.create({
    container : {
      //backgroundColor: '#ffffff',
      marginTop: 100,
      //flexGrow: 1,
      //alignItems: 'center',
      justifyContent: 'center',
    },
    logoStyle: {
      //justifyContent:'center',
      marginTop:-20,
      marginLeft:80,
      fontWeight: 'bold',
      marginBottom:60,
      fontSize: 30,
      color: 'rgba(33, 33, 33,0.3)'
    },
    headerTxt:{
      fontSize:30,
      marginTop:'10%',
      marginBottom:'-2%',
      alignSelf:'center',
      fontWeight: 'bold',
      color: 'rgba(33, 33, 33,0.3)'
      
    },
    buttonText: {
        fontSize:18,
        fontWeight:'500',
        color: 'white',
        textAlign: 'center',
        
    },
    button: {
      width: 150,
      borderRadius: 7,
      backgroundColor: 'blue',
      height:50,
      //borderRadius: 25,
      paddingVertical: 12,
      //marginVertical:10,
      marginTop: '10%',
      marginLeft:'50%'
    }
    });