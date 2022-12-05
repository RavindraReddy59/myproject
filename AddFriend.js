import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, Button, ScrollView, Image, FlatList } from 'react-native';
import axios from 'axios';
// import StartPage from "./StartPage";
// import Profile from "./Profile";
export default function AddFriend({ navigation, route }) {
    const username = route.params.username;
    const [UserList, setUserList] = useState([])
    const [allow2, setallow2] = useState("false")
    const [allow3, setallow3] = useState("false")
    const [allow4, setallow4] = useState("false")
    const [count, setcount] = useState(0)
    const [requestdata, setrequestdata] = useState([])
    const [RequestList, setRequestList] = useState([])
    const [signal, setsignal] = useState("false")
    const [id, setid] = useState("")
    const [Btitle, setBtitle] = useState("Add Friend")
   const [rname,setrname]=useState("")
   const [FriendList, setFriendList] = useState([])
    const [Dlist,setDlist]=useState([])
    const [userdp,setuserdp]=useState([])
    const [person,setperson]=useState("")

    useEffect(() => {

        axios.get("http://192.168.128.218:3003/getUser").then((res) => {

            setUserList(res.data)

        })
        axios.get("http://192.168.128.218:3003/getdp").then((res) => {
              setuserdp(res.data)
          })

        axios.get("http://192.168.128.218:3003/getrequests").then((res) => {
            setrequestdata(res.data)
            res.data.map((e)=>{
                if(e.Requestlist===username){
                    setRequestList(RequestList=>[...RequestList,e.username])
                }
               
              })
        })

        axios.get("http://192.168.128.218:3003/getfriends").then((res) => {
            setDlist(res.data)
            res.data.map((e)=>{
              if(e.username===username){
                setFriendList(FriendList=>[...FriendList,e.friendlist])
              }
             else if(e.friendlist===username){
              setFriendList(FriendList=>[...FriendList,e.username])
              }
            })
        })


    },[requestdata])




    return (
        <>

        <ScrollView >
            
                
                {         
                    UserList.map((msg) => {
                     if(msg.username!==username && !FriendList.includes(msg.username) && !RequestList.includes(msg.username)){
                        return (
                           <View>
                           <View style={styles.content}>
                            {
                                userdp.map((e)=>{
                                    if(e.username===msg.username){
                                        return(
                                        <Image source={{ uri:e.userdp }} style={styles.imageStyle}  onPress={() => navigation.navigate('Profile2', { username: msg.username })}/>
                                        )
                                    }
                                  })
                            }
                                <Text style={styles.text}  onPress={() => navigation.navigate('Profile2', { username: msg.username })}>{msg.username} </Text>
                                <Text style={styles.text1} onPress={() => {
                                        axios.post("http://192.168.128.218:3003/updateFrnd1", { params:{rname:msg.username,Requestlist:username} }) .then((res) => {
                                            if (res.data.message === "Request addedd Successfully") {
                                                alert("request added")
                                            }
                                        })
                                }}>Add Friend</Text>
                           </View>
                        </View>)
                         }
    
                    })
                }
                
                 
            

           
            </ScrollView>



            <View style={styles.footer}>
                <Text style={styles.icon} onPress={() => navigation.navigate('StartPage')}>🏠</Text>
                <Text style={styles.icon}>Ⓜ️</Text>
                <Text style={styles.icon} onPress={() => navigation.navigate('Profile', { username: username })}>🧑‍🏫</Text>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        // paddingLeft: 15,
        // marginBottom: 10,
        paddingTop:10,
         marginLeft:15,
   

    },
    text1: {
        fontSize: 20,
        marginRight:10,
        borderWidth:3,
        borderColor:'lightgreen',
        padding:5,
        marginTop:5,
        marginBottom:5,
        backgroundColor:'lightgreen',
        borderRadius:20,
        fontWeight:'bold'

    },
   
    icon: {
        fontSize: 30,
    },
    content: {
       
        flexDirection: 'row',
        borderWidth: 2,
        borderTopColor: 'white',
        borderRightColor: 'white',
        borderLeftColor: 'white',
        borderBottomColor: '#cccccc',
        //   flex: 1,
        justifyContent:'space-between',
           top:0,
        //  backgroundColor: 'green',
    
    },
    footer:
    {
      
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'yellow',
        position: 'relative',
        bottom: 0,
        width: '100%',


    },
    imageStyle:{
        width: 50,
        height: 50,
         borderRadius: 100, 
        //  alignSelf: 'center',
         borderWidth:3,
         marginBottom:10,
         marginLeft: 10,
    }, 
    header: {
        flexDirection: 'row',
        position: 'relative',
        marginTop:5,
        // backgroundColor: 'black',
        // width: '100%',
        
    },
    Heading1: {
        fontSize: 30,
        marginLeft: 10,
       
    },
    suggestions: {
        fontSize: 25,
        marginLeft: 10,
        marginBottom:10,
       
    },
    Heading2: {
        fontSize: 20,
        marginLeft: 5,
        width:'83%',
        borderWidth:1,
        borderRadius:20,
        paddingLeft:10,

    },
   

})










