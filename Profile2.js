import axios from "axios";
import React, { useState,useEffect } from "react";
import {View,Button,Text,StyleSheet,ScrollView,Image} from 'react-native'
// import StartPage from "./StartPage";
// import FriendsList from "./FriendsList";
import * as ImagePicker from 'expo-image-picker';
//import DatePicker from 'react-native-datepicker';

export default function Profile2({navigation,route}){
  const username=route.params.username
    const [allow1,setallow1]=useState("")
    const [allow2,setallow2]=useState("")
    const [PostList, setPostList] = useState([])
    const [image, setimage] = useState(null)
    const [image1, setimage1] = useState("")
    const [userPost,setuserPost]=useState("")
    const [date, setDate] = useState('09-10-2020');
    const [userdp,setuserdp]=useState([])
    const [FriendList, setFriendList] = useState([])
    const [Dlist,setDlist]=useState([])
    const[count,setcount]=useState(0)
    

    let result;

    useEffect(()=>{
   
    
            axios.get("http://192.168.128.218:3003/getdp").then((res) => {
              setuserdp(res.data)
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
             
    },[])


    return(
        < >
        
            <View style={styles.content}>
                
                {
                  userdp.map((e)=>{
                    if(e.username===username){
                        return(
                        <Image source={{ uri:e.userdp }} style={styles.imageStyle} />
                        )
                    }
                  })
                }
                <View  style={styles.Profile}>

                 <View style={styles.frnds1} onPress={() => navigation.navigate('FriendsList', { username: username })}>
                <Text style={styles.frnds2} onPress={() =>navigation.navigate('FriendsList', { username: username })}>Friends</Text>
                <Text style={styles.frnds3} onPress={() => navigation.navigate('FriendsList', { username: username })}>{FriendList.length}</Text>
                </View>

               
                </View>
               
       
            </View>


           
            <View style={styles.footer}>
        <Text style={styles.icon} onPress={()=>navigation.navigate('StartPage', { username: username })}>⌂</Text> 
        <Text style={styles.icon}>Ⓜ️</Text>
        <Text style={styles.icon} >👤</Text> 
        </View>
        </>
    )
}
const styles=StyleSheet.create({
   
    icon:{
        fontSize:50,
    },
   
    footer:
    {
        fontSize:70,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'whitesmoke',
        position:'relative',
        bottom:0,
        width:'100%',
        

    },
   
    
    content:{
        marginTop:50, 
        flex:1,
    },
    content1:{
        fontSize:30,
        textAlign:'center',
        fontWeight:'bold',
    },
   
      imageStyle:{
        width: 200,
         height: 200,
          borderRadius: 100, 
          alignSelf: 'center',
          borderWidth:3,
          marginBottom:10,
          // borderColor:'white',
      },
      frnds1:{
      
        borderWidth:3,
        borderColor:'lightgreen',
        backgroundColor:'lightgreen',
        borderRadius:10,
        marginLeft:20,
      },
      frnds2:{
        fontSize:40,
      },
      frnds3:{
        fontSize:40,
        textAlign:'center',
      },
      settings:{
        borderWidth:3,
        borderRadius:10,
        borderColor:'lightgreen',
        backgroundColor:'lightgreen',
       marginRight:20,
      },
      settings1:{
        fontSize:40,
      },
      settings2:{
        fontSize:30,
        textAlign:'center',

      },
      Profile:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:20,
      }

    
    
})