import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Button, ScrollView, FlatList, TextInput, Text } from 'react-native';

import axios from 'axios';


export default function Groups({ navigation, route }) {
  const username = route.params.username;
  const [image, setimage] = useState(null)
  const [allow, setallow] = useState(false)
  const [allow1, setallow1] = useState(false)
  const [imagedata, setimagedata] = useState([])
  const [signal, setsignal] = useState("")
  //const [username,setusername]=useState("Ravi")
  const [GroupName, setGroupName] = useState("")
  const [userPost, setuserPost] = useState("")
  const [description, setdescription] = useState("")
  const [likedCount, setlikedCount] = useState(0)
  const [likedPersons, setlikedPersons] = useState([])
  const [NewlikedCount, setNewlikedCount] = useState(0)
  const [NewlikedPersons, setNewlikedPersons] = useState("")

  const [id, setid] = useState("")
  const [allow2, setallow2] = useState(false)
  const [allow3, setallow3] = useState(false)
  const [allow4, setallow4] = useState(false)
  const [GroupData, setGroupData] = useState([])

  

  let Participants = []




  useEffect(() => {

    axios.get("http://192.168.128.218:3003/getGroups").then((res) => {
      setGroupData(res.data)
      res.data.map((e) => {

      })

    })


  }, [])


  function addGroup() {
    axios.post("http://192.168.128.218:3003/addGroup", { Admin: username, GroupName: GroupName })
  }




  return (
    <>

      <View style={styles.content}>
      <Text style={styles.text} onPress={()=>{
          if(allow3===false){
            setallow3(true)
          }
          if(allow3===true){
            setallow3(false)
          }
        }}>My Groups</Text>
<View>
{
          GroupData.map((e)=>{
            e.Participants.map((e1)=>{
              if(e1===username){
                // return(
                //   <View>
                //     <Text>{e.GroupName}</Text>
                //   </View>
                // )
                 alert(e.GroupName)
              
              }
            })
          })
        }

</View>
       
        {/* {
          allow4 ? <Text>{userPost}</Text> :null
        } */}

        <Text style={styles.text} onPress={()=>{
          if(allow===false){
            setallow(true)
          }
          if(allow===true){
            setallow(false)
          }
        }}>Create a Group</Text>
        {
          allow ?  <TextInput placeholder='Group...' onChangeText={(e) => setGroupName(e)} style={styles.text1}></TextInput> : null
        }
       {
          allow ? <Text onPress={addGroup} style={styles.text2}>Create</Text> : null
        }
        
        <Text style={styles.text} onPress={()=>{
          if(allow1===false){
            setallow1(true)
          }
          if(allow1===true){
            setallow1(false)
          }
        }}>Search a Group</Text>
        {
          allow1 ?   <TextInput placeholder='Search Group...' onChangeText={(e) => setGroupName(e)} style={styles.text1}></TextInput> : null
        }
        {
          allow1 ? <Text onPress={() => {
            GroupData.map((e) => {
              if (e.GroupName === GroupName) {
                setallow2(true)
              }
            })
          }} style={styles.text2}>Search</Text> : null
        }
       
        

        {
          allow2 ?
            <View>
              {
                Participants = []
              }
              {
                GroupData.map((e) => {
                  if (e.GroupName === GroupName) {
                    e.Participants.map((e1) => {
                      Participants.push(e1)
                    })
                  }
                })
              }
              <Text style={styles.text}>{GroupName}11</Text>
              <Text onPress={() => {
                GroupData.map((e) => {
                  if (e.GroupName === GroupName) {
                    Participants.push(username)
                    axios.put("http://192.168.128.218:3003/addParticipants", { params: { id: e._id, Participants: Participants } })
                  }
                })
              }} style={styles.text2}> Join Group</Text>
            </View>
            :
            <Text style={styles.text}>No data</Text>

        }
      </View>



      <View style={styles.footer}>
        <Text style={styles.icon} onPress={() => navigation.navigate('StartPage')}>🏠</Text>
        <Text style={styles.icon}>Ⓜ️</Text>
        <Text style={styles.icon} onPress={() => navigation.navigate('Profile', { username: username })}>🧑‍🏫</Text>
      </View>

    </>


  );

}

const styles = StyleSheet.create({

  text: {
    fontSize: 20,
    marginLeft:10,
    marginBottom:10,

  },
  text1:{
    fontSize: 20,
    marginLeft:10,
    marginBottom:10,
    paddingLeft:5,
    borderWidth:2,
   borderRadius:10,
  },
  text2:{
   
    fontSize: 20,
    marginTop: 5,
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: 'lightgreen',
    borderColor: 'lightgreen',
    marginLeft: 10,
    padding: 5,
    marginBottom: 5,
   
  },
  content: {
    flex: 1,
    marginBottom: 100,
  },
  footer:
  {
    fontSize: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'whitesmoke',
    position: 'relative',
    bottom: 0,
    width: '100%',


  },
  header: {
    flexDirection: 'row',
    //justifyContent:'space-between',
    position: 'relative',
    top: 0,
    backgroundColor: 'grey',
    width: '100%',
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,


  },
  Heading1: {
    fontSize: 40,
    marginLeft: 30,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  Heading2: {
    fontSize: 40,
    marginLeft: 10,
  },
});
