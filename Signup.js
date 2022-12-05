import React, { useState } from 'react';
import axios from 'axios';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native'

//import Homepage from './HomePage';

export default function Signup({navigation}) {
  //-------------------------------------------------------------------------------------------------------
  const [username, setusername] = useState("")
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  const [signal, setsignal] = useState("")
  const [allow,setallow]=useState("")


  const addUser = (e) => {
    e.preventDefault();

    if (username && Email && Password && ConfirmPassword) {
      if (Email.includes("@gmail.com") || Email.includes("@gvpce.ac.in")) {
        if (Password.length >= 8) {
          if (Password === ConfirmPassword) {
            axios.post("http://192.168.128.218:3003/addUser", { username, Email })
              .then(res => {
                alert(res.data.message)
                  // setsignal(res.data.message)
                  if(res.data.message==="proceed for otp"){
                    proceed()
                  }
                  
              })
              .catch((err) => {
                alert(err);
              });
          }
          else {
            alert("Password and confirm password didn't match")
          }
        }
        else {
          alert("Password is too weak please provide a strong password")
        }
      }
      else {
        alert("Please provide a valid Email")
      }
    }
    else {
      alert("Please fill all the fileds")
    }
  }

  
 function proceed(){
  navigation.navigate('Emailsend',{username:username,data1:Email,Password:Password,ConfirmPassword:ConfirmPassword})
 }
  

  return (

    <View className='sform' style={{
      margin: 30,
      marginTop: 150,
      borderWidth: 3,
      backgroundColor: 'greenyellow',
      padding: 10,
    }}>

      <Text style={{
        fontSize: 40,
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
      }}>Sign Up</Text>

      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
      }}>Name</Text>

      <TextInput  onChangeText={(text) => setusername(text)} className='sName' style={{
        fontSize: 20,
        paddingLeft: 10,
        borderWidth: 2,
        marginBottom: 10,
      }} ></TextInput>

      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
      }}>Email</Text>

      <TextInput defaultValue={Email} onChangeText={(text) => setEmail(text)} className='sEmail' style={{
        fontSize: 20,
        paddingLeft: 10,
        borderWidth: 2,
        marginBottom: 10,
      }} ></TextInput>

      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
      }}>Password</Text>

      <TextInput defaultValue={Password} onChangeText={(text) => setPassword(text)} className='spassword' style={{
        fontSize: 20,
        paddingLeft: 10,
        borderWidth: 2,
        marginBottom: 10,
      }} ></TextInput>

      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
      }}>Confirm password</Text>

      <TextInput defaultValue={ConfirmPassword} onChangeText={(text) => setConfirmPassword(text)} className='scpassword' style={{
        fontSize: 20,
        paddingLeft: 10,
        borderWidth: 2,
        marginBottom: 10,
      }} ></TextInput>

      <View className="sbutton">
        <Button onPress={addUser} title="Sign Up"></Button>
         <Button onPress={() => navigation.navigate('Homepage')} title="Back To HomePage"></Button> 

      </View>

    </View>


  )
}
