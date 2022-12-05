import React, { Component, useState,useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Button, ScrollView, FlatList,TextInput,Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';


export default function Posts({navigation,route}) {
  const username=route.params.username;
  const [image, setimage] = useState(null)
  const [allow, setallow] = useState("")
  const [imagedata, setimagedata] = useState([])
  const [signal,setsignal]=useState("")
  //const [username,setusername]=useState("Ravi")
  const [userPic,setuserPic]=useState("")
  const [userPost,setuserPost]=useState("")
  const [description,setdescription]=useState("")
  const [likedCount,setlikedCount]=useState(0)
  const [likedPersons,setlikedPersons]=useState([])
  const [NewlikedCount,setNewlikedCount]=useState(0)
  const [NewlikedPersons,setNewlikedPersons]=useState("")
  const [PostList, setPostList] = useState([])
  const [id,setid]=useState("")
  const [allow2,setallow2]=useState("false")
  const [userData, setuserData] = useState([])

  const [allow3,setallow3]=useState("false")

  let result;




  useEffect(()=>{

    axios.get("http://192.168.128.218:3003/getdp").then((res) => {
            setuserData(res.data)

        })
   
   
},[])




  const pickImage = async () => {
     result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      
    });
    if (!result.cancelled) {
      setimage(result.uri)
      let base64Img = `data:image/jpg;base64,${result.base64}`
      let apiUrl = 'https://api.cloudinary.com/v1_1/do3uo67h5/image/upload';
      let data = {
        "file": base64Img,
        "upload_preset": "do3uo67h5",
       

      }

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
      }).then(async res => {
        let data = await res.json()
        console.log(data.secure_url)
        setuserPost(data.secure_url)
        
        
      }).catch(err => console.log(err))
    }

  }
  
  const upload = () =>{

    userData.map((e) => {
    if(e.username===username){
       setuserPic(e.userdp)
       console.log(e.userdp)
       axios.post("http://192.168.128.218:3003/addpost", { username,userPic,userPost,description}).then((res) => { console.log("ok") })

    }
  
   
})

   
  }


 
  return (
    <>
     
      <View style={styles.content}>
      <Button onPress={pickImage} style={{ width: 200, alignSelf: 'center' }} title="Select Image"></Button>
        <View style={{ backgroundColor: 'transparent',alignSelf: 'center' }}>
          {image ?
             <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius: 100, alignSelf: 'center' }} />
            :
            <View style={{ backgroundColor: 'grey', width: 200, height: 200, borderRadius: 100 }} />
          }
        </View>
       
              <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>Description</Text>

                <TextInput  placeholder="Description..." onChangeText={(text) => setdescription(text)}  style={{
                    fontSize: 20,
                    paddingLeft: 10,
                    borderWidth: 2,
                    marginBottom: 10,
                }} ></TextInput>

      <Button onPress={upload} title="Upload Post"></Button>

      
      </View>


      {/* {
        imagedata.map((e)=>{
          return(
          <Image source={{uri: e.userPost}} key={e._id} style={{width: 200, height: 200, borderRadius: 100, alignSelf:'center'}}/>
          )
        })
        
      } */}

        <View style={styles.footer}>
        <Text style={styles.icon} onPress={()=>navigation.navigate('StartPage')}>🏠</Text> 
        <Text style={styles.icon}>Ⓜ️</Text>
        <Text style={styles.icon} onPress={()=>navigation.navigate('Profile',{username:username})}>🧑‍🏫</Text> 
        </View>

    </>

    
  );

}

const styles = StyleSheet.create({
 
  icon:{
    fontSize:50,
},
content:{
  flex:1,
    marginBottom:100,
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
header:{
    flexDirection:'row',
    //justifyContent:'space-between',
    position:'relative',
    top:0,
    backgroundColor:'grey',
    width:'100%',
    borderBottomStartRadius:10,
    borderBottomEndRadius:10,
    
    
},
Heading1:{
    fontSize:40,
    marginLeft:30,
    fontStyle:'italic',
    fontWeight:'bold',
},
Heading2:{
    fontSize:40,
    marginLeft:10,
},
});
