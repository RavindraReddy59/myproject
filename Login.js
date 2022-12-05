import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native'
//import StartPage from './StartPage';

export default function Login({navigation}) {
    
   

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [signal, setsignal] = useState("")
    const [UserList, setUserList] = useState([])
    const [username, setusername] = useState("")
    const [allow, setallow] = useState("")
    const [allow1, setallow1] = useState("")

    

    useEffect(() => {
        axios.get("http://192.168.128.218:3003/getUser").then((res) => {
            setUserList(res.data)

        }).catch((err) => { console.log(err) })
        UserList.map((e, id) => {

            if (Email === e.Email) {
                setusername(e.username)
            }
        })
  

    })

   
    const Loggin = () => {
        axios.post("http://192.168.128.218:3003/Login", { Email, Password })
            .then(res => {
               if(res.data.message==="Login Successful"){
                Proceed()
               }
              
            })
            .catch((err) => { console.log(err) })
    }
    
  

    
    function Proceed(){
        navigation.navigate('StartPage',{username:username})
    }
   

    return (
        <View style={{
            margin:30,
            marginTop:150,
            borderWidth: 3,
            backgroundColor: 'greenyellow',
            padding: 10,
        }}>

            <View>

                <Text
                    style={{
                        fontSize: 40,
                        color: 'red',
                    textAlign:'center',
                        marginBottom: 10,
                        fontWeight: 'bold',
                    }}>Login</Text>


                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>Email</Text>


                <TextInput defaultValue={Email} placeholder="Email" onChangeText={(text) => setEmail(text)} className='lEmail' style={{
                    fontSize: 20,
                    paddingLeft: 10,
                    borderWidth: 2,
                    marginBottom: 10,
                }} ></TextInput>


                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>Password</Text>


                <TextInput defaultValue={Password} secureTextEntry={true} placeholder="password" onChangeText={(text) => setPassword(text)} className='lpassword' style={{
                    fontSize: 20,
                    paddingLeft: 10,
                    borderWidth: 2,
                    marginBottom: 10,
                }}></TextInput>


            </View>
            <View className="lbutton" style={{
            }}>
                <Button onPress={Loggin} title="Login" style={{
                }}></Button>

                <Button onPress={() =>navigation.navigate('Emailsend',{data1:Email,UserList:UserList})} title="Forgot Password" style={{
                }}></Button>
                  <Button onPress={() => navigation.navigate('Homepage')} title="Back To HomePage"></Button> 

            </View>
        </View>

    )

}